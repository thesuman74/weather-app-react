import React, { useState } from "react";
import "./current-weather.css";

const CurrentWeather = ({ currentData, forecastData }) => {
  const [unit, setUnit] = useState("F");

  const weatherNames = {
    0: "Clear",
    1: "Cloudy",
    2: "Partly cloudy",
    3: "Overcast",
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case 0:
        return "sun.gif";
      case 1:
        return "cloudy.png";
      case 2:
        return "partly-cloudy.png";
      case 3:
        return "overcast.png";
      default:
        return "unknown.png";
    }
  };

  const convertTemperature = (temperature) => {
    let convertedTemperature;
    if (unit === "F") {
      convertedTemperature = (temperature * 9) / 5 + 32;
    } else {
      convertedTemperature = ((temperature - 32) * 5) / 9;
    }
    return convertedTemperature.toFixed(2); // rounds to 2 decimal places
  };

  const toggleUnit = () => {
    setUnit(unit === "F" ? "C" : "F");
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
            {convertTemperature(currentData.current.temperature_2m)}°{unit}
          </div>
          <div className="hl_temp">11/20</div>
        </div>
        <div className="details">
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
                  <p>{time}</p>
                  <p>
                    Max:{" "}
                    {convertTemperature(
                      forecastData.daily.temperature_2m_max[index]
                    )}
                    °{unit}
                  </p>
                  <p>
                    Min:{" "}
                    {convertTemperature(
                      forecastData.daily.temperature_2m_min[index]
                    )}
                    °{unit}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <button onClick={toggleUnit}>
        Switch to {unit === "F" ? "Celsius" : "Fahrenheit"}
      </button>
    </div>
  );
};

export default CurrentWeather;
