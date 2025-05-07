
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Captions, Edit2, Save, X, Clock } from 'lucide-react';

interface Caption {
  id: number;
  text: string;
  startTime: number;
  endTime: number;
}

interface AutoCaptionsHandlerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  enabled: boolean;
  onToggle: () => void;
  currentTime?: number;
}

const AutoCaptionsHandler: React.FC<AutoCaptionsHandlerProps> = ({
  videoRef,
  enabled,
  onToggle,
  currentTime = 0
}) => {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentCaption, setCurrentCaption] = useState<Caption | null>(null);
  const [editingCaption, setEditingCaption] = useState<Caption | null>(null);
  const [editText, setEditText] = useState('');
  
  // Generate captions when enabled for the first time
  useEffect(() => {
    if (enabled && captions.length === 0 && !isGenerating) {
      handleGenerateCaptions();
    }
  }, [enabled, captions.length]);
  
  // Update current caption based on video time
  useEffect(() => {
    if (enabled && captions.length > 0) {
      const active = captions.find(
        caption => currentTime >= caption.startTime && currentTime <= caption.endTime
      );
      
      setCurrentCaption(active || null);
    } else {
      setCurrentCaption(null);
    }
  }, [currentTime, captions, enabled]);
  
  // Generate captions from video
  const handleGenerateCaptions = () => {
    setIsGenerating(true);
    setProgress(0);
    
    toast("Analyzing audio and generating captions...");
    
    // Simulate caption generation process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          finishGeneration();
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  // Complete the caption generation with mock data
  const finishGeneration = () => {
    const mockCaptions = [
      { id: 1, text: "Welcome to our video presentation", startTime: 0.5, endTime: 3.0 },
      { id: 2, text: "Today we're discussing video editing features", startTime: 3.5, endTime: 6.0 },
      { id: 3, text: "You can easily trim, crop and add effects", startTime: 6.5, endTime: 9.0 },
      { id: 4, text: "Our AI will enhance your content automatically", startTime: 9.5, endTime: 12.0 }
    ];
    
    setCaptions(mockCaptions);
    setIsGenerating(false);
    toast.success("Captions generated successfully!");
  };
  
  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Begin editing a caption
  const handleEditCaption = (caption: Caption) => {
    setEditingCaption(caption);
    setEditText(caption.text);
  };
  
  // Save edited caption
  const handleSaveEdit = () => {
    if (editingCaption) {
      setCaptions(captions.map(caption => 
        caption.id === editingCaption.id 
          ? { ...caption, text: editText }
          : caption
      ));
      setEditingCaption(null);
      toast.success("Caption updated");
    }
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCaption(null);
  };
  
  // Export captions as SRT
  const handleExportSRT = () => {
    let srtContent = '';
    captions.forEach((caption, index) => {
      const formatSRTTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
      };
      
      srtContent += `${index + 1}\n`;
      srtContent += `${formatSRTTime(caption.startTime)} --> ${formatSRTTime(caption.endTime)}\n`;
      srtContent += `${caption.text}\n\n`;
    });
    
    // Create downloadable file
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captions.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("SRT file exported successfully");
  };
  
  if (!enabled) return null;
  
  return (
    <div className="mt-4">
      {isGenerating ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Generating captions...</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      ) : (
        <>
          {/* Current caption display */}
          {currentCaption && (
            <div className="bg-black/75 py-2 px-4 rounded text-white text-center mb-2">
              {currentCaption.text}
            </div>
          )}
          
          {/* Caption editor */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Captions</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportSRT}
              >
                Export SRT
              </Button>
            </div>
            
            <div className="max-h-32 overflow-y-auto border rounded">
              {captions.length > 0 ? (
                <div className="divide-y">
                  {captions.map(caption => (
                    <div key={caption.id} className="p-2 hover:bg-gray-50">
                      {editingCaption?.id === caption.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                            className="text-sm min-h-8 h-auto"
                          />
                          <div className="flex justify-end space-x-1">
                            <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={handleSaveEdit}>
                              <Save className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(caption.startTime)} - {formatTime(caption.endTime)}
                            </div>
                            <div className="text-sm">{caption.text}</div>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => handleEditCaption(caption)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No captions available
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AutoCaptionsHandler;
