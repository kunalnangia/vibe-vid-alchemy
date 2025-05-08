
import { useEffect, useRef } from 'react';

interface UseVideoSourceProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string | File | null;
  onError?: (error: any) => void;
}

export const useVideoSource = ({
  videoRef,
  src,
  onError
}: UseVideoSourceProps) => {
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Clean up object URL on component unmount or when src changes
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [src]);

  // Set up video source when it changes
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    setHasError(false);
    setErrorDetails(null);
    
    // Clean up previous object URL if any
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    
    if (!src) {
      video.removeAttribute('src');
      video.load();
      return;
    }
    
    // Set video source based on type
    try {
      if (src instanceof File) {
        console.log('Loading video from File object:', src.name);
        const objectUrl = URL.createObjectURL(src);
        objectUrlRef.current = objectUrl;
        video.src = objectUrl;
      } else if (typeof src === 'string') {
        console.log('Loading video from URL:', src);
        video.src = src;
      }
      
      // Force video to load
      video.load();
      
    } catch (err) {
      console.error('Error setting video source:', err);
      setHasError(true);
      setErrorDetails(err);
      if (onError) onError(err);
    }
  }, [src, onError, videoRef]);

  return {
    hasError,
    errorDetails
  };
};

// Required useState import was missing
import { useState } from 'react';

export default useVideoSource;
