
import { useState } from 'react';
import { VideoClip } from '@/lib/video/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export const useEditorClips = () => {
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);

  // Function to handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }
    
    // Create object URL for the file
    const objectUrl = URL.createObjectURL(file);
    
    // Create a video element to get duration
    const video = document.createElement('video');
    video.src = objectUrl;
    
    video.onloadedmetadata = () => {
      const newClip: VideoClip = {
        id: uuidv4(),
        src: objectUrl,
        file: file,
        start: 0,
        end: video.duration,
        position: 0,
        duration: video.duration,
        name: file.name,
        type: file.type
      };
      
      setClips([newClip]);
      setSelectedClipId(newClip.id);
      toast.success(`Video "${file.name}" uploaded successfully`);
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      toast.error('Error loading video. The file may be corrupted or in an unsupported format.');
    };
    
    // Load the video to trigger onloadedmetadata
    video.load();
  };
  
  // Function to handle upload from button click
  const handleUpload = (file?: File) => {
    if (file) {
      // If file is provided directly
      const objectUrl = URL.createObjectURL(file);
      
      const video = document.createElement('video');
      video.src = objectUrl;
      
      video.onloadedmetadata = () => {
        const newClip: VideoClip = {
          id: uuidv4(),
          src: objectUrl,
          file: file,
          start: 0,
          end: video.duration,
          position: 0,
          duration: video.duration,
          name: file.name,
          type: file.type
        };
        
        setClips([newClip]);
        setSelectedClipId(newClip.id);
        toast.success(`Video "${file.name}" uploaded successfully`);
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        toast.error('Error loading video');
      };
      
      video.load();
    } else {
      // Create a file input and trigger it
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'video/*';
      input.onchange = (e) => handleFileUpload(e as React.ChangeEvent<HTMLInputElement>);
      input.click();
    }
  };
  
  // Function to handle recording
  const handleRecord = () => {
    toast.info('Opening camera for recording...');
    // This would normally open a camera recording interface
    // For now, just show a notification
    setTimeout(() => {
      toast('Camera recording is not yet implemented', {
        description: 'This feature will be available in a future update.'
      });
    }, 1000);
  };

  // Function to split a clip at the current time
  const handleSplitClip = (currentTime: number) => {
    if (clips.length === 0 || !selectedClipId) {
      toast.error('No clip selected');
      return;
    }
    
    const selectedClip = clips.find(clip => clip.id === selectedClipId);
    if (!selectedClip) return;
    
    // Don't split if we're too close to the start or end
    if (currentTime < 0.5 || currentTime > selectedClip.duration - 0.5) {
      toast.error('Cannot split too close to the start or end of the video');
      return;
    }
    
    const firstClip: VideoClip = {
      ...selectedClip,
      id: uuidv4(),
      end: currentTime,
      duration: currentTime
    };
    
    const secondClip: VideoClip = {
      ...selectedClip,
      id: uuidv4(),
      start: currentTime,
      position: firstClip.position + firstClip.duration,
      duration: selectedClip.duration - currentTime
    };
    
    setClips([firstClip, secondClip]);
    setSelectedClipId(firstClip.id);
    toast.success('Clip split successfully');
  };

  return {
    clips,
    setClips,
    selectedClipId,
    setSelectedClipId,
    handleFileUpload,
    handleUpload,
    handleRecord,
    handleSplitClip
  };
};

export default useEditorClips;
