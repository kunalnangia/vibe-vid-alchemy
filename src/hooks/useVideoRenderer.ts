
import { useRef, useEffect, useState } from 'react';
import { VideoClip, TextOverlay } from '@/lib/video/types';
import { aspectRatioMap } from '@/lib/video/constants';

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
}

export const useVideoRenderer = ({
  clips,
  textOverlays,
  currentTime,
  isPlaying,
  setCurrentTime,
  setIsPlaying,
  projectDuration,
  currentFilter,
  aspectRatio
}: UseVideoRendererProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Get aspect ratio configuration
  const ratioConfig = aspectRatioMap[aspectRatio] || aspectRatioMap.landscape;
  
  // Load video when clips change
  useEffect(() => {
    if (videoRef.current && clips.length > 0 && clips[0].src) {
      videoRef.current.src = clips[0].src;
      
      const handleLoaded = () => {
        setVideoLoaded(true);
        console.log("Video loaded successfully");
      };
      
      const handleError = (err: any) => {
        console.error("Error loading video:", err);
        setVideoLoaded(false);
      };
      
      videoRef.current.addEventListener('loadeddata', handleLoaded);
      videoRef.current.addEventListener('error', handleError);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', handleLoaded);
          videoRef.current.removeEventListener('error', handleError);
        }
      };
    } else {
      setVideoLoaded(false);
    }
  }, [clips]);
  
  // Animate playback for preview and canvas
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }
    
    const animate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        
        if (videoRef.current.currentTime >= projectDuration) {
          setIsPlaying(false);
          setCurrentTime(0);
          videoRef.current.currentTime = 0;
        }
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    if (videoRef.current && clips.length > 0) {
      videoRef.current.play().catch(err => {
        console.log("Video play error (likely user hasn't interacted yet):", err);
      });
    }
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, projectDuration, setCurrentTime, setIsPlaying, clips]);

  // Draw current frame on canvas + overlays
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const video = videoRef.current;
    
    if (!canvas || !ctx || !video) return;
    
    // Apply current dimensions from aspect ratio
    canvas.width = ratioConfig.width;
    canvas.height = ratioConfig.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw video frame if video is loaded and has a valid src
    if (videoLoaded && video.src) {
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } catch (err) {
        console.error("Canvas drawing error:", err);
      }
    }
    
    // Draw text overlays
    textOverlays.forEach(overlay => {
      if (currentTime >= overlay.startTime && currentTime <= overlay.endTime) {
        ctx.fillStyle = overlay.style.color;
        ctx.font = `${overlay.style.fontSize} ${overlay.style.fontFamily}`;
        ctx.fillText(overlay.text, overlay.position.x, overlay.position.y);
      }
    });
  }, [currentTime, textOverlays, clips, aspectRatio, ratioConfig.width, ratioConfig.height, videoLoaded]);

  // Update video current time when time is changed externally
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  return {
    videoRef,
    canvasRef,
    ratioConfig,
    videoLoaded
  };
};
