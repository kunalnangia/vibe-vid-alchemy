
import React from 'react';
import { Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VideoFilter {
  id: string;
  name: string;
  category: 'color' | 'effect' | 'transition';
  isPremium: boolean;
  cssFilter?: string;  // CSS filter string for preview
  description: string;
}

const filters: VideoFilter[] = [
  // Color filters
  { id: 'normal', name: 'Normal', category: 'color', isPremium: false, cssFilter: 'none', description: 'No color adjustments' },
  { id: 'warm', name: 'Warm', category: 'color', isPremium: false, cssFilter: 'sepia(0.5) saturate(1.5)', description: 'Adds a warm tone' },
  { id: 'cool', name: 'Cool', category: 'color', isPremium: false, cssFilter: 'hue-rotate(30deg) saturate(1.2)', description: 'Adds a cool blue tone' },
  { id: 'vivid', name: 'Vivid', category: 'color', isPremium: false, cssFilter: 'contrast(1.2) saturate(1.5)', description: 'Enhances colors' },
  { id: 'vintage', name: 'Vintage', category: 'color', isPremium: true, cssFilter: 'sepia(0.4) contrast(0.9) saturate(0.8)', description: 'Classic film look' },
  { id: 'bw', name: 'B&W', category: 'color', isPremium: false, cssFilter: 'grayscale(1)', description: 'Black and white' },
  
  // Effects
  { id: 'blur', name: 'Blur', category: 'effect', isPremium: false, cssFilter: 'blur(2px)', description: 'Soft blur effect' },
  { id: 'sharp', name: 'Sharpen', category: 'effect', isPremium: true, cssFilter: 'contrast(1.3) brightness(0.9)', description: 'Enhances details' },
  { id: 'dreamy', name: 'Dreamy', category: 'effect', isPremium: true, cssFilter: 'brightness(1.1) contrast(0.9) blur(0.5px)', description: 'Soft dreamy effect' },
  
  // Transitions (would need JavaScript implementation)
  { id: 'fade', name: 'Fade', category: 'transition', isPremium: false, description: 'Simple fade transition' },
  { id: 'slide', name: 'Slide', category: 'transition', isPremium: false, description: 'Slide from right' },
  { id: 'zoom', name: 'Zoom', category: 'transition', isPremium: true, description: 'Smooth zoom effect' },
];

interface VideoFiltersProps {
  onApplyFilter: (filter: VideoFilter) => void;
  currentFilterId: string;
}

const VideoFilters: React.FC<VideoFiltersProps> = ({ onApplyFilter, currentFilterId }) => {
  return (
    <div className="bg-white/90 rounded-2xl shadow-lg p-5 border border-blue-100">
      <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center">
        <Filter className="mr-2 h-5 w-5 text-blue-600" />
        One-Tap Filters & Effects
      </h2>
      
      <Tabs defaultValue="color">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="color" className="flex-1">Color Filters</TabsTrigger>
          <TabsTrigger value="effect" className="flex-1">Effects</TabsTrigger>
          <TabsTrigger value="transition" className="flex-1">Transitions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="color" className="mt-0">
          <ScrollArea className="h-64">
            <div className="grid grid-cols-2 gap-3 p-1">
              {filters.filter(f => f.category === 'color').map(filter => (
                <div 
                  key={filter.id}
                  className={`relative rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${currentFilterId === filter.id ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-gray-50'}`}
                  onClick={() => onApplyFilter(filter)}
                >
                  <div 
                    className="w-full h-12 rounded bg-gradient-to-r from-blue-400 to-purple-400 mb-2"
                    style={{ filter: filter.cssFilter }}
                  />
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${currentFilterId === filter.id ? 'text-blue-700' : 'text-blue-900'}`}>
                      {filter.name}
                    </span>
                    {filter.isPremium && (
                      <span className="text-xs font-semibold px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full">
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-blue-600 mt-1">{filter.description}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="effect" className="mt-0">
          <ScrollArea className="h-64">
            <div className="grid grid-cols-2 gap-3 p-1">
              {filters.filter(f => f.category === 'effect').map(filter => (
                <div 
                  key={filter.id}
                  className={`relative rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${currentFilterId === filter.id ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-gray-50'}`}
                  onClick={() => onApplyFilter(filter)}
                >
                  <div 
                    className="w-full h-12 rounded bg-gradient-to-r from-blue-400 to-purple-400 mb-2"
                    style={{ filter: filter.cssFilter }}
                  />
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${currentFilterId === filter.id ? 'text-blue-700' : 'text-blue-900'}`}>
                      {filter.name}
                    </span>
                    {filter.isPremium && (
                      <span className="text-xs font-semibold px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full">
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-blue-600 mt-1">{filter.description}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="transition" className="mt-0">
          <ScrollArea className="h-64">
            <div className="grid grid-cols-2 gap-3 p-1">
              {filters.filter(f => f.category === 'transition').map(filter => (
                <div 
                  key={filter.id}
                  className={`relative rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${currentFilterId === filter.id ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-gray-50'}`}
                  onClick={() => onApplyFilter(filter)}
                >
                  <div className="w-full h-12 rounded bg-blue-50 flex items-center justify-center mb-2">
                    <span className="text-blue-400 text-xs font-medium">
                      {filter.name} transition
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${currentFilterId === filter.id ? 'text-blue-700' : 'text-blue-900'}`}>
                      {filter.name}
                    </span>
                    {filter.isPremium && (
                      <span className="text-xs font-semibold px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full">
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-blue-600 mt-1">{filter.description}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      <div className="mt-4 pt-3 border-t border-blue-100">
        <p className="text-xs text-blue-500">
          Apply filters with one click. Premium filters offer advanced effects.
        </p>
      </div>
    </div>
  );
};

export default VideoFilters;
