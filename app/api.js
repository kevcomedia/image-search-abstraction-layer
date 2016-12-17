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
      var searchUrl = require('../utils/search-url')(req.params.searchString, req.query.offset);

      request(searchUrl, function(err, response, body) {
        if (err) {
          console.error(new Date(), 'An error occured while sending a request to Google.');
          console.error(err);
          return res.status(500).send('An error occured while processing your request.');
        }

        const bodyJSON = JSON.parse(body);
        if (!bodyJSON.items) {
          console.error(new Date(), 'There are no items to show');
          console.error('body:', body);
          console.error('search string:', req.params.searchString);
          console.error('offset:', req.query.offset);
          return res.status(bodyJSON.error.code).json({error: bodyJSON.error.message});
        }

        const json = bodyJSON.items.map(o => ({
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
      if (err) {
        const message = 'An error occured while looking up recent searches.';
        console.error(new Date(), message);
        console.error(err);
        return res.status(500).send(message);
      }

      res.json(docs);
    });
  });

  return api;
};
