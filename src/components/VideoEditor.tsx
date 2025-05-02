
import React from 'react';
import { toast } from 'sonner';
import VideoEditorLayout from './editor/VideoEditorLayout';
import useVideoState from '@/hooks/useVideoState';

const VideoEditor: React.FC = () => {
  const videoState = useVideoState();
  
  // Notify user when component has fully loaded - improves user experience
  React.useEffect(() => {
    toast.success('Video editor ready', {
      description: 'All features loaded successfully',
      duration: 3000
    });
  }, []);
  
  return <VideoEditorLayout videoState={videoState} />;
};

export default VideoEditor;
