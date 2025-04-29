
import React from 'react';
import { Input } from "@/components/ui/input";

interface ScriptIdeaSectionProps {
  scriptIdea: string;
  setScriptIdea: (value: string) => void;
}

const ScriptIdeaSection: React.FC<ScriptIdeaSectionProps> = ({
  scriptIdea,
  setScriptIdea
}) => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Script Idea</h2>
      <Input
        className="py-6 text-lg bg-gray-100"
        placeholder="Script Idea"
        value={scriptIdea}
        onChange={(e) => setScriptIdea(e.target.value)}
      />
    </div>
  );
};

export default ScriptIdeaSection;
