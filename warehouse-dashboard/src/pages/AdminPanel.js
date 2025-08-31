import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../auth/users';
import './AdminPanel.css';
const AdminPanel = () => {
const [users, setUsers] = useState([]);
const navigate = useNavigate();
useEffect(() => {
    setUsers(getUsers());
}, []);

return (
    <div className="admin-container">
        <header className="admin-header">
            <h1>Admin Panel</h1>
            <button onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.employeeId}</td>
                                <td>{user.dob}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
};
export default AdminPanel;