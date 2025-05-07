
import React from 'react';
import { Maximize2, Subtitles, Video, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VideoStatusIndicatorsProps {
  aspectRatio?: string;
  greenScreenEnabled?: boolean;
  autoCaptionsEnabled?: boolean;
  isLoading?: boolean;
}

const VideoStatusIndicators: React.FC<VideoStatusIndicatorsProps> = ({
  aspectRatio = 'landscape',
  greenScreenEnabled = false,
  autoCaptionsEnabled = false,
  isLoading = false
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {isLoading && (
        <Badge variant="outline" className="flex items-center gap-1 bg-blue-50">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Processing</span>
        </Badge>
      )}
      
      <Badge variant="outline" className="flex items-center gap-1">
        <Maximize2 className="h-3 w-3" />
        <span>{aspectRatio}</span>
      </Badge>
      
      {greenScreenEnabled && (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1 border-green-200">
          <Video className="h-3 w-3" />
          <span>Chroma Key</span>
        </Badge>
      )}
      
      {autoCaptionsEnabled && (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-1 border-blue-200">
          <Subtitles className="h-3 w-3" />
          <span>Captions</span>
        </Badge>
      )}
    </div>
  );
};

export default VideoStatusIndicators;
