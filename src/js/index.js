
async function searchWeather() {
    const location = document.getElementById('location').value;
    console.log(`searching for ${location}`);
    if (!location) {
        alert("Please enter a location");
        return;
    }

    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=dbcbefa478874c6b859204221241112&q=${location}&days=3`);;
    if (response.ok) {
        const data = await response.json();
        updateForecast(data);
    } else {
        alert("Unable to fetch weather data. Please try again.");
    }
}

function updateForecast(data) {
    console.log(data)
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = ""; // Clear previous data
    const location = data.location.name;

    // Handle Day 1
    const day1 = data.forecast.forecastday[0];
    const day1Date = new Date(day1.date);
    const day1Name = day1Date.toLocaleDateString('en-US', { weekday: 'long' });
    const day1FormattedDate = day1Date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });

    forecastDiv.innerHTML += `
            <div class="col-md-4 main-col ">
                <div class="forecast-card main-card">
                    <div class="forecast-header">${day1Name}</div>
                    <div class="forecast-date">${day1FormattedDate}</div>
                    <h2>${day1.day.avgtemp_c}°C</h2>
                    <p>${day1.day.condition.text}</p>
                    <div class="forecast-details">
                        <p class="d-flex align-items-center gap-2"><img width="21" src="./src/images/icon-umberella.png" alt="Humidity"/> ${day1.day.avghumidity}%</p>
                        <p class="d-flex align-items-center gap-2"><img width="21" src="./src/images/icon-wind.png" alt="Humidity"/>  ${day1.day.maxwind_kph} km/h</p>
                        <p class="d-flex align-items-center gap-2"><img width="21" src="./src/images/icon-compass.png" alt="Humidity"/>  East</p>
                    </div>
                </div>
            </div>
        `;

    // Handle Day 2
    const day2 = data.forecast.forecastday[1];
    const day2Date = new Date(day2.date);
    const day2Name = day2Date.toLocaleDateString('en-US', { weekday: 'long' });
    const day2FormattedDate = day2Date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });

    forecastDiv.innerHTML += `
            <div class="col-md-4 main-col ">
                <div class="forecast-card second">
                    <div class="forecast-header">${day2Name}</div>
                    <div class="forecast-date">${day2FormattedDate}</div>
                                        <img src="https:${day1.day.condition.icon}" alt="${day1.day.condition.text}">
                    <h2>${day2.day.avgtemp_c}°C</h2>
                    <p>${day2.day.condition.text}</p>
                    <div class="forecast-details">
                       
                    </div>
                </div>
            </div>
        `;

    // Handle Day 3
    const day3 = data.forecast.forecastday[2];
    const day3Date = new Date(day3.date);
    const day3Name = day3Date.toLocaleDateString('en-US', { weekday: 'long' });
    const day3FormattedDate = day3Date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });

    forecastDiv.innerHTML += `
            <div class="col-md-4 main-col">
                <div class="forecast-card">
                    <div class="forecast-header">${day3Name}</div>
                    <div class="forecast-date">${day3FormattedDate}</div>
                                        <img src="https:${day1.day.condition.icon}" alt="${day1.day.condition.text}">

                    <h2>${day3.day.avgtemp_c}°C</h2>
                    <p>${day2.day.condition.text}</p>
                   <div class="forecast-details">
                       
                    </div>
                </div>
            </div>
        `;
}