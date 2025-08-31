import React from 'react';
import './AiSuggestions.css';

const AiSuggestions = () => (
  <div className="ai-suggestions-container">
    <h4>AI Suggestion</h4>
    <ul>
      <li>Zone 2 humidity has been rising (4% → 8% in last 1 hrs). Suggest checking dehumidifier.</li>
      <li>Zone 1 temperature is stable at 20°C. Energy usage could be reduced by raising cooling setpoint to 21°C without breaking compliance.</li>
      <li>Overall compliance at 96%. Target of 98% can be achieved by optimizing Zone 2 humidity control.</li>
      <li>Historical trend shows Zone 2 consumes 20% more energy than others. Suggest equipment inspection.</li>
    </ul>
  </div>
);

export default AiSuggestions;