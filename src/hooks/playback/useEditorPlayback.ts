
import { useState, useRef, useCallback } from 'react';
import { toast } from "sonner";
import { useAnimationFrame } from './useAnimationFrame';
import { validateTimeValue, calculateProgress } from './utils';
import { UseEditorPlaybackOptions, UseEditorPlaybackReturn } from './types';

/**
 * Custom hook for managing video playback state in the editor
 * @param options Configuration options for the playback behavior
 * @returns Playback state and control functions
 */
export const useEditorPlayback = (options: UseEditorPlaybackOptions = {}): UseEditorPlaybackReturn => {
  // Destructure options with defaults
  const { 
    initialTime = 0,
    maxDuration = 25, // Default maximum duration
    onTimeUpdate,
    onPlayStateChange,
    onError
  } = options;

  // State management
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(maxDuration);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Last update time reference for calculating playback progress
  const lastUpdateTime = useRef<number>(Date.now());
  
  // Calculate progress as a percentage
  const progress = calculateProgress(currentTime, duration);

  // Validate and set current time with boundary checks
  const validateAndSetTime = useCallback((time: number) => {
    try {
      const validTime = validateTimeValue(time, duration);
      setCurrentTime(validTime);
      
      // Call the onTimeUpdate callback if provided
      if (onTimeUpdate) {
        onTimeUpdate(validTime);
      }
      
      return validTime;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error setting time');
      setError(error);
      if (onError) onError(error);
      return currentTime; // Return current value on error
    }
  }, [currentTime, duration, onTimeUpdate, onError]);

  // Handle play button click
  const handlePlay = useCallback(() => {
    try {
      setIsPlaying(true);
      lastUpdateTime.current = Date.now();
      if (onPlayStateChange) onPlayStateChange(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to start playback');
      setError(error);
      if (onError) onError(error);
    }
  }, [onPlayStateChange, onError]);

  // Handle pause button click
  const handlePause = useCallback(() => {
    try {
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to pause playback');
      setError(error);
      if (onError) onError(error);
    }
  }, [onPlayStateChange, onError]);

  // Toggle play/pause state
  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePlay, handlePause]);
  
  // Handle time slider change
  const handleSliderChange = useCallback((value: number[]) => {
    try {
      if (!value || !Array.isArray(value) || value.length === 0) {
        throw new Error("Invalid slider value");
      }
      validateAndSetTime(value[0]);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Slider change error');
      setError(error);
      if (onError) onError(error);
    }
  }, [validateAndSetTime, onError]);
  
  // Direct seek to a specific time
  const seekTo = useCallback((timeInSeconds: number) => {
    try {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 100); // Simulate loading state
      validateAndSetTime(timeInSeconds);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Seek error');
      setError(error);
      if (onError) onError(error);
      setIsLoading(false);
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
      
      let newTime = currentTime + deltaSeconds;
      
      // Handle reaching the end of the video
      if (newTime >= duration) {
        setIsPlaying(false);
        newTime = 0; // Reset to beginning
        toast.info("Video playback complete");
        if (onPlayStateChange) onPlayStateChange(false);
      }
      
      validateAndSetTime(newTime);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Playback animation error');
      setError(error);
      if (onError) onError(error);
      setIsPlaying(false);
    }
  }, [currentTime, duration, validateAndSetTime, onPlayStateChange, onError]);

  // Use our animation frame hook for smooth playback
  useAnimationFrame(animationCallback, isPlaying);

  return {
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime: validateAndSetTime,
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
};
