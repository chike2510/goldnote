import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const ACCOUNTS_KEY = 'goldnote_accounts';
const SESSION_KEY = 'goldnote_session';

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState(() => {
    try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || {}; }
    catch { return {}; }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try { return localStorage.getItem(SESSION_KEY) || null; }
    catch { return null; }
  });
  const [authError, setAuthError] = useState('');

  const saveAccounts = (accs) => {
    setAccounts(accs);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accs));
  };

  const register = (username, password, email) => {
    setAuthError('');
    if (!username.trim() || !password.trim() || !email.trim()) {
      setAuthError('All fields are required.');
      return false;
    }
    if (username.length < 3) { setAuthError('Username must be at least 3 characters.'); return false; }
    if (password.length < 6) { setAuthError('Password must be at least 6 characters.'); return false; }
    if (!email.includes('@')) { setAuthError('Enter a valid email address.'); return false; }
    const key = username.toLowerCase();
    if (accounts[key]) { setAuthError('Username already taken.'); return false; }
    const newAccounts = {
      ...accounts,
      [key]: { username, password, email, createdAt: Date.now(), careers: [] }
    };
    saveAccounts(newAccounts);
    setCurrentUser(key);
    localStorage.setItem(SESSION_KEY, key);
    return true;
  };

  const login = (username, password) => {
    setAuthError('');
    const key = username.toLowerCase();
    const acc = accounts[key];
    if (!acc) { setAuthError('Account not found.'); return false; }
    if (acc.password !== password) { setAuthError('Incorrect password.'); return false; }
    setCurrentUser(key);
    localStorage.setItem(SESSION_KEY, key);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const deleteAccount = (username, password) => {
    const key = username.toLowerCase();
    const acc = accounts[key];
    if (!acc || acc.password !== password) return false;
    const newAccounts = { ...accounts };
    delete newAccounts[key];
    saveAccounts(newAccounts);
    logout();
    return true;
  };

  const getUser = () => currentUser ? accounts[currentUser] : null;

  // Save career data to account
  const saveCareer = (careerData) => {
    if (!currentUser) return;
    const acc = accounts[currentUser];
    if (!acc) return;
    const careers = acc.careers || [];
    const idx = careers.findIndex(c => c.id === careerData.id);
    const updated = idx >= 0
      ? careers.map((c, i) => i === idx ? { ...careerData, savedAt: Date.now() } : c)
      : [...careers, { ...careerData, savedAt: Date.now() }];
    const newAccounts = { ...accounts, [currentUser]: { ...acc, careers: updated } };
    saveAccounts(newAccounts);
  };

  const deleteCareer = (careerId) => {
    if (!currentUser) return;
    const acc = accounts[currentUser];
    if (!acc) return;
    const careers = (acc.careers || []).filter(c => c.id !== careerId);
    const newAccounts = { ...accounts, [currentUser]: { ...acc, careers } };
    saveAccounts(newAccounts);
  };

  const getCareers = () => {
    if (!currentUser) return [];
    return accounts[currentUser]?.careers || [];
  };

  return (
    <AuthContext.Provider value={{
      currentUser, authError, setAuthError,
      register, login, logout, deleteAccount,
      getUser, saveCareer, deleteCareer, getCareers
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
