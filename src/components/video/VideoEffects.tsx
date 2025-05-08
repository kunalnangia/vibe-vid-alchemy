
import React, { useEffect, useRef } from 'react';

interface VideoEffectsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isLoaded: boolean;
  greenScreenEnabled: boolean;
  cropSettings?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  currentFilter: string;
}

const VideoEffects: React.FC<VideoEffectsProps> = ({
  videoRef,
  canvasRef,
  isLoaded,
  greenScreenEnabled,
  cropSettings,
  currentFilter
}) => {
  // Apply video effects using canvas
  useEffect(() => {
    if (!isLoaded || !videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Apply crop if specified
    const drawVideo = () => {
      if (!ctx || !video) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply green screen effect if enabled
      if (greenScreenEnabled) {
        // Draw video to temp canvas for pixel manipulation
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = video.videoWidth;
        tempCanvas.height = video.videoHeight;
        const tempCtx = tempCanvas.getContext('2d');
        
        if (tempCtx) {
          tempCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
          const data = imageData.data;
          
          // Simple green screen removal
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // If pixel is green-ish, make transparent
            if (g > 100 && g > r * 1.2 && g > b * 1.2) {
              data[i + 3] = 0; // Set alpha to transparent
            }
          }
          
          tempCtx.putImageData(imageData, 0, 0);
          ctx.drawImage(tempCanvas, 0, 0);
        }
      } else {
        // Regular drawing (with crop if specified)
        if (cropSettings) {
          ctx.drawImage(
            video,
            cropSettings.x, cropSettings.y, cropSettings.width, cropSettings.height,
            0, 0, canvas.width, canvas.height
          );
        } else {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      }
      
      // Apply filters
      if (currentFilter !== 'normal') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Apply different filters based on filter name
        if (currentFilter === 'grayscale') {
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;     // R
            data[i + 1] = avg; // G
            data[i + 2] = avg; // B
          }
        } else if (currentFilter === 'sepia') {
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
            data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
            data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
      }
      
      requestAnimationFrame(drawVideo);
    };
    
    const animationId = requestAnimationFrame(drawVideo);
    
    return () => cancelAnimationFrame(animationId);
  }, [isLoaded, videoRef, canvasRef, greenScreenEnabled, cropSettings, currentFilter]);
  
  return null;
};

export default VideoEffects;
