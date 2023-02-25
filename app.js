const express = require('express');
const mysql = require('mysql2');
const validator = require('./validate');

const app = express();

app.listen(3000);

app.use('/healthcheck', require('./routes/healthcheck'));