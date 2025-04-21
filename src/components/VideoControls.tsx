
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  currentTime: number;
  duration: number;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds === 0) return '00:00.0';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
};

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  togglePlay,
  seekTo,
  currentTime,
  duration
}) => (
  <div className="toolbar mb-6 flex items-center rounded-2xl px-4 py-3 bg-gradient-to-r from-[#D3E4FD] to-[#F2FCE2] shadow-xl border border-blue-300 max-w-3xl mx-auto studio-card font-ui">
    <button
      className="toolbar-button text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-150"
      title="Go to Start"
      onClick={() => seekTo(0)}
      aria-label="Go to start of video"
    >
      <SkipBack size={24} />
    </button>
    <button
      className="toolbar-button text-blue-700 hover:bg-blue-100 hover:text-blue-800 mx-2 transition-colors duration-150"
      title={isPlaying ? "Pause" : "Play"}
      onClick={togglePlay}
      aria-label={isPlaying ? "Pause video" : "Play video"}
    >
      {isPlaying ? <Pause size={26} /> : <Play size={26} />}
    </button>
    <button
      className="toolbar-button text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-150"
      title="Go to End"
      onClick={() => seekTo(duration)}
      aria-label="Go to end of video"
    >
      <SkipForward size={24} />
    </button>
    <div className="flex-1 mx-8">
      <Slider
        value={[currentTime]}
        min={0}
        max={duration || 100}
        step={0.01}
        onValueChange={(values) => seekTo(values[0])}
        className="h-3 rounded-full"
      />
    </div>
    <div className="text-sm font-semibold tracking-wide min-w-[96px] text-right text-blue-800 select-none">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  </div>
);

export default VideoControls;
