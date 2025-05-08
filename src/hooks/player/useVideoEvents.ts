
import { useState, useEffect, RefObject } from 'react';
import { toast } from 'sonner';

interface UseVideoEventsProps {
  videoRef: RefObject<HTMLVideoElement>;
  src: string | File | null;
  autoPlay?: boolean;
  onLoadedMetadata?: (duration: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onError?: (error: any) => void;
}

export const useVideoEvents = ({
  videoRef,
  src,
  autoPlay = false,
  onLoadedMetadata,
  onPlayStateChange,
  onError
}: UseVideoEventsProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Set up video event listeners
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded, duration:', video.duration);
      setIsLoaded(true);
      setDuration(video.duration);
      if (onLoadedMetadata) {
        onLoadedMetadata(video.duration);
      }
    };
    
    const handlePlay = () => {
      console.log('Video playback started');
      setIsPlaying(true);
      if (onPlayStateChange) onPlayStateChange(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    
    const handleError = (e: Event) => {
      console.error('Video error:', video.error);
      setIsLoaded(false);
      
      if (onError) onError(video.error);
      
      toast.error(`Error playing video: ${video.error?.message || 'Unknown error'}`);
    };
    
    const handleCanPlay = () => {
      setIsLoaded(true);
      console.log('Video can play now');
      
      // Auto play if enabled
      if (autoPlay && video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('Auto-play prevented on canplay:', error);
          });
        }
      }
    };
    
    // Add event listeners
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);
    
    return () => {
      // Remove event listeners
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoRef, autoPlay, onLoadedMetadata, onPlayStateChange, onError]);

  return {
    isLoaded,
    isPlaying,
    currentTime,
    duration,
    setIsPlaying
  };
};

export default useVideoEvents;
