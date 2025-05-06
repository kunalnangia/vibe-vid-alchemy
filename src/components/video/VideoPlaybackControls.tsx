
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface VideoPlaybackControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  currentTime: number;
  duration: number;
  disabled?: boolean;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds === 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const VideoPlaybackControls: React.FC<VideoPlaybackControlsProps> = ({
  isPlaying,
  togglePlay,
  seekTo,
  currentTime,
  duration,
  disabled = false
}) => (
  <div className="flex items-center space-x-2 bg-white/90 p-3 rounded-lg shadow-sm">
    <button
      className="p-1.5 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => seekTo(0)}
      disabled={disabled}
      aria-label="Go to start"
    >
      <SkipBack className="h-5 w-5" />
    </button>
    
    <button
      className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={togglePlay}
      disabled={disabled}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
    </button>
    
    <button
      className="p-1.5 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => seekTo(duration)}
      disabled={disabled}
      aria-label="Go to end"
    >
      <SkipForward className="h-5 w-5" />
    </button>
    
    <div className="flex-1 mx-2">
      <Slider
        value={[currentTime]}
        min={0}
        max={duration || 100}
        step={0.1}
        onValueChange={(values) => seekTo(values[0])}
        disabled={disabled}
        aria-label="Video progress"
      />
    </div>
    
    <div className="text-sm font-medium text-gray-700 min-w-16 text-right">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  </div>
);

export default VideoPlaybackControls;
