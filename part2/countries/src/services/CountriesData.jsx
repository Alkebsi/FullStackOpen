import axios from 'axios';

const baseUrl = 'http://localhost:3000/countries.json'; // 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };
