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
let now = new Date();
let weekdays = now.getDay();
let weekdayarray = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];
let hour = now.getHours();
let minute = now.getMinutes();
let weekday = weekdayarray[weekdays];
function zerominutes(minute) {
  return (minute < 10 ? "0" : "") + minute;
}
function zerohours(hour) {
  return (hour < 10 ? "0" : "") + hour;
}
function currentday(weekday, hour, minute) {
  return `${weekday} ${zerohours(hour)}:${zerominutes(minute)}`;
}
function displaycurrentday() {
  document.querySelector("#current-location").innerHTML =
    "Aveiro, Portugal | " + currentday(weekday, hour, minute);
}
displaycurrentday();

function search(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#location-input");
  let cityinput = searchinput.value;
  document.querySelector("#current-location").innerHTML = `
    ${cityinput} | ${currentday(weekday, hour, minute)}`;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityinput}&appid=5d25e265a18f244a8bfebb37b4d7164b&&units=metric`;
  axios.get(url).then(displaytemperature);
}

function displaytemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = temperature;
}

let searchform = document.querySelector("#location-form");
searchform.addEventListener("submit", search);

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
  let temperature = Math.round(response.data.main.temp);
  let currentloc = response.data.name;
  document.querySelector("#temperature").innerHTML = temperature;
  document.querySelector("#current-location").innerHTML = `
  ${currentloc} | ${currentday(weekday, hour, minute)}`;
}

let currentlocbutton = document.querySelector("#go-home");
currentlocbutton.addEventListener("click", getCurrentPosition);
