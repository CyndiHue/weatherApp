let apiKey = "ae43fce93221a7479e25011f753d1c95";
let cityName = document.querySelector("#cityName");
let storedCities = document.getElementById("storedCities")
let cityInputEl = document.getElementById("cityInput");
let form = document.getElementById("city-form");
let currentDate =dayjs().format('MMM DD, YYYY');
let currentDateEl = document.getElementById("currentDay")
currentDateEl.textContent = currentDate;


form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const city = cityInputEl.value.trim();
    if (city) {
        // Only run the functions if city is defined and not empty
        console.log(event.textContent);
        handleFormSubmit(event);
        createBtn(city);
    }
    // Reset the input field
    cityInputEl.value = "";});

function handleFormSubmit(event){
    event.preventDefault();
    document.getElementById('currentWeather').innerHTML = '';
    document.getElementById('forecastWeather').innerHTML = '';
    const city = cityInputEl.value.trim()

    runDailyWeather(city)
    runForecast(city)}

function createBtn() {
    const cityName = cityInputEl.value.trim();
    // Check if a button already exists
    const existingButton = Array.from(storedCities.children).find(button => button.textContent === cityName);

    if (!existingButton) {
        let newCityBtn = document.createElement("button");
        newCityBtn.textContent = cityName;
        newCityBtn.setAttribute('class','btn btn-outline-secondary')
        storedCities.append(newCityBtn);

        const storedCitiesArray = JSON.parse(localStorage.getItem('storedCities')) || [];
        storedCitiesArray.push(cityName);
        localStorage.setItem('storedCities', JSON.stringify(storedCitiesArray));
        // needs this code. before reload this makes the btns clickable, needs to be local since there is another btn on the page
        newCityBtn.addEventListener("click", function (event) {
            event.target.textContent;
            console.log(event.target.textContent);
            cityInputEl.value = event.target.textContent;
            handleFormSubmit(event);
});}}

function runDailyWeather(city){
    let url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`+apiKey+"&units=imperial";
    
    fetch(url)
    .then(res=> res.json())
    .then(weatherData =>{
        const card = document.createElement('div')
        const cardTitle = document.createElement('h2')
        const cardBody = document.createElement('div')
        const cardIcon = document.createElement('img')
        const cardTemp = document.createElement('p')
        const cardWind = document.createElement('p')
        const cardHumid = document.createElement('p')

        card.setAttribute('class', 'col-12')
        cardIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+weatherData.weather[0].icon+'@2x.png')
        cardBody.setAttribute('class', 'card-body')
        cardTitle.setAttribute('class', 'card-header  bg-info-subtle')
        cardTemp.setAttribute('class', 'card-text')
        cardWind.setAttribute('class', 'card-text')
        cardHumid.setAttribute('class', 'card-text')

        cardTitle.textContent = weatherData.name
        cardTemp.textContent = "Temperature: "+weatherData.main.temp + " °F"
        cardWind.textContent = "Wind: "+weatherData.wind.speed  + " MPH"
        cardHumid.textContent = "Humidity: "+weatherData.main.humidity  + " %"

        cardBody.append(cardTitle, cardTemp, cardWind, cardHumid, cardIcon)
        card.append(cardBody)
        document.getElementById('currentWeather').append(card)
})}

function runForecast(city){
    let forecastUrl =  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=`+apiKey+"&units=imperial";

    fetch(forecastUrl)
    .then(res=> res.json())
    .then(weatherData =>{
        console.log(weatherData)
        // had to hard code line 111 due to the fact api renders every 3 hours and not daily
        var forecastArray = [weatherData.list[7], weatherData.list[15], weatherData.list[23], weatherData.list[31], weatherData.list[39]]
        // loops through the forecastArray and creates a card for each day selected
        for (let index = 0; index < forecastArray.length; index++) {
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
            cardIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+forecastArray[index].weather[0].icon+'@2x.png')
            cardTitle.setAttribute('class', 'card-header  bg-info-subtle')
            cardTemp.setAttribute('class', 'card-text')
            cardWind.setAttribute('class', 'card-text')
            cardHumid.setAttribute('class', 'card-text')
            
            cardTitle.textContent = forecastArray[index].dt_txt
            cardTemp.textContent = "Temperature: "+forecastArray[index].main.temp + " °F"
            cardWind.textContent = "Wind: "+forecastArray[index].wind.speed+ " MPH"
            cardHumid.textContent = "Humidity: "+forecastArray[index].main.humidity  + " %"

            cardBody.append(cardTitle, cardTemp, cardWind, cardHumid, cardIcon)
            card.append(cardBody)
            document.getElementById('forecastWeather').append(card)
}})}

window.addEventListener('load', function () {
    const storedCitiesArray = JSON.parse(localStorage.getItem('storedCities')) || [];
    const cityName = cityInputEl.value.trim();
    // Create buttons for each stored city
    storedCitiesArray.forEach(cityName => {
        let newCityBtn = document.createElement("button");
        newCityBtn.setAttribute('class', 'btn btn-outline-secondary')
        newCityBtn.textContent = cityName;
        storedCities.append(newCityBtn);
        //not duplicate since make btns from local storage clickable
        newCityBtn.addEventListener("click", function (event) {
            event.target.textContent;
            console.log(event.target.textContent);
            cityInputEl.value = event.target.textContent;
            handleFormSubmit(event);
            cityInputEl.value = "";
});});});

let clearSearch = document.getElementById("clearSearches");

clearSearch.addEventListener('click', function(event){
    event.target
    console.log(event.target)
    localStorage.clear();
    location.reload();
})
