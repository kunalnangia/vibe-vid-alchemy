
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TextOverlay {
  id: string;
  text: string;
  position: { x: number, y: number };
  style: {
    color: string;
    fontSize: string;
    fontFamily: string;
  };
  startTime: number;
  endTime: number;
}

interface TextOverlayEditorProps {
  overlay: TextOverlay;
  onUpdate: (updates: Partial<TextOverlay>) => void;
}

const TextOverlayEditor: React.FC<TextOverlayEditorProps> = ({
  overlay,
  onUpdate,
}) => {
  const [text, setText] = useState(overlay.text);
  const [color, setColor] = useState(overlay.style.color);
  const [fontSize, setFontSize] = useState(parseInt(overlay.style.fontSize));
  const [fontFamily, setFontFamily] = useState(overlay.style.fontFamily);
  
  useEffect(() => {
    setText(overlay.text);
    setColor(overlay.style.color);
    setFontSize(parseInt(overlay.style.fontSize));
    setFontFamily(overlay.style.fontFamily);
  }, [overlay.id, overlay.text, overlay.style]);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onUpdate({ text: e.target.value });
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    onUpdate({ style: { ...overlay.style, color: e.target.value } });
  };
  
  const handleFontSizeChange = (values: number[]) => {
    const newSize = values[0];
    setFontSize(newSize);
    onUpdate({ style: { ...overlay.style, fontSize: `${newSize}px` } });
  };
  
  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
    onUpdate({ style: { ...overlay.style, fontFamily: value } });
  };
  
  return (
    <div className="mt-4 p-3 bg-editor-dark rounded">
      <h3 className="font-medium text-sm mb-3">Edit Text Overlay</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="overlay-text">Text</Label>
          <Input
            id="overlay-text"
            value={text}
            onChange={handleTextChange}
            className="bg-editor-darker border-gray-700"
          />
        </div>
        
        <div>
          <Label htmlFor="overlay-color">Color</Label>
          <div className="flex space-x-2">
            <Input
              id="overlay-color"
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-10 h-8 p-0 border-gray-700"
            />
            <Input
              value={color}
              onChange={handleColorChange}
              className="flex-1 bg-editor-darker border-gray-700"
            />
          </div>
        </div>
        
        <div>
          <Label>Font Size: {fontSize}px</Label>
          <Slider
            value={[fontSize]}
            min={8}
            max={72}
            step={1}
            onValueChange={handleFontSizeChange}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label>Font Family</Label>
          <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
            <SelectTrigger className="bg-editor-darker border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Helvetica">Helvetica</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem value="Courier New">Courier New</SelectItem>
              <SelectItem value="Georgia">Georgia</SelectItem>
              <SelectItem value="Verdana">Verdana</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TextOverlayEditor;
