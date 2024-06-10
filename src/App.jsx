import { App as AntDApp } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import { Dashboard } from "./components/Dashboard";
import { setUrlParams } from "./utils/setParams";

function App() {
  const { message } = AntDApp.useApp();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      const userLocation = localStorage.getItem("userLocation");
      if (userLocation) {
        setUserLocation(JSON.parse(userLocation));
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ latitude, longitude });
              localStorage.setItem(
                "userLocation",
                JSON.stringify({ latitude, longitude })
              );
            },
            (error) => {
              message.error("Error getting user location");
              console.error("Error getting user location:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }
    };

    getUserLocation();
    if (userLocation) {
      setUrlParams(userLocation);
    }
  }, []);

  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
}

export default App;
