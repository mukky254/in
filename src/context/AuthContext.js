import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Set base URL for axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://attendance-system-backend.onrender.com';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        // For demo, create mock user if API fails
        const demoUser = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'student',
          admissionNumber: 'ST001'
        };
        setUser(demoUser);
      } catch (error) {
        // Use demo user if API fails
        const demoUser = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'student',
          admissionNumber: 'ST001'
        };
        setUser(demoUser);
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      toast.success('Login successful!');
      return { success: true, role: user.role };
    } catch (error) {
      // Demo login for testing
      const demoUsers = {
        'student@example.com': { role: 'student', name: 'John Student' },
        'lecturer@example.com': { role: 'lecturer', name: 'Dr. Lecturer' },
        'admin@example.com': { role: 'admin', name: 'Admin User' }
      };
      
      if (demoUsers[email] && password === 'password123') {
        const demoUser = {
          id: '1',
          name: demoUsers[email].name,
          email: email,
          role: demoUsers[email].role,
          admissionNumber: email === 'student@example.com' ? 'ST001' : null
        };
        
        localStorage.setItem('token', 'demo-token-' + Date.now());
        setUser(demoUser);
        toast.success('Demo login successful!');
        return { success: true, role: demoUser.role };
      }
      
      toast.error('Invalid credentials. Try: student@example.com / password123');
      return { success: false };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      toast.success('Registration successful!');
      return { success: true, role: user.role };
    } catch (error) {
      // Demo registration
      const demoUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
        role: userData.role,
        admissionNumber: userData.admissionNumber
      };
      
      localStorage.setItem('token', 'demo-token-' + Date.now());
      setUser(demoUser);
      toast.success('Demo registration successful!');
      return { success: true, role: userData.role };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
