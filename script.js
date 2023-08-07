let APIKey = "6f3fae3674ae2776180feb26321732b6";

document.querySelector("#search").addEventListener("click", function () {
    let city = document.querySelector("#cityBox").value;
    getWeather(city);
});

document.querySelector("#search").addEventListener("click", function () {
    let city = document.querySelector("#cityButtons");
    displayFive(city);
});


function getWeather(queriedCity) {

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
        newButton.setAttribute("class", "cityButtons")
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



function displayFive(event) {


};

//     let clickedCity = event.target;
//     fetch(`http://api.openweathermap.org/data/2.5/weather?q=${clickedCity}&limit=5&appid=6f3fae3674ae2776180feb26321732b6&units=imperial`)
//         .then(response => response.json())
//         .then(cityFive => {

//             console.log(cityFive);

//             let fiveDayF = JSON.parse(localStorage.getItem("cityFive")) || [];
//             fiveDayF.push(cityFive);
//             localStorage.setItem("cityFive", JSON.stringify(fiveDayF))
//             console.log(fiveDayF);


//             // document.querySelector("#fiveDay").innerHTML = "";


//             for (let i = 0; fiveDayF.length; i++) {
//                 // if (i > 3) break;

//                 let days = document.createElement("div");
//                 days.setAttribute("class", "card");

//                 let cardBody = document.createElement("div");
//                 cardBody.setAttribute("class", "card-body");

//                 let date = document.createElement("div");
//                 date.setAttribute("class", "card");
//                 date.textContent = dayjs().format("DD/MM/YYYY")

//                 let temp = document.createElement("p");
//                 temp.setAttribute("class", "card-text");
//                 temp.textContent = `Temperature: ${cityFive.main.temp} F`;

//                 let wind = document.createElement("p");
//                 wind.setAttribute("class", "card-text");
//                 wind.textContent = `Wind: ${cityFive.wind.speed} mph`;

//                 let humidity = document.createElement("p");
//                 humidity.setAttribute("class", "card-text");
//                 humidity.textContent = `Humidity: ${cityFive.main.humidity} %`;

//                 cardBody.append(date, temp, wind, humidity);
//                 newDiv.append(cardBody);

//                 // document.querySelector("#fiveDay").append(days);

//                 document.querySelector("#fiveDay").innerHTML = "";
//                 document.querySelector("#fiveDay").append(days);


//                 return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityFive.coord.lat}&lon=${cityFive.coord.lon}&appid=6f3fae3674ae2776180feb26321732b6&units=imperial`)

//                     .then(response => response.json())
//                     .then(cityCall => {

//                         // console.log(cityData);
//                         saveCity(cityCall.city.name);
//                         for (let i = 0; i < cityCall.list.length; i++) {
//                             if (cityCall.list[i].dt_txt.includes("12:00:00")) {
//                                 // console.log(cityData.list[i]);

//                             }

//                         }
//                     }
//                     )
//             }
//         }
//         )

function handleCityClick(event) {
    let clickedCity = event.target.textContent;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${clickedCity}&appid=${APIKey}&units=imperial`)
        .then(response => response.json())
        .then(cityData => {
console.log("working")

            let days = document.createElement("div");
            days.setAttribute("class", "card");

            let cardBodyFive = document.createElement("div");
            cardBodyFive.setAttribute("class", "card-body");

            let date = document.createElement("div");
            date.setAttribute("class", "card");
            date.textContent = dayjs().format("DD/MM/YYYY")

            let temp = document.createElement("p");
            temp.setAttribute("class", "card-text");
            temp.textContent = `Temperature: ${cityData.main.temp} F`;

            let wind = document.createElement("p");
            wind.setAttribute("class", "card-text");
            wind.textContent = `Wind: ${cityData.wind.speed} mph`;

            let humidity = document.createElement("p");
            humidity.setAttribute("class", "card-text");
            humidity.textContent = `Humidity: ${cityData.main.humidity} %`;

            cardBodyFive.append(date, temp, wind, humidity);
            days.append(cardBodyFive);


            document.querySelector(".fiveDay").innerHTML = "";
            document.querySelector(".fiveDay").append(days);






          
        })
        
}


const cityElements = document.querySelectorAll('.cityButtons');
cityElements.forEach(cityElement => {
    cityElement.addEventListener('click', handleCityClick);
});