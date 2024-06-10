import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "weather-icons-react";

const weatherIconMap = {
  0: WiDaySunny, // Clear sky
  1: WiDayCloudy, // Mainly clear
  2: WiCloudy, // Partly cloudy
  3: WiCloudy, // Overcast
  45: WiFog, // Fog
  48: WiFog, // Depositing rime fog
  51: WiRain, // Drizzle: Light
  53: WiRain, // Drizzle: Moderate
  55: WiRain, // Drizzle: Dense intensity
  56: WiRain, // Freezing Drizzle: Light
  57: WiRain, // Freezing Drizzle: Dense intensity
  61: WiRain, // Rain: Slight
  63: WiRain, // Rain: Moderate
  65: WiRain, // Rain: Heavy intensity
  66: WiRain, // Freezing Rain: Light
  67: WiRain, // Freezing Rain: Heavy intensity
  71: WiSnow, // Snow fall: Slight
  73: WiSnow, // Snow fall: Moderate
  75: WiSnow, // Snow fall: Heavy intensity
  77: WiSnow, // Snow grains
  80: WiRain, // Rain showers: Slight
  81: WiRain, // Rain showers: Moderate
  82: WiRain, // Rain showers: Violent
  85: WiSnow, // Snow showers slight
  86: WiSnow, // Snow showers heavy
  95: WiThunderstorm, // Thunderstorm: Slight or moderate
  96: WiThunderstorm, // Thunderstorm with slight hail
  99: WiThunderstorm, // Thunderstorm with heavy hail
};

export default weatherIconMap;
