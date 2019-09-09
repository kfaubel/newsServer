const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const logger = require("./logger");

const path = require('path');

logger.setLevel("silly");
logger.info("Starting newsServer...");

const port = process.env.PORT || 80;

const app = express(); 
app.use(express.json({ limit: '10kb' })); // Body limit is 10 
app.use(cors());
app.use(xss());
app.listen(port);

//const basicAuth = require('express-basic-auth')
 
// app.use(basicAuth({
//    users: { 'ken': 'olivia' }
// }))

// Rate Limiting
// const limit = rateLimit({
//   max: 100,// max requests
//   windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout
//   message: 'Too many requests' // message to send
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('etag'); // Don't check cache, return a new item each time. Prevents http status 304 

app.use((req, res, next) => {
    // http://expressjs.com/en/4x/api.html
    logger.info("Request:  " + req.originalUrl);         
  
    res.on("finish", () => {
        logger.info("Response: " + res.statusCode);  
    });

    next();  
});

const routes = require('./api/routes/setsRoutes'); //importing route
routes(app); //register the route

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/config', express.static(path.join(__dirname, 'config')));

logger.info('NewsServer started on port: ' + port);
