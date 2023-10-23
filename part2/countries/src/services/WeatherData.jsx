import { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from '../components/Weather';

const WeatherData = ({ city }) => {
  const [data, setData] = useState([city]);

  const key = 'WRITE YOUR WeatherAPI.com KEY HERE';

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=yes`
      )
      .then((response) => {
        const result = response.data;
        let info = [];

        info.push(result.current.temp_c);
        info.push(result.current.condition.icon);
        info.push(result.current.wind_mph);

        setData(data.concat(info));
      });
  }, [city]);

  return <Weather data={data} />;
};

export default WeatherData;
