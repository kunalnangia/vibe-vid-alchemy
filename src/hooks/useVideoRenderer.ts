
import { useRef, useEffect, useState } from 'react';
import { VideoClip, TextOverlay } from '@/lib/video/types';
import { aspectRatioMap } from '@/lib/video/constants';
import { toast } from "sonner";

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
  currentFilter,
  aspectRatio,
  greenScreenEnabled = false
}: UseVideoRendererProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  
  // Get aspect ratio configuration
  const ratioConfig = aspectRatioMap[aspectRatio] || aspectRatioMap.landscape;
  
  // Load video when clips change
  useEffect(() => {
    if (videoRef.current && clips.length > 0) {
      // Reset video loaded state when clips change
      setVideoLoaded(false);
      
      const loadVideo = () => {
        // Try to load from src or file
        if (clips[0].src) {
          videoRef.current.src = clips[0].src;
          console.log("Loading video from src:", clips[0].src);
        } else if (clips[0].file) {
          const objectUrl = URL.createObjectURL(clips[0].file);
          videoRef.current.src = objectUrl;
          console.log("Loading video from file:", clips[0].name);
        } else {
          console.error("No valid source for video clip");
          toast.error("No valid source for video clip");
          return;
        }
        
        // Add preload attribute to ensure content is loaded
        videoRef.current.preload = "auto";
        // Force video to load
        videoRef.current.load();
      };
      
      const handleLoaded = () => {
        setVideoLoaded(true);
        console.log("Video loaded successfully");
        toast.success("Video loaded successfully");
        
        // Set video currentTime to match app's currentTime
        if (videoRef.current) {
          videoRef.current.currentTime = currentTime;
        }
      };
      
      const handleError = (err: any) => {
        console.error("Error loading video:", err);
        
        // Retry loading if we haven't reached max attempts
        if (loadAttempts < 3) {
          setLoadAttempts(prev => prev + 1);
          setTimeout(loadVideo, 500); // Wait and retry
          toast.error(`Error loading video. Retrying... (${loadAttempts + 1}/3)`);
        } else {
          toast.error("Failed to load video after multiple attempts. Please try another file.");
          setVideoLoaded(false);
        }
      };
      
      // Use multiple events to ensure video is ready
      const video = videoRef.current;
      video.addEventListener('loadeddata', handleLoaded);
      video.addEventListener('canplaythrough', handleLoaded);
      video.addEventListener('error', handleError);
      
      // Load the video
      loadVideo();
      
      return () => {
        if (video) {
          video.removeEventListener('loadeddata', handleLoaded);
          video.removeEventListener('canplaythrough', handleLoaded);
          video.removeEventListener('error', handleError);
          
          // Clean up object URL if created from file
          if (clips[0].file && video.src.startsWith('blob:')) {
            URL.revokeObjectURL(video.src);
          }
        }
        
        // Reset attempts counter
        setLoadAttempts(0);
      };
    } else {
      setVideoLoaded(false);
    }
  }, [clips, loadAttempts]);
  
  // Update video playback state
  useEffect(() => {
    if (videoRef.current && videoLoaded) {
      if (isPlaying) {
        // Force seek to current time to synchronize playback
        videoRef.current.currentTime = currentTime;
        videoRef.current.play().catch(err => {
          console.log("Video play error:", err);
          toast.error("Click the play button to start video playback");
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, videoLoaded, setIsPlaying, currentTime]);
  
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
      if (videoRef.current && videoLoaded) {
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
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, projectDuration, setCurrentTime, setIsPlaying, videoLoaded]);

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
    if (videoLoaded && video.readyState >= 2) {
      try {
        // Basic video rendering
        if (!greenScreenEnabled) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        } 
        // Green screen processing
        else {
          // Get video frame data
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = video.videoWidth;
          tempCanvas.height = video.videoHeight;
          const tempCtx = tempCanvas.getContext('2d');
          
          if (tempCtx) {
            tempCtx.drawImage(video, 0, 0);
            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imageData.data;
            
            // Simple green screen removal (RGB values threshold)
            for (let i = 0; i < data.length; i += 4) {
              // If green component is dominant, make it transparent
              const r = data[i];
              const g = data[i+1];
              const b = data[i+2];
              
              // Adjust these values for different green screen sensitivity
              if (g > 100 && g > r * 1.5 && g > b * 1.5) {
                data[i+3] = 0; // Set alpha to transparent
              }
            }
            
            tempCtx.putImageData(imageData, 0, 0);
            ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
          }
        }
        
        // Draw text overlays
        textOverlays.forEach(overlay => {
          if (currentTime >= overlay.startTime && currentTime <= overlay.endTime) {
            ctx.fillStyle = overlay.style.color;
            ctx.font = `${overlay.style.fontSize}px ${overlay.style.fontFamily}`;
            ctx.fillText(overlay.text, overlay.position.x, overlay.position.y);
          }
        });
      } catch (err) {
        console.error("Canvas drawing error:", err);
      }
    }
  }, [currentTime, textOverlays, clips, aspectRatio, ratioConfig.width, ratioConfig.height, videoLoaded, greenScreenEnabled]);

  // Update video current time when time is changed externally
  useEffect(() => {
    if (videoRef.current && videoLoaded && Math.abs(videoRef.current.currentTime - currentTime) > 0.5) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime, videoLoaded]);

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
