'use strict';

var sync = require('sync-request');
var citiesMap = require('./citiesMap');

var apiKey = '4khaleWZO6OzP4GFf3mAWwh3ZtZOpVvv';
var cities = citiesMap.cities;

exports.findWeather = function(cities) {

  var response = {};
  cities.forEach(function(city) {
    response[city] = getWeather(city);
    console.log(response[city]);
  });
  console.log(response);
  return response;
}

function getWeather(city) {
  var id = cities[city].weatherId;
  var response = sync('GET', urlBuilder(id));
  var body = response.getBody('utf8');

  var jsonResponse = JSON.parse(body); //returns a large JSON response with results of locations

  var days = [];
  for(var j=0; j < jsonResponse.DailyForecasts.length; j++) {

    var minTemperature = convertToCelcius(jsonResponse.DailyForecasts[j].Temperature.Minimum.Value);//min temp
    var maxTemperature = convertToCelcius(jsonResponse.DailyForecasts[j].Temperature.Maximum.Value);// max temp
    var averageTemperature = (minTemperature + maxTemperature) / 2;

    days.push({
      'day': jsonResponse.DailyForecasts[j].Date,
      'avgTemp': averageTemperature
    });
  }
  return days;
}

var urlBuilder = (function() {

  var URL = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";

  return function(id) {
    return URL + id + '.json' + '?apikey=' + apiKey;
  }

})();

/* Converts fahrenheit value to celsius
*@param far: Value in fahrenheit
*@return value in celsius
*/
function convertToCelcius(far) {
  return Math.ceil((far-32) * 5 / 9);
}
