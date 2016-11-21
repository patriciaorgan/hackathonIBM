'use strict';
var citiesMap = require('./citiesMap');

var cities = citiesMap.cities;

var jsonInput = {
"OriginLocation": "DUB",
"FareInfo": [
			{
      "CurrencyCode": "USD",
      "LowestNonStopFare": {
          "AirlineCodes": ["KL"],
          "Fare": 3138.26
      },
      "PricePerMile": 0.22,
      "LowestFare": {
          "AirlineCodes": ["FI"],
          "Fare": 810.66
      },
      "DestinationLocation": "AMD",
      "Distance": 3639,
      "DepartureDateTime": "2016-08-15T00:00:00",
      "ReturnDateTime": "2016-08-17T00:00:00",
      "Links": [{
          "rel": "shop",
          "href": "https://api.test.sabre.com/v1/shop/flights?origin=NYC&destination=AMS&departuredate=2016-08-15&returndate=2016-08-17&pointofsalecountry=US"
        }]
		},
		{
		"CurrencyCode": "USD",
		"LowestNonStopFare": {
				"AirlineCodes": ["DL"],
				"Fare": 838.26
		},
		"PricePerMile": 0.22,
		"LowestFare": {
				"AirlineCodes": ["FI"],
				"Fare": 710.66
		},
		"DestinationLocation": "NYC",
		"Distance": 3639,
		"DepartureDateTime": "2016-08-20T00:00:00",
		"ReturnDateTime": "2016-08-22T00:00:00",
		"Links": [{
				"rel": "shop",
				"href": "https://api.test.sabre.com/v1/shop/flights?origin=NYC&destination=AMS&departuredate=2016-08-15&returndate=2016-08-17&pointofsalecountry=US"
			}]
		}
		]
	};

	var cities_list=['Dublin','Barcelona','Madrid','New York','Amsterdam','Paris','London'];
	var response = {};
	var flights = [];
	//var fromCity;
	var  toCity;
	var  fromDate;
	var  toDate;
	var price;

  for(var i = 0; i < jsonInput.FareInfo.length ; i++){

    //var fromCityCode = jsonInput.OriginLocation;
    console.log(jsonInput.FareInfo[i].DestinationLocation);
		var toCityCode = jsonInput.FareInfo[i].DestinationLocation;
		fromDate = jsonInput.FareInfo[i].DepartureDateTime;
		toDate = jsonInput.FareInfo[i].ReturnDateTime;
    price = jsonInput.FareInfo[i].LowestNonStopFare.Fare;

   for(var j = 0; j < cities_list.length ; j++){
		 var air_code = cities[cities_list[j]].airportCodes;
			if(air_code == toCityCode)
			{
					toCity = cities_list[j];
			}
		}
		flights.push({
						"toCity":toCity,
						"fromDate":fromDate,
						"toDate":toDate,
						"price":price
		});
	}
	response[jsonInput.OriginLocation] = flights;

	console.log(response);
