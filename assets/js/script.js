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
    cityInputEl.value = ""
}

function createBtn(){
    let newCityBtn = document.createElement("button");
    storedCities.append(newCityBtn)
    newCityBtn.textContent = cityInputEl.value.trim();
    newCityBtn.addEventListener("click", function (event){
        event.target.textContent
        console.log(event.target.textContent)
        cityInputEl.value = event.target.textContent
        handleFormSubmit(event)
    })
}

function runDailyWeather(city){
    let url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`+apiKey+"&units=imperial";
    
    fetch(url)
    .then(res=> res.json())
    .then(weatherData =>{
        console.log(weatherData)
        // console.log(weatherData.weather[0].icon)

        const card = document.createElement('div')
        const cardTitle = document.createElement('h2')
        const cardBody = document.createElement('div')
        const cardIcon = document.createElement('img')
        const cardTemp = document.createElement('p')
        const cardWind = document.createElement('p')
        const cardHumid = document.createElement('p')

        card.setAttribute('class', 'col-12 col-md-8')
        cardIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+weatherData.weather[0].icon+'@2x.png')
        cardBody.setAttribute('class', 'card-body')
        cardTitle.setAttribute('class', 'card-header  bg-info-subtle')
        cardTemp.setAttribute('class', 'card-text')
        cardWind.setAttribute('class', 'card-text')
        cardHumid.setAttribute('class', 'card-text')

        cardTitle.textContent = weatherData.name
        cardTemp.textContent = "Temperature: "+weatherData.main.temp
        cardWind.textContent = "Wind: "+weatherData.wind.speed
        cardHumid.textContent = "Humidity: "+weatherData.main.humidity

        cardBody.append(cardTitle, cardTemp, cardWind, cardHumid, cardIcon)
        card.append(cardBody)
        document.getElementById('currentWeather').append(card)

        localStorage.setItem("currentWeather", JSON.stringify(weatherData));
        })
}

function runForecast(city){
    let forecastUrl =  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=`+apiKey+"&units=imperial";

    fetch(forecastUrl)
    .then(res=> res.json())
    .then(weatherData =>{
                    console.log(weatherData)
                    var forecastArr = [weatherData.list[7], weatherData.list[15], weatherData.list[23], weatherData.list[31], weatherData.list[39]]

                    for (let index = 0; index < forecastArr.length; index++) {
                        const card = document.createElement('div')
                       const cardBody = document.createElement('div')
                       const cardTitle = document.createElement('h5')
                       const cardIcon = document.createElement('img')
                       const cardTemp = document.createElement('p')
                       const cardWind = document.createElement('p')
                       const cardHumid = document.createElement('p')
                       
                       card.setAttribute('style', 'width:18rem;')
                       card.setAttribute('class', 'card')
                        cardBody.setAttribute('class', 'card-body')
                        cardIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+forecastArr[index].weather[0].icon+'@2x.png')
                        cardTitle.setAttribute('class', 'card-header  bg-info-subtle')
                        cardTemp.setAttribute('class', 'card-text')
                        cardWind.setAttribute('class', 'card-text')
                        cardHumid.setAttribute('class', 'card-text')
                        
                        cardTitle.textContent = forecastArr[index].dt_txt
                        cardTemp.textContent = "Temperature: "+forecastArr[index].main.temp
                        cardWind.textContent = "Wind: "+forecastArr[index].wind.speed
                        cardHumid.textContent = "Humidity: "+forecastArr[index].main.humidity
                        // cardIcon.textContent = forecastArr[index].main.humidity

                        cardBody.append(cardTitle, cardTemp, cardWind, cardHumid, cardIcon)
                        card.append(cardBody)
                        document.getElementById('forecastWeather').append(card)
                    }
                    
        
                    localStorage.setItem("Weather", JSON.stringify(weatherData));
        
        })
}








