'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { animate } from "animejs";
import { X } from "lucide-react";

const images = [
  {
    src: "/images/alphagenome/chip_histone.png",
    title: "ChIP Histone",
    description: "Chromatin Immunoprecipitation analysis of histone modifications"
  },
  {
    src: "/images/alphagenome/chip_tf.png",
    title: "ChIP Transcription Factor",
    description: "Transcription factor binding site identification"
  },
  {
    src: "/images/alphagenome/chromatin_accessibility.png",
    title: "Chromatin Accessibility",
    description: "Open chromatin regions and accessibility mapping"
  },
  {
    src: "/images/alphagenome/contact_maps.png",
    title: "Contact Maps",
    description: "3D genome organization and chromatin interactions"
  },
  {
    src: "/images/alphagenome/gene_expression.png",
    title: "Gene Expression",
    description: "RNA-seq expression profiling and analysis"
  },
  {
    src: "/images/alphagenome/splicing.png",
    title: "Splicing",
    description: "Alternative splicing events and isoform analysis"
  }
];

export default function AlphaGenomePage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    // Simple entrance animations
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

    // Animate gallery items
    animate('.gallery-item', {
      translateY: [30, 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      delay: (el, i) => 300 + (i * 100),
      duration: 500,
      easing: 'easeOutQuad'
    });
  }, []);

  const openImageModal = (index: number) => {
    setSelectedImage(index);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white min-h-screen">
      {/* Header with Navigation */}
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

      {/* Gallery Content */}
      <main className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">AlphaGenome Gallery</h1>
          <p className="text-xl mb-12 text-center text-gray-300">
            Explore the visual representations of genomic data analysis and insights
          </p>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {images.map((image, index) => (
              <div
                key={index}
                className="gallery-item bg-slate-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                onClick={() => openImageModal(index)}
              >
                <div className="relative aspect-video">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                  <p className="text-gray-400 text-sm">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Home Button */}
          <div className="text-center">
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors"
            onClick={closeImageModal}
            aria-label="Close modal"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-7xl max-h-full relative" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].title}
                width={1920}
                height={1080}
                className="w-full h-auto max-h-[85vh] object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-semibold mb-2">{images[selectedImage].title}</h3>
              <p className="text-gray-300">{images[selectedImage].description}</p>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-center space-x-4 mt-6">
              {selectedImage > 0 && (
                <button
                  className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-semibold transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage - 1);
                  }}
                >
                  Previous
                </button>
              )}
              {selectedImage < images.length - 1 && (
                <button
                  className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-semibold transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage + 1);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}