
export * from './useVideoEvents';
export * from './useVideoSource';
export * from './useVideoControls';

// Re-export the default hook for backward compatibility
import useVideoPlayer from './useVideoPlayer';
export default useVideoPlayer;
