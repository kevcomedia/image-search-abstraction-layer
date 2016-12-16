const express = require('express');

module.exports = function(models) {
  const api = express.Router();

  api.get('/imagesearch/:searchString', function(req, res) {
    res.send(req.params.searchString);
  });

  api.get('/recent', function(req, res) {
    const projection = {
      query: 1,
      timestamp: 1,
      _id: 0
    };
    models.Recent.find({}, projection).sort({timestamp: -1}).limit(10).exec(function(err, docs) {
      // TODO write a better way to deal with `err`
      if (err) throw err;
      res.json(docs);
    });
  });

  return api;
};
