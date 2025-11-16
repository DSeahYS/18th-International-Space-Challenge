# AURA AI Model - EVA Procedures AI System

<img width="3615" height="2475" alt="AURAAI" src="https://github.com/user-attachments/assets/62ab1a3f-37ae-43e3-bdd8-2db8ed03a661" />
<img width="1103" height="1248" alt="Tinker Training" src="https://github.com/user-attachments/assets/4f20628b-16ed-4643-b3d9-112508bc3748" />


AURA (Autonomous Unit for Response Analysis) is a specialized AI system designed for EVA (Extra-Vehicular Activity) procedures using tinker-cookbook for fine-tuning language models.

## Overview

This system provides:
- **Fine-tuned EVA procedures model** specialized for space suit operations and emergency protocols
- **RAG (Retrieval-Augmented Generation)** for dynamic access to EVA procedure databases
- **Multi-model comparison** between fine-tuned, base, and RAG-enhanced models
- **FastAPI web server** with interactive interface

## Features

- 🎯 **Domain-Specific Training**: Specialized for EVA procedures and space operations
- 🔍 **RAG Integration**: Dynamic retrieval of relevant procedure information
- 🌐 **Web Interface**: RESTful API with interactive testing capabilities
- 📊 **Model Comparison**: Compare fine-tuned vs base vs RAG-enhanced responses
- ⚡ **Optimized Inference**: Streamlined response generation with proper tokenization

## Installation

1. Install the package in development mode:
```bash
pip install -e .
```

2. Set up environment variables:
```bash
# Required
TINKER_API_KEY=your_tinker_api_key_here

# Optional (for OpenRouter comparison)
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## Usage

### Running the Server

```bash
# Method 1: Direct Python execution
python server.py

# Method 2: Using uvicorn
uvicorn server:app --host 0.0.0.0 --port 5001

# Method 3: After package installation
aura-server
```

### Training the Model

```bash
# Method 1: Direct Python execution
python train.py

# Method 2: After package installation
aura-train
```

### Testing Inference

```bash
# Method 1: Direct Python execution
python inference.py

# Method 2: After package installation
aura-infer
```

## API Endpoints

### Core Inference
- `POST /api/query` - AURA fine-tuned model inference
- `POST /api/openrouter` - OpenRouter base model
- `POST /api/openrouter-rag` - OpenRouter with RAG enhancement

### Data and Model Management
- `GET /` - Web interface
- `GET /api/data-summary` - Summary of training data
- `GET /api/models-comparison` - Model capabilities comparison

## Project Structure

```
AuraAIModel Working (Copy)/
├── aura_ai/                    # Main package
│   ├── __init__.py            # Package initialization
│   ├── inference.py           # Inference logic with improved decoding
│   ├── server.py              # FastAPI server with RAG functionality
│   └── train.py               # Training pipeline using tinker primitives
├── data/                       # Training data
│   ├── FullProcedures.md      # EVA procedures database
│   └── SmallData.md           # Additional procedure data
├── model/                      # Model artifacts
│   ├── model_path.txt         # Path to trained model
│   ├── metrics.json           # Training metrics
│   └── samples.txt            # Sample outputs
├── ui/                         # Web interface (static files)
├── .env                        # Environment variables
├── .gitignore                  
├── pyproject.toml             # Package configuration
├── server.py                  # Server entry point
├── train.py                   # Training entry point
└── README.md                  # This file
```

## Key Improvements Made

### ✅ Simplified Response Decoding
- **Before**: Complex multi-level fallback logic with try/catch blocks
- **After**: Clean, readable `extract_and_decode_response()` function
- **Result**: More maintainable and predictable response handling

### ✅ Proper Package Structure
- **Before**: Flat file structure with direct imports
- **After**: Organized `aura_ai` package with proper entry points
- **Result**: Professional packaging following Python best practices

### ✅ Clean Integration with tinker-cookbook
- **Confirmed**: Correct tokenizer import path (`tinker_cookbook.tokenizer_utils`)
- **Enhanced**: Proper use of tinker primitives and tinker-cookbook utilities
- **Result**: Seamless integration with the documented workflow

## Recent Fixes: Token Cutoff Resolution

### Token Cutoff Issue
The system previously experienced response truncation due to Tinker's sampling limitations and insufficient token allocation.

### Resolution
- **Increased max_tokens**: Default raised from 100 to 2000 tokens for complete responses
- **Enhanced Sampling Parameters**: Added temperature (0.7), top_p (0.9), top_k (50), and stop sequences for better generation control
- **Prompt Format Fix**: Changed from "AURA Query:/AURA Procedure:" to "Input:/Output:" for consistency
- **Model Path Loading**: Fixed issues with model path resolution for reliable loading

### Tinker Sampling Limit Workaround
To work around Tinker's sampling constraints, the system now uses optimized sampling parameters and increased token limits to ensure full procedure generation.

### Current Capabilities and Limits
- **Max Output Tokens**: 2000 (configurable)
- **Supported Sampling**: temperature, top_p, top_k, stop sequences
- **Model**: Fine-tuned Llama-3.1-8B-Instruct for EVA procedures
- **Response Format**: Structured Input/Output pairs

## Training Data

The system trains on EVA procedures data including:
- Emergency protocols (suit pressure, communications loss)
- Pre-EVA checklists (airlock depressurization)
- Standard operational procedures
- Safety protocols and risk assessments

## Model Architecture

- **Base Model**: meta-llama/Llama-3.1-8B-Instruct
- **Fine-tuning Method**: LoRA (Low-Rank Adaptation) with rank=32
- **Training Framework**: tinker service with distributed training
- **Data Format**: Input/Output pairs with proper tokenization

## Configuration

### Hyperparameters
- **Learning Rate**: 0.0001
- **Batch Size**: 2
- **Epochs**: 5
- **LoRA Rank**: 32

### Tokenization
- **Tokenizer**: AutoTokenizer from transformers
- **Context Handling**: Proper loss masking for prompt vs response tokens
- **Max Tokens**: Configurable per request (default: 2000)

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure tinker-cookbook is properly installed
   ```bash
   pip install -e ../AURA\ Tinker
   ```

2. **API Key Issues**: Verify environment variables are set
   ```bash
   echo $TINKER_API_KEY
   echo $OPENROUTER_API_KEY
   ```

3. **Model Loading**: Check that `model/model_path.txt` contains valid path
   ```bash
   cat model/model_path.txt
   ```

## Development

### Code Style
- **Linting**: ruff (configured in pyproject.toml)
- **Formatting**: black (100 character line length)
- **Type Checking**: mypy (strict configuration)

### Testing
```bash
# Run tests
pytest

# Run with coverage
pytest --cov=aura_ai
```

## License

This project is part of the AURA space operations AI system.

---

**Built with ❤️ using tinker-cookbook and tinker**
