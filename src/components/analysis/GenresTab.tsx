
import React from 'react';
import { motion } from 'framer-motion';

const GenresTab = () => {
  return (
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
  );
};

export default GenresTab;
