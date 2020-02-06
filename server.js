// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();
// app.use(logger);

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  
  // check empty or ISO-8601
  let date = req.params.date_string ? new Date(req.params.date_string) : new Date();
  // if invalid from ISO-8601, check unix format
  if (date.toUTCString() === "Invalid Date") {
    date = new Date(parseInt(req.params.date_string));
  }
  if (date.toUTCString() === "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else {
    res.json({unix: date.valueOf(), utc: date.toUTCString()});
  }
  
});

// middleware - logger
function logger(req, res, next){
  let loggerMessage = `${req.method} ${req.path} - ${req.ip}`;
  console.log(loggerMessage);
  next();
}


// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});