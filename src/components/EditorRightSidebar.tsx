
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Crop, Scissors, Video, Wand2, Captions, Music, Filter, Share2, Layout } from "lucide-react";
import { ConnectCrm, ConnectSalesforce, InsertToken } from "@/components/ui/lucide-icons";
import MultiChannelRepurposePanel from './MultiChannelRepurposePanel';

interface EditorRightSidebarProps {
  videoTitle: string;
  setVideoTitle: (value: string) => void;
  handleTrimVideo: () => void;
  handleCropFrame: () => void;
  handleInsertToken: () => void;
  handleConnectCRM: () => void;
  handleConnectSalesforce: () => void;
  handlePublishLanding: () => void;
  handleAIEnhance: () => void;
  handleAutoCaption: () => void;
  handleGreenScreen: () => void;
  handleMagicResize: () => void;
}

const EditorRightSidebar: React.FC<EditorRightSidebarProps> = ({
  videoTitle,
  setVideoTitle,
  handleTrimVideo,
  handleCropFrame,
  handleInsertToken,
  handleConnectCRM,
  handleConnectSalesforce,
  handlePublishLanding,
  handleAIEnhance,
  handleAutoCaption,
  handleGreenScreen,
  handleMagicResize
}) => {
  const [showRepurposePanel, setShowRepurposePanel] = useState(false);
  
  return (
    <div className="w-[400px] bg-gradient-to-b from-purple-50 to-fuchsia-50 rounded-xl">
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">EDIT VIDEO</h2>
        
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg justify-start px-6 bg-white hover:bg-purple-100 border-purple-200"
            onClick={handleTrimVideo}
          >
            <Scissors className="mr-3 h-5 w-5 text-purple-700" />
            Trim Video
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg justify-start px-6 bg-white hover:bg-purple-100 border-purple-200"
            onClick={handleCropFrame}
          >
            <Crop className="mr-3 h-5 w-5 text-purple-700" />
            Crop Frame
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg justify-start px-6 bg-white hover:bg-purple-100 border-purple-200"
            onClick={handleGreenScreen}
          >
            <Video className="mr-3 h-5 w-5 text-purple-700" />
            Green Screen
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg justify-start px-6 bg-white hover:bg-purple-100 border-purple-200"
            onClick={handleMagicResize}
          >
            <Filter className="mr-3 h-5 w-5 text-purple-700" />
            Magic Resize
          </Button>

          <Button 
            variant="outline" 
            className="w-full py-6 text-lg justify-start px-6 bg-white hover:bg-purple-100 border-purple-200"
            onClick={handleAutoCaption}
          >
            <Captions className="mr-3 h-5 w-5 text-purple-700" />
            Auto Captions
          </Button>

          <Button 
            variant="outline" 
            className="w-full py-6 text-lg justify-start px-6 bg-white hover:bg-purple-100 border-purple-200"
            onClick={handleAIEnhance}
          >
            <Wand2 className="mr-3 h-5 w-5 text-purple-700" />
            Enhance with AI
          </Button>

          <Button 
            variant="outline" 
            className={`w-full py-6 text-lg justify-start px-6 hover:bg-purple-100 border-purple-200 ${
              showRepurposePanel ? "bg-purple-100" : "bg-white"
            }`}
            onClick={() => setShowRepurposePanel(!showRepurposePanel)}
          >
            <Layout className="mr-3 h-5 w-5 text-purple-700" />
            Multi-Channel Repurpose
          </Button>

          {/* Multi-Channel Repurpose Panel */}
          {showRepurposePanel && (
            <div className="bg-white border border-purple-100 rounded-lg p-4 mb-4">
              <MultiChannelRepurposePanel />
            </div>
          )}
        </div>
        
        <h2 className="text-3xl font-bold mt-10 mb-6 text-purple-800">PERSONALIZATION</h2>
        
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg justify-start px-6 bg-white hover:bg-purple-100 border-purple-200"
            onClick={handleInsertToken}
          >
            <InsertToken className="mr-3 h-5 w-5 text-purple-700" />
            Insert Token
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg justify-start px-6 bg-white hover:bg-purple-100 border-purple-200"
            onClick={handleConnectCRM}
          >
            <ConnectCrm className="mr-3 h-5 w-5 text-purple-700" />
            Connect CRM
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg justify-start px-6 bg-white hover:bg-purple-100 border-purple-200"
            onClick={handleConnectSalesforce}
          >
            <ConnectSalesforce className="mr-3 h-5 w-5 text-purple-700" />
            Connect Salesforce
          </Button>
        </div>
        
        <h2 className="text-3xl font-bold mt-10 mb-6 text-purple-800">VIDEO ANALYTICS</h2>
        
        <div className="space-y-4">
          <Input
            className="py-6 text-lg bg-white border-purple-200"
            placeholder="Video Title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg justify-center px-6 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white hover:from-purple-700 hover:to-fuchsia-600 border-none"
            onClick={handlePublishLanding}
          >
            <Share2 className="mr-3 h-5 w-5" />
            Publish & Generate Landing Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorRightSidebar;
