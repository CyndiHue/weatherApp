let apiKey = "ae43fce93221a7479e25011f753d1c95";
let city = "";



let geoQuery = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";


// this one used in video

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// q: The query parameter, where we'll add the city variable.

// appid: The application id or key, where we'll add the API key variable.

// (?) marks the boundary between the base URL of the API call and the query terms of the API call

// http://api.openweathermap.org/data/2.5/weather is the base URL for calling the Current Weather Data API.
// q= is the query parameter, where we can add any user input to specify the data that we want to request in the API call. The value assigned to this parameter is called the query string.


// Following the query parameter, we concatenate the user input, which is stored in the variable city. This is the query string assigned to the query parameter.

// The ampersand character (&) indicates that we're adding another parameter after the query parameter.

// Next, we concatenate the other required parameter, appid=, where we'll add the API key specific to the application.

// Finally, we concatenate the APIKey variable that contains the key we obtained at the beginning of this guide.
let cityFormEl = document.querySelector("#city-form");
let cityBtnEl = document.querySelector("#city-buttons");
let cityName = document.querySelector("#cityName");
let weatherContainerEl = document.querySelector("weather-container");
let cityInputEl = document.querySelector("#cityName");
let citySearched = document.querySelector("#city-searched");


let formSubmitHandler = function (event) {
   event.preventDefault();
   
   let cityName = cityInputEl.value.trim();
   
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
 
 let getWeather = function (city){
     let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
     let latLonQuery =  "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
     
    fetch(latLonQuery)
    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0];
        if(response.ok){
            displayWeather(citiesFound, firstCity)
        }
        console.log(citiesFound)
        console.log(firstCity)
            console.log(firstCity.lat)
            console.log(firstCity.lon)
    
            return fetch(queryURL) 
        })
    
    
    .then(response => response.json())
    .then(data => {
    
        console.log(data)
    
      })
}

let displayWeather = function ()

cityFormEl.addEventListener("searchBtn", formSubmitHandler);
cityBtnEl.addEventListener("click", buttonClickHandler);