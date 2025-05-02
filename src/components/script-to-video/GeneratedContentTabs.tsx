
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Film, Music, Mic, Loader2 } from "lucide-react";
import SceneItem from './SceneItem';
import MusicTrackItem from './MusicTrackItem';
import VoiceoverItem from './VoiceoverItem';
import { SceneData, MusicData, VoiceoverData } from '../../services/scriptProcessingService';

interface GeneratedContentTabsProps {
  generatedItems: {
    scenes: boolean;
    footage: boolean;
    music: boolean;
    voiceover: boolean;
  };
  scenes?: SceneData[];
  musicSuggestions?: MusicData[];
  voiceoverSuggestions?: VoiceoverData[];
  onEditScene?: (id: number) => void;
  onDeleteScene?: (id: number) => void;
  selectedMusic?: string | null;
  onSelectMusic?: (id: string) => void;
  selectedVoice?: string | null;
  onSelectVoice?: (id: string) => void;
}

const GeneratedContentTabs: React.FC<GeneratedContentTabsProps> = ({
  generatedItems,
  scenes = [],
  musicSuggestions = [],
  voiceoverSuggestions = [],
  onEditScene,
  onDeleteScene,
  selectedMusic,
  onSelectMusic,
  selectedVoice,
  onSelectVoice
}) => {
  const [activeTab, setActiveTab] = useState("scenes");
  
  if (!generatedItems.scenes && !generatedItems.music && !generatedItems.voiceover) {
    return null;
  }
  
  return (
    <div className="mt-6 bg-white rounded-lg border border-blue-100 shadow-sm">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full border-b border-blue-100">
          <TabsTrigger value="scenes" className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            Scene Breakdown
            {generatedItems.scenes && (
              <span className="ml-1.5 bg-blue-100 text-blue-600 text-xs rounded-full px-1.5">
                {scenes.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="footage" className="flex items-center">
            <Film className="mr-1 h-4 w-4" />
            Stock Footage
          </TabsTrigger>
          <TabsTrigger value="music" className="flex items-center">
            <Music className="mr-1 h-4 w-4" />
            Music Tracks
            {generatedItems.music && (
              <span className="ml-1.5 bg-blue-100 text-blue-600 text-xs rounded-full px-1.5">
                {musicSuggestions.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="voiceover" className="flex items-center">
            <Mic className="mr-1 h-4 w-4" />
            Voiceovers
            {generatedItems.voiceover && (
              <span className="ml-1.5 bg-blue-100 text-blue-600 text-xs rounded-full px-1.5">
                {voiceoverSuggestions.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        {/* Scenes Tab */}
        <TabsContent value="scenes" className="p-4">
          {generatedItems.scenes ? (
            <ScrollArea className="h-60">
              <div className="space-y-3">
                {scenes.map((scene) => (
                  <SceneItem
                    key={scene.id}
                    number={scene.id}
                    title={scene.title}
                    description={scene.description}
                    duration={scene.duration}
                    onEdit={onEditScene}
                    onDelete={onDeleteScene}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-60 text-blue-400">
              <Loader2 className="h-10 w-10 animate-spin mb-2" />
              <p>Generate suggestions to see scene breakdown</p>
            </div>
          )}
        </TabsContent>
        
        {/* Stock Footage Tab */}
        <TabsContent value="footage" className="p-4">
          {generatedItems.footage ? (
            <div className="h-60 overflow-auto">
              <div className="text-sm text-blue-600 mb-3">
                Based on your script, we recommend these visual elements:
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Business Meeting', 'Product Demo', 'Customer Interview', 'Data Visualization'].map((item, i) => (
                  <div key={i} className="bg-blue-50 border border-blue-100 rounded p-3">
                    <h5 className="font-medium text-blue-800">{item}</h5>
                    <p className="text-xs text-blue-600 mt-1">Recommended for scene {i + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-60 text-blue-400">
              <Loader2 className="h-10 w-10 animate-spin mb-2" />
              <p>Generate suggestions to see footage recommendations</p>
            </div>
          )}
        </TabsContent>
        
        {/* Music Tab */}
        <TabsContent value="music" className="p-4">
          {generatedItems.music ? (
            <ScrollArea className="h-60">
              <div className="space-y-3">
                {musicSuggestions.map((track) => (
                  <MusicTrackItem
                    key={track.id}
                    title={track.title}
                    duration={track.duration}
                    category={track.category}
                    audioSrc={track.audioSrc}
                    onSelect={onSelectMusic ? () => onSelectMusic(track.id) : undefined}
                    selected={selectedMusic === track.id}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-60 text-blue-400">
              <Loader2 className="h-10 w-10 animate-spin mb-2" />
              <p>Generate suggestions to see music recommendations</p>
            </div>
          )}
        </TabsContent>
        
        {/* Voiceover Tab */}
        <TabsContent value="voiceover" className="p-4">
          {generatedItems.voiceover ? (
            <ScrollArea className="h-60">
              <div className="space-y-3">
                {voiceoverSuggestions.map((voice) => (
                  <VoiceoverItem
                    key={voice.id}
                    name={voice.name}
                    gender={voice.gender}
                    style={voice.style}
                    sampleAudio={voice.sampleAudio}
                    onSelect={onSelectVoice ? () => onSelectVoice(voice.id) : undefined}
                    selected={selectedVoice === voice.id}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-60 text-blue-400">
              <Loader2 className="h-10 w-10 animate-spin mb-2" />
              <p>Generate suggestions to see voiceover recommendations</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeneratedContentTabs;
