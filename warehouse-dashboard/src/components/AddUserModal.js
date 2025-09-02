import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import './AddUserModal.css';

const AddUserModal = ({ isOpen, onRequestClose, onAddUser }) => {
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !employeeId || !dob || !password) {
      alert('Please fill in all fields.');
      return;
    }
    // Pass the new user object to the parent component
    onAddUser({ name, employeeId, dob, password });
    // Clear form and close modal
    setName('');
    setEmployeeId('');
    setDob('');
    setPassword('');
    setShowPassword(false); // Reset icon state
    onRequestClose();
  };

  const handleClose = () => {
    // Also clear the form when closing without submitting
    setName('');
    setEmployeeId('');
    setDob('');
    setPassword('');
    setShowPassword(false);
    onRequestClose();
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose} // Use the new close handler
      className="add-user-modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <div className="add-user-modal-content">
        <h3>Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="employeeId">Employee ID</label>
            <input type="text" id="employeeId" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            {/* Wrapper for the input and icon */}
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'} // Dynamically set input type
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>Cancel</button>
            <button type="submit" className="save-btn">Add User</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddUserModal;