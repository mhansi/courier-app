import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';
import { Role } from '../types/Auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const roles: Role[] = [Role.CLIENT, Role.ADMIN];

  if (!user || (roles && !roles.includes(user.role))) {
    return <Navigate to="/login" />;
  }
  
  return children;
};