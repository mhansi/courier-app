import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { Role, type TokenUser } from '../types/Auth';
import { jwtDecode } from 'jwt-decode';

type AuthContextType = {
  user: TokenUser | null;
  isAdmin: boolean;
  onLogin: (token: string) => void;
  onLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

const getUserFromToken = (token: string): TokenUser | null => {
  try {
    return jwtDecode<TokenUser>(token);
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<TokenUser | null>(() => {
    const token = localStorage.getItem('token');
    return token ? getUserFromToken(token) : null;
  });

  const isAdmin = user?.role === Role.ADMIN;

  const onLogin = (token: string) => {
    localStorage.setItem('token', token);
    const userData = getUserFromToken(token);
    setUser(userData);
  };

  const onLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
