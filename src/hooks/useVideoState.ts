
import { useState } from 'react';

interface UseVideoStateReturn {
  currentFilter: string;
  setCurrentFilter: (filter: string) => void;
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
  greenScreenEnabled: boolean;
  setGreenScreenEnabled: (enabled: boolean) => void;
  toggleGreenScreen: () => void;
  autoCaptionsEnabled: boolean;
  setAutoCaptionsEnabled: (enabled: boolean) => void;
  toggleAutoCaptions: () => void;
}

const useVideoState = (): UseVideoStateReturn => {
  const [currentFilter, setCurrentFilter] = useState<string>('normal');
  const [aspectRatio, setAspectRatio] = useState<string>('landscape');
  const [greenScreenEnabled, setGreenScreenEnabled] = useState<boolean>(false);
  const [autoCaptionsEnabled, setAutoCaptionsEnabled] = useState<boolean>(false);

  const toggleGreenScreen = () => {
    setGreenScreenEnabled(prev => !prev);
  };

  const toggleAutoCaptions = () => {
    setAutoCaptionsEnabled(prev => !prev);
  };

  return {
    currentFilter,
    setCurrentFilter,
    aspectRatio,
    setAspectRatio,
    greenScreenEnabled,
    setGreenScreenEnabled,
    toggleGreenScreen,
    autoCaptionsEnabled,
    setAutoCaptionsEnabled,
    toggleAutoCaptions
  };
};

export default useVideoState;
