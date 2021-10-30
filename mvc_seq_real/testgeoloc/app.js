'use strict';
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var moment = require('moment-timezone');
moment.tz.setDefault('Europe/Brussels');
var express = require('express');
var _ = require('lodash');
var querystring = require("querystring");
var app = express();
var request = require('request');
var fs = require('fs');
var testGeolocDb = require('./dataBaseHelper');
let nodeGeocoder = require('node-geocoder');





/*
* Server definition
* */
const PORT = 1492;
const HOST = '0.0.0.0';
app.use(bodyParser.json());
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

/*
* Route definition
* */

app.get('/', function(req, res) {
    console.log("HELLO WORLD - test geoloc api")
    res.send("HELLO WORLD - test geoloc api")
});

app.post('/getCoordinates',function(req,res){
      console.log(req.body);
      //make sure it is an array!!!
      let options = {
        provider: 'openstreetmap'
      };

      let geoCoder = nodeGeocoder(options);

      const nr = req.body.nr.toString();
      const street = req.body.street.toString();
      const postcode = req.body.postcode.toString();
      const city = req.body.city.toString();
      const country = req.body.city.toString();
      const space = " ";
      const fullAddress = nr.concat(nr, space, street, space, postcode, space, city, space, country);

      geoCoder.geocode(fullAddress)
                .then((coords)=> {
                  console.log(coords);
                  res.send(JSON.stringify(coords));
                })
                .catch((err)=> {
                  console.log(err);
                });
      //res.json(req.body);
});

app.get('/findNear', function(req, res){
  testGeolocDb.MessageModel.find({
  location: {
   $near: {
    $maxDistance: req.query.dist,
    $geometry: {
     type: "Point",
     coordinates: [req.query.long, req.query.lat]
    }
   }
  }
 }).find((error, results) => {
  if (error) console.log(error);
  console.log(JSON.stringify(results, 0, 2));
  res.send(JSON.stringify(results, 0, 2));
 });
});
