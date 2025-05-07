
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
  const [chromaKeyEnabled, setChromaKeyEnabled] = useState(false);
  const [chromaKeyColor, setChromaKeyColor] = useState("#00FF00");
  const [chromaKeySensitivity, setChromaKeySensitivity] = useState(50);
  const [resizeAspectRatio, setResizeAspectRatio] = useState("16:9");

  // Handle trim video
  const handleTrimVideo = useCallback(() => {
    toast.info('Opening trim interface', {
      description: 'Drag the handles to set in and out points'
    });
    
    // Create timeline marker interface
    const videoPlayer = document.querySelector('video');
    if (videoPlayer) {
      const currentDuration = videoPlayer.duration || 10;
      setTrimStartTime(0);
      setTrimEndTime(currentDuration);
    }
    
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
    
    // Open crop interface with current video dimensions
    const videoPlayer = document.querySelector('video');
    if (videoPlayer) {
      const videoWidth = videoPlayer.videoWidth || 1920;
      const videoHeight = videoPlayer.videoHeight || 1080;
      
      setCropSettings({
        x: Math.round(videoWidth * 0.1), // 10% margin from left
        y: Math.round(videoHeight * 0.1), // 10% margin from top
        width: Math.round(videoWidth * 0.8), // 80% of width
        height: Math.round(videoHeight * 0.8) // 80% of height
      });
    }
    
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
        description: `Start: ${value[0].toFixed(2)}s, End: ${value[1].toFixed(2)}s`,
        duration: 1500
      });
    }
  }, []);
  
  // Handle green screen / chroma key
  const handleGreenScreen = useCallback(() => {
    setChromaKeyEnabled(!chromaKeyEnabled);
    
    if (!chromaKeyEnabled) {
      toast.success('Green screen enabled', {
        description: 'Chroma key effect is now active'
      });
    } else {
      toast.info('Green screen disabled', {
        description: 'Chroma key effect has been turned off'
      });
    }
    
    return !chromaKeyEnabled; // Return the new state
  }, [chromaKeyEnabled]);
  
  // Handle chroma key settings
  const updateChromaKeySettings = useCallback((color: string, sensitivity: number) => {
    setChromaKeyColor(color);
    setChromaKeySensitivity(sensitivity);
    
    toast.success('Chroma key settings updated', {
      description: `Color: ${color}, Sensitivity: ${sensitivity}%`
    });
  }, []);
  
  // Handle magic resize
  const handleMagicResize = useCallback(() => {
    toast.info('Opening magic resize panel', {
      description: 'Choose your target aspect ratio'
    });
    
    setTimeout(() => {
      toast('Magic resize activated', {
        description: 'Select a preset or enter custom dimensions',
        duration: 3000
      });
      
      // Show aspect ratio options
      const ratios = ["16:9", "9:16", "1:1", "4:3", "2.35:1"];
      setResizeAspectRatio(ratios[0]);
    }, 500);
  }, []);
  
  // Handle aspect ratio change
  const updateAspectRatio = useCallback((ratio: string) => {
    setResizeAspectRatio(ratio);
    toast.success(`Aspect ratio changed to ${ratio}`);
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

  // Apply the trim changes
  const applyTrimChanges = useCallback(() => {
    toast.success('Video trimmed successfully', {
      description: `From ${trimStartTime.toFixed(2)}s to ${trimEndTime.toFixed(2)}s`
    });
    
    // In a real implementation, this would update the actual video source
    return {
      start: trimStartTime,
      end: trimEndTime
    };
  }, [trimStartTime, trimEndTime]);
  
  // Apply the crop changes
  const applyCropChanges = useCallback(() => {
    toast.success('Video cropped successfully', {
      description: `Area: ${cropSettings.width}x${cropSettings.height}`
    });
    
    // In a real implementation, this would update the actual video dimensions
    return cropSettings;
  }, [cropSettings]);

  return {
    handleTrimVideo,
    handleCropFrame,
    handleGreenScreen,
    handleMagicResize,
    handleSliderChange,
    handleSplitClip,
    addFilter,
    handleTransition,
    trimStartTime,
    trimEndTime,
    cropSettings,
    setCropSettings,
    chromaKeyEnabled,
    chromaKeyColor,
    chromaKeySensitivity,
    updateChromaKeySettings,
    resizeAspectRatio,
    updateAspectRatio,
    applyTrimChanges,
    applyCropChanges
  };
};

export default useEditingActions;
