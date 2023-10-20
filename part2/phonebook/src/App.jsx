import { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addContact = (e) => {
    e.preventDefault();

    const personsObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const existing = persons.find((person) => person.name === newName);

    if (existing) {
      alert(`${newName} is already added to phonebook!`);
    } else {
      personService.create(personsObj).then((response) => {
        setPersons(persons.concat(personsObj));
      });
    }

    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(new RegExp(e.target.value, 'ig'));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />

      <h2>add a new</h2>
      <PersonForm
        args={{
          addContact,
          newName,
          newNumber,
          handleNameChange,
          handleNumberChange,
        }}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
