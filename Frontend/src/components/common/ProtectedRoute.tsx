import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';
import { LoadingSpinner } from './Feedback';

export function ProtectedRoute({ roles }: { roles: UserRole[] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner label="Checking session…" />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (!roles.includes(user.role)) {
    const fallback = user.role === 'admin' ? '/admin' : user.role === 'lawyer' ? '/lawyer' : '/app';
    return <Navigate to={fallback} replace />;
  }
  return <Outlet />;
}
