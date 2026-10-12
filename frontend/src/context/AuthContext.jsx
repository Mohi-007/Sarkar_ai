import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('sarkar_ai_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setDefaultUser();
      }
    } else {
      setDefaultUser();
    }
    setLoading(false);
  }, []);

  const setDefaultUser = () => {
    const demoUser = {
      id: 'adv-001',
      name: 'Advocate Surya Sarkar',
      email: 'surya.sarkar@law.in',
      role: 'Senior Advocate & Legal Researcher',
      barCouncilNo: 'DEL/19824/2022',
      courtJurisdiction: 'Supreme Court of India / High Court of Delhi',
      casesWon: 42,
      mootSessions: 18,
    };
    setUser(demoUser);
    localStorage.setItem('sarkar_ai_user', JSON.stringify(demoUser));
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('sarkar_ai_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sarkar_ai_user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
