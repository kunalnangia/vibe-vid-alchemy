
import React from "react";
import { Video, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

const GreenScreenPanel: React.FC = () => (
  <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
    <h2 className="flex items-center gap-2 text-lg font-bold text-blue-900 mb-3">
      <Video className="w-5 h-5 text-green-500" /> Chroma Key / Green Screen
    </h2>
    <p className="text-sm text-blue-800 mb-3">
      Instantly remove video backgrounds or replace scenes with one click.<br />
      <span className="font-semibold text-yellow-500">Premium: High-Res Green Screen</span>
    </p>
    <Button className="bg-gradient-to-r from-green-500 to-yellow-500 text-white px-5 font-semibold rounded-lg"
      disabled
    >
      Advanced Green Screen Tools - Coming Soon!
    </Button>
    <div className="mt-3 text-xs text-blue-600">Perfect for viral content, interviews and product demos!</div>
  </div>
);

export default GreenScreenPanel;
