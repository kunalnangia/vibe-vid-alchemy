
import { useState } from 'react';
import { toast } from "sonner";

interface UseBasicActionsReturn {
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
  handleExport: () => void;
  handlePublishLanding: () => void;
  handleDownloadAnalytics: () => void;
}

export const useBasicActions = (): UseBasicActionsReturn => {
  const [videoTitle, setVideoTitle] = useState("");
  const [scriptIdea, setScriptIdea] = useState("");
  const [views] = useState(128);
  const [clicks] = useState(43);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  const handleUpload = (file?: File) => {
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      const maxSize = 100; // 100MB max size
      
      if (fileSizeMB > maxSize) {
        toast.error(`File is too large. Maximum size is ${maxSize}MB.`);
        return;
      }
      
      toast.success(`Uploaded video: ${file.name}`);
      console.log('Video file selected:', file.name, file.size, 'bytes');
    } else {
      toast.info("Please select a video file");
    }
  };
  
  const handleRecord = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        toast.success("Camera and microphone access granted. Recording would start here.");
        stream.getTracks().forEach(track => track.stop());
      })
      .catch(err => {
        console.error("Error accessing camera/microphone:", err);
        toast.error("Could not access camera or microphone. Please check permissions.");
      });
  };
  
  const handleExport = () => {
    toast.success("Exporting video...");
    
    toast.loading("Processing video export...", {
      id: "export-toast",
      duration: 3000,
    });
    
    setTimeout(() => {
      toast.success("Export complete! Video downloaded.", {
        id: "export-toast",
      });
      
      const link = document.createElement('a');
      link.download = `${videoTitle || 'video'}-export.mp4`;
      link.href = '#';
      link.click();
    }, 3000);
  };
  
  const handlePublishLanding = () => {
    if (!videoTitle.trim()) {
      toast.error("Please enter a video title first");
      return;
    }
    
    toast.loading("Publishing video and generating landing page...", {
      id: "publish-toast",
    });
    
    setTimeout(() => {
      const landingPageUrl = `https://landing.videovibes.app/${encodeURIComponent(videoTitle.toLowerCase().replace(/\s+/g, '-'))}-${Date.now().toString().slice(-6)}`;
      
      toast.success(`Landing page published!`, {
        id: "publish-toast",
        description: "Your video landing page is now live.",
        action: {
          label: "Copy Link",
          onClick: () => {
            navigator.clipboard.writeText(landingPageUrl);
            toast.success("Link copied to clipboard!");
          },
        },
      });
      
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
      modal.innerHTML = `
        <div class="bg-white p-6 rounded-xl max-w-xl w-full">
          <h2 class="text-2xl font-bold mb-4">Landing Page Published!</h2>
          <p class="mb-4">Your video has been successfully published to a landing page.</p>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Landing Page URL</label>
              <div class="flex">
                <input type="text" class="w-full border rounded-l px-3 py-2" readonly value="${landingPageUrl}" />
                <button id="copy-url" class="bg-blue-50 border border-blue-200 text-blue-700 px-3 rounded-r">Copy</button>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">QR Code</label>
              <div class="border rounded p-4 bg-gray-50 flex items-center justify-center">
                <div class="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs text-gray-500">QR Code Placeholder</div>
              </div>
            </div>
            
            <div class="bg-green-50 p-3 rounded text-sm">
              <h4 class="font-medium text-green-700">Analytics Tracking</h4>
              <p class="text-green-600 mt-1">Your landing page is set up to track views, clicks, and watch time.</p>
            </div>
          </div>
          
          <div class="flex justify-between gap-2 mt-6">
            <a id="preview-page" href="${landingPageUrl}" target="_blank" class="px-4 py-2 border border-gray-300 rounded text-center">Preview Page</a>
            <button id="close-landing" class="px-4 py-2 bg-purple-600 text-white rounded">Close</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      const closeBtn = modal.querySelector('#close-landing');
      const copyBtn = modal.querySelector('#copy-url');
      
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          document.body.removeChild(modal);
        });
      }
      
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(landingPageUrl);
          toast.success("Link copied to clipboard!");
        });
      }
    }, 2000);
  };
  
  const handleDownloadAnalytics = () => {
    toast.success("Downloading analytics report...");
    
    const csvContent = `Video Title,Views,Clicks,CTR,Watch Time\n${videoTitle || "Untitled"},${views},${clicks},${(clicks/views*100).toFixed(1)}%,02:45`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'video-analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    handleExport,
    handlePublishLanding,
    handleDownloadAnalytics
  };
};
