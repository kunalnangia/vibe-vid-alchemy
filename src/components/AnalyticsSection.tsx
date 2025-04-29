
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface AnalyticsSectionProps {
  views: number;
  clicks: number;
  handleDownloadAnalytics: () => void;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  views,
  clicks,
  handleDownloadAnalytics
}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-md space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xl">Views: {views}</span>
        <div className="h-2 bg-gray-300 rounded-full w-72"></div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xl">Clicks: {clicks}</span>
        <div className="h-2 bg-gray-300 rounded-full w-72"></div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full py-6 text-lg bg-white hover:bg-gray-50"
        onClick={handleDownloadAnalytics}
      >
        <Download className="mr-2 h-5 w-5" />
        Download Analytics Report
      </Button>
    </div>
  );
};

export default AnalyticsSection;
