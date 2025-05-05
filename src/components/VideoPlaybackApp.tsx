
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ReliableVideoUploader from './ReliableVideoUploader';
import DirectVideoPlayer from './video/DirectVideoPlayer';
import VideoPlayer from './VideoPlayer';
import VideoConverter from './video/VideoConverter';

const VideoPlaybackApp: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [formatWarning, setFormatWarning] = useState(false);

  // Handle file upload
  const handleFileUpload = (file: File) => {
    // Create blob URL for video player
    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoSrc(url);
    setCurrentTime(0);
    setIsPlaying(false);
    
    console.log(`Video file uploaded: ${file.name}, size: ${Math.round(file.size / 1024)}KB, type: ${file.type}`);
    
    // Check if this is not a common web video format
    if (file.type !== 'video/mp4' && file.type !== 'video/webm' && file.type !== 'video/ogg') {
      setFormatWarning(true);
      toast.warning(`Video format ${file.type} might have limited browser support`);
    } else {
      setFormatWarning(false);
    }
  };
  
  // Handle metadata loaded
  const handleMetadataLoaded = (duration: number) => {
    setVideoDuration(duration);
    console.log(`Video metadata loaded. Duration: ${duration}s`);
    toast.success(`Video loaded successfully (${Math.round(duration)}s)`);
  };
  
  // Toggle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Handle time update
  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };
  
  // Handle format conversion
  const handleFormatConversion = (convertedFile: File) => {
    // Clean up old blob URL
    if (videoSrc && videoSrc.startsWith('blob:')) {
      URL.revokeObjectURL(videoSrc);
    }
    
    // Create new blob URL
    const url = URL.createObjectURL(convertedFile);
    setVideoFile(convertedFile);
    setVideoSrc(url);
    setFormatWarning(false);
    setCurrentTime(0);
    
    console.log(`Video converted to: ${convertedFile.type}`);
  };
  
  // Clear blob URL when component unmounts or video changes
  useEffect(() => {
    return () => {
      if (videoSrc && videoSrc.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrc);
        console.log("Cleaned up blob URL");
      }
    };
  }, [videoSrc]);
  
  return (
    <div className="container max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Video Player Demo</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload a Video</h2>
        <ReliableVideoUploader
          onFileSelected={handleFileUpload}
          maxSizeMB={100}
        />
      </div>
      
      {formatWarning && videoFile && (
        <div className="mb-6">
          <VideoConverter 
            file={videoFile}
            onConversionComplete={handleFormatConversion}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">DirectVideoPlayer</h2>
          <DirectVideoPlayer
            src={videoFile || videoSrc}
            muted={false}
            onLoadedMetadata={handleMetadataLoaded}
            onPlayStateChange={(isPlaying) => {
              console.log(`DirectVideoPlayer playback state: ${isPlaying ? 'playing' : 'paused'}`);
              toast.info(`Video ${isPlaying ? 'playing' : 'paused'}`);
            }}
            onError={(error) => {
              console.error("DirectVideoPlayer error:", error);
            }}
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">VideoPlayer with Controls</h2>
          <VideoPlayer
            videoSrc={videoSrc}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={videoDuration}
            onPlayPause={handlePlayPause}
            onTimeUpdate={handleTimeUpdate}
          />
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
