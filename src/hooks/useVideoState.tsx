
import { useState, useRef, useEffect } from 'react';

const useVideoState = (initialVideoSrc: string | null = null) => {
  const [videoSrc, setVideoSrc] = useState<string | null>(initialVideoSrc);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.src = videoSrc;
      videoRef.current.load();
    }
  }, [videoSrc]);

  const togglePlay = () => {
    if (!videoRef.current || !videoSrc) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error('Error playing video:', error);
          setIsPlaying(false);
        });
    }
  };
  
  const seekTo = (time: number) => {
    if (!videoRef.current) return;
    
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return {
    videoSrc,
    setVideoSrc,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    videoRef,
    togglePlay,
    seekTo,
  };
};

export default useVideoState;
