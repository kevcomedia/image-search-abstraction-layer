const express = require('express');
const request = require('request');

module.exports = function(models) {
  const api = express.Router();

  api.get('/imagesearch/:searchString', function(req, res) {
    models.Recent.create({
      query: req.params.searchString,
      timestamp: new Date()
    })
    .then(function fulfilled() {
      const searchUrl = 'https://www.googleapis.com/customsearch/v1?'
        + `&q=${req.params.searchString}`
        + '&searchType=image'
        + `&cx=${process.env.SEARCH_ENGINE_ID}`
        + `&key=${process.env.API_KEY}`
        + (req.query.offset ? `&start=${req.query.offset}` : '');

      request(searchUrl, function(err, response, body) {
        // TODO write a better way to handle `err`
        if (err) return console.error('hi', err);

        var json = JSON.parse(body).items
          .map(o => ({
            imageUrl: o.link,
            altText: o.snippet,
            pageUrl: o.image.contextLink
          }));
        res.json(json);
      });
    });
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
