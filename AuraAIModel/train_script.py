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

# Prepare training data from data/SmallData.md
script_dir = os.path.dirname(os.path.abspath(__file__))
data_file_path = os.path.join(script_dir, "data", "SmallData.md")

with open(data_file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Parse Input/Output pairs from SmallData.md
data = []
lines = content.split('\n')
i = 0
while i < len(lines):
    if lines[i].startswith("Input:"):
        input_text = lines[i][6:].strip()
        i += 1
        output_lines = []
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
    else:
        i += 1

# Use a small subset for minimal script
data = data[:None]  # First 100 examples

# Print the number of Q&A pairs parsed
print(f"Loaded {len(data)} Q&A pairs from SmallData.md")

epochs = 5
batch_size = 2
lr = 0.0001

print("Starting training...")
loss_curve = []

for epoch in range(epochs):
    # Forward-backward on ALL data at once
    fwd = training_client.forward_backward(data, "cross_entropy")
    result = fwd.result()
    
    # Extract loss from loss_fn_outputs based on Tinker API
    # The loss is in loss_fn_outputs[0]["elementwise_loss"] as a TensorData object
    loss_tensor = result.loss_fn_outputs[0]["elementwise_loss"]
    
    # TensorData has a .data attribute containing the list of values
    # Compute the mean of all elementwise losses
    loss_values = loss_tensor.data
    loss_value = sum(loss_values) / len(loss_values)
    
    loss_curve.append(loss_value)
    print(f"Epoch {epoch+1}/{epochs}, Average Loss: {loss_value:.4f}")
    
    # Optimizer step
    training_client.optim_step(AdamParams(learning_rate=lr)).result()

print("\nTraining complete. Saving weights...")
sampling_client = training_client.save_weights_and_get_sampling_client(name="your_model_name")

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