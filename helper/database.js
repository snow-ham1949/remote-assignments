const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'database-instance.c1a2hycmc2k6.ap-northeast-1.rds.amazonaws.com',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  datebase: 'assignment'
});

connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('DB connected');
});

const checkEmailExistence = async function(email) {
  try {
    const emailExist = await checkEmailExistenceQuery(email);
    return emailExist;
  }
  catch (err) {
    console.error(err);
  }
}

const registerUser = async function (name, email, password) {
  try {
    const id = await registerUserQuery(name, email, password);
    return id;
  }
  catch (err) {
    console.error(err);
  }
};

const checkUserExistence = async function (userid) {
  try {
    const user = await checkUserExistenceQuery(userid);
    return user;
  }
  catch (err) {
    console.error(err);
  }
};

/* Database SQL Query Part */

function checkEmailExistenceQuery(email) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT email FROM user WHERE email = ?', [email], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      else {
        if (result.length > 0) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }
    })
  });
}

function registerUserQuery(name, email, password) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO user (name, email, password) VALUES (?, ?, ?)`, [name, email, password], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      else {
        resolve(result);
      }
    })
  });
}

function checkUserExistenceQuery(userid) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM user WHERE id = ?`, [userid], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      else {
        resolve(result);
      }
    })
  });
}

module.exports = { checkEmailExistence, registerUser, checkUserExistence };