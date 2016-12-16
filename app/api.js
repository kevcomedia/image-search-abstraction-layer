const express = require('express');
const request = require('request');

module.exports = function() {
  const api = express.Router();

  api.get('/imagesearch/:searchString', function(req, res) {
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

  api.get('/recent', function(req, res) {
    res.send('Recent searches appear here.');
  });

  return api;
};
