let apiKey = "ae43fce93221a7479e25011f753d1c95";
let city = "";
let geoQuery = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

let cityFormEl = document.querySelector("#city-form");
let cityBtnEl = document.querySelector("#city-buttons");
let cityName = document.querySelector("#cityName");
let weatherContainerEl = document.querySelector("weather-container");
let cityInputEl = document.querySelector("#cityName");
let citySearched = document.querySelector("#city-searched");
let currentCityEl = document.getElementById("city");
let temp = document.getElementById("temperature");
let wind = document.getElementById("wind-speed");
let humidity = document.getElementById("humidity");

let getWeather = function (city){
    //  let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city.name + "&appid=" + apiKey;
    //  let latLonQuery =  "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
     
     fetch("http://api.openweathermap.org/geo/1.0/direct?q=trenton&limit=5&appid=ae43fce93221a7479e25011f753d1c95")
     .then(response => response.json())
     .then(citiesFound =>{
             let firstCity = citiesFound[0];
             console.log(citiesFound)
             console.log(firstCity)
             console.log(firstCity.lat)
             console.log(firstCity.lon)
     
             return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=ae43fce93221a7479e25011f753d1c95`)

         })
     
         .then(response => response.json())
         .then(weatherData =>{
             console.log(weatherData)
             let tempFound = weatherData.list[0].main.temp;
             temp.textContent = "Temperature: "+ tempFound;
             console.log(tempFound)
             let windFound = weatherData.list[0].wind.speed
             wind.textContent = "Wind Speed: " + windFound;
             console.log(windFound)
             let humFound = weatherData.list[0].main.humidity
             humidity.textContent =  "Humidity: " +humFound;
             console.log(humFound)
         })
        }
     
getWeather()








// let formSubmitHandler = function (event) {
//    event.preventDefault();
   
//    let cityName = cityInputEl.value.trim();
   
//    if (cityName) {
//        getWeather(cityName);
       
//        weatherContainerEl.textContent = '';
//        cityInputEl.value = '';
//     } else {
//         alert('Please enter a city or zip code');
//     }
// };

// let buttonClickHandler = function (event) {
//     let city = event.target.getAttribute('data-city');
    
//     if (city) {
//         getSearchedWeather(city);
        
//         weatherContainerEl.textContent = '';
//     }
//  };
 
// let inputFormBtn = document.getElementsById("cityName")
    
//     .then(response => response.json())
//     .then(data => {
//         getWeather();
//         weatherContainerEl.textContent = "";
//         console.log(data)
    
    
//       })
// }

// let displayWeather = function (){

// }

// inputFormBtn.addEventListener("click", function (event){
    
// })