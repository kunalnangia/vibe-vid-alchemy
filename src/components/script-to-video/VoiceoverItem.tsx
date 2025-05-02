
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Check, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface VoiceoverItemProps {
  name: string;
  gender: string;
  style: string;
  sampleAudio?: string;
  onSelect?: () => void;
  selected?: boolean;
}

const VoiceoverItem: React.FC<VoiceoverItemProps> = ({ 
  name, 
  gender, 
  style, 
  sampleAudio,
  onSelect,
  selected = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement] = useState(new Audio(sampleAudio));
  
  const handlePlayPause = () => {
    if (!sampleAudio) return;
    
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 mr-2"
              onClick={handlePlayPause}
              disabled={!sampleAudio}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isPlaying ? "Pause Audio" : "Play Sample"}
          </TooltipContent>
        </Tooltip>
        <div>
          <div className="font-medium text-blue-800">{name}</div>
          <div className="text-xs text-blue-500">{gender}</div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-sm text-blue-600 mr-3">{style}</div>
        {onSelect && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={selected ? "default" : "outline"}
                size="sm"
                className={selected ? "bg-blue-600" : ""}
                onClick={onSelect}
              >
                {selected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {selected ? "Selected Voice" : "Select Voice"}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default VoiceoverItem;
