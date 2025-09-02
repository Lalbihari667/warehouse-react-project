// src/components/ReportDateModal.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import './ReportDateModal.css';

Modal.setAppElement('#root');

// Accept the warehouseData prop
const ReportDateModal = ({ isOpen, onRequestClose, warehouseData }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!startDate || !endDate) {
      alert("Please select both a start and end date.");
      return;
    }
    
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    // Use the 'state' option to pass the warehouseData to the new route
    navigate(`/report?start=${formattedStartDate}&end=${formattedEndDate}`, { state: { warehouseData } });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="report-modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h3>Download Compliance Report</h3>
        
        <div className="date-input-group">
          <label htmlFor="startDate">Start Date</label>
          <div className="date-picker-wrapper">
            <FaCalendarAlt className="date-picker-icon" />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="dd-mm-yyyy"
              dateFormat="dd-MM-yyyy"
              className="date-picker-input"
            />
          </div>
        </div>
        
        <div className="date-input-group">
          <label htmlFor="endDate">End Date</label>
          <div className="date-picker-wrapper">
            <FaCalendarAlt className="date-picker-icon" />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="dd-mm-yyyy"
              dateFormat="dd-MM-yyyy"
              className="date-picker-input"
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onRequestClose}>Cancel</button>
          <button 
            className="proceed-btn" 
            onClick={handleProceed} 
            disabled={!startDate || !endDate}
          >
            Proceed
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReportDateModal;