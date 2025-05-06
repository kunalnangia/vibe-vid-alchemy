
import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'sonner';
import VideoPlaybackControls from './VideoPlaybackControls';

interface VideoPreviewProps {
  videoSrc: string | null;
  autoPlay?: boolean;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ 
  videoSrc, 
  autoPlay = false 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    
    const handleDurationChange = () => {
      setDuration(video.duration);
    };
    
    const handleLoadedData = () => {
      setIsLoaded(true);
      if (autoPlay) {
        video.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error('Error playing video:', err));
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    const handleError = () => {
      toast.error('Error loading video');
      setIsLoaded(false);
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [autoPlay]);
  
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (videoSrc) {
      videoRef.current.src = videoSrc;
      videoRef.current.load();
      setIsLoaded(false);
    }
  }, [videoSrc]);
  
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error('Error playing video:', err);
          toast.error('Could not play video');
        });
    }
  };
  
  const seekTo = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full"
          playsInline
          preload="metadata"
        ></video>
        
        {!videoSrc && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <p className="text-gray-400">No video selected</p>
          </div>
        )}
        
        {videoSrc && !isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      
      <VideoPlaybackControls
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        seekTo={seekTo}
        currentTime={currentTime}
        duration={duration}
        disabled={!videoSrc || !isLoaded}
      />
    </div>
  );
};

export default VideoPreview;
