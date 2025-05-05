
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { toast } from 'sonner';
import VideoTroubleshooter from './VideoTroubleshooter';

interface DirectVideoPlayerProps {
  src: string | File | null;
  autoPlay?: boolean;
  muted?: boolean;
  onLoadedMetadata?: (duration: number) => void;
  onError?: (error: any) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const DirectVideoPlayer: React.FC<DirectVideoPlayerProps> = ({
  src,
  autoPlay = false,
  muted = false,
  onLoadedMetadata,
  onError,
  onPlayStateChange
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  // Load video when source changes
  useEffect(() => {
    if (!src) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    // Reset state
    setIsLoaded(false);
    setHasError(false);
    setErrorDetails(null);
    
    // Load from File or URL
    if (src instanceof File) {
      const objectURL = URL.createObjectURL(src);
      video.src = objectURL;
      console.log("Loading video from File:", src.name);
      
      // Clean up object URL when component unmounts or src changes
      return () => {
        URL.revokeObjectURL(objectURL);
      };
    } else if (typeof src === 'string') {
      video.src = src;
      console.log("Loading video from URL:", src);
    }
    
    // Attempt to load the video
    video.load();
    
  }, [src]);

  // Set up event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded, duration:", video.duration);
      setIsLoaded(true);
      if (onLoadedMetadata) {
        onLoadedMetadata(video.duration);
      }
      
      // Auto play if requested
      if (autoPlay) {
        handlePlay();
      }
    };
    
    const handleError = () => {
      const errorMessage = video.error 
        ? `Error code: ${video.error.code}, message: ${video.error.message}` 
        : 'Unknown video error';
      
      console.error("Video error:", errorMessage);
      setHasError(true);
      setErrorDetails(errorMessage);
      setIsPlaying(false);
      
      if (onError) {
        onError(video.error);
      }
      
      toast.error("Error loading video");
    };
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
    };
  }, [autoPlay, onLoadedMetadata, onError]);

  // Handle play/pause
  const handleTogglePlay = async () => {
    if (!videoRef.current || !isLoaded) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        if (onPlayStateChange) onPlayStateChange(false);
      } else {
        await videoRef.current.play();
        setIsPlaying(true);
        if (onPlayStateChange) onPlayStateChange(true);
      }
    } catch (error) {
      console.error("Error toggling play state:", error);
      toast.error("Couldn't play video. Try again or check if the format is supported.");
    }
  };
  
  // Handle play directly
  const handlePlay = async () => {
    if (!videoRef.current || !isLoaded || isPlaying) return;
    
    try {
      await videoRef.current.play();
      setIsPlaying(true);
      if (onPlayStateChange) onPlayStateChange(true);
    } catch (error) {
      console.error("Error playing video:", error);
      toast.error("Couldn't play video. Your browser may be blocking autoplay.");
    }
  };
  
  // Handle retry for error cases
  const handleRetry = () => {
    if (!videoRef.current || !src) return;
    
    setHasError(false);
    setErrorDetails(null);
    
    if (src instanceof File) {
      const objectURL = URL.createObjectURL(src);
      videoRef.current.src = objectURL;
    } else if (typeof src === 'string') {
      videoRef.current.src = src;
    }
    
    videoRef.current.load();
    toast.info("Retrying video playback...");
  };

  return (
    <div className="direct-video-player relative w-full">
      {/* Main video element */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          playsInline
          muted={muted}
          onClick={handleTogglePlay}
        />
        
        {/* Loading overlay */}
        {src && !isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="text-white text-center">
              <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-3 mx-auto"></div>
              <p className="text-sm">Loading video...</p>
            </div>
          </div>
        )}
        
        {/* No video state */}
        {!src && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <p>No video selected</p>
            </div>
          </div>
        )}
        
        {/* Play/Pause button overlay */}
        {isLoaded && !hasError && (
          <div 
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            onClick={handleTogglePlay}
          >
            <div className="bg-black bg-opacity-50 rounded-full p-5">
              {isPlaying ? (
                <Pause className="h-8 w-8 text-white" />
              ) : (
                <Play className="h-8 w-8 text-white ml-1" />
              )}
            </div>
          </div>
        )}
      </div>
      
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
