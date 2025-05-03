import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Projects from "./pages/Projects";
import Templates from "./pages/Templates";
import AICreator from "./pages/AICreator";
import Publishing from "./pages/Publishing";
import Settings from "./pages/Settings";
import Collaborate from "./pages/Collaborate";
import PLMDashboard from "./pages/PLMDashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { usePerformanceMonitoring } from "@/lib/performance";

// Lazy load components for better performance
const LazyProjects = lazy(() => import("./pages/Projects"));
const LazyTemplates = lazy(() => import("./pages/Templates"));
const LazyAICreator = lazy(() => import("./pages/AICreator"));
const LazyPublishing = lazy(() => import("./pages/Publishing"));
const LazySettings = lazy(() => import("./pages/Settings"));
const LazyCollaborate = lazy(() => import("./pages/Collaborate"));
const LazyPLMDashboard = lazy(() => import("./pages/PLMDashboard"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

// Create a new QueryClient instance with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime with gcTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Initialize performance monitoring
  usePerformanceMonitoring();

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner position="top-right" closeButton={true} theme="light" />
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route 
                      path="/" 
                      element={
                        <ProtectedRoute>
                          <Index />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/projects" 
                      element={
                        <ProtectedRoute>
                          <LazyProjects />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/templates" 
                      element={
                        <ProtectedRoute>
                          <LazyTemplates />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/ai-creator" 
                      element={
                        <ProtectedRoute>
                          <LazyAICreator />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/publishing" 
                      element={
                        <ProtectedRoute>
                          <LazyPublishing />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/settings" 
                      element={
                        <ProtectedRoute>
                          <LazySettings />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/collaborate" 
                      element={
                        <ProtectedRoute>
                          <LazyCollaborate />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/plm" 
                      element={
                        <ProtectedRoute>
                          <LazyPLMDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </TooltipProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
