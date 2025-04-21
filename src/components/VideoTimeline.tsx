
import React, { useRef, useState, useEffect } from 'react';

interface VideoClip {
  id: string;
  src: string;
  start: number;
  end: number;
  position: number;
  duration: number;
}

interface TextOverlay {
  id: string;
  text: string;
  position: { x: number, y: number };
  style: {
    color: string;
    fontSize: string;
    fontFamily: string;
  };
  startTime: number;
  endTime: number;
}

interface VideoProject {
  clips: VideoClip[];
  textOverlays: TextOverlay[];
  duration: number;
}

interface VideoTimelineProps {
  project: VideoProject;
  currentTime: number;
  selectedClipId: string | null;
  onSeek: (time: number) => void;
  onSelectClip: (id: string) => void;
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({
  project,
  currentTime,
  selectedClipId,
  onSeek,
  onSelectClip,
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1); // Zoom level
  const [isDragging, setIsDragging] = useState(false);
  
  // Calculate the scale for positioning elements on the timeline
  const timelineScale = 100 * zoom; // pixels per second
  const totalWidth = Math.max(project.duration * timelineScale, 1000);
  
  // Generate time markers
  const generateTimeMarkers = () => {
    const markers = [];
    const markerInterval = zoom < 0.5 ? 10 : 5; // seconds between markers
    const totalSeconds = Math.ceil(project.duration) || 60;
    
    for (let i = 0; i <= totalSeconds; i += markerInterval) {
      markers.push(
        <div 
          key={`marker-${i}`}
          className="time-marker"
          style={{ left: `${i * timelineScale}px` }}
        >
          {formatTime(i)}
        </div>
      );
    }
    
    return markers;
  };

  // Handle timeline click to seek
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left + timelineRef.current.scrollLeft;
    const clickedTime = offsetX / timelineScale;
    
    onSeek(clickedTime);
  };

  // Handle mousedown on clips
  const handleClipMouseDown = (e: React.MouseEvent, clipId: string) => {
    e.stopPropagation();
    onSelectClip(clipId);
  };

  // Format time for markers
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-48 border border-gray-700 rounded bg-editor-darker overflow-hidden">
      {/* Zoom controls */}
      <div className="flex items-center justify-end p-2 bg-editor-dark">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Zoom:</span>
          <button 
            className="text-gray-300 hover:text-white text-xs px-2 py-0.5 bg-editor-darker rounded"
            onClick={() => setZoom(Math.max(0.2, zoom - 0.2))}
          >
            -
          </button>
          <span className="text-xs text-gray-300">{zoom.toFixed(1)}x</span>
          <button 
            className="text-gray-300 hover:text-white text-xs px-2 py-0.5 bg-editor-darker rounded"
            onClick={() => setZoom(Math.min(2, zoom + 0.2))}
          >
            +
          </button>
        </div>
      </div>
      
      {/* Time markers */}
      <div className="time-markers" style={{ width: totalWidth }}>
        {generateTimeMarkers()}
      </div>
      
      {/* Timeline tracks */}
      <div 
        className="flex-1 overflow-x-auto overflow-y-hidden relative"
        onClick={handleTimelineClick}
        ref={timelineRef}
      >
        <div className="timeline-track" style={{ width: totalWidth }}>
          {/* Playhead */}
          <div 
            className="playhead"
            style={{ left: `${currentTime * timelineScale}px` }}
          />
          
          {/* Video clips */}
          {project.clips.map((clip) => (
            <div
              key={clip.id}
              className={`timeline-item ${selectedClipId === clip.id ? 'selected' : ''}`}
              style={{
                left: `${clip.position * timelineScale}px`,
                width: `${clip.duration * timelineScale}px`,
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => handleClipMouseDown(e, clip.id)}
            >
              <div className="text-xs text-white truncate p-1">
                Video Clip
              </div>
            </div>
          ))}
          
          {/* Text overlay markers */}
          {project.textOverlays.map((overlay) => (
            <div
              key={overlay.id}
              className="absolute h-4 bg-editor-purple rounded-sm top-0 mt-1"
              style={{
                left: `${overlay.startTime * timelineScale}px`,
                width: `${(overlay.endTime - overlay.startTime) * timelineScale}px`,
              }}
            >
              <div className="text-xs text-white truncate">T</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoTimeline;
