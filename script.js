const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityElement = document.getElementById('city');
const tempElement = document.getElementById('temp');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const weatherIconElement = document.getElementById('weatherIcon');
const topCitiesDropdown = document.getElementById('topCities');

const apiKey = '5e6d22514ad7484faf2115430252601'; 

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

topCitiesDropdown.addEventListener('change', () => {
    const selectedCity = topCitiesDropdown.value;
    if (selectedCity) {
        fetchWeather(selectedCity);
    }
});

async function fetchWeather(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            updateWeatherUI(data);
        } else {
            alert('City not found');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data');
    }
}

function updateWeatherUI(data) {
    cityElement.textContent = data.location.name;
    tempElement.textContent = Math.round(data.current.temp_c);
    descriptionElement.textContent = data.current.condition.text;
    humidityElement.textContent = data.current.humidity;
    windSpeedElement.textContent = data.current.wind_kph / 3.6; // Convert km/h to m/s

    const iconCode = data.current.condition.icon;
    weatherIconElement.src = `https:${iconCode}`;
    weatherIconElement.alt = data.current.condition.text;
}
