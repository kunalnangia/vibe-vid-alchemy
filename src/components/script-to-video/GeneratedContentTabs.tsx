
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileVideo, Music, Mic, Loader2 } from "lucide-react";
import { SceneData, MusicData, VoiceoverData } from '@/services/scriptProcessingService';
import SceneItem from '../script-to-video/SceneItem';
import MusicItem from './MusicItem';
import VoiceoverItem from './VoiceoverItem';

interface GeneratedContentTabsProps {
  generatedItems: {
    scenes: boolean;
    footage: boolean;
    music: boolean;
    voiceover: boolean;
  };
  scenes: SceneData[];
  musicSuggestions: MusicData[];
  voiceoverSuggestions: VoiceoverData[];
  onEditScene: (id: number) => void;
  onDeleteScene: (id: number) => void;
  selectedMusic: string | null;
  onSelectMusic: (id: string) => void;
  selectedVoice: string | null;
  onSelectVoice: (id: string) => void;
}

const GeneratedContentTabs: React.FC<GeneratedContentTabsProps> = ({
  generatedItems,
  scenes,
  musicSuggestions,
  voiceoverSuggestions,
  onEditScene,
  onDeleteScene,
  selectedMusic,
  onSelectMusic,
  selectedVoice,
  onSelectVoice
}) => {
  return (
    <div className="mt-4">
      <Tabs defaultValue="scenes">
        <TabsList className="w-full border border-gray-200 rounded-lg p-1 bg-gray-50">
          <TabsTrigger value="scenes" className="flex-1 data-[state=active]:bg-white">
            <FileVideo className="h-4 w-4 mr-1" />
            Scene Breakdown
            {!generatedItems.scenes && <div className="w-2 h-2 bg-gray-300 rounded-full ml-2"></div>}
          </TabsTrigger>
          <TabsTrigger value="music" className="flex-1 data-[state=active]:bg-white">
            <Music className="h-4 w-4 mr-1" />
            Music
            {!generatedItems.music && <div className="w-2 h-2 bg-gray-300 rounded-full ml-2"></div>}
          </TabsTrigger>
          <TabsTrigger value="voiceover" className="flex-1 data-[state=active]:bg-white">
            <Mic className="h-4 w-4 mr-1" />
            Voiceover
            {!generatedItems.voiceover && <div className="w-2 h-2 bg-gray-300 rounded-full ml-2"></div>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scenes">
          <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2">
            {!generatedItems.scenes ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="animate-spin h-6 w-6 text-blue-500 mb-2" />
                <p className="text-gray-500 text-sm">Generating scene breakdown...</p>
              </div>
            ) : scenes.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Suggested Scenes</h3>
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
            ) : (
              <p className="text-gray-500 py-4 text-center text-sm">No scene suggestions generated yet.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="music">
          <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2">
            {!generatedItems.music ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="animate-spin h-6 w-6 text-blue-500 mb-2" />
                <p className="text-gray-500 text-sm">Generating music suggestions...</p>
              </div>
            ) : musicSuggestions.length > 0 ? (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Music Tracks</h3>
                {musicSuggestions.map((music) => (
                  <MusicItem
                    key={music.id}
                    id={music.id}
                    title={music.title}
                    artist={music.artist}
                    duration={music.duration}
                    mood={music.mood}
                    isSelected={selectedMusic === music.id}
                    onSelect={onSelectMusic}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-4 text-center text-sm">No music suggestions generated yet.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="voiceover">
          <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2">
            {!generatedItems.voiceover ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="animate-spin h-6 w-6 text-blue-500 mb-2" />
                <p className="text-gray-500 text-sm">Generating voiceover suggestions...</p>
              </div>
            ) : voiceoverSuggestions.length > 0 ? (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Voice Talent</h3>
                {voiceoverSuggestions.map((voice) => (
                  <VoiceoverItem
                    key={voice.id}
                    id={voice.id}
                    name={voice.name}
                    gender={voice.gender}
                    style={voice.style}
                    language={voice.language}
                    isSelected={selectedVoice === voice.id}
                    onSelect={onSelectVoice}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-4 text-center text-sm">No voiceover suggestions generated yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeneratedContentTabs;
