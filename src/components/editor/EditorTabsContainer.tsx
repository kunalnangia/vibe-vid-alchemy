import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Users, Share2 } from "lucide-react";

import TemplateMarketplacePanel from '../TemplateMarketplacePanel';
import CollaborationPanel from '../CollaborationPanel';
import SocialExportPanel from '../SocialExportPanel';
import EditorMainView from './EditorMainView';

interface EditorTabsContainerProps {
  videoTitle: string;
  setVideoTitle: (value: string) => void;
  scriptIdea: string;
  setScriptIdea: (value: string) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  currentTime: number;
  setCurrentTime: (value: number) => void;
  duration: number;
  views: number;
  clicks: number;
  selectedClipId: string | null;
  handleUpload: (file: File) => void;
  handleRecord: () => void;
  handlePlay: () => void;
  handleSliderChange: (value: number[]) => void;
  handleSplitClip: () => void;
  handleExport: () => void;
  handleDownloadAnalytics: () => void;
}

const EditorTabsContainer: React.FC<EditorTabsContainerProps> = ({
  videoTitle,
  setVideoTitle,
  scriptIdea,
  setScriptIdea,
  isPlaying,
  currentTime,
  duration,
  views,
  clicks,
  selectedClipId,
  handleUpload,
  handleRecord,
  handlePlay,
  handleSliderChange,
  handleSplitClip,
  handleExport,
  handleDownloadAnalytics
}) => {
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Set the appropriate tool based on the tab
    if (value === "marketplace") {
      setActiveTool("marketplace");
    } else if (value === "collaborate") {
      setActiveTool("collaborate");
    } else if (value === "export") {
      setActiveTool("export");
    } else {
      setActiveTool(null);
    }
  };
  
  return (
    <div className="flex-1 pr-4 space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-auto">
        <TabsList className="bg-blue-50 border border-blue-200">
          <TabsTrigger value="editor" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Editor
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <LayoutGrid className="w-4 h-4 mr-1" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="collaborate" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-1" />
            Collaborate
          </TabsTrigger>
          <TabsTrigger value="export" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <Share2 className="w-4 h-4 mr-1" />
            Export
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <EditorMainView 
            scriptIdea={scriptIdea}
            setScriptIdea={setScriptIdea}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            views={views}
            clicks={clicks}
            selectedClipId={selectedClipId}
            handleUpload={handleUpload}
            handleRecord={handleRecord}
            handlePlay={handlePlay}
            handleSliderChange={handleSliderChange}
            handleSplitClip={handleSplitClip}
            handleExport={handleExport}
            handleDownloadAnalytics={handleDownloadAnalytics}
          />
        </TabsContent>
        
        <TabsContent value="marketplace">
          <TemplateMarketplacePanel />
        </TabsContent>
        <TabsContent value="collaborate">
          <CollaborationPanel />
        </TabsContent>
        <TabsContent value="export">
          <SocialExportPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditorTabsContainer;
