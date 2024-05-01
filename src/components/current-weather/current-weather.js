import React from "react";
import "./current-weather.css";

const CurrentWeather = () => {
  return (
    <div className="weather">
      <div className="top">
        <p className="city">Beijing</p>
        <p className="weather-description">Clear</p>
      </div>
      <div className="weather-icon">☀️</div>
      <div className="temperature">99°F</div>
      <div className="details">
        <div className="parameter-row">
          <span className="parameter-label top">Wind:</span>
          <span className="parameter-value">8 mph</span>
        </div>
        <div className="parameter-row">
          <span className="parameter-label">Humidity:</span>
          <span className="parameter-value">0%</span>
        </div>
        <div className="parameter-row">
          <span className="parameter-label">UV Index:</span>
          <span className="parameter-value">30</span>
        </div>
      </div>
      <div className="forecast">
        <div className="forecast-item">TOM: 70°F | 103°F</div>
        {/* Add other forecast items here */}
      </div>
    </div>
  );
};

export default CurrentWeather;
