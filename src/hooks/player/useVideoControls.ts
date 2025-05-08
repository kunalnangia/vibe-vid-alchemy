
import { useCallback } from 'react';
import { toast } from 'sonner';

interface UseVideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isLoaded: boolean;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const useVideoControls = ({
  videoRef,
  isLoaded,
  isPlaying,
  setIsPlaying
}: UseVideoControlsProps) => {
  // Handle toggle play/pause
  const handleTogglePlay = useCallback(() => {
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
  }, [videoRef, isLoaded, isPlaying]);
  
  // Handle direct play command
  const handlePlay = useCallback(() => {
    if (!videoRef.current || !isLoaded) return;
    
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Error playing video:', error);
        setIsPlaying(false);
      });
    }
  }, [videoRef, isLoaded, setIsPlaying]);
  
  // Handle retry after error
  const handleRetry = useCallback(() => {
    if (!videoRef.current) return;
    
    try {
      // Reload video
      videoRef.current.load();
      toast.info('Retrying video playback...');
    } catch (err) {
      console.error('Error retrying video playback:', err);
      if (videoRef.current.error && onError) {
        onError(videoRef.current.error);
      }
    }
  }, [videoRef]);

  return {
    handleTogglePlay,
    handlePlay,
    handleRetry
  };
};

// Missing parameter in the interface
interface UseVideoControlsPropsWithError extends UseVideoControlsProps {
  onError?: (error: any) => void;
}

// Updated function definition
export const useVideoControlsWithError = ({
  videoRef,
  isLoaded,
  isPlaying,
  setIsPlaying,
  onError
}: UseVideoControlsPropsWithError) => {
  // Handle retry after error
  const handleRetry = useCallback(() => {
    if (!videoRef.current) return;
    
    try {
      // Reload video
      videoRef.current.load();
      toast.info('Retrying video playback...');
    } catch (err) {
      console.error('Error retrying video playback:', err);
      if (onError) onError(err);
    }
  }, [videoRef, onError]);

  // Reuse other controls
  const { handleTogglePlay, handlePlay } = useVideoControls({
    videoRef,
    isLoaded,
    isPlaying,
    setIsPlaying
  });

  return {
    handleTogglePlay,
    handlePlay,
    handleRetry
  };
};

export default useVideoControlsWithError;
