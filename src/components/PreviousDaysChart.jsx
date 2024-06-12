import { App as AntDApp, Card, Flex, Typography, theme } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function PreviousDaysChart({ longitude, latitude }) {
  const { token } = theme.useToken();
  const { message } = AntDApp.useApp();
  const [previousDays, setPreviousDays] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {
      latitude,
      longitude,
      hourly: [
        "temperature_2m",
        "temperature_2m_previous_day1",
        "temperature_2m_previous_day2",
        "temperature_2m_previous_day3",
        "temperature_2m_previous_day4",
        "temperature_2m_previous_day5",
        "temperature_2m_previous_day6",
        "temperature_2m_previous_day7",
      ],
      past_days: 7,
    };
    async function getHourlyWeatherData() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://previous-runs-api.open-meteo.com/v1/forecast",
          {
            params,
          }
        );
        const data = await response.data;
        setPreviousDays(data);
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

  if (!previousDays.hourly) {
    return null;
  }

  const data = [];
  for (let i = 1; i <= 7; i++) {
    if (i === 1) {
      data.push({
        name: new Date(new Date() - 24 * 60 * 60 * 1000).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          }
        ),
        temperature: previousDays.hourly.temperature_2m[0],
      });
      continue;
    }
    const previousDay = new Date() - i * 24 * 60 * 60 * 1000;

    data.push({
      name: new Date(previousDay).toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      temperature: previousDays.hourly[`temperature_2m_previous_day${i}`][0],
    });
  }

  console.log(data);

  return (
    <div
      style={{
        minWidth: 1000,
        padding: "2rem",
        background: token.colorBgBase,
      }}
    >
      <Typography.Title
        level={3}
        style={{
          textAlign: "center",
          fontStyle: "italic",
          marginBottom: "2rem",
        }}
      >
        Previous Days Temperature
      </Typography.Title>
      <Flex justify="center" align="center">
        <LineChart width={1000} height={250} data={data} margin={{ top: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke={token.colorPrimary}
          />
        </LineChart>
      </Flex>
    </div>
  );
}

export default PreviousDaysChart;
