import * as alt from 'alt-client';
import * as native from 'natives';

const positions = [
  { x: 138.0311, y: -2478.3523, z: 6.0000, h: 235.07403564453125},
  { x: 89.8781, y: 181.8010, z: 104.6806, h: 157.3683319091797 },
  { x: 1455.9592, y: -1687.9740, z: 66.3521, h: 119.00227355957031 },
  { x: -1173.7543, y: -1389.8621, z: 4.8470, h: 126.56779479980469 },
]

const delivery = [
 { x: 1997.273071, y: 3062.091309, z: 46.789749 },
 { x: -2176.3030, y: 4271.9600, z: 49.0313 },
 { x: 258.8684, y: 2578.5417, z: 45.1406 },
 { x: 2341.0620, y: 2531.4172, z: 46.6677 },
 { x: 99.7583, y: 3742.2959, z: 39.7334 }
]

const cars = [
  'boxville4', 'mule2', 'burrito2', 'benson'
]
let dest;
let carpos;

alt.onServer('weed', ()=>{
  dest = delivery[native.getRandomIntInRange(0, delivery.length-1)];
  carpos = positions[native.getRandomIntInRange(0, positions.length-1)];
  let mobil = cars[native.getRandomIntInRange(0, cars.length-1)];
  alt.emitServer('weedstart', dest, carpos, mobil);
})

let weedveh, send, vehb;
let minute = 14
let second = 60
let timermin;
let timersec;
let marker = 0;

alt.onServer("weedinfo", (veh) => {
  weedveh = veh;
  native.playSound(0, "Event_Start_Text", "GTAO_FM_Events_Soundset", true, 0 ,false)
  if(alt.hasMeta('mission')){

  } else {
    let weedinfo = alt.everyTick(()=>{
      drawtext('~g~DELIVERY JOB~g~',0.5,0.25,7,1.3,0.9,255,0,0,255);
      drawtext('DRIVER NEEDED! GO TO GREEN MARKER ON MAP!',0.5,0.32,4,0.7,0.9,255, 255, 255,255);
    })
    let info = alt.setInterval(()=>{
      alt.clearEveryTick(weedinfo);
      alt.clearInterval(info);
    }, 5000);
  }
  alt.emit('notif', '~g~Delivery Job ~w~Go to green marker on map')
    let weedstart = native.addBlipForCoord(carpos.x, carpos.y, carpos.z)
    native.setBlipSprite(weedstart, 501);
    native.setBlipColour(weedstart, 69);
    native.setBlipAsShortRange(weedstart, false);
    native.setBlipFlashes(weedstart, true);
    native.setBlipNameFromTextFile(weedstart, 'weed job');

    let weedcount = alt.setInterval(()=>{
      let pos = alt.Player.local.pos;
      let weedjarak = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, carpos.x, carpos.y, carpos.z, true);
      if(weedjarak < 50) {
        
        alt.emitServer('weedready');
        native.setEntityHeading(veh, carpos.h);
        native.setVehicleOnGroundProperly(veh, 5.0);
      if(weedjarak < 5) {
        alt.clearInterval(weedcount);
        native.removeBlip(weedstart);
        vehb = native.addBlipForEntity(veh);
        native.setBlipSprite (vehb, 501);
        native.setBlipColour(vehb, 3);
        send = native.addBlipForCoord(dest.x, dest.y, dest.z);
        native.setBlipRoute(send, true);
        delivertime()
        let deliver = alt.setInterval(()=>{
          if(minute == 0 && second == 0) {
            alt.clearInterval(deliver);
            weedfailed("TIME OUT!")
          }
          let carhealth = native.getVehicleEngineHealth(veh);
          if(carhealth <= 0) {
            alt.clearInterval(deliver);
            alt.clearInterval(timermin);
            alt.clearInterval(timersec);
            weedfailed("VEHICLE DESTROYED!")
          }
          let jarakdeliver = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, dest.x, dest.y, dest.z,true);
          if(jarakdeliver < 50) {
            if(marker == 0) {
              marker += 1
              alt.emit('marker', 1, dest.x, dest.y, dest.z-2,3,3,2,150,150,0,100,0)
            } else {}
            //native.drawMarker(1, dest.x, dest.y, dest.z-2, 0,0,0,0,0,0,3,3,2,150,150,0,100,0,0,0,0,0,0,0);
          if(jarakdeliver < 1) {
            if(alt.Player.local.vehicle == veh) {
            alt.clearInterval(deliver);
            alt.clearInterval(timermin);
            alt.clearInterval(timersec);
            alt.emit('marker', 1, 0,0,0,4,4,2,0,0,0,0)
            alt.emit('timerbar', 0, ["", "", 0], ["", "", 0], ["", "", 0])
            alt.emitServer('weedjobfinish');
            native.playSound(0, "package_delivered_success", "DLC_GR_Generic_Mission_Sounds", true, 0 ,false)
            native.freezeEntityPosition(veh, true);
            native.taskLeaveVehicle(alt.Player.local.scriptID, veh, 1);
            native.setVehicleDoorsLockedForAllPlayers(veh, true);
              native.clearAllBlipRoutes()
              native.removeBlip(vehb);
                native.removeBlip(send);
            let weedinfo = alt.everyTick(()=>{
              drawtext('~g~WEED DELIVERED~g~',0.5,0.25,7,1.6,1.0,255,0,0,255);
              drawtext('JOB COMPLETE! YOU GOT $20000',0.5,0.32,4,0.7,0.9,255, 255, 255,255);
            })
            let info = alt.setInterval(()=>{
              alt.clearEveryTick(weedinfo);
              alt.clearInterval(info);
            }, 5000);
          } else {}
        }
      }}, 1000)
      }
     } else {}

}, 1000);

});

function delivertime() {
  timermin = alt.setInterval(()=>{
      minute -= 1;
      if(minute == 0) {
        clearInterval(timermin);
      }
    }, 60000)
  timersec = alt.setInterval(()=>{
    if(second == 0) {
      second = 60;
    }
      second -= 1;
    if(minute == 0 && second == 0) {
      alt.clearInterval(timersec);
    }
    
    alt.emit('timerbar',1, ["TIME REMAINING", String(minute).padStart(2, '0')+":"+String(second).padStart(2, '0'), 140], ["", "", 0], ["", "", 0])
    },1000)
}

function weedfailed(text) {
  alt.emit('timerbar', 0, ["", "", 0], ["", "", 0], ["", "", 0])
  native.playSound(0, "ScreenFlash", "MissionFailedSounds", true, 0 ,false)
  native.clearAllBlipRoutes();
    native.removeBlip(vehb);
    native.removeBlip(send);
    alt.emitServer('weedjobfail');
    let weedinfo = alt.everyTick(()=>{
      drawtext('~y~JOB FAILED~y~',0.5,0.25,7,1.6,1.0,255,0,0,255);
      drawtext(text,0.5,0.32,4,0.7,0.9,255, 255, 255,255);
    })
    let info = alt.setInterval(()=>{
      alt.clearEveryTick(weedinfo);
      alt.clearInterval(info);
    }, 5000)
}

function attach(entity, xrot, yrot, zrot){
  let player = alt.Player.local.scriptID;
  let bone = game.getPedBoneIndex(player, 0x8cbd);
  let pos = game.getPedBoneCoords(player, 0x8cbd, 0,0,0);
  let object = game.createObject((native.getHashKey(entity)), pos.x, pos.y, pos.z, false, false, true);
  native.attachEntityToEntity(object, player, bone, 0.09, 0.02, 0.05,xrot, yrot, zrot, false, true, false, true, 1, true );
  let burinterval = alt.setInterval(() => {
    native.deleteEntity(object);
    alt.clearInterval(burinterval);
  },3000);
}

function handletext(text) {
	game.beginTextCommandDisplayHelp("STRING");
	game.addTextComponentSubstringKeyboardDisplay(text);
	game.endTextCommandDisplayHelp(0, 0, true, -1);
};

function playanim(animdict, animname){
  game.requestAnimDict(animdict);
    let interval = alt.setInterval(() => { 
        if (game.hasAnimDictLoaded(animdict)) {
            alt.clearInterval(interval);
            game.taskPlayAnim(alt.Player.local.scriptID, animdict, animname, 8.0, 1, 3000, 49, 1, false, false, false);
        }
}, 0);
}

function drawtext(msg, x, y, font, scale, wrap, r, g, b, a,) {
  native.beginTextCommandDisplayText('STRING');
  native.addTextComponentSubstringPlayerName(msg);
  native.setTextFont(font);
  native.setTextOutline();
  native.setTextScale(1, scale);
  native.setTextWrap(0.0, wrap);
  native.setTextCentre(true);
  native.setTextColour(r,g,b,a);
  native.setTextJustification(0);
  native.setTextDropShadow(true);
  native.endTextCommandDisplayText(x, y, 0);
}