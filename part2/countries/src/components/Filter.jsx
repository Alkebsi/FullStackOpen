const Filter = ({ handleFiltering }) => {
  return (
    <>
      <form>
        <div>
          find countries <input onChange={handleFiltering} />
        </div>
      </form>
    </>
  );
};

export default Filter;
