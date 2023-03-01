const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())

app.listen(4000);

app.use('/healthcheck', require('./routes/healthcheck'));
app.use('/users', require('./routes/users'));