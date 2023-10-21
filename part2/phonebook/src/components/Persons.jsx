import PersonsDetails from './PersonsDeltails';

const Persons = ({ persons, filter, handleDelete }) => {
  return persons
    .filter((person) => person.name.search(filter) >= 0)
    .map((p) => {
      return <PersonsDetails key={p.id} person={p} handleDelete={handleDelete} />;
    });
};

export default Persons;
