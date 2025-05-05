
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from "lucide-react";
import { toast } from "sonner";
import VideoTroubleshooter from './video/VideoTroubleshooter';

interface VideoPlayerProps {
  videoSrc?: string | null;
  onTimeUpdate?: (time: number) => void;
  currentTime?: number;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  duration?: number;
}

const formatTime = (time: number): string => {
  if (isNaN(time) || time === 0) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  onTimeUpdate,
  currentTime = 0,
  isPlaying = false,
  onPlayPause,
  duration = 0
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [localTime, setLocalTime] = useState(currentTime);
  const [localDuration, setLocalDuration] = useState(duration);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Handle external props changes
  useEffect(() => {
    setLocalTime(currentTime);
  }, [currentTime]);

  // Handle video source changes
  useEffect(() => {
    if (videoRef.current && videoSrc) {
      setVideoLoaded(false);
      setHasError(false);
      
      console.log("Loading video from source:", videoSrc);
      videoRef.current.src = videoSrc;
      videoRef.current.load();
    }
  }, [videoSrc]);

  // Handle play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) return;
    
    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log("Video playback started"))
          .catch(err => {
            console.error("Error playing video:", err);
            if (onPlayPause) onPlayPause(); // Toggle back to paused state
            toast.error("Couldn't play video. Try clicking the play button again.");
          });
      }
    } else {
      video.pause();
    }
  }, [isPlaying, videoLoaded, onPlayPause]);
  
  // Handle seek directly on time change
  useEffect(() => {
    const video = videoRef.current;
    if (video && videoLoaded && Math.abs(video.currentTime - localTime) > 0.5) {
      video.currentTime = localTime;
    }
  }, [localTime, videoLoaded]);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedData = () => {
      console.log("Video loaded successfully");
      setVideoLoaded(true);
      setLocalDuration(video.duration);
    };
    
    const handleTimeUpdate = () => {
      const newTime = video.currentTime;
      setLocalTime(newTime);
      if (onTimeUpdate) onTimeUpdate(newTime);
    };
    
    const handleError = () => {
      console.error("Video error:", video.error);
      setHasError(true);
      toast.error("Error loading video");
    };
    
    const handleEnded = () => {
      if (onPlayPause) onPlayPause(); // Toggle back to paused state
    };
    
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onTimeUpdate, onPlayPause]);
  
  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    if (!videoRef.current) return;
    const newTime = values[0];
    setLocalTime(newTime);
    videoRef.current.currentTime = newTime;
    
    if (onTimeUpdate) onTimeUpdate(newTime);
  };
  
  // Handle volume change
  const handleVolumeChange = (values: number[]) => {
    if (!videoRef.current) return;
    const newVolume = values[0];
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };
  
  // Get volume icon based on current level
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div className="video-player w-full flex flex-col">
      {/* Video container with direct playback */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-2">
        <video
          ref={videoRef}
          className={`w-full h-full object-contain ${!videoSrc ? 'hidden' : ''}`}
          playsInline
          onClick={onPlayPause}
        />
        
        {!videoSrc && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
            No video selected
          </div>
        )}
        
        {videoSrc && !videoLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="text-white text-center">
              <div className="w-10 h-10 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-2 mx-auto"></div>
              <p>Loading video...</p>
            </div>
          </div>
        )}
        
        {/* Overlay play/pause button */}
        {videoLoaded && (
          <div 
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={onPlayPause}
          >
            <div className="bg-black bg-opacity-50 rounded-full p-4">
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Video controls */}
      <div className="flex items-center space-x-2">
        <button 
          className="p-1 rounded-full hover:bg-gray-200"
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              setLocalTime(0);
              if (onTimeUpdate) onTimeUpdate(0);
            }
          }}
        >
          <SkipBack size={18} />
        </button>
        
        <button 
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
          onClick={onPlayPause}
          disabled={!videoLoaded}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        
        <div className="flex-1 mx-2">
          <Slider
            value={[localTime]}
            min={0}
            max={localDuration || 100}
            step={0.1}
            onValueChange={handleSliderChange}
            disabled={!videoLoaded}
          />
        </div>
        
        <div className="text-sm text-gray-600 w-16 text-right">
          {formatTime(localTime)} / {formatTime(localDuration)}
        </div>
        
        <div className="relative">
          <button
            className="p-1 rounded-full hover:bg-gray-200"
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          >
            {getVolumeIcon()}
          </button>
          
          {showVolumeSlider && (
            <div className="absolute bottom-full mb-2 -left-12 bg-white p-2 rounded-md shadow-lg w-32">
              <Slider
                value={[volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Error troubleshooter */}
      {hasError && videoRef.current && (
        <div className="mt-4">
          <VideoTroubleshooter 
            videoRef={videoRef}
            videoLoaded={videoLoaded}
            clips={[{ name: "Video", type: videoSrc || "", duration: localDuration }]}
            onRetry={() => {
              setHasError(false);
              if (videoRef.current && videoSrc) {
                videoRef.current.src = videoSrc;
                videoRef.current.load();
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
