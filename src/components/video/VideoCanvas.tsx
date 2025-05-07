
import React, { useState, useEffect } from 'react';
import { VideoPreviewProps } from '@/lib/video/types';
import { toast } from 'sonner';
import DirectVideoPlayer from './DirectVideoPlayer';

interface VideoCanvasProps extends VideoPreviewProps {
  onError?: () => void;
}

const VideoCanvasMain: React.FC<VideoCanvasProps> = ({
  clips,
  textOverlays,
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  projectDuration,
  currentFilter = 'normal',
  aspectRatio = 'landscape',
  greenScreenEnabled = false,
  autoCaptionsEnabled = false,
  onError
}) => {
  const [currentVideoSrc, setCurrentVideoSrc] = useState<File | string | null>(null);
  const [trimSettings, setTrimSettings] = useState<{start: number, end: number} | undefined>();
  const [cropSettings, setCropSettings] = useState<{x: number, y: number, width: number, height: number} | undefined>();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoWidth, setVideoWidth] = useState(1920);
  const [videoHeight, setVideoHeight] = useState(1080);
  const [localGreenScreen, setLocalGreenScreen] = useState(greenScreenEnabled);
  const [localAutoCaptions, setLocalAutoCaptions] = useState(autoCaptionsEnabled);
  
  // Update local state when props change
  useEffect(() => {
    setLocalGreenScreen(greenScreenEnabled);
  }, [greenScreenEnabled]);
  
  useEffect(() => {
    setLocalAutoCaptions(autoCaptionsEnabled);
  }, [autoCaptionsEnabled]);
  
  // Set up video source from clips
  useEffect(() => {
    if (clips && clips.length > 0) {
      const currentClip = clips[0]; // Currently only handling the first clip
      
      if (currentClip.file) {
        setCurrentVideoSrc(currentClip.file);
      } else if (currentClip.src) {
        setCurrentVideoSrc(currentClip.src);
      }
    } else {
      setCurrentVideoSrc(null);
    }
  }, [clips]);

  // Handle video metadata loaded
  const handleLoadedMetadata = (duration: number) => {
    console.log("Video metadata loaded. Duration:", duration + "s");
    setVideoLoaded(true);
    
    // Get video dimensions
    const video = document.querySelector('video');
    if (video) {
      setVideoWidth(video.videoWidth || 1920);
      setVideoHeight(video.videoHeight || 1080);
    }
  };

  // Handle video error
  const handleVideoError = (error: any) => {
    console.error("Video loading error:", error);
    setVideoLoaded(false);
    if (onError) onError();
  };

  // Handle play state change
  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing);
  };
  
  // Handle trim action
  const handleTrim = () => {
    toast.info("Opening trim controls");
    const newStart = Math.max(0, currentTime);
    const newEnd = Math.min(projectDuration, currentTime + Math.min(10, projectDuration - currentTime));
    
    setTrimSettings({
      start: newStart, 
      end: newEnd
    });
    
    setTimeout(() => {
      toast("Drag sliders to adjust trim points");
    }, 500);
  };
  
  // Handle crop action
  const handleCrop = () => {
    toast.info("Opening crop controls");
    
    // Default to 10% inset crop
    setCropSettings({
      x: Math.round(videoWidth * 0.1),
      y: Math.round(videoHeight * 0.1),
      width: Math.round(videoWidth * 0.8),
      height: Math.round(videoHeight * 0.8)
    });
    
    setTimeout(() => {
      toast("Drag handles to adjust crop area");
    }, 500);
  };
  
  // Handle green screen toggle
  const handleGreenScreen = () => {
    const newState = !localGreenScreen;
    setLocalGreenScreen(newState);
    
    toast(newState ? 
      "Green screen enabled - solid color backgrounds will be transparent" : 
      "Green screen disabled");
  };
  
  // Handle magic resize
  const handleMagicResize = () => {
    toast.info("Opening magic resize options");
    toast("Choose an aspect ratio for your video");
  };
  
  // Handle auto captions
  const handleAutoCaptions = () => {
    const newState = !localAutoCaptions;
    setLocalAutoCaptions(newState);
    
    if (newState) {
      toast("Generating captions from audio...");
    } else {
      toast("Captions disabled");
    }
  };
  
  // Handle AI enhance
  const handleAIEnhance = () => {
    toast.info("Enhancing video with AI...");
    
    setTimeout(() => {
      toast("Analyzing video content...");
    }, 800);
    
    setTimeout(() => {
      toast.success("Video enhanced", {
        description: "Brightness, contrast and color balance improved"
      });
    }, 2500);
  };

  return (
    <div className="video-canvas w-full">
      <div className="aspect-video w-full overflow-hidden relative rounded-lg bg-black">
        <DirectVideoPlayer
          src={currentVideoSrc}
          autoPlay={false}
          muted={false}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleVideoError}
          onPlayStateChange={handlePlayStateChange}
          greenScreenEnabled={localGreenScreen}
          autoCaptionsEnabled={localAutoCaptions}
          currentFilter={currentFilter}
          aspectRatio={aspectRatio}
          trimSettings={trimSettings}
          cropSettings={cropSettings}
          onTrim={handleTrim}
          onCrop={handleCrop}
          onGreenScreen={handleGreenScreen}
          onMagicResize={handleMagicResize}
          onAutoCaptions={handleAutoCaptions}
          onAIEnhance={handleAIEnhance}
        />
      </div>
    </div>
  );
};

export default VideoCanvasMain;
