
import React from "react";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const StockMusicPanel: React.FC = () => (
  <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
    <h2 className="flex gap-2 items-center text-lg font-bold text-blue-900 mb-3">
      <Music className="w-5 h-5 text-purple-600" /> Stock Music &amp; SFX Library
    </h2>
    <p className="text-sm text-blue-800 mb-3">
      Browse royalty-free music and sound effects to enhance your content.
      <span className="ml-1 font-semibold text-yellow-500">Full access: Pro/Subscription</span>
    </p>
    <Button className="bg-gradient-to-r from-purple-500 to-pink-400 text-white px-5 font-semibold rounded-lg" disabled>
      Full Audio Library Coming Soon!
    </Button>
    <div className="mt-3 text-xs text-blue-600">Submit your own tracks or acquire licenses for exclusive SFX!</div>
  </div>
);

export default StockMusicPanel;
