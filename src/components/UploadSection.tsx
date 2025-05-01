
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Video } from "lucide-react";
import { toast } from "sonner";

interface UploadSectionProps {
  handleUpload: (file: File) => void;
  handleRecord: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  handleUpload,
  handleRecord
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStream, setRecordingStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const recordedChunks = useRef<Blob[]>([]);
  
  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is a video type
      if (!file.type.startsWith('video/')) {
        toast.error('Please select a video file');
        return;
      }
      
      // Call the handler with the selected file
      handleUpload(file);
      
      // Reset input value so same file can be selected again
      e.target.value = '';
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const startRecording = async () => {
    try {
      // Request permission to use camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      
      setRecordingStream(stream);
      
      // If we have a video preview element, set its source to the stream
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play().catch(err => console.error("Error playing stream:", err));
      }
      
      // Create a modal for recording UI
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
      modal.innerHTML = `
        <div class="bg-white p-6 rounded-xl max-w-2xl w-full">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">Record Video</h2>
            <button id="close-recording" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div class="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            <div id="video-container"></div>
          </div>
          
          <div class="flex items-center justify-center space-x-4">
            <button id="start-recording" class="px-4 py-2 bg-red-600 text-white rounded-full flex items-center">
              <span class="mr-1">●</span> Start Recording
            </button>
            <button id="stop-recording" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hidden">
              <span class="mr-1">■</span> Stop Recording
            </button>
            <div id="recording-time" class="text-lg font-mono hidden">00:00</div>
          </div>
          
          <div id="preview-container" class="mt-4 hidden">
            <h3 class="font-medium mb-2">Preview Recording</h3>
            <div class="aspect-video bg-black rounded-lg mb-4"></div>
            <div class="flex justify-end space-x-2">
              <button id="discard-recording" class="px-4 py-2 border border-gray-300 rounded">Discard</button>
              <button id="use-recording" class="px-4 py-2 bg-purple-600 text-white rounded">Use This Recording</button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Add video preview to the modal
      const videoContainer = modal.querySelector('#video-container');
      if (videoContainer && videoPreviewRef.current) {
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.autoplay = true;
        videoElement.muted = true; // To prevent feedback
        videoElement.className = 'w-full h-full';
        videoContainer.appendChild(videoElement);
      }
      
      // Set up recording functionality
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };
      
      recorder.onstop = () => {
        // Show preview when recording is stopped
        const previewContainer = modal.querySelector('#preview-container');
        const previewVideo = document.createElement('video');
        previewVideo.controls = true;
        previewVideo.className = 'w-full h-full';
        
        const recordedBlob = new Blob(recordedChunks.current, { type: 'video/webm' });
        previewVideo.src = URL.createObjectURL(recordedBlob);
        
        const previewVideoContainer = modal.querySelector('#preview-container div');
        if (previewVideoContainer) {
          previewVideoContainer.innerHTML = '';
          previewVideoContainer.appendChild(previewVideo);
          if (previewContainer) previewContainer.classList.remove('hidden');
        }
      };
      
      // Add event listeners to modal buttons
      const closeBtn = modal.querySelector('#close-recording');
      const startBtn = modal.querySelector('#start-recording');
      const stopBtn = modal.querySelector('#stop-recording');
      const discardBtn = modal.querySelector('#discard-recording');
      const useBtn = modal.querySelector('#use-recording');
      const timeDisplay = modal.querySelector('#recording-time');
      
      let timerInterval: number | null = null;
      let seconds = 0;
      
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          // Stop all tracks in the stream
          stream.getTracks().forEach(track => track.stop());
          if (timerInterval) clearInterval(timerInterval);
          document.body.removeChild(modal);
          setIsRecording(false);
          setRecordingStream(null);
          setMediaRecorder(null);
        });
      }
      
      if (startBtn) {
        startBtn.addEventListener('click', () => {
          recordedChunks.current = [];
          recorder.start();
          setIsRecording(true);
          
          if (startBtn) startBtn.classList.add('hidden');
          if (stopBtn) stopBtn.classList.remove('hidden');
          if (timeDisplay) timeDisplay.classList.remove('hidden');
          
          // Start timer
          seconds = 0;
          if (timeDisplay) timeDisplay.textContent = '00:00';
          timerInterval = window.setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            if (timeDisplay) {
              timeDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }
          }, 1000);
        });
      }
      
      if (stopBtn) {
        stopBtn.addEventListener('click', () => {
          recorder.stop();
          setIsRecording(false);
          
          if (stopBtn) stopBtn.classList.add('hidden');
          if (timeDisplay) timeDisplay.classList.add('hidden');
          
          // Stop timer
          if (timerInterval) clearInterval(timerInterval);
        });
      }
      
      if (discardBtn) {
        discardBtn.addEventListener('click', () => {
          recordedChunks.current = [];
          const previewContainer = modal.querySelector('#preview-container');
          if (previewContainer) previewContainer.classList.add('hidden');
          if (startBtn) startBtn.classList.remove('hidden');
        });
      }
      
      if (useBtn) {
        useBtn.addEventListener('click', () => {
          const recordedBlob = new Blob(recordedChunks.current, { type: 'video/webm' });
          // Convert Blob to File object
          const recordedFile = new File([recordedBlob], `recording-${new Date().toISOString()}.webm`, {
            type: 'video/webm'
          });
          
          // Upload the recorded file
          handleUpload(recordedFile);
          
          // Clean up
          stream.getTracks().forEach(track => track.stop());
          if (timerInterval) clearInterval(timerInterval);
          document.body.removeChild(modal);
          setIsRecording(false);
          setRecordingStream(null);
          setMediaRecorder(null);
          toast.success("Recording added to project");
        });
      }
      
    } catch (err) {
      console.error("Error accessing camera/microphone:", err);
      toast.error("Could not access camera or microphone. Please check permissions.");
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelected}
        accept="video/*"
        className="hidden"
      />
      
      <Button 
        className="px-8 py-6 text-lg bg-gray-100 hover:bg-gray-200 text-gray-800" 
        variant="outline"
        onClick={triggerFileInput}
      >
        <Upload className="mr-2 h-5 w-5" />
        Upload Video
      </Button>
      
      <Button 
        className={`px-8 py-6 text-lg ${isRecording ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'} hover:bg-gray-200`}
        variant="outline"
        onClick={startRecording}
      >
        <Video className={`mr-2 h-5 w-5 ${isRecording ? 'text-red-500' : ''}`} />
        Record Video
      </Button>
      
      {/* Hidden video element for recording preview */}
      <video ref={videoPreviewRef} className="hidden" />
    </div>
  );
};

export default UploadSection;
