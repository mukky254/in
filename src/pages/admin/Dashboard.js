import React, { useState } from 'react';

const AdminDashboard = () => {
  const [students] = useState([
    { id: 1, name: 'John Doe', admission: 'ST001', course: 'Computer Science', attendance: '92%', status: 'Active' },
    { id: 2, name: 'Jane Smith', admission: 'ST002', course: 'Software Engineering', attendance: '88%', status: 'Active' },
    { id: 3, name: 'Bob Johnson', admission: 'ST003', course: 'Computer Science', attendance: '76%', status: 'At Risk' },
    { id: 4, name: 'Alice Brown', admission: 'ST004', course: 'Data Science', attendance: '95%', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', admission: 'ST005', course: 'Cyber Security', attendance: '65%', status: 'Critical' },
  ]);

  const [lecturers] = useState([
    { id: 1, name: 'Dr. John Smith', email: 'john@university.edu', units: 4, students: 120 },
    { id: 2, name: 'Prof. Sarah Johnson', email: 'sarah@university.edu', units: 3, students: 90 },
    { id: 3, name: 'Dr. Michael Brown', email: 'michael@university.edu', units: 2, students: 60 },
  ]);

  const [stats] = useState({
    totalStudents: 350,
    totalLecturers: 15,
    totalClasses: 45,
    todayAttendance: '89%',
    qrCodesGenerated: 128,
    systemUptime: '99.9%'
  });

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Admin Dashboard
        </h1>
        <p style={{ color: '#6b7280' }}>System overview and management panel</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {[
          { label: 'Total Students', value: stats.totalStudents, color: '#3b82f6', icon: '👥' },
          { label: 'Total Lecturers', value: stats.totalLecturers, color: '#10b981', icon: '👨‍🏫' },
          { label: 'Total Classes', value: stats.totalClasses, color: '#8b5cf6', icon: '🏫' },
          { label: "Today's Attendance", value: stats.todayAttendance, color: '#f59e0b', icon: '📊' },
          { label: 'QR Codes Generated', value: stats.qrCodesGenerated, color: '#ef4444', icon: '🎫' },
          { label: 'System Uptime', value: stats.systemUptime, color: '#06b6d4', icon: '⚡' },
        ].map((stat, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{stat.label}</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: stat.color }}>{stat.value}</p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: `${stat.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '24px' }}>{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
        {/* Students Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>Students</h2>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                + Add Student
              </button>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Name</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Admission</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Course</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Attendance</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{student.name}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{student.admission}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{student.course}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{student.attendance}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: student.status === 'Active' ? '#d1fae5' : 
                                       student.status === 'At Risk' ? '#fef3c7' : '#fee2e2',
                        color: student.status === 'Active' ? '#065f46' : 
                               student.status === 'At Risk' ? '#92400e' : '#991b1b'
                      }}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lecturers Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>Lecturers</h2>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                + Add Lecturer
              </button>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Name</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Email</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Units</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '500', color: '#374151' }}>Students</th>
                </tr>
              </thead>
              <tbody>
                {lecturers.map((lecturer) => (
                  <tr key={lecturer.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{lecturer.name}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{lecturer.email}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{lecturer.units}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{lecturer.students}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* System Reports */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>System Reports</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{
            backgroundColor: '#f0f9ff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dbeafe'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0369a1', marginBottom: '12px' }}>Attendance Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>Overall Attendance Rate</span>
              <span style={{ fontWeight: '500', color: '#10b981' }}>87%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>Classes with >90%</span>
              <span style={{ fontWeight: '500', color: '#10b981' }}>32</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>Classes with <70%</span>
              <span style={{ fontWeight: '500', color: '#ef4444' }}>8</span>
            </div>
          </div>

          <div style={{
            backgroundColor: '#f0fdf4',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #d1fae5'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#065f46', marginBottom: '12px' }}>Recent Activity</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>QR Codes Today</span>
              <span style={{ fontWeight: '500', color: '#10b981' }}>15</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>Total Scans Today</span>
              <span style={{ fontWeight: '500', color: '#10b981' }}>1,234</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>System Logins</span>
              <span style={{ fontWeight: '500', color: '#10b981' }}>89</span>
            </div>
          </div>

          <div style={{
            backgroundColor: '#fef3c7',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid '#fde68a'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#92400e', marginBottom: '12px' }}>System Alerts</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>Pending Issues</span>
              <span style={{ fontWeight: '500', color: '#f59e0b' }}>3</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>Database Size</span>
              <span style={{ fontWeight: '500', color: '#10b981' }}>2.4 GB</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>Last Backup</span>
              <span style={{ fontWeight: '500', color: '#10b981' }}>Today, 02:00 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Admin Actions</h3>
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
            <span>📊</span>
            Generate Reports
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#10b981',
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
            <span>👥</span>
            Manage Users
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#8b5cf6',
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
            <span>⚙️</span>
            System Settings
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '8
