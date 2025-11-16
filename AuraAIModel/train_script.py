import os
from dotenv import load_dotenv
import re
import torch

load_dotenv()
api_key = os.getenv("TINKER_API_KEY")

from tinker import ServiceClient, Datum, AdamParams, ModelInput, TensorData, SamplingParams

def extract_contextual_knowledge(content, filename, tok, data):
    """Extract contextual knowledge pairs from technical documents"""
    pairs_created = 0
    lines = content.split('\n')
    
    # Strategy 1: Extract section-based Q&A pairs
    # Look for section headers and create knowledge pairs
    sections = []
    current_section = {"title": "", "content": []}
    
    for line in lines:
        line = line.strip()
        if line.startswith('#') and len(line) > 2:
            # Save previous section if it has content
            if current_section["content"]:
                sections.append(current_section)
            # Start new section
            current_section = {"title": line.lstrip('#').strip(), "content": []}
        else:
            if line:  # Only add non-empty lines
                current_section["content"].append(line)
    
    # Add the last section
    if current_section["content"]:
        sections.append(current_section)
    
    # Create knowledge pairs from sections
    for section in sections:
        if len(section["content"]) > 3:  # Only process substantial sections
            title = section["title"]
            content_text = '\n'.join(section["content"])
            
            # Skip very short or table-heavy sections
            if len(content_text) < 50 or content_text.count('|') > 10:
                continue
            
            # Create a knowledge pair
            question = f"What is {title}?"
            answer = content_text[:500] + ("..." if len(content_text) > 500 else "")  # Limit answer length
            
            if question and answer:
                # Real tokenization
                prompt_tokens = tok.encode(question)
                answer_tokens = tok.encode(answer)
                
                # Combine tokens
                all_tokens = prompt_tokens + answer_tokens
                
                # Correct token shifting for causal LM
                input_tokens = all_tokens[:-1]
                target_tokens = all_tokens[1:]
                
                # Proper loss mask creation
                weights = [0.0] * (len(prompt_tokens) - 1) + [1.0] * len(answer_tokens)
                
                # Create Datum with plain Python lists (matching original working format)
                datum = Datum(
                    model_input=ModelInput.from_ints(input_tokens),
                    loss_fn_inputs={
                        "target_tokens": target_tokens,  # Plain Python list
                        "weights": weights  # Plain Python list
                    }
                )
                data.append(datum)
                pairs_created += 1
    
    # Strategy 2: Extract definition-based pairs
    # Look for definition patterns in the content
    definition_patterns = [
        r'(\w+)\s*:\s*(.+)',  # term: definition
        r'(\w+)\s*-\s*(.+)',  # term - definition
        r'The\s+(\w+)\s+is\s+(.+)',  # The term is...
        r'(\w+)\s+refers\s+to\s+(.+)',  # term refers to...
    ]
    
    for pattern in definition_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE | re.MULTILINE)
        for match in matches:
            term, definition = match[:2]
            if len(definition) > 20 and len(definition) < 200:  # Reasonable definition length
                question = f"What is {term}?"
                answer = definition.strip()
                
                # Tokenize and create datum
                prompt_tokens = tok.encode(question)
                answer_tokens = tok.encode(answer)
                
                all_tokens = prompt_tokens + answer_tokens
                input_tokens = all_tokens[:-1]
                target_tokens = all_tokens[1:]
                weights = [0.0] * (len(prompt_tokens) - 1) + [1.0] * len(answer_tokens)
                
                datum = Datum(
                    model_input=ModelInput.from_ints(input_tokens),
                    loss_fn_inputs={
                        "target_tokens": target_tokens,  # Plain Python list
                        "weights": weights  # Plain Python list
                    }
                )
                data.append(datum)
                pairs_created += 1
    
    # Strategy 3: Extract table/structured data
    table_lines = []
    in_table = False
    
    for line in lines:
        if '|' in line and line.count('|') >= 2:  # Table row
            table_lines.append(line)
            in_table = True
        else:
            if in_table and len(table_lines) >= 3:  # End of table with enough rows
                # Process this table
                table_data = []
                for table_line in table_lines[1:]:  # Skip header
                    cells = [cell.strip() for cell in table_line.split('|')[1:-1]]
                    if len(cells) >= 2 and cells[0] and cells[1]:
                        table_data.append((cells[0], cells[1]))
                
                # Create Q&A pairs from table data
                for item, description in table_data[:3]:  # Limit to avoid too many pairs
                    if len(description) > 10:
                        question = f"Tell me about {item}"
                        answer = description
                        
                        # Tokenize and create datum
                        prompt_tokens = tok.encode(question)
                        answer_tokens = tok.encode(answer)
                        
                        all_tokens = prompt_tokens + answer_tokens
                        input_tokens = all_tokens[:-1]
                        target_tokens = all_tokens[1:]
                        weights = [0.0] * (len(prompt_tokens) - 1) + [1.0] * len(answer_tokens)
                        
                        datum = Datum(
                            model_input=ModelInput.from_ints(input_tokens),
                            loss_fn_inputs={
                                "target_tokens": target_tokens,  # Plain Python list
                                "weights": weights  # Plain Python list
                            }
                        )
                        data.append(datum)
                        pairs_created += 1
                
                table_lines = []
                in_table = False
            elif in_table:
                table_lines = []
                in_table = False
    
    return pairs_created

client = ServiceClient(api_key=api_key)
training_client = client.create_lora_training_client(base_model="meta-llama/Llama-3.1-8B-Instruct", rank=32)

# Get tokenizer for real tokenization
tok = training_client.get_tokenizer()

# Prepare training data from all files in data/ directory
script_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(script_dir, "data")

# Define supported file extensions
supported_extensions = {'.md', '.txt', '.json', '.jsonl'}

# Find all data files in the data directory
data_files = []
for filename in os.listdir(data_dir):
    file_path = os.path.join(data_dir, filename)
    if os.path.isfile(file_path):
        _, ext = os.path.splitext(filename.lower())
        if ext in supported_extensions:
            data_files.append(file_path)
            print(f"Found data file: {filename}")

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
    
    # Check if this file contains Q&A pairs or contextual knowledge
    has_input_output = "Input:" in content and "Output:" in content
    is_contextual_doc = not has_input_output and any(keyword in filename.lower() for keyword in ["aura", "project", "technical", "specification"])
    
    if has_input_output:
        # Parse Input/Output pairs from the file (existing logic)
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
    
    elif is_contextual_doc:
        # Extract contextual knowledge from technical documents
        file_pairs = extract_contextual_knowledge(content, filename, tok, data)
        print(f"Extracted {file_pairs} contextual knowledge pairs from {filename}")
        total_pairs_found += file_pairs
        total_files_processed += 1
    
    else:
        print(f"Skipping {filename} - no recognizable format (no Q&A pairs or contextual content)")

print(f"\n=== TRAINING DATA SUMMARY ===")
print(f"Files processed: {total_files_processed}/{len(data_files)}")
print(f"Total Q&A pairs extracted: {total_pairs_found}")
print(f"Training examples prepared: {len(data)}")

# Use all available training data (no subsetting)
# data = data[:None]  # Commented out - we want all data now

# Training data has been successfully loaded from all available files
print(f"Final training dataset contains {len(data)} Q&A pairs")

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