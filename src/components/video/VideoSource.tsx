
import React, { useState, useEffect } from 'react';
import { VideoClip } from '@/lib/video/types';
import { toast } from 'sonner';

interface VideoSourceProps {
  clips: VideoClip[];
  onSourceChange: (source: File | string | null) => void;
}

const VideoSource: React.FC<VideoSourceProps> = ({ clips, onSourceChange }) => {
  // Set up video source from clips
  useEffect(() => {
    if (clips && clips.length > 0) {
      const currentClip = clips[0]; // Currently only handling the first clip
      
      if (currentClip.file) {
        console.log("Setting video source from file:", currentClip.name);
        onSourceChange(currentClip.file);
      } else if (currentClip.src) {
        console.log("Setting video source from src:", currentClip.src);
        onSourceChange(currentClip.src);
      }
    } else {
      onSourceChange(null);
    }
  }, [clips, onSourceChange]);

  // Handler for file upload directly from the player
  const handleFileUpload = (file: File) => {
    if (!file) return;
    
    console.log("File uploaded from video player:", file.name);
    toast.success(`Video uploaded: ${file.name}`);
    
    // Use the editorClips global handler if available
    if (window.editorClips && typeof window.editorClips.handleUpload === 'function') {
      window.editorClips.handleUpload(file);
    } else {
      console.log("Editor clip management not available, handling locally");
      onSourceChange(file);
    }
  };

  return { handleFileUpload };
};

export default VideoSource;
