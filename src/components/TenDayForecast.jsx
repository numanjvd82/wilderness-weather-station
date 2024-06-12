import {
  App as AntDApp,
  Badge,
  Card,
  Col,
  Flex,
  Row,
  Typography,
  theme,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import weatherIconMap from "../components/WeatherIcons";
import { handleTiltMouseLeave, handleTiltMouseMove } from "../utils";

export function TenDayForecast({ latitude, longitude }) {
  const { message } = AntDApp.useApp();
  const { token } = theme.useToken();
  const [dailyData, setDailyData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {
      latitude,
      longitude,
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "weather_code",
      ],
      forecast_days: 10,
    };
    async function getDailyWeatherData() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params,
          }
        );
        const data = await response.data;
        setDailyData(data);
        setLoading(false);
      } catch (error) {
        message.error(error.message);
        setLoading(false);
      }
    }

    getDailyWeatherData();
  }, [latitude, longitude]);

  if (loading) {
    return <Card loading={loading} />;
  }

  if (!dailyData.daily) {
    return null;
  }

  const forecastSeries = dailyData.daily.time.map((date, index) => {
    return {
      date,
      maxTemp: dailyData.daily.temperature_2m_max[index],
      minTemp: dailyData.daily.temperature_2m_min[index],
      precipitation: dailyData.daily.precipitation_sum[index],
      weatherCode: dailyData.daily.weather_code[index],
    };
  });

  return (
    <Card title="10-Day Weather Forecast">
      <Row gutter={[16, 16]}>
        {forecastSeries.map((forecast, i) => {
          const WeatherIcon = weatherIconMap[forecast.weatherCode];
          return (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={4}
              key={i}
              style={{
                textAlign: "center",
              }}
            >
              <Card
                onMouseMove={(e) => handleTiltMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleTiltMouseLeave(e.currentTarget)}
                style={{
                  transition: "all 0.2s",
                }}
                className="ten-day-forecast-card"
              >
                <WeatherIcon size={50} />
                <Typography.Text
                  style={{
                    display: "block",
                    marginTop: "8px",
                  }}
                >
                  {new Date(forecast.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </Typography.Text>
                <Flex gap="small" justify="center">
                  <Badge
                    count={`Max: ${forecast.maxTemp}°C`}
                    style={{
                      backgroundColor: token.red5,
                      marginBottom: "4px",
                    }}
                  />
                  <Badge
                    count={`Min: ${forecast.minTemp}°C`}
                    style={{ backgroundColor: token.blue5 }}
                  />
                </Flex>
                <Typography.Text
                  style={{
                    display: "block",
                    marginTop: "8px",
                  }}
                >
                  {`Precipitation: ${forecast.precipitation} mm`}
                </Typography.Text>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
}
