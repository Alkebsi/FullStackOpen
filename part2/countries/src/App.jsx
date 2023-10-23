import { useState, useEffect } from 'react';
import CountriesData from './services/CountriesData';
import Countries from './components/Countries';
import Filter from './components/Filter';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterKey, setFilterKey] = useState('');
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    CountriesData.getAll().then((data) => {
      setCountries(data);
    });
  }, []);
  const handleFiltering = (e) => {
    setFilterKey(e.target.value);

    setDisplay(
      countries.filter(
        (country) =>
          country.name.common.search(new RegExp(e.target.value, 'ig')) >= 0
      )
    );
  };

  return (
    <div>
      <Filter handleFiltering={handleFiltering} />
      <Countries display={display} filterKey={filterKey} />
    </div>
  );
};

export default App;
