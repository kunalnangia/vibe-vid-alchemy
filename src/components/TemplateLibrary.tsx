
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutTemplate, Video, Instagram, Youtube } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  aspectRatio: "16:9" | "9:16" | "1:1" | "4:5";
  isPremium: boolean;
}

// Mock templates data - in a real app, this would come from an API
const templates: Template[] = [
  {
    id: "template-1",
    name: "YouTube Intro",
    category: "YouTube",
    thumbnail: "/placeholder.svg",
    aspectRatio: "16:9",
    isPremium: false
  },
  {
    id: "template-2",
    name: "TikTok Story",
    category: "TikTok",
    thumbnail: "/placeholder.svg",
    aspectRatio: "9:16",
    isPremium: true
  },
  {
    id: "template-3",
    name: "Instagram Reel",
    category: "Instagram",
    thumbnail: "/placeholder.svg",
    aspectRatio: "9:16",
    isPremium: false
  },
  {
    id: "template-4",
    name: "Instagram Post",
    category: "Instagram",
    thumbnail: "/placeholder.svg",
    aspectRatio: "1:1",
    isPremium: true
  },
  {
    id: "template-5",
    name: "YouTube Short",
    category: "YouTube",
    thumbnail: "/placeholder.svg",
    aspectRatio: "9:16",
    isPremium: false
  },
  {
    id: "template-6",
    name: "Ad Creative",
    category: "Ads",
    thumbnail: "/placeholder.svg",
    aspectRatio: "16:9",
    isPremium: true
  },
];

interface TemplateLibraryProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate }) => {
  return (
    <div className="bg-white/90 rounded-2xl shadow-lg p-6 border border-blue-100">
      <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
        <LayoutTemplate className="mr-2 h-5 w-5 text-blue-600" />
        Template Library
      </h2>
      
      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="youtube" className="flex items-center">
            <Youtube className="mr-1 h-3 w-3" /> YouTube
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center">
            <Instagram className="mr-1 h-3 w-3" /> Instagram
          </TabsTrigger>
          <TabsTrigger value="ads">Ads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-3 gap-3">
            {templates.map(template => (
              <div 
                key={template.id}
                className={`group relative cursor-pointer transition-all duration-300 hover:scale-105`}
                onClick={() => onSelectTemplate(template)}
              >
                <div className="overflow-hidden rounded-lg border border-blue-100 shadow-sm">
                  <AspectRatio ratio={template.aspectRatio === "16:9" ? 16/9 : template.aspectRatio === "9:16" ? 9/16 : 1}>
                    <div className="bg-blue-50 flex items-center justify-center w-full h-full">
                      <Video className="h-10 w-10 text-blue-300" />
                    </div>
                  </AspectRatio>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm font-medium text-blue-900">{template.name}</span>
                  {template.isPremium && (
                    <span className="text-xs font-semibold px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full">PRO</span>
                  )}
                </div>
                <div className="text-xs text-blue-500">{template.aspectRatio}</div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="youtube" className="mt-0">
          <div className="grid grid-cols-3 gap-3">
            {templates.filter(t => t.category === "YouTube").map(template => (
              <div 
                key={template.id}
                className={`group relative cursor-pointer transition-all duration-300 hover:scale-105`}
                onClick={() => onSelectTemplate(template)}
              >
                <div className="overflow-hidden rounded-lg border border-blue-100 shadow-sm">
                  <AspectRatio ratio={template.aspectRatio === "16:9" ? 16/9 : template.aspectRatio === "9:16" ? 9/16 : 1}>
                    <div className="bg-blue-50 flex items-center justify-center w-full h-full">
                      <Video className="h-10 w-10 text-blue-300" />
                    </div>
                  </AspectRatio>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm font-medium text-blue-900">{template.name}</span>
                  {template.isPremium && (
                    <span className="text-xs font-semibold px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full">PRO</span>
                  )}
                </div>
                <div className="text-xs text-blue-500">{template.aspectRatio}</div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="instagram" className="mt-0">
          <div className="grid grid-cols-3 gap-3">
            {templates.filter(t => t.category === "Instagram").map(template => (
              <div 
                key={template.id}
                className={`group relative cursor-pointer transition-all duration-300 hover:scale-105`}
                onClick={() => onSelectTemplate(template)}
              >
                <div className="overflow-hidden rounded-lg border border-blue-100 shadow-sm">
                  <AspectRatio ratio={template.aspectRatio === "16:9" ? 16/9 : template.aspectRatio === "9:16" ? 9/16 : 1}>
                    <div className="bg-blue-50 flex items-center justify-center w-full h-full">
                      <Video className="h-10 w-10 text-blue-300" />
                    </div>
                  </AspectRatio>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm font-medium text-blue-900">{template.name}</span>
                  {template.isPremium && (
                    <span className="text-xs font-semibold px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full">PRO</span>
                  )}
                </div>
                <div className="text-xs text-blue-500">{template.aspectRatio}</div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="ads" className="mt-0">
          <div className="grid grid-cols-3 gap-3">
            {templates.filter(t => t.category === "Ads").map(template => (
              <div 
                key={template.id}
                className={`group relative cursor-pointer transition-all duration-300 hover:scale-105`}
                onClick={() => onSelectTemplate(template)}
              >
                <div className="overflow-hidden rounded-lg border border-blue-100 shadow-sm">
                  <AspectRatio ratio={template.aspectRatio === "16:9" ? 16/9 : template.aspectRatio === "9:16" ? 9/16 : 1}>
                    <div className="bg-blue-50 flex items-center justify-center w-full h-full">
                      <Video className="h-10 w-10 text-blue-300" />
                    </div>
                  </AspectRatio>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm font-medium text-blue-900">{template.name}</span>
                  {template.isPremium && (
                    <span className="text-xs font-semibold px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full">PRO</span>
                  )}
                </div>
                <div className="text-xs text-blue-500">{template.aspectRatio}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 pt-6 border-t border-blue-100">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">About Templates</h3>
        <p className="text-xs text-blue-700">
          Templates help you create professional videos in minutes. Choose from a variety of
          designs optimized for different platforms and content types. Premium templates
          offer additional features and unique styles.
        </p>
      </div>
    </div>
  );
};

export default TemplateLibrary;
