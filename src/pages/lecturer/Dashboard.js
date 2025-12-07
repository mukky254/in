import React, { useState } from 'react';

const LecturerDashboard = () => {
  const [qrCodes] = useState([
    { id: 1, unitCode: 'CS101', unitName: 'Introduction to Programming', date: '2024-12-05', time: '09:00 AM', scans: 45, total: 50 },
    { id: 2, unitCode: 'CS201', unitName: 'Data Structures', date: '2024-12-04', time: '11:00 AM', scans: 38, total: 45 },
    { id: 3, unitCode: 'CS301', unitName: 'Algorithms', date: '2024-12-03', time: '02:00 PM', scans: 42, total: 48 },
  ]);

  const [recentScans] = useState([
    { id: 1, student: 'John Doe', admission: 'ST001', unit: 'CS101', time: '09:05 AM', status: 'On Time' },
    { id: 2, student: 'Jane Smith', admission: 'ST002', unit: 'CS101', time: '09:10 AM', status: 'Late' },
    { id: 3, student: 'Bob Johnson', admission: 'ST003', unit: 'CS101', time: '09:02 AM', status: 'On Time' },
    { id: 4, student: 'Alice Brown', admission: 'ST004', unit: 'CS201', time: '11:05 AM', status: 'On Time' },
  ]);

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Lecturer Dashboard
        </h1>
        <p style={{ color: '#6b7280' }}>Manage your classes and track student attendance</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Active Classes</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>3</p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '24px' }}>🏫</span>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Total Students</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>143</p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: '#d1fae5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '24px' }}>👥</span>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Today's Attendance</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>92%</p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '24px' }}>📊</span>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>QR Codes Generated</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>12</p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: '#ede9fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '24px' }}>🎫</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent QR Codes */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '32px',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>Recent QR Codes</h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Unit Code</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Unit Name</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Date & Time</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Attendance</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {qrCodes.map((qr) => (
                <tr key={qr.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{qr.unitCode}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{qr.unitName}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>
                    {qr.date} • {qr.time}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '500' }}>{qr.scans}/{qr.total}</span>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          ({Math.round((qr.scans / qr.total) * 100)}%)
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        marginTop: '4px'
                      }}>
                        <div style={{
                          width: `${(qr.scans / qr.total) * 100}%`,
                          height: '100%',
                          backgroundColor: '#10b981'
                        }}></div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: '#d1fae5',
                      color: '#065f46'
                    }}>
                      Active
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button style={{
                      padding: '6px 12px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Scans */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>Recent Attendance Scans</h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Student</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Admission</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Unit</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Time</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((scan) => (
                <tr key={scan.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{scan.student}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{scan.admission}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{scan.unit}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{scan.time}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: scan.status === 'On Time' ? '#d1fae5' : '#fef3c7',
                      color: scan.status === 'On Time' ? '#065f46' : '#92400e'
                    }}>
                      {scan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>🎫</span>
            Generate New QR Code
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: 'white',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>📄</span>
            Download Report
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: 'white',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>📧</span>
            Email Absent Students
          </button>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
