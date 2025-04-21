
import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type AspectRatioOption = {
  id: string;
  name: string;
  ratio: string;
  dimensions: string;
  platform: string;
  isPremium: boolean;
};

const aspectRatios: AspectRatioOption[] = [
  { id: 'landscape', name: 'Landscape', ratio: '16:9', dimensions: '1920×1080', platform: 'YouTube, TV', isPremium: false },
  { id: 'portrait', name: 'Portrait', ratio: '9:16', dimensions: '1080×1920', platform: 'Stories, TikTok', isPremium: false },
  { id: 'square', name: 'Square', ratio: '1:1', dimensions: '1080×1080', platform: 'Instagram, Facebook', isPremium: false },
  { id: 'vertical', name: 'Vertical', ratio: '4:5', dimensions: '1080×1350', platform: 'Instagram post', isPremium: false },
  { id: 'cinema', name: 'Cinema', ratio: '21:9', dimensions: '2560×1080', platform: 'Film', isPremium: true },
  { id: 'custom', name: 'Custom', ratio: 'Custom', dimensions: 'Variable', platform: 'Any', isPremium: true }
];

interface AspectRatioSelectorProps {
  onSelectRatio: (ratio: AspectRatioOption) => void;
  currentRatio: string;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ 
  onSelectRatio, 
  currentRatio 
}) => {
  const handleRatioSelect = (ratio: AspectRatioOption) => {
    if (ratio.isPremium) {
      toast.info("This is a premium feature. Upgrade to access all aspect ratios!");
      return;
    }
    onSelectRatio(ratio);
    toast.success(`Aspect ratio changed to ${ratio.name} (${ratio.ratio})`);
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-lg p-5 border border-blue-100">
      <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
        <ArrowUpDown className="mr-2 h-5 w-5 text-blue-600" />
        Magic Resize
      </h2>
      
      <div className="grid grid-cols-3 gap-2">
        {aspectRatios.map(ratio => (
          <Button
            key={ratio.id}
            variant={currentRatio === ratio.id ? "default" : "outline"}
            className={`h-auto py-3 px-2 flex flex-col items-center justify-center relative ${
              currentRatio === ratio.id ? 
                "bg-gradient-to-r from-blue-600 to-blue-400 text-white" : 
                "border-blue-200 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onClick={() => handleRatioSelect(ratio)}
          >
            {ratio.isPremium && (
              <span className="absolute -top-1 -right-1 text-[10px] font-semibold px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full">
                PRO
              </span>
            )}
            <div className="text-sm font-medium mb-1">{ratio.name}</div>
            <div className="text-xs opacity-90 mb-1">{ratio.ratio}</div>
            <div className="text-[10px] opacity-75">{ratio.platform}</div>
          </Button>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-blue-100">
        <p className="text-xs text-blue-600">
          Magic Resize automatically adjusts your videos for different platforms. 
          Premium users can access custom aspect ratios and advanced cropping options.
        </p>
      </div>
    </div>
  );
};

export default AspectRatioSelector;
