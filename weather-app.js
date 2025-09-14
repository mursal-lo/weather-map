// API key for OpenWeatherMap (replace with your own free key)
const API_KEY = 'ca6e5d09987104471380de6d80d7a2da';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Get HTML elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const weatherInfo = document.getElementById('weatherInfo');
const error = document.getElementById('error');

// Weather display elements
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const feelsLike = document.getElementById('feelsLike');

// Function to get weather data
async function getWeather(city) {
    try {
        // Show loading state
        showLoading();

        // Make API request
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);

        // Check if response is successful
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else {
                throw new Error('Unable to fetch weather data');
            }
        }

        // Get weather data
        const data = await response.json();

        // Display weather information
        displayWeather(data);

    } catch (err) {
        // Show error message
        showError(err.message);
        console.error('Error:', err.message);
    }
}

// Function to display weather information
function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind: ${Math.round(data.wind.speed * 3.6)} km/h`;
    feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;

    // Show weather info
    showWeatherInfo();
}

// Function to show loading state
function showLoading() {
    loading.style.display = 'flex';
    weatherInfo.classList.remove('show');
    error.classList.remove('show');
}

// Function to show weather information
function showWeatherInfo() {
    loading.style.display = 'none';
    weatherInfo.classList.add('show');
    error.classList.remove('show');
}

// Function to show error message
function showError(message = 'City not found. Please try again.') {
    loading.style.display = 'none';
    weatherInfo.classList.remove('show');
    error.textContent = message;
    error.classList.add('show');
}

// Function to handle search
function handleSearch() {
    const city = cityInput.value.trim();

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    getWeather(city);
}

// Event listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Focus on input when page loads
document.addEventListener('DOMContentLoaded', function () {
    cityInput.focus();
});

// Demo function with sample data (for testing without API key)
function showDemoWeather() {
    const demoData = {
        name: 'London',
        sys: { country: 'GB' },
        main: {
            temp: 22,
            feels_like: 25,
            humidity: 65
        },
        weather: [{ description: 'partly cloudy' }],
        wind: { speed: 3.5 }
    };

    displayWeather(demoData);
}

// Uncomment below to show demo data on page load
// showDemoWeather();
