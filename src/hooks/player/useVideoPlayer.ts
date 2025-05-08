
import { useRef } from 'react';
import { useVideoEvents } from './useVideoEvents';
import { useVideoSource } from './useVideoSource';
import { useVideoControlsWithError } from './useVideoControls';

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
  
  // Use smaller, focused hooks for specific functionality
  const { hasError, errorDetails } = useVideoSource({
    videoRef,
    src,
    onError
  });
  
  const { isLoaded, isPlaying, currentTime, duration, setIsPlaying } = useVideoEvents({
    videoRef,
    src,
    autoPlay,
    onLoadedMetadata,
    onPlayStateChange,
    onError
  });
  
  const { handleTogglePlay, handlePlay, handleRetry } = useVideoControlsWithError({
    videoRef,
    isLoaded,
    isPlaying,
    setIsPlaying,
    onError
  });

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
