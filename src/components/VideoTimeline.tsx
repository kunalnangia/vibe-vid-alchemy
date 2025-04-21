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
  const [zoom, setZoom] = useState(1);
  const timelineScale = 100 * zoom;
  const totalWidth = Math.max(project.duration * timelineScale, 1000);

  const generateTimeMarkers = () => {
    const markers = [];
    const markerInterval = zoom < 0.5 ? 10 : 5;
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

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left + timelineRef.current.scrollLeft;
    const clickedTime = offsetX / timelineScale;
    onSeek(clickedTime);
  };

  const handleClipMouseDown = (e: React.MouseEvent, clipId: string) => {
    e.stopPropagation();
    onSelectClip(clipId);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-44 mb-2 border-0 bg-transparent rounded-2xl shadow studio-card overflow-hidden px-0 pt-2 max-w-5xl mx-auto font-ui">
      {/* Zoom controls */}
      <div className="flex items-center justify-end p-2 bg-transparent">
        <div className="flex items-center space-x-2 bg-white/60 dark:bg-editor-darker/80 rounded-lg px-3 py-1 shadow-sm">
          <span className="text-xs text-gray-400">Zoom:</span>
          <button
            className="text-gray-700 dark:text-gray-200 font-bold hover:text-editor-purple text-xs px-2 bg-transparent rounded-lg border border-transparent hover:border-editor-purple transition"
            onClick={() => setZoom(Math.max(0.2, zoom - 0.2))}
          >
            -
          </button>
          <span className="text-xs text-gray-700 dark:text-gray-200">{zoom.toFixed(1)}x</span>
          <button
            className="text-gray-700 dark:text-gray-200 font-bold hover:text-editor-purple text-xs px-2 bg-transparent rounded-lg border border-transparent hover:border-editor-purple transition"
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
            style={{
              left: `${currentTime * timelineScale}px`,
              boxShadow: "0 0 0 4px rgba(148, 114, 255, 0.16)"
            }}
          />
          {/* Video clips */}
          {project.clips.map((clip) => (
            <div
              key={clip.id}
              className={`timeline-item font-ui ${selectedClipId === clip.id ? 'selected popped' : ''}`}
              style={{
                left: `${clip.position * timelineScale}px`,
                width: `${clip.duration * timelineScale}px`,
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => handleClipMouseDown(e, clip.id)}
              tabIndex={0}
              title="Drag or click to select"
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
              className="absolute h-3 bg-gradient-to-r from-editor-purple via-editor-blue to-editor-purple rounded-sm top-1.5"
              style={{
                left: `${overlay.startTime * timelineScale}px`,
                width: `${(overlay.endTime - overlay.startTime) * timelineScale}px`,
                opacity: 0.85,
                zIndex: 14,
              }}
            >
              <div className="text-xs text-white truncate px-1">T</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoTimeline;
