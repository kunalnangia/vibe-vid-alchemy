
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Scissors, Download, Undo, Redo, Music, Sticker
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
    <div className="flex items-center space-x-3 mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#F2FCE2] via-[#D3E4FD] to-[#E5DEFF] shadow-xl studio-card border border-blue-300 max-w-3xl mx-auto font-ui">
      <Button
        variant="outline"
        size="sm"
        onClick={onSplit}
        disabled={!hasSelectedClip}
        className="flex items-center rounded-lg font-semibold border-blue-400 text-blue-700 hover:bg-blue-100 hover:text-blue-900 shadow-sm"
      >
        <Scissors className="mr-1 h-5 w-5" />
        Split
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg text-blue-300 border-blue-300 cursor-not-allowed"
        disabled
      >
        <Undo className="mr-1 h-5 w-5" />
        Undo
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg text-blue-300 border-blue-300 cursor-not-allowed"
        disabled
      >
        <Redo className="mr-1 h-5 w-5" />
        Redo
      </Button>
      <div className="border-r border-blue-300 h-9"></div>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg text-blue-300 border-blue-300 cursor-not-allowed"
        disabled
      >
        <Music className="mr-1 h-5 w-5" />
        Audio
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg text-blue-300 border-blue-300 cursor-not-allowed"
        disabled
      >
        <Sticker className="mr-1 h-5 w-5" />
        Stickers
      </Button>
      <div className="flex-1"></div>
      <Button
        variant="default"
        size="sm"
        onClick={onExport}
        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md flex items-center rounded-lg font-semibold px-6 text-white"
      >
        <Download className="mr-1 h-5 w-5" />
        Export
      </Button>
    </div>
  );
};

export default VideoToolbar;
