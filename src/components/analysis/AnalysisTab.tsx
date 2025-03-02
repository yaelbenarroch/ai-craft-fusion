
import React from 'react';
import { Button } from '../ui/button';
import { AudioWaveform, Loader2 } from 'lucide-react';
import { Progress } from '../ui/progress';
import { motion } from 'framer-motion';

interface AnalysisTabProps {
  audioUrl: string | null;
  isAnalyzing: boolean;
  progress: number;
  analysisResults: {
    genre?: string;
    bpm?: number;
    key?: string;
    mood?: string;
    instruments?: string[];
  } | null;
  onAnalyze: () => void;
}

const AnalysisTab = ({ 
  audioUrl, 
  isAnalyzing, 
  progress, 
  analysisResults, 
  onAnalyze 
}: AnalysisTabProps) => {
  if (!audioUrl) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Upload an audio file to analyze</p>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="py-6 px-4">
        <div className="flex items-center justify-center mb-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Progress value={progress} className="mb-2" />
        <p className="text-center text-sm text-muted-foreground">
          Analyzing audio features...
        </p>
      </div>
    );
  }

  if (analysisResults) {
    return (
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
    );
  }

  return (
    <div className="text-center py-6">
      <Button 
        onClick={onAnalyze}
        className="flex items-center gap-2"
      >
        <AudioWaveform className="h-4 w-4" />
        <span>Analyze Audio</span>
      </Button>
      <p className="text-xs text-muted-foreground mt-2">
        Uses machine learning to extract audio features
      </p>
    </div>
  );
};

export default AnalysisTab;
