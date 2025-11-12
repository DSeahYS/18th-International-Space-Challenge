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
        model_path_file = os.path.join(script_dir, "model", "model_path.txt")
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

def generate_response(sampling_client, tokenizer, user_input, max_tokens=100):
    """Generate a response for the user query"""
    try:
        # Format the prompt
        prompt = f"AURA Query: {user_input}\n\nAURA Procedure:"
        logger.info(f"Formatted prompt: {prompt}")

        # Tokenize the prompt
        tokens = tokenizer.encode(prompt)
        model_input = ModelInput.from_ints(tokens)

        # Generate response
        response_future = sampling_client.sample(
            model_input,
            num_samples=1,
            sampling_params=SamplingParams(max_tokens=max_tokens)
        )
        response_result = response_future.result()

        # Extract and decode the response
        decoded_text = None

        # Try to extract from sequences attribute
        try:
            if hasattr(response_result, 'sequences') and isinstance(response_result.sequences, list) and len(response_result.sequences) > 0:
                first_seq = response_result.sequences[0]
                if hasattr(first_seq, 'tokens'):
                    decoded_text = tokenizer.decode(first_seq.tokens)
                else:
                    logger.warning("First sequence has no tokens attribute")
        except Exception as e:
            logger.warning(f"Error accessing sequences: {e}")

        # Fallback: treat response_result as a list of tokens
        if decoded_text is None:
            try:
                if isinstance(response_result, list):
                    decoded_text = tokenizer.decode(response_result)
                else:
                    decoded_text = f"[Could not decode: {type(response_result).__name__}]"
                    logger.warning("Could not find decodable tokens, showing type instead")
            except Exception as e:
                decoded_text = f"[Decoding error: {str(e)}]"
                logger.error(f"Final decoding attempt failed: {e}")

        logger.info(f"Generated response: {decoded_text}")
        return decoded_text

    except Exception as e:
        logger.error(f"Failed to generate response: {e}")
        raise

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