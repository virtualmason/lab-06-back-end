
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

app.get('/location', (req, res) => {
  let data = require('./data/geo.json');
  let search_query = data.results[0].address_components[0].long_name;
  let formattedAddress = data.results[0].formatted_address;
  let latitude = data.results[0].geometry.bounds.northeast.lat;
  let longitude = data.results[0].geometry.bounds.northeast.lng;
  res.send(new Format(search_query,formattedAddress,latitude,longitude));
});
let info = require('./data/darksky.json');
// info.forEach(item => {
//   console.log(item.daily);

// });

function Weather (forecast,time ) {
  this.forecast = forecast;
  this.time = time ;
}
app.get('/weather', (req, res) => {
 
  let data = require('./data/darksky.json');
  let forecast = info.daily.data[0].summary;
  let time = info.daily.data[0].time;
  console.log(new Weather(forecast, time));
  res.send(new Weather(forecast, time));
//1540018800
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var days =['Mon', 'Tues',  'Wed','Thurs', 'Fri', 'Sat','Sun']
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var day = days[a.getDay()];
  var time = day +  ' ' + month + ' '+ date +' ' + year ;
  return time;
}
//"Mon Jan 01 2001"
console.log(timeConverter(0));

//   [
//     {
//       "forecast": "Partly cloudy until afternoon.",
//       "time": "Mon Jan 01 2001"
//     },
//     {
//       "forecast": "Mostly cloudy in the morning.",
//       "time": "Tue Jan 02 2001"
//     },
//     ...
//   ]
});



//http://localhost:3000/location?data=%22what%22

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// {
//   "search_query": "seattle",
//   "formatted_query": "Seattle, WA, USA",
//   "latitude": "47.606210",
//   "longitude": "-122.332071"
// }
// Create a route with a method of get and a path of /location. The route callback should invoke a function to convert the search query to a latitude and longitude. The function should use the provided JSON data.
// A constructor function will ensure that each object is created according to the same format when the server receives data. Ensure your code base uses a constructor function for this resource.
// Return an object which contains the necessary information for correct client rendering. See the sample response.
// Confirm that your route is responding as expected by entering your deployed backend URL in the input of the deployed static client, then searching for a location.
// Redeploy your application.
