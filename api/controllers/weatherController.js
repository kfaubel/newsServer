'use strict';
const WeatherImage = require("weatherimage");

// app.route('image/lat/:lat/lon/:lon/title/:title')
exports.getImageLatLon = async (req, res) => {
    const weatherConfig = {
        lat: req.params.lat,            // lat: "41.7476",
        lon: req.params.lon,            // lon: "-70.6676",
        agent: "ken@faubel.org",
        title: req.params.title         // "Forecast for Onset, MA"
    }

    console.log("WeatherController:getImageLatLon " + JSON.stringify(weatherConfig, null, 4)); 

    const weatherImage = new WeatherImage();

    const imageStream = await weatherImage.getImageStream(weatherConfig);

    if (imageStream === null) {
        res.send("Uanble to retreive image.  Something went wrong");
        return;
    }

    imageStream.pipe(res);
};
exports.getImageZip = async (req, res) => {
    const weatherConfig = {
        zip: req.params.zip,            // 02558
        mapQuestKey: req.params.key,            // 3x7Feg...
        agent: "ken@faubel.org",
        title: req.params.title         // "Forecast for Onset, MA"
    }

    console.log("WeatherController:getImageZip " + JSON.stringify(weatherConfig, null, 4)); 

    const weatherImage = new WeatherImage();

    const imageStream = await weatherImage.getImageStream(weatherConfig);

    if (imageStream === null) {
        res.send("Uanble to retreive image.  Something went wrong");
        return;
    }

    imageStream.pipe(res);
};