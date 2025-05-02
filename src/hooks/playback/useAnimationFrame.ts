
import { useEffect, useRef } from 'react';

type AnimationFrameCallback = (timestamp: number) => void;

/**
 * A custom hook that runs an animation frame loop while a condition is true
 */
export const useAnimationFrame = (
  callback: AnimationFrameCallback,
  isActive: boolean = true
): void => {
  // Store the callback as a ref to prevent useEffect from re-running
  const callbackRef = useRef<AnimationFrameCallback>(callback);
  // Store the animation frame ID for cleanup
  const rafRef = useRef<number | null>(null);

  // Update the callback ref when the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up and tear down the animation frame loop
  useEffect(() => {
    // Skip if not active
    if (!isActive) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    // Function to run on each animation frame
    const animate = (timestamp: number) => {
      // Call the latest callback
      callbackRef.current(timestamp);
      // Request the next frame if still active
      rafRef.current = requestAnimationFrame(animate);
    };

    // Start the animation loop
    rafRef.current = requestAnimationFrame(animate);

    // Cleanup function to cancel animation when component unmounts or isActive changes
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isActive]);
};

export default useAnimationFrame;
