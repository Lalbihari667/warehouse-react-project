// src/pages/ComplianceReportPage.js
import React, { useRef } from 'react';
// Import useLocation to access navigation state
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './ComplianceReportPage.css';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString('en-US', options);
};

const ComplianceReportPage = () => {
  const navigate = useNavigate();
  const reportRef = useRef();
  const [searchParams] = useSearchParams();
  
  // Get the location object which contains the state
  const location = useLocation();
  
  // Extract warehouseData from the state, with a fallback
  const warehouseData = location.state?.warehouseData || { zones: [] };
  const zones = warehouseData.zones;

  const startDate = searchParams.get('start');
  const endDate = searchParams.get('end');

  const periodString = (startDate && endDate)
    ? `Period: ${formatDate(startDate)} - ${formatDate(endDate)}`
    : 'Period: Data Not Specified';

  const handleDownloadPdf = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("warehouse-compliance-report.pdf");
    });
  };

  return (
    <div className="report-page-background">
      <header className="report-page-header">
        <h2>Warehouse Monitoring Dashboard</h2>
        <button className="return-btn" onClick={() => navigate('/dashboard')}>← Return to Dashboard</button>
      </header>
      <div className="report-page-container">
        <div className="report-content" ref={reportRef}>
          <div className="report-main-header">
            <h1>Warehouse Compliance Report</h1>
            <p>Warehouse: Central Cold Storage, Kolkata</p>
            <p>{periodString}</p>
            <p>Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <section className="report-section">
            <h3>Compliance Summary</h3>
            <ul>
              <li>Overall Compliance: <span className="highlight-green">95%</span></li>
              <li>Active Alerts during period: 3</li>
              <li>Violations: 5 (3 temperature, 2 humidity)</li>
              <li>Sensor Downtime: 2 hours</li>
            </ul>
          </section>
          
          <section className="report-section">
            <h3>Zone-wise Compliance</h3>
            {/* Dynamically adjust grid columns */}
            <div className="zone-compliance-grid" style={{ gridTemplateColumns: `repeat(${Math.min(zones.length, 3)}, 1fr)` }}>
              {/* Map over the real zones data */}
              {zones.map(zone => (
                <div key={zone.name} className="zone-compliance-card">
                  <h4>{zone.name}</h4>
                  <p>Avg Temp: {zone.temperature.value}°C <span className="range">(Range: {zone.temperature.range.join('–')}°C)</span></p>
                  <p>Avg Humidity: {zone.humidity.value}% <span className="range">(Range: {zone.humidity.range.join('–')}%)</span></p>
                  <p>Compliance: 98%</p> {/* Note: This is still mock data */}
                  <p>Alerts: 1</p> {/* Note: This is still mock data */}
                </div>
              ))}
            </div>
          </section>
          
          <section className="report-section">
            <h3>Alerts & Violations Log</h3>
            <table className="violations-table">
              <thead><tr><th>Date</th><th>Zone</th><th>Type</th><th>Severity</th><th>Action Taken</th></tr></thead>
              <tbody>
                <tr><td>Jan 5</td><td>Zone 2</td><td>Temperature</td><td><span className="severity-high">High</span></td><td>Adjusted setpoint</td></tr>
                <tr><td>Jan 12</td><td>Zone 3</td><td>Humidity</td><td><span className="severity-moderate">Moderate</span></td><td>Maintenance scheduled</td></tr>
              </tbody>
            </table>
          </section>

           <section className="report-section">
            <h3>AI Insights</h3>
             <ul>
                <li>Zone 2 humidity rising trend — recommend dehumidifier check.</li>
                <li>Zone 1 stable — raise cooling setpoint by 1°C to save energy.</li>
                <li>Zone 3 consumes 20% more energy — schedule inspection.</li>
            </ul>
          </section>
          
          <footer className="report-footer">
            <p>Prepared by: Warehouse Monitoring System</p>
            <p>Authorized by: Compliance Manager</p>
            <p>System-generated report. No manual edits.</p>
          </footer>
        </div>
        <div className="download-btn-container">
          <button className="download-pdf-btn" onClick={handleDownloadPdf}>Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceReportPage;