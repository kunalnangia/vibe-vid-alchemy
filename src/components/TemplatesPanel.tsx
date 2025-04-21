
import React from "react";
import { LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Template {
  name: string;
  hint: string;
  isPremium: boolean;
}

const templates = [
  {
    name: "Social Story",
    hint: "15s, fast-paced, vertical",
    isPremium: false,
  },
  {
    name: "YouTube Intro",
    hint: "10s, animated title",
    isPremium: false,
  },
  {
    name: "Promo Reel",
    hint: "30s, promotional, modern",
    isPremium: true,
  },
  {
    name: "Product Showcase",
    hint: "20s, clean transitions",
    isPremium: true,
  },
  {
    name: "TikTok Dance",
    hint: "15s, trending music",
    isPremium: false,
  },
];

const TemplatesPanel: React.FC = () => {
  const handleTemplateSelect = (template: Template) => {
    if (template.isPremium) {
      toast.info(`"${template.name}" is a premium template. Upgrade to access all templates!`);
    } else {
      toast.success(`Template "${template.name}" selected!`);
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-white mb-3 flex items-center">
        <LayoutTemplate className="w-5 h-5 mr-2 text-blue-400" />
        Templates &amp; Presets
      </h3>
      <div className="space-y-3">
        {templates.map(tpl => (
          <div
            key={tpl.name}
            className={`flex flex-col px-3 py-2 rounded-lg border transition-all duration-200
              ${tpl.isPremium ? 
                'border-yellow-400/50 bg-gradient-to-r from-editor-dark/80 to-editor-dark hover:from-editor-dark/90 hover:to-editor-dark/70' : 
                'border-blue-500/30 bg-gradient-to-r from-blue-800/20 to-blue-900/30 hover:from-blue-800/30 hover:to-blue-900/40'
              } cursor-pointer hover:scale-[1.02]`}
            onClick={() => handleTemplateSelect(tpl)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-white">{tpl.name}</span>
              {tpl.isPremium && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full">
                  PRO
                </span>
              )}
            </div>
            <div className="text-xs text-gray-400">{tpl.hint}</div>
            <Button
              className="mt-1 text-xs bg-blue-600/40 hover:bg-blue-500 text-white px-2 py-0 h-6 w-max"
              variant="link"
              size="sm"
            >
              Use template
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-xs text-center text-blue-300">
        Browse full template library in the editor
      </div>
    </div>
  );
};

export default TemplatesPanel;
