
const API_KEY = '566a3f328c08eeb1dba7fe64a7d5e21e';

const cityName = document.getElementById("CityName");
const cityCounsty = document.getElementById("CityCountry");
const temperatura = document.getElementById("Temp");
const niebo = document.getElementById("Niebo");
const wind = document.getElementById("Wind");
const Teraz = document.getElementById("Teraz");
const weatherIcon = document.getElementById("Weather_Icon")

const zmienne_tlo = document.getElementById("Zmienne_tlo");

const locationBtn = document.getElementById("Mylocation");
const searchBtn = document.getElementById("SearchBtn");
const citySearch = document.getElementById("CitySearch");

const ErrorMessage = document.getElementById("ErrorMessage");

//  Czas (DATA)

// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today  = new Date();



//  FIRST LATTER

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

//

const weatherInfo = (info) => {
    console.log('pogoda na dziś', info);
    cityName.textContent = `${info.name}, ${info.sys.country}`;
    cityCounsty.textContent = info.sys.country;
    temperatura.textContent = Math.round(info.main.temp) + " °C (" + Math.round(info.main.feels_like) +" °C)";
    niebo.textContent = capitalizeFirstLetter((info.weather[0].description));
    wind.textContent = "Wiatr: " +(info.wind.speed) + " m/s";
    ErrorMessage.textContent = "";
    Teraz.textContent = (today.toLocaleDateString("en-UK"));
    weatherIcon.src=`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`;

    if (info.main.temp >= 15) {
        zmienne_tlo.style.backgroundImage = "url(../img/8.jpg)";
    } else if (info.main.temp >= 10) {
        zmienne_tlo.style.backgroundImage = "url(../img/9.jpg)";
    } else if (info.main.temp >= 5) {
        zmienne_tlo.style.backgroundImage = "url(../img/4.jpg)";
    } else if (info.main.temp >= 0) {
        zmienne_tlo.style.backgroundImage = "url(../img/7.jpg)";
    } else if (info.main.temp >= -5) {
        zmienne_tlo.style.backgroundImage = "url(../img/1.jpg)";
    }

};

//

const getWeatherBySearch = (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=PL&appid=${API_KEY}`;
     fetch(URL)
     .then((res) => res.json())
     .then((res) => weatherInfo(res))
     .catch((err) => errMsg(err));
};



//Krok2 :  pobieramy info o pogodzie w naszej szerokości geograficznej i wywołujemy funkcję weatherInfo przekazując
// do nie odzpowiedź z naszego fletch/then
const getWeatherByLocation = (coords) => {
    console.log(coords)
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&lang=PL&appid=${API_KEY}`
    fetch(URL)
        .then((res) => res.json())
        .then((res) => weatherInfo(res))
        .catch((err) => console.log(err));
};

// Krok1 : uzskanie informacji na temat współrzędnych i przekazanie ich do funcji getWeatherByLocation
// a nastepnie wywołanie jej
const getMyLocation = () => {
    return navigator.geolocation.getCurrentPosition((position) => getWeatherByLocation(position.coords));

};
getMyLocation();


const getSearchResoult = () => {
    if (citySearch.value !== "") {
    return getWeatherBySearch(citySearch.value);
} else {
    console.log("Nic nie wpisano");
}};

searchBtn.addEventListener("click", getSearchResoult);

locationBtn.addEventListener("click", getMyLocation);


const errMsg = (err) => {
    return ErrorMessage.textContent = "Miasto nie istnieje.";
};
ErrorMessage.textContent = "";

// ENTER
citySearch.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("SearchBtn").click();
    }
});
//   



