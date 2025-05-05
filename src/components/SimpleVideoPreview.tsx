
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { toast } from 'sonner';

interface SimpleVideoPreviewProps {
  file?: File | null;
  src?: string | null;
  onLoad?: (duration: number) => void;
  onError?: () => void;
}

const SimpleVideoPreview: React.FC<SimpleVideoPreviewProps> = ({
  file,
  src,
  onLoad,
  onError
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  
  // Choose source based on props
  const videoSrc = file ? URL.createObjectURL(file) : src;

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (file && videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [file, videoSrc]);

  // Set up video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const handleLoadedData = () => {
      console.log("Video loaded successfully:", videoSrc);
      setIsLoaded(true);
      if (onLoad && video.duration) {
        onLoad(video.duration);
      }
    };

    const handleError = () => {
      console.error("Video error:", video.error);
      setIsPlaying(false);
      setIsLoaded(false);
      setErrorCount(prev => prev + 1);
      
      if (errorCount >= 2) {
        toast.error("Failed to load video after multiple attempts");
        if (onError) onError();
      } else {
        toast.error("Error loading video, trying again...");
        // Try to load again
        setTimeout(() => {
          video.load();
        }, 1000);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoSrc, onLoad, onError, errorCount]);

  // Handle play/pause
  const togglePlay = async () => {
    if (!videoRef.current || !isLoaded) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling play state:", error);
      toast.error("Couldn't play video");
    }
  };

  // Reset video to beginning
  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="video-preview relative bg-gray-100 rounded-lg overflow-hidden">
      {/* Video container */}
      <div className="aspect-video bg-black relative">
        <video
          ref={videoRef}
          src={videoSrc || undefined}
          className="w-full h-full object-contain"
          playsInline
        />

        {/* Loading overlay */}
        {videoSrc && !isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-12 h-12 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {/* Empty state */}
        {!videoSrc && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">No video selected</p>
          </div>
        )}
        
        {/* Play button overlay */}
        {isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className="bg-black bg-opacity-30 border-none text-white hover:bg-black hover:bg-opacity-50 w-14 h-14 rounded-full"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      {isLoaded && (
        <div className="p-2 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600"
            onClick={resetVideo}
          >
            <RotateCcw className="h-4 w-4 mr-1" /> Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default SimpleVideoPreview;
