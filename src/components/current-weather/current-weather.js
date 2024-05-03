import React, { useState } from "react";
import { weatherNames, getWeatherIcon, getDayName } from "./weatherUtil";
import "./current-weather.css";

const CurrentWeather = ({ currentData, forecastData }) => {
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  const convertTemperature = (temperature) => {
    if (isFahrenheit) {
      return (temperature * 9) / 5 + 32;
    } else {
      return temperature;
    }
  };

  const renderTemperature = (temperature) => {
    return convertTemperature(temperature).toFixed(2);
  };

  return (
    <div className="weather">
      <div className="top">
        <p className="city">Right now in {currentData.city}</p>
        <p className="weather-description">
          , it's {weatherNames[currentData.current.weather_code]}
        </p>
      </div>
      <div className="second_row">
        <img
          className="weather-icon"
          src={`icons/${getWeatherIcon(currentData.current.weather_code)}`}
          alt="Weather Icon"
        />
        <div className="temperature-box">
          <div className="temperature">
            {renderTemperature(currentData.current.temperature_2m)}°
            {isFahrenheit ? "F" : "C"}
          </div>
          <div className="hl_temp">11/20</div>
        </div>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label top">
              <img
                src="icons/50d.png"
                alt="Wind Icon"
                className="parameter-icon"
              />
            </span>
            <span className="parameter-value">
              {currentData.current.wind_speed_10m} mph
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">
              <img
                src="icons/09n.png"
                alt="Humidity Icon"
                className="parameter-icon"
              />
            </span>
            <span className="parameter-value">
              {currentData.current.relative_humidity_2m}%
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">
              <img
                src="icons/rainny.png"
                alt="Rain Icon"
                className="parameter-icon"
              />
            </span>
            <span className="parameter-value">{currentData.current.rain}</span>
          </div>
        </div>
      </div>

      <div className="forecast">
        <div className="forecast-items">
          {forecastData.daily &&
            forecastData.daily.time.slice(0, 5).map((time, index) => (
              <div className="forecast-item" key={index}>
                <img
                  className="forecast-icon"
                  src={`icons/${getWeatherIcon(
                    forecastData.daily.weather_code[index]
                  )}`}
                  alt="Weather Icon"
                />
                <div className="forecast-info">
                  <p>
                    {renderTemperature(
                      forecastData.daily.temperature_2m_max[index]
                    )}
                    /
                    {renderTemperature(
                      forecastData.daily.temperature_2m_min[index]
                    )}
                  </p>
                  <p>{getDayName(time)}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="temperature-toggle">
        <button onClick={toggleTemperatureUnit}>
          {isFahrenheit ? "Switch to Celsius" : "Switch to Fahrenheit"}
        </button>
      </div>
    </div>
  );
};

export default CurrentWeather;
