const express = require('express');
const app = express();
const models = require('./models/models')(process.env.MONGODB_URI);
const api = require('./app/api')(models);

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use('/api/v1', api);

app.listen(port, function() {
  console.log('App is live!');
});
