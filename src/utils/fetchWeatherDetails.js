import axios from "axios";

export async function fetchWeather(latitude, longitude) {
  try {
    const currentWeatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const forecastResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`
    );

    const currentWeather = currentWeatherResponse.data;
    const forecast = forecastResponse.data;

    return { currentWeather, forecast };
  } catch (error) {
    console.error("Error fetching the weather data:", error);
  }
}
