
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Scissors, Video, Captions, Music, Share, ExternalLink } from "lucide-react";

interface VideoEditorProps {
  videoSrc?: string;
  onSplit?: (timestamp: number) => void;
  onApplyChroma?: () => void;
  onAddCaptions?: () => void;
  onAddAudio?: () => void;
  onAddEffects?: () => void;
  onShare?: () => void;
  onExport?: () => void;
}

const VideoEditor: React.FC<VideoEditorProps> = ({
  videoSrc,
  onSplit,
  onApplyChroma,
  onAddCaptions,
  onAddAudio,
  onAddEffects,
  onShare,
  onExport
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasVideo, setHasVideo] = useState(false);

  // Handle video source changes
  useEffect(() => {
    if (videoSrc && videoRef.current) {
      setHasVideo(true);
      videoRef.current.src = videoSrc;
      videoRef.current.load();
    } else {
      setHasVideo(false);
    }
  }, [videoSrc]);

  // Set up video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Toggle play/pause
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle seeking
  const handleSeek = (values: number[]) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = values[0];
    setCurrentTime(values[0]);
  };

  // Format time display
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Video editing actions
  const handleSplit = () => {
    if (!hasVideo) {
      toast.error("Please upload a video first");
      return;
    }
    
    if (onSplit) {
      onSplit(currentTime);
      toast.success(`Video split at ${formatTime(currentTime)}`);
    }
  };

  const handleChromaKey = () => {
    if (!hasVideo) {
      toast.error("Please upload a video first");
      return;
    }
    
    if (onApplyChroma) {
      onApplyChroma();
      toast.success("Green screen effect applied");
    }
  };

  const handleCaptions = () => {
    if (!hasVideo) {
      toast.error("Please upload a video first");
      return;
    }
    
    if (onAddCaptions) {
      onAddCaptions();
      toast.success("Generating captions...");
    }
  };

  const handleAudio = () => {
    if (!hasVideo) {
      toast.error("Please upload a video first");
      return;
    }
    
    if (onAddAudio) {
      onAddAudio();
      toast.success("Audio editor opened");
    }
  };

  const handleEffects = () => {
    if (!hasVideo) {
      toast.error("Please upload a video first");
      return;
    }
    
    if (onAddEffects) {
      onAddEffects();
      toast.success("Effects panel opened");
    }
  };

  const handleShare = () => {
    if (!hasVideo) {
      toast.error("Please upload a video first");
      return;
    }
    
    if (onShare) {
      onShare();
      toast.success("Sharing options opened");
    }
  };

  const handleExport = () => {
    if (!hasVideo) {
      toast.error("Please upload a video first");
      return;
    }
    
    if (onExport) {
      onExport();
      toast.success("Exporting video...");
    }
  };

  return (
    <div className="video-editor-container bg-gray-900 rounded-lg overflow-hidden">
      <div className="video-display relative aspect-video">
        {hasVideo ? (
          <video
            ref={videoRef}
            className="w-full h-full bg-black"
            onClick={handlePlayPause}
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
            No video loaded
          </div>
        )}
        
        {/* Play/Pause Overlay */}
        {hasVideo && (
          <div 
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={handlePlayPause}
          >
            <div className="bg-black bg-opacity-50 rounded-full p-4">
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Video Controls */}
      <div className="video-controls bg-gray-800 p-4">
        <div className="flex items-center text-white mb-4">
          <button 
            className="mr-4"
            onClick={handlePlayPause}
            disabled={!hasVideo}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>
          
          <div className="flex-1 mx-4">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 1}
              step={0.1}
              onValueChange={handleSeek}
              disabled={!hasVideo}
              className="h-2"
            />
          </div>
          
          <div className="text-sm ml-4 tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Editing Tools */}
        <div className="flex flex-wrap justify-between gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSplit}
            disabled={!hasVideo}
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
          >
            <Scissors className="mr-2 h-4 w-4" />
            Split
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleChromaKey}
            disabled={!hasVideo}
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
          >
            <Video className="mr-2 h-4 w-4" />
            Chroma Key
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCaptions}
            disabled={!hasVideo}
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
          >
            <Captions className="mr-2 h-4 w-4" />
            Captions
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAudio}
            disabled={!hasVideo}
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
          >
            <Music className="mr-2 h-4 w-4" />
            Audio
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShare}
            disabled={!hasVideo}
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
          >
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={handleExport}
            disabled={!hasVideo}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
