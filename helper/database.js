const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'appworksprogram.c63rwssh5h5i.ap-northeast-1.rds.amazonaws.com',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  datebase: 'assignment'
});

connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("DB connect");
});

/**
 * - check whether connection is successfully established
 * @param {connection} connection 
 * @returns {boolean}
 */
function connectionCheck(connection) {
  if (connection.state === 'disconnected') {
    console.error("Database connection is not established.");
    return false;
  }
  return true;
}

/**
 * - change database to 'database'
 * - Async function
 * @param {string} database 
 */
const useDatabase = async function (database) {
  if (!connectionCheck(connection)) return;

  try {
    const result = await useDatabaseQuery(database);
  } catch (err) {
    console.error(err);
  }
}

/** 
 * - check whether email exists in the database
 * @param {string} email 
 * @return {boolean} 
 */
const checkUserEmail = async function (email) {
  if (!connectionCheck(connection)) return;

  try {
    const emailExist = await getUserEmailQuery(email);
    return emailExist;
  } catch (err) {
    console.error(err);
  }
}

/**
 * insert user information into database and return user id
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @return {int} userID, if not success -> -1
 */
const registerUser = async function (name, email, password) {
  if (!connectionCheck(connection)) return -1;

  try {
    const user = await insertUserDataQuery(name, email, password);
    return user.insertId;
  } catch (err) {
    console.error(err);
    return -1;
  }
}

/**
 * - get user data
 * - Async function
 * @param {string} id 
 * @return {object} user object
 */
const getUserData = async function (id) {
  if (!connectionCheck(connection)) return {};
  
  try {
    const user = await getUserByIDQuery(id);
    if (user.length === 0) return null;
    return userData;
  } catch (err) {
    console.error(err);
    return {};
  }
}

/**
 * - query use database
 * @param {string} database 
 * @return {promise}
 */
function useDatabaseQuery(database) {
  return new Promise((resolve, reject) => {
    connection.query(`use ${database}`, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log(result);
      resolve();
    });
  });
}

/**
 * - query email
 * @param {string} email 
 * @returns {promise}
 */
function getUserEmailQuery(email) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT email FROM user WHERE email = ?', [email], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      if (result.length > 0) {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}

/**
 * - user query by ID
 * @param {string} id 
 * @return {promise}
 */
function getUserByIDQuery(id) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log(result);
      resolve(result);
    });
  });
}

/**
 * - insert user data query
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns {promise}
 */
function insertUserDataQuery(name, email, password) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log(result);
      resolve(result);
    });
  });
}

module.exports = {
  useDatabase,
  checkUserEmail,
  registerUser,
  getUserData,
};