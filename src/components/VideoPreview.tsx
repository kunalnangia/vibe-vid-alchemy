import React, { useState, useEffect } from 'react';
import { VideoPreviewProps } from '@/lib/video/types';
import VideoCanvas from './video/VideoCanvas';
import VideoFormatIndicator from './video/VideoFormatIndicator';
import { Button } from './ui/button';

const VideoPreview: React.FC<VideoPreviewProps> = ({
  clips = [],
  textOverlays = [],
  currentTime = 0,
  setCurrentTime = () => {},
  isPlaying = false,
  setIsPlaying = () => {},
  projectDuration = 25,
  currentFilter = 'normal',
  aspectRatio = 'landscape',
  greenScreenEnabled = false,
  autoCaptionsEnabled = false
}) => {
  const [localGreenScreenEnabled, setLocalGreenScreenEnabled] = useState(greenScreenEnabled);
  
  // Keep local state in sync with props
  useEffect(() => {
    setLocalGreenScreenEnabled(greenScreenEnabled);
  }, [greenScreenEnabled]);

  const toggleGreenScreen = () => {
    setLocalGreenScreenEnabled(!localGreenScreenEnabled);
  };

  // Error handling for video loading issues
  const [hasError, setHasError] = useState(false);
  const handleVideoError = () => {
    setHasError(true);
  };
  
  const resetVideoError = () => {
    setHasError(false);
  };

  return (
    <div className="video-preview-container flex flex-col items-center justify-start bg-black/5 p-6 rounded-lg shadow-inner mb-8 mt-4">
      <div className="mb-4 w-full flex justify-end space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleGreenScreen}
          className={localGreenScreenEnabled ? "bg-green-100 text-green-800 border-green-300" : ""}
        >
          {localGreenScreenEnabled ? "Disable Green Screen" : "Enable Green Screen"}
        </Button>
      </div>
      
      {hasError ? (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg w-full">
          <p className="text-red-600 font-medium mb-3">Video loading error</p>
          <Button 
            variant="destructive"
            onClick={resetVideoError}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <VideoCanvas
          clips={clips}
          textOverlays={textOverlays}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          projectDuration={projectDuration}
          currentFilter={currentFilter}
          aspectRatio={aspectRatio}
          greenScreenEnabled={localGreenScreenEnabled}
          autoCaptionsEnabled={autoCaptionsEnabled}
          onError={handleVideoError}
        />
      )}
      
      <VideoFormatIndicator 
        aspectRatio={aspectRatio}
        currentFilter={currentFilter}
      />
    </div>
  );
};

export default VideoPreview;
