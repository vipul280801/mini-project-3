const button = document.getElementById("searchBtn");
const input = document.getElementById("city");
const city = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const apiKey = "1a0e5c121c7a448b8a9aedfa85d0a9a4";

button.addEventListener("click", () => {
  let cityName = input.value.trim();
  if (cityName == "") {
    alert("Please Enter City Name");
    return;
  }
  getWeather(cityName);
});
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    let cityName = input.value.trim();

    if (cityName === "") {
      alert("Please Enter City Name");
      return;
    }
    getWeather(cityName);
  }
});
const getWeather = async (cityName) => {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    if (!response.ok) {
      alert("City Not Found");
      return;
    }

    const { name } = data;
    const { temp, humidity: hum } = data.main;
    const { speed } = data.wind;
    const { main } = data.weather[0];

    city.innerHTML = name;
    temperature.innerHTML = `${Math.round(temp)}°C`;
    condition.innerHTML = main;
    humidity.innerHTML = `${hum}%`;
    wind.innerHTML = `${Math.round(speed)} m/s`;

    if (main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (main === "Clear") {
      weatherIcon.src = "images/clear-sky.png";
    } else if (main === "Snow") {
      weatherIcon.src = "images/snowy.png";
    } else {
      weatherIcon.src = "images/weather.png";
    }
    input.value = "";
    input.focus();
  } catch (error) {
    alert("City Not Found");
  }
};
