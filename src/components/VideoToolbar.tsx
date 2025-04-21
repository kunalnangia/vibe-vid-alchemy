
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
    <div className="flex items-center space-x-2 mb-4 p-3 rounded-xl bg-white/75 dark:bg-editor-dark/70 shadow-lg studio-card border border-gray-200 dark:border-editor-purple/30 max-w-3xl mx-auto font-ui">
      <Button
        variant="outline"
        size="sm"
        onClick={onSplit}
        disabled={!hasSelectedClip}
        className="flex items-center rounded-lg font-semibold shadow-sm border-editor-purple/40"
      >
        <Scissors className="mr-1 h-4 w-4" />
        Split
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg text-gray-400"
        disabled
      >
        <Undo className="mr-1 h-4 w-4" />
        Undo
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg text-gray-400"
        disabled
      >
        <Redo className="mr-1 h-4 w-4" />
        Redo
      </Button>
      <div className="border-r border-gray-300 h-8"></div>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg text-gray-400"
        disabled
      >
        <Music className="mr-1 h-4 w-4" />
        Audio
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg text-gray-400"
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
        className="bg-editor-purple hover:bg-editor-blue flex items-center rounded-lg font-semibold shadow-md px-6"
      >
        <Download className="mr-1 h-4 w-4" />
        Export
      </Button>
    </div>
  );
};

export default VideoToolbar;
