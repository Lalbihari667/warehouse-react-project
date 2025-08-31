import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ComplianceReportPage from './pages/ComplianceReportPage';
import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegisterPage from './pages/RegisterPage';
import AdminPanel from './pages/AdminPanel';
import './App.css';

const initialWarehouseData = {
  zones: [
    { name: 'Zone 1', temperature: { value: 20, range: [18, 26] }, humidity: { value: 10, range: [10, 18] } },
    { name: 'Zone 2', temperature: { value: 24, range: [4, 6] }, humidity: { value: 8, range: [2, 4] } },
    { name: 'Zone 3', temperature: { value: -1, range: [-10, 0] }, humidity: { value: 21, range: [20, 25] } },
    { name: 'Zone 4', temperature: { value: 15, range: [14, 18] }, humidity: { value: 65, range: [60, 70] } },
    { name: 'Zone 5', temperature: { value: 22, range: [20, 25] }, humidity: { value: 48, range: [45, 55] } },
    { name: 'Zone 6', temperature: { value: 5, range: [4, 8] }, humidity: { value: 85, range: [80, 90] } },
  ],
};

function App() {
  const [warehouseData, setWarehouseData] = useState(initialWarehouseData);
  const [currentUser, setCurrentUser] = useState(null);
  const [maintenanceDate, setMaintenanceDate] = useState(null); // State for maintenance date

  const handleUpdateZone = (zoneName, newValues) => {
    const updatedZones = warehouseData.zones.map(zone => {
      if (zone.name === zoneName) {
        return {
          ...zone,
          temperature: { ...zone.temperature, ...newValues.temperature },
          humidity: { ...zone.humidity, ...newValues.humidity },
        };
      }
      return zone;
    });
    setWarehouseData({ ...warehouseData, zones: updatedZones });
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleSetMaintenanceDate = (date) => {
    setMaintenanceDate(date);
    console.log("Maintenance scheduled for:", date);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={!currentUser ? <SignInPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!currentUser ? <RegisterPage /> : <Navigate to="/dashboard" />} />
          <Route path="/forgot-password" element={!currentUser ? <ForgotPasswordPage /> : <Navigate to="/dashboard" />} />
          
          <Route 
            path="/dashboard" 
            element={
              currentUser ? (
                <Dashboard 
                  warehouseData={warehouseData} 
                  onUpdateZone={handleUpdateZone} 
                  currentUser={currentUser}
                  maintenanceDate={maintenanceDate}
                  onSetMaintenanceDate={handleSetMaintenanceDate}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route path="/report" element={currentUser ? <ComplianceReportPage /> : <Navigate to="/" />} />
          <Route path="/admin" element={currentUser && currentUser.employeeId === 'admin' ? <AdminPanel /> : <Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;