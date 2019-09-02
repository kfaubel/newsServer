const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const logger = require("./logger");

logger.setLevel("silly");
logger.silly("Silly");
logger.info("Info");

const port = process.env.PORT || 80;

const app = express(); 
app.use(express.json({ limit: '10kb' })); // Body limit is 10 
app.use(cors());
app.use(xss());
app.listen(port);

const basicAuth = require('express-basic-auth')
 
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

const routes = require('./api/routes/setsRoutes'); //importing route
routes(app, logger); //register the route

logger.info('NewsServer started on: ' + port);
