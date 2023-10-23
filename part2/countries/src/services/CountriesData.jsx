import axios from 'axios';

// I tested the app on an offline version found at http://localhost:3000/countries.json 
// In case the port is different, the file is found at <root>/public/countries.json
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export default { getAll };
