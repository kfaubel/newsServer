var express = require('express'),
  app = express(),
  cors = require('cors'),
  port = process.env.PORT || 80;
  bodyParser = require('body-parser');
  
app.use(cors());
app.listen(port);

const basicAuth = require('express-basic-auth')
 
// app.use(basicAuth({
//    users: { 'ken': 'olivia' }
// }))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/setsRoutes'); //importing route
routes(app); //register the route

console.log('NewsServer started on: ' + port);
