import React, { useState, useEffect } from 'react';

const StudentDashboard = () => {
  const [attendance, setAttendance] = useState([
    { id: 1, unitCode: 'CS101', unitName: 'Introduction to Programming', date: '2024-12-05', time: '09:00 AM', status: 'Present' },
    { id: 2, unitCode: 'MATH201', unitName: 'Calculus I', date: '2024-12-04', time: '11:00 AM', status: 'Present' },
    { id: 3, unitCode: 'PHY101', unitName: 'Physics Fundamentals', date: '2024-12-03', time: '02:00 PM', status: 'Late' },
    { id: 4, unitCode: 'ENG101', unitName: 'English Composition', date: '2024-12-02', time: '10:00 AM', status: 'Present' },
  ]);

  const [stats, setStats] = useState({
    totalClasses: 20,
    attended: 18,
    percentage: 90,
    onTime: 16,
    late: 2,
    absent: 2
  });

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Student Dashboard
        </h1>
        <p style={{ color: '#6b7280' }}>Welcome back! Here's your attendance summary.</p>
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
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Total Classes</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{stats.totalClasses}</p>
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
              <span style={{ fontSize: '24px' }}>📚</span>
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
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Classes Attended</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{stats.attended}</p>
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
              <span style={{ fontSize: '24px' }}>✅</span>
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
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Attendance %</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>{stats.percentage}%</p>
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
      </div>

      {/* Attendance History */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>Recent Attendance</h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Unit Code</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Unit Name</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Date</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Time</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr key={record.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{record.unitCode}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{record.unitName}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{record.date}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{record.time}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: record.status === 'Present' ? '#d1fae5' : 
                                     record.status === 'Late' ? '#fef3c7' : '#fecaca',
                      color: record.status === 'Present' ? '#065f46' : 
                            record.status === 'Late' ? '#92400e' : '#991b1b'
                    }}>
                      {record.status}
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
            <span>📱</span>
            Scan QR Code
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
            <span>👤</span>
            Update Profile
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
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
