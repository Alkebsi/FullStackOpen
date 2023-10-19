import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const addContact = (e) => {
    e.preventDefault();

    const nameObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const existing = persons.find((person) => person.name === newName);

    if (existing) {
      alert(`${newName} is already added to phonebook!`)
    } else {
      setPersons(persons.concat(nameObj));
    }

    setNewName('');
    setNewNumber('');
  };

  const handleNoteChange = (e) => {
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
      <form>
        <div>
          filter shown with <input onChange={handleFilter} />
        </div>
      </form>

      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.filter(person => person.name.search(filter) >= 0).map((p) => {
        return <p key={p.id}>{p.name} {p.number}</p>
      })}
    </div>
  );
};

export default App;
