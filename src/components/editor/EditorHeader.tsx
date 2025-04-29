
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const EditorHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBackToProjects = () => {
    navigate('/projects');
  };

  return (
    <div className="flex items-center justify-between mb-2">
      <Button 
        variant="outline" 
        className="flex items-center gap-1" 
        onClick={handleBackToProjects}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Button>
    </div>
  );
};

export default EditorHeader;
