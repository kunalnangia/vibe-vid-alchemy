
import { useRef, useEffect, useState } from 'react';
import { VideoClip, TextOverlay } from '@/lib/video/types';
import { aspectRatioMap } from '@/lib/video/constants';
import useVideoEffects from './useVideoEffects';

interface UseVideoRenderingProps {
  clips: VideoClip[];
  textOverlays: TextOverlay[];
  currentTime: number;
  isPlaying: boolean;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  projectDuration: number;
  currentFilter: string;
  aspectRatio: string;
  greenScreenEnabled?: boolean;
}

export const useVideoRendering = ({
  clips,
  textOverlays,
  currentTime,
  isPlaying,
  setCurrentTime,
  setIsPlaying,
  projectDuration,
  currentFilter,
  aspectRatio,
  greenScreenEnabled = false
}: UseVideoRenderingProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Get aspect ratio configuration
  const ratioConfig = aspectRatioMap[aspectRatio] || aspectRatioMap.landscape;
  
  // Use the video effects hook for rendering with effects
  useVideoEffects({
    canvasRef,
    videoRef,
    currentTime,
    textOverlays,
    ratioConfig,
    videoLoaded,
    greenScreenEnabled
  });
  
  // Load video clips and handle playback
  useEffect(() => {
    if (!videoRef.current || clips.length === 0) {
      setVideoLoaded(false);
      return;
    }
    
    const video = videoRef.current;
    const clip = clips[0]; // Currently handling just the first clip
    
    // Clean up any existing object URLs
    if (video.src && video.src.startsWith('blob:')) {
      URL.revokeObjectURL(video.src);
    }
    
    // Set video source from clip
    if (clip.file) {
      const objectURL = URL.createObjectURL(clip.file);
      video.src = objectURL;
      console.log("Created object URL for clip:", clip.name);
    } else if (clip.src) {
      video.src = clip.src;
      console.log("Using clip src:", clip.src);
    }
    
    video.crossOrigin = "anonymous";
    
    // Set up event listeners
    const handleVideoLoaded = () => {
      console.log("Video loaded, readyState:", video.readyState);
      if (video.readyState >= 2) {
        setVideoLoaded(true);
        video.currentTime = currentTime;
      }
    };
    
    const handleError = (e: Event) => {
      console.error("Video loading error:", e, video.error);
      setVideoLoaded(false);
    };
    
    video.addEventListener('loadeddata', handleVideoLoaded);
    video.addEventListener('canplay', handleVideoLoaded);
    video.addEventListener('error', handleError);
    
    // Load the video
    video.load();
    
    return () => {
      video.removeEventListener('loadeddata', handleVideoLoaded);
      video.removeEventListener('canplay', handleVideoLoaded);
      video.removeEventListener('error', handleError);
      
      if (video.src && video.src.startsWith('blob:')) {
        URL.revokeObjectURL(video.src);
      }
    };
  }, [clips, currentTime]);
  
  // Handle playback state changes
  useEffect(() => {
    if (!videoRef.current || !videoLoaded) return;
    
    const video = videoRef.current;
    
    if (isPlaying) {
      video.currentTime = currentTime;
      video.play().catch(err => {
        console.error("Error playing video:", err);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
    
    // Update currentTime during playback
    const handleTimeUpdate = () => {
      if (isPlaying) {
        setCurrentTime(video.currentTime);
        
        // Stop at the end of the project
        if (video.currentTime >= projectDuration) {
          video.pause();
          setIsPlaying(false);
          setCurrentTime(0);
          video.currentTime = 0;
        }
      }
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isPlaying, videoLoaded, currentTime, projectDuration, setCurrentTime, setIsPlaying]);
  
  return {
    videoRef,
    canvasRef,
    ratioConfig,
    videoLoaded
  };
};

export default useVideoRendering;
