from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import logging
from inference import load_model_path, create_sampling_client, generate_response, get_tokenizer
import os
from dotenv import load_dotenv
from tinker import ServiceClient
import httpx

# Load environment variables
load_dotenv()
api_key = os.getenv("TINKER_API_KEY")
if not api_key:
    raise ValueError("TINKER_API_KEY not found in environment variables")
openrouter_api_key = os.getenv("OPENROUTER_API_KEY")

# Load model and create clients
model_path = load_model_path()
service_client = ServiceClient(api_key=api_key)
sampling_client = create_sampling_client(api_key, model_path)
tokenizer = get_tokenizer()  # Load the real tokenizer

# Set up FastAPI app
app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "ui")), name="static")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.get("/")
async def root():
    return FileResponse(os.path.join(os.path.dirname(__file__), "ui", "index.html"), media_type="text/html")

@app.post("/api/query")
async def query_endpoint(data: dict):
    if "query" not in data:
        raise HTTPException(status_code=400, detail="Missing 'query' field")

    query = data["query"]
    try:
        response = generate_response(sampling_client, tokenizer, query)
        return {"procedure": response}
    except Exception as e:
        logger.error(f"Error generating response: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/openrouter")
async def openrouter_endpoint(data: dict):
    if "query" not in data:
        raise HTTPException(status_code=400, detail="Missing 'query' field")

    query = data["query"]
    if not openrouter_api_key:
        logger.error("OpenRouter API key not set")
        raise HTTPException(status_code=500, detail="OpenRouter API key not configured")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {openrouter_api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "meta-llama/llama-3.1-8b-instruct",
                    "messages": [{"role": "user", "content": query}],
                },
            )
            response.raise_for_status()
            result = response.json()
            answer = result["choices"][0]["message"]["content"]
            return {"answer": answer}
    except httpx.HTTPStatusError as e:
        logger.error(f"OpenRouter API error: {e}")
        raise HTTPException(status_code=e.response.status_code, detail="OpenRouter API error")
    except Exception as e:
        logger.error(f"Error querying OpenRouter: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)