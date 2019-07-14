'use strict';
const { Storage } = require('@google-cloud/storage'); 
const projectId = 'setstorage'; 

// Creates a client
const storage = new Storage({
  projectId: projectId,
  keyFilename: "ServiceAccount.json"
});

const bucketName = 'my-sets';
const bucket = storage.bucket(bucketName);

exports.getSets = function(callback) {
    // return JSON with list of sets
    bucket.getFiles(function(err, files) {
        if (err) {
            callback(err, []);
            return;
        }

        let setList = new Set();

        // files is an array of File objects.
        for (const file of files) {
            let name = (file.name).split("/")[0];
            setList.add(name);
        }
        
        callback(null, Array.from(setList)); // Sets are not objects.
    });
};

exports.getImageList = function(setName, callback) {
    // return JSON with list of sets
    const options = {
        prefix: setName,
    };

    bucket.getFiles(options, function(err, files) {
        if (err) {
            callback(err, []);
            return;
        }

        let setList = new Set();
        
        // files is an array of File objects.
        for (const file of files) {
            let splitArray = file.name.split("/");
            if (splitArray[0] == setName) {
                setList.add(splitArray[1]);
            } else {
                console.log("Somehow the options filter failed");
            }
        }
        
        callback(err, Array.from(setList)); // Sets are not objects.
    });
};

exports.getImage = function(setName, imageName, callback) {
    //console.log("setName: " + setName + " imageName: " + imageName);
    const file = bucket.file(setName + "/" + imageName);
    let readStream = file.createReadStream()
    .on('error', (err) => {callback(err, [])});

    callback(null, readStream);
};