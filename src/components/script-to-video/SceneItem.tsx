
import React from 'react';

interface SceneItemProps {
  number: number;
  title: string;
  description: string;
  duration: string;
}

const SceneItem: React.FC<SceneItemProps> = ({ number, title, description, duration }) => {
  return (
    <div className="flex items-center p-3 border border-blue-100 rounded bg-blue-50">
      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
        {number}
      </div>
      <div className="flex-grow">
        <h5 className="font-medium text-blue-800">{title}</h5>
        <p className="text-sm text-blue-600">{description}</p>
      </div>
      <div className="text-xs text-blue-500 font-mono">{duration}</div>
    </div>
  );
};

export default SceneItem;
