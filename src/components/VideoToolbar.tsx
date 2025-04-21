
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Scissors, Download, Undo, Redo, Music, Sticker,
  Captions, Video, ArrowUpDown, Share, Filter
} from 'lucide-react';
import { toast } from "sonner";

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
  const handleComingSoonClick = (feature: string) => {
    toast.info(`${feature} feature coming soon!`);
  };

  return (
    <div className="flex items-center space-x-3 mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#E8F7E4] via-[#B0D9FF] to-[#E7F5FF] shadow-xl studio-card border border-blue-300 max-w-3xl mx-auto font-ui">
      <Button
        variant="outline"
        size="sm"
        onClick={onSplit}
        disabled={!hasSelectedClip}
        className="flex items-center rounded-lg font-semibold border-blue-600 text-blue-900 hover:bg-blue-300 hover:text-blue-900 shadow-sm"
      >
        <Scissors className="mr-1 h-5 w-5" />
        Split
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg border-blue-300 text-blue-700 hover:bg-blue-200"
        onClick={() => handleComingSoonClick("Green Screen")}
      >
        <Video className="mr-1 h-5 w-5" />
        Chroma Key
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg border-blue-300 text-blue-700 hover:bg-blue-200"
        onClick={() => handleComingSoonClick("Auto Captions")}
      >
        <Captions className="mr-1 h-5 w-5" />
        Captions
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg border-blue-300 text-blue-700 hover:bg-blue-200"
        onClick={() => handleComingSoonClick("Music Library")}
      >
        <Music className="mr-1 h-5 w-5" />
        Audio
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg border-blue-300 text-blue-700 hover:bg-blue-200"
        onClick={() => handleComingSoonClick("Effects Library")}
      >
        <Filter className="mr-1 h-5 w-5" />
        Effects
      </Button>
      
      <div className="border-r border-blue-300 h-9"></div>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-lg border-blue-300 text-blue-700 hover:bg-blue-200"
        onClick={() => handleComingSoonClick("Social Sharing")}
      >
        <Share className="mr-1 h-5 w-5" />
        Share
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
