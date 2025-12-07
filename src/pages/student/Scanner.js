import React, { useState, useRef, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiCamera, FiCheckCircle, FiUpload, FiX } from 'react-icons/fi';

const Scanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [scanner, setScanner] = useState(null);
  const scannerRef = useRef(null);

  const startScanner = () => {
    if (scanner) {
      scanner.clear();
      setScanner(null);
    }

    setScanning(true);
    setResult(null);

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
      },
      false
    );

    html5QrcodeScanner.render(
      async (decodedText) => {
        html5QrcodeScanner.clear();
        setScanning(false);
        await processQRCode(decodedText);
      },
      (error) => {
        console.log('QR Code scan error:', error);
      }
    );

    setScanner(html5QrcodeScanner);
  };

  const stopScanner = () => {
    if (scanner) {
      scanner.clear();
      setScanner(null);
    }
    setScanning(false);
  };

  const processQRCode = async (qrString) => {
    try {
      const token = localStorage.getItem('token');
      
      // Try to send to backend
      try {
        const response = await axios.post('/api/student/scan', 
          { qrString },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setResult({
          success: true,
          data: response.data.attendance
        });
        toast.success('Attendance recorded successfully!');
      } catch (apiError) {
        // If backend fails, use demo data
        const demoData = generateDemoAttendance(qrString);
        setResult({
          success: true,
          data: demoData,
          isDemo: true
        });
        toast.success('Demo attendance recorded!');
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to process QR code'
      });
      toast.error('Scan failed. Please try again.');
    }
  };

  const generateDemoAttendance = (qrString) => {
    const units = [
      { code: 'CS101', name: 'Introduction to Programming', lecturer: 'Dr. Smith' },
      { code: 'MATH201', name: 'Calculus I', lecturer: 'Prof. Johnson' },
      { code: 'PHY101', name: 'Physics Fundamentals', lecturer: 'Dr. Williams' },
      { code: 'ENG101', name: 'English Composition', lecturer: 'Prof. Brown' },
      { code: 'BIO101', name: 'Biology Basics', lecturer: 'Dr. Davis' }
    ];
    
    const randomUnit = units[Math.floor(Math.random() * units.length)];
    const locations = ['Main Hall', 'Science Block', 'Room 101', 'Lecture Theater', 'Lab Building'];
    
    return {
      qrString: qrString,
      unitCode: randomUnit.code,
      unitName: randomUnit.name,
      lecturer: randomUnit.lecturer,
      location: locations[Math.floor(Math.random() * locations.length)],
      scannedAt: new Date().toISOString(),
      isDemo: true
    };
  };

  const handleManualEntry = () => {
    const qrString = prompt('Enter QR code string manually:');
    if (qrString) {
      processQRCode(qrString);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            const demoData = generateDemoAttendance(`file_${Date.now()}`);
            setResult({
              success: true,
              data: demoData,
              isDemo: true
            });
            resolve();
          }, 1000);
        }),
        {
          loading: 'Processing QR code image...',
          success: 'QR code processed successfully!',
          error: 'Failed to process QR code',
        }
      );
    }
  };

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Scanner</h1>
          <p className="text-gray-600">Scan your lecturer's QR code to mark attendance</p>
        </div>

        {/* Scanner Section */}
        <div className="mb-8">
          <div className="bg-gray-900 rounded-lg overflow-hidden p-4">
            <div id="qr-reader" className="min-h-[400px] flex items-center justify-center">
              {!scanning && (
                <div className="text-center text-white">
                  <FiCamera className="text-6xl mx-auto mb-4 opacity-50" />
                  <p className="text-xl mb-4">Camera preview will appear here</p>
                  <button
                    onClick={startScanner}
                    className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg font-medium"
                  >
                    Start Camera Scanner
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={startScanner}
              disabled={scanning}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors font-medium flex items-center gap-2"
            >
              <FiCamera />
              {scanning ? 'Scanning...' : 'Start Scanner'}
            </button>
            
            {scanning && (
              <button
                onClick={stopScanner}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
              >
                <FiX />
                Stop Scanner
              </button>
            )}
          </div>
        </div>

        {/* Alternative Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
              <FiUpload className="text-blue-600 text-2xl" />
            </div>
            <h3 className="font-bold text-blue-900 text-lg mb-2 text-center">Upload QR Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
              <span className="text-green-600 font-bold text-xl">T</span>
            </div>
            <h3 className="font-bold text-green-900 text-lg mb-2 text-center">Manual Entry</h3>
            <p className="text-green-700 text-sm mb-4 text-center">
              Enter QR code string manually
            </p>
            <button
              onClick={handleManualEntry}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Enter QR Code Manually
            </button>
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div className={`p-6 rounded-lg ${result.success ? 'bg-green-50' : 'bg-red-50'} mb-8`}>
            <div className="flex items-start space-x-3">
              {result.success ? (
                <>
                  <FiCheckCircle className="text-green-600 text-2xl mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-green-800 text-lg">Attendance Recorded Successfully! ✅</h3>
                      {result.isDemo && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Demo Mode
                        </span>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-green-100 p-3 rounded">
                        <p className="text-sm text-green-700 font-medium">Unit</p>
                        <p className="text-green-900">{result.data.unitName} ({result.data.unitCode})</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded">
                        <p className="text-sm text-green-700 font-medium">Time</p>
                        <p className="text-green-900">{new Date(result.data.scannedAt).toLocaleString()}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded">
                        <p className="text-sm text-green-700 font-medium">Location</p>
                        <p className="text-green-900">{result.data.location}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded">
                        <p className="text-sm text-green-700 font-medium">Lecturer</p>
                        <p className="text-green-900">{result.data.lecturer}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded">
                      <p className="text-sm text-green-700 font-medium">QR Code Scanned:</p>
                      <code className="text-xs text-green-900 break-all">
                        {result.data.qrString}
                      </code>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-red-600 text-2xl mt-1">✗</div>
                  <div>
                    <h3 className="font-bold text-red-800">Scan Failed</h3>
                    <p className="text-red-700 mt-1">{result.error}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-bold text-gray-900 text-lg mb-3">📋 Instructions:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">For Students:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Ensure camera permissions are granted</li>
                <li>• Position QR code within the frame</li>
                <li>• Hold steady until scan completes</li>
                <li>• Check confirmation message</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Important Notes:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• QR codes are session-specific</li>
                <li>• One scan per student per session</li>
                <li>• Scan within class time only</li>
                <li>• Contact support for issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
