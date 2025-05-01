
// Define standard aspect ratios
export const aspectRatioMap: Record<string, { width: number; height: number; className: string }> = {
  landscape: {
    width: 1280,
    height: 720,
    className: 'aspect-video'
  },
  portrait: {
    width: 720,
    height: 1280,
    className: 'aspect-[9/16]'
  },
  square: {
    width: 1080,
    height: 1080,
    className: 'aspect-square'
  },
  widescreen: {
    width: 1920,
    height: 800,
    className: 'aspect-[2.4/1]'
  },
  ultrawide: {
    width: 2560,
    height: 1080,
    className: 'aspect-[21/9]'
  }
};

// Define video filters
export const filterMap: Record<string, string> = {
  normal: 'none',
  grayscale: 'grayscale(100%)',
  sepia: 'sepia(100%)',
  saturate: 'saturate(200%)',
  hue: 'hue-rotate(90deg)',
  invert: 'invert(80%)',
  brightened: 'brightness(150%)',
  vintage: 'sepia(50%) hue-rotate(-30deg) saturate(140%)',
  cool: 'brightness(110%) hue-rotate(180deg) saturate(120%)',
  warm: 'brightness(110%) hue-rotate(-30deg) saturate(130%)',
  dramatic: 'contrast(150%) brightness(90%)',
  noir: 'grayscale(100%) contrast(150%) brightness(80%)',
  faded: 'contrast(80%) brightness(120%) saturate(80%)',
  vibrant: 'contrast(120%) saturate(150%)',
  muted: 'contrast(90%) saturate(80%) brightness(110%)',
};

// Video file types supported
export const supportedVideoTypes = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-flv',
  'video/x-matroska'
];

// Audio file types supported
export const supportedAudioTypes = [
  'audio/mpeg',
  'audio/ogg',
  'audio/wav',
  'audio/webm',
  'audio/aac',
  'audio/flac'
];

// Default limits
export const DEFAULT_PROJECT_DURATION = 300; // 5 minutes in seconds
export const MAX_CLIPS = 50;
export const MAX_TEXT_OVERLAYS = 20;
