'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { animate, stagger } from "animejs";

const teamMembers = [
  {
    name: "Dave Seah Yong Sheng",
    role: "Architecture & Research Lead",
    bio: "Leads the overall system architecture and research direction for Project AURA. Ensures technical excellence and innovation across all modules.",
    image: "/team/dave.jpg",
    linkedin: "#"
  },
  {
    name: "Darren Seah Yong Liang",
    role: "AI & Automation Lead",
    bio: "Specializes in AI algorithms and autonomous systems. Develops the intelligent decision-making capabilities that power AURA's adaptive responses.",
    image: "/team/darren.jpg",
    linkedin: "#"
  },
  {
    name: "Timothy Isaac Chua",
    role: "Biometric Suit & Human Factors Lead",
    bio: "Focuses on human physiology integration and suit design. Ensures AURA's systems work seamlessly with astronaut health and performance monitoring.",
    image: "/team/timothy.jpg",
    linkedin: "#"
  },
  {
    name: "Wong Jia Sheng Timothy",
    role: "ACE Module Lead",
    bio: "Leads the Adaptive Contingency Engineering module. Specializes in generative design, 3D scanning, and autonomous manufacturing solutions for space hardware failures.",
    image: "/team/wong.jpg",
    linkedin: "#"
  }
];

const mentors = [
  {
    name: "Don Balanzat",
    role: "XR & AI Systems Developer, Blue Origin",
    bio: "Senior XR and AI systems developer at Blue Origin. Provides guidance on AR/VR integration and AI-driven autonomous systems for space applications.",
    image: "/team/don.jpg",
    linkedin: "#"
  },
  {
    name: "Sanjeev Sharma",
    role: "Principal Dynamics Engineer, SpaceX (Retired)",
    bio: "Former Principal Dynamics Engineer at SpaceX. Expert in spacecraft systems, orbital mechanics, and mission-critical autonomous operations.",
    image: "/team/sanjeev.jpg",
    linkedin: "#"
  },
  {
    name: "Matthew Chew",
    role: "Nuclear Competency & Strategy Lead, HY",
    bio: "Nuclear engineering expert leading strategic initiatives in advanced energy systems. Provides critical guidance on power systems for deep space applications.",
    image: "/team/matthew.jpg",
    linkedin: "#"
  }
];

export default function TeamPage() {
  useEffect(() => {
    // Advanced profile picture entrance with morphing
    animate('.profile-avatar', {
      scale: [0.3, 1.2, 1],
      opacity: [0, 1],
      rotate: [45, -5, 0],
      translateY: [50, -10, 0],
      delay: stagger(300, {
        grid: [4, 2],
        from: 'center',
        axis: 'x'
      }),
      duration: 1200,
      easing: 'easeOutElastic(1, .6)'
    });

    // Enhanced hover animations with particle effects
    const avatars = document.querySelectorAll('.profile-avatar');
    avatars.forEach((avatar) => {
      avatar.addEventListener('mouseenter', () => {
        // Main avatar animation
        animate(avatar, {
          scale: 1.15,
          rotate: 10,
          duration: 400,
          easing: 'easeOutBack'
        });

        // Create orbiting particles
        for (let i = 0; i < 8; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute w-1 h-1 bg-blue-400 rounded-full pointer-events-none';
          particle.style.left = '50%';
          particle.style.top = '50%';
          avatar.appendChild(particle);

          const angle = (i / 8) * Math.PI * 2;
          const radius = 40;

          animate(particle, {
            translateX: Math.cos(angle) * radius,
            translateY: Math.sin(angle) * radius,
            scale: [0, 1.5, 0],
            opacity: [1, 0],
            duration: 1000,
            easing: 'easeOutQuart',
            complete: () => particle.remove()
          });
        }

        // Ripple effect on parent card
        const card = avatar.closest('.bg-slate-800');
        if (card) {
          animate(card, {
            boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 30px rgba(59, 130, 246, 0.5)', '0 0 0 rgba(59, 130, 246, 0)'],
            duration: 800,
            easing: 'easeOutQuart'
          });
        }
      });

      avatar.addEventListener('mouseleave', () => {
        animate(avatar, {
          scale: 1,
          rotate: 0,
          duration: 400,
          easing: 'easeOutBack'
        });
      });
    });

    // Staggered text animations
    animate('.team-member h3', {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(100, { start: 1000 }),
      duration: 600,
      easing: 'easeOutQuad'
    });

    animate('.team-member p', {
      translateY: [20, 0],
      opacity: [0, 1],
      delay: stagger(100, { start: 1200 }),
      duration: 500,
      easing: 'easeOutQuad'
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white min-h-screen">
      {/* Header */}
      <header className="bg-slate-800 py-4 px-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/icons/Logo.png"
              alt="Project AURA Logo"
              width={48}
              height={48}
              className="object-contain"
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

      {/* Team Section */}
      <main className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Meet Our Team</h1>
          <p className="text-xl text-center mb-12 text-gray-300">
            Talented students and industry experts collaborating to bring Project AURA to life.
          </p>

          {/* Core Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Core Development Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="bg-slate-800 p-6 rounded-lg text-center hover:bg-slate-700 transition-colors team-member">
                  <div className="profile-avatar w-24 h-24 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center cursor-pointer">
                    <span className="text-2xl font-bold text-blue-400">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-400 mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mentors */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-400">Industry Mentors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentors.map((mentor) => (
                <div key={mentor.name} className="bg-slate-800 p-6 rounded-lg text-center hover:bg-slate-700 transition-colors team-member">
                  <div className="profile-avatar w-24 h-24 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center cursor-pointer">
                    <span className="text-2xl font-bold text-green-400">{mentor.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{mentor.name}</h3>
                  <p className="text-green-400 mb-4 text-sm">{mentor.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{mentor.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="bg-slate-800 p-8 rounded-lg text-center">
            <div className="mb-8">
              <Image
                src="/icons/Logo.png"
                alt="Project AURA Logo"
                width={256}
                height={256}
                className="mx-auto object-contain drop-shadow-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Project AURA</h3>
            <p className="text-gray-300 mb-4">Autonomous Unified Reality Augmentation</p>
            <p className="text-sm text-gray-400">Founding Date: October 12, 2025</p>
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}