
const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;
app.use(cors());
const data = require('./data/geo.json');

function Format (search_query,formattedAddress,latitude,longitude) {
  this.search_query = search_query;
  this.formattedAddress = formattedAddress;
  this.latitude = latitude;
  this.longitude = longitude;

}
  
app.get('/location', (req, res) => {
  let data = require('./data/geo.json');
  var search_query = data.results[0].address_components[0].long_name;
  var formattedAddress = data.results[0].formatted_address;
  var latitude = data.results[0].geometry.bounds.northeast.lat;
  var longitude = data.results[0].geometry.bounds.northeast.lng;
  console.log(new Format(search_query,formattedAddress,latitude,longitude));
  res.send(new Format(search_query,formattedAddress,latitude,longitude));
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
