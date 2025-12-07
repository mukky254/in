import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';

const QRGenerator = () => {
  const [formData, setFormData] = useState({
    unitCode: '',
    unitName: '',
    duration: 15,
    location: 'Main Hall',
    session: 'Morning'
  });
  
  const [qrCode, setQrCode] = useState(null);
  const [generating, setGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateQR = async () => {
    if (!formData.unitCode || !formData.unitName) {
      toast.error('Please fill in all required fields');
      return;
    }

    setGenerating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/lecturer/generate-qr', 
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setQrCode(response.data.qrCode);
      toast.success('QR Code generated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate QR code');
    } finally {
      setGenerating(false);
    }
  };

  const printQR = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>QR Code - ${qrCode.unitCode}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .info { margin: 20px 0; }
            .qr-code { margin: 20px auto; }
          </style>
        </head>
        <body>
          <h2>Attendance QR Code</h2>
          <div class="info">
            <p><strong>Unit:</strong> ${qrCode.unitName} (${qrCode.unitCode})</p>
            <p><strong>Session:</strong> ${qrCode.session}</p>
            <p><strong>Location:</strong> ${qrCode.location}</p>
            <p><strong>Valid Until:</strong> ${moment(qrCode.expiresAt).format('lll')}</p>
          </div>
          <div class="qr-code">
            <img src="${qrCode.qrImage}" alt="QR Code" />
          </div>
          <p>Scan this code to mark attendance</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate QR Code</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Code *
              </label>
              <input
                type="text"
                name="unitCode"
                value={formData.unitCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., CS101"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Name *
              </label>
              <input
                type="text"
                name="unitName"
                value={formData.unitName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Introduction to Programming"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Lecture Hall, Room No."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session
              </label>
              <select
                name="session"
                value={formData.session}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>

            <button
              onClick={generateQR}
              disabled={generating}
              className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate QR Code'}
            </button>
          </div>
        </div>

        {/* QR Display Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated QR Code</h2>
          
          {qrCode ? (
            <div className="text-center">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <QRCodeSVG value={qrCode.qrString} size={256} className="mx-auto" />
              </div>
              
              <div className="mb-6 text-left space-y-2">
                <p><strong>Unit:</strong> {qrCode.unitName} ({qrCode.unitCode})</p>
                <p><strong>Valid Until:</strong> {moment(qrCode.expiresAt).format('lll')}</p>
                <p><strong>Location:</strong> {qrCode.location}</p>
                <p><strong>Session:</strong> {qrCode.session}</p>
                <p className="text-sm text-gray-500">
                  Code: {qrCode.qrString.substring(0, 20)}...
                </p>
              </div>

              <div className="space-x-4">
                <button
                  onClick={printQR}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Print QR Code
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(qrCode.qrString)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Copy Code
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No QR code generated yet.</p>
              <p className="text-sm mt-2">Fill the form and click "Generate QR Code"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
