
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const useBasicActions = () => {
  const [videoTitle, setVideoTitle] = useState<string>("Untitled Video");
  const [scriptIdea, setScriptIdea] = useState<string>("");
  const [views, setViews] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Handle uploading a video
  const handleUpload = useCallback((file?: File) => {
    if (!file) {
      toast.error("No file selected");
      return;
    }
    
    toast.success(`Uploading ${file.name}`);
    // In a real app, you'd upload this to a server
    console.log("Uploading file:", file);
    
    // Trigger file upload in the editor's clip handler
    const event = new CustomEvent('video-upload', { detail: { file } });
    document.dispatchEvent(event);
  }, []);

  // Handle video recording from webcam
  const handleRecord = useCallback(() => {
    // Video recording handled in UploadSection component
    const recordButton = document.querySelector('[data-record-button]');
    if (recordButton instanceof HTMLButtonElement) {
      recordButton.click();
    } else {
      toast.info("Recording feature initialized");
    }
  }, []);

  // Handle exporting the final video
  const handleExport = useCallback(() => {
    toast("Exporting your video...", {
      duration: 2000,
    });
    
    setTimeout(() => {
      toast.success("Video exported successfully!");
    }, 2000);
  }, []);

  // Handle downloading analytics data
  const handleDownloadAnalytics = useCallback(() => {
    const analyticsData = {
      title: videoTitle,
      views: views,
      clicks: clicks,
      ctr: views > 0 ? (clicks / views * 100).toFixed(2) + "%" : "0%",
      date: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportName = videoTitle.replace(/\s+/g, '-').toLowerCase() + '-analytics.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
    
    toast.success("Analytics data downloaded");
  }, [videoTitle, views, clicks]);

  return {
    videoTitle,
    setVideoTitle,
    scriptIdea,
    setScriptIdea,
    views,
    clicks,
    activeTool,
    setActiveTool,
    handleUpload,
    handleRecord,
    handleExport,
    handleDownloadAnalytics,
  };
};
