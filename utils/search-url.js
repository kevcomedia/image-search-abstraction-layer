module.exports = function(searchString, offset) {
  var searchUrl = 'https://www.googleapis.com/customsearch/v1?' +
    `q=${searchString}` +
    '&searchType=image' +
    `&cx=${process.env.SEARCH_ENGINE_ID}` +
    `&key=${process.env.API_KEY}`;

  if (offset && /^\d+$/.test(offset)) {
    searchUrl += `&start=${offset}`;
  }

  return searchUrl;
};
