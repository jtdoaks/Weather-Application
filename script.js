let APIKey = "6f3fae3674ae2776180feb26321732b6";
// let queriedCity = "Pittsburgh";
//event listener. 
// pull out the string from the new button. use event delegation. event.target.textContent?
document.querySelector("#search").addEventListener("click", function () {
    let city = document.querySelector("#cityBox").value;
    getWeather(city);
});


function getWeather(queriedCity) {

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${queriedCity}&limit=5&appid=6f3fae3674ae2776180feb26321732b6&units=imperial`)
        .then(response => response.json())
        .then(cityInfo => {
            // let firstCity = citiesFound[0];
            console.log(cityInfo);
            console.log(cityInfo.coord.lat);
            console.log(cityInfo.coord.lon);

            const newDiv = document.createElement("div");
            newDiv.setAttribute("class", "card");

            let cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");

            let cityName = document.createElement("h5");
            cityName.setAttribute("class", "card-title");
            cityName.textContent = cityInfo.name;

            let temp = document.createElement("p");
            temp.setAttribute("class", "card-text");
            temp.textContent = `Temperature: ${cityInfo.main.temp} F`;

            let wind = document.createElement("p");
            wind.setAttribute("class", "card-text");
            wind.textContent = `Wind: ${cityInfo.wind.speed} mph`;

            let humidity = document.createElement("p");
            humidity.setAttribute("class", "card-text");
            humidity.textContent = `Humidity: ${cityInfo.main.humidity} %`;


            cardBody.append(cityName, temp, wind, humidity);
            newDiv.append(cardBody);



            document.querySelector(".currentWeather").innerHTML = "";
            document.querySelector(".currentWeather").append(newDiv);


            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityInfo.coord.lat}&lon=${cityInfo.coord.lon}&appid=6f3fae3674ae2776180feb26321732b6&units=imperial`)
        })

        .then(response => response.json())
        .then(cityData => {

            console.log(cityData);
            saveCity(cityData.city.name);
            for (let i = 0; i < cityData.list.length; i++) {
                if (cityData.list[i].dt_txt.includes("12:00:00")) {
                    console.log(cityData.list[i]);

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
     document.querySelector("#searchBox").innerHTML = "";

    for (let i = 0; i < pastSearches.length; i++) {
        let newButton = document.createElement("button");
        newButton.textContent = pastSearches[i];
        newButton.addEventListener("click", function (event) {
            let searchedCity = event.target.textContent;
            console.log(searchedCity);
            getWeather(searchedCity);
        })
        document.querySelector("#searchBox").append(newButton);

    }
}

displayPastButtons();