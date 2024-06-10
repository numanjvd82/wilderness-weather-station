import { App as AntDApp, Badge, Card, Flex, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { WiDaySunny, WiMoonAltFirstQuarter } from "weather-icons-react";
import { getParams } from "../utils/getParams";

export function HourlyWeather() {
  const { message } = AntDApp.useApp();
  const [hourlyData, setHourlyData] = useState({});
  const [loading, setLoading] = useState(true);
  const { latitude, longitude } = getParams(["latitude", "longitude"]);

  useEffect(() => {
    const params = {
      latitude,
      longitude,
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "dew_point_2m",
        "apparent_temperature",
        "precipitation_probability",
        "precipitation",
        "weather_code",
      ],
    };
    async function getHourlyWeatherData() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params,
          }
        );
        const data = await response.data;
        setHourlyData(data);
        setLoading(false);
      } catch (error) {
        message.error(error.message);
        setLoading(false);
      }
    }

    getHourlyWeatherData();
  }, [latitude, longitude]);

  if (loading) {
    return <Card loading={loading} />;
  }

  if (!hourlyData.hourly) {
    return null;
  }

  const timeSeries = hourlyData.hourly.time.map((time, index) => {
    const dayTime = new Date(time).getHours();
    const isDay = dayTime >= 6 && dayTime <= 18;
    return {
      time,
      temperature: hourlyData.hourly.temperature_2m[index],
      weatherCode: hourlyData.hourly.weather_code[index],
      icon: isDay ? WiDaySunny : WiMoonAltFirstQuarter,
    };
  });

  return (
    <Card title="Hourly Weather">
      <Flex
        style={{
          overflowX: "auto",
          width: "100%",
          paddingBottom: "10px",
        }}
      >
        {timeSeries.map((timeData, i) => {
          const IsDayOrNight = timeData.icon;
          return (
            <Flex
              style={{
                padding: "10px",
                cursor: "pointer",
                transition: "all 0.3s",
                textAlign: "center",
              }}
              vertical
              key={i}
              className="hourly-weather-card"
            >
              <IsDayOrNight size={50} />
              <Typography.Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {new Date(timeData.time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                })}
              </Typography.Text>
              <Badge
                count={`${timeData.temperature}°C`}
                color={
                  timeData.temperature <= 20
                    ? "blue"
                    : timeData.temperature <= 25
                    ? "orange"
                    : "red"
                }
              />
            </Flex>
          );
        })}
      </Flex>
    </Card>
  );
}
