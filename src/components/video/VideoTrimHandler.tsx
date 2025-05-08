
import React, { useEffect } from 'react';

interface VideoTrimHandlerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isLoaded: boolean;
  trimSettings?: {
    start: number;
    end: number;
  };
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const VideoTrimHandler: React.FC<VideoTrimHandlerProps> = ({
  videoRef,
  isLoaded,
  trimSettings,
  onPlayStateChange
}) => {
  // Apply trim settings
  useEffect(() => {
    if (!isLoaded || !videoRef.current || !trimSettings) return;
    
    const video = videoRef.current;
    
    // Set current time to start if we're outside the trim range
    if (video.currentTime < trimSettings.start || video.currentTime > trimSettings.end) {
      video.currentTime = trimSettings.start;
    }
    
    // Add listener to reset to start time when reaching end time
    const handleTimeUpdate = () => {
      if (video.currentTime >= trimSettings.end) {
        video.pause();
        if (onPlayStateChange) onPlayStateChange(false);
      }
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isLoaded, videoRef, trimSettings, onPlayStateChange]);
  
  return null;
};

export default VideoTrimHandler;
