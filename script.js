let APIKey = "6f3fae3674ae2776180feb26321732b6";
let queriedCity = "Pittsburgh";
//event listener. 
// pull out the string from the new button. use event delegation. event.target.textContent?
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${queriedCity}&limit=5&appid=6f3fae3674ae2776180feb26321732b6`)
    .then(response => response.json())
    .then(cityInfo => {
        // let firstCity = citiesFound[0];
        console.log(cityInfo);
        console.log(cityInfo.coord.lat);
        console.log(cityInfo.coord.lon);

        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityInfo.coord.lat}&lon=${cityInfo.coord.lon}&appid=6f3fae3674ae2776180feb26321732b6`)
    })

    .then(response => response.json())
    .then(cityData => {

        console.log(cityData);
    })
