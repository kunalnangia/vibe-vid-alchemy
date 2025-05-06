
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useVideoState = () => {
  // Core video state
  const [currentFilter, setCurrentFilter] = useState('normal');
  const [aspectRatio, setAspectRatio] = useState('landscape');
  const [greenScreenEnabled, setGreenScreenEnabled] = useState(false);
  const [autoCaptionsEnabled, setAutoCaptionsEnabled] = useState(false);
  
  // Auto-save functionality for user preferences
  useEffect(() => {
    try {
      // Load saved settings from localStorage if available
      const savedSettings = localStorage.getItem('video-editor-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setCurrentFilter(settings.filter || 'normal');
        setAspectRatio(settings.aspectRatio || 'landscape');
        setGreenScreenEnabled(settings.greenScreen || false);
        setAutoCaptionsEnabled(settings.autoCaptions || false);
      }
    } catch (error) {
      console.error('Error loading saved settings:', error);
      // Continue with default settings on error
    }
  }, []);
  
  // Save settings when they change
  useEffect(() => {
    try {
      localStorage.setItem('video-editor-settings', JSON.stringify({
        filter: currentFilter,
        aspectRatio: aspectRatio,
        greenScreen: greenScreenEnabled,
        autoCaptions: autoCaptionsEnabled
      }));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, [currentFilter, aspectRatio, greenScreenEnabled, autoCaptionsEnabled]);

  // Handle green screen toggle with notifications
  const toggleGreenScreen = () => {
    setGreenScreenEnabled(prev => {
      const newState = !prev;
      toast.success(newState ? 'Green screen enabled' : 'Green screen disabled');
      return newState;
    });
  };
  
  // Handle auto captions toggle with notifications
  const toggleAutoCaptions = () => {
    setAutoCaptionsEnabled(prev => {
      const newState = !prev;
      toast.success(newState ? 'Auto captions enabled' : 'Auto captions disabled');
      return newState;
    });
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
