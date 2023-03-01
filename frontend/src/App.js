import './App.css';

function App() {
  const user = {
    name: "Addie",
    email: "addie@appworks.com",
    password: "test_123",
  };
  const handleSubmit = () => {
    fetch('http://localhost:4000/users', {
      method: "POST",
      body: JSON.stringify(user),
      headers: { 
        'content-type': 'application/json',
        'request-date': 'Wed, 22 Feb 2023 16:47:36 GMT'
      }
    })
    .then((res) => console.log(res));
  };
  return (
    <div className="container">
      <form id="form" className="form">
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter username" />
          <small>Error message</small>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="Enter email" />
          <small>Error message</small>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
          <small>Error message</small>
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
