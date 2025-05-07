
import React from 'react';
import { AlertCircle, RefreshCw, FilmIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoTroubleshooterProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoLoaded: boolean;
  clips: {
    name: string;
    type: string;
    duration: number;
  }[];
  onRetry: () => void;
}

const VideoTroubleshooter: React.FC<VideoTroubleshooterProps> = ({
  videoRef,
  videoLoaded,
  clips,
  onRetry
}) => {
  const error = videoRef.current?.error;
  const errorCode = error ? error.code : 0;
  const errorMessage = error ? error.message : "Unknown error";
  
  const getSuggestedFix = () => {
    switch (errorCode) {
      case 1: // MEDIA_ERR_ABORTED
        return "The video playback was aborted. Try reloading the page.";
      case 2: // MEDIA_ERR_NETWORK
        return "A network error occurred. Check your internet connection and try again.";
      case 3: // MEDIA_ERR_DECODE
        return "The video format is not supported or the file may be corrupted. Try converting to MP4.";
      case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
        return "This video format is not supported by your browser. Try using Chrome or Firefox.";
      default:
        return "Try reloading the video or uploading a different file.";
    }
  };
  
  return (
    <div className="p-4 border border-red-200 bg-red-50 rounded-md">
      <div className="flex items-start mb-4">
        <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-medium text-red-800">Video playback error</h3>
          <p className="text-sm text-red-700 mt-1">{errorMessage || "Could not load the video"}</p>
        </div>
      </div>
      
      <div className="ml-9 mb-4">
        <h4 className="text-sm font-medium text-gray-700">Troubleshooting steps:</h4>
        <ul className="list-disc pl-5 text-sm text-gray-600 mt-2 space-y-1">
          <li>{getSuggestedFix()}</li>
          <li>Check that the video file is not corrupted</li>
          <li>Try a different video file to see if the issue persists</li>
        </ul>
      </div>
      
      <div className="ml-9">
        {clips.length > 0 && (
          <div className="text-xs text-gray-500 mb-3">
            <span className="font-medium">Video info:</span> {clips[0].name} ({clips[0].type})
          </div>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center" 
          onClick={onRetry}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry Video Load
        </Button>
      </div>
    </div>
  );
};

export default VideoTroubleshooter;
