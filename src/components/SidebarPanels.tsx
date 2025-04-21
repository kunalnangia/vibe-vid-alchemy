
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MediaLibraryPanel from "./MediaLibraryPanel";
import TemplatesPanel from "./TemplatesPanel";
import TextOverlayEditor from './TextOverlayEditor';
import { Upload } from 'lucide-react';

interface SidebarPanelsProps {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTextOverlay: () => void;
  selectedOverlayId: string | null;
  textOverlays: any[]; // Could use a more specific type if available
  onUpdateOverlay: (id: string, updates: any) => void;
  selectedClipId: string | null;
  setSelectedClipId: (id: string) => void;
  clips: any[];
}

const SidebarPanels: React.FC<SidebarPanelsProps> = ({
  handleFileUpload,
  addTextOverlay,
  selectedOverlayId,
  textOverlays,
  onUpdateOverlay,
  selectedClipId,
  setSelectedClipId,
  clips
}) => (
  <Tabs defaultValue="assets">
    <TabsList className="w-full grid grid-cols-4">
      <TabsTrigger className="flex-1" value="assets">Assets</TabsTrigger>
      <TabsTrigger className="flex-1" value="media">Media</TabsTrigger>
      <TabsTrigger className="flex-1" value="templates">Templates</TabsTrigger>
      <TabsTrigger className="flex-1" value="text">Text</TabsTrigger>
    </TabsList>
    <TabsContent value="assets">
      <div className="mt-4">
        <Button className="w-full" onClick={() => document.getElementById('upload-video')?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Video
        </Button>
        <input
          id="upload-video"
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        <div className="mt-4">
          <h3 className="font-medium text-sm text-gray-400 mb-2">Project Videos</h3>
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              const fromId = e.dataTransfer.getData("clip");
              if (!fromId) return;
              const toIndex = Number(e.currentTarget.getAttribute("data-index"));
              // Drag-drop reordering handled in main VideoEditor
            }}
          >
            {clips.map((clip, idx) => (
              <div
                key={clip.id}
                data-index={idx}
                className={`p-2 rounded mb-2 cursor-pointer ${selectedClipId === clip.id ? 'bg-editor-purple bg-opacity-50' : 'bg-editor-dark'}`}
                draggable
                onClick={() => setSelectedClipId(clip.id)}
                onDragStart={e => {
                  e.dataTransfer.setData("clip", clip.id);
                }}
              >
                <div className="text-sm truncate">Video Clip</div>
                <div className="text-xs text-gray-400">{clip.duration.toFixed(1)}s</div>
              </div>
            ))}
            {clips.length === 0 && (
              <div className="text-sm text-gray-500 italic">No videos added yet</div>
            )}
          </div>
        </div>
      </div>
    </TabsContent>
    <TabsContent value="media">
      <div className="mt-4">
        <MediaLibraryPanel />
      </div>
    </TabsContent>
    <TabsContent value="templates">
      <div className="mt-4">
        <TemplatesPanel />
      </div>
    </TabsContent>
    <TabsContent value="text">
      <div className="mt-4">
        <Button className="w-full" onClick={addTextOverlay}>
          Add Text
        </Button>
        {selectedOverlayId && (
          <TextOverlayEditor
            overlay={textOverlays.find(o => o.id === selectedOverlayId)}
            onUpdate={(updates) => onUpdateOverlay(selectedOverlayId, updates)}
          />
        )}
      </div>
    </TabsContent>
  </Tabs>
);

export default SidebarPanels;

