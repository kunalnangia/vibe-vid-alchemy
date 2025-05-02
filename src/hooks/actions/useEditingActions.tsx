
import { useState } from 'react';
import { toast } from 'sonner';

export const useEditingActions = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  // Handle trim video
  const handleTrimVideo = () => {
    setActiveTool('trim');
    toast.info('Trim tool activated', {
      description: 'Use the timeline markers to select start and end points'
    });
  };
  
  // Handle crop frame
  const handleCropFrame = () => {
    setActiveTool('crop');
    toast.info('Crop tool activated', {
      description: 'Drag the handles to crop your video'
    });
  };
  
  // Handle slider change for timeline
  const handleSliderChange = (value: number[]) => {
    // This would normally update the current time
    // For demo purposes, just show a toast
    toast(`Seeking to ${value[0].toFixed(1)}s`);
  };

  return {
    activeTool,
    setActiveTool,
    handleTrimVideo,
    handleCropFrame,
    handleSliderChange
  };
};

export default useEditingActions;
