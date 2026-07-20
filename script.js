const apiKey = "YOUR_API_KEY";

const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    if(city === ""){
        weatherResult.innerHTML = "<p class='error'>Please enter a city.</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
            <p>☁ Weather: ${data.weather[0].description}</p>
        `;

    }
    catch(error){
        weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
    }

}