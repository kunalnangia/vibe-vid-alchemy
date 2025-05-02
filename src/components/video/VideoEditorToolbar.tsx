
import React from 'react';
import { Button } from "@/components/ui/button";
import { Scissors, Video, Captions, Music, Share, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface VideoEditorToolbarProps {
  hasVideo: boolean;
  onSplit: () => void;
  onChromaKey: () => void;
  onCaptions: () => void;
  onAudio: () => void;
  onShare: () => void;
  onExport: () => void;
}

const VideoEditorToolbar: React.FC<VideoEditorToolbarProps> = ({
  hasVideo,
  onSplit,
  onChromaKey,
  onCaptions,
  onAudio,
  onShare,
  onExport
}) => {
  const handleAction = (action: () => void, name: string) => {
    if (!hasVideo) {
      toast.error("Please upload a video first");
      return;
    }
    
    action();
  };

  return (
    <div className="flex flex-wrap justify-between gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleAction(onSplit, "Split")}
        disabled={!hasVideo}
        className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
      >
        <Scissors className="mr-2 h-4 w-4" />
        Split
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleAction(onChromaKey, "Chroma Key")}
        disabled={!hasVideo}
        className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
      >
        <Video className="mr-2 h-4 w-4" />
        Chroma Key
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleAction(onCaptions, "Captions")}
        disabled={!hasVideo}
        className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
      >
        <Captions className="mr-2 h-4 w-4" />
        Captions
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleAction(onAudio, "Audio")}
        disabled={!hasVideo}
        className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
      >
        <Music className="mr-2 h-4 w-4" />
        Audio
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleAction(onShare, "Share")}
        disabled={!hasVideo}
        className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
      >
        <Share className="mr-2 h-4 w-4" />
        Share
      </Button>
      
      <Button 
        variant="default" 
        size="sm"
        onClick={() => handleAction(onExport, "Export")}
        disabled={!hasVideo}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
};

export default VideoEditorToolbar;
