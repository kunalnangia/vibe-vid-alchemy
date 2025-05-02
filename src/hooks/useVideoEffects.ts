
import { useRef, useEffect } from 'react';
import { VideoClip, TextOverlay } from '@/lib/video/types';

interface UseVideoEffectsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  currentTime: number;
  textOverlays: TextOverlay[];
  ratioConfig: { width: number; height: number };
  videoLoaded: boolean;
  greenScreenEnabled: boolean;
}

export const useVideoEffects = ({
  canvasRef,
  videoRef,
  currentTime,
  textOverlays,
  ratioConfig,
  videoLoaded,
  greenScreenEnabled
}: UseVideoEffectsProps) => {
  
  const lastRenderTimeRef = useRef<number>(0);
  
  // Render frame with effects
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const video = videoRef.current;
    
    if (!canvas || !ctx || !video) return;
    
    // Skip rendering if the time hasn't changed enough (optimization)
    if (Math.abs(currentTime - lastRenderTimeRef.current) < 0.05 && lastRenderTimeRef.current !== 0) {
      return;
    }
    
    lastRenderTimeRef.current = currentTime;
    
    // Apply current dimensions from aspect ratio
    canvas.width = ratioConfig.width;
    canvas.height = ratioConfig.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw video frame if video is loaded and has a valid src
    if (videoLoaded && video.readyState >= 2) {
      try {
        // Basic video rendering
        if (!greenScreenEnabled) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        } 
        // Green screen processing
        else {
          // Get video frame data
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = video.videoWidth;
          tempCanvas.height = video.videoHeight;
          const tempCtx = tempCanvas.getContext('2d');
          
          if (tempCtx) {
            tempCtx.drawImage(video, 0, 0);
            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imageData.data;
            
            // Simple green screen removal (RGB values threshold)
            for (let i = 0; i < data.length; i += 4) {
              // If green component is dominant, make it transparent
              const r = data[i];
              const g = data[i+1];
              const b = data[i+2];
              
              // Adjust these values for different green screen sensitivity
              if (g > 100 && g > r * 1.5 && g > b * 1.5) {
                data[i+3] = 0; // Set alpha to transparent
              }
            }
            
            tempCtx.putImageData(imageData, 0, 0);
            ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
          }
        }
        
        // Draw text overlays
        textOverlays.forEach(overlay => {
          if (currentTime >= overlay.startTime && currentTime <= overlay.endTime) {
            ctx.fillStyle = overlay.style.color;
            ctx.font = `${overlay.style.fontSize}px ${overlay.style.fontFamily}`;
            ctx.fillText(overlay.text, overlay.position.x, overlay.position.y);
          }
        });
      } catch (err) {
        console.error("Canvas drawing error:", err);
      }
    }
  }, [currentTime, textOverlays, ratioConfig.width, ratioConfig.height, videoLoaded, greenScreenEnabled, canvasRef, videoRef]);

  return null;
};

export default useVideoEffects;
