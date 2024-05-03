import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import React, { useState, useEffect } from "react";
import { WEATHER_API_URL } from "./api";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    // Default location coordinates for New York
    const defaultLat = 28.2669;
    const defaultLon = 83.9685;

    const fetchWeatherData = async () => {
      try {
        const currentWeatherFetch = fetch(
          `${WEATHER_API_URL}latitude=${defaultLat}&longitude=${defaultLon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`
        );
        const forecastFetch = fetch(
          `${WEATHER_API_URL}latitude=${defaultLat}&longitude=${defaultLon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
        );

        const [currentResponse, forecastResponse] = await Promise.all([
          currentWeatherFetch,
          forecastFetch,
        ]);

        const [currentData, forecastData] = await Promise.all([
          currentResponse.json(),
          forecastResponse.json(),
        ]);

        setCurrentWeather({
          city: "Pokhara, Nepal",
          ...currentData,
        });
        setForecast({
          city: "Pokhara, Nepal",
          ...forecastData,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []); // Only run once when the component mounts

  const handleOnSearchChange = (searchData) => {
    const [lon, lat] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const [weatherResponse, forecastResponse] = await Promise.all(
          response.map((res) => res.json())
        );

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && forecast && (
        <CurrentWeather currentData={currentWeather} forecastData={forecast} />
      )}
    </div>
  );
}

export default App;
