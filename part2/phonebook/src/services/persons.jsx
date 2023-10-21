import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id, name) => {
  const confirmedRemoval = confirm(`Delete ${name} ?`);

  if (confirmedRemoval) {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
  } else {
    return axios.get(baseUrl);
  }
};

export default { getAll, create, remove };
