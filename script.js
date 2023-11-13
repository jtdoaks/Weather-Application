let APIKey = "6f3fae3674ae2776180feb26321732b6";

document.querySelector("#searchButton").addEventListener("click", function () {
    let city = document.querySelector("#cityBox").value;
    getWeather(city);
    let cityFive = document.querySelector("#cityButtons");
    displayFive(cityFive);
    
    
});



function getWeather(queriedCity) {
    displayFive(queriedCity);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${queriedCity}&limit=5&appid=6f3fae3674ae2776180feb26321732b6&units=imperial`)
        .then(response => response.json())
        .then(cityInfo => {

            console.log(cityInfo);


            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "card");

            let cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");

            let cityName = document.createElement("h5");
            cityName.setAttribute("class", "card-title");
            cityName.textContent = `Right now in ${cityInfo.name}`;

            let image = document.createElement("img")
            image.setAttribute("src", `https://openweathermap.org/img/wn/${cityInfo.weather[0].icon}.png`);

            let temp = document.createElement("p");
            temp.setAttribute("class", "card-text");
            temp.textContent = `Temperature: ${Math.round(cityInfo.main.temp)} °F`;

            let wind = document.createElement("p");
            wind.setAttribute("class", "card-text");
            wind.textContent = `Wind: ${Math.round(cityInfo.wind.speed)} mph`;

            let humidity = document.createElement("p");
            humidity.setAttribute("class", "card-text");
            humidity.textContent = `Humidity: ${cityInfo.main.humidity}%`;

            let feelsLike = document.createElement("p");
            feelsLike.setAttribute("class", "card-text");
            feelsLike.textContent = `Feels Like: ${Math.round(cityInfo.main.feels_like)} °F`;


            cardBody.append(cityName, image, temp, wind, humidity, feelsLike);
            newDiv.append(cardBody);

            document.querySelector(".currentWeather").innerHTML = "";
            document.querySelector(".currentWeather").append(newDiv);



            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityInfo.coord.lat}&lon=${cityInfo.coord.lon}&appid=6f3fae3674ae2776180feb26321732b6&units=imperial`)
        })

        .then(response => response.json())
        .then(cityData => {

            // console.log(cityData);
            saveCity(cityData.city.name);
            for (let i = 0; i < cityData.list.length; i++) {
                if (cityData.list[i].dt_txt.includes("12:00:00")) {
                    // console.log(cityData.list[i]);

                }

            }
        }) 
       
}


function saveCity(citiesName) {
    let pastSearches = JSON.parse(localStorage.getItem("pastCities")) || [];
    if (!pastSearches.includes(citiesName)) {
        pastSearches.push(citiesName)
        localStorage.setItem("pastCities", JSON.stringify(pastSearches))
        displayPastButtons()
    }
}

function displayPastButtons() {
    let pastSearches = JSON.parse(localStorage.getItem("pastCities")) || [];
    document.querySelector("#prevSearches").innerHTML = "";

    for (let i = 0; i < pastSearches.length; i++) {
        let newButton = document.createElement("button");
        newButton.setAttribute("class", "cityButtons")
        newButton.textContent = pastSearches[i];
        newButton.addEventListener("click", function (event) {
            let searchedCity = event.target.textContent;
            // console.log(searchedCity);
            getWeather(searchedCity);

        })
        document.querySelector("#prevSearches").append(newButton);

    }

}
displayPastButtons();



function displayFive(queriedCity) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${queriedCity}&limit=5&appid=6f3fae3674ae2776180feb26321732b6&units=imperial`)
    .then (response => response.json())
    .then (weather => {
         document.querySelector(".fiveDay").innerHTML = "";
        for (let i = 7; i < weather.list.length; i=i+8) {
            console.log(weather.list[i]);
            let dayData = weather.list[i];
            const dayName = new Date(dayData.dt * 1000).toLocaleString('en-US', { weekday: 'long' });

            let days = document.createElement("div");
                            days.setAttribute("class", "card");
                
                            let cardBodyFive = document.createElement("div");
                            cardBodyFive.setAttribute("class", "card-body");
                            
                            let date = document.createElement("div");
                            date.setAttribute("class", "date");
                            date.textContent = dayName;

                            let image = document.createElement("img")
                            image.setAttribute("src", `https://openweathermap.org/img/wn/${weather.list[i].weather[0].icon}.png`);
                            
                            let temp = document.createElement("p");
                            temp.setAttribute("class", "card-text");
                            temp.textContent = `Temperature: ${weather.list[i].main.temp} F`;
                            
                            let wind = document.createElement("p");
                            wind.setAttribute("class", "card-text");
                            wind.textContent = `Wind: ${weather.list[i].wind.speed} mph`;
                
                            let humidity = document.createElement("p");
                            humidity.setAttribute("class", "card-text");
                            humidity.textContent = `Humidity: ${weather.list[i].main.humidity} %`;
                            
                            cardBodyFive.append(date, image, temp, wind, humidity);
                            days.append(cardBodyFive);
                            
                            
                           
                            document.querySelector(".fiveDay").append(days);

                            document.querySelector('.fiveDayHeading').style.display = 'block';      
        }

    });
}

