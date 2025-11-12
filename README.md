# 18th International Space Challenge - Project AURA

[![Website](https://img.shields.io/badge/Website-18th--international--space--challenge.vercel.app-blue)](https://18th-international-space-challenge.vercel.app/)

## Project Overview

**Project AURA (Autonomous Unified Reality Augmentation)** is a conceptual, suit-integrated support ecosystem designed for astronauts on long-duration, deep space missions where significant communication latency with Earth makes real-time ground support impossible.

The core objective is to create a symbiotic human-AI partner that enhances astronaut autonomy, safety, and operational effectiveness by providing a suite of integrated, locally-processed capabilities.

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
├── SpaceWebsite/                 # Main project website
│   ├── frontend/                 # Next.js website application
│   │   ├── src/
│   │   │   ├── app/              # Next.js app router pages
│   │   │   │   ├── features/     # Feature detail pages
│   │   │   │   ├── team/         # Team information
│   │   │   │   ├── investors/    # Investor relations
│   │   │   │   └── page.tsx      # Homepage
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

### AI & Machine Learning Components
- **AI Brain**: Python, TensorFlow Lite, Akka Platform
- **Multi-Agent System**: Microsoft AutoGen
- **Biometric Processing**: Custom algorithms for physiological data
- **Generative Design**: Integration with CAD tools
- **Kinematic Modeling**: Neural Jacobian Fields

### Hardware Integration
- **AR/XR**: Microsoft HoloLens 3 or Varjo XR-4
- **3D Scanning**: Artec 3D Scanners
- **Biometric Sensors**: Non-invasive physiological monitoring
- **3D Printing**: Space-grade additive manufacturing

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+ (for AI prototypes)
- Git

### Running the Website Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/18th-International-Space-Challenge.git
   cd 18th-International-Space-Challenge
   ```

2. **Navigate to the website directory**
   ```bash
   cd SpaceWebsite/frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Running AI Prototypes

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

### Phase 3: System Prototyping 🔄
- Sovereign AI Brain development
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

- [SpaceWebsite/frontend/README.md](SpaceWebsite/frontend/README.md)
- [AlphaGenome/README.md](AlphaGenome/README.md)
- [VPK AURA/README.md](VPK AURA/README.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- **Website**: https://18th-international-space-challenge.vercel.app/
- **Email**: info@projectaura.com
- **LinkedIn**: [Project AURA](https://linkedin.com/company/project-aura)

---

*Project AURA: THE ONBOARD AI THAT THINKS WITH YOU, NOT FOR YOU.*
