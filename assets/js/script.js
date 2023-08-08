let apiKey = "ae43fce93221a7479e25011f753d1c95";
let cityName = document.querySelector("#cityName");
let temp = document.getElementById("temperature");
let wind = document.getElementById("wind-speed");
let humidity = document.getElementById("humidity");
let icon = document.getElementById("icon");

let cityInputEl = document.getElementById("cityInput");

let form = document.getElementById("city-form");
let currentDate =dayjs().format('MMM DD, YYYY');
let currentDateEl = document.getElementById("currentDay")
// currentDateEl.textContent = "Date: " +currentDate;


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

            let tempFound = weatherData.list[0].main.temp;
            temp.textContent = "Temperature: "+ tempFound + " Fahrenheit";
            
            let windFound = weatherData.list[0].wind.speed
            wind.textContent = "Wind Speed: " + windFound + " MPH";
            
            let humFound = weatherData.list[0].main.humidity
            humidity.textContent =  "Humidity: " +humFound + " %";
            
            let iconEl = weatherData.list[0].weather.icon;
            icon.value = iconEl
            
    if (city === '') {    
        return;
    }    

    localStorage.setItem("Weather", JSON.stringify(weatherData));
    createBtn(city)

})    

let storedCities = document.getElementById("storedCities")
function createBtn(){
    let newCityBtn = document.createElement("button");
    storedCities.append(newCityBtn)
    newCityBtn.textContent = cityInputEl.value.trim();
    newCityBtn.addEventListener("click", function (event){
        event.target
    })
}
})

createBtn();
