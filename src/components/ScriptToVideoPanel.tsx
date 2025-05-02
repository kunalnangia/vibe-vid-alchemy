
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, FileText, Video, Music, Clock, PaletteIcon, MessageSquare } from "lucide-react";
import { toast } from "sonner";

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

        <div className="mb-6">
          <h3 className="text-md font-medium text-blue-700 mb-2">Creative Controls:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-blue-700">
                <MessageSquare className="mr-1 h-4 w-4 text-blue-500" />
                Tone
              </label>
              <div className="flex flex-wrap gap-2">
                {["professional", "casual", "energetic", "serious"].map(tone => (
                  <Button
                    key={tone}
                    size="sm"
                    variant={settings.tone === tone ? "default" : "outline"}
                    className={settings.tone === tone 
                      ? "bg-blue-500 hover:bg-blue-600 text-white" 
                      : "border-blue-200 text-blue-700"}
                    onClick={() => handleToneChange(tone)}
                  >
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-blue-700">
                <Clock className="mr-1 h-4 w-4 text-blue-500" />
                Duration
              </label>
              <div className="flex flex-wrap gap-2">
                {["30 seconds", "60 seconds", "2 minutes", "5 minutes"].map(duration => (
                  <Button
                    key={duration}
                    size="sm"
                    variant={settings.duration === duration ? "default" : "outline"}
                    className={settings.duration === duration 
                      ? "bg-blue-500 hover:bg-blue-600 text-white" 
                      : "border-blue-200 text-blue-700"}
                    onClick={() => handleDurationChange(duration)}
                  >
                    {duration}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-blue-700">
                <PaletteIcon className="mr-1 h-4 w-4 text-blue-500" />
                Visual Mood
              </label>
              <div className="flex flex-wrap gap-2">
                {["bright", "dark", "vibrant", "minimalist"].map(mood => (
                  <Button
                    key={mood}
                    size="sm"
                    variant={settings.mood === mood ? "default" : "outline"}
                    className={settings.mood === mood 
                      ? "bg-blue-500 hover:bg-blue-600 text-white" 
                      : "border-blue-200 text-blue-700"}
                    onClick={() => handleMoodChange(mood)}
                  >
                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

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
        </div>

        {/* Results tabs - only shown when items are generated */}
        {Object.values(generatedItems).some(value => value) && (
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
        )}
      </div>
    </div>
  );
};

// Helper components
const SceneItem: React.FC<{
  number: number;
  title: string;
  description: string;
  duration: string;
}> = ({ number, title, description, duration }) => {
  return (
    <div className="flex items-center p-3 border border-blue-100 rounded bg-blue-50">
      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
        {number}
      </div>
      <div className="flex-grow">
        <h5 className="font-medium text-blue-800">{title}</h5>
        <p className="text-sm text-blue-600">{description}</p>
      </div>
      <div className="text-xs text-blue-500 font-mono">{duration}</div>
    </div>
  );
};

const MusicTrackItem: React.FC<{
  title: string;
  duration: string;
  category: string;
}> = ({ title, duration, category }) => {
  return (
    <div className="flex items-center justify-between p-2 border border-blue-100 rounded hover:bg-blue-50">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-2">
          <Play className="h-4 w-4" />
        </Button>
        <div>
          <div className="font-medium text-blue-800">{title}</div>
          <div className="text-xs text-blue-500">{category}</div>
        </div>
      </div>
      <div className="text-xs text-blue-500">{duration}</div>
    </div>
  );
};

const VoiceoverItem: React.FC<{
  name: string;
  gender: string;
  style: string;
}> = ({ name, gender, style }) => {
  return (
    <div className="flex items-center justify-between p-2 border border-blue-100 rounded hover:bg-blue-50">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-2">
          <Play className="h-4 w-4" />
        </Button>
        <div>
          <div className="font-medium text-blue-800">{name}</div>
          <div className="text-xs text-blue-500">{gender}</div>
        </div>
      </div>
      <div className="text-sm text-blue-600">{style}</div>
    </div>
  );
};

// Import the Play component from lucide-react
const Play = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export default ScriptToVideoPanel;
