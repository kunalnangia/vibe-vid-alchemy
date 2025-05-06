
import React from 'react';
import { Separator } from "@/components/ui/separator";
import VideoPreview from "@/components/video/VideoPreview";
import VideoPlaybackControls from "@/components/video/VideoPlaybackControls";
import { Button } from "@/components/ui/button";
import { Scissors, Video, Captions, Music, Download, Share2 } from "lucide-react";
import { toast } from "sonner";

interface VideoEditorLayoutProps {
  videoState: {
    videoSrc: string | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    togglePlay: () => void;
    seekTo: (time: number) => void;
  };
}

const VideoEditorLayout: React.FC<VideoEditorLayoutProps> = ({ videoState }) => {
  const { videoSrc, isPlaying, currentTime, duration, togglePlay, seekTo } = videoState;
  
  const handleSplit = () => {
    if (!videoSrc) {
      toast.error('No video to split');
      return;
    }
    toast.success(`Video split at ${formatTime(currentTime)}`);
  };
  
  const handleChromaKey = () => {
    if (!videoSrc) {
      toast.error('No video loaded');
      return;
    }
    toast.success('Chroma key applied');
  };
  
  const handleCaptions = () => {
    if (!videoSrc) {
      toast.error('No video loaded');
      return;
    }
    toast.success('Generating captions');
  };
  
  const handleAudio = () => {
    if (!videoSrc) {
      toast.error('No video loaded');
      return;
    }
    toast.success('Audio editor opened');
  };
  
  const handleShare = () => {
    if (!videoSrc) {
      toast.error('No video loaded');
      return;
    }
    toast.success('Sharing options opened');
  };
  
  const handleExport = () => {
    if (!videoSrc) {
      toast.error('No video loaded');
      return;
    }
    toast.success('Exporting video');
  };
  
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds === 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Video Editor</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Video Preview */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <VideoPreview videoSrc={videoSrc} />
            </div>
          </div>
          
          {/* Video Controls */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <VideoPlaybackControls
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              seekTo={seekTo}
              currentTime={currentTime}
              duration={duration}
              disabled={!videoSrc}
            />
          </div>
          
          <Separator />
          
          {/* Editing Toolbar */}
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={handleSplit} 
              disabled={!videoSrc}
            >
              <Scissors className="h-4 w-4 mr-2" />
              Split
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleChromaKey}
              disabled={!videoSrc}
            >
              <Video className="h-4 w-4 mr-2" />
              Chroma Key
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleCaptions}
              disabled={!videoSrc}
            >
              <Captions className="h-4 w-4 mr-2" />
              Captions
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleAudio}
              disabled={!videoSrc}
            >
              <Music className="h-4 w-4 mr-2" />
              Audio
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleShare}
              disabled={!videoSrc}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            <Button 
              onClick={handleExport}
              disabled={!videoSrc}
              className="ml-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEditorLayout;
