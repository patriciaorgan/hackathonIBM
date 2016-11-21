'use strict';

var TEMPMIN = 5;
var TEMPMAX = 35;
var INTERVAL = 5;

exports.filterWeatherDays = function(temp, duration, weatherResults) {
var citySlots = {};
//remove cities object that dont satisfy temprature on any cobined duration of displayResults
Object.keys(weatherResults).forEach(function(city){
  var boolDay = [];

  weatherResults[city].forEach(function(day){
     if(temp < TEMPMIN){
       if(day.avgTemp < temp){
         boolDay.push(true);
       }else{
         boolDay.push(false);
       }
     }else if(temp > TEMPMAX){
       if(day.avgTemp > temp){
         boolDay.push(true);
       }else{
         boolDay.push(false);
       }
     }else if(day.avgTemp <= (temp + INTERVAL) && day.avgTemp >= (temp - INTERVAL) ){
         boolDay.push(true);
     }else{
         boolDay.push(false);
     }
    });
   var slots = [];
   for (var i = 0; i + duration - 1  < boolDay.length; i++){
     var success = true;
     var totalTemp = 0;
     for(var j = i; j < i + duration; j++){
       if(!boolDay[j]){
         success = false;
         break;
       }
       totalTemp += weatherResults[city][j].avgTemp;
     }
     if(success){
       var days = weatherResults[city];
       slots.push({
         'fromDate':days[i].day,
         'toDate':days[i + (duration-1)].day,
         'avgTemp':totalTemp/duration
       });

     }
   }
   if(slots.length > 0){
     citySlots[city] = slots;
   }
  });
  return citySlots;
};
