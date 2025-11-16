import uvicorn
import os
import sys

# Add the project root to Python path
project_root = os.path.dirname(os.path.abspath(__file__))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from aura_ai.server import app

if __name__ == "__main__":
    print("Starting AURA AI Server...")
    print(f"Working directory: {os.getcwd()}")
    print(f"Project root: {project_root}")
    uvicorn.run(app, host="0.0.0.0", port=5001)

# Export the app for uvicorn
app = app