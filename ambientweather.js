//This is a draft file of code.  It is a work in progress and not ready for use at this time.  

module.register(“mmm-ambient-weather”, {
	defaults: {
	module: “mmm-ambient-weather”,
	position: ‘top_right’,
	location: “Columbus, OH”,
	apikey: ‘API KEY From AmbientWeather.net’,
	appid: ‘APP KEY From AmbientWeather.net’,
	units: config.units,
	roundTemp: true,
	degreeLabel: true,
	updateInterval: 600000,
	animation speed: 1000,
	timeFormat: 12,
	showPeriod: true,
	showWindDirectionAsArrow: true,
	showHumidity: true,
	showIndoorTemperature: true,
	showFeelsLike: true,
	apiBase: ‘https://api.ambientweather.net’,
	},
  	iconTable: {
		'clear-day':           'wi-day-sunny',
	  	'clear-night':         'wi-night-clear',
		'rain':                'wi-rain',
	 	'snow':                'wi-snow',
		'sleet':               'wi-rain-mix',
	 	'wind':                'wi-cloudy-gusts',
		'fog':                 'wi-fog',
	  	'cloudy':              'wi-cloudy',
 		'partly-cloudy-day':   'wi-day-cloudy',
	 	'partly-cloudy-night': 'wi-night-cloudy',
   		'hail':                'wi-hail',
	  	'thunderstorm':        'wi-thunderstorm',
	  	'tornado':             'wi-tornado'
  	},
	debug: false
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = 'Hello world!';
		return wrapper;
	},

	getHeader: function() {
		return this.data.header
	},

	notificationReceived: function(notification, payload, sender) {
		if (sender) {
			Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
		} else {
			Log.log(this.name + " received a system notification: " + notification);
	}
},

	getTranslations: function () {
	return false; 
},

getScripts: function () {
	return [
		'node-helper.js',
		'moment.js',
	];
},


	getStyles: function () {
    		return ["weather-icons.css", "MMM-forecast-io.css"];
  	},
