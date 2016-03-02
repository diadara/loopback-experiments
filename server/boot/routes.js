var request = require('request'),
    debug = require('debug')('location-info');

/*
The lattitude and longitude values can be obtained by

navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude, position.coords.longitude);
});

*/

var OWAPPID = "1d088972aa51b714270070c2706b28ee";
//FIXME move to external config file

module.exports = function(app) {
     app.get('/location-info', function(req, res) {
         debug(req.query);
         request.get({url: "http://api.openweathermap.org/data/2.5/weather",
                      qs: {
                          "lat": req.query.lat,
                          "lon" : req.query.lat,
                          "appid": OWAPPID
                      },
                      json: true
                     }, function(err, data){
                         if(!err)
                         res.json(data.body);
                         else
                             res.send("fail!");
                     });
     });
}
