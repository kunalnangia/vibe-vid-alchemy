
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface UseVideoPlayerProps {
  src: string | File | null;
  autoPlay?: boolean;
  muted?: boolean;
  onLoadedMetadata?: (duration: number) => void;
  onError?: (error: any) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const useVideoPlayer = ({
  src,
  autoPlay = false,
  muted = false,
  onLoadedMetadata,
  onError,
  onPlayStateChange
}: UseVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load video when source changes
  useEffect(() => {
    if (!src) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    // Reset state
    setIsLoaded(false);
    setHasError(false);
    setErrorDetails(null);
    setCurrentTime(0);
    
    // Load from File or URL
    if (src instanceof File) {
      console.log("Creating object URL for file:", src.name, src.type);
      const objectURL = URL.createObjectURL(src);
      video.src = objectURL;
      
      // Clean up object URL when component unmounts or src changes
      return () => {
        console.log("Cleaning up object URL");
        URL.revokeObjectURL(objectURL);
      };
    } else if (typeof src === 'string') {
      console.log("Loading video from string URL:", src);
      video.src = src;
    }
    
    // Attempt to load the video
    video.load();
    console.log("Video element created with src:", video.src);
    
  }, [src]);

  // Set up event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded, duration:", video.duration);
      setIsLoaded(true);
      setDuration(video.duration);
      if (onLoadedMetadata) {
        onLoadedMetadata(video.duration);
      }
      
      // Auto play if requested
      if (autoPlay) {
        handlePlay();
      }
    };
    
    const handleLoadedData = () => {
      console.log("Video data loaded and can be played");
      setIsLoaded(true);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
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
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
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
        console.log("Attempting to play video");
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
      console.log("Attempting autoplay");
      await videoRef.current.play();
      setIsPlaying(true);
      if (onPlayStateChange) onPlayStateChange(true);
    } catch (error) {
      console.error("Error playing video:", error);
      toast.error("Couldn't autoplay video. Your browser may be blocking autoplay.");
    }
  };
  
  // Set current time manually
  const seekTo = (time: number) => {
    if (!videoRef.current || !isLoaded) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
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

  return {
    videoRef,
    isPlaying,
    isLoaded,
    hasError,
    errorDetails,
    currentTime,
    duration,
    handleTogglePlay,
    handlePlay,
    seekTo,
    handleRetry
  };
};

export default useVideoPlayer;
