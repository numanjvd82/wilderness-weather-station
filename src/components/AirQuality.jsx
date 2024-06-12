import { App as AntDApp, Badge, Card, Col, Row, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  WiDaySunny,
  WiDust,
  WiMoonAltFirstQuarter,
  WiSmoke,
  WiStrongWind,
} from "weather-icons-react";

export function AirQuality({ latitude, longitude }) {
  const { message } = AntDApp.useApp();
  const [airQualityData, setAirQualityData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {
      latitude,
      longitude,
      current: [
        "us_aqi",
        "european_aqi",
        "dust",
        "uv_index",
        "uv_index_clear_sky",
      ],
    };
    async function getAirQualityData() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://air-quality-api.open-meteo.com/v1/air-quality",
          {
            params,
          }
        );
        const data = await response.data;
        setAirQualityData(data);
        setLoading(false);
      } catch (error) {
        message.error(error.message);
        setLoading(false);
      }
    }

    getAirQualityData();
  }, [latitude, longitude]);

  if (loading) {
    return <Card loading={loading} />;
  }

  if (!airQualityData.current) {
    return null;
  }

  const usAirQi =
    airQualityData.current.us_aqi <= 20
      ? "Good"
      : airQualityData.current.us_aqi <= 50
      ? "Moderate"
      : airQualityData.current.us_aqi <= 100
      ? "Unhealthy for Sensitive Groups"
      : airQualityData.current.us_aqi <= 150
      ? "Unhealthy"
      : airQualityData.current.us_aqi <= 200
      ? "Very Unhealthy"
      : "Hazardous";

  const europeanAirQi =
    airQualityData.current.european_aqi <= 25
      ? "Good"
      : airQualityData.current.european_aqi <= 50
      ? "Fair"
      : airQualityData.current.european_aqi <= 75
      ? "Moderate"
      : airQualityData.current.european_aqi <= 100
      ? "Poor"
      : "Very Poor";

  const data = [
    {
      title: "US Air Quality",
      ribbon: true,
      value: airQualityData.current.us_aqi,
      category: usAirQi,
      Icon: WiSmoke,
    },
    {
      title: "European Air Quality",
      value: airQualityData.current.european_aqi,
      category: europeanAirQi,
      Icon: WiStrongWind,
    },
    {
      title: "Dust",
      value: airQualityData.current.dust,
      category:
        airQualityData.current.dust === 0 ? "The Air around is clean" : "Dusty",
      Icon: WiDust,
    },
    {
      title: "UV Index",
      value: airQualityData.current.uv_index,
      category: airQualityData.current.uv_index === 0 ? "Low" : "High",
      Icon: WiDaySunny,
    },
    {
      title: "UV Index Clear Sky",
      value: airQualityData.current.uv_index_clear_sky,
      category:
        airQualityData.current.uv_index_clear_sky === 0 ? "Low" : "High",
      Icon: WiMoonAltFirstQuarter,
    },
  ];

  return (
    <Card title="Air Quality" style={{ marginBottom: 20 }}>
      <Row gutter={[12, 12]}>
        {data.map(({ title, value, category, Icon }, index) => {
          const WiIcon = Icon;
          return (
            <Col key={index} xs={18} md={12} lg={8}>
              <Badge.Ribbon text={value}>
                <Card title={title} size="small">
                  <WiIcon size={50} />
                  <Typography.Paragraph>
                    {category}: {value}
                  </Typography.Paragraph>
                </Card>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
}
