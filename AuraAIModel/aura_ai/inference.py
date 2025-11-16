import os
import logging
from dotenv import load_dotenv
from tinker import ServiceClient, ModelInput, SamplingParams
from tinker_cookbook.tokenizer_utils import get_tokenizer

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def load_model_path():
    """Load the model path from model/model_path.txt"""
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)  # Go up one level to project root
        model_path_file = os.path.join(project_root, "model", "model_path.txt")
        with open(model_path_file, "r", encoding="utf-8") as f:
            model_path = f.read().strip()
        logger.info(f"Loaded model path: {model_path}")
        return model_path
    except Exception as e:
        logger.error(f"Failed to load model path: {e}")
        raise

def create_sampling_client(api_key, model_path):
    """Create and return a sampling client using the saved model path"""
    try:
        client = ServiceClient(api_key=api_key)
        sampling_client = client.create_sampling_client(model_path=model_path)
        logger.info("Sampling client created successfully")
        return sampling_client
    except Exception as e:
        logger.error(f"Failed to create sampling client: {e}")
        raise

def get_tokenizer():
    """Get the tokenizer using the tinker_cookbook utility"""
    try:
        # Use the base model name since we know it's Llama-3.1-8B-Instruct
        model_name = "meta-llama/Llama-3.1-8B-Instruct"

        from tinker_cookbook.tokenizer_utils import get_tokenizer as get_tokenizer_util
        tokenizer = get_tokenizer_util(model_name)
        logger.info("Tokenizer retrieved successfully using tinker_cookbook")
        return tokenizer
    except Exception as e:
        logger.error(f"Failed to get tokenizer: {e}")
        raise

def generate_response(sampling_client, tokenizer, user_input, max_tokens=2000, temperature=0.1, top_p=0.9, top_k=-1, stop_sequences=None):
    """Generate a response for the user query"""
    try:
        # Format the prompt to match training data format
        prompt = f"Input: {user_input}\n\nOutput:"
        logger.info(f"Formatted prompt: {prompt}")

        # Tokenize the prompt
        tokens = tokenizer.encode(prompt)
        model_input = ModelInput.from_ints(tokens)

        # Set default stop sequences if none provided
        if stop_sequences is None:
            stop_sequences = ["\n\n", "###", "Input:", "Output:"]

        # Generate response with comprehensive sampling parameters to override Tinker internal limits
        response_future = sampling_client.sample(
            model_input,
            num_samples=1,
            sampling_params=SamplingParams(
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                top_k=top_k,
                stop=stop_sequences
            )
        )
        response_result = response_future.result()

        # Extract and decode the response using standard tinker API format
        decoded_text = extract_and_decode_response(response_result, tokenizer)

        logger.info(f"Generated response: {decoded_text}")
        return decoded_text

    except Exception as e:
        logger.error(f"Failed to generate response: {e}")
        raise

def extract_and_decode_response(response_result, tokenizer):
    """Extract and decode response using standard tinker API format"""
    try:
        # Standard tinker API returns a SamplingResult with sequences attribute
        if hasattr(response_result, 'sequences') and response_result.sequences:
            # Get the first sequence
            sequence = response_result.sequences[0]
            
            # SampledSequence objects have a .tokens attribute
            if hasattr(sequence, 'tokens'):
                return tokenizer.decode(sequence.tokens)
            
            # Fallback: if tokens attribute doesn't exist, try data attribute
            elif hasattr(sequence, 'data'):
                return tokenizer.decode(sequence.data)
                
        # Fallback: treat response_result as a list of token IDs
        elif hasattr(response_result, '__iter__') and not isinstance(response_result, str):
            # Handle direct token list responses
            try:
                return tokenizer.decode(list(response_result))
            except:
                # If that fails, convert to list first
                return tokenizer.decode([t for t in response_result if isinstance(t, int)])
        
        # Last resort: return error information
        logger.warning(f"Could not extract tokens from response: {type(response_result)}")
        return f"[Unable to decode response - unexpected format: {type(response_result).__name__}]"
        
    except Exception as e:
        logger.error(f"Error extracting response: {e}")
        return f"[Extraction error: {str(e)}]"

def main():
    """Main function to demonstrate inference"""
    try:
        # Load environment variables
        load_dotenv()
        api_key = os.getenv("TINKER_API_KEY")
        if not api_key:
            raise ValueError("TINKER_API_KEY not found in environment variables")

        # Load model path
        model_path = load_model_path()

        # Create service client
        service_client = ServiceClient(api_key=api_key)

        # Get tokenizer
        tokenizer = get_tokenizer()

        # Create sampling client
        sampling_client = create_sampling_client(api_key, model_path)

        # Example usage
        user_queries = [
            "Emergency: suit pressure below 3.0 psi-immediate actions?",
            "Pre-EVA: full airlock depressurization checklist",
            "Comms lost: no response on primary and backup-what now?"
        ]

        for query in user_queries:
            response = generate_response(sampling_client, tokenizer, query)
            print(f"Query: {query}")
            print(f"Response: {repr(response)}")
            print("-" * 50)

    except Exception as e:
        logger.error(f"Inference script failed: {e}")
        raise

if __name__ == "__main__":
    main()