const mongoose = require('mongoose');

module.exports = function(dbUri) {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbUri);

  const schema = new mongoose.Schema({
    query: String,
    timestamp: Date
  });

  const Recent = mongoose.model('Recent', schema, 'recent');
  return {
    Recent: Recent
  };
};
