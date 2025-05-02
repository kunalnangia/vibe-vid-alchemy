
import { useState, useEffect, useCallback } from 'react';

export interface UseEditorPlaybackOptions {
  initialPlaying?: boolean;
  initialTime?: number;
  initialDuration?: number;
}

export interface UseEditorPlaybackReturn {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  handlePlay: () => void;
  handlePause: () => void;
  handleSeek: (time: number) => void;
  handleEnd: () => void;
}

export const useEditorPlayback = ({
  initialPlaying = false,
  initialTime = 0,
  initialDuration = 0
}: UseEditorPlaybackOptions = {}): UseEditorPlaybackReturn => {
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(initialDuration);
  
  // Update duration when clips change
  useEffect(() => {
    // This would typically be linked to the clips loaded
    // For now, we'll just use the initialDuration
    if (initialDuration > 0) {
      setDuration(initialDuration);
    }
  }, [initialDuration]);
  
  // Handle play
  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);
  
  // Handle pause
  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);
  
  // Handle seek
  const handleSeek = useCallback((time: number) => {
    setCurrentTime(Math.min(Math.max(time, 0), duration));
  }, [duration]);
  
  // Handle end of video
  const handleEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);
  
  // Auto-end when reaching duration
  useEffect(() => {
    if (currentTime >= duration && isPlaying) {
      handleEnd();
    }
  }, [currentTime, duration, isPlaying, handleEnd]);
  
  return {
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    handlePlay,
    handlePause,
    handleSeek,
    handleEnd
  };
};

export default useEditorPlayback;
