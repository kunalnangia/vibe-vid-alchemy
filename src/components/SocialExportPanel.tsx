
import React, { useState } from "react";
import { Youtube, Instagram, Video, Check, Share, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  color: string;
  available: boolean;
}

const SocialExportPanel: React.FC = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  
  const platforms: SocialPlatform[] = [
    {
      name: "YouTube",
      icon: <Youtube className="w-4 h-4 mr-1" />,
      color: "bg-red-600",
      available: true
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-4 h-4 mr-1" />,
      color: "bg-pink-500",
      available: true
    },
    {
      name: "TikTok",
      icon: <Video className="w-4 h-4 mr-1" />,
      color: "bg-black",
      available: true
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-4 h-4 mr-1" />,
      color: "bg-blue-400",
      available: true
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-4 h-4 mr-1" />,
      color: "bg-blue-600",
      available: true
    }
  ];

  const togglePlatform = (platformName: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformName)) {
        return prev.filter(name => name !== platformName);
      } else {
        return [...prev, platformName];
      }
    });
  };

  const handleExport = () => {
    if (selectedPlatforms.length === 0) {
      toast.warning("Please select at least one platform");
      return;
    }
    
    setIsExporting(true);
    setExportProgress(0);
    
    toast.success(`Exporting to ${selectedPlatforms.join(", ")}...`);
    
    // Simulate export process
    const interval = setInterval(() => {
      setExportProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            toast.success(`Successfully exported to ${selectedPlatforms.join(", ")}`);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 400);
  };

  return (
    <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
      <h2 className="flex gap-2 items-center text-lg font-bold text-blue-900 mb-3">
        <Share className="w-5 h-5 text-blue-400" /> One-Click Social Export
      </h2>
      <p className="text-sm text-blue-800 mb-3">
        Export and share directly to these platforms with optimized settings for each.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {platforms.map((platform) => (
          <Button 
            key={platform.name}
            className={`${platform.color} text-white px-3 rounded relative hover:opacity-90 transition-all`}
            onClick={() => togglePlatform(platform.name)}
            variant="outline"
          >
            {platform.icon}
            {platform.name}
            {selectedPlatforms.includes(platform.name) && (
              <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                <Check className="w-3 h-3" />
              </span>
            )}
          </Button>
        ))}
      </div>
      
      {isExporting ? (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-blue-700 mb-1">
            <span>Exporting video...</span>
            <span>{exportProgress}%</span>
          </div>
          <Progress value={exportProgress} className="h-2" />
        </div>
      ) : null}
      
      <Button 
        className="bg-blue-600 hover:bg-blue-700 text-white w-full mb-2"
        onClick={handleExport}
        disabled={isExporting || selectedPlatforms.length === 0}
      >
        {isExporting ? "Exporting..." : "Export to Selected Platforms"}
      </Button>
      
      <div className="mt-3 space-y-2 text-xs">
        <div className="flex items-center gap-1 text-blue-600">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          Smart Format Optimization: Automatically resize for each platform
        </div>
        <div className="flex items-center gap-1 text-blue-600">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
          Caption Embedding: Subtitles are encoded directly into videos
        </div>
        <div className="flex items-center gap-1 text-blue-600">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
          Schedule posting with Premium Plan
        </div>
      </div>
    </div>
  );
};

export default SocialExportPanel;
