
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Mic, Music, AudioWaveform } from 'lucide-react';
import AnalysisTab from './analysis/AnalysisTab';
import GenresTab from './analysis/GenresTab';
import InstrumentsTab from './analysis/InstrumentsTab';
import { AnalysisResults } from './analysis/types';

interface AnalysisPanelProps {
  audioUrl: string | null;
}

const AnalysisPanel = ({ audioUrl }: AnalysisPanelProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  
  const handleAnalyze = () => {
    if (!audioUrl) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    setAnalysisResults(null);
    
    // Simulate analysis process (this would connect to a real ML model in a complete implementation)
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisResults({
              genre: 'Electronic',
              bpm: 128,
              key: 'C Minor',
              mood: 'Energetic',
              instruments: ['Synthesizer', 'Drums', 'Bass', 'Piano'],
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  return (
    <motion.div
      className="glass-card p-4 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
    >
      <Tabs defaultValue="analysis">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <AudioWaveform className="h-4 w-4" />
            <span>Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="genres" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <span>Genres</span>
          </TabsTrigger>
          <TabsTrigger value="instruments" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            <span>Instruments</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis">
          <AnalysisTab 
            audioUrl={audioUrl}
            isAnalyzing={isAnalyzing}
            progress={progress}
            analysisResults={analysisResults}
            onAnalyze={handleAnalyze}
          />
        </TabsContent>
        
        <TabsContent value="genres">
          <GenresTab />
        </TabsContent>
        
        <TabsContent value="instruments">
          <InstrumentsTab />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AnalysisPanel;
