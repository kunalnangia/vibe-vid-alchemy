import React, { useRef, useState, useEffect } from 'react';
import VideoTroubleshooter from './VideoTroubleshooter';
import VideoLoadingOverlay from './VideoLoadingOverlay';
import VideoPlayOverlay from './VideoPlayOverlay';
import NoVideoState from './NoVideoState';
import AutoCaptionsHandler from './AutoCaptionsHandler';
import useVideoPlayer from '@/hooks/useVideoPlayer';
import VideoControlsToolbar from './VideoControlsToolbar';
import VideoEffects from './VideoEffects';
import VideoTrimHandler from './VideoTrimHandler';

interface VideoPlayerContentProps {
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

const VideoPlayerContent: React.FC<VideoPlayerContentProps> = ({
  src,
  autoPlay = false,
  muted = false,
  onLoadedMetadata,
  onError,
  onPlayStateChange,
  onFileUpload,
  greenScreenEnabled = false,
  autoCaptionsEnabled = false,
  currentFilter = 'normal',
  aspectRatio = '16:9',
  trimSettings,
  cropSettings,
  onTrim,
  onCrop,
  onGreenScreen,
  onMagicResize,
  onAutoCaptions,
  onAIEnhance
}) => {
  const {
    videoRef,
    isPlaying,
    isLoaded,
    hasError,
    errorDetails,
    currentTime,
    handleTogglePlay,
    handlePlay,
    handleRetry
  } = useVideoPlayer({
    src,
    autoPlay,
    muted,
    onLoadedMetadata,
    onError,
    onPlayStateChange
  });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showControls, setShowControls] = useState(true);
  
  // Auto-play when source is loaded
  useEffect(() => {
    if (isLoaded && videoRef.current && !isPlaying) {
      console.log('Video loaded, attempting to play automatically');
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Auto-play prevented:', error);
          // We'll keep the video paused in this case
        });
      }
    }
  }, [isLoaded, videoRef, isPlaying]);

  // Render the appropriate video content based on state
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {/* Main video element (hidden when using canvas) */}
      <video
        ref={videoRef}
        className={`w-full h-full object-contain ${(greenScreenEnabled || cropSettings || currentFilter !== 'normal') ? 'hidden' : ''}`}
        playsInline
        muted={muted}
        onClick={handleTogglePlay}
        controls={isLoaded && !hasError && !greenScreenEnabled && !cropSettings && currentFilter === 'normal'}
      />
      
      {/* Canvas for effects rendering */}
      {(greenScreenEnabled || cropSettings || currentFilter !== 'normal') && isLoaded && (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
          onClick={handleTogglePlay}
        />
      )}
      
      {/* Apply video effects */}
      <VideoEffects
        videoRef={videoRef}
        canvasRef={canvasRef}
        isLoaded={isLoaded}
        greenScreenEnabled={greenScreenEnabled}
        cropSettings={cropSettings}
        currentFilter={currentFilter}
      />
      
      {/* Handle trim settings */}
      <VideoTrimHandler
        videoRef={videoRef}
        isLoaded={isLoaded}
        trimSettings={trimSettings}
        onPlayStateChange={onPlayStateChange}
      />
      
      {/* Loading overlay */}
      {src && !isLoaded && !hasError && <VideoLoadingOverlay />}
      
      {/* No video state with upload capability */}
      {!src && <NoVideoState onUpload={onFileUpload} />}
      
      {/* Play/Pause button overlay (only show when video is paused) */}
      {isLoaded && !hasError && !isPlaying && (
        <VideoPlayOverlay onClick={handleTogglePlay} />
      )}
      
      {/* Quick editing toolbar */}
      <VideoControlsToolbar
        showControls={isLoaded && !hasError && showControls}
        greenScreenEnabled={greenScreenEnabled}
        autoCaptionsEnabled={autoCaptionsEnabled}
        onTrim={onTrim}
        onCrop={onCrop}
        onGreenScreen={onGreenScreen}
        onMagicResize={onMagicResize}
        onAutoCaptions={onAutoCaptions}
        onAIEnhance={onAIEnhance}
      />
      
      {/* Auto-captions handler */}
      {autoCaptionsEnabled && (
        <AutoCaptionsHandler
          videoRef={videoRef}
          enabled={autoCaptionsEnabled}
          onToggle={onAutoCaptions || (() => {})}
          currentTime={currentTime}
        />
      )}
      
      {/* Error state and troubleshooter */}
      {hasError && (
        <div className="mt-4">
          <VideoTroubleshooter 
            videoRef={videoRef}
            videoLoaded={isLoaded}
            clips={[{ 
              name: src instanceof File ? src.name : "Video", 
              type: src instanceof File ? src.type : typeof src === 'string' ? src : "",
              duration: videoRef.current?.duration || 0 
            }]}
            onRetry={handleRetry}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayerContent;
