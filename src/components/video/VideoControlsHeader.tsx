
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings, Captions, Volume2 } from "lucide-react";

interface VideoControlsHeaderProps {
  onToggleControls?: () => void;
  onToggleChromaKey?: () => void;
  onToggleCaptions?: () => void;
  onToggleAudio?: () => void;
}

const VideoControlsHeader: React.FC<VideoControlsHeaderProps> = ({
  onToggleControls,
  onToggleChromaKey,
  onToggleCaptions,
  onToggleAudio
}) => {
  return (
    <div className="flex gap-2 mb-2 justify-center">
      <Button 
        variant="outline" 
        size="sm"
        className="bg-white/90 text-gray-700 hover:bg-white flex items-center gap-1"
        onClick={onToggleControls}
      >
        <Settings size={16} />
        <span>Hide Controls</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        className="bg-white/90 text-gray-700 hover:bg-white flex items-center gap-1"
        onClick={onToggleChromaKey}
      >
        <span>Chroma Key</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        className="bg-white/90 text-gray-700 hover:bg-white flex items-center gap-1"
        onClick={onToggleCaptions}
      >
        <Captions size={16} />
        <span>Captions</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        className="bg-white/90 text-gray-700 hover:bg-white flex items-center gap-1"
        onClick={onToggleAudio}
      >
        <Volume2 size={16} />
        <span>Audio</span>
      </Button>
    </div>
  );
};

export default VideoControlsHeader;
