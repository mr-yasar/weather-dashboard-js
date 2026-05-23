const apiKey = "de3050cd6dcb452994861044262105";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const description = document.getElementById("description");

const errorMessage = document.getElementById("errorMessage");


// Fetch Weather Data
async function getWeather(city){

  try{

    errorMessage.textContent = "";

    weatherCard.classList.add("hidden");

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    if(!response.ok){
      throw new Error("City not found");
    }

    const data = await response.json();

    console.log(data);

    displayWeather(data);

  }
  catch(error){

    errorMessage.textContent = error.message;

  }

}


// Display Weather Data
function displayWeather(data){

  cityName.textContent =
    `${data.location.name}, ${data.location.country}`;

  temperature.textContent =
    `${data.current.temp_c} °C`;

  humidity.textContent =
    `${data.current.humidity}%`;

  windSpeed.textContent =
    `${data.current.wind_kph} km/h`;

  description.textContent =
    data.current.condition.text;

  weatherCard.classList.remove("hidden");

}


// Search Button
searchBtn.addEventListener("click", () => {

  const city = cityInput.value.trim();

  if(city !== ""){
    getWeather(city);
  }
  else{
    errorMessage.textContent =
      "Please enter a city name";
  }

});


cityInput.addEventListener("keypress", (e) => {

  if(e.key === "Enter"){

    const city = cityInput.value.trim();

    if(city !== ""){
      getWeather(city);
    }
    else{
      errorMessage.textContent =
        "Please enter a city name";
    }

  }

});