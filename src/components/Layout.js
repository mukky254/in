import React, { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ role }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = {
    student: [
      { name: 'Dashboard', path: 'dashboard' },
      { name: 'Profile', path: 'profile' },
      { name: 'Scan QR', path: 'scanner' },
    ],
    lecturer: [
      { name: 'Dashboard', path: 'dashboard' },
      { name: 'Generate QR', path: 'generate-qr' },
    ],
    admin: [
      { name: 'Dashboard', path: 'dashboard' },
    ]
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Mobile sidebar toggle */}
      <div style={{ position: 'fixed', top: '16px', left: '16px', zIndex: 50 }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            padding: '8px',
            borderRadius: '6px',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '256px',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.2s ease-in-out',
        zIndex: 40
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Logo */}
          <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>
              IN System
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
              Attendance Management
            </p>
          </div>

          {/* User Info */}
          <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p style={{ fontWeight: '500', margin: 0 }}>{user?.name}</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, textTransform: 'capitalize' }}>
                  {role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, padding: '16px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {navigation[role]?.map((item) => (
                <li key={item.path} style={{ marginBottom: '8px' }}>
                  <NavLink
                    to={item.path}
                    end
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: isActive ? '#3b82f6' : '#374151',
                      backgroundColor: isActive ? '#eff6ff' : 'transparent',
                      fontWeight: isActive ? '500' : '400'
                    })}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                width: '100%',
                color: '#dc2626',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '0', minHeight: '100vh' }}>
        <main style={{ padding: '16px', paddingTop: '80px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
