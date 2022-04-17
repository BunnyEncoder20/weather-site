// script.js

const API_KEY = '4e600e7afc1a7ebacd14c0dd2c6fad68' ;

//loading all the elements from html file
const time_element = document.getElementById('time');
const date_element = document.getElementById('date');
const current_weather_items_element = document.getElementById('current_weather_items');
const time_zone = document.getElementById('time_zone');
const country_element = document.getElementById('country');
const weather_forecast_element = document.getElementById('weather_forecast');
const current_temp_element = document.getElementById('current_temp');

const days = ['Sunday', 'Monday' ,'Tuesday' , 'Wednesday' , 'Thrusday' , 'Friday' , 'Saturday'];
const months = ['Jan', 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul', 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec'] ;

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();       //return 24hr format
    const hours_12hrs_format = hour >= 13 ? hour%12 : hour; //converting to 12hr format
    const ampm = hour >= 12 ? 'PM' : 'AM' ;
    let minute = time.getMinutes();
    minute = (minute < 10) ? '0' + minute : minute;

    time_element.innerHTML = hours_12hrs_format + ' : ' + minute + ' ' + `<span id="am_pm">${ampm}</span>`;
    date_element.innerHTML = days[day] + ' , ' + date + ' ' + months[month] ;
}, 1000);

getWeatherData();


function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success)=>{
        // console.log(success)
        lat = success.coords.latitude;
        lon = success.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data);
            showWeatherData(data);
        })
    }) 
}

function showWeatherData(data){
    let{humidity,pressure,sunrise,sunset,wind_speed} = data.current;
    var sr =new Date(sunrise*1000); var sr_hh = sr.getHours(); sr_mm = "0" + sr.getMinutes(); 
    // sr_mm = sr_mm<10 ? '0' + sr.getMinutes : sr.getMinutes ;       
    var ss =new Date(sunset*1000); var ss_hh = ss.getHours(); ss_mm = "0" + ss.getMinutes(); 
    // ss_mm = ss_mm<10 ? '0' + sr.getMinutes : sr.getMinutes;
     //by default the sunrise and sunset times are in Unix timespam format. x1000 to get the normal time
    //rest is formatting

    current_weather_items_element.innerHTML = `<div class="weather_items">
    <div>Humidity</div>
    <div>${humidity} %</div>
    </div>
    <div class="weather_items">
        <div>Pressure</div>
        <div>${pressure} hPa</div>
    </div>
    <div class="weather_items">
        <div>Wind Speeds</div>
        <div>${wind_speed} m/s</div>
    </div>
    <div class="weather_items">
        <div>Sunrise</div>
        <div>${sr_hh} : ${sr_mm.substr(-2)} hrs</div>   
    </div>
    <div class="weather_items">
        <div>Sunset</div>
        <div>${ss_hh} : ${ss_mm.substr(-2)} hrs</div>
    </div>`
    //sunstr(-2) will display only the last 2 string elements hence even when the minutes in 2 digit
    //which will give a string of ( eg : 012) 3 digit, it'll only show the last 2 digits
    
}