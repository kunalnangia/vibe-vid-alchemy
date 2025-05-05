
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface VideoTroubleshooterProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoLoaded: boolean;
  clips: any[];
  onRetry: () => void;
}

const VideoTroubleshooter: React.FC<VideoTroubleshooterProps> = ({
  videoRef,
  videoLoaded,
  clips,
  onRetry
}) => {
  const [diagnostics, setDiagnostics] = useState<{
    browserInfo: string;
    videoInfo: string;
    errors: string[];
    suggestions: string[];
  }>({
    browserInfo: navigator.userAgent,
    videoInfo: "No video loaded",
    errors: [],
    suggestions: []
  });

  useEffect(() => {
    if (!clips.length) return;
    
    const errors: string[] = [];
    const suggestions: string[] = [];
    let videoInfo = "Unknown video format";
    
    // Collect diagnostic information
    try {
      const video = videoRef.current;
      const clip = clips[0];
      
      videoInfo = `${clip.name} (${clip.type}, ${Math.round(clip.duration)}s)`;
      
      if (!video) {
        errors.push("Video element not found");
        suggestions.push("Refresh the page and try again");
      } else {
        // Check video element state
        if (video.error) {
          errors.push(`Video error: ${video.error.message || video.error.code}`);
          
          // Provide specific suggestions based on error
          if (video.error.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
            errors.push("The video format is not supported by your browser");
            suggestions.push("Try converting your video to MP4 format");
            suggestions.push("Try using Chrome or Firefox with the latest updates");
          } else if (video.error.code === MediaError.MEDIA_ERR_NETWORK) {
            errors.push("Network error loading the video");
            suggestions.push("Check your internet connection");
          }
        }
        
        // Check readyState
        if (video.readyState < 2) { // HAVE_CURRENT_DATA or less
          errors.push(`Video not ready (state: ${video.readyState})`);
          suggestions.push("Wait for the video to load or try a different format");
        }
      }
      
      // Check source validity
      const clip = clips[0];
      if (!clip.file && (!clip.src || !clip.src.startsWith('blob:'))) {
        errors.push("Video source may be invalid");
        suggestions.push("Try re-uploading the video");
      }
      
      // If no specific errors found but video still not playing
      if (errors.length === 0 && !videoLoaded) {
        errors.push("Video loaded but not playing");
        suggestions.push("Try a different video format like MP4");
        suggestions.push("Try clearing your browser cache and reloading");
      }
      
      // Always suggest retrying as a last resort
      if (errors.length > 0 && !suggestions.includes("Try re-uploading the video")) {
        suggestions.push("Try re-uploading the video");
      }
    } catch (err) {
      errors.push(`Diagnostic error: ${err instanceof Error ? err.message : String(err)}`);
      suggestions.push("Refresh the page and try again");
    }
    
    // Update diagnostics
    setDiagnostics({
      browserInfo: navigator.userAgent,
      videoInfo,
      errors,
      suggestions
    });
    
  }, [clips, videoRef, videoLoaded]);
  
  const handleCopyDiagnostics = () => {
    const diagText = `
Video Troubleshooting:
---------------------
Browser: ${diagnostics.browserInfo}
Video: ${diagnostics.videoInfo}
Errors: ${diagnostics.errors.join(', ') || 'None'}
    `;
    
    navigator.clipboard.writeText(diagText)
      .then(() => toast.success("Diagnostic info copied to clipboard"))
      .catch(() => toast.error("Could not copy to clipboard"));
  };

  return (
    <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
      <h3 className="font-medium text-red-700 mb-2">Video Playback Issues</h3>
      
      {diagnostics.errors.length > 0 ? (
        <>
          <ul className="list-disc pl-5 mb-3 text-sm text-red-600">
            {diagnostics.errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
          
          {diagnostics.suggestions.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700">Suggestions:</p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {diagnostics.suggestions.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-600 mb-3">
          Running diagnostics on video playback...
        </p>
      )}
      
      <div className="flex gap-2 mt-2">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onRetry}
        >
          Retry Playback
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleCopyDiagnostics}
        >
          Copy Diagnostic Info
        </Button>
      </div>
    </div>
  );
};

export default VideoTroubleshooter;
