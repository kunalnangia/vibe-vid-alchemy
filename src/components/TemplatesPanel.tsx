
import React from "react";
import { Layers3 } from "lucide-react";

const templates = [
  {
    name: "Social Story",
    hint: "15s, fast-paced, vertical",
  },
  {
    name: "YouTube Intro",
    hint: "10s, animated title",
  },
  {
    name: "Promo Reel",
    hint: "30s, promotional, modern",
  },
];

const TemplatesPanel: React.FC = () => {
  return (
    <div>
      <h3 className="font-semibold text-white mb-3 flex items-center">
        <Layers3 className="w-5 h-5 mr-2 text-editor-purple" />
        Templates &amp; Presets
      </h3>
      <div className="space-y-3">
        {templates.map(tpl => (
          <div
            key={tpl.name}
            className="flex flex-col px-3 py-2 rounded border border-editor-purple border-opacity-30 bg-editor-dark hover:bg-editor-darker cursor-default"
          >
            <div className="font-medium text-white">{tpl.name}</div>
            <div className="text-xs text-gray-400">{tpl.hint}</div>
            <button
              className="mt-1 text-xs text-editor-purple hover:underline w-max"
              disabled
            >
              Use template (soon)
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-xs text-center text-gray-500">
        More templates coming soon!
      </div>
    </div>
  );
};

export default TemplatesPanel;

