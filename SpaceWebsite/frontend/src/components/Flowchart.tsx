'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface FlowchartProps {
  chart: string;
  className?: string;
}

export default function Flowchart({ chart, className = '' }: FlowchartProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (elementRef.current) {
      if (!initializedRef.current) {
        // Initialize Mermaid with custom config
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#60a5fa',
            lineColor: '#60a5fa',
            secondaryColor: '#1e293b',
            tertiaryColor: '#334155',
            background: '#0f172a',
            mainBkg: '#1e293b',
            secondBkg: '#334155',
            border1: '#475569',
            border2: '#64748b',
            textColor: '#f1f5f9',
            tertiaryTextColor: '#cbd5e1'
          }
        });
        initializedRef.current = true;
      }

      // Generate unique ID for the chart
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      // Render the chart
      mermaid.render(id, chart).then((result) => {
        console.log('Mermaid rendered successfully, SVG length:', result.svg.length);
        elementRef.current!.innerHTML = result.svg;
        console.log('SVG inserted into DOM');
      }).catch((error: unknown) => {
        console.error('Mermaid rendering error:', error);
        elementRef.current!.innerHTML = '<div class="text-red-400 p-4">Error rendering flowchart</div>';
      });
    }
  }, [chart]);

  return (
    <div
      ref={elementRef}
      className={`w-full overflow-x-auto bg-slate-800 p-4 rounded-lg ${className}`}
    />
  );
}
