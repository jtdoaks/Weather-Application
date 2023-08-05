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
            // console.log(cityInfo.coord.lat);
            // console.log(cityInfo.coord.lon);

            let newDiv = document.createElement("div");
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
    document.querySelector("#searchBox").innerHTML = "";

    for (let i = 0; i < pastSearches.length; i++) {
        let newButton = document.createElement("button");
        newButton.textContent = pastSearches[i];
        newButton.addEventListener("click", function (event) {
            let searchedCity = event.target.textContent;
            // console.log(searchedCity);
            getWeather(searchedCity);
            
        })
        document.querySelector("#searchBox").append(newButton);
        
    }
    
}


displayPastButtons();
// foreach()?
            function displayFive(cityInfo) {
                let fiveDayF = JSON.parse(localStorage.getItem("cityInfo")) || [];
                fiveDayF.push(cityInfo);
                localStorage.setItem("cityInfo", JSON.stringify(fiveDayF))
                console.log(fiveDayF);


                // document.querySelector("#fiveDay").innerHTML = "";


                for (let i = 0; fiveDayF.length; i++) {
                    // if (i > 3) break;
          
                    let days = document.createElement("div");
                    days.setAttribute("class", "card");
            
                    let cardBody = document.createElement("div");
                    cardBody.setAttribute("class", "card-body");
            
                    let date = document.createElement("div");
                    date.setAttribute("class", "card");
                    date.textContent = dayjs().format("DD/MM/YYYY") 
            
                    let temp = document.createElement("p");
                    temp.setAttribute("class", "card-text");
                    temp.textContent = `Temperature: ${cityInfo.main.temp} F`;
            
                    let wind = document.createElement("p");
                    wind.setAttribute("class", "card-text");
                    wind.textContent = `Wind: ${cityInfo.wind.speed} mph`;
            
                    let humidity = document.createElement("p");
                    humidity.setAttribute("class", "card-text");
                    humidity.textContent = `Humidity: ${cityInfo.main.humidity} %`;
            
                    cardBody.append(date, temp, wind, humidity);
                    newDiv.append(cardBody);
            
                    // document.querySelector("#fiveDay").append(days);
                }
            }
            displayFive();