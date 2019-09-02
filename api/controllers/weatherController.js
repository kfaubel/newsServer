'use strict';
const WeatherImage = require("weatherimage");
const logger = require("../../logger");

// app.route('image/lat/:lat/lon/:lon/title/:title/days/:days')
exports.getImageLatLon = async (req, res) => {
    let days = 5;
    if (req.params.days !== undefined) {
        const d = parseInt(req.params.days, 10);
        if (d >= 1 && d <= 6) {
            days = d;
        } else {
            logger.info("Invalid number of days specified (not 1-6): " + req.param.days + " Using: " + days);
        }
    }

    const weatherConfig = {
        lat: req.params.lat,            // lat: "41.7476",
        lon: req.params.lon,            // lon: "-70.6676",
        agent: "ken@faubel.org",
        title: req.params.title,         // "Forecast for Onset, MA"
        days: days
        
    }

    logger.silly("WeatherController:getImageLatLon " + JSON.stringify(weatherConfig, null, 4)); 

    const weatherImage = new WeatherImage(logger);
    //weatherImage.setLogger(logger);

    const result = await weatherImage.getImageStream(weatherConfig);
    const imageStream = result.stream;

    logger.info("Expires: " + result.expires);

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

    logger.info("WeatherController:getImageZip " + JSON.stringify(weatherConfig, null, 4)); 

    const weatherImage = new WeatherImage();

    const result = await weatherImage.getImageStream(weatherConfig);
    const imageStream = result.stream;

    if (imageStream === null) {
        res.send("Uanble to retreive image.  Something went wrong");
        return;
    }

    res.setHeader("Expires", result.expires);

    imageStream.pipe(res);
};