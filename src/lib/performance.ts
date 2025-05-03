import { useEffect } from 'react';

// Performance metrics interface
interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  timeToInteractive: number;
}

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Track page load time
    const loadTime = performance.now();
    
    // Track First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('First Contentful Paint:', entry.startTime);
        }
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Track Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('Largest Contentful Paint:', entry.startTime);
        }
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    return {
      loadTime,
      fcpObserver,
      lcpObserver,
    };
  }
  return null;
};

// React hook for performance monitoring
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    const performanceMetrics = initPerformanceMonitoring();
    
    return () => {
      if (performanceMetrics) {
        performanceMetrics.fcpObserver.disconnect();
        performanceMetrics.lcpObserver.disconnect();
      }
    };
  }, []);
};

// Function to measure component render time
export const measureComponentRender = (componentName: string) => {
  const start = performance.now();
  
  return {
    end: () => {
      const end = performance.now();
      const duration = end - start;
      console.log(`${componentName} render time:`, duration, 'ms');
      return duration;
    },
  };
};

// Function to log performance metrics
export const logPerformanceMetrics = (metrics: PerformanceMetrics) => {
  if (process.env.NODE_ENV === 'development') {
    console.group('Performance Metrics');
    console.log('Load Time:', metrics.loadTime, 'ms');
    console.log('First Contentful Paint:', metrics.firstContentfulPaint, 'ms');
    console.log('Largest Contentful Paint:', metrics.largestContentfulPaint, 'ms');
    console.log('Time to Interactive:', metrics.timeToInteractive, 'ms');
    console.groupEnd();
  }
}; 