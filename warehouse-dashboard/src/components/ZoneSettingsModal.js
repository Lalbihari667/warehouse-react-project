import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './ZoneSettingsModal.css';

Modal.setAppElement('#root');

const ZoneSettingsModal = ({ isOpen, onRequestClose, zones, onSave, onAddNewZone, onDeleteZone }) => {
  // 1: zone list, 2: edit settings, 3: add form, 4: delete list
  const [step, setStep] = useState(1); 
  const [selectedZone, setSelectedZone] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentHumidity, setCurrentHumidity] = useState(0);
  const [newZoneName, setNewZoneName] = useState('');
  const [newTempRange, setNewTempRange] = useState({ min: '', max: '' });
  const [newHumidityRange, setNewHumidityRange] = useState({ min: '', max: '' });

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
    setNewZoneName('');
    setNewTempRange({ min: '', max: '' });
    setNewHumidityRange({ min: '', max: '' });
    onRequestClose();
  }

  const handleAddZoneClick = () => setStep(3);
  const handleDeleteZoneClick = () => setStep(4);

  const handleSaveNewZone = () => {
    if (!newZoneName || newTempRange.min === '' || newTempRange.max === '' || newHumidityRange.min === '' || newHumidityRange.max === '') {
      alert('Please fill out all fields for the new zone.');
      return;
    }
    const tempMin = parseFloat(newTempRange.min);
    const tempMax = parseFloat(newTempRange.max);
    const humMin = parseFloat(newHumidityRange.min);
    const humMax = parseFloat(newHumidityRange.max);

    if (tempMin >= tempMax || humMin >= humMax) {
      alert('Minimum values cannot be greater than or equal to maximum values.');
      return;
    }

    const newZone = {
      name: newZoneName,
      temperature: { value: (tempMin + tempMax) / 2, range: [tempMin, tempMax] },
      humidity: { value: (humMin + humMax) / 2, range: [humMin, humMax] },
    };

    onAddNewZone(newZone);
    handleClose();
  };

  const handleDelete = (zoneName) => {
    if (window.confirm(`Are you sure you want to permanently delete ${zoneName}? This action cannot be undone.`)) {
      onDeleteZone(zoneName);
      handleClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal" overlayClassName="overlay">
      {/* Step 1: Main Menu */}
      {step === 1 && (
        <div className="modal-content">
          <div className="zone-list-container">
            <h4 className="modal-title">Edit Existing Zone</h4>
            {zones.map(zone => (
              <button key={zone.name} className="zone-list-item" onClick={() => handleZoneSelect(zone)}>
                {zone.name}
              </button>
            ))}
            <h4 className="modal-title">Manage Zones</h4>
            <button className="zone-list-item add-zone-btn" onClick={handleAddZoneClick}>
              + Add New Zone
            </button>
            <button className="zone-list-item delete-zone-btn" onClick={handleDeleteZoneClick}>
              - Delete a Zone
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Edit Form */}
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

      {/* Step 3: Add Form */}
      {step === 3 && (
         <div className="modal-content settings-view add-zone-form">
          <button className="back-button" onClick={handleBack}>←</button>
          <h3>Add New Zone</h3>
          <div className="form-group">
            <label>Zone Name</label>
            <input type="text" placeholder="e.g., Zone 7" value={newZoneName} onChange={e => setNewZoneName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Temperature Range (°C)</label>
            <div className="range-inputs">
              <input type="number" placeholder="Min" value={newTempRange.min} onChange={e => setNewTempRange({ ...newTempRange, min: e.target.value })} />
              <input type="number" placeholder="Max" value={newTempRange.max} onChange={e => setNewTempRange({ ...newTempRange, max: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label>Humidity Range (%)</label>
            <div className="range-inputs">
              <input type="number" placeholder="Min" value={newHumidityRange.min} onChange={e => setNewHumidityRange({ ...newHumidityRange, min: e.target.value })} />
              <input type="number" placeholder="Max" value={newHumidityRange.max} onChange={e => setNewHumidityRange({ ...newHumidityRange, max: e.target.value })} />
            </div>
          </div>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={handleClose}>Cancel</button>
            <button className="save-btn" onClick={handleSaveNewZone}>Add Zone</button>
          </div>
        </div>
      )}

      {/* Step 4: Delete View */}
      {step === 4 && (
        <div className="modal-content settings-view">
          <button className="back-button" onClick={handleBack}>←</button>
          <h3>Delete a Zone</h3>
          <p className="delete-warning">Select a zone to permanently delete it. This action cannot be undone.</p>
          <div className="zone-list-container delete-list">
            {zones.map(zone => (
              <button key={zone.name} className="zone-list-item delete-item-btn" onClick={() => handleDelete(zone.name)}>
                {zone.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ZoneSettingsModal;