
import { useState, useCallback, useRef } from 'react';
import { useAnimationFrame } from './useAnimationFrame';
import { validateTimeValue, calculateProgress, clamp } from './utils';
import { UseEditorPlaybackOptions, UseEditorPlaybackReturn } from './types';

export function useEditorPlayback({
  initialPlaying = false,
  initialTime = 0,
  initialDuration = 0,
  maxDuration = 300, // 5 minutes default max duration
  onTimeUpdate,
  onPlayStateChange,
  onError
}: UseEditorPlaybackOptions = {}): UseEditorPlaybackReturn {
  // State for playback
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(initialDuration);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Refs for tracking last update time and playback rate
  const lastUpdateTime = useRef<number>(Date.now());
  const playbackRate = useRef<number>(1.0);

  // Validate and set time within bounds
  const validateAndSetTime = useCallback((time: number) => {
    const validTime = validateTimeValue(time, duration);
    setCurrentTime(validTime);
    setProgress(calculateProgress(validTime, duration));
    
    if (onTimeUpdate) {
      onTimeUpdate(validTime);
    }
    
    return validTime;
  }, [duration, onTimeUpdate]);

  // Handle playing
  const handlePlay = useCallback(() => {
    lastUpdateTime.current = Date.now();
    setIsPlaying(true);
    
    if (onPlayStateChange) {
      onPlayStateChange(true);
    }
  }, [onPlayStateChange]);

  // Handle pausing
  const handlePause = useCallback(() => {
    setIsPlaying(false);
    
    if (onPlayStateChange) {
      onPlayStateChange(false);
    }
  }, [onPlayStateChange]);

  // Toggle play/pause
  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePlay, handlePause]);

  // Handle slider changes (e.g., from a UI component)
  const handleSliderChange = useCallback((value: number[]) => {
    if (value && value.length > 0) {
      validateAndSetTime(value[0]);
    }
  }, [validateAndSetTime]);

  // Direct method to seek to a specific time
  const seekTo = useCallback((timeInSeconds: number) => {
    try {
      validateAndSetTime(timeInSeconds);
    } catch (err) {
      if (onError) {
        onError(err instanceof Error ? err : new Error(String(err)));
      }
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [validateAndSetTime, onError]);

  // Handle seeking to a specific time
  const handleSeek = useCallback((time: number) => {
    validateAndSetTime(time);
  }, [validateAndSetTime]);

  // Handle end of playback
  const handleEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (onPlayStateChange) onPlayStateChange(false);
  }, [onPlayStateChange]);

  // Animation callback for playback
  const animationCallback = useCallback((time: number) => {
    try {
      const now = Date.now();
      const deltaSeconds = (now - lastUpdateTime.current) / 1000;
      lastUpdateTime.current = now;
      
      if (deltaSeconds > 0) {
        const newTime = currentTime + (deltaSeconds * playbackRate.current);
        
        // Check if we've reached the end
        if (newTime >= duration) {
          validateAndSetTime(duration);
          setIsPlaying(false);
          
          if (onPlayStateChange) {
            onPlayStateChange(false);
          }
        } else {
          validateAndSetTime(newTime);
        }
      }
    } catch (err) {
      handlePause();
      if (onError) {
        onError(err instanceof Error ? err : new Error(String(err)));
      }
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [currentTime, duration, validateAndSetTime, onPlayStateChange, onError, handlePause]);

  // Use our animation frame hook for smooth playback
  useAnimationFrame(animationCallback, isPlaying);

  return {
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    handlePlay,
    handlePause,
    handleTogglePlay,
    handleSeek,
    handleEnd,
    handleSliderChange,
    seekTo,
    error,
    isLoading,
    progress
  };
}

export default useEditorPlayback;
