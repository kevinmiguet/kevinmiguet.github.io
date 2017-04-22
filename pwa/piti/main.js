var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCly3OBmDB5hYLp74JIlmNaG4_GQbil9ww'
});

// Geocode an address.
googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  }
});