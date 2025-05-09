
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ReliableVideoUploader from './ReliableVideoUploader';
import DirectVideoPlayer from './video/DirectVideoPlayer';
import VideoPlayer from './VideoPlayer';
import VideoControlsHeader from './video/VideoControlsHeader';
import EmptyVideoState from './video/EmptyVideoState';

const VideoPlaybackApp: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [chromaKeyEnabled, setChromaKeyEnabled] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Handle file upload
  const handleFileUpload = (file: File) => {
    // Create blob URL for video player
    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoSrc(url);
    setCurrentTime(0);
    setIsPlaying(false);
    
    console.log(`Video file uploaded: ${file.name}, size: ${Math.round(file.size / 1024)}KB, type: ${file.type}`);
    toast.success(`Video "${file.name}" uploaded successfully`);
  };
  
  // Handle metadata loaded
  const handleMetadataLoaded = (duration: number) => {
    setVideoDuration(duration);
    console.log(`Video metadata loaded. Duration: ${duration}s`);
  };
  
  // Toggle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Handle time update
  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };
  
  // Clean up blob URL when component unmounts or video changes
  useEffect(() => {
    return () => {
      if (videoSrc && videoSrc.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrc);
        console.log("Cleaned up blob URL");
      }
    };
  }, [videoSrc]);
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-center">Video Player Demo</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Upload a Video</h3>
        <ReliableVideoUploader
          onFileSelected={handleFileUpload}
          maxSizeMB={100}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">DirectVideoPlayer</h3>
          <div className="rounded-lg overflow-hidden bg-gray-100 relative">
            <VideoControlsHeader 
              onToggleControls={() => setShowControls(!showControls)}
              onToggleChromaKey={() => setChromaKeyEnabled(!chromaKeyEnabled)}
              onToggleCaptions={() => setCaptionsEnabled(!captionsEnabled)}
              onToggleAudio={() => setAudioEnabled(!audioEnabled)}
            />
            
            <div className="aspect-video relative bg-black rounded-lg">
              {!videoSrc && <EmptyVideoState />}
              
              <DirectVideoPlayer
                src={videoFile || videoSrc}
                muted={!audioEnabled}
                onLoadedMetadata={handleMetadataLoaded}
                onPlayStateChange={(isPlaying) => {
                  console.log(`DirectVideoPlayer playback state: ${isPlaying ? 'playing' : 'paused'}`);
                }}
                greenScreenEnabled={chromaKeyEnabled}
                autoCaptionsEnabled={captionsEnabled}
              />
            </div>
            
            <div className="text-xs text-center mt-1 text-gray-500">
              ↕ landscape
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">VideoPlayer with Controls</h3>
          <div className="rounded-lg overflow-hidden bg-gray-100">
            <div className="aspect-video relative bg-gray-900 rounded-lg">
              {!videoSrc && <EmptyVideoState />}
              
              <VideoPlayer
                videoSrc={videoSrc}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={videoDuration}
                onPlayPause={handlePlayPause}
                onTimeUpdate={handleTimeUpdate}
              />
            </div>
            
            <div className="flex justify-end mt-2">
              <button className="px-4 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Use Custom Controls
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800">Video Information</h3>
        {videoFile ? (
          <ul className="mt-2 space-y-1 text-sm">
            <li><strong>File name:</strong> {videoFile.name}</li>
            <li><strong>File type:</strong> {videoFile.type}</li>
            <li><strong>File size:</strong> {Math.round(videoFile.size / 1024)} KB</li>
            <li><strong>Duration:</strong> {videoDuration.toFixed(2)} seconds</li>
          </ul>
        ) : (
          <p className="text-sm text-blue-600 mt-2">No video uploaded yet</p>
        )}
      </div>
    </div>
  );
};

export default VideoPlaybackApp;
