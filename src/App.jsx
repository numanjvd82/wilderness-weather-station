import { App as AntDApp } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import { Dashboard } from "./components/Dashboard";

function App() {
  const { message } = AntDApp.useApp();
  const [userLocation, setUserLocation] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            setSearchParams((searchParams, { latitude, longitude }));
          },
          (error) => {
            message.error("Error getting user location");
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    getUserLocation();
  }, []);

  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
}

export default App;
