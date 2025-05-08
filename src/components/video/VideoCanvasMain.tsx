
import React, { useState, useEffect } from 'react';
import { VideoPreviewProps } from '@/lib/video/types';
import { toast } from 'sonner';
import DirectVideoPlayer from './DirectVideoPlayer';
import VideoSettingsProvider, { useVideoSettings } from './VideoSettingsProvider';
import VideoSource from './VideoSource';
import VideoToolbarActions from './VideoToolbarActions';

interface VideoCanvasProps extends VideoPreviewProps {
  onError?: () => void;
}

const VideoCanvasMain: React.FC<VideoCanvasProps> = ({
  clips,
  textOverlays,
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  projectDuration,
  currentFilter = 'normal',
  aspectRatio = 'landscape',
  greenScreenEnabled = false,
  autoCaptionsEnabled = false,
  onError
}) => {
  const [currentVideoSrc, setCurrentVideoSrc] = useState<File | string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoWidth, setVideoWidth] = useState(1920);
  const [videoHeight, setVideoHeight] = useState(1080);

  // Initialize video source from clips
  const videoSource = VideoSource({
    clips,
    onSourceChange: setCurrentVideoSrc
  });

  // Extract the handleFileUpload function
  const handleFileUpload = videoSource.handleFileUpload;

  // Handle video metadata loaded
  const handleLoadedMetadata = (duration: number) => {
    console.log("Video metadata loaded. Duration:", duration + "s");
    setVideoLoaded(true);
    
    // Get video dimensions
    const video = document.querySelector('video');
    if (video) {
      setVideoWidth(video.videoWidth || 1920);
      setVideoHeight(video.videoHeight || 1080);
    }
  };

  // Handle video error
  const handleVideoError = (error: any) => {
    console.error("Video loading error:", error);
    setVideoLoaded(false);
    if (onError) onError();
    toast.error("Error loading video. Please try another file.");
  };

  // Handle play state change
  const handlePlayStateChange = (playing: boolean) => {
    console.log("Play state changed:", playing ? "playing" : "paused");
    setIsPlaying(playing);
  };

  return (
    <VideoSettingsProvider
      initialGreenScreen={greenScreenEnabled}
      initialAutoCaptions={autoCaptionsEnabled}
    >
      <div className="video-canvas w-full">
        <div className="aspect-video w-full overflow-hidden relative rounded-lg bg-black">
          <DirectVideoPlayerWithActions
            src={currentVideoSrc}
            currentTime={currentTime}
            projectDuration={projectDuration}
            videoWidth={videoWidth}
            videoHeight={videoHeight}
            currentFilter={currentFilter}
            aspectRatio={aspectRatio}
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleVideoError}
            onPlayStateChange={handlePlayStateChange}
            onFileUpload={handleFileUpload}
          />
        </div>
      </div>
    </VideoSettingsProvider>
  );
};

// Separate component that combines DirectVideoPlayer with toolbar actions
interface DirectVideoPlayerWithActionsProps {
  src: File | string | null;
  currentTime: number;
  projectDuration: number;
  videoWidth: number;
  videoHeight: number;
  currentFilter?: string;
  aspectRatio?: string;
  onLoadedMetadata?: (duration: number) => void;
  onError?: (error: any) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onFileUpload?: (file: File) => void;
}

const DirectVideoPlayerWithActions: React.FC<DirectVideoPlayerWithActionsProps> = ({
  src,
  currentTime,
  projectDuration,
  videoWidth,
  videoHeight,
  currentFilter,
  aspectRatio,
  onLoadedMetadata,
  onError,
  onPlayStateChange,
  onFileUpload
}) => {
  const { trimSettings, cropSettings, greenScreenEnabled, autoCaptionsEnabled } = useVideoSettings();
  
  // Get toolbar action handlers
  const toolbarActions = VideoToolbarActions({
    currentTime,
    projectDuration,
    videoWidth,
    videoHeight
  });

  return (
    <DirectVideoPlayer
      src={src}
      autoPlay={false}
      muted={false}
      onLoadedMetadata={onLoadedMetadata}
      onError={onError}
      onPlayStateChange={onPlayStateChange}
      onFileUpload={onFileUpload}
      greenScreenEnabled={greenScreenEnabled}
      autoCaptionsEnabled={autoCaptionsEnabled}
      currentFilter={currentFilter}
      aspectRatio={aspectRatio}
      trimSettings={trimSettings}
      cropSettings={cropSettings}
      onTrim={toolbarActions.handleTrim}
      onCrop={toolbarActions.handleCrop}
      onGreenScreen={toolbarActions.handleGreenScreen}
      onMagicResize={toolbarActions.handleMagicResize}
      onAutoCaptions={toolbarActions.handleAutoCaptions}
      onAIEnhance={toolbarActions.handleAIEnhance}
    />
  );
};

export default VideoCanvasMain;
