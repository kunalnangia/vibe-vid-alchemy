
import { useRef, useEffect } from 'react';

/**
 * Hook to manage animation frame for smooth playback
 * 
 * @param isActive Whether animation should be active
 * @param callback Function to call on each animation frame
 */
export const useAnimationFrame = (
  isActive: boolean, 
  callback: () => void
): void => {
  const rafId = useRef<number | null>(null);
  
  useEffect(() => {
    if (!isActive) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      return;
    }
    
    const animate = () => {
      callback();
      rafId.current = requestAnimationFrame(animate);
    };
    
    rafId.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isActive, callback]);
};
