
import { useRef, useState, useEffect } from 'react';
import { VideoClip, TextOverlay } from '@/lib/video/types';
import { aspectRatioMap } from '@/lib/video/constants';
import useVideoLoading from './useVideoLoading';
import useVideoPlayback from './useVideoPlayback';
import useVideoEffects from './useVideoEffects';
import { toast } from 'sonner';

interface UseVideoRendererProps {
  clips: VideoClip[];
  textOverlays: TextOverlay[];
  currentTime: number;
  isPlaying: boolean;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  projectDuration: number;
  currentFilter: string;
  aspectRatio: string;
  greenScreenEnabled?: boolean;
}

export const useVideoRenderer = ({
  clips,
  textOverlays,
  currentTime,
  isPlaying,
  setCurrentTime,
  setIsPlaying,
  projectDuration,
  aspectRatio,
  greenScreenEnabled = false
}: UseVideoRendererProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Track rendering performance 
  const [lastRenderTime, setLastRenderTime] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [performanceWarning, setPerformanceWarning] = useState(false);
  
  // Get aspect ratio configuration
  const ratioConfig = aspectRatioMap[aspectRatio] || aspectRatioMap.landscape;
  
  // Use modular hooks for specific functionality
  const { videoLoaded } = useVideoLoading({
    videoRef,
    clips,
    currentTime
  });
  
  useVideoPlayback({
    videoRef,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    videoLoaded,
    projectDuration
  });
  
  useVideoEffects({
    canvasRef,
    videoRef,
    currentTime,
    textOverlays,
    ratioConfig,
    videoLoaded,
    greenScreenEnabled
  });

  // Monitor rendering performance
  useEffect(() => {
    if (videoLoaded && renderCount > 0) {
      const now = performance.now();
      const timeSinceLastRender = now - lastRenderTime;
      
      if (timeSinceLastRender < 16 && renderCount % 30 === 0) {  // 16ms = ~60fps
        setPerformanceWarning(true);
        // Only show warning every 30 renders to avoid spamming
        if (renderCount % 90 === 0) {
          toast.warning('Performance issue detected', { 
            description: 'Video rendering is causing high CPU usage',
            duration: 3000
          });
        }
      } else {
        setPerformanceWarning(false);
      }
      
      setLastRenderTime(now);
      setRenderCount(prev => prev + 1);
    }
  }, [currentTime, videoLoaded, lastRenderTime, renderCount]);

  // Debug logs for video loading issues
  useEffect(() => {
    if (clips.length > 0) {
      console.log("Current clips:", clips);
      console.log("Video loaded status:", videoLoaded);
      
      if (!videoLoaded && videoRef.current) {
        console.log("Video element readyState:", videoRef.current.readyState);
        console.log("Video element error:", videoRef.current.error);
      }
    }
  }, [clips, videoLoaded]);

  return {
    videoRef,
    canvasRef,
    ratioConfig,
    videoLoaded,
    performanceWarning
  };
};

export default useVideoRenderer;
