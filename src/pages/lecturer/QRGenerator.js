import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';
import { FiCopy, FiPrinter, FiDownload } from 'react-icons/fi';
import moment from 'moment';

const QRGenerator = () => {
  const [formData, setFormData] = useState({
    unitCode: 'CS101',
    unitName: 'Introduction to Programming',
    duration: 30,
    location: 'Main Hall, Room 101',
    session: 'Morning',
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
    if (!formData.unitCode || !formData.unitName) {
      toast.error('Please fill in unit details');
      return;
    }

    setGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const qrString = `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const expiresAt = new Date(Date.now() + formData.duration * 60000);
      
      const qrInfo = {
        id: `qr_${Date.now()}`,
        qrString,
        expiresAt,
        ...formData,
        createdAt: new Date().toISOString(),
        lecturer: 'Dr. John Smith'
      };
      
      setQrData(qrInfo);
      setGenerating(false);
      toast.success('QR Code generated successfully!');
    }, 500);
  };

  const copyToClipboard = () => {
    if (qrData) {
      navigator.clipboard.writeText(qrData.qrString);
      toast.success('QR Code copied to clipboard!');
    }
  };

  const printQR = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>QR Code - ${qrData.unitCode}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header { 
              margin-bottom: 30px;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .qr-container { 
              margin: 30px auto;
              padding: 20px;
              border: 2px dashed #ccc;
              display: inline-block;
            }
            .info { 
              margin: 20px 0;
              text-align: left;
              display: inline-block;
            }
            .info-row { 
              margin: 8px 0;
              display: flex;
            }
            .label { 
              font-weight: bold;
              min-width: 150px;
            }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>IN Attendance System</h1>
            <h2>Attendance QR Code</h2>
          </div>
          
          <div class="qr-container">
            <div id="qrcode"></div>
          </div>
          
          <div class="info">
            <div class="info-row">
              <span class="label">Unit Code:</span>
              <span>${qrData.unitCode}</span>
            </div>
            <div class="info-row">
              <span class="label">Unit Name:</span>
              <span>${qrData.unitName}</span>
            </div>
            <div class="info-row">
              <span class="label">Lecturer:</span>
              <span>${qrData.lecturer}</span>
            </div>
            <div class="info-row">
              <span class="label">Session:</span>
              <span>${qrData.session}</span>
            </div>
            <div class="info-row">
              <span class="label">Location:</span>
              <span>${qrData.location}</span>
            </div>
            <div class="info-row">
              <span class="label">Valid Until:</span>
              <span>${moment(qrData.expiresAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
            </div>
            <div class="info-row">
              <span class="label">Generated:</span>
              <span>${moment(qrData.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
            </div>
          </div>
          
          <div style="margin-top: 40px; color: #666; font-size: 14px;">
            <p>Instructions for students:</p>
            <p>1. Open IN Attendance System app</p>
            <p>2. Go to Scan QR section</p>
            <p>3. Point camera at this code</p>
            <p>4. Wait for confirmation message</p>
          </div>
          
          <script>
            // Generate QR code
            const qrcode = new QRCode(document.getElementById("qrcode"), {
              text: "${qrData.qrString}",
              width: 256,
              height: 256
            });
            
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const downloadQR = () => {
    if (!qrData) return;
    
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `qr_${qrData.unitCode}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('QR Code downloaded!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate QR Code</h1>
          <p className="text-gray-600">Create QR codes for student attendance marking</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit Code *
              </label>
              <input
                type="text"
                name="unitCode"
                value={formData.unitCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., CS101"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit Name *
              </label>
              <input
                type="text"
                name="unitName"
                value={formData.unitName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Introduction to Programming"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes) *
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="120">2 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Main Hall, Room 101"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session
              </label>
              <select
                name="session"
                value={formData.session}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
              className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors font-medium"
            >
              {generating ? 'Generating QR Code...' : 'Generate QR Code'}
            </button>
          </div>

          {/* QR Display Section */}
          <div>
            {qrData ? (
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Generated QR Code</h3>
                  <p className="text-gray-600">Display this for students to scan</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm mb-6 flex flex-col items-center">
                  <div className="mb-4">
                    <QRCodeSVG 
                      value={qrData.qrString} 
                      size={256}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  
                  <div className="w-full max-w-md space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unit:</span>
                      <span className="font-medium">{qrData.unitName} ({qrData.unitCode})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valid Until:</span>
                      <span className="font-medium">{moment(qrData.expiresAt).format('h:mm A')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{qrData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Session:</span>
                      <span className="font-medium">{qrData.session}</span>
                    </div>
                    <div className="mt-4 p-3 bg-gray-100 rounded">
                      <p className="text-sm text-gray-600 mb-1">QR Code String:</p>
                      <code className="text-xs break-all">{qrData.qrString}</code>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap justify-center">
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium flex items-center gap-2"
                    >
                      <FiCopy />
                      Copy Code
                    </button>
                    <button
                      onClick={printQR}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium flex items-center gap-2"
                    >
                      <FiPrinter />
                      Print
                    </button>
                    <button
                      onClick={downloadQR}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium flex items-center gap-2"
                    >
                      <FiDownload />
                      Download
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">📋 Instructions:</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Display this QR code at the beginning of class</li>
                    <li>• Ensure it's visible to all students</li>
                    <li>• QR code expires in {formData.duration} minutes</li>
                    <li>• Generate a new code for each session</li>
                    <li>• Track attendance in your dashboard</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-12 rounded-xl flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-4xl">QR</span>
                </div>
                <p className="text-gray-500 text-center">
                  No QR code generated yet. <br />
                  Fill the form and click "Generate QR Code"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent QR Codes */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recently Generated Codes</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-center">
              QR code history will appear here once you start generating codes
            </p>
            <div className="mt-4 grid gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">CS10{i}</span>
                      <span className="text-gray-500 text-sm ml-2">- Introduction to Topic {i}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {moment().subtract(i, 'hours').format('h:mm A')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
