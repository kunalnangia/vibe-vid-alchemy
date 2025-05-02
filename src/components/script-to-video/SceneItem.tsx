
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface SceneItemProps {
  number: number;
  title: string;
  description: string;
  duration: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const SceneItem: React.FC<SceneItemProps> = ({ 
  number, 
  title, 
  description, 
  duration,
  onEdit,
  onDelete
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`flex items-center p-3 border ${isHovered ? 'border-blue-300 bg-blue-100' : 'border-blue-100 bg-blue-50'} rounded transition-colors`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
        {number}
      </div>
      <div className="flex-grow">
        <h5 className="font-medium text-blue-800">{title}</h5>
        <p className="text-sm text-blue-600">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-xs text-blue-500 font-mono mr-2">{duration}</div>
        
        {isHovered && (
          <>
            {onEdit && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => onEdit(number)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" 
                onClick={() => onDelete(number)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SceneItem;
