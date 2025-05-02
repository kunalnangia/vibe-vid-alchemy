
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

  return {
    videoTitle,
    setVideoTitle,
    scriptIdea,
    setScriptIdea,
    views,
    clicks,
    handleExport,
    handleDownloadAnalytics
  };
};

export default useBasicActions;
