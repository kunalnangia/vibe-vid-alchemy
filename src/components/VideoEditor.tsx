import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { Play, Upload, Scissors, Video, Download, Crop } from "lucide-react";
import { Record, InsertToken, ConnectCrm, ConnectSalesforce } from "@/components/ui/lucide-icons";
import { AppSidebar } from './AppSidebar';

const VideoEditor: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(25); // 25 seconds for example
  const [scriptIdea, setScriptIdea] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [views, setViews] = useState(0);
  const [clicks, setClicks] = useState(0);
  
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
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleTrimVideo = () => {
    toast.info("Trim Video feature clicked");
  };
  
  const handleCropFrame = () => {
    toast.info("Crop Frame feature clicked");
  };
  
  const handleInsertToken = () => {
    toast.info("Insert Token feature clicked");
  };
  
  const handleConnectCRM = () => {
    toast.info("Connect CRM feature clicked");
  };
  
  const handleConnectSalesforce = () => {
    toast.info("Connect Salesforce feature clicked");
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
  
  return (
    <>
      <AppSidebar />
      
      <div className="flex flex-1 p-6">
        <div className="flex-1 pr-4 space-y-6">
          {/* Top buttons */}
          <div className="flex space-x-4">
            <Button 
              className="px-8 py-6 text-lg bg-gray-100 hover:bg-gray-200 text-gray-800" 
              variant="outline"
              onClick={handleUpload}
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Video
            </Button>
            
            <Button 
              className="px-8 py-6 text-lg bg-gray-100 hover:bg-gray-200 text-gray-800" 
              variant="outline"
              onClick={handleRecord}
            >
              <Record className="mr-2 h-5 w-5" />
              Record Video
            </Button>
          </div>
          
          {/* Script Idea section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Script Idea</h2>
            <Input
              className="py-6 text-lg bg-gray-100"
              placeholder="Script Idea"
              value={scriptIdea}
              onChange={(e) => setScriptIdea(e.target.value)}
            />
          </div>
          
          {/* Video preview box (placeholder) */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-200 h-24 rounded-md"></div>
            <div className="bg-gray-200 h-24 rounded-md"></div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
              <div className="bg-gray-200 rounded-md"></div>
              <div className="bg-gray-200 rounded-md"></div>
              <div className="bg-gray-200 rounded-md"></div>
              <div className="bg-gray-200 rounded-md"></div>
            </div>
          </div>
          
          {/* Video progress slider */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                className="mr-2"
                onClick={handlePlay}
              >
                <Play className="h-6 w-6" />
              </Button>
              <span>{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                className="mx-4 flex-1"
                onValueChange={handleSliderChange}
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Analytics section */}
          <div className="bg-gray-100 p-6 rounded-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xl">Views: {views}</span>
              <div className="h-2 bg-gray-300 rounded-full w-72"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xl">Clicks: {clicks}</span>
              <div className="h-2 bg-gray-300 rounded-full w-72"></div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full py-6 text-lg bg-white hover:bg-gray-50"
              onClick={handleDownloadAnalytics}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Analytics Report
            </Button>
          </div>
        </div>
        
        {/* Right sidebar */}
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
      </div>
    </>
  );
};

export default VideoEditor;
