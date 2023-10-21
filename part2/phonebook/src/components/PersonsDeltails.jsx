const PersonsDetails = ({ person, handleDelete }) => {
  console.log(person);
  return (
    <div>
      {person.name} {person.number} &nbsp;&nbsp;
      <button onClick={handleDelete} id={person.id} name={person.name}>delete</button>
    </div>
  );
};

export default PersonsDetails;
