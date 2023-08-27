const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=a0edf4ed89ca21f579aeb0c8eebced78&units=standard`;
        console.log(url);
        const response = await fetch(url);
        console.log(response);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const weatherData = await response.json();

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
        description.innerHTML = `${weatherData.weather[0].description}`;

        humidity.innerHTML = `${weatherData.main.humidity}%`;
        wind_speed.innerHTML = `${weatherData.wind.speed} Km/H`;

        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weather_img.src = "clouds.jpeg";
                break;
            case 'Clear':
                weather_img.src = "clear.jpeg";
                break;
            case 'Rain':
                weather_img.src = "rain.jpeg";
                break;
            case 'Mist':
                weather_img.src = "mist.jpeg";
                break;
            case 'Haze':
                weather_img.src = "mist.jpeg";
                break;
            case 'Snow':
                weather_img.src = "snow.jpeg";
                break;
            default:
                weather_img.src = "default.jpeg"; 
                break;
        }
    } catch (error) {
        console.error(error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
