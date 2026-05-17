import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { mockAuthApi } from './mockAuthApi';

const TOKEN_KEY = 'smartmed_token';
const USER_KEY = 'smartmed_user';

const AuthContext = createContext(null);

const readPersisted = () => {
  // Prefer localStorage (Remember Me) over sessionStorage
  const local = localStorage.getItem(TOKEN_KEY);
  if (local) {
    return {
      token: local,
      user: safeParse(localStorage.getItem(USER_KEY)),
      remember: true,
    };
  }
  const session = sessionStorage.getItem(TOKEN_KEY);
  if (session) {
    return {
      token: session,
      user: safeParse(sessionStorage.getItem(USER_KEY)),
      remember: false,
    };
  }
  return { token: null, user: null, remember: false };
};

const safeParse = (s) => {
  try {
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
};

const persist = ({ token, user, remember }) => {
  // Clear both first
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  if (!token) return;
  const store = remember ? localStorage : sessionStorage;
  store.setItem(TOKEN_KEY, token);
  store.setItem(USER_KEY, JSON.stringify(user));
};

export const AuthProvider = ({ children }) => {
  const [{ token, user }, setState] = useState(() => readPersisted());
  const [loading, setLoading] = useState(false);

  const setAuth = (next, remember) => {
    setState(next);
    persist({ ...next, remember });
  };

  const login = async ({ email, password, remember }) => {
    setLoading(true);
    try {
      const { user: u, token: t } = await mockAuthApi.login({
        email,
        password,
      });
      setAuth({ token: t, user: u }, remember);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const { user: u, token: t, verificationCode } =
        await mockAuthApi.register(data);
      // Register signs you in but with unverified flag
      setAuth({ token: t, user: u }, false);
      return { user: u, verificationCode };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuth({ token: null, user: null }, false);
  };

  const verifyEmail = async ({ email, code }) => {
    const { user: updated } = await mockAuthApi.verifyEmail({ email, code });
    if (user && user.id === updated.id) {
      const remember = !!localStorage.getItem(TOKEN_KEY);
      setAuth({ token, user: updated }, remember);
    }
    return updated;
  };

  const resendVerification = ({ email }) =>
    mockAuthApi.resendVerification({ email });

  const forgotPassword = ({ email }) => mockAuthApi.forgotPassword({ email });

  const resetPassword = ({ token: t, password }) =>
    mockAuthApi.resetPassword({ token: t, password });

  const updateProfile = async (updates) => {
    if (!user) throw new Error('Not authenticated');
    const { user: updated } = await mockAuthApi.updateProfile({
      userId: user.id,
      updates,
    });
    const remember = !!localStorage.getItem(TOKEN_KEY);
    setAuth({ token, user: updated }, remember);
    return updated;
  };

  // Cross-tab sync: if user logs out elsewhere, reflect here
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === TOKEN_KEY || e.key === USER_KEY) {
        setState(readPersisted());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      loading,
      login,
      register,
      logout,
      verifyEmail,
      resendVerification,
      forgotPassword,
      resetPassword,
      updateProfile,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
