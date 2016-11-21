'use strict';

var Promise = require('promise')
	, flightsFilter = require('./flightsFinder.js')
	, weatherFilter = require('./weatherFilter.js')
	, tempFilter = require('./temperatureFilter.js')
	, destinationFilter = require('./destinationFilter.js');

exports.handleAsync = function(request) {
	var context = { 'request': request };
	return Promise.resolve(context)
		.then(findFlightsAsync)
		.then(findWeatherAsync)
		.then(getAvailableSlotsAsync)
		.then(getFlightsOptionsAsync);
};

function findFlightsAsync(context) {
	return flightsFilter.findFlights(context.request.departure, context.request.duration)
		.then(function(flights) { context['flights'] = flights; return context; });
}

function findWeatherAsync(context) {
	return Promise.resolve(weatherFilter.findWeather(Object.keys(context.flights)))
		.then(function(weather) { context['weather'] = weather; return context; });
}

function getAvailableSlotsAsync(context) {
	return Promise.resolve(tempFilter.filterWeatherDays(context.request.temperature, context.request.duration, context.weather))
		.then(function(slots) { context['slots'] = slots; return context; });
}

function getFlightsOptionsAsync(context) {
	return Promise.resolve(destinationFilter.filterFlightsByDay(context.flights, context.slots));
}
