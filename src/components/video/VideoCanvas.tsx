
import React, { useEffect } from 'react';
import { VideoClip, TextOverlay } from '@/lib/video/types';
import { useVideoRenderer } from '@/hooks/useVideoRenderer';

interface VideoCanvasProps {
  clips: VideoClip[];
  textOverlays: TextOverlay[];
  currentTime: number;
  setCurrentTime: (time: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  projectDuration: number;
  currentFilter: string;
  aspectRatio: string;
  greenScreenEnabled?: boolean;
}

const VideoCanvas: React.FC<VideoCanvasProps> = ({
  clips,
  textOverlays,
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  projectDuration,
  currentFilter,
  aspectRatio,
  greenScreenEnabled = false
}) => {
  const { videoRef, canvasRef, ratioConfig, videoLoaded } = useVideoRenderer({
    clips,
    textOverlays,
    currentTime,
    isPlaying,
    setCurrentTime,
    setIsPlaying,
    projectDuration,
    currentFilter,
    aspectRatio,
    greenScreenEnabled
  });

  // Apply filter styling
  const getFilterStyle = () => {
    switch(currentFilter) {
      case 'grayscale':
        return 'grayscale(100%)';
      case 'sepia':
        return 'sepia(70%)';
      case 'vintage':
        return 'sepia(50%) hue-rotate(-30deg) saturate(140%)';
      case 'warm':
        return 'sepia(30%) brightness(105%) saturate(110%)';
      case 'cool':
        return 'hue-rotate(30deg) brightness(95%) saturate(90%)';
      case 'dramatic':
        return 'contrast(120%) brightness(90%) saturate(130%)';
      default:
        return 'none';
    }
  };

  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Log clip status for debugging
  useEffect(() => {
    if (clips.length > 0) {
      console.log('Clip loaded in VideoCanvas:', clips[0].name || 'Unnamed clip');
    }
  }, [clips]);

  return (
    <div className="video-canvas-container relative rounded-md overflow-hidden shadow-lg mb-6">
      {/* Hidden video element for loading video data */}
      <video 
        ref={videoRef} 
        className="hidden" 
        playsInline 
        muted
      />
      
      {/* Canvas for rendering video frames and effects */}
      <canvas 
        ref={canvasRef}
        className="mx-auto"
        style={{ 
          filter: getFilterStyle(),
          width: ratioConfig.width,
          height: ratioConfig.height,
          maxWidth: '100%',
          aspectRatio: `${ratioConfig.width}/${ratioConfig.height}`,
          backgroundColor: '#000'
        }}
      />
      
      {/* Video controls overlay */}
      <div className="video-controls absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between">
          <button 
            className="text-white bg-purple-600 rounded-full p-2 hover:bg-purple-700 transition"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>
          
          <div className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(projectDuration)}
          </div>
        </div>
      </div>
      
      {/* Empty state when no video is loaded */}
      {clips.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/20 backdrop-blur-sm">
          <div className="text-center p-6">
            <div className="text-purple-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-purple-900">Add Your First Clip</h3>
            <p className="text-sm text-purple-700 mt-1">Upload a video or record with your camera</p>
          </div>
        </div>
      )}
      
      {/* Loading indicator */}
      {clips.length > 0 && !videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/30">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      )}
      
      {/* Green screen indicator */}
      {greenScreenEnabled && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
          Green Screen Active
        </div>
      )}
    </div>
  );
};

// Helper function to format time in MM:SS format
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default VideoCanvas;
