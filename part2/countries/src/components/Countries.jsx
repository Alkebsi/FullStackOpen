import CountriesDetials from './CountriesDetails';
import Country from './Country';

const Countries = ({ display, filterKey,  }) => {
  let result = "You haven't set a filter query!";

  if (display.length > 0 && filterKey) {
    if (display.length > 10) {
      result = 'Too many entries. Please, try to specify your filter.';
    } else if (display.length <= 10 && display.length > 1) {
      result = <CountriesDetials display={display} />;
    } else if (display.length === 1) {
      result = <Country display={display[0]} />;
    }
  } else if (filterKey && display.length === 0) {
    result = 'Nothing matches your query';
  }

  return (
    <>
      <div>{result}</div>
    </>
  );
};

export default Countries;