import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from 'recharts';
import './EnergyChart.css';

const data = [
  { name: 'Day 1', Energy: 900 }, { name: 'Day 2', Energy: 650 },
  { name: 'Day 3', Energy: 400 }, { name: 'Day 4', Energy: 250 },
  { name: 'Day 5', Energy: 300 }, { name: 'Day 6', Energy: 550 },
];

const EnergyChart = ({ title }) => {
  return (
    <div className="energy-chart-container">
      <h4>{title}</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4299E1" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#4299E1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#718096' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#718096' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
          <Area type="monotone" dataKey="Energy" stroke="false" fill="url(#colorEnergy)" />
          <Line type="monotone" dataKey="Energy" stroke="#4299E1" strokeWidth={2} name="Energy Usage (kWh)" dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;