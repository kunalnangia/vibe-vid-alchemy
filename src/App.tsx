
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

// Create a new QueryClient instance - MUST be inside the component
const App = () => {
  // Create QueryClient inside the component to ensure React context is available
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner position="top-right" closeButton={true} theme="light" />
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
                      <Projects />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/templates" 
                  element={
                    <ProtectedRoute>
                      <Templates />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/ai-creator" 
                  element={
                    <ProtectedRoute>
                      <AICreator />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/publishing" 
                  element={
                    <ProtectedRoute>
                      <Publishing />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/collaborate" 
                  element={
                    <ProtectedRoute>
                      <Collaborate />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/plm" 
                  element={
                    <ProtectedRoute>
                      <PLMDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
