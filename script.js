const apiKey=
     "126d1793cdcfd65152ab6f8fa77d56ce";
     const searchButton=
     document.getElementById("searchButton");
     const cityInput=
     document.getElementById("cityInput");
     const unitButton=
     document.getElementById("unitButton");
     let isCelsius=true;
     searchButton.addEventListener("click" , getWeather);
     unitButton.addEventListener("click" ,()=>{
        isCelsius=!isCelsius;             
        unitButton.textContent=isCelsius?"°F" :"°C";
        getWeather();
     });
     async function getWeather() {
        const city= cityInput.value.trim();
        if(city===""){
            alert("Please enter a city name");
            return;
        }
        const url=
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
             try{
                document.getElementById("weather").innerHTML=
                "<h2>Loading weather...</h2>";
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error("City not found");
                }
                const data = await response.json();
                const temp=isCelsius?data.main.temp:(data.main.temp*9/5)+32;
                const FeelsLike=isCelsius?data.main.feels_like:(data.main.feels_like*9/5)+32;
                console.log(data.weather[0].icon);
                document.getElementById("weather").innerHTML=`
                    <h2>Weather for ${data.name}</h2>
                    <p class="weather-icon">
                    ${data.weather[0].icon.endsWith("n")?"🌙" : "☀️"}
                    </p>
                    <p class="temperature">Temperature: ${temp.toFixed(2)}°${isCelsius?"C":"F"}</p>
                    <p class="feels-like">Feels Like: ${FeelsLike.toFixed(2)}°${isCelsius?"C":"F"}</p>
                    <p class="condition">Condition: ${data.weather[0].description}</p>
                        <p class="humidity">Humidity: ${data.main.humidity}%</p>
                        <p class="wind-speed">Wind Speed: ${data.wind.speed}km/h</p>
                        `;
        const forecastUrl=            
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
          const forecastResponse=await
          fetch(forecastUrl);
          if(!forecastResponse.ok){
            throw new Error("Forecast not avaliable");
          }
          const forecastData=await
           forecastResponse.json();
           console.log(forecastData);
           const forecastList = forecastData.list;

let forecastHTML =`<h2>5-Day Forecast</h2> 
                    <div class="forecast-container">`;

for (let i = 0; i < forecastList.length; i += 8) {
    const forecast = forecastList[i];
    const forecastTemp=isCelsius?forecast.main.temp:(forecast.main.temp*9/5)+32;
    const forecastIcon= forecast.weather[0].icon;

    forecastHTML += `
        <div class="forecast-item">
            <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
              <p class="weather-icon">
                    ${forecastIcon.endsWith("n")?"🌙" : "☀️"}
                    </p>
            
            <p>${forecast.weather[0].description}</p>
            <p>${forecastTemp.toFixed(2)}°${isCelsius?"C":"F"}</p>
        </div>
    `;
}
        forecastHTML +=`</div>`;
document.getElementById("weather").innerHTML += forecastHTML;
             }
             catch(error){
                console.log("ERROR:", error);
                document.getElementById("weather").innerHTML=` <p> City not found.Please try again.</p>`;
             }
     }