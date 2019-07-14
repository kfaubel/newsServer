'use strict';
const Sets = require("../models/setsModel");

// app.route('/sets')
exports.getSetsList = function(req, res) {
  console.log("Request: GET sets");

  res.json({gotHere: true});
};

//app.route('/imageList/:setName')
exports.getImageList = function(req, res) {
  console.log("Request: GET imageList/" + req.params.setName);
  Sets.getImageList(req.params.setName, function(err, imageList) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(imageList);
  });
};

// app.route('image/set/:setName/imagename/:imageName')
exports.getImage = function(req, res) {
  console.log("Request: GET image/set/" + req.params.setName + "/imagename/" + req.params.imageName);
  Sets.getImage(req.params.setName, req.params.imageName, function(err, imageStream) {
    
    if (err) {
      res.send(err);
      return;
    }

    res.writeHead(200, {'Content-Type': 'image/jpeg'});

    imageStream.pipe(res);
  });
};
