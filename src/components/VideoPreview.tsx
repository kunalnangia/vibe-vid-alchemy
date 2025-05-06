
import React from 'react';

interface VideoPreviewProps {
  clips?: any[];
  textOverlays?: any[];
  currentTime?: number;
  setCurrentTime?: (time: number) => void;
  isPlaying?: boolean;
  setIsPlaying?: (playing: boolean) => void;
  projectDuration?: number;
  currentFilter?: string;
  aspectRatio?: string;
  greenScreenEnabled?: boolean;
  autoCaptionsEnabled?: boolean;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  clips = [],
  textOverlays = [],
  currentTime = 0,
  setCurrentTime = () => {},
  isPlaying = false,
  setIsPlaying = () => {},
  projectDuration = 30,
  currentFilter = 'normal',
  aspectRatio = 'landscape',
  greenScreenEnabled = false,
  autoCaptionsEnabled = false
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // Set up video state management
  React.useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || clips.length === 0) return;
    
    // Set the video source to the first clip if available
    if (clips[0]?.url) {
      videoElement.src = clips[0].url;
      console.info(`Video loaded successfully: ${clips[0].url}`);
    }
    
    // Setup play/pause based on isPlaying state
    if (isPlaying) {
      videoElement.play().catch(err => {
        console.error('Error playing video:', err);
      });
    } else {
      videoElement.pause();
    }
    
    // Listen for video time updates
    const handleTimeUpdate = () => {
      if (videoElement) {
        setCurrentTime(videoElement.currentTime);
      }
    };
    
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [clips, isPlaying, setCurrentTime]);
  
  // Get aspect ratio class based on the selected option
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'portrait': return 'aspect-[9/16]';
      case 'landscape':
      default: return 'aspect-[16/9]';
    }
  };
  
  // Get filter class based on the selected filter
  const getFilterClass = () => {
    switch (currentFilter) {
      case 'grayscale': return 'filter grayscale';
      case 'sepia': return 'filter sepia';
      case 'vintage': return 'filter sepia brightness-75';
      case 'blur': return 'filter blur-sm';
      case 'bright': return 'filter brightness-125';
      case 'normal':
      default: return '';
    }
  };
  
  // If there are no clips, show a placeholder
  if (!clips.length) {
    return (
      <div className={`relative rounded-lg shadow-lg bg-gray-800 w-full max-w-2xl mx-auto ${getAspectRatioClass()} flex items-center justify-center`}>
        <p className="text-white text-center p-4">Upload or record a video to get started</p>
      </div>
    );
  }
  
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`relative rounded-lg shadow-lg overflow-hidden ${getAspectRatioClass()}`}>
        {/* Video element */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-contain bg-black ${getFilterClass()}`}
          onClick={() => setIsPlaying(!isPlaying)}
          playsInline
        />
        
        {/* Green screen effect overlay */}
        {greenScreenEnabled && (
          <div className="absolute inset-0 bg-green-500 mix-blend-screen opacity-50"></div>
        )}
        
        {/* Text overlays */}
        {textOverlays.map((overlay) => (
          <div 
            key={overlay.id}
            className="absolute text-white font-bold text-lg p-2"
            style={{
              top: `${overlay.position.y}%`, 
              left: `${overlay.position.x}%`,
              fontFamily: overlay.fontFamily || 'sans-serif',
              fontSize: `${overlay.fontSize || 24}px`,
              color: overlay.color || 'white',
              backgroundColor: overlay.backgroundColor || 'transparent',
              padding: overlay.padding ? `${overlay.padding}px` : '0',
              borderRadius: overlay.borderRadius ? `${overlay.borderRadius}px` : '0',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}
          >
            {overlay.text}
          </div>
        ))}
        
        {/* Auto-captions */}
        {autoCaptionsEnabled && (
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <div className="inline-block bg-black bg-opacity-60 text-white px-4 py-2 rounded-md text-sm">
              {clips[0]?.captions || "Auto-generated captions will appear here"}
            </div>
          </div>
        )}
        
        {/* Play/pause overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying && (
            <div className="bg-black bg-opacity-50 rounded-full p-4 shadow-lg">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
