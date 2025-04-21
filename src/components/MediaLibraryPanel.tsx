
import React from "react";
import { Folder, Image, Music2, FileVideo } from "lucide-react";

const mediaItems = [
  { type: "Stock Video", icon: FileVideo, description: "Stock videos coming soon" },
  { type: "Stock Images", icon: Image, description: "Stock images coming soon" },
  { type: "Stock Music", icon: Music2, description: "Royalty-free music coming soon" },
];

const MediaLibraryPanel: React.FC = () => {
  return (
    <div>
      <h3 className="font-semibold text-white mb-3 flex items-center">
        <Folder className="h-5 w-5 mr-2 text-editor-purple" />
        Media Library
      </h3>
      <div className="space-y-4">
        {mediaItems.map(item => (
          <div
            key={item.type}
            className="flex items-center p-2 bg-editor-dark rounded shadow hover:bg-editor-darker transition-colors"
          >
            <item.icon className="h-5 w-5 mr-3 text-editor-blue flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-200">{item.type}</div>
              <div className="text-xs text-gray-400">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-xs text-center text-gray-500">
        Browse and drag media to your timeline (feature coming soon)
      </div>
    </div>
  );
};

export default MediaLibraryPanel;

