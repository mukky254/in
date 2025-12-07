import React, { useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import toast from 'react-hot-toast';

const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      setScanning(false);
      setResult('Processing...');
      
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/api/student/scan', 
          { qrCodeString: data },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        toast.success(response.data.message);
        setResult({
          success: true,
          data: response.data.attendance
        });
      } catch (error) {
        toast.error(error.response?.data?.message || 'Scan failed');
        setResult({
          success: false,
          error: error.response?.data?.message
        });
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
    toast.error('Error scanning QR code');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Scan QR Code</h2>
        <p className="text-gray-600">Point your camera at the lecturer's QR code</p>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
        {scanning ? (
          <QrScanner
            onDecode={handleScan}
            onError={handleError}
            constraints={{ facingMode: 'environment' }}
          />
        ) : (
          <div className="h-64 flex items-center justify-center">
            <button
              onClick={() => setScanning(true)}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Start Scanning
            </button>
          </div>
        )}
      </div>

      {result && (
        <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
          {result.success ? (
            <div>
              <h3 className="font-bold text-green-800">Attendance Recorded!</h3>
              <p className="text-green-700">
                {result.data.unitName} ({result.data.unitCode})
              </p>
              <p className="text-sm text-green-600">
                Time: {new Date(result.data.scannedAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-red-800">Error</h3>
              <p className="text-red-700">{result.error}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        <h4 className="font-bold mb-2">Instructions:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ensure good lighting</li>
          <li>Hold steady while scanning</li>
          <li>QR code must be from your lecturer</li>
          <li>You can only scan once per session</li>
        </ul>
      </div>
    </div>
  );
};

export default QRScanner;
