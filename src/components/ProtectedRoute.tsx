
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
  
  // Always enforce authentication check, regardless of environment
  if (!user) {
    // Always redirect to auth page when not authenticated
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
