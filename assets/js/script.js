let apiKey = "ae43fce93221a7479e25011f753d1c95";
let cityInput = "";
let cityFormEl = document.querySelector("#city-form");
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

// searchCity.addEventListener("click", function (event){
//     event.preventDefault();
//     let cityName = cityInput.value();
//     getWeather(cityName);
//     console.log(cityName)
// })

let getWeather = function (){
    //  let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city.name + "&appid=" + apiKey;
    //  let latLonQuery =  "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
    
     
     fetch(`http://api.openweathermap.org/geo/1.0/direct?q=trenton&limit=5&appid=`+apiKey)
     .then(response => response.json())
     .then(citiesFound =>{
             let firstCity = citiesFound[0];
             console.log(citiesFound)
             console.log(firstCity)
             console.log(firstCity.lat)
             console.log(firstCity.lon)
     
             return fetch(`https://api.openweathermap.org/data/2.5/forecast/?lat=${firstCity.lat}&lon=${firstCity.lon}&cnt=48&appid=`+apiKey+"&units=imperial")
            //  units=imperial for weather in Fahrenheit
            // according to documentation - cnt is supposed to be for day but is showing every 3 hours in console

         })
     
         .then(response => response.json())
         .then(weatherData =>{
             console.log(weatherData)

            //  for (let i = 0; i < weatherData.list[i].length; i+8) {

                 let tempFound = weatherData.list[0].main.temp;
                 temp.textContent = "Temperature: "+ tempFound + " Fahrenheit";
                 console.log(tempFound)
                 let windFound = weatherData.list[0].wind.speed
                 wind.textContent = "Wind Speed: " + windFound + " MPH";
                 console.log(windFound)
                 let humFound = weatherData.list[0].main.humidity
                 humidity.textContent =  "Humidity: " +humFound + " %";
                 console.log(humFound)
                 let iconEl = weatherData.list[0].weather.icon;
                 icon.value = iconEl


             console.log(weatherData.cnt)
         })
        }
     
getWeather()





let formSubmitHandler = function (event) {
   event.preventDefault();
   
   let cityName = cityInputEl.value.trim();
   console.log(cityName)
   
   if (cityName) {
       getWeather(cityName);
       
       weatherContainerEl.textContent = '';
       cityInputEl.value = '';
    } else {
        alert('Please enter a city or zip code');
    }
};

// let buttonClickHandler = function (event) {
//     let city = event.target.getAttribute('data-city');
    
//     if (city) {
//         getSearchedWeather(city);
        
//         weatherContainerEl.textContent = '';
//     }
//  };
 
// let inputFormBtn = document.getElementsById("cityName")
//         getWeather();
//         weatherContainerEl.textContent = "";
//         console.log(data)
    
    
//       })
// }

// let displayWeather = function (){

// }

// inputFormBtn.addEventListener("click", function (event){
    
// })