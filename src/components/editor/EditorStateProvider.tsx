
import React, { useState } from 'react';
import { toast } from "sonner";

interface EditorState {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
  duration: number;
  scriptIdea: string;
  setScriptIdea: (scriptIdea: string) => void;
  videoTitle: string;
  setVideoTitle: (videoTitle: string) => void;
  views: number;
  clicks: number;
  selectedClipId: string | null;
  setSelectedClipId: (id: string | null) => void;
  textOverlays: any[];
  setTextOverlays: (overlays: any[]) => void;
  selectedOverlayId: string | null;
  setSelectedOverlayId: (id: string | null) => void;
  clips: any[];
  setClips: (clips: any[]) => void;
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
  handleUpload: () => void;
  handleRecord: () => void;
  handlePlay: () => void;
  handleSliderChange: (value: number[]) => void;
  handleTrimVideo: () => void;
  handleCropFrame: () => void;
  handleInsertToken: () => void;
  handleConnectCRM: () => void;
  handleConnectSalesforce: () => void;
  handleSplitClip: () => void;
  handleExport: () => void;
  handlePublishLanding: () => void;
  handleDownloadAnalytics: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTextOverlay: () => void;
  updateTextOverlay: (id: string, updates: any) => void;
}

interface EditorStateProviderProps {
  children: (state: EditorState) => React.ReactNode;
}

const EditorStateProvider: React.FC<EditorStateProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(25); // 25 seconds for example
  const [scriptIdea, setScriptIdea] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [views, setViews] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);
  const [textOverlays, setTextOverlays] = useState<any[]>([]);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);
  const [clips, setClips] = useState<any[]>([]);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  const handleUpload = () => {
    toast.info("Upload Video feature clicked");
  };
  
  const handleRecord = () => {
    toast.info("Record Video feature clicked");
  };
  
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? "Video paused" : "Video playing");
  };
  
  const handleSliderChange = (value: number[]) => {
    setCurrentTime(value[0]);
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
  
  const handleDownloadAnalytics = () => {
    toast.success("Downloading analytics report...");
  };
  
  const handlePublishLanding = () => {
    if (!videoTitle.trim()) {
      toast.error("Please enter a video title first");
      return;
    }
    toast.success(`Publishing "${videoTitle}" and generating landing page...`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      toast.success(`Uploaded file: ${file.name}`);
      
      // Add new clip to the timeline
      const newClip = {
        id: `clip-${Date.now()}`,
        name: file.name,
        duration: Math.random() * 20 + 5, // Random duration for example
        type: "video"
      };
      
      setClips([...clips, newClip]);
      setSelectedClipId(newClip.id);
    }
  };
  
  const addTextOverlay = () => {
    const newOverlay = {
      id: `text-${Date.now()}`,
      text: "New Text",
      position: { x: 100, y: 100 },
      style: {
        color: "#ffffff",
        fontSize: 24,
        fontFamily: "Arial"
      }
    };
    
    setTextOverlays([...textOverlays, newOverlay]);
    setSelectedOverlayId(newOverlay.id);
    toast.success("Text overlay added");
  };
  
  const updateTextOverlay = (id: string, updates: any) => {
    setTextOverlays(
      textOverlays.map(overlay => 
        overlay.id === id ? { ...overlay, ...updates } : overlay
      )
    );
  };
  
  const handleSplitClip = () => {
    if (selectedClipId) {
      toast.success("Clip split at current position");
    } else {
      toast.error("Please select a clip first");
    }
  };
  
  const handleExport = () => {
    toast.success("Exporting video...");
  };
  
  const state: EditorState = {
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    scriptIdea,
    setScriptIdea,
    videoTitle,
    setVideoTitle,
    views,
    clicks,
    selectedClipId,
    setSelectedClipId,
    textOverlays,
    setTextOverlays,
    selectedOverlayId,
    setSelectedOverlayId,
    clips,
    setClips,
    activeTool,
    setActiveTool,
    handleUpload,
    handleRecord,
    handlePlay,
    handleSliderChange,
    handleTrimVideo,
    handleCropFrame,
    handleInsertToken,
    handleConnectCRM,
    handleConnectSalesforce,
    handleSplitClip,
    handleExport,
    handlePublishLanding,
    handleDownloadAnalytics,
    handleFileUpload,
    addTextOverlay,
    updateTextOverlay
  };
  
  return <>{children(state)}</>;
};

export default EditorStateProvider;
