# 18th International Space Challenge - Project AURA

[![Website](https://img.shields.io/badge/Website-18th--international--space--challenge.vercel.app-blue)](https://18th-international-space-challenge.vercel.app/)
[![AI Demo](https://img.shields.io/badge/AI--Demo-AuraAIModel-green)](https://github.com/DSeahYS/18th-International-Space-Challenge/tree/main/AuraAIModel)

## Project Overview

**Project AURA (Autonomous Unified Reality Augmentation)** is a conceptual, suit-integrated support ecosystem designed for astronauts on long-duration, deep space missions where significant communication latency with Earth makes real-time ground support impossible.

The core objective is to create a symbiotic human-AI partner that enhances astronaut autonomy, safety, and operational effectiveness by providing a suite of integrated, locally-processed capabilities.

## 🚀 **AI Brain Demonstration - Why Fine-Tuning Matters**

**Experience the technical superiority of AURA's AI approach** through our interactive comparison website:

### **Three AI Models Compared:**
| Feature | Vanilla LLM (Tourist) | RAG (Librarian) | **AURA Fine-Tuned (Partner)** |
|---------|----------------------|-----------------|-------------------------------|
| **Domain Knowledge** | ❌ None | ✅ Has the book | ✅ **Is the book** |
| **Inference Speed** | Fast | ❌ Slow (Must search) | ✅ **Instant (Reflex)** |
| **Context Window** | ✅ Free | ❌ Clogged (Full of PDF) | ✅ **Free (Ready for sensor data)** |
| **Role** | Ignorant | Passive Tool | **Active Symbiote** |

### **The Problem: Life-Critical, Real-Time Systems**
AURA requires AI that meets three mission-critical criteria:
- **Sovereign**: Works without Earth connection due to communication latency
- **Instantaneous**: Sub-100ms response time for hazard detection
- **Symbiote**: Active partner fusing live biometric/suit data

**Try it yourself:** [AuraAIModel AI Comparison Demo](https://github.com/DSeahYS/18th-International-Space-Challenge/tree/main/AuraAIModel)

### The Vision

Long-duration deep space missions present unprecedented challenges. Communication with Earth can take hours or days due to vast distances, making real-time support impossible. Astronauts must operate with complete autonomy, relying on their training, equipment, and now, an intelligent AI companion.

Project AURA bridges this gap by creating a symbiotic human-AI partnership that enhances safety, efficiency, and decision-making in the most extreme environments.

## Core Features

### 1. Sovereign AI Brain
A central, self-contained AI core that operates entirely offline, functioning as a multi-agent system to:
- Manage and deliver mission procedures and technical manuals
- Monitor and analyze telemetry data for anomalies
- Provide real-time spatial mapping and navigational pathfinding
- Interpret biometric data to understand astronaut state

### 2. Adaptive AR/XR Visual Interface
Helmet-integrated display with dynamic information adaptation:
- Auto-Dashboarding paradigm that adapts UI based on task, location, and physiological state
- Voice-controlled procedural and navigational guidance
- Interactive overlays of instructions, schematics, and directional cues

### 3. Closed-Loop Biometric Monitoring
Continuous physiological data processing for proactive adjustments:
- Real-time collection of ECG, HRV, respiration, and other vital signs
- AI inference of physical and psychological state (fatigue, cognitive load, stress)
- Closed feedback loop enabling system to adjust AR interface based on condition

### 4. Adaptive Contingency Engineering (ACE) Module
Generative problem-solving for hardware failures:
- 3D scanning of broken components
- Voice-commanded functional requirements definition
- AI-generated, structurally sound, 3D-printable replacement parts
- AR verification before autonomous manufacturing

### 5. Embodied Kinematic Model (VPK)
Real-time digital twin of astronaut's body and movements:
- Body-centric AR guidance relative to limbs and field of view
- Ergonomic validation for component installability
- Fusion of movement and biometric data for better stress differentiation

## Repository Structure

```
18th-International-Space-Challenge/
├── AuraAIModel/                  # 🧠 AI Brain & Comparison Demo
│   ├── index.html                # Interactive AI comparison website
│   ├── api.py                    # Python API server (Tinker, RAG, OpenRouter)
│   ├── inference.py              # Model loading utilities
│   ├── train_script.py           # Fine-tuning training script
│   ├── api/                      # Vercel serverless functions
│   │   ├── query.js             # AURA fine-tuned model API
│   │   ├── rag.js               # Vanilla RAG implementation
│   │   └── openrouter.js        # Base Llama model API
│   ├── data/                    # Training datasets
│   ├── model/                   # Saved model artifacts
│   ├── ui/                      # Alternative UI components
│   ├── styles.css               # Green space theme
│   └── README.md                # AI technical documentation
├── SpaceWebsite/                 # Main project website
│   ├── frontend/                 # Next.js website application
│   │   ├── src/
│   │   │   ├── app/              # Next.js app router pages
│   │   │   │   ├── features/     # Feature detail pages
│   │   │   │   ├── team/         # Team information
│   │   │   │   ├── investors/    # Investor relations
│   │   │   │   │   └── page.tsx  # Homepage
│   │   │   └── components/       # React components
│   │   └── package.json          # Frontend dependencies
│   ├── memory/                   # Project documentation
│   │   ├── spec.md              # Website specification
│   │   ├── plan.md              # Tech stack and development plan
│   │   └── constitution.md      # Project constitution
│   ├── prototypes/              # System prototypes
│   │   └── ai-brain/            # AI Brain prototype (Python)
│   └── SpaceUI/                 # UI development tools
├── AlphaGenome/                  # DNA sequence analysis model
├── Astroskin/                    # Biometric monitoring system
├── VPK AURA/                     # Neural Jacobian Fields (kinematic modeling)
├── Aura TLTX/                    # Additional AURA components
├── SimpleTowerOfChallenges/      # Challenge-related project
├── TowerOfChallenges/            # Separate challenge game project
└── specs/                        # Project specifications
```

## Technology Stack

### Website & Frontend
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Anime.js
- **Charts**: Mermaid
- **Hosting**: Vercel

### AI Brain & Comparison Demo
- **Fine-Tuning Framework**: Tinker (distributed training)
- **Base Models**: Llama-3.1-8B-Instruct, Qwen, DeepSeek
- **Training Data**: EVA procedures, technical manuals
- **Comparison APIs**: OpenRouter, Custom RAG implementation
- **Frontend**: Vanilla JavaScript, NASA-inspired green theme
- **Backend**: FastAPI (Python), Vercel serverless functions

### AI & Machine Learning Components
- **AI Brain**: Python, TensorFlow Lite, Akka Platform
- **Multi-Agent System**: Microsoft AutoGen
- **Biometric Processing**: Custom algorithms for physiological data
- **Generative Design**: Integration with CAD tools
- **Kinematic Modeling**: Neural Jacobian Fields
- **Fine-Tuning**: LoRA adaptation, supervised learning
- **Real-Time Inference**: Sub-100ms response requirements

### Hardware Integration
- **AR/XR**: Microsoft HoloLens 3 or Varjo XR-4
- **3D Scanning**: Artec 3D Scanners
- **Biometric Sensors**: Non-invasive physiological monitoring
- **3D Printing**: Space-grade additive manufacturing

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+ (for AI components)
- Git

### 🚀 **AI Brain Comparison Demo**

**Experience AURA's AI superiority firsthand:**

1. **Navigate to AI demo directory**
   ```bash
   cd AuraAIModel
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) for the AI comparison interface

4. **Start the backend API** (in a separate terminal)
   ```bash
   python api.py
   ```
   API runs on [http://localhost:5000](http://localhost:5000)

**What you'll see:**
- **AURA Fine-tuned**: Instant EVA procedure responses
- **Vanilla RAG**: Slower retrieval-based answers
- **Base Llama**: General AI without domain knowledge
- **Performance metrics**: Response times and token usage

### Running the Main Website

1. **Navigate to the website directory**
   ```bash
   cd SpaceWebsite/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Running Legacy AI Prototypes

1. **Navigate to AI Brain prototype**
   ```bash
   cd SpaceWebsite/prototypes/ai-brain
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the prototype**
   ```bash
   python ai_brain_prototype.py
   ```

## Key Components

### 🧠 AuraAIModel - AI Brain & Technical Demonstration
**The heart of AURA's AI capabilities** - Interactive comparison website demonstrating why fine-tuned AI is essential for space applications:

- **3-Model Comparison**: AURA Fine-tuned vs Vanilla RAG vs Base Llama
- **Real-Time Metrics**: Response times, token usage, performance analysis
- **Technical Validation**: Proves fine-tuning superiority for life-critical systems
- **Training Scripts**: Tinker-based fine-tuning on EVA procedures
- **API Endpoints**: RESTful APIs for all three AI approaches
- **Professional UI**: NASA-inspired green space theme

**Live Demo**: [AuraAIModel Directory](https://github.com/DSeahYS/18th-International-Space-Challenge/tree/main/AuraAIModel)

### SpaceWebsite
The main project showcase website featuring:
- Interactive feature demonstrations
- Team information and expertise
- Investor relations portal
- Comprehensive project documentation

### AlphaGenome
Google DeepMind's regulatory variant effect prediction model for DNA sequence analysis, integrated for advanced biological monitoring capabilities.

### Astroskin
Non-invasive biometric monitoring system for continuous physiological data collection and analysis.

### VPK AURA (Neural Jacobian Fields)
Advanced kinematic modeling system for real-time digital twin creation and embodied movement tracking.

## Development Roadmap

### Phase 1: Initiation & Planning ✅
- Project scope definition
- Requirements gathering
- Technical specifications
- Architecture design

### Phase 2: MVP Development ✅
- Interactive website with feature showcases
- AI Brain prototype implementation
- Component documentation

### Phase 2.5: AI Brain Technical Validation ✅
- **AURA Fine-tuned AI**: Tinker-based training on EVA procedures
- **3-Model Comparison Demo**: Interactive website proving fine-tuning superiority
- **Technical Documentation**: Why RAG fails for life-critical systems
- **Performance Metrics**: Real-time speed and accuracy comparisons

### Phase 3: System Prototyping 🔄
- Sovereign AI Brain development (core validated ✅)
- AR/XR interface prototyping
- Biometric monitoring system
- ACE module development
- VPK kinematic modeling

### Phase 4: Integration & Testing
- Component integration
- System validation
- Environmental testing

### Phase 5: Deployment & Certification
- Flight qualification
- NASA certification
- Mission deployment

## Market Opportunity

### Space Applications
- **NASA Deep Space Missions**: Mars, lunar, and asteroid missions
- **Commercial Spaceflight**: Space tourism and orbital stations
- **Satellite Servicing**: Autonomous maintenance operations

### Terrestrial Applications
- **Healthcare**: High-risk workforce monitoring, elite athlete optimization
- **Industrial AR**: Predictive maintenance, smart grid optimization
- **Emergency Response**: Rapid contingency engineering, telemedicine

### Business Projections
- **10-Year Revenue Total**: $1.8B
- **Space Market TAM**: $1.15B
- **Terrestrial Market TAM**: $15.44B
- **Projected ROI**: 117%

## Team & Partners

### Core Development Team
- **Dave Seah Yong Sheng**: Founder, Chief Architect, and Chief Research
- **Darren Seah Yong Liang**: Co-Founder, AI Flow & Automation Lead
- **Timothy Isaac Chua**: Biometric Suit & Human Factors Lead
- **Wong Jia Sheng Timothy**: ACE Module Lead

### Industry Mentors
- **Don Balanzat**: XR & AI Systems Developer, ChaoticCuriosity
- **Sanjeev Sharma**: Principal Dynamics Engineer, SpaceX (Retired)
- **Matthew Chew**: Nuclear Competency & Strategy Lead, HY

## Contributing

This repository contains multiple interconnected projects. Please see individual component READMEs for specific contribution guidelines:

- [AuraAIModel/README.md](AuraAIModel/README.md) - AI Brain & Comparison Demo
- [SpaceWebsite/frontend/README.md](SpaceWebsite/frontend/README.md) - Main Website
- [AlphaGenome/README.md](AlphaGenome/README.md) - DNA Analysis
- [VPK AURA/README.md](VPK AURA/README.md) - Kinematic Modeling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- **Website**: https://18th-international-space-challenge.vercel.app/
- **Email**: info@projectaura.com
- **LinkedIn**: [Project AURA](https://linkedin.com/company/project-aura)

---

*Project AURA: THE ONBOARD AI THAT THINKS WITH YOU, NOT FOR YOU.*
