import React, { useState } from 'react';
import Modal from 'react-modal';
import './EmailModal.css';

const EmailModal = ({ isOpen, onRequestClose, onSend, alerts }) => {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('Warehouse Evaluation');
  
  // Format the alerts into a string for the email body
  const emailBody = `This is to confirm that the Pharma Cold Zone has been checked today. The following alerts were detected:
  
${alerts.map(alert => `- ${alert.text}`).join('\n')}

Overall, the Pharma Cold Zone is fully compliant, and operations are running smoothly. Please review the alerts.`;

  const handleSend = () => {
    if (!recipients) {
      alert('Please enter at least one recipient.');
      return;
    }
    // Pass the recipient data to the parent component
    onSend(recipients);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="email-modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <div className="email-modal-content">
        <h3>Send Email</h3>
        
        <div className="email-input-group">
          <label htmlFor="recipients">Recipient</label>
          <input
            type="text"
            id="recipients"
            placeholder="manager1@warehouse.com, manager2@warehouse.com"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          />
        </div>
        
        <div className="email-input-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        
        <div className="email-input-group">
          <label htmlFor="body">Message</label>
          <textarea
            id="body"
            rows="8"
            value={emailBody}
            readOnly // Message is auto-generated
          />
        </div>

        <div className="email-modal-actions">
          <button className="email-cancel-btn" onClick={onRequestClose}>Cancel</button>
          <button className="email-send-btn" onClick={handleSend}>Send</button>
        </div>
      </div>
    </Modal>
  );
};

export default EmailModal;