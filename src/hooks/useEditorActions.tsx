import { useState } from 'react';
import { toast } from "sonner";

interface UseEditorActionsReturn {
  videoTitle: string;
  setVideoTitle: (title: string) => void;
  scriptIdea: string;
  setScriptIdea: (idea: string) => void;
  views: number;
  clicks: number;
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
  handleUpload: (file?: File) => void;
  handleRecord: () => void;
  handleTrimVideo: () => void;
  handleCropFrame: () => void;
  handleInsertToken: () => void;
  handleConnectCRM: () => void;
  handleConnectSalesforce: () => void;
  handleExport: () => void;
  handlePublishLanding: () => void;
  handleDownloadAnalytics: () => void;
}

export const useEditorActions = (): UseEditorActionsReturn => {
  const [videoTitle, setVideoTitle] = useState("");
  const [scriptIdea, setScriptIdea] = useState("");
  const [views] = useState(0);
  const [clicks] = useState(0);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  const handleUpload = (file?: File) => {
    if (file) {
      // If a file was passed, we're dealing with an actual upload
      const fileSizeMB = file.size / (1024 * 1024);
      const maxSize = 100; // 100MB max size
      
      if (fileSizeMB > maxSize) {
        toast.error(`File is too large. Maximum size is ${maxSize}MB.`);
        return;
      }
      
      toast.success(`Uploaded video: ${file.name}`);
      
      // In a real implementation, we would:
      // 1. Upload to storage or process the file
      // 2. Create a video clip object
      console.log('Video file selected:', file.name, file.size, 'bytes');
    } else {
      // This is just the button click without a file
      toast.info("Please select a video file");
    }
  };
  
  const handleRecord = () => {
    // Request camera and microphone permissions
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        toast.success("Camera and microphone access granted. Recording would start here.");
        // In a real implementation:
        // 1. Create a MediaRecorder instance
        // 2. Start recording and save the video
        
        // Stop all tracks to release the camera and microphone
        stream.getTracks().forEach(track => track.stop());
      })
      .catch(err => {
        console.error("Error accessing camera/microphone:", err);
        toast.error("Could not access camera or microphone. Please check permissions.");
      });
  };
  
  const handleTrimVideo = () => {
    toast.info("Trim Video feature clicked");
    setActiveTool("trim");
  };
  
  const handleCropFrame = () => {
    toast.info("Crop Frame feature clicked");
    setActiveTool("crop");
  };
  
  const handleInsertToken = () => {
    toast.info("Insert Token feature clicked");
    setActiveTool("token");
  };
  
  const handleConnectCRM = () => {
    toast.info("Connect CRM feature clicked");
    setActiveTool("crm");
  };
  
  const handleConnectSalesforce = () => {
    toast.info("Connect Salesforce feature clicked");
    setActiveTool("salesforce");
  };
  
  const handleExport = () => {
    toast.success("Exporting video...");
  };
  
  const handlePublishLanding = () => {
    if (!videoTitle.trim()) {
      toast.error("Please enter a video title first");
      return;
    }
    toast.success(`Publishing "${videoTitle}" and generating landing page...`);
  };
  
  const handleDownloadAnalytics = () => {
    toast.success("Downloading analytics report...");
  };
  
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
    handleTrimVideo,
    handleCropFrame,
    handleInsertToken,
    handleConnectCRM,
    handleConnectSalesforce,
    handleExport,
    handlePublishLanding,
    handleDownloadAnalytics
  };
};
