
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Video, Music, Mic, Trash2, Edit, Play, Check, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

interface SceneData {
  id: number;
  content: string;
  description: string;
  duration: string;
  suggestedFootage?: string[];
}

interface MusicData {
  id: string;
  name: string;
  duration: string;
  mood: string;
  previewUrl: string;
}

interface VoiceoverData {
  id: string;
  name: string;
  gender: string;
  accent: string;
  previewUrl: string;
}

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
  const [editingSceneId, setEditingSceneId] = useState<number | null>(null);
  const [editedSceneContent, setEditedSceneContent] = useState<string>("");
  const [editedSceneDescription, setEditedSceneDescription] = useState<string>("");

  // Function to handle scene editing
  const handleEditClick = (scene: SceneData) => {
    setEditingSceneId(scene.id);
    setEditedSceneContent(scene.content);
    setEditedSceneDescription(scene.description);
    onEditScene(scene.id);
  };

  // Function to save edited scene
  const handleSaveEdit = (id: number) => {
    // In a real app, you would update the scene in state/database here
    toast.success(`Scene ${id} updated`);
    setEditingSceneId(null);
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditingSceneId(null);
  };

  // Function to play audio preview
  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(err => {
      console.error("Error playing audio:", err);
      toast.error("Couldn't play the audio preview");
    });
  };

  const applySelectedScenes = () => {
    toast.success(`Applying ${scenes.length} scenes to generate video`);
    toast('Processing scenes...', {
      description: 'This may take a few minutes',
      duration: 5000,
    });
    
    setTimeout(() => {
      toast.success('Video draft created!');
    }, 3000);
  };

  const generateStoryboard = () => {
    if (scenes.length === 0) {
      toast.error("Please generate scene suggestions first");
      return;
    }
    
    toast('Generating storyboard...', {
      description: 'Creating visual layout for your scenes',
      duration: 3000,
    });
    
    setTimeout(() => {
      toast.success('Storyboard generated!');
    }, 3000);
  };

  const viewAllSuggestions = () => {
    toast.info('Showing all AI-generated suggestions', {
      description: 'Opening detailed suggestions panel',
      duration: 3000,
    });
  };

  return (
    <div className={`mt-6 ${!Object.values(generatedItems).some(Boolean) ? 'hidden' : ''}`}>
      <Tabs defaultValue="scenes">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="scenes" disabled={!generatedItems.scenes}>
            <Video className="mr-2 h-4 w-4" />
            Scenes ({scenes.length})
          </TabsTrigger>
          <TabsTrigger value="music" disabled={!generatedItems.music}>
            <Music className="mr-2 h-4 w-4" />
            Music ({musicSuggestions.length})
          </TabsTrigger>
          <TabsTrigger value="voiceover" disabled={!generatedItems.voiceover}>
            <Mic className="mr-2 h-4 w-4" />
            Voiceover ({voiceoverSuggestions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scenes">
          <div className="space-y-4">
            {scenes.map((scene) => (
              <div key={scene.id} className="border rounded-md p-3 bg-white">
                {editingSceneId === scene.id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Scene Content</label>
                      <Textarea 
                        value={editedSceneContent}
                        onChange={(e) => setEditedSceneContent(e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Visual Description</label>
                      <Input 
                        value={editedSceneDescription}
                        onChange={(e) => setEditedSceneDescription(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleCancelEdit}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleSaveEdit(scene.id)}
                      >
                        <Check className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Scene {scene.id}</h4>
                      <span className="text-sm text-gray-500">{scene.duration}</span>
                    </div>
                    <p className="text-sm mb-3">{scene.content}</p>
                    <p className="text-xs text-gray-600 italic mb-2">
                      Visual: {scene.description}
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEditClick(scene)}
                      >
                        <Edit className="h-3 w-3 mr-1" /> Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-500 hover:text-red-600" 
                        onClick={() => onDeleteScene(scene.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {scenes.length > 0 && (
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={generateStoryboard}
                  className="border-blue-300 text-blue-700"
                >
                  Generate Storyboard
                </Button>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={viewAllSuggestions}
                  >
                    View All Suggestions
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={applySelectedScenes}
                  >
                    Apply Selected Scenes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="music">
          <div className="space-y-3">
            {musicSuggestions.map((music) => (
              <div 
                key={music.id} 
                className={`border rounded-md p-3 flex items-center justify-between cursor-pointer ${
                  selectedMusic === music.id ? 'border-blue-500 bg-blue-50' : 'bg-white'
                }`}
                onClick={() => onSelectMusic(music.id)}
              >
                <div>
                  <h4 className="font-medium">{music.name}</h4>
                  <div className="text-xs text-gray-600 mt-1">
                    <span>{music.duration} • {music.mood}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(music.previewUrl);
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="voiceover">
          <div className="space-y-3">
            {voiceoverSuggestions.map((voice) => (
              <div 
                key={voice.id} 
                className={`border rounded-md p-3 flex items-center justify-between cursor-pointer ${
                  selectedVoice === voice.id ? 'border-blue-500 bg-blue-50' : 'bg-white'
                }`}
                onClick={() => onSelectVoice(voice.id)}
              >
                <div>
                  <h4 className="font-medium">{voice.name}</h4>
                  <div className="text-xs text-gray-600 mt-1">
                    <span>{voice.gender} • {voice.accent}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(voice.previewUrl);
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeneratedContentTabs;
