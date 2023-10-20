const PersonForm = ({ args }) => {
  return (
    <form onSubmit={args.addContact}>
      <div>
        name: <input value={args.newName} onChange={args.handleNameChange} />
      </div>
      <div>
        number:{' '}
        <input value={args.newNumber} onChange={args.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
