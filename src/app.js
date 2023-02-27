//Calculate Date and Time
let now = new Date();
let h3 = document.querySelector("h3");
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
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec.",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

h3.innerHTML = `${day}, ${month} ${date} ${hour}:${minutes}`;

//Displaying city name when searched
function search(event) {
  event.preventDefault();
  let cities = document.querySelector("#city");
  let cityInput = document.querySelector("#city-search");
  cities.innerHTML = cityInput.value;
}
let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", search);

//Temperature Converison
let temp = document.querySelector("#temp");
let celsiusButton = document.querySelector("#celsius");
let fahrenheitButton = document.querySelector("#fahrenheit");

function tempConverter(event) {
  event.preventDefault();

  let button = event.target;
  let temperature = parseInt(temp.innerHTML);
  let outputTemp;

  if (button === celsiusButton) {
    outputTemp = ((temperature - 32) * 5) / 9;
    celsiusButton.classList.add("active");
    fahrenheitButton.classList.remove("active");
  } else {
    outputTemp = (temperature * 9) / 5 + 32;
    fahrenheitButton.classList.add("active");
    celsiusButton.classList.remove("active");
  }

  temp.innerHTML = Math.round(outputTemp);
}

celsiusButton.addEventListener("click", tempConverter);
fahrenheitButton.addEventListener("click", tempConverter);

//Displaying Temperature, humidity, wind & description
function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function submit(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-search").value;
  citySearcher(newCity);
}

function citySearcher(city) {
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

//Searching for exact geolocation
function searchLocation(position) {
  let apiKey = "20811777afcctfb386aebf0oe8a480fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(searchLocation);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

//Display Forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
  
              
              <div class="col-2">
               <div class="forecast-date">${day}</div> 
                <img src="https://ssl.gstatic.com/onebox/weather/48/sunny_s_cloudy.png" alt="">
                <div class="weather-forecast-temp">
                  <span class="weather-temp-max">72° </span
                  ><span class="weather-temp-min">52°</span>
                </div>
              </div>
             
           
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

//Default City
citySearcher("New York City");
displayForecast();
