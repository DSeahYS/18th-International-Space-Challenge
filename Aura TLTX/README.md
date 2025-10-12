<h1 align="center">WhisperLiveKit for ISC18 AURA System</h1>

<p align="center">
<img src="https://raw.githubusercontent.com/QuentinFuxa/WhisperLiveKit/refs/heads/main/demo.png" alt="WhisperLiveKit Demo" width="730">
</p>

<p align="center"><b>Real-Time Language Translation Subsystem for Astronaut Communication</b></p>

<p align="center">
<a href="https://pypi.org/project/whisperlivekit/"><img alt="PyPI Version" src="https://img.shields.io/pypi/v/whisperlivekit?color=g"></a>
<a href="https://pepy.tech/project/whisperlivekit"><img alt="PyPI Downloads" src="https://static.pepy.tech/personalized-badge/whisperlivekit?period=total&units=international_system&left_color=grey&right_color=brightgreen&left_text=installations"></a>
<a href="https://pypi.org/project/whisperlivekit/"><img alt="Python Versions" src="https://img.shields.io/badge/python-3.9--3.15-dark_green"></a>
<a href="https://github.com/QuentinFuxa/WhisperLiveKit/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT/Dual Licensed-dark_green"></a>
</p>


Real-time speech transcription and translation subsystem integrated into the AURA (Autonomous Robotic Assistant for Universal Rovers and Astronauts) system for the 18th International Space Challenge (ISC18). Enables seamless multi-language communication among international astronaut crews during deep space missions where Earth-based support is unavailable. ✨

#### Part of Project AURA - ISC18 Core Modules:

- **Sovereign AI Brain**: Central AI orchestrator for mission autonomy
- **Adaptive AR/XR Visual Interface**: Helmet-integrated display for astronaut interaction
- **Closed-Loop Biometric Monitoring**: Real-time physiological state assessment
- **Adaptive Contingency Engineering (ACE) Module**: On-demand 3D printing for repairs
- **Embodied Kinematic Model (VPK)**: Digital twin for astronaut movement tracking

#### Powered by Leading Research:

- [SimulStreaming](https://github.com/ufalSimulStreaming) (SOTA 2025) - Ultra-low latency transcription using [AlignAtt policy](https://arxiv.org/pdf/2305.11408)
- [NLLB](https://arxiv.org/abs/2207.04672), ([distilled](https://huggingface.co/entai2965/nllb-200-distilled-600M-ctranslate2)) (2024) - Translation to more than 100 languages.
- [WhisperStreaming](https://github.com/ufal/whisper_streaming) (SOTA 2023) - Low latency transcription using [LocalAgreement policy](https://www.isca-archive.org/interspeech_2020/liu20s_interspeech.pdf)
- [Streaming Sortformer](https://arxiv.org/abs/2507.18446) (SOTA 2025) - Advanced real-time speaker diarization
- [Diart](https://github.com/juanmc2005/diart) (SOTA 2021) - Real-time speaker diarization
- [Silero VAD](https://github.com/snakers4/silero-vad) (2024) - Enterprise-grade Voice Activity Detection


> **Why not just run a simple Whisper model on every audio batch?** Whisper is designed for complete utterances, not real-time chunks. Processing small segments loses context, cuts off words mid-syllable, and produces poor transcription. WhisperLiveKit uses state-of-the-art simultaneous speech research for intelligent buffering and incremental processing.


### Role in AURA System

The Real-Time Language Translation Subsystem serves as the communication backbone for international crews on deep space missions. Operating entirely offline with minimal power consumption, it provides:

- **Instant Translation**: Real-time speech-to-speech translation between crew members speaking different languages
- **AR/XR Integration**: Translated text and audio cues overlaid on the astronaut's helmet display
- **Speaker Identification**: Clear attribution of translated messages to specific crew members
- **Context-Aware Adaptation**: Translation quality optimized based on mission phase and crew physiological state

### Adaptive AR/XR Visual Interface Integration

The primary user interface for translated communications is an augmented reality display integrated into the astronaut's helmet. Key features include:

- **Auto-Dashboarding**: The AR interface dynamically adapts the display of translated text based on the astronaut's current task, location, and inferred physiological state (e.g., high stress levels reduce information density)
- **Interactive Guidance**: Voice-controlled translation settings with the ability to overlay translated instructions, schematics, and directional cues directly onto the physical environment
- **Real-Time Overlays**: Translated speech appears as floating text bubbles or audio cues synchronized with speaker identification

See [Figure 1: AURA System Architecture](architecture.png) for integration details.

### Architecture

<img alt="Architecture" src="https://raw.githubusercontent.com/QuentinFuxa/WhisperLiveKit/refs/heads/main/architecture.png" />

*The backend supports multiple concurrent users across the crew. Voice Activity Detection reduces overhead when no voice is detected. Translation processing occurs in parallel with transcription for minimal latency.*

### Installation & Quick Start

```bash
pip install whisperlivekit
```
> You can also clone the repo and `pip install -e .` for the latest version.

#### Space Suit Deployment
For ISC18 AURA integration, deploy on space suit's embedded computing platform:

1. **Model Optimization**: Use distilled NLLB models (600M) for constrained power envelopes
2. **Offline Operation**: Pre-load all required language models before mission launch
3. **Low-Power Mode**: Configure for CPU-only operation with optimized VAD to minimize battery drain
4. **Secure Boot**: Ensure all dependencies are verified and immutable for mission-critical reliability

#### Quick Start
1. **Start the translation server:**
   ```bash
   whisperlivekit-server --model base --language en --target-language zh
   ```

2. **Connect to AURA AR/XR Interface**: The subsystem automatically integrates with the helmet's AR display for real-time translation overlays.

> - See [tokenizer.py](https://github.com/QuentinFuxa/WhisperLiveKit/blob/main/whisperlivekit/simul_whisper/whisper/tokenizer.py) for the list of all available languages.
> - For HTTPS requirements in ground-based testing, see the **Parameters** section for SSL configuration options.

#### Optional Dependencies

| Optional | `pip install` |
|-----------|-------------|
| **Speaker diarization with Sortformer** | `git+https://github.com/NVIDIA/NeMo.git@main#egg=nemo_toolkit[asr]` |
| **Apple Silicon optimized backend** | `mlx-whisper` |
| **NLLB Translation** | `huggingface_hub` & `transformers` |
| *[Not recommanded]*  Speaker diarization with Diart | `diart` |
| *[Not recommanded]*  Original Whisper backend | `whisper` |
| *[Not recommanded]*  Improved timestamps backend | `whisper-timestamped` |
| OpenAI API backend | `openai` |

See  **Parameters & Configuration** below on how to use them.



### Usage Examples

**Command-line Interface**: Start the translation server with various options:

```bash
# Multi-language crew support: English to Mandarin Chinese
whisperlivekit-server --model base --language en --target-language zh --diarization

# European crew: French to German with speaker ID
whisperlivekit-server --model medium --language fr --target-language de --diarization
```


**Python API Integration**: Check [basic_server](https://github.com/QuentinFuxa/WhisperLiveKit/blob/main/whisperlivekit/basic_server.py) for a more complete example of how to use the functions and classes.

```python
from whisperlivekit import TranscriptionEngine, AudioProcessor, parse_args
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from contextlib import asynccontextmanager
import asyncio

transcription_engine = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global transcription_engine
    transcription_engine = TranscriptionEngine(model="base", diarization=True, lan="en", target_language="zh")
    yield

app = FastAPI(lifespan=lifespan)

async def handle_websocket_results(websocket: WebSocket, results_generator):
    async for response in results_generator:
        await websocket.send_json(response)
    await websocket.send_json({"type": "ready_to_stop"})

@app.websocket("/asr")
async def websocket_endpoint(websocket: WebSocket):
    global transcription_engine

    # Create a new AudioProcessor for each connection, passing the shared engine
    audio_processor = AudioProcessor(transcription_engine=transcription_engine)    
    results_generator = await audio_processor.create_tasks()
    results_task = asyncio.create_task(handle_websocket_results(websocket, results_generator))
    await websocket.accept()
    while True:
        message = await websocket.receive_bytes()
        await audio_processor.process_audio(message)
```

**AURA System Integration**: The translation subsystem connects to the AR/XR interface via WebSocket for real-time overlay updates. Biometric data from the Closed-Loop Biometric Monitoring module adjusts translation priority based on crew stress levels.


## Parameters & Configuration


| Parameter | Description | Default |
|-----------|-------------|---------|
| `--model` | Whisper model size. List and recommandations [here](https://github.com/QuentinFuxa/WhisperLiveKit/blob/main/available_models.md) | `small` |
| `--model-dir` | Directory containing Whisper model.bin and other files. Overrides `--model`. | `None` |
| `--language` | Source language. List [here](https://github.com/QuentinFuxa/WhisperLiveKit/blob/main/whisperlivekit/simul_whisper/whisper/tokenizer.py). Use `auto` for detection. | `auto` |
| `--target-language` | Target language for translation using NLLB. Ex: `zh`. [118 languages available](https://github.com/QuentinFuxa/WhisperLiveKit/blob/main/whisperlivekit/translation/mapping_languages.py). | `None` |
| `--task` | Set to `translate` for English-only translation using Whisper. | `transcribe` |
| `--diarization` | Enable speaker identification for crew member attribution | `False` |
| `--backend` | Processing backend. Use `faster-whisper` if SimulStreaming fails | `simulstreaming` |
| `--no-vac` | Disable Voice Activity Controller | `False` |
| `--no-vad` | Disable Voice Activity Detection | `False` |
| `--warmup-file` | Audio file path for model warmup | `jfk.wav` |
| `--host` | Server host address | `localhost` |
| `--port` | Server port | `8000` |
| `--ssl-certfile` | Path to SSL certificate for secure ground testing | `None` |
| `--ssl-keyfile` | Path to SSL key for secure ground testing | `None` |
| `--pcm-input` | Raw PCM input for space suit audio integration | `False` |

| Translation options | Description | Default |
|-----------|-------------|---------|
| `--nllb-backend` | `transformers` or `ctranslate2` | `ctranslate2` |
| `--nllb-size` | `600M` or `1.3B` (use 600M for space constraints) | `600M` |

| Diarization options | Description | Default |
|-----------|-------------|---------|
| `--diarization-backend` |  `diart` or `sortformer` | `sortformer` |
| `--disable-punctuation-split` |  Disable punctuation based splits. See #214 | `False` |
| `--segmentation-model` | Hugging Face model ID for Diart segmentation model. [Available models](https://github.com/juanmc2005/diart/tree/main?tab=readme-ov-file#pre-trained-models) | `pyannote/segmentation-3.0` |
| `--embedding-model` | Hugging Face model ID for Diart embedding model. [Available models](https://github.com/juanmc2005/diart/tree/main?tab=readme-ov-file#pre-trained-models) | `speechbrain/spkrec-ecapa-voxceleb` |

| SimulStreaming backend options | Description | Default |
|-----------|-------------|---------|
| `--disable-fast-encoder` | Disable Faster Whisper for low-power operation | `False` |
| `--custom-alignment-heads` | Use custom alignment heads | `None` |
| `--frame-threshold` | AlignAtt frame threshold (lower = faster) | `25` |
| `--beams` | Number of beams for beam search | `1` |
| `--decoder` | Force decoder type | `auto` |
| `--audio-max-len` | Maximum audio buffer length (seconds) | `30.0` |
| `--audio-min-len` | Minimum audio length to process | `0.0` |
| `--cif-ckpt-path` | Path to CIF model | `None` |
| `--never-fire` | Never truncate incomplete words | `False` |
| `--init-prompt` | Initial prompt | `None` |
| `--static-init-prompt` | Static prompt | `None` |
| `--max-context-tokens` | Maximum context tokens | `None` |
| `--model-path` | Direct path to .pt model file | `./base.pt` |
| `--preload-model-count` | Models to preload (set to crew size) | `1` |



| WhisperStreaming backend options | Description | Default |
|-----------|-------------|---------|
| `--confidence-validation` | Use confidence scores | `False` |
| `--buffer_trimming` | Buffer trimming strategy | `segment` |



> For diarization using Diart, you need to accept user conditions [here](https://huggingface.co/pyannote/segmentation) for the `pyannote/segmentation` model, [here](https://huggingface.co/pyannote/segmentation-3.0) for the `pyannote/segmentation-3.0` model and [here](https://huggingface.co/pyannote/embedding) for the `pyannote/embedding` model. **Then**, login to HuggingFace: `huggingface-cli login`

### 🚀 Deployment Guide

To deploy the translation subsystem in the AURA space suit:

1. **Embedded Setup**: Optimize for ARM-based space suit processors with NEON acceleration
2. **Power Management**: Integrate with suit's power subsystem for intelligent scaling based on mission phase
3. **Redundancy**: Deploy dual instances for fail-safe operation during critical communications
4. **AR/XR Integration**: Ensure WebSocket connections to helmet display with low-latency protocols

### 🐋 Docker

Deploy using Docker for ground testing and development:

### Prerequisites
- Docker installed on development system
- For GPU support: NVIDIA Docker runtime

### Quick Start

**With GPU acceleration (recommended for development):**
```bash
docker build -t wlk-aura .
docker run --gpus all -p 8000:8000 --name wlk-aura wlk-aura
```

**CPU only (for space suit simulation):**
```bash
docker build -f Dockerfile.cpu -t wlk-aura .
docker run -p 8000:8000 --name wlk-aura wlk-aura
```

### Advanced Usage

**Custom configuration:**
```bash
# ISC18 crew simulation: English to multiple languages
docker run --gpus all -p 8000:8000 --name wlk-aura wlk-aura --model base --language en --target-language zh --diarization
```

### Memory Requirements
- **Space Suit Constraints**: Models must fit within 2GB RAM limit
- **Large models**: Use only for ground stations with adequate power

#### Customization

- `--build-arg` Options:
  - `EXTRAS="whisper-timestamped"` - Add extras (no spaces)
  - `HF_PRECACHE_DIR="./.cache/"` - Pre-load model cache
  - `HF_TKN_FILE="./token"` - Hugging Face token for gated models

## 🔮 Mission Use Cases
- **Multi-language EVA Communications**: Real-time translation during extravehicular activities
- **International Crew Coordination**: Seamless communication between astronauts from different countries
- **Emergency Procedures**: Translated instructions during high-stress situations
- **Scientific Collaboration**: Cross-cultural scientific discussions without language barriers
- **Mission Control Backup**: Offline translation when Earth communication is delayed
