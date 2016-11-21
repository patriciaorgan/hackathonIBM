'use strict';

var Promise = require('promise');
var moment = require('moment');
var citiesMap = require('./citiesMap');

exports.findFlights = function(departure, duration) {
	return new Promise(function(resolve, reject) {
		try {
			// var flights;
			//
			// // array to be called from html homepage using following format
			// // jasonarray.Cities[i].countryName
			// var jasonarray = {
			// 	"Cities" : [ {
			// 		"code" : "AUH",
			// 		"name" : "Abu Dhabi",
			// 		"countryCode" : "AE",
			// 		"countryName" : "United Arab Emirates",
			// 		"regionName" : "Middle East"
			// 	}, {
			// 		"code" : "ALY",
			// 		"name" : "Alexandria",
			// 		"countryCode" : "EG",
			// 		"countryName" : "Egypt",
			// 		"regionName" : "Middle East"
			// 	}, {
			// 		"code" : "LTS",
			// 		"name" : "Altus",
			// 		"countryCode" : "US",
			// 		"countryName" : "United States",
			// 		"regionName" : "North America"
			// 	}, {
			// 		"code" : "ANK",
			// 		"name" : "Ankara",
			// 		"countryCode" : "TR",
			// 		"countryName" : "Turkey",
			// 		"regionName" : "Europe"
			// 	}, {
			// 		"code" : "AIY",
			// 		"name" : "Atlantic City",
			// 		"countryCode" : "US",
			// 		"countryName" : "United States",
			// 		"regionName" : "North America"
			// 	}, {
			// 		"code" : "BAK",
			// 		"name" : "Baku",
			// 		"countryCode" : "AZ",
			// 		"countryName" : "Azerbaijan",
			// 		"regionName" : "Europe"
			// 	}, {
			// 		"code" : "BKK",
			// 		"name" : "Bangkok",
			// 		"countryCode" : "TH",
			// 		"countryName" : "Thailand",
			// 		"regionName" : "Asia Pacific"
			// 	}, {
			// 		"code" : "EAP",
			// 		"name" : "Basel",
			// 		"countryCode" : "CH",
			// 		"countryName" : "Switzerland",
			// 		"regionName" : "Europe"
			// 	}, {
			// 		"code" : "BJS",
			// 		"name" : "Beijing",
			// 		"countryCode" : "CN",
			// 		"countryName" : "China",
			// 		"regionName" : "Asia Pacific"
			// 	}, {
			// 		"code" : "BFS",
			// 		"name" : "Belfast",
			// 		"countryCode" : "GB",
			// 		"countryName" : "United Kingdom",
			// 		"regionName" : "Europe"
			// 	} ]
			// };
			//
			// // array storing city names
			// var cityarray = jasonarray.Cities.map(function(city) {
			// 	return city.name;
			// });
			// // array storing airport codes
			// var airportcodesarray = jasonarray.Cities.map(function(airportcode) {
			// 	return airportcode.code;
			// });
			//
			// // to populate the city names and access from method
			// function getCityNames() {
			// 	var cityarray = jasonarray.Cities.map(function(city) {
			// 		return city.name;
			// 	});
			// 	return cityarray;
			// }
			//
			// var cityselection = "";
			// function getAirportCodeFromToMatchUserSelection(cityselection) {
			// 	var result;
			// 	var i;
			// 	for (i = 0; i < cityarray.length; i++)
			// 		if (cityselection === cityarray[i]) {
			// 			result = airportcodesarray[i];
			// 			break;
			// 		}
			// 	return result;
			// }
      console.log("1")
			var origin = citiesMap.cities[departure].airportCodes[0];
			var destination = '';
			var lengthofstay = duration;
			var maxfare = '';
			var departuredate = new Date();
			var returndate = new Date();
			returndate.setDate(returndate.getDate() + 5);

      var cities = {};
      Object.keys(citiesMap.cities).forEach(function(cityName){
				var cityDetails = citiesMap.cities[cityName];
				console.log(cityName)
				cityDetails.airportCodes.forEach(function(code){
					console.log("in loop")
					cities[code] = cityName;
				});
			});

			var SabreDevStudio = require('sabre-dev-studio');
			var sabre_dev_studio = new SabreDevStudio({
				client_id : 'V1:qlf4lqi4gnvmkb01:DEVCENTER:EXT',
				client_secret : 'D5Lk2jgG',
				uri : 'https://api.test.sabre.com'
				});
			var options = {};

			var callback = function(error, data) {
				if (error) {
					console.log(error);
				} else {

					var results = JSON.parse(data);

					var response = {};
					results.FareInfo.forEach(function(flight) {

						if(cities[flight.DestinationLocation]) {
							if (!response[cities[flight.DestinationLocation]]) {
									response[cities[flight.DestinationLocation]] = [];
							}
							response[cities[flight.DestinationLocation]].push({
								"toCity" : cities[flight.DestinationLocation] || '',
								"fromDate" : flight.DepartureDateTime,
								"toDate" : flight.ReturnDateTime,
								"price" : flight.LowestNonStopFare.Fare,
								"flightId" : Math.floor(Math.random()*100000+1)
							});
						}
         });
				}
				console.log(response);
				resolve(response);
			};

			// WORKING
			sabre_dev_studio.get('/v2/shop/flights/fares?origin=' + origin + '&earliestdeparturedate=' + moment(departuredate).format('YYYY-MM-DD') + '&latestdeparturedate=' + moment(returndate).format('YYYY-MM-DD') + '&lengthofstay=' + lengthofstay + '&pointofsalecountry=US', options, callback);
			// var mockFlightResults = {
			// 	'Dublin' : [ {
			// 		flightId : '234',
			// 		fromCity : 'New York',
			// 		toCity : 'Dublin',
			// 		fromDate : '2016-06-21T23:42:03.522Z',
			// 		toDate : '2016-06-21T23:42:03.522Z',
			// 		price : ''
			// 	}, {
			// 		flightId : '235',
			// 		fromCity : 'New York',
			// 		toCity : 'Dublin',
			// 		fromDate : '2016-06-21T23:42:03.522Z',
			// 		toDate : '2016-06-21T23:42:03.522Z',
			// 		price : ''
			// 	} ],
			// 	'London' : [ {
			// 		flightId : '237',
			// 		fromCity : 'New York',
			// 		toCity : 'London',
			// 		fromDate : '2016-06-21T23:42:03.522Z',
			// 		toDate : '2016-06-21T23:42:03.522Z',
			// 		price : ''
			// 	}, {
			// 		flightId : '274',
			// 		fromCity : 'New York',
			// 		toCity : 'London',
			// 		fromDate : '2016-06-21T23:42:03.522Z',
			// 		toDate : '2016-06-21T23:42:03.522Z',
			// 		price : ''
			// 	} ]
			// };

		} catch (e) {
			console.log(e);
		}
	});
}
