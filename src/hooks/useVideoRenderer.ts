
import { useRef, useState, useEffect } from 'react';
import { VideoClip, TextOverlay } from '@/lib/video/types';
import { aspectRatioMap } from '@/lib/video/constants';
import useVideoLoading from './useVideoLoading';
import useVideoPlayback from './useVideoPlayback';
import useVideoEffects from './useVideoEffects';

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
    videoLoaded
  };
};

export default useVideoRenderer;
