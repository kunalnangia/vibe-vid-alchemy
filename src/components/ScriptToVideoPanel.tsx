
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import CreativeControls from "./script-to-video/CreativeControls";
import GeneratedContentTabs from "./script-to-video/GeneratedContentTabs";
import { 
  processScript, 
  generateScript, 
  ScriptProcessingSettings, 
  ProcessedScriptData,
  SceneData,
  MusicData,
  VoiceoverData
} from "../services/scriptProcessingService";

interface ScriptToVideoPanelProps {
  scriptIdea: string;
  setScriptIdea: (value: string) => void;
}

const ScriptToVideoPanel: React.FC<ScriptToVideoPanelProps> = ({
  scriptIdea,
  setScriptIdea
}) => {
  // State for UI loading and generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  
  // State for generated content
  const [processedData, setProcessedData] = useState<ProcessedScriptData | null>(null);
  
  // State for selected items
  const [selectedScene, setSelectedScene] = useState<number | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  
  // State for creativity settings
  const [settings, setSettings] = useState<ScriptProcessingSettings>({
    tone: "professional",
    duration: "60 seconds",
    mood: "bright",
  });

  // State to track which types of content have been generated
  const [generatedItems, setGeneratedItems] = useState<{
    scenes: boolean;
    footage: boolean;
    music: boolean;
    voiceover: boolean;
  }>({
    scenes: false,
    footage: false,
    music: false,
    voiceover: false
  });

  // Handle changes to the script idea
  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScriptIdea(e.target.value);
    
    // Reset generation status if script changes significantly
    if (e.target.value.length < scriptIdea.length / 2 || e.target.value.length > scriptIdea.length * 2) {
      setGeneratedItems({
        scenes: false,
        footage: false,
        music: false,
        voiceover: false
      });
      setProcessedData(null);
    }
  };

  // Generate AI suggestions based on the script
  const generateSuggestions = async () => {
    if (!scriptIdea.trim()) {
      toast.error("Please enter a script idea first");
      return;
    }

    setIsGenerating(true);
    toast("Analyzing your script and generating suggestions...");

    try {
      // Process the script with AI
      const data = await processScript(scriptIdea, settings);
      setProcessedData(data);
      
      // Update generation status progressively
      setGeneratedItems(prev => ({ ...prev, scenes: true, footage: true }));
      toast.success("Scene breakdown and footage suggestions generated!");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGeneratedItems(prev => ({ ...prev, music: true }));
      toast.success("Music suggestions generated!");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGeneratedItems(prev => ({ ...prev, voiceover: true }));
      toast.success("All suggestions generated successfully!");
    } catch (error) {
      console.error("Error generating suggestions:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate a full script from a brief idea
  const handleGenerateScript = async () => {
    if (!scriptIdea.trim()) {
      toast.error("Please enter at least a brief idea");
      return;
    }
    
    setIsGeneratingScript(true);
    
    try {
      const generatedScript = await generateScript(scriptIdea, settings);
      setScriptIdea(generatedScript);
      toast.success("Script generated! You can now edit it or generate suggestions.");
    } catch (error) {
      console.error("Error generating script:", error);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // Handle changes to the creative controls
  const handleToneChange = (tone: string) => {
    setSettings(prev => ({ ...prev, tone }));
    toast.info(`Video tone set to ${tone}`);
  };

  const handleDurationChange = (duration: string) => {
    setSettings(prev => ({ ...prev, duration }));
    toast.info(`Target duration set to ${duration}`);
  };

  const handleMoodChange = (mood: string) => {
    setSettings(prev => ({ ...prev, mood }));
    toast.info(`Visual mood set to ${mood}`);
  };

  // Handle scene editing (just a stub for now)
  const handleEditScene = (id: number) => {
    setSelectedScene(id);
    toast.info(`Editing scene ${id}`);
  };

  // Handle scene deletion
  const handleDeleteScene = (id: number) => {
    if (!processedData) return;
    
    const updatedScenes = processedData.scenes.filter(scene => scene.id !== id);
    setProcessedData({
      ...processedData,
      scenes: updatedScenes
    });
    
    toast.success(`Scene ${id} deleted`);
    
    if (selectedScene === id) {
      setSelectedScene(null);
    }
  };

  // Handle music selection
  const handleSelectMusic = (id: string) => {
    setSelectedMusic(id === selectedMusic ? null : id);
    if (id !== selectedMusic) {
      toast.success(`Music track selected: ${id}`);
    }
  };

  // Handle voiceover selection
  const handleSelectVoice = (id: string) => {
    setSelectedVoice(id === selectedVoice ? null : id);
    if (id !== selectedVoice) {
      toast.success(`Voiceover talent selected: ${id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
          <Wand2 className="mr-2 h-6 w-6 text-blue-600" />
          Script-to-Video AI Workspace
        </h2>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-blue-700">Your Script Idea:</label>
            <Button
              variant="outline"
              size="sm"
              disabled={isGeneratingScript || !scriptIdea.trim()}
              onClick={handleGenerateScript}
              className="text-xs"
            >
              {isGeneratingScript ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-1 h-3 w-3" />
                  Expand to Full Script
                </>
              )}
            </Button>
          </div>
          
          <Textarea
            value={scriptIdea}
            onChange={handleScriptChange}
            placeholder="Enter your script idea or raw concept here..."
            className="w-full h-32 p-3 border border-blue-200 rounded-md bg-white"
          />
        </div>

        <CreativeControls 
          settings={settings}
          onToneChange={handleToneChange}
          onDurationChange={handleDurationChange}
          onMoodChange={handleMoodChange}
        />

        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          disabled={isGenerating || !scriptIdea.trim()}
          onClick={generateSuggestions}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Generating Suggestions...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Video Suggestions
            </>
          )}
        </Button>

        {processedData && (
          <div className="mt-4 text-sm text-blue-600">
            <div className="flex justify-between">
              <span>Estimated duration: <strong>{processedData.estimatedDuration}</strong></span>
              <span>Scenes: <strong>{processedData.scenes.length}</strong></span>
            </div>
          </div>
        )}

        <GeneratedContentTabs 
          generatedItems={generatedItems}
          scenes={processedData?.scenes || []}
          musicSuggestions={processedData?.musicSuggestions || []}
          voiceoverSuggestions={processedData?.voiceoverSuggestions || []}
          onEditScene={handleEditScene}
          onDeleteScene={handleDeleteScene}
          selectedMusic={selectedMusic}
          onSelectMusic={handleSelectMusic}
          selectedVoice={selectedVoice}
          onSelectVoice={handleSelectVoice}
        />
      </div>
    </div>
  );
};

export default ScriptToVideoPanel;
