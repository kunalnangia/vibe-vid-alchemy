
// Map of filter IDs to CSS filter strings
export const filterMap: Record<string, string> = {
  normal: 'none',
  warm: 'sepia(0.5) saturate(1.5)',
  cool: 'hue-rotate(30deg) saturate(1.2)',
  vivid: 'contrast(1.2) saturate(1.5)',
  vintage: 'sepia(0.4) contrast(0.9) saturate(0.8)',
  bw: 'grayscale(1)',
  blur: 'blur(2px)',
  sharp: 'contrast(1.3) brightness(0.9)',
  dreamy: 'brightness(1.1) contrast(0.9) blur(0.5px)',
};

// Map of aspect ratios to dimensions
export const aspectRatioMap: Record<string, { width: number, height: number, className: string }> = {
  landscape: { width: 640, height: 360, className: "w-full max-w-3xl" },
  portrait: { width: 360, height: 640, className: "h-[60vh] max-h-[640px]" },
  square: { width: 480, height: 480, className: "w-full max-w-lg" },
  vertical: { width: 432, height: 540, className: "h-[60vh] max-h-[540px]" },
  cinema: { width: 640, height: 272, className: "w-full max-w-3xl" },
};
