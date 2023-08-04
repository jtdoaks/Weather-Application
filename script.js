let APIKey = "6f3fae3674ae2776180feb26321732b6";


fetch("http://api.openweathermap.org/geo/1.0/direct?q=cityname&limit=5&appid=6f3fae3674ae2776180feb26321732b6")
    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0];
        console.log(citiesFound);
        console.log(firstCity.lat);
        console.log(firstCity.lon);

        return fetch("https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=6f3fae3674ae2776180feb26321732b6")
    })

    .then(response => response.json())
    .then(data => {

        console.log(data);
    })
