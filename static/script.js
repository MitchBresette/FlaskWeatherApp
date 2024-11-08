document.addEventListener("DOMContentLoaded", function() {
    const unitToggle = document.getElementById('unit-toggle');
    const unitLabel = document.getElementById('unit-label');
    const cityInput = document.getElementById('city');
    const cityForm = document.getElementById('city-form');
    const weatherContainer = document.getElementById('weather-container');

    // defaults to celsius
    let unit = 'metric';

    //  fetches weather data for city
    cityForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const city = cityInput.value;
        fetchWeatherData(city, unit);
    });

    // changes between c/f when toggle is clicked
    unitToggle.addEventListener('change', function() {
        if (unitToggle.checked) {
            unit = 'imperial';  // Fahrenheit
            unitLabel.textContent = '°F';
        } else {
            unit = 'metric';  // Celsius
            unitLabel.textContent = '°C';
        }

        // fetches weather data for the current city and unit
        const city = cityInput.value;
        if (city) {
            fetchWeatherData(city, unit);
        }
    });

    // function to fetch and display weather data
    function fetchWeatherData(city, unit) {
        fetch(`/weather?city=${city}&unit=${unit}`)
            .then(response => response.json())
            .then(data => {
                const weather = data.weather;
                if (weather) {
                    const weatherHtml = `
                        <h2>Weather in ${weather.city}</h2>
                        <p>Temperature: ${weather.temp}°${unit === 'metric' ? 'C' : 'F'}</p>
                        <p>Description: ${weather.description}</p>
                        <img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="Weather icon">
                    `;
                    weatherContainer.innerHTML = weatherHtml;
                } else {
                    weatherContainer.innerHTML = '<p>City not found. Please try again.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherContainer.innerHTML = '<p>There was an error fetching the weather data.</p>';
            });
    }
});