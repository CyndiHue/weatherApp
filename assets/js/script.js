let apiKey = "ae43fce93221a7479e25011f753d1c95";
let cityName = document.querySelector("#cityName");
let storedCities = document.getElementById("storedCities")
let cityInputEl = document.getElementById("cityInput");

let form = document.getElementById("city-form");
let currentDate =dayjs().format('MMM DD, YYYY');
let currentDateEl = document.getElementById("currentDay")
currentDateEl.textContent = currentDate;

form.addEventListener('submit', handleFormSubmit)


function handleFormSubmit(event){
    
    event.preventDefault();

    document.getElementById('currentWeather').innerHTML = '';
    document.getElementById('forecastWeather').innerHTML = '';

    let city = cityInputEl.value.trim()
    runDailyWeather(city)
    runForecast(city)
    createBtn(city)
   
}

function createBtn(){
    let newCityBtn = document.createElement("button");
    storedCities.append(newCityBtn)
    newCityBtn.textContent = cityInputEl.value.trim();
    newCityBtn.addEventListener("click", function (event){event.target})
    
}

function runDailyWeather(city){
    let url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`+apiKey+"&units=imperial";
    
    
    fetch(url)
    .then(res=> res.json())
    .then(weatherData =>{
        console.log(weatherData)
        console.log(weatherData.weather[0].icon)

        const card = document.createElement('div')
        const cardTitle = document.createElement('h2')
        const cardBody = document.createElement('div')
        const cardIcon = document.createElement('p')
        const cardTemp = document.createElement('p')
        const cardWind = document.createElement('p')
        const cardHumid = document.createElement('p')

        card.setAttribute('class', 'col-12 col-md-8')
        cardBody.setAttribute('class', 'card-body')
        cardTitle.setAttribute('class', 'card-header  bg-info-subtle')
        // cardIcon.setAttribute('class', 'card-text')
        cardTemp.setAttribute('class', 'card-text')
        cardWind.setAttribute('class', 'card-text')
        cardHumid.setAttribute('class', 'card-text')

        cardTitle.textContent = weatherData.name
        cardTemp.textContent = "Temperature: "+weatherData.main.temp
        // cardIcon.textContent = "Icon: "+weatherData.weather[0].description
        cardWind.textContent = "Wind: "+weatherData.wind.speed
        cardHumid.textContent = "Humidity: "+weatherData.main.humidity

        cardBody.append(cardTitle, cardTemp, cardWind, cardHumid, cardIcon)
        card.append(cardBody)
        document.getElementById('currentWeather').append(card)

        localStorage.setItem("Weather", JSON.stringify(weatherData));
        })
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
                        cardTitle.setAttribute('class', 'card-header  bg-info-subtle')
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
                        document.getElementById('forecastWeather').append(card)
                    }
                    
        
                    localStorage.setItem("Weather", JSON.stringify(weatherData));
        
        })
}








