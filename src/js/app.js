(function() {
	'use strict';

	var send = function send(e) {
		console.log('helo');
		console.log(e.target);
		e.preventDefault();
		// Sending and receiving data in JSON format using POST mothod

		var xhr = new XMLHttpRequest();
		//var url = "http://localhost:3000/submit";
		var url = "http://team6.mybluemix.net/submit";
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var json = JSON.parse(xhr.responseText);
				displayResults(json);
			}
		}
		var des = document.getElementById("departure-cities");
		var strDest = des.options[des.selectedIndex].text;
		var dur = document.getElementById("duration").value;
		var temp = document.getElementById("temperature").value;

		var data = JSON.stringify({
			"departure" : strDest,
			"duration" : dur,
			"temperature" : temp
		});
		xhr.send(data);
	};

	function displayResults(jsonResults) {
		var results = document.querySelector('.results');
		results.innerHTML = "";

		var i = 0;
		jsonResults.forEach(function(result) {
      i++;
			// var card = document.createElement('div');
			// var header = document.createElement('header');
			// var city = document.createElement('h3');
			// var table = document.createElement('table');
			// var tr = document.createElement('tr');
			// var tdFrom = document.createElement('td');
			// var tdTo = document.createElement('td');
			// var tdPrice = document.createElement('td');
			// var tdTemp = document.createElement('td');

			var card = '<div class="w3-card-4 col_4" style="width:300px;margin-top:20px;background-color: #D6EAF8;opacity:0.90">'
			+ '<header class="w3-container w3-light-grey">'
			+ '<h3>' + result.destination + '</h3>'
			+ '</header>'
			+ '<div class="w3-container" style="padding-top:20px;">'
			+ '<table>'
			+ '<tr><td>Flight N.</td><td><a class="link" href="#">CX'+i+'77</a></td></tr>'
			+ '<tr><td>Departure</td><td>' + result.depart_time + '</td></tr>'
			+ '<tr><td>Return</td><td>' + result.return_time + '</td></tr>'
			+ '<tr><td>Price £</td><td>' + result.price + '</td></tr>'
			+ '<tr><td>Temperature C</td><td>' + result.avg_temprature
			+ '</td></tr>' + '</table>' + '</div>' + '</div>';

			var d = document.createElement('div');
			d.innerHTML = card;
			results.appendChild(d.firstChild);
		});
	};

	window.addEventListener('DOMContentLoaded', function() {
		var submit = document.querySelector('#submitButton');
		submit.addEventListener('click', send);
	});

}());

function tempChange() {
	var boxData = document.getElementById("box-data");
	var temp = document.getElementById("temperature").value;
	document.getElementById("currentTemperature").value = temp;
	if (temp == 0) {
		boxData.style.backgroundColor = "#D6EAF8";
		document.body.style.backgroundImage = "url('../images/winter.jpg')";
	} else if (temp > 0 && temp <= 5) {
		boxData.style.backgroundColor = "#D6EAF8";
		document.body.style.backgroundImage = "url('../images/winter.jpg')";
	} else if (temp > 5 && temp <= 10) {
		document.body.style.backgroundColor = "#D6EAF8";
		document.body.style.backgroundImage = "url('../images/winter.jpg')";
	} else if (temp > 10 && temp <= 20) {
		boxData.style.backgroundColor = "#FFFEC3";
		document.body.style.backgroundImage = "url('../images/spring.jpg')";
	} else {
		boxData.style.backgroundColor = "#D6EAF8";
		document.body.style.backgroundImage = "url('../images/summer.jpg')";
	}
}

function durationChange() {
	document.getElementById("currentDuration").value = document.getElementById("duration").value;
}
