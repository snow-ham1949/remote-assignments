const express = require('express');
const app = express();

app.listen(3000);

app.get('/healthcheck', (req, res) => { 
  res.status(200).send('OK');
});