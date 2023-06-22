import * as alt from 'alt-server';

// Weather
let currentWeather = 'SUNNY'
const weathers = [
    'EXTRASUNNY', 
    'CLEAR', 
  'NEUTRAL', 
    'SMOG', 
    'FOGGY', 
    'OVERCAST', 
    'CLOUDS', 
    'CLEARING', 
    'RAIN', 
    'THUNDER', 
   'SNOW', 
  'BLIZZARD', 
   'SNOWLIGHT', 
   // 'XMAS', 
   // 'HALLOWEEN',
]

// Time
let time = {
    hour: 20,
    minute: 0,
    second: 0,
}
let msperminute = 2000;

// Events
alt.onClient('settime', (player) => {
    //setTimeout(() => {
        alt.emitClientRaw(player, 'syncWeather', currentWeather, 0);
        alt.emitClientRaw(player, 'syncTime', time, msperminute);

   // }, 5000)
})

alt.on('changeCurrentWeather', changeCurrentWeather);

// Functions
export function changeCurrentWeather(weather, time) {
    currentWeather = weather;
    console.log(`[AWTS] Changed weather to ${weather}`)
    alt.Player.all.forEach(player => {
        alt.emitClient(player, 'syncWeather', currentWeather, time);
    });
}

export function changeCurrentTime(hour, minute, second) {
    time.hour = hour;
    time.minute = minute;
    time.second = second;
    console.log(`[AWTS] Changed time to ${hour}:${minute}:${second}`)
    alt.Player.all.forEach(player => {
        alt.emitClient(player, 'syncTime', time, msperminute);
    });
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

// Intervals

// Weather
setInterval(() => {
    let weather = weathers[randomInt(weathers.length)];
    changeCurrentWeather(weather, 30);
}, 60000*35)

setInterval(() => {
    if(time.minute == 60) {
        time.minute = 0;
    }
    time.minute += 1;
}, 2000)

setInterval(() => {
    if(time.hour == 24) {
        time.hour = 0;
    } 
    time.hour += 1;
    if(time.hour >= 7 && time.hour < 20) {
        alt.emitAllClients('setcarwandertime', 1000)
    } else if(time.hour > 20 || time.hour < 7) {
        alt.emitAllClients('setcarwandertime', 6000)
    }
    //alt.log(time);
}, 120000)

