import PersonsDetails from './PersonsDeltails';

const Persons = ({ persons, filter }) => {
  return persons
    .filter((person) => person.name.search(filter) >= 0)
    .map((p) => {
      return <PersonsDetails key={p.id} person={p} />;
    });
};

export default Persons;
