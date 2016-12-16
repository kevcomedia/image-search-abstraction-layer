const express = require('express');
const app = express();
const api = require('./app/api')();

const port = process.env.PORT || 8080;

app.use('/api/v1', api);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('App is live!');
});
