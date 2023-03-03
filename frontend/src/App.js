import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: 'post',
        url: 'http://175.41.198.71/api/users',
        headers: {
          'content-type': 'application/json',
          'request-date': new Date().toUTCString()
        },
        data: { name, email, password }        
      })
      setUserID(res.data.data.user.id);
    } catch (err) {
      setErrorMessage(err.message);
    }
    // axios({
    //   method: 'post',
    //   url: 'http://175.41.198.71/api/users',
    //   headers: {
    //     'content-type': 'application/json',
    //     'request-date': new Date().toUTCString()
    //   },
    //   data: { name, email, password }
    // })
    // .then((res) => { 
    //   setUserID(res.data.data.user.id)
    // })
    // .catch(function (error) {
    //   setErrorMessage(error.message);
    // });
  };

  return (
    <div className="container">
      <form id="form" className="form" onSubmit={ handleSubmit }>
        { errorMessage ? 
          <p className="error-message">
            { errorMessage }
          </p> :
          null
        }
        {
          userID ?
          <p className="success-message">
            Successfully Sign Up. User ID: { userID }
          </p> :
          null
        }
        <div className="form-control">
          <label htmlFor="name">Username</label>
          <input type="text" id="name" value={ name } placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={ email } placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={ password } placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default App;
