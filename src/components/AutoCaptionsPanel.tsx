
import React from "react";
import { Captions } from "lucide-react";
import { Button } from "@/components/ui/button";

const AutoCaptionsPanel: React.FC = () => (
  <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
    <h2 className="flex items-center gap-2 text-lg font-bold text-blue-900 mb-3">
      <Captions className="w-5 h-5 text-blue-500" />
      Auto-Captions &amp; Subtitles
    </h2>
    <p className="text-sm text-blue-800 mb-3">
      Automatically transcribe audio to captions and subtitles using cutting-edge Speech-to-Text.
      <span className="ml-1 font-semibold text-yellow-500">(Premium)</span>
    </p>
    <Button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 font-semibold rounded-lg"
      disabled
    >
      Coming soon: Add Auto-Captions
    </Button>
    <div className="mt-3 text-xs text-blue-600">Premium subtitle styles & language packs coming soon!</div>
  </div>
);

export default AutoCaptionsPanel;
