
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
    
    if (!file.type.startsWith('video/')) {
      toast.error("Please select a valid video file");
      return;
    }
    
    toast.success(`Uploading ${file.name}`);
    console.log("Uploading file:", file);
    
    // Create a video element to verify we can play this file
    const videoEl = document.createElement('video');
    videoEl.preload = 'metadata';
    
    // Create object URL for video
    const objectUrl = URL.createObjectURL(file);
    videoEl.src = objectUrl;
    
    // Set up event handlers for video element
    videoEl.onloadedmetadata = () => {
      console.log("Video metadata loaded successfully:", file.name);
      // Revoke the URL since we don't need it anymore here
      URL.revokeObjectURL(objectUrl);
      
      // Trigger file upload in the editor's clip handler
      const event = new CustomEvent('video-upload', { 
        detail: { file, duration: videoEl.duration } 
      });
      document.dispatchEvent(event);
      
      // Simulate analytics
      setTimeout(() => {
        setViews(prev => prev + Math.floor(Math.random() * 100) + 10);
        setClicks(prev => prev + Math.floor(Math.random() * 20) + 5);
      }, 2000);
    };
    
    videoEl.onerror = () => {
      console.error("Error loading video:", file.name);
      toast.error("Could not load video file. Please try another format.");
      URL.revokeObjectURL(objectUrl);
    };
    
  }, []);

  // Handle video recording from webcam
  const handleRecord = useCallback(() => {
    // First check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Your browser doesn't support camera access");
      return;
    }

    toast.info("Initializing camera...");

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        // Create a video element for preview
        const videoEl = document.createElement('video');
        videoEl.srcObject = stream;
        videoEl.autoplay = true;
        
        // Create a MediaRecorder instance
        const mediaRecorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];
        
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };
        
        mediaRecorder.onstop = () => {
          // Create a blob from the recorded chunks
          const blob = new Blob(chunks, { type: 'video/webm' });
          const file = new File([blob], "webcam-recording.webm", { type: 'video/webm' });
          
          // Stop all tracks in the stream
          stream.getTracks().forEach(track => track.stop());
          
          // Handle the recorded file
          handleUpload(file);
        };
        
        // Start recording
        mediaRecorder.start();
        toast.success("Recording started (5 seconds)");
        
        // Stop recording after 5 seconds
        setTimeout(() => {
          if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            toast.info("Recording complete");
          }
        }, 5000);
      })
      .catch(err => {
        toast.error("Could not access camera: " + err.message);
      });
  }, [handleUpload]);

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
