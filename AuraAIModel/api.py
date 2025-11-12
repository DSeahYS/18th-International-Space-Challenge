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

@app.post("/api/rag")
async def rag_endpoint(data: dict):
    if "query" not in data:
        raise HTTPException(status_code=400, detail="Missing 'query' field")

    query = data["query"]
    if not openrouter_api_key:
        logger.error("OpenRouter API key not set")
        raise HTTPException(status_code=500, detail="OpenRouter API key not configured")

    try:
        # Simple RAG implementation - retrieve context from local data
        context = await retrieve_context(query)
        context_tokens = len(context.split()) * 1.3  # Rough token estimate

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {openrouter_api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "meta-llama/llama-3.1-8b-instruct",
                    "messages": [
                        {
                            "role": "system",
                            "content": f"You are an EVA procedure assistant. Use the following context to provide accurate, helpful responses about space operations and EVA procedures. If the context doesn't contain relevant information, say so clearly.\n\nContext:\n{context}"
                        },
                        {"role": "user", "content": query}
                    ],
                    "temperature": 0.3,
                    "max_tokens": 300
                },
            )
            response.raise_for_status()
            result = response.json()
            answer = result["choices"][0]["message"]["content"]
            usage = result.get("usage", {})

            return {
                "answer": answer,
                "usage": {
                    "context_tokens": int(context_tokens),
                    "generation_tokens": usage.get("completion_tokens", 0),
                    "total_tokens": int(context_tokens) + usage.get("completion_tokens", 0)
                }
            }
    except httpx.HTTPStatusError as e:
        logger.error(f"RAG OpenRouter API error: {e}")
        raise HTTPException(status_code=e.response.status_code, detail="RAG API error")
    except Exception as e:
        logger.error(f"Error in RAG query: {e}")
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
                    "temperature": 0.7,
                    "max_tokens": 300
                },
            )
            response.raise_for_status()
            result = response.json()
            answer = result["choices"][0]["message"]["content"]
            usage = result.get("usage", {})

            return {
                "answer": answer,
                "usage": {
                    "prompt_tokens": usage.get("prompt_tokens", 0),
                    "completion_tokens": usage.get("completion_tokens", 0),
                    "total_tokens": usage.get("total_tokens", 0)
                }
            }
    except httpx.HTTPStatusError as e:
        logger.error(f"OpenRouter API error: {e}")
        raise HTTPException(status_code=e.response.status_code, detail="OpenRouter API error")
    except Exception as e:
        logger.error(f"Error querying OpenRouter: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

async def retrieve_context(query):
    """Simple context retrieval from local data files"""
    try:
        # Try to read local data files
        data_dir = os.path.join(os.path.dirname(__file__), "data")
        context = ""

        # Read FullProcedures.md if it exists
        full_procedures_path = os.path.join(data_dir, "FullProcedures.md")
        if os.path.exists(full_procedures_path):
            with open(full_procedures_path, 'r', encoding='utf-8') as f:
                content = f.read()
                context += content[:2000]  # Limit context size

        # Simple keyword-based context selection
        query_lower = query.lower()
        relevant_sections = []

        if any(word in query_lower for word in ['pressure', 'psi']):
            relevant_sections.append("EMERGENCY SUIT PRESSURE PROTOCOL: Monitor pressure gauges continuously. Critical threshold: below 3.0 psi requires immediate action. Below 2.5 psi: ABORT EVA immediately.")

        if any(word in query_lower for word in ['airlock', 'depressurization']):
            relevant_sections.append("AIRLOCK DEPRESSURIZATION: Close inner hatch with 3 rotations. Verify 4 green indicators. Monitor pressure drop to 3.8 psi.")

        if any(word in query_lower for word in ['communication', 'comms', 'radio']):
            relevant_sections.append("COMMUNICATION PROTOCOLS: Primary channel first, then backup. Emergency beacon activation for complete loss.")

        if relevant_sections:
            context = "\n\n".join(relevant_sections) + "\n\n" + context[:1000]

        return context or "EVA OPERATIONS GENERAL GUIDELINES: Safety first, maintain communication, monitor systems continuously."

    except Exception as e:
        logger.error(f"Context retrieval error: {e}")
        return "EVA OPERATIONS GENERAL GUIDELINES: Safety first, maintain communication, monitor systems continuously."

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)