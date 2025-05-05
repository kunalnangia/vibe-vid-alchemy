
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { VideoClip } from '@/lib/video/types';

export const useEditorClips = () => {
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);

  // Handle direct file upload
  const handleUpload = (file: File) => {
    if (!file) {
      toast.error('No file provided');
      return;
    }

    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }
    
    console.log("Processing video file:", file.name, file.type, file.size);
    toast.info("Processing video file...");
    
    // Create a temporary video element to extract duration and other metadata
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    // Create a URL for the file
    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;
    
    // When metadata is loaded, create the clip
    video.onloadedmetadata = () => {
      console.log("Video metadata loaded:", file.name, "duration:", video.duration);
      
      const newClip: VideoClip = {
        id: uuidv4(),
        src: objectUrl, // Keep the objectUrl reference
        file: file, // Store the original file object for reliable loading
        start: 0,
        end: video.duration,
        position: 0,
        duration: video.duration,
        name: file.name,
        type: file.type
      };
      
      setClips([newClip]);
      setSelectedClipId(newClip.id);
      toast.success(`Video "${file.name}" processed successfully`);
      
      // Clean up the temporary video element
      video.onloadedmetadata = null;
      video.onerror = null;
    };
    
    video.onerror = () => {
      console.error("Error loading video metadata:", video.error);
      URL.revokeObjectURL(objectUrl);
      toast.error('Error processing video. The file may be corrupted or in an unsupported format.');
    };
    
    // Load the video to trigger onloadedmetadata
    video.load();
  };

  // Handle file input change from any component
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    handleUpload(file);
  };
  
  // Function to handle recording - will be implemented in a separate component
  const handleRecord = () => {
    toast.info('Opening camera for recording...');
    // This would normally open a camera recording interface
    setTimeout(() => {
      toast('Recording functionality is being improved', {
        description: 'This feature will be available soon.'
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
