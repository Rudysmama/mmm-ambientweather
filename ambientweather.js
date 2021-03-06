//This is a draft file of code.  It is a work in progress and not ready for use at this time.  

module.register(“mmm-ambient-weather”, {
	//default module config.
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

	// Define required scripts.
	getScripts: function () {
	return [
		'node-helper.js',
		'moment.js',
	];
	},

	// Define required scripts.
	getStyles: function () {
    		return ["weather-icons.css", "MMM-forecast-io.css"];
  	},

	// Define start sequence, 
	start: function() {
			Log.info("Starting module: " this.name);
		
			// Set locale.
			moment.locale(config.language);
		
			this.windSpeed = null; 
		this.windSpeed = null;
		this.windDirection = null;
		this.sunriseSunsetTime = null;
		this.sunriseSunsetIcon = null;
		this.temperature = null;
		this.weatherType = null;

		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);

		this.updateTimer = null;

	},    
    
	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		if (this.config.apikey === "") {
			wrapper.innerHTML = "Please set the correct ambientweather.net <i>apikey</i> in the config for module: " + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (this.config.city === "") {
			wrapper.innerHTML = "Please set the ambientweather.net <i>city</i> in the config for module: " + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (!this.loaded) {
			wrapper.innerHTML = "Loading weather ...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		var small = document.createElement("div");
		small.className = "normal medium";

		var windIcon = document.createElement("span");
		windIcon.className = "wi wi-strong-wind dimmed";
		small.appendChild(windIcon);
		
		var windSpeed = document.createElement("span");
		windSpeed.innerHTML = " " + this.windSpeed;
		small.appendChild(windSpeed);
	
		if (this.config.showWindDirection) {
			var windDirection = document.createElement("span");
			windDirection.innerHTML = " " + this.windDirection;
			small.appendChild(windDirection);
		}
		var spacer = document.createElement("span");
		spacer.innerHTML = "&nbsp;";
		small.appendChild(spacer);

		var large = document.createElement("div");
		large.className = "large light";

		var weatherIcon = document.createElement("span");
		weatherIcon.className = "wi weathericon " + this.weatherType;
		large.appendChild(weatherIcon);

		var temperature = document.createElement("span");
		temperature.className = "bright";
		temperature.innerHTML = " " + this.temperature + "&deg;";
		large.appendChild(temperature);

		wrapper.appendChild(small);
		wrapper.appendChild(large);
		return wrapper;
	},
		/* getParams(compliments)
	 * Generates an url with api parameters based on the config.
	 *
	 * return String - URL params.
	 */
	getParams: function() {
		var params = "?";
                params += "apikey=" + this.config.apikey;
		params += "&city=" + this.config.city;
		params += "&lat=" + this.config.lat;
		params += "&lon=" + this.config.lon;
                params += "&asl=" + this.config.asl;
                params += "&tz=" + this.config.tz;

		return params;
	},

	/* processWeather(data)
	 * Uses the received data to set the various values.
	 *
	 * argument data object - Weather information received form openweather.org.
	 */
	processWeather: function(data) {
		this.temperature = this.roundValue(data.current.temperature);
		//this.windSpeed = this.ms2Beaufort(this.roundValue(datacurrentwind.wind_speed));
                this.windSpeed = this.roundValue(data.current.wind_speed);
		//this.windDirection = this.deg2Cardinal(data.wind.deg);
                this.weatherType = this.config.iconTable[data.forecast[0].pictocode_day];
	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setTimeout(function() {
			self.updateWeather();
		}, nextLoad);
	},
});                
