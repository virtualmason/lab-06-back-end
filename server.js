
const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;
app.use(cors());


function Format (search_query,formattedAddress,latitude,longitude) {
  this.search_query = search_query;
  this.formattedAddress = formattedAddress;
  this.latitude = latitude;
  this.longitude = longitude;

}

//not sure about error handling
app.use(function(err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

app.get('/location', (req, res) => {
  let data = require('./data/geo.json');
  let search_query = data.results[0].address_components[0].long_name;
  let formattedAddress = data.results[0].formatted_address;
  let latitude = data.results[0].geometry.bounds.northeast.lat;
  let longitude = data.results[0].geometry.bounds.northeast.lng;
  res.send(new Format(search_query,formattedAddress,latitude,longitude));
});
let info = require('./data/darksky.json');


function Weather (forecast,time ) {
  this.forecast = forecast;
  this.time = time ;
}
app.get('/weather', (req, res) => {

  let data = require('./data/darksky.json');
  let forecast = info.daily.data[0].summary;
  //let time = info.daily.data[0].time;

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var days =['Mon', 'Tues', 'Wed','Thurs', 'Fri', 'Sat','Sun'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var day = days[a.getDay()];
    var time = day + ' ' + month + ' '+ date +' ' + year ;
    console.log(new Weather(forecast, time));
    res.send(new Weather(forecast, time));
    //return time;
  }
  timeConverter(0);
  
});



//http://localhost:3000/location?data=%22what%22

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
