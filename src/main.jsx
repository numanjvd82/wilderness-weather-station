import { App as AntDApp, ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#57A6A1",
          linkHoverDecoration: "underline",
          colorLinkHover: "#238979",
          colorLinkActive: "#238979",
          colorLink: "#238979",
        },
        components: {
          Spin: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          },
          Card: {
            lineWidth: "2px",
          },
        },
      }}
    />
    <BrowserRouter>
      <AntDApp>
        <App />
      </AntDApp>
    </BrowserRouter>
  </React.StrictMode>
);
