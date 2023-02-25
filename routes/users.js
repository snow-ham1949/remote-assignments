const express = require('express');
const validator = require('../helper/validate');
const db = require('../helper/database');

const {validateDateFormat, checkInputFormat} = validator;

const router = express.Router();

router.use(express.json());

db.useDatabase('assignment');

// user sign up api
router.post('/', (req, res) => { 
  if (req.get('content-type') !== 'application/json') {
    res.status(400).json({
      "error": "Invalid content-type"
    });
    return;
  }

  const requestDate = req.get('request-date');
  if (!validateDateFormat(requestDate)) {
    res.status(400).json({
      "error": "Invalid request date"
    });
    return;
  }

  const {name, email, password} = req.body;
  if (checkInputFormat(name, email, password)) {
    if (db.checkUserEmail(email)) {
      res.status(400).json({
        "error": "Email already exists"
      });
    }
    else {
      const id = db.registerUser(name, email, password);
      res.status(200).json({
        "data": {
          "user": {id: id, name, email},
          "date": requestDate
        }
      });
    }
  }
  else {
    res.status(400).json({
      "error": "Invalid input format"
    });
  }
});

// user query api
router.get('/', (req, res) => {
  if (req.get('content-type') !== 'application/json') {
    res.status(400).json({
      "error": "Invalid content-type"
    });
    return;
  }

  const requestDate = req.get('request-date');
  if (!validateDateFormat(requestDate)) {
    res.status(400).json({
      "error": "Invalid request date"
    });
    return;
  }

  const userid = req.get('id');
  const user = db.getUserData(userid);
  if (user) {
    res.status(200).json({
      "data": {
        user,
        "date": requestDate
      }
    });
  }
  else {
    res.status(403).json({
      "error": "User not existing"
    });    
  }
});

module.exports = router;