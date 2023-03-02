const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())

app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './frontend/build', 'index.html'));
});

app.listen(4000);

app.use('/healthcheck', require('./routes/healthcheck'));
app.use('/users', require('./routes/users'));