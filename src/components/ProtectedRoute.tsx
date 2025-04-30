
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  
  // During initial loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }
  
  // For preview purposes, allow access even if not authenticated
  // This ensures the preview will always work while maintaining the route protection in production
  if (!user) {
    // In development preview mode, render children even without authentication
    if (window.location.hostname.includes('lovable.dev') || 
        window.location.hostname.includes('localhost')) {
      return <>{children}</>;
    }
    
    // In production, redirect to auth page
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
