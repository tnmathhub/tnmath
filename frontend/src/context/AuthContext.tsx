import { createContext, useContext, useEffect, useMemo, useState, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser, AuthTokens, UserRole } from '@/types';
import { getInitials } from '@/utils/helpers';
import { createTokenPair, saveTokens, readTokens, clearTokens, isAccessTokenExpired } from '@/utils/tokenStorage';
import { ensureFreshAccessToken } from '@/utils/apiClient';

interface AuthContextValue {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  login: (
    name: string,
    email: string,
    role: UserRole,
    extra?: Partial<Pick<AuthUser, 'schoolName' | 'username' | 'district' | 'qualification' | 'phone'>>
  ) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
  updateProfile: (fields: Partial<Pick<AuthUser, 'name' | 'email' | 'schoolName'>>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USER_STORAGE_KEY = 'tn-maths-edu:user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore session on load.
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    const storedTokens = readTokens();
    if (storedUser && storedTokens) {
      try {
        setUser(JSON.parse(storedUser));
        setTokens(storedTokens);
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
        clearTokens();
      }
    }
  }, []);

  const scheduleAutoRefresh = useCallback((currentTokens: AuthTokens) => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    const msUntilRefresh = Math.max(currentTokens.accessTokenExpiresAt - Date.now() - 30_000, 5_000);
    refreshTimer.current = setTimeout(async () => {
      const newAccessToken = await ensureFreshAccessToken();
      const latest = readTokens();
      if (newAccessToken && latest) {
        setTokens(latest);
        scheduleAutoRefresh(latest);
      }
    }, msUntilRefresh);
  }, []);

  useEffect(() => {
    if (tokens && !isAccessTokenExpired(tokens)) {
      scheduleAutoRefresh(tokens);
    }
    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
  }, [tokens, scheduleAutoRefresh]);

  const login = (
    name: string,
    email: string,
    role: UserRole,
    extra?: Partial<Pick<AuthUser, 'schoolName' | 'username' | 'district' | 'qualification' | 'phone'>>
  ) => {
    const nextUser: AuthUser = {
      id: crypto.randomUUID(),
      name,
      email,
      role,
      ...extra,
      avatarInitial: getInitials(name),
    };
    const nextTokens = createTokenPair();

    setUser(nextUser);
    setTokens(nextTokens);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    saveTokens(nextTokens);
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    localStorage.removeItem(USER_STORAGE_KEY);
    clearTokens();
  };

  const refreshAccessToken = useCallback(async () => {
    const newAccessToken = await ensureFreshAccessToken();
    const latest = readTokens();
    if (latest) setTokens(latest);
    return newAccessToken;
  }, []);

  const updateProfile = useCallback((fields: Partial<Pick<AuthUser, 'name' | 'email' | 'schoolName'>>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next: AuthUser = {
        ...prev,
        ...fields,
        avatarInitial: fields.name ? getInitials(fields.name) : prev.avatarInitial,
      };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, tokens, login, logout, refreshAccessToken, updateProfile, isAuthenticated: Boolean(user && tokens) }),
    [user, tokens, refreshAccessToken, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
