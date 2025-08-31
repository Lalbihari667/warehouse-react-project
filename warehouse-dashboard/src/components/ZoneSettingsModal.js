import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './ZoneSettingsModal.css';

Modal.setAppElement('#root');

const ZoneSettingsModal = ({ isOpen, onRequestClose, zones, onSave }) => {
  const [step, setStep] = useState(1); // 1 for zone list, 2 for settings
  const [selectedZone, setSelectedZone] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentHumidity, setCurrentHumidity] = useState(0);

  useEffect(() => {
    if (selectedZone) {
      setCurrentTemp(selectedZone.temperature.value);
      setCurrentHumidity(selectedZone.humidity.value);
    }
  }, [selectedZone]);

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedZone(null);
  };

  const handleSave = () => {
    const newValues = {
      temperature: { value: parseFloat(currentTemp) },
      humidity: { value: parseFloat(currentHumidity) },
    };
    onSave(selectedZone.name, newValues);
    handleClose();
  };
  
  const handleClose = () => {
    setStep(1);
    setSelectedZone(null);
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal" overlayClassName="overlay">
      {step === 1 && (
        <div className="modal-content">
          <div className="zone-list-container">
            {zones.map(zone => (
              <button key={zone.name} className="zone-list-item" onClick={() => handleZoneSelect(zone)}>
                {zone.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 2 && selectedZone && (
        <div className="modal-content settings-view">
          <button className="back-button" onClick={handleBack}>←</button>
          <h3>{selectedZone.name}</h3>
          <div className="setting-display">
            <span>Temperature Range</span>
            <strong>{selectedZone.temperature.range.join('°C to ')}°C</strong>
          </div>
          <div className="setting-display">
            <span>Humidity Range</span>
            <strong>{selectedZone.humidity.range.join('% to ')}%</strong>
          </div>
          
          <div className="slider-group">
            <label>Temperature (°C)</label>
            <input type="range" min="-20" max="50" value={currentTemp} onChange={(e) => setCurrentTemp(e.target.value)} />
            <span className="slider-value">Current: {currentTemp}°C</span>
          </div>

          <div className="slider-group">
            <label>Humidity (%)</label>
            <input type="range" min="0" max="100" value={currentHumidity} onChange={(e) => setCurrentHumidity(e.target.value)} />
            <span className="slider-value">Current: {currentHumidity}%</span>
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" onClick={handleClose}>Cancel</button>
            <button className="save-btn" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ZoneSettingsModal;