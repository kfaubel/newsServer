'use strict';
module.exports = function(app) {
  var weatherController = require('../controllers/weatherController');

  // Weather Image route  
  app.route('/weather/image/lat/:lat/lon/:lon/title/:title')
  .get(weatherController.getImage); 
};