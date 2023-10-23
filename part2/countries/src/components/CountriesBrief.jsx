const CountriesBrief = ({ display, handleCountryShow }) => {
  return (
    <p>
      {display.map((country, index) => {
        // console.log(country);
        return <span key={index}>{country.name.common} &nbsp;<button onClick={handleCountryShow} name={country.name.common}>show</button><br /></span>
      })}
    </p>
  );
};

export default CountriesBrief;
