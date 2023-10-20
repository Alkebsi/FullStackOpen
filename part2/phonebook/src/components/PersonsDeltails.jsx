const PersonsDetails = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

export default PersonsDetails;
