// weatherUtils.js
const weatherNames = {
  0: "Clear",
  1: "Cloudy",
  2: "Partly cloudy",
  3: "Overcast",
  4: "Mist",
  5: "Fog",
  6: "Drizzle",
  7: "Rain showers",
  8: "Rain",
  9: "Snow showers",
  10: "Snow",
  11: "Thunderstorm",
  80: "Showers",
};

const getWeatherIcon = (weatherCode) => {
  switch (weatherCode) {
    case 0:
      return "sun.gif";
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return "cloudy.png";
    case 6:
    case 7:
    case 8:
    case 80:
      return "10d.png";
    case 9:
    case 10:
      return "13n.png";
    case 11:
      return "11d.png";
    default:
      return "unknown.png";
  }
};

const getDayName = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export { weatherNames, getWeatherIcon, getDayName };
