
import { useState } from 'react';

interface UseVideoControlsWithErrorProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isLoaded: boolean;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  onError?: (error: any) => void;
}

export const useVideoControlsWithError = ({
  videoRef,
  isLoaded,
  isPlaying,
  setIsPlaying,
  onError
}: UseVideoControlsWithErrorProps) => {
  // Handle toggle play/pause
  const handleTogglePlay = () => {
    if (!videoRef.current || !isLoaded) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing video:', error);
          if (onError) {
            onError(error);
          }
        });
      }
    }
  };
  
  // Handle direct play command
  const handlePlay = () => {
    if (!videoRef.current || !isLoaded) return;
    
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Error playing video:', error);
        setIsPlaying(false);
        if (onError) {
          onError(error);
        }
      });
    }
  };
  
  // Handle retry after error
  const handleRetry = () => {
    if (!videoRef.current) return;
    
    try {
      // Reload video
      videoRef.current.load();
    } catch (err) {
      console.error('Error retrying video playback:', err);
      if (onError) {
        onError(err);
      }
    }
  };
  
  return {
    handleTogglePlay,
    handlePlay,
    handleRetry
  };
};

export default useVideoControlsWithError;
