import React from 'react';
import Modal from 'react-modal';
import { FaEnvelopeCircleCheck } from 'react-icons/fa6';
import './ConfirmationModal.css';

// Accept a new prop 'onResend'
const ConfirmationModal = ({ isOpen, onRequestClose, recipients, onResend }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="confirm-modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <div className="confirm-modal-content">
        <div className="confirm-icon-wrapper">
          <FaEnvelopeCircleCheck size={60} color="#38A169" />
        </div>
        
        <h3>Email Confirmation</h3>
        
        <p className="confirm-message">
          We have sent an email of alerts generated to <strong>{recipients}</strong>.
          <br />
          Please check your email to get details of all the alerts generated in your warehouse zone.
        </p>
        
        <div className="confirm-footer">
          Didn't receive the email? Click{' '}
          {/* Change <a> to <button> and use the onResend prop */}
          <button className="resend-link-btn" onClick={onResend}>
            Resend Confirmation Email
          </button>
        </div>

        <button className="confirm-ok-btn" onClick={onRequestClose}>OK</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;