'use strict';
const WeatherModel = require("../models/weatherModel");

// app.route('image/lat/:lat/lon/:lon/title/:title')
exports.getImage = function (req, res) {
  console.log("WeatherModel: " + req.params); 

  WeatherModel.getWeatherImage(req.params, function (err, imageStream) {

    if (err) {
      res.send(err);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'image/png' });

    imageStream.pipe(res);
  });
};