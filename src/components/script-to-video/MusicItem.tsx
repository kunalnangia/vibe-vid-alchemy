
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface MusicItemProps {
  id: string;
  title: string;
  artist: string;
  duration: string;
  mood: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const MusicItem: React.FC<MusicItemProps> = ({
  id,
  title,
  artist,
  duration,
  mood,
  isSelected,
  onSelect
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  
  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isPlaying) {
      setIsPlaying(true);
      
      // Simulate audio playing for 5 seconds
      setTimeout(() => {
        setIsPlaying(false);
      }, 5000);
    } else {
      setIsPlaying(false);
    }
  };
  
  return (
    <div 
      className={`flex items-center p-3 mt-2 border ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} rounded-lg cursor-pointer hover:border-blue-300 transition-colors`}
      onClick={() => onSelect(id)}
    >
      <div className="flex-shrink-0 mr-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 w-8 rounded-full p-0" 
          onClick={handlePlayToggle}
        >
          {isPlaying ? (
            <Pause className="h-3 w-3" />
          ) : (
            <Play className="h-3 w-3" />
          )}
        </Button>
      </div>
      <div className="flex-grow">
        <h5 className="font-medium text-gray-900">{title}</h5>
        <div className="flex text-xs text-gray-500">
          <span className="mr-2">{artist}</span>
          <span className="mr-2">•</span>
          <span className="mr-2">{mood}</span>
          <span className="mr-2">•</span>
          <span>{duration}</span>
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-7 w-7 p-0 rounded-full ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(id);
            }}
          >
            <span className="sr-only">Select track</span>
            <div className={`w-4 h-4 rounded-full border ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
              {isSelected && <Check className="h-3 w-3 text-white" />}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Select track</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default MusicItem;
