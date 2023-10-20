const Filter = ({ handleFilter }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        filter shown with <input onChange={handleFilter} />
      </div>
    </form>
  );
};

export default Filter;
