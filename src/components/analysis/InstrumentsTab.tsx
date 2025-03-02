
import React from 'react';
import { motion } from 'framer-motion';

const InstrumentsTab = () => {
  return (
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
  );
};

export default InstrumentsTab;
