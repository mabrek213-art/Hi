import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string) => Promise<boolean>;
  register: (email: string, name: string, role: UserRole, organization?: string) => Promise<boolean>;
  googleLogin: (email: string, name: string, avatar?: string) => Promise<boolean>;
  logout: () => void;
  updateSubscription: (tier: 'free' | 'pro' | 'institutional') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'ventures_qa_token_v1';
const USER_KEY = 'ventures_qa_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      // Sync with server
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem(USER_KEY, JSON.stringify(data.user));
          }
        })
        .catch(() => {});
    }
  }, [token]);

  const login = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        localStorage.setItem(TOKEN_KEY, data.token);
        return true;
      }
    } catch (err) {
      console.error('Login error:', err);
    }
    return false;
  };

  const register = async (email: string, name: string, role: UserRole, organization?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role, organization })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        localStorage.setItem(TOKEN_KEY, data.token);
        return true;
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
    return false;
  };

  const googleLogin = async (email: string, name: string, avatar?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, avatar })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        localStorage.setItem(TOKEN_KEY, data.token);
        return true;
      }
    } catch (err) {
      console.error('Google login error:', err);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const updateSubscription = (tier: 'free' | 'pro' | 'institutional') => {
    if (user) {
      const updated = { ...user, subscriptionTier: tier };
      setUser(updated);
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, googleLogin, logout, updateSubscription }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
