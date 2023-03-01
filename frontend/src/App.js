import './App.css';
import axios from 'axios';

const App = () => {
  const handleSubmit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/users',
      headers: { 
        'content-type': 'application/json',
        'request-date': 'Wed, 22 Feb 2023 16:47:36 GMT'
      }, 
      data: {
        name: "erin",
        email: "te@appworks.com",
        password: "test_123", // This is the body part
      }
    })
    .then((res) => {console.log(res.data.data.user.id)});
  };
  return (
    <div className="container">
      <form id="form" className="form">
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter username" />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="Enter email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
