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

//Search Location
function search(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#location-input");
  let cityinput = searchinput.value;
  document.querySelector("#current-location").innerHTML = `
    ${cityinput} | ${currentday(weekday, hour, minute)}`;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityinput}&appid=5d25e265a18f244a8bfebb37b4d7164b&&units=metric`;
  axios.get(url).then(displaytemperature);
}
//Display temperature
function displaytemperature(response) {
  celsiusT = response.data.main.temp;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let temperature = Math.round(celsiusT);
  document.querySelector("#temperature").innerHTML = temperature + " º C";
  document.querySelector("#wind").innerHTML = wind;
  document.querySelector("#humidity").innerHTML = humidity;
}
//Search box
let searchform = document.querySelector("#location-form");
searchform.addEventListener("submit", search);
searchform.addEventListener("click", search);

//Display current temperature
function showcurrentweather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5d25e265a18f244a8bfebb37b4d7164b&&units=metric`;
  axios.get(url).then(displaycurrentloctemperature);
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
}

let currentlocbutton = document.querySelector("#go-home");
currentlocbutton.addEventListener("click", getCurrentPosition);

//Fahrenheit
function displayFahr(event) {
  event.preventDefault();
  let fahr = (celsiusT * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahr) + "º F";
}

//Celsius
function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusT) + "º C";
}

let celsiusT = null;

let fahrLink = document.querySelector("#f-link");
fahrLink.addEventListener("click", displayFahr);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);
