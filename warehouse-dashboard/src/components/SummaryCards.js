import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { FaBell } from 'react-icons/fa';
import EmailModal from './EmailModal';
import ConfirmationModal from './ConfirmationModal';
import './SummaryCards.css';

const historyData = [
  { name: 'Jan', val: 95 }, { name: 'Feb', val: 92 }, { name: 'Mar', val: 93 }, 
  { name: 'Apr', val: 90 }, { name: 'May', val: 94 }, { name: 'Jun', val: 96 }
];

// Mock data for alerts
const alertsData = [
  { text: 'Zone 2: Moderate Humidity Warning', type: 'warning' },
  { text: 'Zone 2: High Temperature Alert', type: 'danger' },
  { text: 'Zone 3: High Temperature Alert', type: 'danger' },
];

const SummaryCards = () => {
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [recipients, setRecipients] = useState('');

  const handleSendEmail = (recipientData) => {
    setRecipients(recipientData);
    setEmailModalOpen(false);
    setConfirmModalOpen(true);
  };

  // Create the new handler function for resending
  const handleResend = () => {
    setConfirmModalOpen(false); // Close the confirmation modal
    setEmailModalOpen(true);    // Re-open the email modal
  };

  return (
    <>
      <div className="summary-grid">
        <div className="summary-card card">
          <span className="card-title">Compliance</span>
          <div className="compliance-value">96%</div>
          <div className="compliance-sparkline">
            <ResponsiveContainer width="100%" height={40}>
              <AreaChart data={[{v:20},{v:22},{v:19},{v:25},{v:23},{v:27},{v:26}]}>
                <Area type="monotone" dataKey="v" stroke="#38A169" fill="#38A169" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="summary-card card">
          <span className="card-title">Active Alerts</span>
          <div className="alerts-value">3</div>
        </div>
        <div className="alerts-list card">
          <div className="alerts-header">
            <span className="card-title">Alerts</span>
            <button className="alert-icon-btn" onClick={() => setEmailModalOpen(true)}>
              <FaBell color="#D69E2E" />
            </button>
          </div>
          <ul>
            {alertsData.map((alert, index) => (
              <li key={index} className={alert.type}>{alert.text}</li>
            ))}
          </ul>
        </div>
        <div className="history-card card">
          <span className="card-title">Compliance History</span>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={historyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#718096' }} />
              <YAxis domain={[80, 100]} hide />
              <Tooltip />
              <Area type="monotone" dataKey="val" stroke="#3182CE" strokeWidth={2} fill="#3182CE" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <EmailModal
        isOpen={isEmailModalOpen}
        onRequestClose={() => setEmailModalOpen(false)}
        onSend={handleSendEmail}
        alerts={alertsData}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setConfirmModalOpen(false)}
        recipients={recipients}
        onResend={handleResend} // Pass the new handler as a prop
      />
    </>
  );
};

export default SummaryCards;