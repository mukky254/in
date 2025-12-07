import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Set base URL for axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://init-2.onrender.com';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = () => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      // Demo login for now
      const demoUsers = {
        'student@example.com': { 
          role: 'student', 
          name: 'John Student',
          admissionNumber: 'ST001',
          email: 'student@example.com'
        },
        'lecturer@example.com': { 
          role: 'lecturer', 
          name: 'Dr. Lecturer',
          email: 'lecturer@example.com'
        },
        'admin@example.com': { 
          role: 'admin', 
          name: 'Admin User',
          email: 'admin@example.com'
        }
      };
      
      if (demoUsers[email] && password === 'password123') {
        const userData = demoUsers[email];
        const token = 'demo-token-' + Date.now();
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
        
        return { success: true, role: userData.role };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const token = 'demo-token-' + Date.now();
      const newUser = {
        ...userData,
        id: 'user-' + Date.now()
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(newUser);
      
      return { success: true, role: newUser.role };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
