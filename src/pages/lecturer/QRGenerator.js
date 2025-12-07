import React, { useState } from 'react';

const LecturerQRGenerator = () => {
  const [formData, setFormData] = useState({
    unitCode: 'CS101',
    unitName: 'Introduction to Programming',
    duration: '30',
    location: 'Main Hall, Room 101',
    session: 'Morning'
  });
  
  const [qrData, setQrData] = useState(null);
  const [generating, setGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateQR = () => {
    setGenerating(true);
    
    // Simulate QR generation
    setTimeout(() => {
      const now = new Date();
      const expiresAt = new Date(now.getTime() + (parseInt(formData.duration) * 60000));
      
      const qrInfo = {
        id: `qr_${Date.now()}`,
        qrString: `IN_${formData.unitCode}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        expiresAt: expiresAt.toISOString(),
        ...formData,
        createdAt: now.toISOString(),
        lecturer: 'Dr. John Smith'
      };
      
      setQrData(qrInfo);
      setGenerating(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    if (qrData) {
      navigator.clipboard.writeText(qrData.qrString);
      alert('QR Code copied to clipboard!');
    }
  };

  const printQR = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>QR Code - ${qrData.unitCode}</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
          .qr-code { margin: 20px auto; width: 300px; height: 300px; }
          .info { margin: 20px 0; text-align: left; display: inline-block; }
          .info-item { margin: 8px 0; }
          .label { font-weight: bold; display: inline-block; width: 120px; }
        </style>
      </head>
      <body>
        <h1>IN Attendance System</h1>
        <h2>Attendance QR Code</h2>
        
        <div class="qr-code">
          <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 100 100">
            <!-- QR Code Background -->
            <rect width="100" height="100" fill="white"/>
            <!-- QR Code Pattern -->
            <rect x="20" y="20" width="60" height="60" fill="black"/>
            <rect x="25" y="25" width="50" height="50" fill="white"/>
            <rect x="30" y="30" width="40" height="40" fill="black"/>
            <!-- QR Code Text -->
            <text x="50" y="85" text-anchor="middle" font-size="8">${qrData.unitCode}</text>
          </svg>
        </div>
        
        <div class="info">
          <div class="info-item">
            <span class="label">Unit Code:</span>
            <span>${qrData.unitCode}</span>
          </div>
          <div class="info-item">
            <span class="label">Unit Name:</span>
            <span>${qrData.unitName}</span>
          </div>
          <div class="info-item">
            <span class="label">Lecturer:</span>
            <span>${qrData.lecturer}</span>
          </div>
          <div class="info-item">
            <span class="label">Session:</span>
            <span>${qrData.session}</span>
          </div>
          <div class="info-item">
            <span class="label">Location:</span>
            <span>${qrData.location}</span>
          </div>
          <div class="info-item">
            <span class="label">Valid Until:</span>
            <span>${new Date(qrData.expiresAt).toLocaleString()}</span>
          </div>
        </div>
        
        <p style="margin-top: 30px; color: #666;">
          Scan this code using the IN Attendance System app to mark attendance
        </p>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Generate QR Code
        </h1>
        <p style={{ color: '#6b7280' }}>Create QR codes for student attendance marking</p>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '32px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Form Section */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
              QR Code Details
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Unit Code *
                </label>
                <input
                  type="text"
                  name="unitCode"
                  value={formData.unitCode}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  placeholder="e.g., CS101"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Unit Name *
                </label>
                <input
                  type="text"
                  name="unitName"
                  value={formData.unitName}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  placeholder="e.g., Introduction to Programming"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Duration (minutes) *
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  placeholder="e.g., Main Hall, Room 101"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Session
                </label>
                <select
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Weekend">Weekend</option>
                </select>
              </div>

              <button
                onClick={generateQR}
                disabled={generating}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginTop: '8px',
                  opacity: generating ? 0.5 : 1
                }}
              >
                {generating ? 'Generating QR Code...' : 'Generate QR Code'}
              </button>
            </div>
          </div>

          {/* QR Display Section */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
              Generated QR Code
            </h2>
            
            {qrData ? (
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '32px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{
                    width: '200px',
                    height: '200px',
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <div style={{
                      width: '160px',
                      height: '160px',
                      backgroundColor: 'black',
                      borderRadius: '4px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* QR Code Pattern */}
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        right: '20px',
                        bottom: '20px',
                        backgroundColor: 'white',
                        borderRadius: '2px'
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        top: '40px',
                        left: '40px',
                        right: '40px',
                        bottom: '40px',
                        backgroundColor: 'black',
                        borderRadius: '2px'
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        top: '60px',
                        left: '60px',
                        right: '60px',
                        bottom: '60px',
                        backgroundColor: 'white',
                        borderRadius: '2px'
                      }}></div>
                    </div>
                  </div>
                  <p style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280' }}>
                    Scan this code using the IN Attendance System app
                  </p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    backgroundColor: 'white',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'grid', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Unit:</span>
                        <span style={{ fontWeight: '500' }}>{qrData.unitName} ({qrData.unitCode})</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Valid Until:</span>
                        <span style={{ fontWeight: '500' }}>
                          {new Date(qrData.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Location:</span>
                        <span style={{ fontWeight: '500' }}>{qrData.location}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Session:</span>
                        <span style={{ fontWeight: '500' }}>{qrData.session}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  marginBottom: '20px'
                }}>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>QR Code String:</p>
                  <code style={{
                    fontSize: '11px',
                    color: '#374151',
                    wordBreak: 'break-all',
                    display: 'block'
                  }}>
                    {qrData.qrString}
                  </code>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={copyToClipboard}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Copy Code
                  </button>
                  <button
                    onClick={printQR}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Print QR
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '80px 32px',
                borderRadius: '12px',
                border: '2px dashed #d1d5db',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  border: '2px dashed #9ca3af',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <span style={{ fontSize: '32px', color: '#9ca3af' }}>QR</span>
                </div>
                <p style={{ color: '#6b7280' }}>
                  No QR code generated yet.
                  <br />
                  Fill the form and click "Generate QR Code"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          marginTop: '32px',
          padding: '24px',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #dbeafe'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0369a1', marginBottom: '12px' }}>
            📋 Instructions for Lecturers:
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <p style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>1. Generate QR Code</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Fill in class details and generate a unique QR code for each session
              </p>
            </div>
            <div>
              <p style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>2. Display in Class</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Project or print the QR code for students to scan at the beginning of class
              </p>
            </div>
            <div>
              <p style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>3. Track Attendance</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Monitor real-time attendance in your dashboard as students scan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerQRGenerator;
