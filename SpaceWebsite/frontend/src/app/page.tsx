'use client';

import { Brain, Eye, Heart, Wrench, User } from "lucide-react";
import Link from "next/link";
import Flowchart from "../components/Flowchart";
import { useEffect } from "react";
import { animate, stagger } from "animejs";

export default function Home() {
  useEffect(() => {
    // Enhanced hero title with morphing effect
    animate('h1', {
      translateY: [-100, 0],
      translateX: [-20, 0],
      rotate: [-5, 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 1200,
      easing: 'easeOutElastic(1, .8)'
    });

    // Subtitle with wave effect
    animate('h1 + p', {
      translateY: [50, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1000,
      delay: 400,
      easing: 'easeOutBounce'
    });

    // Buttons with advanced stagger and morphing
    animate('.hero-buttons > *', {
      translateY: [30, 0],
      translateX: [-10, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      rotate: [10, 0],
      delay: stagger(150, { start: 600 }),
      duration: 800,
      easing: 'easeOutElastic(1, .6)'
    });

    // Feature cards with grid staggering and morphing
    animate('.feature-card', {
      translateY: [80, 0],
      translateX: [-20, 0],
      opacity: [0, 1],
      scale: [0.7, 1],
      rotate: [15, 0],
      delay: stagger(200, {
        grid: [3, 2],
        from: 'center',
        axis: 'x'
      }),
      duration: 1000,
      easing: 'easeOutElastic(1, .7)'
    });

    // Flowchart with advanced entrance
    animate('.flowchart-container', {
      scale: [0.5, 1],
      opacity: [0, 1],
      rotate: [20, 0],
      duration: 1500,
      delay: 1400,
      easing: 'easeOutElastic(1, .5)'
    });

    // Add click system for detailed flowcharts
    setTimeout(() => {
      const flowchartContainer = document.querySelector('.flowchart-container');
      if (flowchartContainer) {
        const mainFlowchart = flowchartContainer.querySelector('.main-flowchart') as HTMLElement;
        const detailedCharts = flowchartContainer.querySelectorAll('.tooltip-chart');
        let currentDetailChart: HTMLElement | null = null;

        // Hide all detailed charts initially
        detailedCharts.forEach(chart => {
          (chart as HTMLElement).style.display = 'none';
        });

        // Create back button
        const backButton = document.createElement('button');
        backButton.innerHTML = '← Back to Overview';
        backButton.className = 'absolute top-4 left-4 z-20 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg';
        backButton.style.display = 'none';
        flowchartContainer.appendChild(backButton);

        // Function to show detailed chart
        const showDetailChart = (moduleType: string) => {
          // Hide main flowchart
          if (mainFlowchart && mainFlowchart.style.display !== 'none') {
            animate(mainFlowchart, {
              opacity: [1, 0],
              duration: 200,
              easing: 'easeOutQuad',
              complete: () => {
                mainFlowchart.style.display = 'none';
              }
            });
          }

          // Show corresponding detailed chart
          let detailClass = '';
          switch(moduleType) {
            case 'ai-brain':
              detailClass = '.ai-brain-detail';
              break;
            case 'ar-interface':
              detailClass = '.ar-interface-detail';
              break;
            case 'ace-module':
              detailClass = '.ace-module-detail';
              break;
            case 'biometric':
              detailClass = '.biometric-detail';
              break;
            case 'state-model':
              detailClass = '.state-model-detail';
              break;
            case 'command-gen':
              detailClass = '.command-gen-detail';
              break;
            case 'sensors':
              detailClass = '.sensors-detail';
              break;
          }

          if (detailClass) {
            const detailChart = flowchartContainer.querySelector(detailClass) as HTMLElement;
            if (detailChart && detailChart !== currentDetailChart) {
              // Hide current detail chart if different
              if (currentDetailChart) {
                animate(currentDetailChart, {
                  opacity: [1, 0],
                  scale: [1, 0.9],
                  duration: 150,
                  easing: 'easeInQuad',
                  complete: () => {
                    currentDetailChart!.style.display = 'none';
                  }
                });
              }

              // Show new detail chart
              currentDetailChart = detailChart;
              detailChart.style.display = 'block';
              backButton.style.display = 'block';

              animate(detailChart, {
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 300,
                easing: 'easeOutQuad'
              });

              animate(backButton, {
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 300,
                easing: 'easeOutQuad'
              });
            }
          }
        };

        // Function to hide detailed chart and show main
        const hideDetailChart = () => {
          if (currentDetailChart) {
            animate(currentDetailChart, {
              opacity: [1, 0],
              scale: [1, 0.9],
              duration: 200,
              easing: 'easeInQuad',
              complete: () => {
                currentDetailChart!.style.display = 'none';
                currentDetailChart = null;
              }
            });
          }

          animate(backButton, {
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 200,
            easing: 'easeInQuad',
            complete: () => {
              backButton.style.display = 'none';
            }
          });

          // Show main flowchart again
          if (mainFlowchart) {
            mainFlowchart.style.display = 'block';
            animate(mainFlowchart, {
              opacity: [0, 1],
              duration: 300,
              easing: 'easeOutQuad'
            });
          }
        };

        // Add click effects to invisible zones
        const hoverZones = flowchartContainer.querySelectorAll('.hover-zone');
        hoverZones.forEach((zone) => {
          const moduleType = (zone as HTMLElement).dataset.module;

          // Add cursor pointer to indicate clickability
          (zone as HTMLElement).style.cursor = 'pointer';

          zone.addEventListener('click', () => {
            showDetailChart(moduleType!);
          });
        });

        // Back button functionality
        backButton.addEventListener('click', () => {
          hideDetailChart();
        });

        // Click outside to go back (on the container background)
        flowchartContainer.addEventListener('click', (e) => {
          if (e.target === flowchartContainer && currentDetailChart) {
            hideDetailChart();
          }
        });
      }
    }, 1600);

    // Add smooth zoom functionality for flowchart
    setTimeout(() => {
      const zoomContainer = document.querySelector('.flowchart-zoom-container') as HTMLElement;
      let flowchartElement: SVGElement | null = null;

      if (zoomContainer) {
        flowchartElement = zoomContainer.querySelector('svg') as SVGElement;
        if (!flowchartElement) {
          const flowchartDiv = zoomContainer.querySelector('[class*="flowchart"]') as HTMLElement;
          if (flowchartDiv) {
            flowchartElement = flowchartDiv.querySelector('svg') as SVGElement;
          }
        }
      }

      const viewFullBtn = document.querySelector('.view-full') as HTMLButtonElement;
      const resetViewBtn = document.querySelector('.reset-view') as HTMLButtonElement;

      if (zoomContainer && flowchartElement) {
        let currentZoom = 1;
        let currentX = 0;
        let currentY = 0;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let originalViewBox = flowchartElement.getAttribute('viewBox');
        let originalWidth = flowchartElement.getAttribute('width');
        let originalHeight = flowchartElement.getAttribute('height');

        const zoomInBtn = document.querySelector('.zoom-in') as HTMLButtonElement;
        const zoomOutBtn = document.querySelector('.zoom-out') as HTMLButtonElement;
        const zoomResetBtn = document.querySelector('.zoom-reset') as HTMLButtonElement;

        // Function to update zoom and pan using viewBox (maintains quality)
        const updateZoom = () => {
          if (originalViewBox) {
            const viewBoxValues = originalViewBox.split(' ').map(Number);
            const [origX, origY, width, height] = viewBoxValues;

            // Calculate new viewBox for zoom
            const newWidth = width / currentZoom;
            const newHeight = height / currentZoom;

            // Apply pan offset
            const newX = origX + (width - newWidth) / 2 + currentX;
            const newY = origY + (height - newHeight) / 2 + currentY;

            flowchartElement.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
          }
        };

        const zoomIn = () => {
          if (currentZoom < 2) {
            currentZoom *= 1.2;
            updateZoom();
          }
        };

        const zoomOut = () => {
          if (currentZoom > 0.5) {
            currentZoom /= 1.2;
            updateZoom();
          }
        };

        const resetZoom = () => {
          currentZoom = 1;
          currentX = 0;
          currentY = 0;
          if (originalViewBox) {
            flowchartElement.setAttribute('viewBox', originalViewBox);
          }
        };

        // Button event listeners
        if (zoomInBtn) {
          zoomInBtn.addEventListener('click', (e: Event) => {
            e.preventDefault();
            zoomIn();
          });
        }

        if (zoomOutBtn) {
          zoomOutBtn.addEventListener('click', (e: Event) => {
            e.preventDefault();
            zoomOut();
          });
        }

        if (zoomResetBtn) {
          zoomResetBtn.addEventListener('click', (e: Event) => {
            e.preventDefault();
            resetZoom();
          });
        }

        // Mouse wheel zoom
        zoomContainer.addEventListener('wheel', (e: WheelEvent) => {
          e.preventDefault();
          if (e.deltaY < 0) {
            zoomIn();
          } else {
            zoomOut();
          }
        });

        // Mouse drag for panning
        flowchartElement.addEventListener('mousedown', (e: MouseEvent) => {
          if (currentZoom > 1) {
            isDragging = true;
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;
            flowchartElement.style.cursor = 'grabbing';
            e.preventDefault();
          }
        });

        document.addEventListener('mousemove', (e: MouseEvent) => {
          if (isDragging && currentZoom > 1) {
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;
            updateZoom();
          }
        });

        document.addEventListener('mouseup', () => {
          isDragging = false;
          flowchartElement.style.cursor = currentZoom > 1 ? 'grab' : 'default';
        });

        // Set initial cursor
        flowchartElement.style.cursor = 'default';
      }
    }, 3000);

    // Add particle effect on hover for feature cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        // Create particle effect
        for (let i = 0; i < 5; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute w-2 h-2 bg-blue-400 rounded-full pointer-events-none';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          card.appendChild(particle);

          animate(particle, {
            translateX: () => (Math.random() - 0.5) * 100,
            translateY: () => (Math.random() - 0.5) * 100,
            scale: [0, 1, 0],
            opacity: [1, 0],
            duration: 800,
            easing: 'easeOutQuart',
            complete: () => particle.remove()
          });
        }

        // Card morphing effect
        animate(card, {
          scale: 1.05,
          rotate: 2,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });

      card.addEventListener('mouseleave', () => {
        animate(card, {
          scale: 1,
          rotate: 0,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });

    // Add hover effects to system circles
    const systemCircles = document.querySelectorAll('.system-circle');
    systemCircles.forEach((circle) => {
      circle.addEventListener('mouseenter', () => {
        animate(circle, {
          scale: 1.1,
          boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 20px rgba(59, 130, 246, 0.6)'],
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
      circle.addEventListener('mouseleave', () => {
        animate(circle, {
          scale: 1,
          boxShadow: ['0 0 20px rgba(59, 130, 246, 0.6)', '0 0 0 rgba(59, 130, 246, 0)'],
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });

    // Add hover effects to technology showcase boxes
    const techBoxes = document.querySelectorAll('.tech-box');
    techBoxes.forEach((box) => {
      box.addEventListener('mouseenter', () => {
        animate(box, {
          scale: 1.05,
          boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 15px rgba(59, 130, 246, 0.4)'],
          backgroundColor: ['rgb(30, 41, 59)', 'rgb(51, 65, 85)'],
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
      box.addEventListener('mouseleave', () => {
        animate(box, {
          scale: 1,
          boxShadow: ['0 0 15px rgba(59, 130, 246, 0.4)', '0 0 0 rgba(59, 130, 246, 0)'],
          backgroundColor: ['rgb(51, 65, 85)', 'rgb(30, 41, 59)'],
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });

    // Add hover effects to partner logos
    const partnerLogos = document.querySelectorAll('.partner-logo');
    partnerLogos.forEach((logo) => {
      logo.addEventListener('mouseenter', () => {
        animate(logo, {
          scale: 1.05,
          boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 20px rgba(59, 130, 246, 0.5)'],
          duration: 300,
          easing: 'easeOutQuad'
        });
        // Animate the logo image
        const img = logo.querySelector('img');
        if (img) {
          animate(img, {
            scale: 1.1,
            duration: 300,
            easing: 'easeOutQuad'
          });
        }
      });
      logo.addEventListener('mouseleave', () => {
        animate(logo, {
          scale: 1,
          boxShadow: ['0 0 20px rgba(59, 130, 246, 0.5)', '0 0 0 rgba(59, 130, 246, 0)'],
          duration: 300,
          easing: 'easeOutQuad'
        });
        // Reset the logo image
        const img = logo.querySelector('img');
        if (img) {
          animate(img, {
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
          });
        }
      });
    });
  }, []);
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-sm py-4 px-4 border-b border-slate-700">
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
            <Link href="/features/sovereign-ai-brain" className="hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="/team" className="hover:text-blue-400 transition-colors">
              Team
            </Link>
            <Link href="/investors" className="hover:text-blue-400 transition-colors">
              Investors
            </Link>
            <Link href="/#vision" className="hover:text-blue-400 transition-colors">
              Vision
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative"
        style={{
          backgroundImage: 'url(/images/hero/space-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Project AURA
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-white drop-shadow-lg">
            A symbiotic AI partner for deep space autonomy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 hero-buttons">
            <Link href="#vision" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors text-center shadow-lg">
              Learn More
            </Link>
            <Link href="/features/sovereign-ai-brain" className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-colors text-center shadow-lg">
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">The Vision: Why Project AURA?</h2>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            Long-duration deep space missions present unprecedented challenges. Communication with Earth can take hours or days due to vast distances, making real-time support impossible. Astronauts must operate with complete autonomy, relying on their training, equipment, and now, an intelligent AI companion.
          </p>
          <p className="text-lg md:text-xl leading-relaxed">
            Project AURA bridges this gap by creating a symbiotic human-AI partnership that enhances safety, efficiency, and decision-making in the most extreme environments.
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Core Features Explained</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/features/sovereign-ai-brain" className="block feature-card">
              <div className="bg-slate-800 p-6 rounded-lg text-center hover:bg-slate-700 transition-colors cursor-pointer">
                <Brain className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">Sovereign AI Brain</h3>
                <p className="text-gray-300">A multi-agent AI system operating offline, managing procedures, telemetry, navigation, and biometric interpretation.</p>
              </div>
            </Link>
            <Link href="/features/adaptive-ar-xr-visual-interface" className="block feature-card">
              <div className="bg-slate-800 p-6 rounded-lg text-center hover:bg-slate-700 transition-colors cursor-pointer">
                <Eye className="w-12 h-12 mx-auto mb-4 text-green-400" />
                <h3 className="text-xl font-semibold mb-2">Adaptive AR/XR Interface</h3>
                <p className="text-gray-300">Helmet-integrated display with auto-dashboarding, voice guidance, and overlays for instructions and cues.</p>
              </div>
            </Link>
            <Link href="/features/closed-loop-biometric-monitoring" className="block feature-card">
              <div className="bg-slate-800 p-6 rounded-lg text-center hover:bg-slate-700 transition-colors cursor-pointer">
                <Heart className="w-12 h-12 mx-auto mb-4 text-red-400" />
                <h3 className="text-xl font-semibold mb-2">Closed-Loop Biometric Monitoring</h3>
                <p className="text-gray-300">Real-time physiological data processing to infer state and adjust interface proactively.</p>
              </div>
            </Link>
            <Link href="/features/adaptive-contingency-engineering-ace-module" className="block feature-card">
              <div className="bg-slate-800 p-6 rounded-lg text-center hover:bg-slate-700 transition-colors cursor-pointer">
                <Wrench className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-2">ACE Module</h3>
                <p className="text-gray-300">Generative problem-solving for hardware failures, enabling 3D scanning and AI-designed parts.</p>
              </div>
            </Link>
            <Link href="/features/embodied-kinematic-model-vpk" className="block feature-card">
              <div className="bg-slate-800 p-6 rounded-lg text-center hover:bg-slate-700 transition-colors cursor-pointer">
                <User className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2">Embodied Kinematic Model (VPK)</h3>
                <p className="text-gray-300">Real-time digital twin of astronaut's body for body-centric guidance and ergonomic validation.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Overall System Integration Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">How It All Works Together</h2>
          <p className="text-lg md:text-xl text-center mb-12 text-gray-300">
            Project AURA's modules form a cohesive, symbiotic system that adapts to astronaut needs in real-time.
          </p>
          <div className="bg-slate-700 p-8 rounded-lg relative overflow-hidden">
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button className="zoom-in bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold transition-colors shadow-lg text-sm">
                +
              </button>
              <button className="zoom-out bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold transition-colors shadow-lg text-sm">
                −
              </button>
              <button className="zoom-reset bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg font-semibold transition-colors shadow-lg text-sm">
                ⟲
              </button>
            </div>

            <div className="flowchart-zoom-container overflow-hidden">
              <Flowchart chart={`graph TD
              %% Input Layer - Sensors & Data Collection
              A1[Biometric Sensors] --> B1[Data Ingestion Layer]
              A2[Environmental Sensors] --> B1
              A3[Motion Capture] --> B1
              A4[Audio Input] --> B1
              A5[Visual Cameras] --> B1
              B1 --> C1[Data Preprocessing]

              %% AI Sovereign Brain - Central Intelligence
              C1 --> D1[AI Sovereign Brain]
              D1 --> E1[Procedures Agent]
              D1 --> E2[Telemetry Agent]
              D1 --> E3[Navigation Agent]
              D1 --> E4[Biometric Agent]
              D1 --> E5[Digital Twin Sync]

              %% Interface Layer - Human-AI Interaction
              E2 --> F1[AR/XR Interface]
              E4 --> F1
              F1 --> G1[Auto-Dashboarding]
              F1 --> G2[Voice Commands]
              F1 --> G3[Visual Overlays]
              F1 --> G4[Holographic Cues]
              F1 --> G5[Real-time Telemetry]

              %% ACE Module - Adaptive Manufacturing
              E2 --> H1[ACE Module]
              H1 --> I1[3D Scanner]
              H1 --> I2[Generative Designer]
              H1 --> I3[Material Analyzer]
              H1 --> I4[3D Printer Interface]
              H1 --> I5[Quality Validator]

              %% Biometric Monitoring - Health & Safety
              E4 --> J1[Biometric Monitoring]
              J1 --> K1[ECG Processor]
              J1 --> K2[Respiration Monitor]
              J1 --> K3[Fatigue Detector]
              J1 --> K4[Stress Analyzer]
              J1 --> K5[Health Predictor]

              %% Unified Astronaut State Model - Context Awareness
              E1 --> L1[Unified Astronaut State Model]
              E3 --> L1
              E5 --> L1
              L1 --> M1[Data Fusion Engine]
              L1 --> M2[Physiological Model]
              L1 --> M3[State Estimator]
              L1 --> M4[Context Analyzer]
              L1 --> M5[Performance Optimizer]

              %% Command Generation - Decision Making
              M1 --> N1[Command Generation]
              M3 --> N1
              N1 --> O1[Decision Engine]
              N1 --> O2[Priority Arbiter]
              N1 --> O3[Interface Protocols]
              N1 --> O4[Response Optimizer]
              N1 --> O5[Feedback Processor]

              %% Output Connections - System Integration
              O1 --> F1
              O2 --> H1
              O3 --> J1
              O4 --> L1

              %% Styling - Color-coded by function
              style A1 fill:#64748b
              style A2 fill:#64748b
              style A3 fill:#64748b
              style A4 fill:#64748b
              style A5 fill:#64748b
              style B1 fill:#475569
              style C1 fill:#334155

              style D1 fill:#8b5cf6
              style E1 fill:#60a5fa
              style E2 fill:#34d399
              style E3 fill:#fbbf24
              style E4 fill:#f87171
              style E5 fill:#a78bfa

              style F1 fill:#10b981
              style G1 fill:#34d399
              style G2 fill:#60a5fa
              style G3 fill:#fbbf24
              style G4 fill:#f87171
              style G5 fill:#a78bfa

              style H1 fill:#f59e0b
              style I1 fill:#fbbf24
              style I2 fill:#60a5fa
              style I3 fill:#34d399
              style I4 fill:#f87171
              style I5 fill:#a78bfa

              style J1 fill:#ef4444
              style K1 fill:#f87171
              style K2 fill:#60a5fa
              style K3 fill:#34d399
              style K4 fill:#fbbf24
              style K5 fill:#a78bfa

              style L1 fill:#06b6d4
              style M1 fill:#06b6d4
              style M2 fill:#60a5fa
              style M3 fill:#34d399
              style M4 fill:#fbbf24
              style M5 fill:#a78bfa

              style N1 fill:#8b5cf6
              style O1 fill:#8b5cf6
              style O2 fill:#60a5fa
              style O3 fill:#34d399
              style O4 fill:#fbbf24
              style O5 fill:#a78bfa`} />
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">
              Complete AURA system architecture showing all modules, components, and data flow relationships in a single comprehensive view.
            </p>
          </div>
        </div>
      </section>

      {/* Integrated System in Action Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Integrated System in Action</h2>
          <p className="text-lg md:text-xl text-center mb-12 text-gray-300">
            See how AURA's modules work together seamlessly during a critical mission scenario
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center text-center">
              <div className="system-circle w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 cursor-pointer">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">EVA Task Initiated</h3>
              <p className="text-gray-300">Astronaut begins extravehicular activity; AR interface provides initial guidance.</p>
            </div>
            <div className="hidden md:block text-4xl text-blue-400">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="system-circle w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 cursor-pointer">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Component Failure</h3>
              <p className="text-gray-300">Telemetry detects critical hardware failure during operation.</p>
            </div>
            <div className="hidden md:block text-4xl text-red-400">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="system-circle w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mb-4 cursor-pointer">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Biometric Response</h3>
              <p className="text-gray-300">System detects increased stress and cognitive load from situation.</p>
            </div>
            <div className="hidden md:block text-4xl text-yellow-400">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="system-circle w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 cursor-pointer">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Adaptive Interface</h3>
              <p className="text-gray-300">AR display simplifies, provides step-by-step repair guidance.</p>
            </div>
            <div className="hidden md:block text-4xl text-green-400">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="system-circle w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 cursor-pointer">
                <span className="text-2xl font-bold">5</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">ACE Solution</h3>
              <p className="text-gray-300">Generates replacement part design and guides 3D printing process.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-400 max-w-2xl mx-auto">
              This integrated workflow demonstrates how AURA's modules collaborate in real-time to handle unexpected challenges,
              ensuring astronaut safety and mission success without Earth-based intervention.
            </p>
          </div>
        </div>
      </section>
      {/* Technology Showcase Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Technology Showcase</h2>
          <p className="text-lg md:text-xl mb-8">
            Built with cutting-edge technologies for performance, reliability, and modern user experience.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="tech-box bg-slate-800 p-4 rounded-lg cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">Next.js</h3>
              <p className="text-sm text-gray-300">Fast, scalable React framework</p>
            </div>
            <div className="tech-box bg-slate-800 p-4 rounded-lg cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">TypeScript</h3>
              <p className="text-sm text-gray-300">Type-safe JavaScript</p>
            </div>
            <div className="tech-box bg-slate-800 p-4 rounded-lg cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">Tailwind CSS</h3>
              <p className="text-sm text-gray-300">Utility-first styling</p>
            </div>
            <div className="tech-box bg-slate-800 p-4 rounded-lg cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">shadcn/ui</h3>
              <p className="text-sm text-gray-300">Accessible UI components</p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Market Opportunity</h2>
          <p className="text-lg md:text-xl mb-8">
            Project AURA addresses a rapidly growing market in space autonomy and AI-driven astronaut support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-blue-400 mb-2">$400B+</h3>
              <p className="text-gray-300">Global space industry by 2030</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-green-400 mb-2">10,000+</h3>
              <p className="text-gray-300">Potential astronaut users worldwide</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-purple-400 mb-2">5x ROI</h3>
              <p className="text-gray-300">Projected return on investment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Development Roadmap</h2>
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">Q1</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold">2025 - Prototype Development</h3>
                <p className="text-gray-300">Complete AI brain integration and AR interface testing</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">Q3</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold">2025 - NASA Partnership</h3>
                <p className="text-gray-300">Secure collaboration agreement and begin joint testing</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">2026</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold">2026 - Commercial Launch</h3>
                <p className="text-gray-300">Deploy first commercial systems and expand to private space companies</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">2027</span>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold">2027 - Global Expansion</h3>
                <p className="text-gray-300">Scale to international space agencies and commercial markets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships & Testimonials Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Trusted by Industry Leaders</h2>

          {/* Partnership Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-slate-700 p-6 rounded-lg text-center hover:bg-slate-600 transition-colors cursor-pointer partner-logo">
              <img
                src="/images/partners/nasa-logo.png"
                alt="NASA Logo"
                className="w-16 h-16 mx-auto mb-4 object-contain"
              />
              <p className="text-sm text-gray-300">Strategic Partner</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg text-center hover:bg-slate-600 transition-colors cursor-pointer partner-logo">
              <img
                src="/images/partners/spacex-logo.png"
                alt="SpaceX Logo"
                className="w-16 h-16 mx-auto mb-4 object-contain"
              />
              <p className="text-sm text-gray-300">Technology Collaborator</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg text-center hover:bg-slate-600 transition-colors cursor-pointer partner-logo">
              <img
                src="/images/partners/esa-logo.png"
                alt="ESA Logo"
                className="w-16 h-16 mx-auto mb-4 object-contain"
              />
              <p className="text-sm text-gray-300">Research Partner</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg text-center hover:bg-slate-600 transition-colors cursor-pointer partner-logo">
              <img
                src="/images/partners/mit-logo.png"
                alt="MIT Logo"
                className="w-16 h-16 mx-auto mb-4 object-contain"
              />
              <p className="text-sm text-gray-300">Academic Partner</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-700 p-8 rounded-lg">
              <p className="text-gray-300 mb-4 italic">
                "Project AURA represents a breakthrough in astronaut autonomy. The integration of AI with human factors is exactly what deep space missions need."
              </p>
              <div className="font-semibold">[Name Censored]</div>
              <div className="text-blue-400">[Title Censored]</div>
            </div>
            <div className="bg-slate-700 p-8 rounded-lg">
              <p className="text-gray-300 mb-4 italic">
                "The potential to reduce mission risk while enhancing astronaut performance is enormous. We're excited to collaborate on this technology."
              </p>
              <div className="font-semibold">[Name Censored]</div>
              <div className="text-green-400">[Title Censored]</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">See Project AURA in Action</h2>
          <p className="text-lg md:text-xl mb-12 text-gray-300">
            Watch our prototype demonstration showcasing the integrated AI systems working together.
          </p>
          <div className="bg-slate-800 p-8 rounded-lg">
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">▶</span>
                </div>
                <p className="text-gray-400">Demo Video Placeholder</p>
                <p className="text-sm text-gray-500 mt-2">Coming Soon - Full System Integration Demo</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              This video will showcase real-time biometric monitoring, adaptive AR interfaces, and AI-driven decision making in a simulated space environment.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Potential Impact Scenarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Deep Space Mission</h3>
              <p className="text-gray-300 mb-4">
                During a Mars mission, an astronaut experiences equipment failure 200 million km from Earth. AURA's ACE module scans the broken component, designs a replacement part, and guides 3D printing - all autonomously.
              </p>
              <div className="text-sm text-gray-400">
                <strong>Outcome:</strong> Mission continues without Earth intervention, saving weeks of communication delay.
              </div>
            </div>
            <div className="bg-slate-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Emergency Response</h3>
              <p className="text-gray-300 mb-4">
                Astronaut shows signs of hypoxia. AURA detects biometric changes, simplifies AR interface to reduce cognitive load, and provides step-by-step emergency protocols while monitoring vital signs.
              </p>
              <div className="text-sm text-gray-400">
                <strong>Outcome:</strong> Rapid response prevents critical situation, astronaut safely manages emergency.
              </div>
            </div>
            <div className="bg-slate-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">Complex Repair</h3>
              <p className="text-gray-300 mb-4">
                EVA suit telemetry indicates pressure anomaly. AURA analyzes data, overlays repair instructions on the suit, and validates ergonomic feasibility using the VPK model.
              </p>
              <div className="text-sm text-gray-400">
                <strong>Outcome:</strong> Successful repair completed 40% faster with reduced error risk.
              </div>
            </div>
            <div className="bg-slate-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Navigation Challenge</h3>
              <p className="text-gray-300 mb-4">
                Astronaut loses orientation during EVA. AURA's spatial mapping provides real-time navigation cues, biometric monitoring ensures stress doesn't impair judgment.
              </p>
              <div className="text-sm text-gray-400">
                <strong>Outcome:</strong> Safe return to habitat with minimal disorientation impact.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earth Impact Scenarios Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Earth Applications: AURA Beyond Space</h2>
          <p className="text-lg md:text-xl text-center mb-12 text-gray-300">
            Project AURA's revolutionary technology extends far beyond space exploration, offering transformative solutions for Earth's most critical challenges.
          </p>

          <div className="space-y-12">
            {/* Sovereign AI Brain */}
            <div className="bg-slate-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6 text-blue-400 flex items-center">
                <Brain className="w-8 h-8 mr-3" />
                Sovereign AI Brain: Predictive Intelligence at Scale
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-blue-300">Predictive Maintenance</h4>
                  <p className="text-sm text-gray-300">Ingest continuous sensor streams from industrial machinery (turbines, assembly lines, fleet vehicles) to forecast failures weeks in advance, schedule service, and minimize unplanned downtime.</p>
                </div>
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-blue-300">Smart Grid Optimization</h4>
                  <p className="text-sm text-gray-300">Monitor power generation/transmission networks in real time, predict load swings and equipment stress, and autonomously re-route power or dispatch repair crews.</p>
                </div>
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-blue-300">Supply-Chain Resilience</h4>
                  <p className="text-sm text-gray-300">Fuse logistics, weather, geopolitical, and production data to anticipate disruptions, re-optimize routes and inventory levels, and trigger contingency plans.</p>
                </div>
              </div>
            </div>

            {/* Adaptive Contingency Engineering (ACE) */}
            <div className="bg-slate-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <Wrench className="w-8 h-8 mr-3" />
                Adaptive Contingency Engineering (ACE): On-Demand Manufacturing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-yellow-300">Remote Facility Fabrication</h4>
                  <p className="text-sm text-gray-300">Deploy compact DED/FFF units at oil rigs, Antarctic stations, or military forward operating bases to print replacement valves, brackets, or fittings from PEEK, PEKK, or aerospace-grade metal alloys.</p>
                </div>
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-yellow-300">Rapid R&D Prototyping</h4>
                  <p className="text-sm text-gray-300">Use generative design with physics-informed neural nets to produce topology-optimized jigs, tooling, or structural prototypes in hours rather than weeks.</p>
                </div>
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-yellow-300">Critical Infrastructure Repair</h4>
                  <p className="text-sm text-gray-300">Embed portable WAAM/DLP printers into rail-maintenance vehicles or utility trucks to rebuild worn rails, pipe joints, or conductor clamps on site.</p>
                </div>
              </div>
            </div>

            {/* Biometric Monitoring */}
            <div className="bg-slate-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6 text-red-400 flex items-center">
                <Heart className="w-8 h-8 mr-3" />
                Biometric Monitoring: Human-Centric Intelligence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-red-300">High-Risk Workforce Safety</h4>
                  <p className="text-sm text-gray-300">Continuous physiological and environmental monitoring (heart rate variability, core temperature, toxic gas exposure) for firefighters, miners, or offshore-platform workers, with AI-driven fatigue and heat-stress alerts.</p>
                </div>
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-red-300">Elite Athlete Performance</h4>
                  <p className="text-sm text-gray-300">Real-time analysis of biometrics and movement patterns to optimize training loads, prevent overuse injuries, and tailor recovery protocols.</p>
                </div>
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-red-300">Tele-Medicine Augmentation</h4>
                  <p className="text-sm text-gray-300">In remote clinics, integrate wearable vital-sign trackers with AI triage to guide non-expert operators, escalate care early, and advise surgeons via AR overlays.</p>
                </div>
              </div>
            </div>

            {/* Mission Data Fusion */}
            <div className="bg-slate-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6 text-purple-400 flex items-center">
                <Eye className="w-8 h-8 mr-3" />
                Mission Data Fusion: Unified Intelligence Systems
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-purple-300">Smart Cities & Traffic</h4>
                  <p className="text-sm text-gray-300">Fuse CCTV, vehicle-GPS, public transit, weather, and social-media signals to predict congestion hotspots, optimize traffic-signal timing, and dynamically reroute emergency vehicles.</p>
                </div>
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-purple-300">Critical Facility Monitoring</h4>
                  <p className="text-sm text-gray-300">Integrate building-management, fire-alarm, seismic, and cybersecurity sensors to detect anomalies, coordinate automated lockdowns or fire-suppression, and provide unified situational awareness.</p>
                </div>
                <div className="bg-slate-600 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-purple-300">Environmental Surveillance</h4>
                  <p className="text-sm text-gray-300">Combine satellite imagery, IoT air/water sensors, climate forecasts, and health data to pinpoint emerging pollution events or disease outbreaks and guide field-response teams.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 max-w-3xl mx-auto">
              These applications showcase AURA's potential to revolutionize multiple industries,
              from industrial automation to environmental monitoring and beyond.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
