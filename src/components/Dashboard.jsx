import { useSearchParams } from "react-router-dom";
import { getParams } from "../utils/getParams";
import { AirQuality } from "./AirQuality";
import { CurrentWeather } from "./CurrentWeather";
import { HourlyWeather } from "./HourlyWeather";
import PreviousDaysChart from "./PreviousDaysChart";
import { TenDayForecast } from "./TenDayForecast";

export function Dashboard() {
  const [searchParams] = useSearchParams();
  const { latitude, longitude } = getParams(searchParams, [
    "latitude",
    "longitude",
  ]);
  return (
    <>
      <CurrentWeather latitude={latitude} longitude={longitude} />
      <PreviousDaysChart latitude={latitude} longitude={longitude} />
      <HourlyWeather latitude={latitude} longitude={longitude} />
      <TenDayForecast latitude={latitude} longitude={longitude} />
      <AirQuality latitude={latitude} longitude={longitude} />
    </>
  );
}
