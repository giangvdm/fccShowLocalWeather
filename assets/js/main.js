// Variables
var getWeatherButton = document.querySelector("button#get-weather");
var tempDisplay = document.querySelector("#js-weather__display--temperature");
var conditionDisplay = document.querySelector("#js-weather__display--condition");
var tempToggleButton = document.querySelector("button#temp-toggle");
var temperature;
var isCelcius = true;
////

// Functions

// Primary feature: Get local weather
function getWeather() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position, geoError, geoOptions) {
            var api = "https://fcc-weather-api.glitch.me/api/current?";
            $.getJSON(api + 'lat=' + position.coords.latitude + '&lon=' + position.coords.longitude, function (data) {

                // display user's current location
                var cityName = data.name;
                var countryName = data.sys.country;
                document.querySelector("#js-weather__display--location").innerHTML = cityName + ", " + countryName;

                // display temperature
                temperature = data.main.temp;
                tempDisplay.innerHTML = temperature + "&deg;C";

                // display current weather condition
                var condition = data.weather[0].main;
                var conditionIcon = data.weather[0].icon;
                conditionDisplay.innerHTML = condition + "&nbsp;" + "<img src=" + conditionIcon + ">";

                // update background image
                setBackground(condition);
            });
            // demo.innerHTML = "lat: " + pos.coords.latitude + ", " + "long: " + pos.coords.longitude;

            // update get-weather button
            getWeatherButton.innerHTML = "Update weather";
            // make temp-toggle button visible
            tempToggleButton.style.display = "initial";
        });
    }
}

// Extra function and object for fine tuning geo response
function geoError() {
    alert("Sorry, we could not retrieve your location.");
}

var geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
}


// Secondary feature: Toggle between Celcius and Fahrenheit
function tempToggle() {
    var cache;
    switch (isCelcius) {
        case true:
            cache = temperature * 1.8 + 32;
            temperature = Math.round(cache * 100) / 100;
            tempDisplay.innerHTML = temperature + "&deg;F";
            tempToggleButton.textContent = "Convert to Celcius";
            isCelcius = false;
            break;
        case false:
            cache = (temperature - 32) / 1.8;
            temperature = Math.round(cache * 100) / 100;
            tempDisplay.innerHTML = temperature + "&deg;C";
            tempToggleButton.textContent = "Convert to Fahrenheit";
            isCelcius = true;
            break;
    }
}

// Secondary feature: Set background image depending on the weather condition
function setBackground(condition) {
    var body = document.querySelector("body");
    body.style.backgroundImage = "url('" + "assets/images/" + condition + ".jpg"; "')";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
    // Change the title's font color
    document.querySelector("h1.title").style.color = "#EFEFEF";
}

////

// Scripting
getWeatherButton.addEventListener("click", getWeather);
tempToggleButton.addEventListener("click", tempToggle);
////