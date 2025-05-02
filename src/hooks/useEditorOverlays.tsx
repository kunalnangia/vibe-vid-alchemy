
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { TextOverlay } from '@/lib/video/types';

export const useEditorOverlays = () => {
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);

  // Add a new text overlay
  const addTextOverlay = () => {
    const newOverlay: TextOverlay = {
      id: uuidv4(),
      text: 'New Text',
      position: { x: 100, y: 100 },
      style: {
        color: '#ffffff',
        fontSize: 24,
        fontFamily: 'Arial'
      },
      startTime: 0,
      endTime: 10
    };
    
    setTextOverlays([...textOverlays, newOverlay]);
    setSelectedOverlayId(newOverlay.id);
    toast.success('Text overlay added');
  };

  // Update an existing text overlay
  const updateTextOverlay = (id: string, updates: Partial<TextOverlay>) => {
    setTextOverlays(textOverlays.map(overlay => 
      overlay.id === id ? { ...overlay, ...updates } : overlay
    ));
  };

  // Remove a text overlay
  const removeTextOverlay = (id: string) => {
    setTextOverlays(textOverlays.filter(overlay => overlay.id !== id));
    
    if (selectedOverlayId === id) {
      setSelectedOverlayId(null);
    }
    
    toast.success('Text overlay removed');
  };

  return {
    textOverlays,
    setTextOverlays,
    selectedOverlayId,
    setSelectedOverlayId,
    addTextOverlay,
    updateTextOverlay,
    removeTextOverlay
  };
};

export default useEditorOverlays;
