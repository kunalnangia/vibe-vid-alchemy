
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Check, Plus } from "lucide-react";

interface MusicTrackItemProps {
  title: string;
  duration: string;
  category: string;
  audioSrc?: string;
  onSelect?: () => void;
  selected?: boolean;
}

const MusicTrackItem: React.FC<MusicTrackItemProps> = ({ 
  title, 
  duration, 
  category, 
  audioSrc,
  onSelect,
  selected = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement] = useState(new Audio(audioSrc));
  
  const handlePlayPause = () => {
    if (!audioSrc) return;
    
    if (isPlaying) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioElement.play().catch(err => {
        console.error("Error playing audio:", err);
        setIsPlaying(false);
      });
      
      audioElement.onended = () => {
        setIsPlaying(false);
      };
      
      setIsPlaying(true);
    }
  };
  
  return (
    <div className={`flex items-center justify-between p-2 border rounded transition-colors ${
      selected ? 'border-blue-400 bg-blue-50' : 'border-blue-100 hover:bg-blue-50'
    }`}>
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 mr-2"
          onClick={handlePlayPause}
          disabled={!audioSrc}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <div>
          <div className="font-medium text-blue-800">{title}</div>
          <div className="text-xs text-blue-500">{category}</div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-xs text-blue-500 mr-3">{duration}</div>
        {onSelect && (
          <Button
            variant={selected ? "default" : "outline"}
            size="sm"
            className={selected ? "bg-blue-600" : ""}
            onClick={onSelect}
          >
            {selected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MusicTrackItem;
