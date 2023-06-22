import * as alt from 'alt-client';
import * as native from 'natives';
let oldWeather = 'SUNNY';
let currentWeather;

// Events
alt.onServer('syncWeather', setWeather);

alt.onServer('syncTime', setTime);

// Functions
function setWeather(weather, time) {
    currentWeather = weather;
    if(time === 0) {
        native.setWeatherTypeNowPersist(weather);
    } else {
        if(oldWeather != currentWeather) {
            let i = 0;
            let inter = alt.setInterval(() => {
                i++;
                if(i < 100) {
                    native.setCurrWeatherState(native.getHashKey(oldWeather), native.getHashKey(currentWeather), (i / 100));
                } else {
                    alt.clearInterval(inter)
                    oldWeather = currentWeather;
                }
            }, (time * 10))
        }
        if(weather === 'XMAS') {
            native.useSnowWheelVfxWhenUnsheltered(true);
            native.useSnowFootVfxWhenUnsheltered(true);
        } else {
            native.useSnowWheelVfxWhenUnsheltered(false);
            native.useSnowFootVfxWhenUnsheltered(false);
        }
    }
}

function setTime(time, msperminute) {
   
 native.setClockTime(time.hour, time.minute, time.second)
    
    if(msperminute != alt.getMsPerGameMinute()) {
        alt.setMsPerGameMinute(msperminute);
    }
}