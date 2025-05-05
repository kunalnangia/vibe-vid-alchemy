
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
  const lastUpdateTimeRef = useRef<number>(0);
  
  // Update video playback state
  useEffect(() => {
    if (!videoRef.current || !videoLoaded) return;
    
    const video = videoRef.current;
    
    const handlePlay = async () => {
      try {
        // Force seek to current time to synchronize playback
        video.currentTime = currentTime;
        console.log("Playing video from time:", currentTime);
        
        // Try to play with error catching
        await video.play();
        console.log("Video playback started successfully");
      } catch (err) {
        console.error("Video play error:", err);
        setIsPlaying(false);
        // Try to handle autoplay restrictions with user interaction prompt
        if (err instanceof DOMException && err.name === "NotAllowedError") {
          // This is likely an autoplay policy restriction
          console.warn("Autoplay prevented by browser policy");
        }
      }
    };
    
    const handlePause = () => {
      video.pause();
      console.log("Video playback paused");
    };
    
    if (isPlaying) {
      handlePlay();
    } else {
      handlePause();
    }
    
    // Synchronize video events with app state
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, [isPlaying, videoLoaded, setIsPlaying, currentTime, setCurrentTime]);
  
  // Animate playback and track time
  useEffect(() => {
    if (!isPlaying || !videoLoaded) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }
    
    const animate = () => {
      const now = performance.now();
      // Throttle updates to improve performance
      if (now - lastUpdateTimeRef.current > 100) { // Update every 100ms
        if (videoRef.current) {
          setCurrentTime(videoRef.current.currentTime);
          lastUpdateTimeRef.current = now;
          
          // Check for end of playback
          if (videoRef.current.currentTime >= projectDuration || videoRef.current.ended) {
            setIsPlaying(false);
            setCurrentTime(0);
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
            return; // Stop animation loop
          }
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
    if (videoRef.current && videoLoaded && Math.abs(videoRef.current.currentTime - currentTime) > 0.5 && !isPlaying) {
      console.log("Seeking video to:", currentTime);
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime, videoLoaded, isPlaying]);
  
  return null;
};

export default useVideoPlayback;
