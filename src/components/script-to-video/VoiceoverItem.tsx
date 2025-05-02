
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface VoiceoverItemProps {
  name: string;
  gender: string;
  style: string;
}

const VoiceoverItem: React.FC<VoiceoverItemProps> = ({ name, gender, style }) => {
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

export default VoiceoverItem;
