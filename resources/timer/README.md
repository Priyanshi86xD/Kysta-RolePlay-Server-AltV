# Alt:V Weather and Time Sync

Created by Mateq

---

# Description

This is my attempt on syncing weather with smooth transition and time (Without date). 

## Installing Dependencies / Installation

Requirements:
-   An Existing or New Gamemode
-   General Scripting Knowledge

Afterwards, simply add the name of this resource to your `server.cfg` resource section.

`altv-os-weather-time-sync`

Then simply clone this repository into your main server resources folder.

```
cd resources
git clone https://github.com/MateqB/altv-os-weather-time-sync
```

Ensure your `package.json` includes this property:

```json
"type": "module"
```
---

## Changing weather

```javascript
// Server side
alt.emit('changeCurrentWeather', weather, transitiontime);
```

| Argument                            | Description                                                                |
| ----------------------------------- | -------------------------------------------------------------------------- |
| `weather`                           | Weather (String)                                                           |
| `transitiontime`                    | Time of the transition between weathers.                                   |

All weather types:
  -  EXTRASUNNY
  -  CLEAR 
  -  NEUTRAL 
  -  SMOG 
  -  FOGGY
  -  OVERCAST
  -  CLOUDS
  -  CLEARING
  -  RAIN
  -  THUNDER
  -  SNOW 
  -  BLIZZARD 
  -  SNOWLIGHT
  -  XMAS
  -  HALLOWEEN

---

## Changing time

```javascript
// Server side
alt.emit('changeCurrentTime', hour, minute, second); 
```

| Argument                            | Description                                                                |
| ----------------------------------- | -------------------------------------------------------------------------- |
| `hour`                              | Clock hour.                                                                |
| `minute`                            | Clock minute.                                                              |
| `second`                            | Clock second.                                                              |

---
