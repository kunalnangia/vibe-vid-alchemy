
import React, { useState } from 'react';
import { VideoClip, TextOverlay } from '@/lib/video/types';
import VideoCanvasMain from './video/VideoCanvasMain';
import { toast } from 'sonner';

interface VideoCanvasProps {
  clips: VideoClip[];
  textOverlays: TextOverlay[];
  currentTime: number;
  setCurrentTime: (time: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  projectDuration: number;
  currentFilter: string;
  aspectRatio: string;
  greenScreenEnabled?: boolean;
  autoCaptionsEnabled?: boolean;
  onError?: () => void;
}

const VideoCanvas: React.FC<VideoCanvasProps> = (props) => {
  const [hasError, setHasError] = useState(false);

  // Error handling for video loading issues
  const handleVideoError = () => {
    setHasError(true);
    toast.error("Error loading video");
  };
  
  const resetVideoError = () => {
    setHasError(false);
  };

  return hasError ? (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg w-full">
      <p className="text-red-600 font-medium mb-3">Video loading error</p>
      <button 
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        onClick={resetVideoError}
      >
        Try Again
      </button>
    </div>
  ) : (
    <VideoCanvasMain 
      {...props}
      onError={handleVideoError}
    />
  );
};

export default VideoCanvas;
