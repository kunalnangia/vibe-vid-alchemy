
import React from 'react';
import useVideoPlayer from '@/hooks/useVideoPlayer';
import VideoTroubleshooter from './VideoTroubleshooter';
import VideoLoadingOverlay from './VideoLoadingOverlay';
import VideoPlayOverlay from './VideoPlayOverlay';
import NoVideoState from './NoVideoState';

interface DirectVideoPlayerProps {
  src: string | File | null;
  autoPlay?: boolean;
  muted?: boolean;
  onLoadedMetadata?: (duration: number) => void;
  onError?: (error: any) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const DirectVideoPlayer: React.FC<DirectVideoPlayerProps> = ({
  src,
  autoPlay = false,
  muted = false,
  onLoadedMetadata,
  onError,
  onPlayStateChange
}) => {
  const {
    videoRef,
    isPlaying,
    isLoaded,
    hasError,
    errorDetails,
    handleTogglePlay,
    handlePlay,
    handleRetry
  } = useVideoPlayer({
    src,
    autoPlay,
    muted,
    onLoadedMetadata,
    onError,
    onPlayStateChange
  });

  return (
    <div className="direct-video-player relative w-full">
      {/* Main video element */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          playsInline
          muted={muted}
          onClick={handleTogglePlay}
          controls={isLoaded && !hasError}
        />
        
        {/* Loading overlay */}
        {src && !isLoaded && !hasError && <VideoLoadingOverlay />}
        
        {/* No video state */}
        {!src && <NoVideoState />}
        
        {/* Play/Pause button overlay (only show when video is paused) */}
        {isLoaded && !hasError && !isPlaying && (
          <VideoPlayOverlay onClick={handleTogglePlay} />
        )}
      </div>
      
      {/* Error state and troubleshooter */}
      {hasError && (
        <div className="mt-4">
          <VideoTroubleshooter 
            videoRef={videoRef}
            videoLoaded={isLoaded}
            clips={[{ 
              name: src instanceof File ? src.name : "Video", 
              type: src instanceof File ? src.type : typeof src === 'string' ? src : "",
              duration: videoRef.current?.duration || 0 
            }]}
            onRetry={handleRetry}
          />
        </div>
      )}
    </div>
  );
};

export default DirectVideoPlayer;
