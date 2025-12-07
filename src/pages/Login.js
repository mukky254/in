import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate(`/${result.role}/dashboard`);
    } else {
      alert(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      padding: '16px'
    }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
            IN System
          </h1>
          <p style={{ color: '#6b7280' }}>QR Code Attendance Management</p>
        </div>

        {/* Login Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          padding: '32px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#3b82f6', fontWeight: '500', textDecoration: 'none' }}>
                Register here
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Demo Credentials:</h3>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              <p>👨‍🎓 Student: student@example.com / password123</p>
              <p>👨‍🏫 Lecturer: lecturer@example.com / password123</p>
              <p>👨‍💼 Admin: admin@example.com / password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
