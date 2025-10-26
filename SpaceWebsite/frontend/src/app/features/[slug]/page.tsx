'use client';

import Link from "next/link";
import { notFound } from "next/navigation";
import Flowchart from "../../../components/Flowchart";
import { useEffect, use } from "react";
import { animate, stagger } from "animejs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const featureOrder = [
  "sovereign-ai-brain",
  "adaptive-ar-xr-visual-interface",
  "closed-loop-biometric-monitoring",
  "adaptive-contingency-engineering-ace-module",
  "embodied-kinematic-model-vpk"
];

const features = {
  "sovereign-ai-brain": {
    title: "Sovereign AI Brain",
    description: "A central, self-contained AI core that operates entirely offline.",
    content: `
      The system requires a central, self-contained AI core that operates entirely offline. This AI must function as a multi-agent system, with specialized agents to:
      - Manage and deliver mission procedures and technical manuals.
      - Monitor and analyze telemetry data from the suit and surrounding equipment for anomalies.
      - Provide real-time spatial mapping and navigational pathfinding.
      - Interpret incoming biometric data to understand the astronaut's state.
      A critical feature is a "digital twin" architecture, allowing the onboard AI model to be mirrored and updated with an Earth-based counterpart.
    `,
    videoPlaceholder: "Video Placeholder: AI Brain in Action",
    imagePlaceholder: "Image Placeholder: AI Architecture Diagram",
    flowchart: `graph TD
      A[Data Ingestion] --> B[Data Fusion]
      B --> C[Unified Astronaut State Model]
      C --> D[Priority Arbitration]
      D --> E[Knowledge Management]
      E --> F[Command Generation]
      B --> G[Context Analysis]
      G --> H[Stress Assessment]
      H --> I[Cognitive Load Evaluation]
      D --> J[Alert Prioritization]
      J --> K[Resource Allocation]
      F --> L[AR Interface Commands]
      F --> M[ACE Module Triggers]
      F --> N[Suit Parameter Adjustments]`
  },
  "adaptive-ar-xr-visual-interface": {
    title: "Adaptive AR/XR Visual Interface",
    description: "Helmet-integrated display with dynamic information adaptation.",
    content: `
      The primary user interface should be an augmented reality display integrated into the astronaut's helmet. Key features must include:
      - An "Auto-Dashboarding" paradigm, where the UI dynamically adapts the amount and type of information displayed based on the astronaut's current task, location, and inferred physiological state (e.g., high stress).
      - Interactive, voice-controlled procedural and navigational guidance, with the ability to overlay instructions, schematics, and directional cues directly onto the physical environment.

      In a perfect NASA-like environment, the AR dashboard would include:
      - Real-time telemetry: Suit pressure, oxygen levels, temperature, radiation exposure.
      - Health metrics: Heart rate, respiration, fatigue indicators, stress levels.
      - Navigation: 3D map of spacecraft/habitat, EVA pathfinding, distance to objectives.
      - Alerts: Critical system warnings, anomaly notifications, emergency protocols.
      - Procedural guidance: Step-by-step instructions with visual overlays, tool identification.
      - Environmental data: Atmospheric composition, seismic activity, solar activity.
      - Communication status: Signal strength, message queue, contact windows.
      - Mission timeline: Current phase, upcoming tasks, schedule adjustments.
      - Resource monitoring: Power levels, consumables, equipment status.
    `,
    videoPlaceholder: "Video Placeholder: AR Interface Demo",
    imagePlaceholder: "Image Placeholder: NASA Dashboard Mockup",
    flowchart: `graph TD
      A[AI Brain Commands] --> B[Context Analysis]
      B --> C[Information Prioritization]
      C --> D[Display Mode Selection]
      E[User Voice/Gestures] --> F[Command Recognition]
      F --> G[Intent Interpretation]
      G --> H[Command Processing]
      I[VPK Kinematic Data] --> J[Body Position Tracking]
      J --> K[Field of View Mapping]
      K --> L[Visual Cue Anchoring]
      D --> M[Dynamic Rendering]
      H --> M
      L --> M
      M --> N[AR Overlay Generation]
      N --> O[Holographic Display]
      O --> P[Audio Feedback]`
  },
  "closed-loop-biometric-monitoring": {
    title: "Closed-Loop Biometric Monitoring",
    description: "Continuous physiological data processing for proactive adjustments.",
    content: `
      The system must incorporate a continuous, non-invasive biometric monitoring capability.
      - It needs to collect and process real-time physiological data (ECG, HRV, respiration, etc.).
      - The AI Brain must use this data stream to infer the astronaut's physical and psychological state (e.g., fatigue, cognitive load, stress).
      - This inference must create a closed feedback loop, allowing the system to proactively adjust the AR interface or provide alerts based on the astronaut's condition.
    `,
    videoPlaceholder: "Video Placeholder: Biometric Monitoring Simulation",
    imagePlaceholder: "Image Placeholder: Biometric Data Visualization",
    flowchart: `graph TD
      A[Sensor Data Collection] --> B[Real-time Monitoring]
      B --> C[Data Validation]
      C --> D[Threshold Analysis]
      D --> E[Alert Generation]
      E --> F[AI Brain Notification]
      F --> G[Response Strategy]
      G --> H[Intervention Protocol]
      I[Historical Data] --> J[Trend Analysis]
      J --> K[Predictive Modeling]
      K --> L[Risk Assessment]
      L --> M[Preventive Measures]
      H --> N[User Notification]
      M --> N
      N --> O[Medical Response]`
  },
  "adaptive-contingency-engineering-ace-module": {
    title: "Adaptive Contingency Engineering (ACE) Module",
    description: "Generative problem-solving for hardware failures.",
    content: `
      For handling unforeseen hardware failures where no spare parts exist, the system requires a generative problem-solving module. The workflow should enable an astronaut to:
      - Capture the geometry of a broken component using a 3D scanner.
      - Define functional requirements and constraints for a replacement part using natural language voice commands.
      - Utilize a generative AI to design a novel, structurally sound, and 3D-printable component that meets those constraints.
      - Verify the generated design in the AR interface before sending it to an onboard 3D printer for autonomous manufacturing.
    `,
    videoPlaceholder: "Video Placeholder: ACE Module Workflow",
    imagePlaceholder: "Image Placeholder: 3D Printed Part Example",
    flowchart: `graph TD
      A[Component Failure] --> B[3D Scan Capture]
      B --> C[Geometry Analysis]
      C --> D[Functional Requirements]
      D --> E[Voice Command Input]
      E --> F[AI Design Generation]
      F --> G[Structural Validation]
      G --> H[Material Selection]
      H --> I[Printability Check]
      I --> J[AR Preview]
      J --> K[User Approval]
      K --> L[Print Job Creation]
      L --> M[3D Printer Execution]
      M --> N[Quality Verification]
      N --> O[Installation Guidance]`
  },
  "embodied-kinematic-model-vpk": {
    title: "Embodied Kinematic Model (VPK)",
    description: "Real-time digital twin of the astronaut's body and movements.",
    content: `
      The system needs to create and maintain a real-time, adaptive digital twin of the astronaut's own body and movements. This kinematic model is essential for:
      - Enabling "body-centric" AR guidance, where visual cues are relative to the astronaut's limbs and field of view.
      - Performing ergonomic validation to ensure that any component designed by the ACE module is physically installable by the astronaut.
      - Fusing movement data with biometric data to help the AI better differentiate between physical exertion and psychological stress.
    `,
    videoPlaceholder: "Video Placeholder: VPK Body Tracking",
    imagePlaceholder: "Image Placeholder: Digital Twin Visualization",
    flowchart: `graph TD
      A[Motion Capture Sensors] --> B[Real-time Data Stream]
      B --> C[Joint Position Tracking]
      C --> D[Body Pose Estimation]
      D --> E[Movement Pattern Analysis]
      E --> F[Digital Twin Update]
      F --> G[Ergonomic Validation]
      G --> H[AR Cue Positioning]
      H --> I[Task Guidance]
      J[Biometric Data] --> K[Physical State Fusion]
      K --> L[Fatigue Assessment]
      L --> M[Performance Optimization]
      M --> N[Adaptive Assistance]
      I --> O[Visual Feedback]
      N --> O
      O --> P[User Interaction]`
  }
};

export default function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const feature = features[slug as keyof typeof features];

  if (!feature) {
    notFound();
  }

  const currentIndex = featureOrder.indexOf(slug);
  const prevFeature = currentIndex > 0 ? featureOrder[currentIndex - 1] : null;
  const nextFeature = currentIndex < featureOrder.length - 1 ? featureOrder[currentIndex + 1] : null;

  useEffect(() => {
    // Simple, clean entrance animations
    animate('h1', {
      translateY: [-30, 0],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutQuad'
    });

    animate('h1 + p', {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 500,
      delay: 200,
      easing: 'easeOutQuad'
    });

    // Simple flowchart entrance
    animate('.bg-slate-800', {
      scale: [0.95, 1],
      opacity: [0, 1],
      duration: 600,
      delay: 400,
      easing: 'easeOutQuad'
    });

    // Simple navigation buttons
    animate('.nav-button', {
      scale: [0.9, 1],
      opacity: [0, 1],
      delay: 600,
      duration: 400,
      easing: 'easeOutQuad'
    });

    // Simple navigation dots
    animate('.w-3', {
      scale: [0.8, 1],
      opacity: [0, 1],
      delay: stagger(50, { start: 700 }),
      duration: 300,
      easing: 'easeOutQuad'
    });

    // Simple hover effects for nav buttons
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        animate(button, {
          scale: 1.05,
          duration: 200,
          easing: 'easeOutQuad'
        });
      });
      button.addEventListener('mouseleave', () => {
        animate(button, {
          scale: 1,
          duration: 200,
          easing: 'easeOutQuad'
        });
      });
    });

    // Simple content sections
    animate('.grid.grid-cols-1', {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: 500,
      duration: 500,
      easing: 'easeOutQuad'
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white min-h-screen">
      {/* Header with Navigation */}
      <header className="bg-slate-800 py-4 px-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/icons/Logo.png"
              alt="Project AURA Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold text-blue-400">Project AURA</span>
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/#features" className="hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="/#vision" className="hover:text-blue-400 transition-colors">
              Vision
            </Link>
            <Link href="/#technology" className="hover:text-blue-400 transition-colors">
              Technology
            </Link>
          </div>
        </nav>
      </header>

      {/* Feature Content */}
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">{feature.title}</h1>
          <p className="text-xl mb-8 text-center text-gray-300">{feature.description}</p>

          <div className="bg-slate-800 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Processing Flow</h2>
            {feature.flowchart ? (
              <Flowchart chart={feature.flowchart} />
            ) : (
              <div className="bg-gray-700 p-4 rounded text-sm font-mono text-gray-300 overflow-x-auto">
                <pre>{`
Data Ingestion → Data Fusion → Unified Astronaut State Model
                      ↓
            Priority Arbitration → Knowledge Management → Command Generation
                      ↓
            AR Interface Commands | ACE Module Triggers | Suit Adjustments
                `}</pre>
              </div>
            )}
            <p className="text-sm text-gray-400 mt-2">
              Interactive flowchart showing the module's data processing pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Video Demonstration</h3>
              <div className="bg-gray-700 h-64 flex items-center justify-center rounded">
                <p className="text-gray-400">{feature.videoPlaceholder}</p>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Visual Reference</h3>
              <div className="bg-gray-700 h-64 flex items-center justify-center rounded">
                <p className="text-gray-400">{feature.imagePlaceholder}</p>
              </div>
            </div>
          </div>

          {/* Feature Navigation */}
          <div className="flex justify-center items-center space-x-6 mt-12 mb-8">
            {prevFeature && (
              <Link
                href={`/features/${prevFeature}`}
                className="nav-button flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </Link>
            )}

            <div className="flex space-x-2">
              {featureOrder.map((featureSlug, index) => (
                <Link
                  key={featureSlug}
                  href={`/features/${featureSlug}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    featureSlug === slug
                      ? 'bg-blue-400 scale-125'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            {nextFeature && (
              <Link
                href={`/features/${nextFeature}`}
                className="nav-button flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>

          <div className="text-center">
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
