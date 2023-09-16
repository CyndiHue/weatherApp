let apiKey = "ae43fce93221a7479e25011f753d1c95";
let cityName = document.querySelector("#cityName");
let temp = document.getElementById("temperature");
let wind = document.getElementById("wind-speed");
let humidity = document.getElementById("humidity");
let icon = document.getElementById("icon");
let city = document.getElementById("city");

let cityInputEl = document.getElementById("cityInput");

let form = document.getElementById("city-form");
let currentDate =dayjs().format('MMM DD, YYYY');
let currentDateEl = document.getElementById("currentDay")
// currentDateEl.textContent = "Date: " +currentDate;

// function latlonFetch(){
//     event.preventDefault();
//     let city = cityInputEl.value.trim();
    
//     fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
//     .then(response => response.json())
//     .then(citiesFound =>{
//         let firstCity = citiesFound[0];
//         console.log(citiesFound)
//             console.log(firstCity)
//             console.log(firstCity.lat)
//             console.log(firstCity.lon)
//             console.log(firstCity.name)
            
//             runForecast(citiesFound)

            
            
        
//             //  units=imperial for weather in Fahrenheit
//             // according to documentation - cnt is supposed to be for day but is showing every 3 hours in console
//         })
// }

function handleFormSubmit(event){

    event.preventDefault();
    
    let city = cityInputEl.value.trim()

    runForecast(city)
    runDailyWeather(city)
}


function runForecast(city){
    let forecastUrl =  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=`+apiKey+"&units=imperial";

    fetch(forecastUrl)
    .then(res=> res.json())
    .then(weatherData =>{
                    console.log(weatherData)
                    var forecastArr = [weatherData.list[4], weatherData.list[12], weatherData.list[20], weatherData.list[28], weatherData.list[36]]

                    for (let index = 0; index < forecastArr.length; index++) {
                       const card = document.createElement('div')
                       const cardBody = document.createElement('div')
                       const cardTitle = document.createElement('h5')
                       const cardTemp = document.createElement('p')
                       const cardWind = document.createElement('p')
                       const cardHumid = document.createElement('p')

                       card.setAttribute('style', 'width:18rem;')
                       card.setAttribute('class', 'card')
                        cardBody.setAttribute('class', 'card-body')
                        cardTitle.setAttribute('class', 'card-title')
                        cardTemp.setAttribute('class', 'card-text')
                        cardWind.setAttribute('class', 'card-text')
                        cardHumid.setAttribute('class', 'card-text')

                        cardTitle.textContent = forecastArr[index].dt_txt
                        cardTemp.textContent = forecastArr[index].main.temp
                        cardWind.textContent = forecastArr[index].wind.speed
                        cardHumid.textContent = forecastArr[index].main.humidity
                        // cardIcon.textContent = forecastArr[index].main.humidity

                        cardBody.append(cardTitle, cardTemp, cardWind, cardHumid)
                        card.append(cardBody)
                        document.getElementById('card-container').append(card)
                    }
                    // var cardOneDate =  document.getElementById('cardOneDate').textContent = weatherData.list[4].dt_txt;
                  
                    // var cardOneTemp = document.getElementById('cardOneTemp')
        
            //        let cityFound = weatherData.city.name
            //        city.textContent= "City: " +cityFound;
            //         console.log (weatherData.city.name )
                    
            //         let tempFound = weatherData.list[0].main.temp;
            //         temp.textContent = "Temperature: "+ tempFound + " Fahrenheit";
                    
            //         let windFound = weatherData.list[0].wind.speed
            //         wind.textContent = "Wind Speed: " + windFound + " MPH";
                    
            //         let humFound = weatherData.list[0].main.humidity
            //         humidity.textContent =  "Humidity: " +humFound + " %";
                    
            //         let iconEl = weatherData.list[0].weather.icon;
            //         icon.value = iconEl
                    
            // if (city === '') {    
            //     return;
            // }    
        
            // localStorage.setItem("Weather", JSON.stringify(weatherData));
            // createBtn(city)
        
      
        
})
}

function runDailyWeather(city){
    let url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`+apiKey+"&units=imperial";

    fetch(url)
    .then(res=> res.json())
    .then(weatherData =>{
                    console.log(weatherData)
                    console.log(weatherData.name)
                    console.log(weatherData.main.temp)
                    console.log(weatherData.wind.speed)
                    console.log(weatherData.weather[0].icon)
                    console.log(weatherData.main.humidity)
        
            //        let cityFound = weatherData.city.name
            //        city.textContent= "City: " +cityFound;
            //         console.log (weatherData.city.name )
                    
            //         let tempFound = weatherData.list[0].main.temp;
            //         temp.textContent = "Temperature: "+ tempFound + " Fahrenheit";
                    
            //         let windFound = weatherData.list[0].wind.speed
            //         wind.textContent = "Wind Speed: " + windFound + " MPH";
                    
            //         let humFound = weatherData.list[0].main.humidity
            //         humidity.textContent =  "Humidity: " +humFound + " %";
                    
            //         let iconEl = weatherData.list[0].weather.icon;
            //         icon.value = iconEl
                    
            // if (city === '') {    
            //     return;
            // }    
        
            // localStorage.setItem("Weather", JSON.stringify(weatherData));
            // createBtn(city)
        
      
        
})
}


form.addEventListener('submit', handleFormSubmit)
// form.addEventListener("submit", function (event){
//     event.preventDefault();
//     let city = cityInputEl.value.trim();
    
//     fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
//     .then(response => response.json())
//     .then(citiesFound =>{
//         let firstCity = citiesFound[0];
//         console.log(citiesFound)
//             console.log(firstCity)
//             console.log(firstCity.lat)
//             console.log(firstCity.lon)
//             console.log(firstCity.name)
            
            
//             let latLonQuery =  `https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&cnt=6&appid=`+apiKey+"&units=imperial";
            
//             return fetch(latLonQuery)
//             //  units=imperial for weather in Fahrenheit
//             // according to documentation - cnt is supposed to be for day but is showing every 3 hours in console
//         })
        
//         .then(response => response.json())
//         .then(weatherData =>{
//             console.log(weatherData)

//            let cityFound = weatherData.city.name
//            city.textContent= "City: " +cityFound;
//             console.log (weatherData.city.name )
            
//             let tempFound = weatherData.list[0].main.temp;
//             temp.textContent = "Temperature: "+ tempFound + " Fahrenheit";
            
//             let windFound = weatherData.list[0].wind.speed
//             wind.textContent = "Wind Speed: " + windFound + " MPH";
            
//             let humFound = weatherData.list[0].main.humidity
//             humidity.textContent =  "Humidity: " +humFound + " %";
            
//             let iconEl = weatherData.list[0].weather.icon;
//             icon.value = iconEl
            
//     if (city === '') {    
//         return;
//     }    

//     localStorage.setItem("Weather", JSON.stringify(weatherData));
//     createBtn(city)

// })    

// let storedCities = document.getElementById("storedCities")
// function createBtn(){
//     let newCityBtn = document.createElement("button");
//     storedCities.append(newCityBtn)
//     newCityBtn.textContent = cityInputEl.value.trim();
//     newCityBtn.addEventListener("click", function (event){
//         event.target
//         fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
//     .then(response => response.json())
//     .then(citiesFound =>{
//         let firstCity = citiesFound[0];
//         console.log(citiesFound)
//             console.log(firstCity)
//             console.log(firstCity.lat)
//             console.log(firstCity.lon)
            
//             let latLonQuery =  `https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&cnt=6&appid=`+apiKey+"&units=imperial";
    
//             return fetch(latLonQuery)
//             //  units=imperial for weather in Fahrenheit
//             // according to documentation - cnt is supposed to be for day but is showing every 3 hours in console
//         })
        
//         .then(response => response.json())
//         .then(weatherData =>{
//             console.log(weatherData)

//             let tempFound = weatherData.list[0].main.temp;
//             temp.textContent = "Temperature: "+ tempFound + " Fahrenheit";
            
//             let windFound = weatherData.list[0].wind.speed
//             wind.textContent = "Wind Speed: " + windFound + " MPH";
            
//             let humFound = weatherData.list[0].main.humidity
//             humidity.textContent =  "Humidity: " +humFound + " %";
            
//             let iconEl = weatherData.list[0].weather.icon;
//             icon.value = iconEl
            
//     if (city === '') {    
//         return;
//     }    

//     localStorage.setItem("Weather", JSON.stringify(weatherData));

// })    
//     })
// }
// })


