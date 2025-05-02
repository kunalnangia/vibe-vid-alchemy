
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, Music, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import SceneItem from "./SceneItem";
import MusicTrackItem from "./MusicTrackItem";
import VoiceoverItem from "./VoiceoverItem";

interface GeneratedContentTabsProps {
  generatedItems: {
    scenes: boolean;
    footage: boolean;
    music: boolean;
    voiceover: boolean;
  };
}

const GeneratedContentTabs: React.FC<GeneratedContentTabsProps> = ({ generatedItems }) => {
  if (!Object.values(generatedItems).some(value => value)) {
    return null;
  }

  return (
    <Tabs defaultValue="scenes" className="mt-6">
      <TabsList className="bg-blue-100 mb-2">
        <TabsTrigger value="scenes" disabled={!generatedItems.scenes}>
          <FileText className="w-4 h-4 mr-1" />
          Scene Breakdown
        </TabsTrigger>
        <TabsTrigger value="footage" disabled={!generatedItems.footage}>
          <Video className="w-4 h-4 mr-1" />
          Stock Footage
        </TabsTrigger>
        <TabsTrigger value="music" disabled={!generatedItems.music}>
          <Music className="w-4 h-4 mr-1" />
          Music
        </TabsTrigger>
        <TabsTrigger value="voiceover" disabled={!generatedItems.voiceover}>
          <MessageSquare className="w-4 h-4 mr-1" />
          Voiceover
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="scenes" className="border border-blue-100 rounded-md p-4 bg-white">
        <h4 className="font-semibold text-blue-800 mb-3">Scene Breakdown</h4>
        <div className="space-y-3">
          <SceneItem 
            number={1} 
            title="Introduction" 
            description="Start with a hook that captures attention in first 5 seconds" 
            duration="0:00 - 0:10"
          />
          <SceneItem 
            number={2} 
            title="Problem Statement" 
            description="Explain the challenge that your product/service addresses" 
            duration="0:10 - 0:25"
          />
          <SceneItem 
            number={3} 
            title="Solution Showcase" 
            description="Demonstrate how your offering solves the problem" 
            duration="0:25 - 0:45"
          />
          <SceneItem 
            number={4} 
            title="Call to Action" 
            description="End with clear instructions on next steps for viewers" 
            duration="0:45 - 0:60"
          />
        </div>
        <Button className="mt-4" variant="outline">
          Apply Scene Structure
        </Button>
      </TabsContent>
      
      <TabsContent value="footage" className="border border-blue-100 rounded-md p-4 bg-white">
        <h4 className="font-semibold text-blue-800 mb-3">Recommended Stock Footage</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-gray-100 h-24 rounded flex items-center justify-center text-gray-500">
            Business meeting footage
          </div>
          <div className="bg-gray-100 h-24 rounded flex items-center justify-center text-gray-500">
            Product demonstration
          </div>
          <div className="bg-gray-100 h-24 rounded flex items-center justify-center text-gray-500">
            Customer testimonial
          </div>
          <div className="bg-gray-100 h-24 rounded flex items-center justify-center text-gray-500">
            Data visualization
          </div>
          <div className="bg-gray-100 h-24 rounded flex items-center justify-center text-gray-500">
            Office environment
          </div>
          <div className="bg-gray-100 h-24 rounded flex items-center justify-center text-gray-500">
            Call to action scene
          </div>
        </div>
        <Button className="mt-4" variant="outline">
          Browse Stock Library
        </Button>
      </TabsContent>
      
      <TabsContent value="music" className="border border-blue-100 rounded-md p-4 bg-white">
        <h4 className="font-semibold text-blue-800 mb-3">Recommended Music Tracks</h4>
        <div className="space-y-2">
          <MusicTrackItem title="Corporate Innovation" duration="2:34" category="Business" />
          <MusicTrackItem title="Upbeat Technology" duration="3:12" category="Technology" />
          <MusicTrackItem title="Inspiring Journey" duration="2:05" category="Motivational" />
          <MusicTrackItem title="Digital Growth" duration="1:58" category="Business" />
        </div>
        <Button className="mt-4" variant="outline">
          Preview Tracks
        </Button>
      </TabsContent>
      
      <TabsContent value="voiceover" className="border border-blue-100 rounded-md p-4 bg-white">
        <h4 className="font-semibold text-blue-800 mb-3">Voiceover Options</h4>
        <div className="space-y-3">
          <VoiceoverItem name="Alex" gender="Male" style="Professional" />
          <VoiceoverItem name="Sarah" gender="Female" style="Conversational" />
          <VoiceoverItem name="Michael" gender="Male" style="Authoritative" />
          <VoiceoverItem name="Jessica" gender="Female" style="Friendly" />
        </div>
        <Button className="mt-4" variant="outline">
          Generate Script
        </Button>
      </TabsContent>
    </Tabs>
  );
};

export default GeneratedContentTabs;
