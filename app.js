const express = require('express');

const app = express();

app.listen(3000);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/healthcheck', require('./routes/healthcheck'));
app.use('/users', require('./routes/users'));