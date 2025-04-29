
import { useState } from 'react';
import { toast } from "sonner";

interface Clip {
  id: string;
  name: string;
  duration: number;
  type: string;
}

interface UseEditorClipsReturn {
  clips: Clip[];
  setClips: (clips: Clip[]) => void;
  selectedClipId: string | null;
  setSelectedClipId: (id: string | null) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSplitClip: () => void;
}

export const useEditorClips = (): UseEditorClipsReturn => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      toast.success(`Uploaded file: ${file.name}`);
      
      // Add new clip to the timeline
      const newClip = {
        id: `clip-${Date.now()}`,
        name: file.name,
        duration: Math.random() * 20 + 5, // Random duration for example
        type: "video"
      };
      
      setClips([...clips, newClip]);
      setSelectedClipId(newClip.id);
    }
  };
  
  const handleSplitClip = () => {
    if (selectedClipId) {
      toast.success("Clip split at current position");
    } else {
      toast.error("Please select a clip first");
    }
  };
  
  return {
    clips,
    setClips,
    selectedClipId,
    setSelectedClipId,
    handleFileUpload,
    handleSplitClip
  };
};
