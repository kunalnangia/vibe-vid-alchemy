import React, { useState } from 'react';
import { toast } from "sonner";
import { AppSidebar } from './AppSidebar';
import VideoToolbar from './VideoToolbar';
import SidebarPanels from './SidebarPanels';
import GreenScreenPanel from './GreenScreenPanel';
import CollaborationPanel from './CollaborationPanel';
import SocialExportPanel from './SocialExportPanel';
import VideoPlayer from './VideoPlayer';
import UploadSection from './UploadSection';
import ScriptIdeaSection from './ScriptIdeaSection';
import AnalyticsSection from './AnalyticsSection';
import VideoPreviewPlaceholder from './VideoPreviewPlaceholder';
import EditorRightSidebar from './EditorRightSidebar';

const VideoEditor: React.FC = () => {
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
  
  const renderTool = () => {
    switch (activeTool) {
      case "greenscreen":
        return <GreenScreenPanel />;
      case "collaborate":
        return <CollaborationPanel />;
      case "export":
        return <SocialExportPanel />;
      default:
        return null;
    }
  };
  
  return (
    <>
      <AppSidebar />
      
      <div className="flex flex-1 p-6">
        <div className="flex-1 pr-4 space-y-6">
          {/* Top buttons */}
          <UploadSection 
            handleUpload={handleUpload}
            handleRecord={handleRecord}
          />
          
          {/* Script Idea section */}
          <ScriptIdeaSection
            scriptIdea={scriptIdea}
            setScriptIdea={setScriptIdea}
          />

          {/* Video Toolbar */}
          <VideoToolbar 
            onSplit={handleSplitClip}
            onExport={handleExport}
            hasSelectedClip={!!selectedClipId}
          />
          
          {/* Video preview box (placeholder) */}
          <VideoPreviewPlaceholder />
          
          {/* Video progress slider */}
          <VideoPlayer
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            handlePlay={handlePlay}
            handleSliderChange={handleSliderChange}
          />
          
          {/* Tool Panel Area */}
          {renderTool()}
          
          {/* Analytics section */}
          <AnalyticsSection
            views={views}
            clicks={clicks}
            handleDownloadAnalytics={handleDownloadAnalytics}
          />
        </div>
        
        {/* Right sidebar */}
        <EditorRightSidebar
          videoTitle={videoTitle}
          setVideoTitle={setVideoTitle}
          handleTrimVideo={handleTrimVideo}
          handleCropFrame={handleCropFrame}
          handleInsertToken={handleInsertToken}
          handleConnectCRM={handleConnectCRM}
          handleConnectSalesforce={handleConnectSalesforce}
          handlePublishLanding={handlePublishLanding}
        />
      </div>

      {/* SidebarPanels component needs to be included to keep functionality */}
      <div className="hidden">
        <SidebarPanels
          handleFileUpload={handleFileUpload}
          addTextOverlay={addTextOverlay}
          selectedOverlayId={selectedOverlayId}
          textOverlays={textOverlays}
          onUpdateOverlay={updateTextOverlay}
          selectedClipId={selectedClipId}
          setSelectedClipId={setSelectedClipId}
          clips={clips}
        />
      </div>
    </>
  );
};

export default VideoEditor;
