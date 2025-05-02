
import { useState } from 'react';

export const useVideoState = () => {
  const [currentFilter, setCurrentFilter] = useState('normal');
  const [aspectRatio, setAspectRatio] = useState('landscape');
  const [greenScreenEnabled, setGreenScreenEnabled] = useState(false);
  const [autoCaptionsEnabled, setAutoCaptionsEnabled] = useState(false);

  return {
    currentFilter,
    setCurrentFilter,
    aspectRatio,
    setAspectRatio,
    greenScreenEnabled,
    setGreenScreenEnabled,
    autoCaptionsEnabled,
    setAutoCaptionsEnabled
  };
};

export default useVideoState;
