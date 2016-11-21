'use strict';

exports.filterFlightsByDay = function(flightDests, weatherCities) {
    var results = [];

    Object.keys(flightDests).forEach(function(flight_city) {
      var flightsForCity = flightDests[flight_city];

      Object.keys(flightsForCity).forEach(function(flight_key) {
        var flight = flightsForCity[flight_key];

        var flightFromDate = new Date(flight.fromDate);
        var flightToDate = new Date(flight.toDate);

        Object.keys(weatherCities).forEach(function(weather_city) {

          if (flight_city == weather_city) {
            var weatherForCity = weatherCities[weather_city];

            Object.keys(weatherForCity).forEach(function(weather_key) {
              var weather_item = weatherForCity[weather_key];

              var weatherFromDate = new Date(weather_item.fromDate);
              var weatherToDate = new Date(weather_item.toDate);

              if (weatherFromDate >= flightFromDate && flightToDate <= flightToDate) {
                results.push({
                  'flightId':flight.flightId,
                  'destination':flight.toCity,
                  'depart_time':dateFormatter(flight.fromDate),
                  'return_time':dateFormatter(flight.toDate),
                  'price':flight.price,
                  'avg_temprature':weather_item.avgTemp
                });
              }

            });
          }
        });

      });

    });
    return results;
  };

function dateFormatter(date)
{
  var d=new Date(date);
  var month=d.toString().substring(4, 7);
  var date=d.toString().substring(8,11);
  var newDate=(month+" "+date);
   return newDate;
}
