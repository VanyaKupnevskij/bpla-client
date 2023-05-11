import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export function useAuth() {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const isAuthenticated = Boolean(token);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      }),
    );
  }, []);

  const logout = useCallback((isReloadPage = true) => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
    if (isReloadPage) {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready, isAuthenticated };
}
