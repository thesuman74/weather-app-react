import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
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

  return (
    <div className="weather">
      <div className="top">
        <p className="city">Right now in {data.city}</p>
        <p className="weather-description">
          ,it's{weatherNames[data.current.weather_code]}
        </p>
      </div>
      <div className="second_row">
        <img
          className="weather-icon"
          src={`icons/${getWeatherIcon(data.current.weather_code)}`}
          alt="Weather Icon"
        />

        <div className="temperature-box">
          <div className="temperature">{data.current.temperature_2m}°F</div>

          <div className="hl_temp">11/20 </div>
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
              {data.current.wind_speed_10m} mph
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
              {data.current.relative_humidity_2m}%
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
            <span className="parameter-value">{data.current.rain}</span>
          </div>
        </div>
      </div>
      <div className="forecast">{/* Add forecast items here */}</div>
    </div>
  );
};

export default CurrentWeather;
