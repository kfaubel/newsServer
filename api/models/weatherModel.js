'use strict';
const WeatherAPI = require("weatherapi");


exports.getWeatherImage = async function(params, callback) {
    const weatherConfig = {
        lat: params.lat,
        lon: params.lon,
        // lat: "41.7476",
        // lon: "-70.6676",
        agent: "ken@faubel.org"
    }

    console.log("weatherMode::getWeatherImage: " + params);

    const weatherData = new WeatherAPI.WeatherData(weatherConfig);

    const result = await  weatherData.updateData();

    if (!result) {
        console.log("Failed to get data, no image available.\n")
        callback("getWeatherImage returned a failure", null);
    }

    const weatherImage = new WeatherAPI.WeatherImage(weatherData, params.title);

    const imageStream = weatherImage.getImageStream();

    callback(null, imageStream);
};

