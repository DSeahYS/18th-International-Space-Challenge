import os
from dotenv import load_dotenv
import re
import torch

load_dotenv()
api_key = os.getenv("TINKER_API_KEY")

from tinker import ServiceClient, Datum, AdamParams, ModelInput, TensorData, SamplingParams


client = ServiceClient(api_key=api_key)
training_client = client.create_lora_training_client(base_model="meta-llama/Llama-3.1-8B-Instruct", rank=32)

# Get tokenizer for real tokenization
tok = training_client.get_tokenizer()

# Prepare training data from all files in data/ directory
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
data_dir = os.path.join(project_root, "data")
model_dir = os.path.join(project_root, "model")

# Define supported file extensions
supported_extensions = {'.md', '.txt', '.json', '.jsonl'}

# Find all data files in the data directory, prioritize FullProcedures.md
data_files = []
full_procedures_path = None
for filename in os.listdir(data_dir):
    file_path = os.path.join(data_dir, filename)
    if os.path.isfile(file_path):
        _, ext = os.path.splitext(filename.lower())
        if ext in supported_extensions:
            if filename == "FullProcedures.md":
                full_procedures_path = file_path
            else:
                data_files.append(file_path)
            print(f"Found data file: {filename}")

# Use FullProcedures.md if available, otherwise all files
if full_procedures_path:
    data_files = [full_procedures_path]
    print("Using FullProcedures.md as primary training data")

if not data_files:
    raise ValueError("No supported data files found in data/ directory. Supported formats: .md, .txt, .json, .jsonl")

print(f"Processing {len(data_files)} data files...")

# Process all data files and aggregate training data
data = []
total_files_processed = 0
total_pairs_found = 0

for file_path in sorted(data_files):
    filename = os.path.basename(file_path)
    print(f"\n--- Processing: {filename} ---")
    
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        print(f"Warning: Could not read {filename}: {e}")
        continue
    
    # Only process files with Input/Output pairs
    has_input_output = "Input:" in content and "Output:" in content

    if has_input_output:
        # Parse Input/Output pairs from the file
        file_pairs = 0
        lines = content.split('\n')
        i = 0

        while i < len(lines):
            if lines[i].startswith("Input:"):
                input_text = lines[i][6:].strip()
                i += 1
                output_lines = []

                # Collect output until next Input or section marker
                while i < len(lines) and not lines[i].startswith("Input:") and not lines[i].startswith("###"):
                    if lines[i].startswith("Output:"):
                        i += 1
                        continue
                    output_lines.append(lines[i])
                    i += 1

                output_text = '\n'.join(output_lines).strip()

                if input_text and output_text:
                    # Real tokenization using tok.encode()
                    prompt_tokens = tok.encode(input_text)
                    answer_tokens = tok.encode(output_text)

                    # Combine tokens
                    all_tokens = prompt_tokens + answer_tokens

                    # Correct token shifting for causal LM
                    input_tokens = all_tokens[:-1]  # inputs = tokens[:-1]
                    target_tokens = all_tokens[1:]  # targets = tokens[1:]

                    # Proper loss mask creation (0.0 for prompt tokens, 1.0 for answer tokens)
                    # Since we shifted, we have len(prompt_tokens) - 1 prompt positions to mask out
                    weights = [0.0] * (len(prompt_tokens) - 1) + [1.0] * len(answer_tokens)

                    # Proper Datum creation with plain Python lists (NOT TensorData objects)
                    datum = Datum(
                        model_input=ModelInput.from_ints(input_tokens),
                        loss_fn_inputs={
                            "target_tokens": target_tokens,  # Plain Python list
                            "weights": weights  # Plain Python list
                        }
                    )
                    data.append(datum)
                    file_pairs += 1
            else:
                i += 1

        if file_pairs > 0:
            print(f"Extracted {file_pairs} Q&A pairs from {filename}")
            total_pairs_found += file_pairs
            total_files_processed += 1
        else:
            print(f"No Q&A pairs found in {filename}")
    else:
        print(f"Skipping {filename} - no Input/Output pairs found")

print(f"\n=== TRAINING DATA SUMMARY ===")
print(f"Files processed: {total_files_processed}/{len(data_files)}")
print(f"Total Q&A pairs extracted: {total_pairs_found}")
print(f"Training examples prepared: {len(data)}")

# Split data into train and validation sets (90% train, 10% val)
import random
random.shuffle(data)
val_size = max(1, len(data) // 10)  # At least 1 for validation
train_data = data[:-val_size]
val_data = data[-val_size:]

print(f"Training dataset: {len(train_data)} Q&A pairs")
print(f"Validation dataset: {len(val_data)} Q&A pairs")

epochs = 10
batch_size = 2
lr = 0.0002  # Increased learning rate for better convergence

print("Starting training...")
loss_curve = []

# Split data into batches
def batch_data(data, batch_size):
    for i in range(0, len(data), batch_size):
        yield data[i:i + batch_size]

for epoch in range(epochs):
    epoch_loss = 0.0
    num_batches = 0

    for batch in batch_data(train_data, batch_size):
        # Forward-backward on batch
        fwd = training_client.forward_backward(batch, "cross_entropy")
        result = fwd.result()

        # Extract loss from loss_fn_outputs
        loss_tensor = result.loss_fn_outputs[0]["elementwise_loss"]
        loss_values = loss_tensor.data
        batch_loss = sum(loss_values) / len(loss_values)

        epoch_loss += batch_loss
        num_batches += 1

        # Optimizer step after each batch
        training_client.optim_step(AdamParams(learning_rate=lr)).result()

    # Average training loss for the epoch
    avg_train_loss = epoch_loss / num_batches

    # Validation loss
    val_fwd = training_client.forward_backward(val_data, "cross_entropy")
    val_result = val_fwd.result()
    val_loss_tensor = val_result.loss_fn_outputs[0]["elementwise_loss"]
    val_loss_values = val_loss_tensor.data
    val_loss = sum(val_loss_values) / len(val_loss_values)

    loss_curve.append(avg_train_loss)
    print(f"Epoch {epoch+1}/{epochs}, Train Loss: {avg_train_loss:.4f}, Val Loss: {val_loss:.4f}")

print("\nTraining complete. Saving weights...")
current_dir = os.getcwd()
os.chdir(model_dir)
sampling_client = training_client.save_weights_and_get_sampling_client(name="your_model_name")
os.chdir(current_dir)

# Sample a few fixed prompts with real tokenization at sampling time
prompts = [
    "Emergency: suit pressure below 3.0 psi-immediate actions?",
    "Pre-EVA: full airlock depressurization checklist",
    "Comms lost: no response on primary and backup-what now?"
]

print("\nGenerating responses to validate training...")
for idx, prompt in enumerate(prompts):
    # Real tokenization at sampling time using tok.encode()
    prompt_tokens = tok.encode(prompt)
    model_input = ModelInput.from_ints(prompt_tokens)
    response_future = sampling_client.sample(model_input, num_samples=1, sampling_params=SamplingParams(max_tokens=100))
    
    # Wait for the future to complete
    response_result = response_future.result()
    
    # Debug: Print what we got back for the first response only
    if idx == 0:
        print(f"\nDEBUG: Type of response_result: {type(response_result)}")
        print(f"DEBUG: Dir of response_result: {[attr for attr in dir(response_result) if not attr.startswith('_')]}")
        if hasattr(response_result, '__dict__'):
            print(f"DEBUG: response_result.__dict__: {response_result.__dict__}")
    
    decoded_text = None
    
    # Try to extract token sequences and decode
    try:
        # Try accessing sequences attribute (common in generation outputs)
        if hasattr(response_result, 'sequences'):
            sequences = response_result.sequences
            print(f"DEBUG: Found sequences attribute, type: {type(sequences)}")
            
            # If sequences is a list of sequence objects
            if isinstance(sequences, list) and len(sequences) > 0:
                first_seq = sequences[0]
                print(f"DEBUG: First sequence type: {type(first_seq)}")
                print(f"DEBUG: First sequence dir: {[attr for attr in dir(first_seq) if not attr.startswith('_')]}")
                
                # SampledSequence objects have a .tokens attribute
                if hasattr(first_seq, 'tokens'):
                    decoded_text = tok.decode(first_seq.tokens)
                    print(f"DEBUG: Decoded from sequences[0].tokens")
                else:
                    print(f"DEBUG: First sequence has no tokens attribute")
                    if hasattr(first_seq, '__dict__'):
                        print(f"DEBUG: first_seq.__dict__: {first_seq.__dict__}")
    except Exception as e:
        print(f"DEBUG: Error accessing sequences: {e}")
    
    
    # Last resort: try treating response_result as a list of tokens
    if decoded_text is None:
        try:
            if isinstance(response_result, list):
                decoded_text = tok.decode(response_result)
                print(f"DEBUG: Decoded response_result as list")
            else:
                decoded_text = f"[Could not decode: {type(response_result).__name__}]"
                print(f"DEBUG: Could not find decodable tokens, showing type instead")
        except Exception as e:
            decoded_text = f"[Decoding error: {str(e)}]"
            print(f"DEBUG: Final decoding attempt failed: {e}")
    
    print(f"\nQ: {prompt}")
    print(f"Response: {decoded_text}\n")

print("\nmodel_path:", sampling_client.model_path)
print("loss_curve:", loss_curve)