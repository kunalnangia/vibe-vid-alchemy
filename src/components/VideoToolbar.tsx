
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Scissors, Download, Undo, Redo, ZoomIn, ZoomOut, Music, Volume2, Sticker
} from 'lucide-react';

interface VideoToolbarProps {
  onSplit: () => void;
  onExport: () => void;
  hasSelectedClip: boolean;
}

const VideoToolbar: React.FC<VideoToolbarProps> = ({
  onSplit,
  onExport,
  hasSelectedClip,
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4 p-2 bg-editor-darker rounded">
      <Button
        variant="outline"
        size="sm"
        onClick={onSplit}
        disabled={!hasSelectedClip}
        className="flex items-center"
      >
        <Scissors className="mr-1 h-4 w-4" />
        Split
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        disabled
      >
        <Undo className="mr-1 h-4 w-4" />
        Undo
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        disabled
      >
        <Redo className="mr-1 h-4 w-4" />
        Redo
      </Button>
      
      <div className="border-r border-gray-700 h-8"></div>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        disabled
      >
        <Music className="mr-1 h-4 w-4" />
        Audio
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        disabled
      >
        <Sticker className="mr-1 h-4 w-4" />
        Stickers
      </Button>
      
      <div className="flex-1"></div>
      
      <Button
        variant="default"
        size="sm"
        onClick={onExport}
        className="bg-editor-purple hover:bg-editor-blue flex items-center"
      >
        <Download className="mr-1 h-4 w-4" />
        Export
      </Button>
    </div>
  );
};

export default VideoToolbar;
