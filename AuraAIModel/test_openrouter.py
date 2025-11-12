import os
from dotenv import load_dotenv
import httpx

# Load environment variables
load_dotenv()
openrouter_api_key = os.getenv("OPENROUTER_API_KEY")

print(f"API Key loaded: {bool(openrouter_api_key)}")
print(f"Key starts with: {openrouter_api_key[:10] if openrouter_api_key else 'None'}")

async def test_openrouter():
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
                    "messages": [{"role": "user", "content": "Hello, test message"}],
                },
            )
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
            response.raise_for_status()
            result = response.json()
            answer = result["choices"][0]["message"]["content"]
            print(f"Answer: {answer}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    import asyncio
    asyncio.run(test_openrouter())