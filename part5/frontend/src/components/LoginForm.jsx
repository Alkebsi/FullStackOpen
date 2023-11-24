const LoginForm = ({ args }) => {

  const {handleLogin, onUsernameChange, onPasswordChange, username, password} = args;
  
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={onUsernameChange}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={onPasswordChange}
          />
          <br />
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;