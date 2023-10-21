const Notifications = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  if (type === 'success') 
    return <div className="success">{message}</div>;
};

export default Notifications;
