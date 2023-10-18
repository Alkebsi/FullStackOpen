const Part = ({ part }) => {
  // console.log(props)
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default Part;
