import React from 'react';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: '#3b82f6',
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}>
          🎓 IN Attendance System
        </h1>
        <p style={{
          color: '#4b5563',
          fontSize: '1.125rem',
          marginBottom: '2rem'
        }}>
          QR Code Based Attendance Management
        </p>
        
        <div style={{
          backgroundColor: '#dbeafe',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>System Status</h3>
          <p style={{ color: '#1e3a8a' }}>
            ✅ Frontend is building successfully!
          </p>
          <p style={{ color: '#1e3a8a', marginTop: '0.5rem' }}>
            Backend API: <code style={{ backgroundColor: '#eff6ff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>https://init-2.onrender.com</code>
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: '#f0f9ff',
            padding: '1.5rem',
            borderRadius: '0.5rem'
          }}>
            <h4 style={{ color: '#0369a1' }}>👨‍🎓 Student</h4>
            <p style={{ color: '#0c4a6e' }}>Scan QR codes, view attendance</p>
          </div>
          <div style={{
            backgroundColor: '#fef2f2',
            padding: '1.5rem',
            borderRadius: '0.5rem'
          }}>
            <h4 style={{ color: '#dc2626' }}>👨‍🏫 Lecturer</h4>
            <p style={{ color: '#7f1d1d' }}>Generate QR codes, track attendance</p>
          </div>
          <div style={{
            backgroundColor: '#f0fdf4',
            padding: '1.5rem',
            borderRadius: '0.5rem'
          }}>
            <h4 style={{ color: '#15803d' }}>👨‍💼 Admin</h4>
            <p style={{ color: '#14532d' }}>Manage users, view reports</p>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Demo Credentials:</p>
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.875rem'
          }}>
            <p>student@example.com / password123</p>
            <p>lecturer@example.com / password123</p>
            <p>admin@example.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
