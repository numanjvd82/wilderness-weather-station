import { App as AntDApp, Card, Col, Row, Statistic, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { getParams } from "../utils/getParams";

export function CurrentWeather() {
  const { message } = AntDApp.useApp();
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const { latitude, longitude } = getParams(["latitude", "longitude"]);

  useEffect(() => {
    const params = {
      latitude,
      longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day,precipitation",
        "weather_code",
        "wind_speed_10m",
        "wind_direction_10m",
        "wind_gusts_10m",
      ],
    };
    async function getWeatherData() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params,
          }
        );
        const data = await response.data;
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        message.error(error.message);
        setLoading(false);
      }
    }

    getWeatherData();
  }, [latitude, longitude]);

  if (loading) {
    return <Card loading={loading} />;
  }

  if (!weatherData.current) {
    return null;
  }

  const data = [
    {
      title: "Temperature",
      value: `${weatherData.current.temperature_2m}°C`,
    },
    {
      title: "Humidity",
      value: `${weatherData.current.relative_humidity_2m}%`,
    },
    {
      title: "Feels Like",
      value: `${weatherData.current.apparent_temperature}°C`,
    },
    {
      title: "Precipitation",
      value: `${weatherData.current.precipitation}mm`,
    },
    {
      title: "Wind Speed",
      value: `${weatherData.current.wind_speed_10m}m/s`,
    },
    {
      title: "Wind Gusts",
      value: `${weatherData.current.wind_gusts_10m}m/s`,
    },
    {
      title: "Wind Direction",
      value: `${weatherData.current.wind_direction_10m}°`,
    },
  ];

  return (
    <>
      <Card title={`Current Weather`}>
        <Typography.Title level={4}>
          {new Date().toLocaleTimeString()}
        </Typography.Title>
        <Row>
          {data.map((weather, i) => (
            <Col xs={24} sm={12} md={8} lg={6} key={i}>
              <Statistic title={weather.title} value={weather.value} />
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}
