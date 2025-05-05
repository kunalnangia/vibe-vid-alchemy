
import React, { useState, useEffect } from 'react';
import { VideoClip, TextOverlay } from '@/lib/video/types';
import useVideoRendering from '@/hooks/useVideoRendering';
import VideoEmptyState from './VideoEmptyState';
import VideoLoadingIndicator from './VideoLoadingIndicator';
import VideoStatusIndicators from './VideoStatusIndicators';
import VideoPlayPauseOverlay from './VideoPlayPauseOverlay';
import VideoTroubleshooter from './VideoTroubleshooter';
import VideoDebugButton from './VideoDebugButton';
import { toast } from 'sonner';

interface VideoCanvasMainProps {
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

const VideoCanvasMain: React.FC<VideoCanvasMainProps> = ({
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
  const { videoRef, canvasRef, ratioConfig, videoLoaded } = useVideoRendering({
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
  
  const [showTroubleshooter, setShowTroubleshooter] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [hasError, setHasError] = useState(false);

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
    if (videoLoaded) {
      setIsPlaying(!isPlaying);
    } else if (clips.length > 0) {
      // If we have clips but video isn't loaded, show troubleshooter
      setShowTroubleshooter(true);
    }
  };
  
  // Track loading time to show troubleshooter if it takes too long
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (clips.length > 0 && !videoLoaded) {
      // Start counting loading time
      const startTime = Date.now();
      
      timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setLoadingTime(elapsed);
        
        // If loading takes more than 10 seconds, show troubleshooter
        if (elapsed > 10 && !showTroubleshooter) {
          setShowTroubleshooter(true);
          toast.error("Video loading is taking longer than expected");
          clearInterval(timer);
        }
      }, 1000);
    } else {
      setLoadingTime(0);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [clips, videoLoaded, showTroubleshooter]);
  
  // Log clip status for debugging
  useEffect(() => {
    if (clips.length > 0) {
      console.log('Clip loaded in VideoCanvas:', clips[0].name || 'Unnamed clip');
      
      // If the video loaded successfully after troubleshooting was shown, hide it
      if (videoLoaded && showTroubleshooter) {
        setShowTroubleshooter(false);
      }
    }
  }, [clips, videoLoaded, showTroubleshooter]);
  
  // Handle video errors
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;
    
    const handleError = () => {
      console.error('Video error occurred:', video.error);
      setHasError(true);
      setShowTroubleshooter(true);
      if (onError) onError();
    };
    
    video.addEventListener('error', handleError);
    
    return () => {
      video.removeEventListener('error', handleError);
    };
  }, [videoRef, onError]);

  // Handle retry
  const handleRetry = () => {
    setHasError(false);
    setShowTroubleshooter(false);
    
    // Force video to reload
    if (videoRef.current && clips.length > 0) {
      const video = videoRef.current;
      
      // If we have a file, create a new object URL
      if (clips[0].file) {
        try {
          // Revoke any existing object URL
          if (video.src && video.src.startsWith('blob:')) {
            URL.revokeObjectURL(video.src);
          }
          
          // Create new object URL
          const objectUrl = URL.createObjectURL(clips[0].file);
          video.src = objectUrl;
          console.log("Retrying video load from file:", clips[0].name);
          
          // Force load
          video.load();
          toast.info("Retrying video playback...");
        } catch (e) {
          console.error("Error retrying video load:", e);
          toast.error("Could not reload video");
        }
      }
    }
  };

  return (
    <div className="video-canvas-container relative rounded-md overflow-hidden shadow-lg mb-6">
      {/* Hidden video element for loading video data */}
      <video 
        ref={videoRef} 
        className="hidden" 
        playsInline 
        muted
        crossOrigin="anonymous"
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
      {clips.length === 0 && <VideoEmptyState message="Upload a video to get started" />}
      
      {/* Loading indicator with timer */}
      {clips.length > 0 && !videoLoaded && !hasError && (
        <>
          <VideoLoadingIndicator />
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            Loading... {loadingTime}s
          </div>
        </>
      )}
      
      {/* Troubleshooter for playback issues */}
      {showTroubleshooter && clips.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <VideoTroubleshooter
            videoRef={videoRef}
            videoLoaded={videoLoaded}
            clips={clips}
            onRetry={handleRetry}
          />
        </div>
      )}
      
      {/* Status indicators (format, green screen) */}
      <VideoStatusIndicators 
        aspectRatio={aspectRatio}
        greenScreenEnabled={greenScreenEnabled}
        autoCaptionsEnabled={autoCaptionsEnabled}
        isLoading={clips.length > 0 && !videoLoaded}
      />
      
      {/* Debug button for users experiencing issues */}
      <VideoDebugButton 
        showTroubleshooter={showTroubleshooter}
        setShowTroubleshooter={setShowTroubleshooter}
      />
    </div>
  );
};

export default VideoCanvasMain;
