const express = require('express');
const validator = require('../helper/validate')
const db = require('../helper/database');

const { validateInput, checkRequestDate } = validator;

const router = express.Router();

router.use(express.json());

// user sign up api
router.post('/', async (req, res) => { 
  console.log(req.headers);
  console.log(req.body);
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).json({
      "error": "Wrong content-type"
    });
    return;
  }
  const requestDate = req.headers['request-date'];
  if (!checkRequestDate(requestDate)) {
    res.status(400).json({
      "error": "Wrong request date format"
    });
    return;
  }
  const { name, email, password } = req.body;
  if (validateInput(name, email, password) === false) {
    res.status(400).json({
      "error": "Wrong name/email/password format"
    });
  }
  else {
    if (db.checkEmailExistence(email) === true) {
      res.status(403).json({
        "error": "Email already exists"
      });
    }
    else {
      const id = await db.registerUser(name, email, password);
      if (id < 0) res.send('Oops! Something went wrong');
      else {
        res.status(200).json({
          "data": {
            "user": { id: id, name, email },
            "date": requestDate
          }
        });
      }
    }
  }
});

// user query api
router.get('/', async (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send('Wrong content-type');
    return;
  }
  const requestDate = req.headers['request-date'];
  if (!checkRequestDate(requestDate)) {
    res.status(400).send('Wrong request date format');
    return;
  }

  const userid = req.query.id;
  const user = await db.checkUserExistence(userid);
  if (user) {
    res.status(200).json({
      "data": {
        "user": {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
        },
        requestDate
      }
    })
  }
  else {
    res.status(403).send('User does not exist');
  }
});

module.exports = router;