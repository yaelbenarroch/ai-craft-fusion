
import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass-effect py-4 px-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
              <span className="font-bold text-lg">AV</span>
            </div>
          </div>
          <span className="font-bold text-xl">AudioViz AI</span>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a 
              href="https://github.com/yourusername/audioviz-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
