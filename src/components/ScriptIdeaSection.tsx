
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { usePromptEnhancement } from '@/hooks/usePromptEnhancement';

interface ScriptIdeaSectionProps {
  scriptIdea: string;
  setScriptIdea: (value: string) => void;
}

const ScriptIdeaSection: React.FC<ScriptIdeaSectionProps> = ({
  scriptIdea,
  setScriptIdea
}) => {
  const { enhancePrompt, isEnhancing } = usePromptEnhancement();

  const handleEnhanceScript = async () => {
    if (scriptIdea) {
      const enhancedPrompt = await enhancePrompt(scriptIdea);
      if (enhancedPrompt) {
        setScriptIdea(enhancedPrompt);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Script Idea</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleEnhanceScript}
          disabled={isEnhancing || !scriptIdea}
          className="flex items-center gap-1"
        >
          {isEnhancing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Enhance with AI
            </>
          )}
        </Button>
      </div>
      <Input
        className="py-6 text-lg bg-gray-100"
        placeholder="Enter your script idea here"
        value={scriptIdea}
        onChange={(e) => setScriptIdea(e.target.value)}
      />
    </div>
  );
};

export default ScriptIdeaSection;
