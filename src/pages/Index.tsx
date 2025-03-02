
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import AudioUploader from '@/components/AudioUploader';
import WaveformVisualizer from '@/components/WaveformVisualizer';
import FrequencyVisualizer from '@/components/FrequencyVisualizer';
import AudioPlayer from '@/components/AudioPlayer';
import AnalysisPanel from '@/components/AnalysisPanel';
import Footer from '@/components/Footer';

const Index = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileUpload = (file: File) => {
    setAudioFile(file);
    
    // Create URL for the audio file
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Header />
      
      <main className="container mx-auto pt-24 pb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 mt-8"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            AudioViz AI
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Advanced audio analysis and visualization using machine learning
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <AudioUploader onFileUpload={handleFileUpload} />
            <AnalysisPanel audioUrl={audioUrl} />
          </div>
          
          <div className="lg:col-span-2">
            <motion.div
              className="glass-card p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h2 className="text-xl font-medium mb-4">Audio Visualization</h2>
              <WaveformVisualizer audioUrl={audioUrl} isPlaying={isPlaying} />
              <FrequencyVisualizer audioUrl={audioUrl} isPlaying={isPlaying} />
              <AudioPlayer audioUrl={audioUrl} onPlayStateChange={setIsPlaying} />
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="glass-card p-6 mt-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <h2 className="text-xl font-medium mb-4">About the Project</h2>
          <div className="prose prose-sm text-foreground">
            <p>
              AudioViz AI is an advanced audio analysis platform that uses machine learning 
              models to extract musical features from audio files. The project demonstrates 
              sophisticated audio processing techniques and visualizations.
            </p>
            <h3 className="text-lg font-medium mt-4">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Advanced audio waveform and frequency visualizations</li>
              <li>Machine learning-based genre classification</li>
              <li>BPM (tempo) detection and musical key analysis</li>
              <li>Instrument recognition and separation</li>
              <li>Mood/emotion analysis from audio features</li>
            </ul>
            <p className="mt-4">
              The frontend is built with React and Tailwind CSS, while the audio analysis 
              is performed using TensorFlow.js models that run directly in the browser. 
              A companion Streamlit app provides additional analysis capabilities.
            </p>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
