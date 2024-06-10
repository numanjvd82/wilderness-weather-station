import { Flex, Typography, theme } from "antd";
import { WiMoonAltWaningCrescent3 } from "weather-icons-react";

const Header = () => {
  const { token } = theme.useToken();

  const headerStyle = {
    backgroundColor: token.colorPrimary,
    height: "3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2rem",
  };

  return (
    <div style={headerStyle}>
      <Flex align="center">
        <WiMoonAltWaningCrescent3
          style={{
            color: "white",
          }}
          size={50}
        />
        <Typography.Title level={5} style={{ color: "white", margin: 0 }}>
          Wilderness Weather Station
        </Typography.Title>
      </Flex>
    </div>
  );
};

export default Header;
