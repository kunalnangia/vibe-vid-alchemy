
import { useState } from 'react';
import { toast } from "sonner";

interface UseEditorPlaybackReturn {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
  duration: number;
  handlePlay: () => void;
  handleSliderChange: (value: number[]) => void;
}

export const useEditorPlayback = (): UseEditorPlaybackReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(25); // 25 seconds for example
  
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? "Video paused" : "Video playing");
  };
  
  const handleSliderChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };
  
  return {
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    handlePlay,
    handleSliderChange,
  };
};
