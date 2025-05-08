
import React from 'react';
import VideoPlayerContent from './VideoPlayerContent';

interface DirectVideoPlayerProps {
  src: string | File | null;
  autoPlay?: boolean;
  muted?: boolean;
  onLoadedMetadata?: (duration: number) => void;
  onError?: (error: any) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onFileUpload?: (file: File) => void;
  greenScreenEnabled?: boolean;
  autoCaptionsEnabled?: boolean;
  currentFilter?: string;
  aspectRatio?: string;
  trimSettings?: {
    start: number;
    end: number;
  };
  cropSettings?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  onTrim?: () => void;
  onCrop?: () => void;
  onGreenScreen?: () => void;
  onMagicResize?: () => void;
  onAutoCaptions?: () => void;
  onAIEnhance?: () => void;
}

const DirectVideoPlayer: React.FC<DirectVideoPlayerProps> = (props) => {
  // Handle file upload and automatic playback
  const handleFileUpload = (file: File) => {
    console.log('DirectVideoPlayer: Handling file upload:', file.name);
    if (props.onFileUpload) {
      props.onFileUpload(file);
    }
  };

  return (
    <div className="direct-video-player relative w-full">
      <VideoPlayerContent 
        {...props}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default DirectVideoPlayer;
