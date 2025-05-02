
import { useRef, useEffect } from 'react';

/**
 * Hook for using requestAnimationFrame with a callback
 */
export const useAnimationFrame = (callback: (time: number) => void, shouldAnimate: boolean) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  useEffect(() => {
    if (!shouldAnimate) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      return;
    }
    
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        callback(time);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [shouldAnimate, callback]);
  
  return null;
};

export default useAnimationFrame;
