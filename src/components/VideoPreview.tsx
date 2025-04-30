
import React from 'react';
import { VideoPreviewProps } from '@/lib/video/types';
import VideoCanvas from './video/VideoCanvas';
import VideoFormatIndicator from './video/VideoFormatIndicator';

const VideoPreview: React.FC<VideoPreviewProps> = ({
  clips = [], // Provide default empty array
  textOverlays = [], // Provide default empty array
  currentTime = 0,
  setCurrentTime = () => {},
  isPlaying = false,
  setIsPlaying = () => {},
  projectDuration = 25,
  currentFilter = 'normal',
  aspectRatio = 'landscape'
}) => {
  return (
    <div className="video-preview-container flex flex-col items-center justify-center">
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
      />
      
      <VideoFormatIndicator 
        aspectRatio={aspectRatio}
        currentFilter={currentFilter}
      />
    </div>
  );
};

export default VideoPreview;
