
import { useState, useEffect } from 'react';
import { VideoClip } from '@/lib/video/types';
import { toast } from 'sonner';

interface UseVideoLoadingProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  clips: VideoClip[];
  currentTime: number;
}

export const useVideoLoading = ({
  videoRef,
  clips,
  currentTime
}: UseVideoLoadingProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  
  // Load video when clips change
  useEffect(() => {
    if (videoRef.current && clips.length > 0) {
      // Reset video loaded state when clips change
      setVideoLoaded(false);
      
      const loadVideo = () => {
        const video = videoRef.current;
        if (!video) return;
        
        // For security and reliability, let's always create a fresh object URL
        // even if one is provided in the clip
        if (clips[0].file) {
          // If we have a file object, create a new object URL
          const objectUrl = URL.createObjectURL(clips[0].file);
          video.src = objectUrl;
          console.log("Loading video from file:", clips[0].name);
        } else if (clips[0].src) {
          // Fall back to src if available
          video.src = clips[0].src;
          console.log("Loading video from src:", clips[0].src);
        } else {
          console.error("No valid source for video clip");
          toast.error("No valid source for video clip");
          return;
        }
        
        // Add preload attribute to ensure content is loaded
        video.preload = "auto";
        // Force video to load
        video.load();
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
          if (video.src.startsWith('blob:')) {
            URL.revokeObjectURL(video.src);
          }
        }
        
        // Reset attempts counter
        setLoadAttempts(0);
      };
    } else {
      setVideoLoaded(false);
    }
  }, [clips, loadAttempts, currentTime]);
  
  return { videoLoaded };
};

export default useVideoLoading;
