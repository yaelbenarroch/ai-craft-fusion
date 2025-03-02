
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface FrequencyVisualizerProps {
  audioUrl: string | null;
  isPlaying: boolean;
}

const FrequencyVisualizer = ({ audioUrl, isPlaying }: FrequencyVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [circles, setCircles] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);
  
  // In a real implementation, this would use Web Audio API to analyze frequency data
  useEffect(() => {
    if (!audioUrl || !containerRef.current) {
      setCircles([]);
      return;
    }
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // Generate visualization circles
    const newCircles = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 40 + 10,
      delay: i * 0.1,
    }));
    
    setCircles(newCircles);
    
  }, [audioUrl, containerRef.current]);
  
  return (
    <div 
      className="visualizer-container glass-card mt-4" 
      ref={containerRef}
    >
      {!audioUrl ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Audio visualization will appear here</p>
        </div>
      ) : (
        <>
          {circles.map((circle, index) => (
            <motion.div
              key={index}
              className="frequency-circle"
              style={{
                left: `${circle.x}px`,
                top: `${circle.y}px`,
                width: `${circle.size}px`,
                height: `${circle.size}px`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isPlaying ? {
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              } : { scale: 1, opacity: 0.5 }}
              transition={{
                duration: 2,
                repeat: isPlaying ? Infinity : 0,
                delay: circle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default FrequencyVisualizer;
