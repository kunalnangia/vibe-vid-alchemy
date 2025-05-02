
import { useState } from 'react';
import { toast } from 'sonner';

export const useBasicActions = () => {
  const [videoTitle, setVideoTitle] = useState('Untitled Video');
  const [scriptIdea, setScriptIdea] = useState('');
  const [views, setViews] = useState(0);
  const [clicks, setClicks] = useState(0);
  
  // For demo purposes, let's generate some random analytics data
  useState(() => {
    setViews(Math.floor(Math.random() * 1000) + 100);
    setClicks(Math.floor(Math.random() * 200) + 50);
  });
  
  // Handle export
  const handleExport = () => {
    toast.success('Preparing to export video...');
    
    setTimeout(() => {
      toast('Video exported successfully', {
        description: 'Your video is ready to download'
      });
    }, 2000);
  };
  
  // Handle download analytics
  const handleDownloadAnalytics = () => {
    toast.success('Generating analytics report...');
    
    setTimeout(() => {
      toast('Analytics exported', {
        description: 'Download has started'
      });
    }, 1500);
  };

  // Handle upload
  const handleUpload = (file?: File) => {
    if (file) {
      toast.success(`Uploading ${file.name}`);
      console.log("Uploading file:", file);
    } else {
      // Try to trigger file input click if no file is provided
      const fileInput = document.getElementById('upload-video') as HTMLInputElement;
      if (fileInput) {
        fileInput.click();
        return;
      }
      
      toast.error("No file selected");
    }
  };

  // Handle record
  const handleRecord = () => {
    toast.info('Opening camera for recording...');
    
    setTimeout(() => {
      toast('Recording started', {
        description: 'Recording for 5 seconds...'
      });
      
      // Simulate recording completion
      setTimeout(() => {
        toast.success('Recording complete');
      }, 5000);
    }, 1000);
  };

  return {
    videoTitle,
    setVideoTitle,
    scriptIdea,
    setScriptIdea,
    views,
    clicks,
    handleExport,
    handleDownloadAnalytics,
    handleUpload,
    handleRecord
  };
};

export default useBasicActions;
