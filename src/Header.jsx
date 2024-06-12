import {
  App as AntDApp,
  AutoComplete,
  Badge,
  Flex,
  Typography,
  theme,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { WiMoonAltWaningCrescent3 } from "weather-icons-react";

const Header = () => {
  const { token } = theme.useToken();
  const { message } = AntDApp.useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const headerStyle = {
    backgroundColor: token.colorPrimary,
    padding: "0 1rem",
  };

  useEffect(() => {
    async function getLocations() {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchText}&count=10&language=en&format=json`
        );
        const data = await response.data;
        setOptions(
          () =>
            data?.results?.map((location) => ({
              key: `${location.latitude}-${location.longitude}`,
              id: location.id,
              value: location.name,
              country: location.country,
              latitude: location.latitude,
              longitude: location.longitude,
            })) || []
        );
        setLoading(false);
      } catch (error) {
        message.error(error.message);
        setLoading(false);
      }
    }

    getLocations();
  }, [searchText]);

  const onSelect = (value) => {
    setSearchText("");
    const selectedLocation = options.find((option) => option.value === value);
    if (selectedLocation) {
      setSearchParams(
        (searchParams,
        {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        })
      );
    }
  };

  return (
    <div style={headerStyle}>
      <Flex justify="space-between" align="center">
        <Flex justify="center" align="center">
          <WiMoonAltWaningCrescent3
            style={{
              color: "white",
            }}
            size={50}
          />
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center", margin: 0 }}
          >
            Wilderness Weather Station
          </Typography.Title>
        </Flex>

        <AutoComplete
          filterOption={(inputValue) =>
            options.filter((option) =>
              option.value.toLowerCase().includes(inputValue.toLowerCase())
            )
          }
          optionRender={({ data }) => (
            <Flex key={data.id} justify="space-between">
              <Typography.Text>{data.value}</Typography.Text>
              <Badge count={data.country} color={token.colorPrimary} />
            </Flex>
          )}
          loading={loading}
          onSearch={(value) => setSearchText(value)}
          allowClear
          showSearch
          options={options}
          style={{ width: 300 }}
          onSelect={onSelect}
          placeholder="Search for a location"
        />
      </Flex>
    </div>
  );
};

export default Header;
