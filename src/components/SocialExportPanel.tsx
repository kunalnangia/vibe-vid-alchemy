
import React, { useState } from "react";
import { Youtube, Instagram, Share, Video, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  color: string;
  available: boolean;
}

const SocialExportPanel: React.FC = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  
  const platforms: SocialPlatform[] = [
    {
      name: "YouTube",
      icon: <Youtube className="w-4 h-4 mr-1" />,
      color: "bg-blue-600",
      available: false
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-4 h-4 mr-1" />,
      color: "bg-pink-500",
      available: false
    },
    {
      name: "TikTok",
      icon: <Video className="w-4 h-4 mr-1" />,
      color: "bg-black",
      available: false
    }
  ];

  const togglePlatform = (platformName: string) => {
    if (platforms.find(p => p.name === platformName)?.available === false) {
      toast.info("This export option will be enabled soon!");
      return;
    }
    
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
    
    toast.success(`Preparing export for ${selectedPlatforms.join(", ")}...`);
    // In a production app, this would trigger the actual export process
    
    setTimeout(() => {
      toast.info("One-click export coming soon! This is a preview of the functionality.");
    }, 2000);
  };

  return (
    <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
      <h2 className="flex gap-2 items-center text-lg font-bold text-blue-900 mb-3">
        <Share className="w-5 h-5 text-blue-400" /> One-Click Social Export
      </h2>
      <p className="text-sm text-blue-800 mb-3">
        Export and share directly to <span className="font-semibold text-rose-500">YouTube</span>, <span className="font-semibold text-pink-500">Instagram</span>, <span className="font-semibold text-black">TikTok</span>, and more.
        <span className="ml-1 text-yellow-500 font-semibold">Batch & scheduled export: Premium</span>
      </p>
      <div className="flex gap-2 mb-4">
        {platforms.map((platform) => (
          <Button 
            key={platform.name}
            className={`${platform.color} text-white px-3 rounded relative`}
            disabled={!platform.available}
            onClick={() => togglePlatform(platform.name)}
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
      <Button 
        className="bg-blue-600 hover:bg-blue-700 text-white w-full mb-2"
        onClick={handleExport}
      >
        Export to Selected Platforms
      </Button>
      <div className="mt-2 text-xs text-blue-600">Scheduling, analytics, and deep integrations launching soon!</div>
    </div>
  );
};

export default SocialExportPanel;
