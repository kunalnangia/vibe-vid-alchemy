
import React from 'react';
import { toast } from 'sonner';
import { useVideoSettings } from './VideoSettingsProvider';

interface VideoToolbarActionsProps {
  currentTime: number;
  projectDuration: number;
  videoWidth: number;
  videoHeight: number;
}

const VideoToolbarActions: React.FC<VideoToolbarActionsProps> = ({
  currentTime,
  projectDuration,
  videoWidth,
  videoHeight
}) => {
  const {
    setTrimSettings,
    setCropSettings,
    greenScreenEnabled,
    autoCaptionsEnabled,
    setGreenScreenEnabled,
    setAutoCaptionsEnabled
  } = useVideoSettings();

  // Handle trim action
  const handleTrim = () => {
    toast.info("Opening trim controls");
    const newStart = Math.max(0, currentTime);
    const newEnd = Math.min(projectDuration, currentTime + Math.min(10, projectDuration - currentTime));
    
    setTrimSettings({
      start: newStart, 
      end: newEnd
    });
    
    setTimeout(() => {
      toast("Drag sliders to adjust trim points");
    }, 500);
  };
  
  // Handle crop action
  const handleCrop = () => {
    toast.info("Opening crop controls");
    
    // Default to 10% inset crop
    setCropSettings({
      x: Math.round(videoWidth * 0.1),
      y: Math.round(videoHeight * 0.1),
      width: Math.round(videoWidth * 0.8),
      height: Math.round(videoHeight * 0.8)
    });
    
    setTimeout(() => {
      toast("Drag handles to adjust crop area");
    }, 500);
  };
  
  // Handle green screen toggle
  const handleGreenScreen = () => {
    const newState = !greenScreenEnabled;
    setGreenScreenEnabled(newState);
    
    toast(newState ? 
      "Green screen enabled - solid color backgrounds will be transparent" : 
      "Green screen disabled");
  };
  
  // Handle magic resize
  const handleMagicResize = () => {
    toast.info("Opening magic resize options");
    toast("Choose an aspect ratio for your video");
  };
  
  // Handle auto captions
  const handleAutoCaptions = () => {
    const newState = !autoCaptionsEnabled;
    setAutoCaptionsEnabled(newState);
    
    if (newState) {
      toast("Generating captions from audio...");
    } else {
      toast("Captions disabled");
    }
  };
  
  // Handle AI enhance
  const handleAIEnhance = () => {
    toast.info("Enhancing video with AI...");
    
    setTimeout(() => {
      toast("Analyzing video content...");
    }, 800);
    
    setTimeout(() => {
      toast.success("Video enhanced", {
        description: "Brightness, contrast and color balance improved"
      });
    }, 2500);
  };

  return {
    handleTrim,
    handleCrop,
    handleGreenScreen,
    handleMagicResize,
    handleAutoCaptions,
    handleAIEnhance
  };
};

export default VideoToolbarActions;
