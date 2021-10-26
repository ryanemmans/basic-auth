'use strict';

module.exports = (error, request, response, next) => {
  response.status(500).send('Server Error');
  response.end();

  (request, response, next) => {
    const query = request.query.name;
    if (query) {
      next();
    } else {
      next(500);
    }
  };
};
