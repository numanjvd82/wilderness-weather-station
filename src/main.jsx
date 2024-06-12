import { App as AntDApp, ConfigProvider } from "antd";
import "antd/dist/antd.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#55AD9B",
          colorBgBase: "#F1F8E8",
          colorLinkHover: "#55AD9B",
          colorLinkActive: "#55AD9B",
          colorLink: "#55AD9B",
        },
        components: {
          Card: {
            lineWidth: 2,
          },
        },
      }}
    >
      <BrowserRouter>
        <AntDApp>
          <App />
        </AntDApp>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
