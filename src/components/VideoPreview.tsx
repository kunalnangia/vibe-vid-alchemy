
import React, { useState } from 'react';
import { VideoPreviewProps } from '@/lib/video/types';
import VideoCanvas from './video/VideoCanvas';
import VideoFormatIndicator from './video/VideoFormatIndicator';
import { Button } from './ui/button';
import { Crop, Download, RefreshCw } from 'lucide-react';

const VideoPreview: React.FC<VideoPreviewProps> = ({
  clips = [],
  textOverlays = [],
  currentTime = 0,
  setCurrentTime = () => {},
  isPlaying = false,
  setIsPlaying = () => {},
  projectDuration = 25,
  currentFilter = 'normal',
  aspectRatio = 'landscape'
}) => {
  const [greenScreenEnabled, setGreenScreenEnabled] = useState(false);

  const toggleGreenScreen = () => {
    setGreenScreenEnabled(!greenScreenEnabled);
  };

  return (
    <div className="video-preview-container flex flex-col items-center justify-center bg-black/5 p-6 rounded-lg shadow-inner">
      <div className="mb-4 w-full flex justify-end space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleGreenScreen}
          className={greenScreenEnabled ? "bg-green-100 text-green-800 border-green-300" : ""}
        >
          {greenScreenEnabled ? "Disable Green Screen" : "Enable Green Screen"}
        </Button>
      </div>
      
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
        greenScreenEnabled={greenScreenEnabled}
      />
      
      <VideoFormatIndicator 
        aspectRatio={aspectRatio}
        currentFilter={currentFilter}
      />
    </div>
  );
};

export default VideoPreview;
