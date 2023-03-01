import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:4000/users',
      headers: {
        'content-type': 'application/json',
        'request-date': new Date().toUTCString()
      },
      data: { name, email, password }
    })
      .then((res) => { setUserID(res.data.data.user.id) })
      .catch(function (error) {
        console.log("error!" + error.toJSON());
      });
  };

  return (
    <div className="container">
      <form id="form" className="form" onSubmit={handleSubmit}>
        {userID &&
          <>
            <h4 className="success-message">
              Successfully Sign Up.
            </h4>
            <h4 className="success-message">
              User ID: {userID}
            </h4>
          </>
        }
        <div className="form-control">
          <label htmlFor="name">Username</label>
          <input type="text" id="name" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default App;
