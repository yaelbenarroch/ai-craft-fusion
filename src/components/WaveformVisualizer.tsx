
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface WaveformVisualizerProps {
  audioUrl: string | null;
  isPlaying: boolean;
}

const WaveformVisualizer = ({ audioUrl, isPlaying }: WaveformVisualizerProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [waveform, setWaveform] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // This would typically be connected to a real audio analysis library
  // Here we'll simulate the effect for demonstration
  useEffect(() => {
    if (!audioUrl) {
      setWaveform([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading waveform data
    setTimeout(() => {
      // Generate random waveform data (would be real audio data in a complete implementation)
      const bars = 60;
      const newWaveform = Array.from({ length: bars }, () => 
        Math.random() * 0.8 + 0.2 // Values between 0.2 and 1.0
      );
      
      setWaveform(newWaveform);
      setIsLoading(false);
    }, 1000);
    
    return () => {
      cancelAnimationFrame(animationRef.current!);
    };
  }, [audioUrl]);
  
  // Animate waveform when playing
  useEffect(() => {
    if (!waveformRef.current || !isPlaying || !waveform.length) return;
    
    const bars = Array.from(waveformRef.current.children) as HTMLElement[];
    if (!bars.length) return;
    
    let lastTime = 0;
    let barIndex = 0;
    
    const animate = (time: number) => {
      if (time - lastTime > 100) {
        // Animate each bar with a wave-like pattern
        bars.forEach((bar, i) => {
          const delay = i * 0.05;
          const pulse = Math.sin((time / 200) + delay) * 0.3 + 0.7;
          bar.style.transform = `scaleY(${pulse * waveform[i]})`;
        });
        
        lastTime = time;
        barIndex = (barIndex + 1) % bars.length;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationRef.current!);
    };
  }, [isPlaying, waveform]);
  
  if (isLoading) {
    return (
      <div className="waveform-container flex items-center justify-center">
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-4 w-4 rounded-full bg-primary/50"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
            />
          ))}
        </div>
      </div>
    );
  }
  
  if (!waveform.length) {
    return (
      <div className="waveform-container flex items-center justify-center">
        <p className="text-muted-foreground text-sm">No audio loaded</p>
      </div>
    );
  }
  
  return (
    <div className="waveform-container" ref={waveformRef}>
      {waveform.map((height, i) => (
        <motion.div
          key={i}
          className="waveform-bar"
          style={{
            left: `${(i / waveform.length) * 100}%`,
            height: `${height * 100}%`,
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: i * 0.01 }}
        />
      ))}
    </div>
  );
};

export default WaveformVisualizer;
