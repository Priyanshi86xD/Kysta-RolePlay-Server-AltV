import alt, { hasMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import { VehicleData } from './vehicles.js';

const positions = [
  { x: 708.7499, y: 609.2136, z: 128.2219, h:340.5360107421875 },
  { x: 2660.1345, y: 1707.6265, z: 23.9202, h:87.7186279296875},
  { x: 258.8010, y: 2587.7776, z: 44.3179, h:9.986881256103516 },
  { x: -1496.5577, y: 1517.1781, z: 114.5041, h:72.25038146972656 },
  { x: -2526.3696, y: 2346.3916, z: 32.4238, h:33.05533218383789 },
]

const delivery = [
  { x: 1210.6952, y: -1257.3966, z: 35.2267},
  { x: 1764.1366, y: -1654.3051, z: 112.6622 },
  { x: 995.7741, y: -1858.9189, z: 30.8898 },
  { x: 804.5392, y: -2224.4612, z: 29.5241 },
  { x: 144.1873, y: -3001.3721, z: 7.0311 },
  { x: -70.1811, y: -1823.9192, z: 26.9420 },
  { x: -634.8464, y: -1780.8267, z: 24.1101 },
  { x: -511.8915, y: -2198.9004, z: 6.3940 },
  { x: -1154.1410, y: -2172.7271, z: 13.2551 },
]

const vehicles = VehicleData.filter(function(vehicle) {
  return vehicle.class == 'SUPER';
})

let spawn;
let dest;
let targetcar;
let carblip;
let targetdest;

alt.onServer('repo1', ()=>{
let car = vehicles[native.getRandomIntInRange(0, vehicles.length-1)];
spawn = positions[native.getRandomIntInRange(0, positions.length-1)];
dest = delivery[native.getRandomIntInRange(0, delivery.length-1)];

alt.emitServer('repostart', car.name, spawn)
})

alt.onServer('repoinfo', (reppos, veh)=>{
  let cararea = native.addBlipForRadius(reppos.x, reppos.y, reppos.z, 120);
      native.setBlipColour(cararea, 3);
      native.setBlipAlpha(cararea, 105);
     if(hasMeta('mission')) {} else {
      let repoinfo = alt.everyTick(()=>{
        native.playSound(0, "Event_Start_Text", "GTAO_FM_Events_Soundset", true, 0 ,false)
        drawtext('~y~VEHICLE CARGO JOB~y~',0.5,0.25,7,1.3,0.9,255,0,0,255);
        drawtext('FIND THE TARGET CAR, AND DELIVER IT TO WAREHOUSE!',0.5,0.32,4,0.7,0.9,255, 255, 255,255);
      })
      let info = alt.setInterval(()=>{
        alt.clearEveryTick(repoinfo);
        alt.clearInterval(info);
      }, 5000);
     }
    alt.emit('notif', '~b~Vehicle Cargo Job ~w~go to blue area on your map')
      
let repocount = alt.setInterval(()=>{
let pos = alt.Player.local.pos;
      let repojarak = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, spawn.x, spawn.y, spawn.z,true);
      if(repojarak < 100) {
        alt.emitServer('startrepo', dest);
        let heading = alt.setInterval(()=>{
          native.setEntityHeading(veh, reppos.h);
          native.setVehicleOnGroundProperly(veh, 5.0);
          native.setVehicleBodyHealth(veh, 1000.0);
          alt.clearInterval(heading);
        }, 500);
        if(repojarak < 10) {
          alt.clearInterval(repocount);
          carblip = native.addBlipForEntity(veh);
          native.setBlipSprite(carblip, 523);
          native.setBlipColour(carblip, 3);
          native.removeBlip(cararea);
          
        }
}}, 1000);
})

let minute = 14
let second = 60
let timermin,timersec,fakemin = 15;
let repotarget;
let bodyhealth;
let cost;
let earn;

function delivertime() {
timermin = alt.setInterval(()=>{
    minute -= 1;
    fakemin -= 1;
    if(fakemin == 0) {
      minute = 0
      clearInterval(timermin);
    }
  }, 60000)
timersec = alt.setInterval(()=>{
  if(second == 0) {
    second = 60;
  }
    second -= 1;
  if(fakemin == 0 && second == 0) {
    alt.clearInterval(timersec);
  }
  
  let damage = Math.round((1000-bodyhealth)*0.1);
  cost = Math.round(damage*100)
  alt.emit('timerbar',1, ["TIME LEFT", String(minute).padStart(2, '0')+":"+String(second).padStart(2, '0'), 140], ["REPAIR COST", "$"+cost, 140], ["DAMAGE", damage+" %", 140])
  },1000)
}

alt.onServer('repodeliver', (veh)=>{
  delivertime();
    targetdest = native.addBlipForCoord(dest.x, dest.y, dest.z);
    native.setBlipRoute(targetdest, true);
    
    native.prepareMusicEvent("BKR_RESCUE_CONTACT_POLICE_START")
  native.triggerMusicEvent("BKR_RESCUE_CONTACT_POLICE_START")
    repotarget = alt.everyTick(()=>{
    if(fakemin == 0 && second == 0) {
      alt.clearEveryTick(repotarget);
      repofailed("TIME OUT!")
    }
    let carhealth = native.getVehicleEngineHealth(veh);
    let carcond = native.isEntityInWater(veh);
    bodyhealth = native.getVehicleBodyHealth(veh);

    if(carcond == true) {
      native.setVehicleEngineHealth(veh, -1000);
    }
    if(carhealth <= 0) {
      alt.clearEveryTick(repotarget);
      alt.clearInterval(timermin);
      alt.clearInterval(timersec);
      repofailed("VEHICLE DESTROYED!")
  }
        let pos = alt.Player.local.pos;
      let repojarak = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, dest.x, dest.y, dest.z-0.5,false);
      if(repojarak < 50) {
        native.drawMarker(1, dest.x, dest.y, dest.z-1.1, 0,0,0,0,0,0,3,3,2,150,150,0,100,0,0,0,0,0,0,0);
      if(repojarak < 2) {
        if(alt.Player.local.vehicle == veh) {
          if(repotarget > 0) {
            alt.clearEveryTick(repotarget);
            alt.clearInterval(timermin);
            alt.clearInterval(timersec);
            repotarget = 0
          }
        native.triggerMusicEvent('GLOBAL_KILL_MUSIC');
        alt.emitServer('repofinish', 25000-cost);
        alt.emit('timerbar', 0, ["", "", 0], ["", "", 0], ["", "", 0])
        native.playSound(0, "package_delivered_success", "DLC_GR_Generic_Mission_Sounds", true, 0 ,false)
        native.freezeEntityPosition(veh, true);
              native.taskLeaveVehicle(alt.Player.local.scriptID, veh, 1);
              native.setVehicleDoorsLockedForAllPlayers(veh, true);
              native.clearAllBlipRoutes()
          native.removeBlip(carblip);
          native.removeBlip(targetdest);
          
          let jobinfo = alt.everyTick(()=>{
              drawtext('~y~CAR DELIVERED~y~',0.5,0.25,7,1.6,1.0,255,0,0,255);
              drawtext("JOB COMPLETE! YOU GOT $ "+(25000-cost),0.5,0.32,4,0.7,0.9,255, 255, 255,255);
            })
            let info = alt.setInterval(()=>{
              alt.clearEveryTick(jobinfo);
              alt.clearInterval(info);
            }, 5000);
      } else {}
    }}
})
})

function repofailed(text) {
  native.triggerScreenblurFadeOut(1000);
  native.triggerMusicEvent('GLOBAL_KILL_MUSIC');
      native.playSound(0, "ScreenFlash", "MissionFailedSounds", true, 0 ,false)
      native.clearAllBlipRoutes();
        native.removeBlip(carblip);
        native.removeBlip(targetdest);
        alt.emitServer('repojobfail');
        alt.emit('timerbar', 0, ["", "", 0], ["", "", 0], ["", "", 0])
        let weedinfo = alt.everyTick(()=>{
          drawtext('~y~JOB FAILED~y~',0.5,0.25,7,1.6,1.0,255,0,0,255);
          drawtext(text,0.5,0.32,4,0.7,0.9,255, 255, 255,255);
        })
        let info = alt.setInterval(()=>{
          alt.clearEveryTick(weedinfo);
          native.triggerScreenblurFadeIn(1000)
          alt.clearInterval(info);
        }, 5000)
}

function drawtext(msg, x, y, font, scale, wrap, r, g, b, a,) {
  native.beginTextCommandDisplayText('STRING');
  native.addTextComponentSubstringPlayerName(msg);
  native.setTextFont(font);
  native.setTextScale(1, scale);
  native.setTextWrap(0.0, wrap);
  native.setTextCentre(true);
  native.setTextColour(r,g,b,a);
  native.setTextJustification(0);
  native.setTextDropShadow(true);
  native.endTextCommandDisplayText(x, y, 0);
  
}