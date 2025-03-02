
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Mic, Music, Waveform, PieChart, BarChart, Loader2 } from 'lucide-react';
import { Progress } from './ui/progress';

interface AnalysisPanelProps {
  audioUrl: string | null;
}

const AnalysisPanel = ({ audioUrl }: AnalysisPanelProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<{
    genre?: string;
    bpm?: number;
    key?: string;
    mood?: string;
    instruments?: string[];
  } | null>(null);
  
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
            <Waveform className="h-4 w-4" />
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
          {!audioUrl ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Upload an audio file to analyze</p>
            </div>
          ) : isAnalyzing ? (
            <div className="py-6 px-4">
              <div className="flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <Progress value={progress} className="mb-2" />
              <p className="text-center text-sm text-muted-foreground">
                Analyzing audio features...
              </p>
            </div>
          ) : analysisResults ? (
            <div className="py-4 px-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 p-3 rounded-lg bg-secondary/50">
                  <span className="text-xs font-medium text-muted-foreground">GENRE</span>
                  <span className="font-medium">{analysisResults.genre}</span>
                </div>
                <div className="flex flex-col gap-2 p-3 rounded-lg bg-secondary/50">
                  <span className="text-xs font-medium text-muted-foreground">BPM</span>
                  <span className="font-medium">{analysisResults.bpm}</span>
                </div>
                <div className="flex flex-col gap-2 p-3 rounded-lg bg-secondary/50">
                  <span className="text-xs font-medium text-muted-foreground">KEY</span>
                  <span className="font-medium">{analysisResults.key}</span>
                </div>
                <div className="flex flex-col gap-2 p-3 rounded-lg bg-secondary/50">
                  <span className="text-xs font-medium text-muted-foreground">MOOD</span>
                  <span className="font-medium">{analysisResults.mood}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                <span className="text-xs font-medium text-muted-foreground">DETECTED INSTRUMENTS</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysisResults.instruments?.map(instrument => (
                    <span 
                      key={instrument}
                      className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium"
                    >
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <Button 
                onClick={handleAnalyze}
                className="flex items-center gap-2"
              >
                <Waveform className="h-4 w-4" />
                <span>Analyze Audio</span>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Uses machine learning to extract audio features
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="genres">
          <div className="py-4">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="flex items-end h-40">
                  {['Electronic', 'Pop', 'Rock', 'Hip-Hop', 'Classical'].map((genre, i) => {
                    const height = Math.random() * 60 + 20; // Random height between 20% and 80%
                    return (
                      <motion.div 
                        key={genre}
                        className="flex-1 mx-1 bg-primary/70 rounded-t-sm flex items-end justify-center"
                        style={{ height: `${height}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      >
                        <span className="text-xs font-medium text-primary-foreground rotate-90 origin-left translate-y-2 whitespace-nowrap">
                          {genre}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">0%</span>
                  <span className="text-xs text-muted-foreground">100%</span>
                </div>
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Genre classification probabilities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="instruments">
          <div className="py-4">
            <div className="flex flex-col gap-3">
              {['Drums', 'Bass', 'Piano', 'Guitar', 'Synthesizer', 'Vocals'].map((instrument) => {
                const confidence = Math.random() * 80 + 20; // Random confidence between 20% and 100%
                return (
                  <div key={instrument} className="flex items-center gap-2">
                    <span className="w-24 text-sm">{instrument}</span>
                    <div className="flex-1">
                      <motion.div 
                        className="h-2 bg-primary/60 rounded-full"
                        style={{ width: `${confidence}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${confidence}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <span className="text-xs w-10 text-muted-foreground">{Math.round(confidence)}%</span>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Instrument detection confidence
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AnalysisPanel;
