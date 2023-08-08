let apiKey = "ae43fce93221a7479e25011f753d1c95";
let cityBtnEl = document.querySelector("#city-buttons");
let cityName = document.querySelector("#cityName");
let weatherContainerEl = document.querySelector("weather-container");
let citySearched = document.querySelector("#city-searched");
let currentCityEl = document.getElementById("city");
let temp = document.getElementById("temperature");
let wind = document.getElementById("wind-speed");
let humidity = document.getElementById("humidity");
let icon = document.getElementById("icon");


let searchCity = document.getElementById("searchCity");
let cityInputEl = document.getElementById("cityInput");
let cityFormEl = document.getElementById("city-form");

let form = document.getElementById("city-form");


form.addEventListener("submit", function (event){
    event.preventDefault();
    let city = cityInputEl.value.trim();
    
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    .then(response => response.json())
    .then(citiesFound =>{
        let firstCity = citiesFound[0];
        console.log(citiesFound)
            console.log(firstCity)
            console.log(firstCity.lat)
            console.log(firstCity.lon)
            
            let latLonQuery =  `https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&cnt=6&appid=`+apiKey+"&units=imperial";
    
            return fetch(latLonQuery)
            //  units=imperial for weather in Fahrenheit
            // according to documentation - cnt is supposed to be for day but is showing every 3 hours in console
            
        })
    
        .then(response => response.json())
        .then(weatherData =>{
            console.log(weatherData)
    if (city === '') {
        return  getWeather(city);
       
    }
})



            // let tempFound = weatherData.list[0].main.temp;
            // temp.textContent = "Temperature: "+ tempFound + " Fahrenheit";
            
            // let windFound = weatherData.list[0].wind.speed
            // wind.textContent = "Wind Speed: " + windFound + " MPH";
          
            // let humFound = weatherData.list[0].main.humidity
            // humidity.textContent =  "Humidity: " +humFound + " %";
            
            // let iconEl = weatherData.list[0].weather.icon;
            // icon.value = iconEl

            // let  = weatherData.list[8].main.temp
            // document.getElementById("nextDayT").textContent = "Temp: " ++ "F";

            // console.log()
            


})





