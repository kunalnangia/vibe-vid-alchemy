
import React, { useEffect } from 'react';
import { VideoClip, TextOverlay } from '@/lib/video/types';
import { useVideoRenderer } from '@/hooks/useVideoRenderer';
import VideoEmptyState from './VideoEmptyState';
import VideoLoadingIndicator from './VideoLoadingIndicator';
import VideoStatusIndicators from './VideoStatusIndicators';
import VideoPlayPauseOverlay from './VideoPlayPauseOverlay';

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

const VideoCanvas: React.FC<VideoCanvasProps> = ({
  clips,
  textOverlays,
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  projectDuration,
  currentFilter,
  aspectRatio,
  greenScreenEnabled = false,
  autoCaptionsEnabled = false,
  onError
}) => {
  const { videoRef, canvasRef, ratioConfig, videoLoaded } = useVideoRenderer({
    clips,
    textOverlays,
    currentTime,
    isPlaying,
    setCurrentTime,
    setIsPlaying,
    projectDuration,
    currentFilter,
    aspectRatio,
    greenScreenEnabled
  });

  // Apply filter styling
  const getFilterStyle = () => {
    switch(currentFilter) {
      case 'grayscale':
        return 'grayscale(100%)';
      case 'sepia':
        return 'sepia(70%)';
      case 'vintage':
        return 'sepia(50%) hue-rotate(-30deg) saturate(140%)';
      case 'warm':
        return 'sepia(30%) brightness(105%) saturate(110%)';
      case 'cool':
        return 'hue-rotate(30deg) brightness(95%) saturate(90%)';
      case 'dramatic':
        return 'contrast(120%) brightness(90%) saturate(130%)';
      default:
        return 'none';
    }
  };

  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Log clip status for debugging
  useEffect(() => {
    if (clips.length > 0) {
      console.log('Clip loaded in VideoCanvas:', clips[0].name || 'Unnamed clip');
    }
  }, [clips]);
  
  // Handle video errors
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;
    
    const handleError = () => {
      console.error('Video error occurred:', video.error);
      if (onError) onError();
    };
    
    video.addEventListener('error', handleError);
    
    return () => {
      video.removeEventListener('error', handleError);
    };
  }, [videoRef, onError]);

  return (
    <div className="video-canvas-container relative rounded-md overflow-hidden shadow-lg mb-6">
      {/* Hidden video element for loading video data */}
      <video 
        ref={videoRef} 
        className="hidden" 
        playsInline 
        muted
      />
      
      {/* Canvas for rendering video frames and effects */}
      <canvas 
        ref={canvasRef}
        className="mx-auto"
        style={{ 
          filter: getFilterStyle(),
          width: ratioConfig.width,
          height: ratioConfig.height,
          maxWidth: '100%',
          aspectRatio: `${ratioConfig.width}/${ratioConfig.height}`,
          backgroundColor: '#000'
        }}
        onClick={togglePlay}
      />
      
      {/* Video play/pause overlay */}
      {clips.length > 0 && videoLoaded && (
        <VideoPlayPauseOverlay
          isPlaying={isPlaying}
          currentTime={currentTime}
          projectDuration={projectDuration}
          togglePlay={togglePlay}
        />
      )}
      
      {/* Empty state when no video is loaded */}
      {clips.length === 0 && <VideoEmptyState />}
      
      {/* Loading indicator */}
      {clips.length > 0 && !videoLoaded && <VideoLoadingIndicator />}
      
      {/* Status indicators (format, green screen) */}
      <VideoStatusIndicators 
        aspectRatio={aspectRatio}
        greenScreenEnabled={greenScreenEnabled}
        autoCaptionsEnabled={autoCaptionsEnabled}
        isLoading={clips.length > 0 && !videoLoaded}
      />
    </div>
  );
};

export default VideoCanvas;
