import axios from 'axios';

const Weather = ({ data }) => {
  console.log(data);

  return (
    <div>
      <h2>Weather in {data[0]}</h2>
      <p>temperature {data[1]} Celcius</p>
      <img src={data[2]} alt="Weather Icon" />
      <p>wind {data[3]} m/s</p>
    </div>
  );
};

export default Weather;
