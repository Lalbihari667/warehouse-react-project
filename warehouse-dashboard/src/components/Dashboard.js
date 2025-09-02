// src/components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import ZoneCard from './ZoneCard';
import SummaryCards from './SummaryCards';
import AiSuggestions from './AiSuggestions';
import TempHumidityChart from './Chart';
import ZoneSettingsModal from './ZoneSettingsModal';
import EnergyChart from './EnergyChart';
import ReportDateModal from './ReportDateModal';
import './Dashboard.css';

const Dashboard = ({ warehouseData, onUpdateZone, onAddNewZone, onDeleteZone, currentUser, maintenanceDate, onSetMaintenanceDate }) => {
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const navigate = useNavigate();

  const formattedDate = maintenanceDate 
    ? `Maintenance on: ${maintenanceDate.toLocaleDateString()}` 
    : 'Schedule Maintenance';

  return (
    <div className="dashboard-background">
      <header className="dashboard-header">
        <h1>Warehouse Monitoring Dashboard</h1>
        <div className="header-buttons">
          {currentUser && currentUser.employeeId === 'admin' && (
            <button className="header-button admin-btn" onClick={() => navigate('/admin')}>Admin Panel</button>
          )}
          <button className="header-button" onClick={() => setIsZoneModalOpen(true)}>Adjust Zone Settings →</button>
          
          <DatePicker
            selected={maintenanceDate}
            onChange={(date) => onSetMaintenanceDate(date)}
            customInput={<button className="header-button">{formattedDate}</button>}
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
          />

          <button 
            className="header-button primary" 
            onClick={() => setIsReportModalOpen(true)}
          >
            Download Compliance Report
          </button>
        </div>
      </header>
      <main className="dashboard-grid">
        <div className="grid-zones">
          {warehouseData.zones.map(zone => <ZoneCard key={zone.name} zone={zone} />)}
        </div>
        <div className="grid-summary"><SummaryCards /></div>
        {/* Pass the zones array to the TempHumidityChart component */}
        <div className="grid-trends card"><TempHumidityChart zones={warehouseData.zones} /></div>
        <div className="grid-energy-temp card"><EnergyChart dataKey="Temp" title="Energy Usage vs Temperature" /></div>
        <div className="grid-energy-humidity card"><EnergyChart dataKey="Humidity" title="Energy Usage vs Humidity" /></div>
        <div className="grid-ai card"><AiSuggestions /></div>
      </main>

      <ZoneSettingsModal
        isOpen={isZoneModalOpen}
        onRequestClose={() => setIsZoneModalOpen(false)}
        zones={warehouseData.zones}
        onSave={onUpdateZone}
        onAddNewZone={onAddNewZone}
        onDeleteZone={onDeleteZone}
      />
      <ReportDateModal 
        isOpen={isReportModalOpen}
        onRequestClose={() => setIsReportModalOpen(false)}
        // Pass warehouseData to the modal so it can be forwarded
        warehouseData={warehouseData}
      />
    </div>
  );
};

export default Dashboard;