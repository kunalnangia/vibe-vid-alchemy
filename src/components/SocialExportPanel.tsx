
import React from "react";
import { Youtube, Instagram, Tiktok, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialExportPanel: React.FC = () => (
  <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
    <h2 className="flex gap-2 items-center text-lg font-bold text-blue-900 mb-3">
      <Share className="w-5 h-5 text-blue-400" /> One-Click Social Export
    </h2>
    <p className="text-sm text-blue-800 mb-3">
      Export and share directly to <span className="font-semibold text-rose-500">YouTube</span>, <span className="font-semibold text-pink-500">Instagram</span>, <span className="font-semibold text-black">TikTok</span>, and more.
      <span className="ml-1 text-yellow-500 font-semibold">Batch & scheduled export: Premium</span>
    </p>
    <div className="flex gap-2 mb-4">
      <Button className="bg-blue-600 text-white px-3 rounded" disabled>
        YouTube
      </Button>
      <Button className="bg-pink-500 text-white px-3 rounded" disabled>
        Instagram
      </Button>
      <Button className="bg-black text-white px-3 rounded" disabled>
        TikTok
      </Button>
    </div>
    <div className="mt-2 text-xs text-blue-600">Scheduling, analytics, and deep integrations launching soon!</div>
  </div>
);

export default SocialExportPanel;
