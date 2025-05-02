
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
    
    // Handle any unhandled errors
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error);
      toast.error('An unexpected error occurred', {
        description: 'Please try again or refresh the page',
        duration: 5000
      });
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  return <VideoEditorLayout videoState={videoState} />;
};

export default VideoEditor;
