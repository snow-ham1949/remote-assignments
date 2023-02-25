const express = require('express');
const validator = require('./validate');
const {validateName, validateEmail, validatePassword} = validator;

const router = express.Router();

router.use(express.json());

// user sign up api
router.post('/', (req, res) => { 
  if (req.get('content-type') !== 'application/json') {
    res.status(400).json({
      "error": "Invalid content-type"
    });
    return;
  }

  const requestDate = req.get('request-date');
  if (!checkRequestDate(requestDate)) {
    res.status(400).json({
      "error": "Invalid request date"
    });
    return;
  }

  const {name, email, password} = req.body;
  if (checkInputFormat(name, email, password)) {
    if (checkEmailExist(email)) {
      res.status(400).json({
        "error": "Email already exists"
      });
    }
    else {
      const id = registerUser(name, email, password);
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
  if (!checkRequestDate(requestDate)) {
    res.status(400).json({
      "error": "Invalid request date"
    });
    return;
  }

  const userid = req.get('id');
  const user = getUserInformation(userid);
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

// TODO: check whether request date meet the format requirement
function checkRequestDate(date) {

}

function checkInputFormat(name, email, password) {
  if(validateName(name) && validateEmail(email) && validatePassword(password)) return true;
  else return false;
}

/**
 * TODO: check whether email has already been registered
 * @param {string} email 
 * @returns {boolean} 
 */
function checkEmailExist(email) {

}

/**
 * TODO: register user into database
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @return {string} id
 */
function registerUser(name, email, password) {

}

/**
 * TODO: check user information in database, if not existing, return empty json
 * @param {string} userid
 * @returns {json} 
 */
function getUserInformation(userid) {

}

module.exports = router;