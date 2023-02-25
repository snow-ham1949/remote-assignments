const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
  host: 'database-instance.c1a2hycmc2k6.ap-northeast-1.rds.amazonaws.com',
  database: 'assignment',
  user: 'admin',
  password: 'snowham1949'
});

app.listen(3000);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/healthcheck', require('./routes/healthcheck'));
app.use('/users', require('./routes/users'));