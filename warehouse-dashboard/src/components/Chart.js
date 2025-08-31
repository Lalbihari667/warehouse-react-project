import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Chart.css';

const data = [
  { time: '8am', Temp: 22, Humidity: 48 }, { time: '9am', Temp: 22.5, Humidity: 49 },
  { time: '10am', Temp: 23, Humidity: 50 }, { time: '11am', Temp: 24, Humidity: 48 },
  { time: '12pm', Temp: 25, Humidity: 47 }, { time: '1pm', Temp: 25.5, Humidity: 46 },
  { time: '2pm', Temp: 26, Humidity: 45 }, { time: '3pm', Temp: 25, Humidity: 46 },
];

const TempHumidityChart = () => (
  <div className="trends-chart-container">
    <div className="chart-header">
      <h4>Temperature and Humidity Trends</h4>
      <div className="chart-controls">
        <select><option value="zone1">Zone 1</option></select>
        <input type="date" />
      </div>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#718096' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#718096' }} axisLine={false} tickLine={false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Temp" stroke="#D53F8C" strokeWidth={2} name="Temperature (°C)" dot={false} />
        <Line type="monotone" dataKey="Humidity" stroke="#D69E2E" strokeWidth={2} name="Humidity (%)" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default TempHumidityChart;