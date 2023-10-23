import CountriesBrief from './CountriesBrief';
import Country from './SingleCountryDetails';

const Countries = ({ display, filterKey, handleCountryShow }) => {
  let result = "You haven't set a filter query!";

  if (display.length > 0 && filterKey) {
    if (display.length > 10) {
      result = 'Too many entries. Please, try to specify your filter.';
    } else if (display.length <= 10 && display.length > 1) {
      result = <CountriesBrief display={display} handleCountryShow={handleCountryShow} />;
    } else if (display.length === 1) {
      result = <Country display={display[0]} />;
    }
  } else if (filterKey && display.length === 0) {
    result = 'Nothing matches your query, or data is still pending';
  }

  return (
    <>
      <div>{result}</div>
    </>
  );
};

export default Countries;