
import { useEffect, useRef } from 'react';

interface UseVideoPlaybackProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  videoLoaded: boolean;
  projectDuration: number;
}

export const useVideoPlayback = ({
  videoRef,
  isPlaying,
  setIsPlaying,
  currentTime,
  setCurrentTime,
  videoLoaded,
  projectDuration
}: UseVideoPlaybackProps) => {
  const rafRef = useRef<number | null>(null);
  
  // Update video playback state
  useEffect(() => {
    if (videoRef.current && videoLoaded) {
      if (isPlaying) {
        // Force seek to current time to synchronize playback
        videoRef.current.currentTime = currentTime;
        videoRef.current.play().catch(err => {
          console.log("Video play error:", err);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, videoLoaded, setIsPlaying, currentTime]);
  
  // Animate playback
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }
    
    const animate = () => {
      if (videoRef.current && videoLoaded) {
        setCurrentTime(videoRef.current.currentTime);
        
        if (videoRef.current.currentTime >= projectDuration) {
          setIsPlaying(false);
          setCurrentTime(0);
          videoRef.current.currentTime = 0;
        }
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, projectDuration, setCurrentTime, setIsPlaying, videoLoaded]);
  
  // Update video current time when time is changed externally
  useEffect(() => {
    if (videoRef.current && videoLoaded && Math.abs(videoRef.current.currentTime - currentTime) > 0.5) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime, videoLoaded]);
  
  return null;
};

export default useVideoPlayback;
