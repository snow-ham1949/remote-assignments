const express = require('express');
const validator = require('../helper/validate')
const db = require('../helper/database');

const {checkInput, checkRequestDate} = validator;

const router = express.Router();

router.use(express.json());

// user sign up api
router.post('/', async (req, res) => { 
  if (req.headers['content-type'] !== 'applicaton/json') {
    res.status(400).send('Wrong content-type');
    return;
  }
  const requestDate = req.header['request-date'];
  if (!checkRequestDate(requestDate)) {
    res.status(400).send('Wrong request date format');
    return;
  }

  const {name, email, password} = req.body;
  if (!checkInput(name, email, password)) {
    res.status(400).send('Wrong name/email/password format');
  }
  else {
    if (db.checkEmailExistence(email)) {
      res.status(403).send('Email already exists');
    }
    else {
      const id = await db.registerUser(name, email, password);
      res.status(200).json({
        "data": {
          "user": {
            id: id,
            email,
            password
          },
          requestDate
        }
      });
    }
  }
});

// user query api
router.get('/', async (req, res) => {
  if (req.headers['content-type'] !== 'applicaton/json') {
    res.status(400).send('Wrong content-type');
    return;
  }
  const requestDate = req.header['request-date'];
  if (!checkRequestDate(requestDate)) {
    res.status(400).send('Wrong request date format');
    return;
  }  

  const userid = req.query.id;
  const user = await db.checkUserExistence(userid);
  if (user) {
    res.status(200).json({
      "data": {
        user,
        requestDate
      }
    })
  }
  else {
    res.status(403).send('User does not exist');
  }
});

module.exports = router;