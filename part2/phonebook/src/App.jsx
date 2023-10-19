import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      id: 1,
    },
  ]);
  const [newName, setNewName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameObj = {
      name: newName,
      id: persons.length + 1,
    };

    persons.map((person) => {
      const personsCopy = [...persons];
      if (newName === person.name) {
        alert(`${newName} is already added to the phonebook`);
        setPersons(personsCopy);
      } else {
        setPersons(persons.concat(nameObj));
      }
    });

    setNewName('');
  };

  const handleNoteChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} <br />
          </p>
        );
      })}
    </div>
  );
};

export default App;
