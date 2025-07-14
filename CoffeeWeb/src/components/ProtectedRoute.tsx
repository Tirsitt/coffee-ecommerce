import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

type ProtectedRouteProps = {
  children: React.ReactNode;
  adminOnly?: boolean;
  redirectUnauthenticated?: string;
  redirectUnauthorized?: string;
};

export default function ProtectedRoute({
  children,
  adminOnly = false,
  redirectUnauthenticated = '/login',
  redirectUnauthorized = '/'
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (!user) {
    // Store attempted location for post-login redirect
    return (
      <Navigate 
        to={redirectUnauthenticated} 
        replace 
        state={{ from: location }} 
      />
    );
  }

  if (adminOnly && user.role !== 'admin') {
    return (
      <Navigate 
        to={redirectUnauthorized} 
        replace 
        state={{ 
          from: location,
          message: 'Admin privileges required' 
        }} 
      />
    );
  }

  return <>{children}</>;
}