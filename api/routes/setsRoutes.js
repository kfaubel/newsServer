'use strict';
const path = require('path');
const express = require('express');

module.exports = function(app) {
  var weatherController = require('../controllers/weatherController');
  var baseballController = require('../controllers/baseballController');

  // Simple how to page
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../public/index.html'));
  })

  // Weather Image route for lat/lon 
  app.route('/weather/forecast/lat/:lat/lon/:lon/title/:title/days/:days')
  .get(weatherController.getImageLatLon); 

  // Weather Image route for lat/lon 
  app.route('/weather/forecast/zip/:zip/key/:key/title/:title')
  .get(weatherController.getImageZip); 

  // Baseball Image route  
  app.route('/baseball/schedule/team/:team')
  .get(baseballController.getImage); 
};
    