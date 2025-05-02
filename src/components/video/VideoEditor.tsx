
import React, { useState, useEffect, useRef } from 'react';
import { toast } from "sonner";
import VideoEditorView from './VideoEditorView';
import VideoPlayerControls from './VideoPlayerControls';
import VideoEditorToolbar from './VideoEditorToolbar';

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

  // Format time display
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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

  // Video editing actions
  const handleSplit = () => {
    if (onSplit) {
      onSplit(currentTime);
      toast.success(`Video split at ${formatTime(currentTime)}`);
    }
  };

  const handleChromaKey = () => {
    if (onApplyChroma) {
      onApplyChroma();
      toast.success("Green screen effect applied");
    }
  };

  const handleCaptions = () => {
    if (onAddCaptions) {
      onAddCaptions();
      toast.success("Generating captions...");
    }
  };

  const handleAudio = () => {
    if (onAddAudio) {
      onAddAudio();
      toast.success("Audio editor opened");
    }
  };

  const handleEffects = () => {
    if (onAddEffects) {
      onAddEffects();
      toast.success("Effects panel opened");
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
      toast.success("Sharing options opened");
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
      toast.success("Exporting video...");
    }
  };

  return (
    <div className="video-editor-container bg-gray-900 rounded-lg overflow-hidden">
      <VideoEditorView 
        videoRef={videoRef}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        hasVideo={hasVideo}
      />

      <VideoPlayerControls
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        disabled={!hasVideo}
      />

      <div className="p-4">
        <VideoEditorToolbar
          hasVideo={hasVideo}
          onSplit={handleSplit}
          onChromaKey={handleChromaKey}
          onCaptions={handleCaptions}
          onAudio={handleAudio}
          onShare={handleShare}
          onExport={handleExport}
        />
      </div>
    </div>
  );
};

export default VideoEditor;
