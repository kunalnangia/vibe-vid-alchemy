
import React, { useEffect } from 'react';
import { VideoClip, TextOverlay } from '@/lib/video/types';
import { useVideoRenderer } from '@/hooks/useVideoRenderer';
import { filterMap } from '@/lib/video/constants';
import EmptyVideoState from './EmptyVideoState';

interface VideoCanvasProps {
  clips: VideoClip[];
  textOverlays: TextOverlay[];
  currentTime: number;
  setCurrentTime: (time: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  projectDuration: number;
  currentFilter: string;
  aspectRatio: string;
}

const VideoCanvas: React.FC<VideoCanvasProps> = ({
  clips,
  textOverlays,
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  projectDuration,
  currentFilter,
  aspectRatio
}) => {
  const filterStyle = filterMap[currentFilter] || 'none';
  
  const { videoRef, canvasRef, ratioConfig } = useVideoRenderer({
    clips,
    textOverlays,
    currentTime,
    isPlaying,
    setCurrentTime,
    setIsPlaying,
    projectDuration,
    currentFilter,
    aspectRatio
  });

  // Handle file object URLs from uploaded clips
  useEffect(() => {
    if (clips.length > 0 && clips[0].file) {
      // Create object URL from the file
      const objectUrl = URL.createObjectURL(clips[0].file);
      
      // Set the source to the video element
      if (videoRef.current) {
        videoRef.current.src = objectUrl;
      }
      
      // Clean up function to revoke the object URL
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [clips, videoRef]);

  return (
    <div 
      className={`video-canvas relative ${ratioConfig.className} shadow-2xl rounded-lg overflow-hidden transition-all duration-300`}
    >
      <canvas
        ref={canvasRef}
        width={ratioConfig.width}
        height={ratioConfig.height}
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{ filter: filterStyle }}
      />
      <video
        ref={videoRef}
        className="w-full h-full"
        style={{ visibility: 'hidden' }}
      />
      {clips.length === 0 && <EmptyVideoState />}
    </div>
  );
};

export default VideoCanvas;
