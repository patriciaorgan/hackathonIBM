var assert = require('assert');
var temperatureFilter = require('../libs/temperatureFilter');

describe('#filterWeatherDays', function() {
	
	it('should return no slots', function() {

		var weatherDataMock1 = {
			'Dublin' : [ {
				day : '2016-06-21T00:00:00.0Z',
				avgTemp : 19
			}, {
				day : '2016-06-22T00:00:00.0Z',
				avgTemp : 20
			}, {
				day : '2016-06-23T00:00:00.0Z',
				avgTemp : 21
			}, {
				day : '2016-06-24T00:00:00.0Z',
				avgTemp : 22
			} ]
		};

		var result = temperatureFilter.filterWeatherDays(30, 2, weatherDataMock1);
		
		assert.equal(Object.keys(result).length, 0);
		
	});
	
	it('should return only the slot composed by the 1st and the 2nd date', function() {

		var weatherDataMock1 = {
			'Dublin' : [ {
				day : '2016-06-21T00:00:00.0Z',
				avgTemp : 22
			}, {
				day : '2016-06-22T00:00:00.0Z',
				avgTemp : 20
			}, {
				day : '2016-06-23T00:00:00.0Z',
				avgTemp : 14
			}, {
				day : '2016-06-24T00:00:00.0Z',
				avgTemp : 13
			} ]
		};

		var result = temperatureFilter.filterWeatherDays(20, 2, weatherDataMock1);
		
		assert.equal(Object.keys(result).length, 1);
		assert.equal(result['Dublin'].length, 1);
		assert.equal(result['Dublin'][0].fromDate, weatherDataMock1['Dublin'][0].day);
		assert.equal(result['Dublin'][0].toDate, weatherDataMock1['Dublin'][1].day);
		
	});

});