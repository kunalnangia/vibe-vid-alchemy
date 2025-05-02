
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Instagram, Youtube, Video, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
  aspectRatio: string;
  selected: boolean;
  color: string;
  hashtagsCount: number;
  captionsType: string;
  maxDuration: string;
}

const MultiChannelRepurposePanel: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      aspectRatio: "1:1",
      selected: true,
      color: "bg-pink-500",
      hashtagsCount: 20,
      captionsType: "Auto Burned-In",
      maxDuration: "60 sec"
    },
    {
      id: "youtube",
      name: "YouTube Shorts",
      icon: <Youtube className="h-5 w-5" />,
      aspectRatio: "9:16",
      selected: true,
      color: "bg-red-500",
      hashtagsCount: 5,
      captionsType: "CC + Burned-In",
      maxDuration: "60 sec"
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: <Video className="h-5 w-5" />,
      aspectRatio: "9:16",
      selected: true,
      color: "bg-black",
      hashtagsCount: 10,
      captionsType: "Auto Burned-In",
      maxDuration: "60 sec"
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      aspectRatio: "16:9",
      selected: false,
      color: "bg-blue-400",
      hashtagsCount: 3,
      captionsType: "Optional CC",
      maxDuration: "140 sec"
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      aspectRatio: "16:9",
      selected: false,
      color: "bg-blue-600",
      hashtagsCount: 5,
      captionsType: "Optional CC",
      maxDuration: "10 min"
    }
  ]);
  
  const toggleChannel = (id: string) => {
    setChannels(prev => 
      prev.map(channel => 
        channel.id === id ? { ...channel, selected: !channel.selected } : channel
      )
    );
  };
  
  const handleGenerateAll = () => {
    const selectedChannels = channels.filter(c => c.selected);
    
    if (selectedChannels.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }
    
    setIsProcessing(true);
    toast.info(`Preparing to generate content for ${selectedChannels.length} platforms...`);
    
    // Simulate processing
    setTimeout(() => {
      toast.success(`Generating optimized content for ${selectedChannels.map(c => c.name).join(", ")}`);
      
      // Simulate sequential processing
      let delay = 1000;
      selectedChannels.forEach(channel => {
        delay += 1500;
        setTimeout(() => {
          toast.success(`${channel.name} version created with ${channel.aspectRatio} aspect ratio`);
        }, delay);
      });
      
      // Complete all processing
      setTimeout(() => {
        setIsProcessing(false);
        toast.success("All versions ready for export!");
      }, delay + 1000);
    }, 2000);
  };
  
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-blue-100">
      <h2 className="text-xl font-bold text-blue-800 mb-6">Multi-Channel Auto-Repurpose</h2>
      
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-700 mb-2">Select Target Platforms</h3>
        <p className="text-sm text-blue-600 mb-4">
          VideoVibes will automatically optimize your content for each platform with the right dimensions,
          captions style, and hashtag recommendations.
        </p>
        
        <div className="space-y-3">
          {channels.map(channel => (
            <div 
              key={channel.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                channel.selected ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <Checkbox 
                  checked={channel.selected} 
                  onCheckedChange={() => toggleChannel(channel.id)}
                  className="mr-3"
                />
                <div className={`${channel.color} text-white p-1.5 rounded mr-3`}>
                  {channel.icon}
                </div>
                <span className="font-medium">{channel.name}</span>
              </div>
              <div className="text-sm text-blue-600">
                {channel.aspectRatio}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-medium text-blue-700 mb-2">Platform-Specific Optimizations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-blue-100">
                <th className="py-2 text-left font-medium text-blue-700">Platform</th>
                <th className="py-2 text-left font-medium text-blue-700">Aspect Ratio</th>
                <th className="py-2 text-left font-medium text-blue-700">Hashtags</th>
                <th className="py-2 text-left font-medium text-blue-700">Captions</th>
                <th className="py-2 text-left font-medium text-blue-700">Duration</th>
              </tr>
            </thead>
            <tbody>
              {channels.filter(c => c.selected).map(channel => (
                <tr key={channel.id} className="border-b border-blue-50">
                  <td className="py-2 flex items-center">
                    <div className={`${channel.color} text-white p-1 rounded-sm mr-2`}>
                      {channel.icon}
                    </div>
                    {channel.name}
                  </td>
                  <td className="py-2">{channel.aspectRatio}</td>
                  <td className="py-2">Up to {channel.hashtagsCount}</td>
                  <td className="py-2">{channel.captionsType}</td>
                  <td className="py-2">{channel.maxDuration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-blue-600">
          {channels.filter(c => c.selected).length} platforms selected
        </div>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          disabled={isProcessing || channels.filter(c => c.selected).length === 0}
          onClick={handleGenerateAll}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Processing...
            </>
          ) : (
            <>
              Generate All Versions
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {/* Content Journey Visualization */}
      <div className="mt-8 pt-6 border-t border-blue-100">
        <h3 className="font-medium text-blue-700 mb-4">Your Content Journey</h3>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 border-l-2 border-dashed border-blue-200"></div>
          <div className="space-y-6">
            <JourneyStep 
              number={1}
              title="Original Content"
              description="Your uploaded master video"
              done={true}
            />
            <JourneyStep 
              number={2}
              title="Auto-Optimization"
              description="Format adjustments for each platform"
              done={isProcessing}
              active={isProcessing}
            />
            <JourneyStep 
              number={3}
              title="Channel-Specific Versions"
              description="Captions, hashtags, and templates applied"
              done={false}
            />
            <JourneyStep 
              number={4}
              title="One-Click Publishing"
              description="Export or schedule all versions"
              done={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for journey steps
const JourneyStep: React.FC<{
  number: number;
  title: string;
  description: string;
  done?: boolean;
  active?: boolean;
}> = ({ number, title, description, done = false, active = false }) => {
  return (
    <div className="flex relative">
      <div className={`z-10 w-12 h-12 flex items-center justify-center rounded-full ${
        done ? 'bg-green-500' : active ? 'bg-blue-500 animate-pulse' : 'bg-gray-200'
      } text-white font-bold`}>
        {done ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          number
        )}
      </div>
      <div className="ml-4">
        <h4 className="font-medium text-blue-800">{title}</h4>
        <p className="text-sm text-blue-600">{description}</p>
      </div>
    </div>
  );
};

export default MultiChannelRepurposePanel;
