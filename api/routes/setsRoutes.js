'use strict';
module.exports = function(app) {
  var weatherController = require('../controllers/weatherController');
  var setsController = require('../controllers/setsController');

  app.route('/sets')
    .get(setsController.getSetsList);

    // setsController Routes  
  app.route('/image/lat/:lat/lon/:lon/title/:title')
  .get(weatherController.getImage); 

  app.route('/image')
    .get(weatherController.getImage);
};