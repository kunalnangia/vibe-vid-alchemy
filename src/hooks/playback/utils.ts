
/**
 * Validates and clamps a time value between 0 and max duration
 * 
 * @param time Time value to validate
 * @param maxTime Maximum allowed time value
 * @returns Validated time value clamped between 0 and maxTime
 */
export const validateTimeValue = (time: number, maxTime: number): number => {
  // Ensure time is a valid number
  if (isNaN(time)) {
    throw new Error("Invalid time value");
  }
  
  // Clamp time between 0 and the maximum duration
  return Math.max(0, Math.min(time, maxTime));
};

/**
 * Calculates progress as a percentage based on current time and duration
 * 
 * @param currentTime Current playback time in seconds
 * @param duration Total duration in seconds
 * @returns Progress percentage between 0 and 100
 */
export const calculateProgress = (currentTime: number, duration: number): number => {
  if (!duration) return 0;
  return Math.min(100, Math.round((currentTime / duration) * 100));
};
