import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ZoneCard.css';

const getStatusColor = (value, range) => {
  if (value < range[0] || value > range[1]) return '#E53E3E'; // Red for out of range
  if (value < range[0] + (range[1]-range[0])*0.1 || value > range[1] - (range[1]-range[0])*0.1) return '#DD6B20'; // Orange for warning
  return '#38A169'; // Green for normal
};

const ZoneCard = ({ zone }) => {
  const tempColor = getStatusColor(zone.temperature.value, zone.temperature.range);
  const humidityColor = getStatusColor(zone.humidity.value, zone.humidity.range);

  return (
    <div className="zone-card card">
      <h4>{zone.name}</h4>
      <div className="meters-container">
        <div className="meter">
          <CircularProgressbar
            value={zone.temperature.value} minValue={-20} maxValue={50}
            text={`${zone.temperature.value}°C`}
            styles={buildStyles({ pathColor: tempColor, textColor: '#2D3748', trailColor: '#E2E8F0', strokeLinecap: 'butt' })}
            strokeWidth={10}
          />
          <span className="meter-label">Temperature</span>
          <span className="meter-range">{zone.temperature.range.join(' - ')}°C</span>
        </div>
        <div className="meter">
          <CircularProgressbar
            value={zone.humidity.value}
            text={`${zone.humidity.value}%`}
            styles={buildStyles({ pathColor: humidityColor, textColor: '#2D3748', trailColor: '#E2E8F0', strokeLinecap: 'butt' })}
            strokeWidth={10}
          />
          <span className="meter-label">Humidity</span>
          <span className="meter-range">{zone.humidity.range.join(' - ')}%</span>
        </div>
      </div>
    </div>
  );
};

export default ZoneCard;