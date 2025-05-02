
/**
 * Formats time in seconds to MM:SS format
 */
export const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Clamps a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Validates that a time value is within bounds
 */
export const validateTimeValue = (time: number, duration: number): number => {
  if (isNaN(time)) {
    return 0;
  }
  return clamp(time, 0, duration);
};

/**
 * Calculates progress percentage
 */
export const calculateProgress = (currentTime: number, duration: number): number => {
  if (!duration) return 0;
  return (currentTime / duration) * 100;
};
