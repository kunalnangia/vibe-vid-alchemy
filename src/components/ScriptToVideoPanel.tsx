
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";
import CreativeControls from "./script-to-video/CreativeControls";
import GeneratedContentTabs from "./script-to-video/GeneratedContentTabs";

interface ScriptToVideoPanelProps {
  scriptIdea: string;
  setScriptIdea: (value: string) => void;
}

const ScriptToVideoPanel: React.FC<ScriptToVideoPanelProps> = ({
  scriptIdea,
  setScriptIdea
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
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
  
  const [settings, setSettings] = useState({
    tone: "professional",
    duration: "60 seconds",
    mood: "bright",
  });

  const generateSuggestions = () => {
    if (!scriptIdea.trim()) {
      toast.error("Please enter a script idea first");
      return;
    }

    setIsGenerating(true);
    toast("Analyzing your script and generating suggestions...");

    // Simulate generation process
    setTimeout(() => {
      setGeneratedItems({
        scenes: true,
        footage: true,
        music: false,
        voiceover: false
      });
      toast.success("Scene breakdown and footage suggestions generated!");
    }, 2000);

    setTimeout(() => {
      setGeneratedItems(prev => ({ ...prev, music: true }));
      toast.success("Music suggestions generated!");
    }, 3500);

    setTimeout(() => {
      setGeneratedItems(prev => ({ ...prev, voiceover: true }));
      setIsGenerating(false);
      toast.success("All suggestions generated successfully!");
    }, 5000);
  };

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

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
          <Wand2 className="mr-2 h-6 w-6 text-blue-600" />
          Script-to-Video AI Workspace
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-700 mb-1">Your Script Idea:</label>
          <Textarea
            value={scriptIdea}
            onChange={(e) => setScriptIdea(e.target.value)}
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

        <GeneratedContentTabs generatedItems={generatedItems} />
      </div>
    </div>
  );
};

export default ScriptToVideoPanel;
