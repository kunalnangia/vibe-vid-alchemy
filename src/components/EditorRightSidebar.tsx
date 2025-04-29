
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Crop, Scissors, Video } from "lucide-react";
import { ConnectCrm, ConnectSalesforce, InsertToken } from "@/components/ui/lucide-icons";

interface EditorRightSidebarProps {
  videoTitle: string;
  setVideoTitle: (value: string) => void;
  handleTrimVideo: () => void;
  handleCropFrame: () => void;
  handleInsertToken: () => void;
  handleConnectCRM: () => void;
  handleConnectSalesforce: () => void;
  handlePublishLanding: () => void;
}

const EditorRightSidebar: React.FC<EditorRightSidebarProps> = ({
  videoTitle,
  setVideoTitle,
  handleTrimVideo,
  handleCropFrame,
  handleInsertToken,
  handleConnectCRM,
  handleConnectSalesforce,
  handlePublishLanding
}) => {
  return (
    <div className="w-[400px]">
      <h2 className="text-3xl font-bold mb-6">EDIT VIDEO</h2>
      
      <div className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full py-6 text-lg justify-start px-6 bg-gray-100 hover:bg-gray-200"
          onClick={handleTrimVideo}
        >
          <Scissors className="mr-3 h-5 w-5" />
          Trim Video
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full py-6 text-lg justify-start px-6 bg-gray-100 hover:bg-gray-200"
          onClick={handleCropFrame}
        >
          <Crop className="mr-3 h-5 w-5" />
          Crop Frame
        </Button>
      </div>
      
      <h2 className="text-3xl font-bold mt-10 mb-6">PERSONALIZATION</h2>
      
      <div className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full py-6 text-lg justify-start px-6 bg-gray-100 hover:bg-gray-200"
          onClick={handleInsertToken}
        >
          <InsertToken className="mr-3 h-5 w-5" />
          Insert Token
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full py-6 text-lg justify-start px-6 bg-gray-100 hover:bg-gray-200"
          onClick={handleConnectCRM}
        >
          <ConnectCrm className="mr-3 h-5 w-5" />
          Connect CRM
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full py-6 text-lg justify-start px-6 bg-gray-100 hover:bg-gray-200"
          onClick={handleConnectSalesforce}
        >
          <ConnectSalesforce className="mr-3 h-5 w-5" />
          Connect Salesforce
        </Button>
      </div>
      
      <h2 className="text-3xl font-bold mt-10 mb-6">VIDEO ANALYTICS</h2>
      
      <div className="space-y-4">
        <Input
          className="py-6 text-lg bg-gray-100"
          placeholder="Video Title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />
        
        <Button 
          variant="outline" 
          className="w-full py-6 text-lg justify-center px-6 bg-gray-100 hover:bg-gray-200"
          onClick={handlePublishLanding}
        >
          <Video className="mr-3 h-5 w-5" />
          Publish & Generate Landing Page
        </Button>
      </div>
    </div>
  );
};

export default EditorRightSidebar;
