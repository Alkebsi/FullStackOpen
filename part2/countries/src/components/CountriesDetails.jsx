const CountriesDetials = ({ display }) => {
  return (
    <p>
      {display.map((country, index) => {
        // console.log(country);
        return <span key={index}>{country.name.common}<br /></span>
      })}
    </p>
  );
};

export default CountriesDetials;
