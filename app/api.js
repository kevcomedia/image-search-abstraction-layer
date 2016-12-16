const express = require('express');

module.exports = function() {
  const api = express.Router();

  api.get('/imagesearch/:searchString', function(req, res) {
    res.send(req.params.searchString);
  });

  api.get('/recent', function(req, res) {
    res.send('Recent searches appear here.');
  });

  return api;
};
