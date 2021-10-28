let now = new Date();

let p = document.querySelector("p#date");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
p.innerHTML = `${day} ${date} ${month} ${year} </br><small>Last Updated: ${hours}:${minutes}</small>`;

function searchCity(city) {
  let apiKey = "e6d77207b4f23501665fd95fe5e4f761";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

function showCurrentWeather(response) {
  celsiusTemp = response.data.main.temp;

  document.querySelector("h2").innerHTML = `${response.data.name}`;
  document.querySelector("h1").innerHTML = Math.round(celsiusTemp);
  document.querySelector(
    "h3"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `<i class="fas fa-tint"></i> Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `<i class="fas fa-wind"></i> Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celsiusLink.classList.add("activeLink");
  fahrenheitLink.classList.remove("activeLink");
}

function showForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  weekdays.forEach(function (weekday) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="weather-forecast-date">${weekday}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="40"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">20°</span>
          <span class="weather-forecast-temperature-min">12°</span>
        </div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getCurrentPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "e6d77207b4f23501665fd95fe5e4f761";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCurrentWeather);
}

function searchCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function changeFahrenheit(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  h1.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("activeLink");
  fahrenheitLink.classList.add("activeLink");
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeFahrenheit);

let celsiusTemp = null;

function changeCelsius(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  h1.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("activeLink");
  fahrenheitLink.classList.remove("activeLink");
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeCelsius);

let button = document.querySelector("button");
button.addEventListener("click", searchCurrentPosition);

searchCity("Milan");
showForecast();
