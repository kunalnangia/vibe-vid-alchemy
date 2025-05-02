
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export const useBasicActions = () => {
  const [videoTitle, setVideoTitle] = useState<string>("Untitled Video");
  const [scriptIdea, setScriptIdea] = useState<string>("");
  const [views, setViews] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  
  // Generate random analytics data when the component mounts
  useEffect(() => {
    setViews(Math.floor(Math.random() * 1000) + 100);
    setClicks(Math.floor(Math.random() * 200) + 50);
  }, []);
  
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

      // Create and download a sample CSV file
      const csvContent = 
        "Date,Views,Clicks,Engagement\n" +
        "2025-04-01,120,45,38%\n" +
        "2025-04-02,143,52,36%\n" +
        "2025-04-03,186,68,37%\n" +
        "2025-04-04,210,82,39%\n" +
        "2025-04-05,235,91,39%\n";
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'video_analytics.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
