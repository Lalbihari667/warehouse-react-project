import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// Import the new functions and modal
import { getUsers, addUser, deleteUser } from '../auth/users';
import AddUserModal from '../components/AddUserModal';
import './AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // useCallback ensures this function isn't recreated on every render
  const fetchUsers = useCallback(() => {
    setUsers(getUsers());
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = (newUser) => {
    const success = addUser(newUser);
    if (success) {
      fetchUsers(); // Refresh the user list after adding
    }
  };

  const handleDeleteUser = (employeeId) => {
    if (window.confirm(`Are you sure you want to delete the user with ID: ${employeeId}?`)) {
      deleteUser(employeeId);
      fetchUsers(); // Refresh the user list after deleting
    }
  };

  return (
    <>
      <div className="admin-container">
          <header className="admin-header">
              <h1>Admin Panel</h1>
              <div className="admin-header-actions">
                <button className="add-user-btn" onClick={() => setIsModalOpen(true)}>+ Add New User</button>
                <button onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
              </div>
          </header>
          <div className="admin-content">
              <div className="users-list-card">
                  <h3>Registered Users</h3>
                  <table className="users-table">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Employee ID</th>
                              <th>Date of Birth</th>
                              <th>Password</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {users.map((user) => (
                              <tr key={user.employeeId}>
                                  <td>{user.name}</td>
                                  <td>{user.employeeId}</td>
                                  <td>{user.dob}</td>
                                  <td>{user.password}</td>
                                  <td>
                                    {/* Prevent the admin from deleting themselves */}
                                    {user.employeeId !== 'admin' && (
                                      <button
                                        className="delete-user-btn"
                                        onClick={() => handleDeleteUser(user.employeeId)}
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>

      <AddUserModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </>
  );
};

export default AdminPanel;