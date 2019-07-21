'use strict';
const path = require('path');

module.exports = function(app) {
  var weatherController = require('../controllers/weatherController');
  var baseballController = require('../controllers/baseballController');

  // Simple how to page
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../public/index.html'));
  })

  // Weather Image route  
  app.route('/weather/image/lat/:lat/lon/:lon/title/:title')
  .get(weatherController.getImage); 

  // Baseball Image route  
  app.route('/baseball/image/team/:team')
  .get(baseballController.getImage); 
};
    