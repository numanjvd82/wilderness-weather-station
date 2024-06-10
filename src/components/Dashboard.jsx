import { AirQuality } from "./AirQuality";
import { CurrentWeather } from "./CurrentWeather";
import { HourlyWeather } from "./HourlyWeather";
import { TenDayForecast } from "./TenDayForecast";

export function Dashboard() {
  return (
    <>
      <CurrentWeather />
      <HourlyWeather />
      <TenDayForecast />
      <AirQuality />
    </>
  );
}
