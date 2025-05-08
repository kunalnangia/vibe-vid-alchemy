
import React, { useState, useEffect, createContext, useContext } from 'react';

interface VideoSettings {
  trimSettings?: {start: number, end: number};
  cropSettings?: {x: number, y: number, width: number, height: number};
  greenScreenEnabled: boolean;
  autoCaptionsEnabled: boolean;
}

interface VideoSettingsContextType extends VideoSettings {
  setTrimSettings: (settings?: {start: number, end: number}) => void;
  setCropSettings: (settings?: {x: number, y: number, width: number, height: number}) => void;
  setGreenScreenEnabled: (enabled: boolean) => void;
  setAutoCaptionsEnabled: (enabled: boolean) => void;
}

const VideoSettingsContext = createContext<VideoSettingsContextType | undefined>(undefined);

export const useVideoSettings = () => {
  const context = useContext(VideoSettingsContext);
  if (context === undefined) {
    throw new Error('useVideoSettings must be used within a VideoSettingsProvider');
  }
  return context;
};

interface VideoSettingsProviderProps {
  initialGreenScreen?: boolean;
  initialAutoCaptions?: boolean;
  children: React.ReactNode;
}

export const VideoSettingsProvider: React.FC<VideoSettingsProviderProps> = ({
  initialGreenScreen = false,
  initialAutoCaptions = false,
  children
}) => {
  const [trimSettings, setTrimSettings] = useState<{start: number, end: number} | undefined>();
  const [cropSettings, setCropSettings] = useState<{x: number, y: number, width: number, height: number} | undefined>();
  const [greenScreenEnabled, setGreenScreenEnabled] = useState(initialGreenScreen);
  const [autoCaptionsEnabled, setAutoCaptionsEnabled] = useState(initialAutoCaptions);

  // Sync with props when they change
  useEffect(() => {
    setGreenScreenEnabled(initialGreenScreen);
  }, [initialGreenScreen]);

  useEffect(() => {
    setAutoCaptionsEnabled(initialAutoCaptions);
  }, [initialAutoCaptions]);

  const value = {
    trimSettings,
    cropSettings,
    greenScreenEnabled,
    autoCaptionsEnabled,
    setTrimSettings,
    setCropSettings,
    setGreenScreenEnabled,
    setAutoCaptionsEnabled
  };

  return (
    <VideoSettingsContext.Provider value={value}>
      {children}
    </VideoSettingsContext.Provider>
  );
};

export default VideoSettingsProvider;
