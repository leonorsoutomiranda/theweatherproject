//let weather = {
//paris: {
//temp: 19.7,
//humidity: 80
//},
//tokyo: {
//temp: 17.3,
//humidity: 50
//},
//lisbon: {
//temp: 30.2,
//humidity: 20
//},
//"san francisco": {
//temp: 20.9,
//humidity: 100
//},
//moscow: {
//temp: -5,
//humidity: 20
//}
//};

// write your code here
//let city = prompt("Enter a city");
//city = city.toLowerCase();

//if (weather.hasOwnProperty(city)) {
//let weathercelsius = Math.round(weather[city].temp);
//let weatherkelvin = Math.round(weather[city].temp * 273.15);
//alert(
//`It is currently ${weathercelsius} °C (${weatherkelvin}°F) in ${city} with a humidity of ${
//   weather[city].humidity
//}%`
//);
//} else {
//alert(
//  "Sorry, we know the weather for this city, try going to https://www.google.com/search?q=weather+sydney"
//);
//}
//W4 homework

//Last updated
let now = new Date();
let weekdays = now.getDay();
let weekdayarray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let hour = now.getHours();
let minute = now.getMinutes();
let day = now.getDate();
let months = now.getMonth();
let montharray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = montharray[months];
let weekday = weekdayarray[weekdays];
function zerominutes(minute) {
  return (minute < 10 ? "0" : "") + minute;
}
function zerohours(hour) {
  return (hour < 10 ? "0" : "") + hour;
}
function currentday(weekday, hour, minute) {
  return `${weekday}, ${month}-${day}, ${zerohours(hour)}:${zerominutes(
    minute
  )}`;
}
function displaycurrentday() {
  document.querySelector("#current-location").innerHTML =
    "Aveiro, Portugal | Last updated: " + currentday(weekday, hour, minute);
}
displaycurrentday();

//Format hours
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}: ${minutes}`;
}

//Search Location
function search(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#location-input");
  let cityinput = searchinput.value;
  document.querySelector("#current-location").innerHTML = `
    ${cityinput} | ${currentday(weekday, hour, minute)}`;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityinput}&appid=5d25e265a18f244a8bfebb37b4d7164b&&units=metric`;
  axios.get(url).then(displaytemperature);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityinput}&appid=5d25e265a18f244a8bfebb37b4d7164b&&units=metric`;
  axios.get(url).then(displayforecast);
}
//Display temperature
function displaytemperature(response) {
  celsiusT = response.data.main.temp;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let temperature = Math.round(celsiusT);
  let myIcon = document.querySelector("#icon-today");
  if (
    response.data.weather[0].icon == "02d" ||
    response.data.weather[0].icon == "02n" ||
    response.data.weather[0].icon == "04d" ||
    response.data.weather[0].icon == "04n" ||
    response.data.weather[0].icon == "03d" ||
    response.data.weather[0].icon == "03n"
  ) {
    myIcon.className = "fas fa-cloud-sun";
  } else if (
    response.data.weather[0].icon == "09d" ||
    response.data.weather[0].icon == "09n" ||
    response.data.weather[0].icon == "10d" ||
    response.data.weather[0].icon == "10n"
  ) {
    myIcon.className = "fas fa-cloud-showers-heavy";
  } else if (
    response.data.weather[0].icon == "13d" ||
    response.data.weather[0].icon == "13n"
  ) {
    myIcon.className = "fas fa-snowflake";
  } else if (
    response.data.weather[0].icon == "11d" ||
    response.data.weather[0].icon == "11n"
  ) {
    myIcon.className = "fas fa-bolt";
  } else {
    myIcon.className = "fas fa-sun";
  }

  document.querySelector("#temperature").innerHTML = temperature + " º C";
  document.querySelector("#wind").innerHTML = wind;
  document.querySelector("#humidity").innerHTML = humidity;
}

//Display forecast
function displayforecast(response) {
  document.querySelector("#next-hours").innerHTML = "Next hours forecast:";
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  let forecastIcon = null;
  let forecastIconRef = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastIconRef = response.data.list[index].weather[0].icon;
    if (
      forecastIconRef == "02d" ||
      forecastIconRef == "02n" ||
      forecastIconRef == "04d" ||
      forecastIconRef == "04n" ||
      forecastIconRef == "03d" ||
      forecastIconRef == "03n"
    ) {
      forecastIcon = "fas fa-cloud-sun";
    } else if (
      forecastIconRef == "09d" ||
      forecastIconRef == "09n" ||
      forecastIconRef == "10d" ||
      forecastIconRef == "10n"
    ) {
      forecastIcon = "fas fa-cloud-showers-heavy";
    } else if (forecastIconRef == "13d" || forecastIconRef == "13n") {
      forecastIcon = "fas fa-snowflake";
    } else if (forecastIconRef == "11d" || forecastIconRef == "11n") {
      forecastIcon = "fas fa-bolt";
    } else {
      forecastIcon = "fas fa-sun";
    }
    celsiusMax = Math.round(forecast.main.temp_max);
    celsiusMin = Math.round(forecast.main.temp_min);
    forecastElement.innerHTML += `<div class="col-sm"
                  >
                </div>
                <div class="col-sm"
                  ><div class="nextdays">
                      ${formatHours(forecast.dt * 1000)}
                  </div>
                  <i class="${forecastIcon}"></i>
                  <div class="maxmin">Max: ${celsiusMax} º<br /> Min: ${celsiusMin} º</div>
                </div>`;
  }
}

//Search box
let searchform = document.querySelector("#location-form");
searchform.addEventListener("submit", search);
searchform.addEventListener("click", search);

//Display current temperature & current loc forecast
function showcurrentweather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5d25e265a18f244a8bfebb37b4d7164b&&units=metric`;
  axios.get(url).then(displaycurrentloctemperature);

  url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5d25e265a18f244a8bfebb37b4d7164b&&units=metric`;
  axios.get(url).then(displaycurrentlocforecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showcurrentweather);
}

function displaycurrentloctemperature(response) {
  celsiusT = response.data.main.temp;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let temperature = Math.round(celsiusT);
  let currentloc = response.data.name;
  document.querySelector("#temperature").innerHTML = temperature + " º C";
  document.querySelector("#wind").innerHTML = wind;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#current-location").innerHTML = `
  ${currentloc} | ${currentday(weekday, hour, minute)}`;
  let myIcon = document.querySelector("#icon-today");
  if (
    response.data.weather[0].icon == "02d" ||
    response.data.weather[0].icon == "02n" ||
    response.data.weather[0].icon == "04d" ||
    response.data.weather[0].icon == "04n" ||
    response.data.weather[0].icon == "03d" ||
    response.data.weather[0].icon == "03n"
  ) {
    myIcon.className = "fas fa-cloud-sun";
  } else if (
    response.data.weather[0].icon == "09d" ||
    response.data.weather[0].icon == "09n" ||
    response.data.weather[0].icon == "10d" ||
    response.data.weather[0].icon == "10n"
  ) {
    myIcon.className = "fas fa-cloud-showers-heavy";
  } else if (
    response.data.weather[0].icon == "13d" ||
    response.data.weather[0].icon == "13n"
  ) {
    myIcon.className = "fas fa-snowflake";
  } else if (
    response.data.weather[0].icon == "11d" ||
    response.data.weather[0].icon == "11n"
  ) {
    myIcon.className = "fas fa-bolt";
  } else {
    myIcon.className = "fas fa-sun";
  }
}

function displaycurrentlocforecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  let forecastIcon = null;
  let forecastIconRef = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastIconRef = response.data.list[index].weather[0].icon;
    if (
      forecastIconRef == "02d" ||
      forecastIconRef == "02n" ||
      forecastIconRef == "04d" ||
      forecastIconRef == "04n" ||
      forecastIconRef == "03d" ||
      forecastIconRef == "03n"
    ) {
      forecastIcon = "fas fa-cloud-sun";
    } else if (
      forecastIconRef == "09d" ||
      forecastIconRef == "09n" ||
      forecastIconRef == "10d" ||
      forecastIconRef == "10n"
    ) {
      forecastIcon = "fas fa-cloud-showers-heavy";
    } else if (forecastIconRef == "13d" || forecastIconRef == "13n") {
      forecastIcon = "fas fa-snowflake";
    } else if (forecastIconRef == "11d" || forecastIconRef == "11n") {
      forecastIcon = "fas fa-bolt";
    } else {
      forecastIcon = "fas fa-sun";
    }
    celsiusMax = Math.round(forecast.main.temp_max);
    celsiusMin = Math.round(forecast.main.temp_min);
    forecastElement.innerHTML += `<div class="col-sm"
                  >
                </div>
                <div class="col-sm"
                  ><div class="nextdays">
                      ${formatHours(forecast.dt * 1000)}
                  </div>
                  <i class="${forecastIcon}"></i>
                  <div class="maxmin">Max: ${celsiusMax} º<br /> Min: ${celsiusMin} º</div>
                </div>`;
  }
}

function changeText() {
  document.querySelector("#next-hours").innerHTML = "Next hours forecast:";
}

let currentlocbutton = document.querySelector("#go-home");
currentlocbutton.addEventListener("click", getCurrentPosition);
currentlocbutton.addEventListener("click", changeText);

//Fahrenheit
function displayFahr(event) {
  event.preventDefault();
  let fahr = (celsiusT * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahr) + "ºF";
}

//Celsius
function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusT) + "ºC";
}

let celsiusT = null;
let celsiusMax = null;
let celsiusMin = null;

let fahrLink = document.querySelector("#f-link");
fahrLink.addEventListener("click", displayFahr);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);
