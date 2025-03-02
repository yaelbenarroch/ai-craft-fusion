
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface AudioUploaderProps {
  onFileUpload: (file: File) => void;
}

const AudioUploader = ({ onFileUpload }: AudioUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      const uploadedFile = files[0];
      const fileType = uploadedFile.type;
      
      if (fileType.startsWith('audio/')) {
        setFile(uploadedFile);
        onFileUpload(uploadedFile);
        toast({
          title: "File uploaded successfully",
          description: `${uploadedFile.name} (${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an audio file (.mp3, .wav, etc.).",
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div
        className={`glass-card p-8 flex flex-col items-center justify-center min-h-[250px] cursor-pointer transition-all ${
          isDragging ? 'border-primary border-2' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          type="file"
          id="file-input"
          className="hidden"
          accept="audio/*"
          onChange={handleFileInput}
        />
        
        {file ? (
          <motion.div 
            className="flex flex-col items-center gap-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <File className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
            >
              Change File
            </Button>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Upload className="w-8 h-8 text-secondary-foreground" />
            </motion.div>
            <div className="text-center">
              <p className="text-lg font-medium">Upload Audio File</p>
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to browse
              </p>
            </div>
            <div className="flex items-center text-xs text-muted-foreground gap-1 mt-4">
              <AlertCircle className="w-3 h-3" />
              <span>Supported formats: MP3, WAV, FLAC, OGG</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AudioUploader;
