
import React from "react";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";

const TemplateMarketplacePanel: React.FC = () => (
  <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-yellow-200 max-w-xl mx-auto animate-fade-in">
    <h2 className="flex gap-2 items-center text-lg font-bold text-yellow-900 mb-3">
      <Store className="w-5 h-5 text-yellow-600" />
      Template Marketplace
    </h2>
    <p className="text-sm text-yellow-900 mb-3">
      Buy, sell, or list your own templates! Monetize your creativity or find trending packs.
      <span className="ml-1 font-semibold text-yellow-500">Earn commission on sales or offer packs.</span>
    </p>
    <Button className="bg-gradient-to-r from-yellow-400 to-pink-300 text-white px-4 font-semibold rounded-lg" disabled>
      Start Selling – Coming Soon!
    </Button>
    <div className="mt-3 text-xs text-yellow-700">Apply for early creator access and shape marketplace features.</div>
  </div>
);

export default TemplateMarketplacePanel;
