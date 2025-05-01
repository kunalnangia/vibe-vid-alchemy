
import { useState } from 'react';
import { toast } from "sonner";

interface Clip {
  id: string;
  name: string;
  duration: number;
  type: string;
  file?: File;
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
      
      if (!file.type.startsWith('video/')) {
        toast.error('Please select a video file');
        return;
      }
      
      toast.success(`Uploaded file: ${file.name}`);
      
      // Create a video element to get duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        // Add new clip to the timeline with actual duration
        const newClip = {
          id: `clip-${Date.now()}`,
          name: file.name,
          duration: video.duration || 10, // Default to 10s if duration can't be determined
          type: "video",
          file: file // Store the actual file
        };
        
        setClips([...clips, newClip]);
        setSelectedClipId(newClip.id);
        
        // Clean up
        URL.revokeObjectURL(video.src);
      };
      
      video.onerror = () => {
        toast.error("Error loading video metadata");
        // Still add the clip but with estimated duration
        const newClip = {
          id: `clip-${Date.now()}`,
          name: file.name,
          duration: 10, // Default duration
          type: "video",
          file: file
        };
        
        setClips([...clips, newClip]);
        setSelectedClipId(newClip.id);
        
        // Clean up
        URL.revokeObjectURL(video.src);
      };
      
      // Load the file
      video.src = URL.createObjectURL(file);
      
      // Reset input value so same file can be selected again
      e.target.value = '';
    }
  };
  
  const handleSplitClip = () => {
    if (selectedClipId) {
      const selectedClipIndex = clips.findIndex(clip => clip.id === selectedClipId);
      
      if (selectedClipIndex >= 0) {
        const selectedClip = clips[selectedClipIndex];
        
        // Create two clips from the original
        const firstHalfClip = {
          ...selectedClip,
          id: `clip-${Date.now()}-1`,
          name: `${selectedClip.name} (Part 1)`,
          duration: selectedClip.duration / 2
        };
        
        const secondHalfClip = {
          ...selectedClip,
          id: `clip-${Date.now()}-2`,
          name: `${selectedClip.name} (Part 2)`,
          duration: selectedClip.duration / 2
        };
        
        // Replace the original clip with the two new clips
        const newClips = [
          ...clips.slice(0, selectedClipIndex),
          firstHalfClip,
          secondHalfClip,
          ...clips.slice(selectedClipIndex + 1)
        ];
        
        setClips(newClips);
        setSelectedClipId(firstHalfClip.id);
        toast.success("Clip split at current position");
      }
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
