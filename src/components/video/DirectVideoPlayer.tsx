import React, { useEffect, useState } from 'react';
import useVideoPlayer from '@/hooks/useVideoPlayer';
import VideoTroubleshooter from './VideoTroubleshooter';
import VideoLoadingOverlay from './VideoLoadingOverlay';
import VideoPlayOverlay from './VideoPlayOverlay';
import NoVideoState from './NoVideoState';
import AutoCaptionsHandler from './AutoCaptionsHandler';
import { Captions, Crop, Scissors, Video, Filter, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const DirectVideoPlayer: React.FC<DirectVideoPlayerProps> = ({
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
  
  const [canvasRef] = useState<React.RefObject<HTMLCanvasElement>>(React.createRef());
  const [showControls, setShowControls] = useState(true);
  
  // Apply video effects using canvas
  useEffect(() => {
    if (!isLoaded || !videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Apply crop if specified
    const drawVideo = () => {
      if (!ctx || !video) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply green screen effect if enabled
      if (greenScreenEnabled) {
        // Draw video to temp canvas for pixel manipulation
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = video.videoWidth;
        tempCanvas.height = video.videoHeight;
        const tempCtx = tempCanvas.getContext('2d');
        
        if (tempCtx) {
          tempCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
          const data = imageData.data;
          
          // Simple green screen removal
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // If pixel is green-ish, make transparent
            if (g > 100 && g > r * 1.2 && g > b * 1.2) {
              data[i + 3] = 0; // Set alpha to transparent
            }
          }
          
          tempCtx.putImageData(imageData, 0, 0);
          ctx.drawImage(tempCanvas, 0, 0);
        }
      } else {
        // Regular drawing (with crop if specified)
        if (cropSettings) {
          ctx.drawImage(
            video,
            cropSettings.x, cropSettings.y, cropSettings.width, cropSettings.height,
            0, 0, canvas.width, canvas.height
          );
        } else {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      }
      
      // Apply filters
      if (currentFilter !== 'normal') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Apply different filters based on filter name
        if (currentFilter === 'grayscale') {
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;     // R
            data[i + 1] = avg; // G
            data[i + 2] = avg; // B
          }
        } else if (currentFilter === 'sepia') {
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
            data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
            data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
      }
      
      requestAnimationFrame(drawVideo);
    };
    
    const animationId = requestAnimationFrame(drawVideo);
    
    return () => cancelAnimationFrame(animationId);
  }, [isLoaded, videoRef, canvasRef, greenScreenEnabled, cropSettings, currentFilter]);
  
  // Apply trim settings
  useEffect(() => {
    if (!isLoaded || !videoRef.current || !trimSettings) return;
    
    const video = videoRef.current;
    
    // Set current time to start if we're outside the trim range
    if (video.currentTime < trimSettings.start || video.currentTime > trimSettings.end) {
      video.currentTime = trimSettings.start;
    }
    
    // Add listener to reset to start time when reaching end time
    const handleTimeUpdate = () => {
      if (video.currentTime >= trimSettings.end) {
        video.pause();
        if (onPlayStateChange) onPlayStateChange(false);
      }
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isLoaded, videoRef, trimSettings, onPlayStateChange]);

  return (
    <div className="direct-video-player relative w-full">
      {/* Main video element (hidden when using canvas) */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
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
        
        {/* Loading overlay */}
        {src && !isLoaded && !hasError && <VideoLoadingOverlay />}
        
        {/* No video state with upload capability */}
        {!src && <NoVideoState onUpload={onFileUpload} />}
        
        {/* Play/Pause button overlay (only show when video is paused) */}
        {isLoaded && !hasError && !isPlaying && (
          <VideoPlayOverlay onClick={handleTogglePlay} />
        )}
        
        {/* Quick editing toolbar */}
        {isLoaded && !hasError && showControls && (
          <div className="absolute top-2 right-2 bg-black/60 p-1 rounded-md flex space-x-1">
            {onTrim && (
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={onTrim}>
                <Scissors className="h-4 w-4" />
              </Button>
            )}
            
            {onCrop && (
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={onCrop}>
                <Crop className="h-4 w-4" />
              </Button>
            )}
            
            {onGreenScreen && (
              <Button 
                size="icon" 
                variant={greenScreenEnabled ? "default" : "ghost"} 
                className={`h-8 w-8 ${greenScreenEnabled ? "bg-green-500 text-white" : "text-white"}`}
                onClick={onGreenScreen}
              >
                <Video className="h-4 w-4" />
              </Button>
            )}
            
            {onMagicResize && (
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={onMagicResize}>
                <Filter className="h-4 w-4" />
              </Button>
            )}
            
            {onAutoCaptions && (
              <Button 
                size="icon" 
                variant={autoCaptionsEnabled ? "default" : "ghost"} 
                className={`h-8 w-8 ${autoCaptionsEnabled ? "bg-blue-500 text-white" : "text-white"}`}
                onClick={onAutoCaptions}
              >
                <Captions className="h-4 w-4" />
              </Button>
            )}
            
            {onAIEnhance && (
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={onAIEnhance}>
                <Wand2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
      
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

export default DirectVideoPlayer;
