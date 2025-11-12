import requests
import time

def test_endpoint():
    max_attempts = 10
    for attempt in range(max_attempts):
        try:
            print(f"Attempt {attempt + 1}/{max_attempts}...")
            response = requests.post('http://localhost:5000/api/openrouter',
                                   json={'query': 'test message'},
                                   timeout=5)
            print(f"Status: {response.status_code}")
            print(f"Response: {response.text}")
            return
        except requests.exceptions.ConnectionError:
            print("Server not ready, waiting...")
            time.sleep(2)
        except Exception as e:
            print(f"Error: {e}")
            return

    print("Failed to connect to server after all attempts")

if __name__ == "__main__":
    test_endpoint()