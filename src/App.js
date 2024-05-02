import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import React, { useState } from "react";
import { WEATHER_API_URL } from "./api";
import Forecast from "./components/forecast/forecasts";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`
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

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      <Forecast />
    </div>
  );
}

export default App;
