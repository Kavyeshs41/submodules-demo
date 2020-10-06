const express = require('express')
const cors = require('cors');
const app = express()
var http = require('http');
var server = http.createServer(app);
const port = 3000

app.use(cors())

app.all('/*', function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token, Authorization');  
  if (req.method == 'OPTIONS') {
      res
      .status(200)
      .end();
  } else {
      next();
  }
});

app.use('/api/mod1/v1/', require('./module1/route'));
app.use('/api/mod2/v1/', require('./module2/route'));

app.set('port', port);
server.listen(app.get('port'), function () {
  console.log(" Application is running on " + port + " port....");
});