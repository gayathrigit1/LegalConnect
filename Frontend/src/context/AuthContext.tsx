import { createContext, useContext, type ReactNode, useMemo, useState, useCallback } from 'react';
import type { AuthSession, User, UserRole } from '../types';
import { authService, type RegisterPayload } from '../services/authService';
import { userService } from '../services/userService';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
  hasRole: (...roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => authService.getCurrentSession());
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const next = await authService.login(email, password);
      setSession(next);
      return next.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setLoading(true);
    try {
      const next = await authService.register(payload);
      setSession(next);
      return next.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setSession(null);
  }, []);

  const updateUser = useCallback(
    async (updates: Partial<User>) => {
      if (!session) return;
      const updated = await userService.updateProfile(session.user.id, updates);
      const next = { ...session, user: updated };
      localStorage.setItem('lc_session', JSON.stringify(next));
      setSession(next);
    },
    [session],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      loading,
      login,
      register,
      logout,
      updateUser,
      hasRole: (...roles: UserRole[]) => Boolean(session && roles.includes(session.user.role)),
    }),
    [session, loading, login, register, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
