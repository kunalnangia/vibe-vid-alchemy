import React, { useRef, useEffect } from 'react';

interface VideoClip {
  id: string;
  src: string;
  start: number;
  end: number;
  position: number;
  duration: number;
}

interface TextOverlay {
  id: string;
  text: string;
  position: { x: number, y: number };
  style: {
    color: string;
    fontSize: string;
    fontFamily: string;
  };
  startTime: number;
  endTime: number;
}

// Map of filter IDs to CSS filter strings
const filterMap: Record<string, string> = {
  normal: 'none',
  warm: 'sepia(0.5) saturate(1.5)',
  cool: 'hue-rotate(30deg) saturate(1.2)',
  vivid: 'contrast(1.2) saturate(1.5)',
  vintage: 'sepia(0.4) contrast(0.9) saturate(0.8)',
  bw: 'grayscale(1)',
  blur: 'blur(2px)',
  sharp: 'contrast(1.3) brightness(0.9)',
  dreamy: 'brightness(1.1) contrast(0.9) blur(0.5px)',
};

// Map of aspect ratios to dimensions
const aspectRatioMap: Record<string, { width: number, height: number, className: string }> = {
  landscape: { width: 640, height: 360, className: "w-full max-w-3xl" },
  portrait: { width: 360, height: 640, className: "h-[60vh] max-h-[640px]" },
  square: { width: 480, height: 480, className: "w-full max-w-lg" },
  vertical: { width: 432, height: 540, className: "h-[60vh] max-h-[540px]" },
  cinema: { width: 640, height: 272, className: "w-full max-w-3xl" },
};

interface VideoPreviewProps {
  clips: VideoClip[];
  textOverlays: TextOverlay[];
  currentTime: number;
  setCurrentTime: (time: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  projectDuration: number;
  currentFilter: string;
  aspectRatio: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  clips = [], // Provide default empty array
  textOverlays = [], // Provide default empty array
  currentTime = 0,
  setCurrentTime = () => {},
  isPlaying = false,
  setIsPlaying = () => {},
  projectDuration = 25,
  currentFilter = 'normal',
  aspectRatio = 'landscape'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  
  // Get aspect ratio configuration
  const ratioConfig = aspectRatioMap[aspectRatio] || aspectRatioMap.landscape;
  const filterStyle = filterMap[currentFilter] || 'none';

  // Animate playback for preview and canvas
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }
    
    const animate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        
        if (videoRef.current.currentTime >= projectDuration) {
          setIsPlaying(false);
          setCurrentTime(0);
          videoRef.current.currentTime = 0;
        }
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    if (videoRef.current && clips.length > 0) {
      videoRef.current.play().catch(err => {
        console.log("Video play error (likely user hasn't interacted yet):", err);
      });
    }
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, projectDuration, setCurrentTime, setIsPlaying, clips]);

  // Draw current frame on canvas + overlays
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx || !videoRef.current) return;
    
    // Apply current dimensions from aspect ratio
    canvas.width = ratioConfig.width;
    canvas.height = ratioConfig.height;
    
    // Draw video frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get the current clip (simplified)
    if (clips.length > 0) {
      try {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        // Apply filter effects (would be better with WebGL in production)
        if (currentFilter !== 'normal') {
          // For complex filters, WebGL would be used in a real implementation
          // This is a simplified visual representation
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          ctx.putImageData(imageData, 0, 0);
        }
      } catch (err) {
        console.error("Canvas error:", err);
      }
    }
    
    // Draw text overlays
    textOverlays.forEach(overlay => {
      if (currentTime >= overlay.startTime && currentTime <= overlay.endTime) {
        ctx.fillStyle = overlay.style.color;
        ctx.font = `${overlay.style.fontSize} ${overlay.style.fontFamily}`;
        ctx.fillText(overlay.text, overlay.position.x, overlay.position.y);
      }
    });
  }, [currentTime, textOverlays, clips, currentFilter, aspectRatio, ratioConfig.width, ratioConfig.height]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  return (
    <div className="video-preview-container flex flex-col items-center justify-center">
      <div 
        className={`video-canvas relative ${ratioConfig.className} shadow-2xl rounded-lg overflow-hidden transition-all duration-300`}
      >
        <canvas
          ref={canvasRef}
          width={ratioConfig.width}
          height={ratioConfig.height}
          className="absolute top-0 left-0 w-full h-full z-10"
          style={{ filter: filterStyle }}
        />
        <video
          ref={videoRef}
          className="w-full h-full"
          src={clips[0]?.src}
          muted
          style={{ visibility: 'hidden' }}
        />
        {clips.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-blue-400 mb-2">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </div>
            <div className="text-blue-700 font-medium">Upload a video to get started</div>
            <div className="text-blue-500 text-sm mt-1">Or choose a template from the library</div>
          </div>
        )}
      </div>
      
      {/* Aspect ratio indicator */}
      <div className="mt-2 text-xs text-blue-500 font-medium">
        {aspectRatio === 'landscape' ? '16:9 Landscape' : 
         aspectRatio === 'portrait' ? '9:16 Portrait' : 
         aspectRatio === 'square' ? '1:1 Square' : 
         aspectRatio === 'vertical' ? '4:5 Vertical' : 
         aspectRatio === 'cinema' ? '21:9 Cinema' : 'Custom'
        }
        {currentFilter !== 'normal' && ` • Filter: ${currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)}`}
      </div>
    </div>
  );
};

export default VideoPreview;
