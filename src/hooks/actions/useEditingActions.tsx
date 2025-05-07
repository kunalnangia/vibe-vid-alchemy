
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const useEditingActions = () => {
  const [trimStartTime, setTrimStartTime] = useState<number>(0);
  const [trimEndTime, setTrimEndTime] = useState<number>(0);
  const [cropSettings, setCropSettings] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100
  });

  // Handle trim video
  const handleTrimVideo = useCallback(() => {
    toast.info('Opening trim interface', {
      description: 'Drag the handles to set in and out points'
    });
    
    // Simulate trim panel opening
    setTimeout(() => {
      toast('Trim panel opened', {
        description: 'Select the portion of the video you want to keep',
        duration: 3000
      });
    }, 500);
  }, []);
  
  // Handle crop frame
  const handleCropFrame = useCallback(() => {
    toast.info('Opening crop interface', {
      description: 'Drag the handles to adjust the crop area'
    });
    
    // Simulate crop panel opening
    setTimeout(() => {
      toast('Crop panel opened', {
        description: 'Define the area you want to keep in your video',
        duration: 3000
      });
    }, 500);
  }, []);
  
  // Handle slider change for trim
  const handleSliderChange = useCallback((value: number[]) => {
    if (value.length >= 2) {
      setTrimStartTime(value[0]);
      setTrimEndTime(value[1]);
      
      toast('Selection updated', {
        description: `Start: ${value[0]}s, End: ${value[1]}s`,
        duration: 1500
      });
    }
  }, []);
  
  // Handle split clip at current time
  const handleSplitClip = useCallback((currentTime: number) => {
    toast.success('Clip split successfully', {
      description: `Split at ${currentTime.toFixed(2)} seconds`
    });
  }, []);
  
  // Add filter to video
  const addFilter = useCallback((filterName: string) => {
    toast.success(`Applied ${filterName} filter`);
  }, []);
  
  // Handle transition
  const handleTransition = useCallback((transitionType: string) => {
    toast.success(`Added ${transitionType} transition`);
  }, []);

  return {
    handleTrimVideo,
    handleCropFrame,
    handleSliderChange,
    handleSplitClip,
    addFilter,
    handleTransition,
    trimStartTime,
    trimEndTime,
    cropSettings,
    setCropSettings
  };
};

export default useEditingActions;
