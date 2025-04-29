
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  handlePlay: () => void;
  handleSliderChange: (value: number[]) => void;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  isPlaying,
  currentTime,
  duration,
  handlePlay,
  handleSliderChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon"
          className="mr-2"
          onClick={handlePlay}
        >
          <Play className="h-6 w-6" />
        </Button>
        <span>{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          className="mx-4 flex-1"
          onValueChange={handleSliderChange}
        />
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
