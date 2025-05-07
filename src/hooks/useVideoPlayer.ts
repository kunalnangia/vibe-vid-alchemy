
import { useEffect, useRef, useState } from 'react';
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const objectUrlRef = useRef<string | null>(null);

  // Clean up object URL on component unmount or when src changes
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [src]);

  // Set up video source when it changes
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    setIsLoaded(false);
    setHasError(false);
    setErrorDetails(null);
    
    // Clean up previous object URL if any
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    
    if (!src) {
      video.removeAttribute('src');
      video.load();
      return;
    }
    
    // Set video source based on type
    try {
      if (src instanceof File) {
        console.log('Loading video from File object:', src.name);
        const objectUrl = URL.createObjectURL(src);
        objectUrlRef.current = objectUrl;
        video.src = objectUrl;
      } else if (typeof src === 'string') {
        console.log('Loading video from URL:', src);
        video.src = src;
      }
      
      // Force video to load
      video.load();
      
    } catch (err) {
      console.error('Error setting video source:', err);
      setHasError(true);
      setErrorDetails(err);
      if (onError) onError(err);
    }
  }, [src, onError]);
  
  // Set up video event listeners
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    
    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded, duration:', video.duration);
      setIsLoaded(true);
      setDuration(video.duration);
      if (onLoadedMetadata) {
        onLoadedMetadata(video.duration);
      }
      
      // Auto play if enabled
      if (autoPlay && video.paused) {
        console.log('Auto-playing video');
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('Auto-play prevented:', error);
            setIsPlaying(false);
            if (onPlayStateChange) onPlayStateChange(false);
          });
        }
      }
    };
    
    const handlePlay = () => {
      console.log('Video playback started');
      setIsPlaying(true);
      if (onPlayStateChange) onPlayStateChange(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    
    const handleError = (e: Event) => {
      console.error('Video error:', video.error);
      setHasError(true);
      setErrorDetails(video.error);
      setIsLoaded(false);
      
      if (onError) onError(video.error);
      
      toast.error(`Error playing video: ${video.error?.message || 'Unknown error'}`);
    };
    
    const handleCanPlay = () => {
      setIsLoaded(true);
      console.log('Video can play now');
      
      // Auto play if enabled
      if (autoPlay && video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('Auto-play prevented on canplay:', error);
          });
        }
      }
    };
    
    // Add event listeners
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);
    
    return () => {
      // Remove event listeners
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoRef, autoPlay, onLoadedMetadata, onPlayStateChange, onError]);
  
  // Handle toggle play/pause
  const handleTogglePlay = () => {
    if (!videoRef.current || !isLoaded) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing video:', error);
          toast.error('Playback was prevented by your browser. Try clicking play again.');
        });
      }
    }
  };
  
  // Handle direct play command
  const handlePlay = () => {
    if (!videoRef.current || !isLoaded) return;
    
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Error playing video:', error);
        setIsPlaying(false);
        if (onPlayStateChange) onPlayStateChange(false);
      });
    }
  };
  
  // Handle retry after error
  const handleRetry = () => {
    if (!videoRef.current || !src) return;
    
    setHasError(false);
    setErrorDetails(null);
    
    try {
      // Reload video
      videoRef.current.load();
      toast.info('Retrying video playback...');
    } catch (err) {
      console.error('Error retrying video playback:', err);
      setHasError(true);
      setErrorDetails(err);
      if (onError) onError(err);
    }
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
    handleRetry
  };
};

export default useVideoPlayer;
