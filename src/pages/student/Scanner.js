import React, { useState } from 'react';

const StudentScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = () => {
    setScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      const units = [
        { code: 'CS101', name: 'Introduction to Programming', lecturer: 'Dr. Smith', location: 'Main Hall' },
        { code: 'MATH201', name: 'Calculus I', lecturer: 'Prof. Johnson', location: 'Science Block' },
        { code: 'PHY101', name: 'Physics Fundamentals', lecturer: 'Dr. Williams', location: 'Lab Building' },
      ];
      
      const randomUnit = units[Math.floor(Math.random() * units.length)];
      
      setResult({
        success: true,
        data: {
          ...randomUnit,
          scannedAt: new Date().toISOString(),
          qrCode: `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }
      });
      setScanning(false);
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScanning(true);
      
      setTimeout(() => {
        setResult({
          success: true,
          data: {
            unitCode: 'CS101',
            unitName: 'Introduction to Programming',
            lecturer: 'Dr. Smith',
            location: 'Main Hall',
            scannedAt: new Date().toISOString(),
            qrCode: `file_${Date.now()}`
          }
        });
        setScanning(false);
      }, 1500);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          QR Code Scanner
        </h1>
        <p style={{ color: '#6b7280' }}>Scan your lecturer's QR code to mark attendance</p>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '32px'
      }}>
        {/* Scanner Preview */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            backgroundColor: '#1f2937',
            borderRadius: '8px',
            overflow: 'hidden',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {scanning ? (
              <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  border: '4px solid #3b82f6',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px'
                }}></div>
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
                <p>Scanning QR Code...</p>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                <div style={{
                  width: '256px',
                  height: '256px',
                  border: '2px dashed #4b5563',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <span style={{ fontSize: '48px' }}>📱</span>
                </div>
                <p>Camera preview will appear here</p>
              </div>
            )}
            
            {/* Scanner overlay */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              border: '2px solid #10b981',
              borderRadius: '8px',
              pointerEvents: 'none'
            }}></div>
          </div>
        </div>

        {/* Scanner Controls */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
          <button
            onClick={handleScan}
            disabled={scanning}
            style={{
              padding: '12px 32px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              opacity: scanning ? 0.5 : 1
            }}
          >
            {scanning ? 'Scanning...' : 'Start Scanner'}
          </button>
          
          <label style={{
            padding: '12px 32px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'inline-block'
          }}>
            📁 Upload QR Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {/* Result Display */}
        {result && (
          <div style={{
            padding: '24px',
            backgroundColor: result.success ? '#d1fae5' : '#fee2e2',
            borderRadius: '8px',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: result.success ? '#10b981' : '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{ color: 'white', fontSize: '20px' }}>
                  {result.success ? '✓' : '✗'}
                </span>
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: result.success ? '#065f46' : '#991b1b',
                  marginBottom: '12px'
                }}>
                  {result.success ? 'Attendance Recorded Successfully!' : 'Scan Failed'}
                </h3>
                
                {result.success && result.data && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px'
                  }}>
                    <div>
                      <p style={{ fontSize: '14px', color: '#374151', marginBottom: '4px' }}>Unit</p>
                      <p style={{ fontWeight: '500', color: '#111827' }}>
                        {result.data.unitName} ({result.data.unitCode})
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#374151', marginBottom: '4px' }}>Lecturer</p>
                      <p style={{ fontWeight: '500', color: '#111827' }}>{result.data.lecturer}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#374151', marginBottom: '4px' }}>Time</p>
                      <p style={{ fontWeight: '500', color: '#111827' }}>
                        {new Date(result.data.scannedAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#374151', marginBottom: '4px' }}>Location</p>
                      <p style={{ fontWeight: '500', color: '#111827' }}>{result.data.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={{
          backgroundColor: '#f0f9ff',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #dbeafe'
        }}>
          <h4 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#0369a1',
            marginBottom: '12px'
          }}>📋 How to Scan:</h4>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <p style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>1. Position QR Code</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Hold your device steady and position the QR code within the frame
              </p>
            </div>
            <div>
              <p style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>2. Wait for Scan</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Keep the QR code steady until the scan completes automatically
              </p>
            </div>
            <div>
              <p style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>3. Check Confirmation</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Look for the success message with attendance details
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '6px' }}>
            <p style={{ fontWeight: '500', color: '#92400e', marginBottom: '4px' }}>⚠️ Important Notes:</p>
            <ul style={{ fontSize: '14px', color: '#92400e', paddingLeft: '20px', margin: 0 }}>
              <li>QR codes are valid only during class sessions</li>
              <li>You can scan each QR code only once</li>
              <li>Make sure you're physically present in the classroom</li>
              <li>Contact your lecturer if you encounter issues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentScanner;
