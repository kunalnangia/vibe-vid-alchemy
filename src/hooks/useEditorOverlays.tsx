
import { useState } from 'react';
import { toast } from "sonner";

interface TextOverlay {
  id: string;
  text: string;
  position: { x: number, y: number };
  style: {
    color: string;
    fontSize: number;
    fontFamily: string;
  }
}

interface UseEditorOverlaysReturn {
  textOverlays: TextOverlay[];
  setTextOverlays: (overlays: TextOverlay[]) => void;
  selectedOverlayId: string | null;
  setSelectedOverlayId: (id: string | null) => void;
  addTextOverlay: () => void;
  updateTextOverlay: (id: string, updates: any) => void;
}

export const useEditorOverlays = (): UseEditorOverlaysReturn => {
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);
  
  const addTextOverlay = () => {
    const newOverlay = {
      id: `text-${Date.now()}`,
      text: "New Text",
      position: { x: 100, y: 100 },
      style: {
        color: "#ffffff",
        fontSize: 24,
        fontFamily: "Arial"
      }
    };
    
    setTextOverlays([...textOverlays, newOverlay]);
    setSelectedOverlayId(newOverlay.id);
    toast.success("Text overlay added");
  };
  
  const updateTextOverlay = (id: string, updates: any) => {
    setTextOverlays(
      textOverlays.map(overlay => 
        overlay.id === id ? { ...overlay, ...updates } : overlay
      )
    );
  };
  
  return {
    textOverlays,
    setTextOverlays,
    selectedOverlayId,
    setSelectedOverlayId,
    addTextOverlay,
    updateTextOverlay
  };
};
