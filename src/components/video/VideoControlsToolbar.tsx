
import React from 'react';
import { Scissors, Crop, Video, Filter, Captions, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoControlsToolbarProps {
  showControls: boolean;
  greenScreenEnabled: boolean;
  autoCaptionsEnabled: boolean;
  onTrim?: () => void;
  onCrop?: () => void;
  onGreenScreen?: () => void;
  onMagicResize?: () => void;
  onAutoCaptions?: () => void;
  onAIEnhance?: () => void;
}

const VideoControlsToolbar: React.FC<VideoControlsToolbarProps> = ({
  showControls,
  greenScreenEnabled,
  autoCaptionsEnabled,
  onTrim,
  onCrop,
  onGreenScreen,
  onMagicResize,
  onAutoCaptions,
  onAIEnhance
}) => {
  if (!showControls) return null;

  return (
    <div className="absolute top-2 right-2 bg-black/60 p-1 rounded-md flex space-x-1">
      {onTrim && (
        <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={onTrim}>
          <Scissors className="h-4 w-4" />
        </Button>
      )}
      
      {onCrop && (
        <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={onCrop}>
          <Crop className="h-4 w-4" />
        </Button>
      )}
      
      {onGreenScreen && (
        <Button 
          size="icon" 
          variant={greenScreenEnabled ? "default" : "ghost"} 
          className={`h-8 w-8 ${greenScreenEnabled ? "bg-green-500 text-white" : "text-white"}`}
          onClick={onGreenScreen}
        >
          <Video className="h-4 w-4" />
        </Button>
      )}
      
      {onMagicResize && (
        <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={onMagicResize}>
          <Filter className="h-4 w-4" />
        </Button>
      )}
      
      {onAutoCaptions && (
        <Button 
          size="icon" 
          variant={autoCaptionsEnabled ? "default" : "ghost"} 
          className={`h-8 w-8 ${autoCaptionsEnabled ? "bg-blue-500 text-white" : "text-white"}`}
          onClick={onAutoCaptions}
        >
          <Captions className="h-4 w-4" />
        </Button>
      )}
      
      {onAIEnhance && (
        <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={onAIEnhance}>
          <Wand2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default VideoControlsToolbar;
