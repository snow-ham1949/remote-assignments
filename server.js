const express = require('express');

const app = express();

app.listen(5000);

app.use('/healthcheck', require('./routes/healthcheck'));
app.use('/users', require('./routes/users'));