
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface VoiceoverItemProps {
  id: string;
  name: string;
  gender: string;
  style: string;
  language: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const VoiceoverItem: React.FC<VoiceoverItemProps> = ({
  id,
  name,
  gender,
  style,
  language,
  isSelected,
  onSelect
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    
    // Simulate audio playing for 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };
  
  return (
    <div 
      className={`flex items-center p-3 mt-2 border ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} rounded-lg cursor-pointer hover:border-blue-300 transition-colors`}
      onClick={() => onSelect(id)}
    >
      <div className="flex-shrink-0 mr-3">
        {isSelected ? (
          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <Check className="h-4 w-4" />
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 rounded-full p-0" 
            onClick={handlePlay}
            disabled={isPlaying}
          >
            {isPlaying ? (
              <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
            ) : (
              <Play className="h-3 w-3" />
            )}
          </Button>
        )}
      </div>
      <div className="flex-grow">
        <h5 className="font-medium text-gray-900">{name}</h5>
        <div className="flex text-xs text-gray-500">
          <span className="mr-2">{gender}</span>
          <span className="mr-2">•</span>
          <span className="mr-2">{style}</span>
          <span className="mr-2">•</span>
          <span>{language}</span>
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
            <span className="sr-only">Select voice</span>
            <div className={`w-4 h-4 rounded-full border ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
              {isSelected && <Check className="h-3 w-3 text-white" />}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Select voice</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default VoiceoverItem;
