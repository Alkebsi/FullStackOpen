import WeatherData from '../services/WeatherData';

const Country = ({ display }) => {
  let langs = [];

  for (let lang in display.languages) {
    langs.push(lang);
  }

  return (
    <div>
      <h1>{display.name.common}</h1>

      <p>
        capital: {display.capital}
        <br />
        area: {display.area}
      </p>

      <br />
      <b>Languages:</b>
      <ul>
        {langs.map((value, index) => {
          return <li key={index}>{display.languages[value]}</li>;
        })}
      </ul>

      <img src={display.flags.svg} alt={display.flags.alt} width={200} />

      <WeatherData city={display.capital[0]} />
    </div>
  );
};

export default Country;
