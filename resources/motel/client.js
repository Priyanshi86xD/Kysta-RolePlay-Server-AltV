import * as alt from 'alt-client';
import { getMeta, setMeta, deleteMeta } from 'alt-client';
import * as native from 'natives';
import * as game from 'natives';
import { beds, sofa } from './objects.js';
import { sofapos, tvchannels, tvprops } from './house.js';

const houserent = { x: -128.8566, y: -1494.8740, z: 33.7659, x1: -137.2683, y1: -1496.3759, z1: 33.3065 , h:51 }

const houseroom = [
    { x: -113.2367, y: -1478.9883, z: 33.8227 },
    { x: -108.0712, y: -1473.1377, z: 36.9922 },
    { x: -113.6448, y: -1467.6903, z: 36.9921 },
    { x: -120.1605, y: -1478.3247, z: 36.9921 },
    { x: -132.0667, y: -1462.9281, z: 36.9921 },
    { x: -127.4424, y: -1457.2180, z: 37.7919 },
    { x: -127.5794, y: -1457.4696, z: 33.8227 },
    { x: -131.8132, y: -1463.4185, z: 33.8226 },
    { x: -127.4632, y: -1457.2163, z: 37.7919 }
]

const interior = {x: 151.5280, y: -1006.6825, z: -98.99999}

alt.onServer('house', ()=>{
  let coord = houserent;
  let room = houseroom[getRandomListEntry(houseroom)]
  let dest = native.addBlipForCoord(coord.x, coord.y, coord.z);
  native.setBlipRoute(dest, true);
  let housedest = alt.everyTick(()=>{
    let jarak = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, coord.x, coord.y, coord.z, true);
    if(jarak < 50) {
      native.drawMarker(1, coord.x, coord.y, coord.z-1.1, 0,0,0,0,0,0, 2,2,1, 150,150,0,100,0,0,0,0,0,0,0);
      if(jarak < 2) {
        alt.clearEveryTick(housedest);
        alt.emitServer('motelarrive', coord, room);
        native.removeBlip(dest);
        native.clearAllBlipRoutes();
        savehouse(room, coord, interior);
      }
    }
  })
})

let kasur;
let ranjang;
let insideroom;
let pos;


const interiorpos = [
  {x:151.3027, y:-1007.7420, z:-98.99999, type:'roomout', msg: '~INPUT_PICKUP~ Exit'},
  {x:152.1123, y:-1000.4395, z:-99.0000, type:'editchar',msg: '~INPUT_PICKUP~ Wardrobe Menu'},
  {x:154.4436, y:-1004.4039, z:-99.0000, type:'sleep',msg:'~INPUT_PICKUP~ Sleep'},
]
function savehouse(room, house, interior) {

  let phouse = [
      {x:room.x, y:room.y, z:room.z, h:0},
      {x:house.x, y:house.y, z:house.z, h:0},
      {x:interior.x, y:interior.y, z:interior.z, h:0},
      {x:house.x1, y:house.y1, z:house.z1, h:house.h},
  ]
  alt.emitServer('updatedata', 'accounts', 'defaulthouse', phouse, false)
  //alt.LocalStorage.set('playerhouse', phouse);
 //alt.LocalStorage.set('ownedhouse', 0);
  //alt.LocalStorage.save();
  alt.emit('savechar');
  setMeta('ownedhouse', 0);
  defaulthouse(phouse)
}

alt.on('loadhouse', (data)=>{
   
  let pproperty = data.property //alt.LocalStorage.get('ownedhouse');
  if(pproperty > 0) {
    loadplayerproperty(data);
    setMeta('ownedhouse', pproperty);
  } else {
    setMeta('ownedhouse', 0);
    //let phouse = alt.LocalStorage.get('playerhouse');
    let phouse = data.defaulthouse
    alt.emitServer('spawnhouse', {x: phouse[2].x, y: phouse[2].y, z: phouse[2].z});
    defaulthouse(phouse)
    paidrental(10, 'You pay daily house rent $');
    gotoroom(phouse);
  }
alt.emitServer('settime');
//alt.emitServer('loadplayergarage');
let stat = alt.setInterval(()=>{
  alt.clearInterval(stat);
  //native.switchToMultiSecondpart(alt.Player.local.scriptID);
  alt.emit('playerstat', data);
}, 10000);
})

function defaulthouse(phouse) {
  //let phouse = alt.LocalStorage.get('playerhouse');
  let house = native.addBlipForCoord(phouse[0].x, phouse[0].y, phouse[0].z);
  pos = phouse;
  native.setBlipSprite(house, 40);
  native.setBlipAsShortRange(house, false);
  //alt.emitServer('sethouse', phouse[0], phouse[2], phouse[3]);

  let housecount = alt.setInterval(()=>{
    let jarak = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, phouse[0].x, phouse[0].y, phouse[0].z, true);
    if(jarak <= 30) {
      alt.emit('marker', 1, phouse[0].x, phouse[0].y, phouse[0].z-1,0.8,0.8,0.8, 150,150,0,100)
     // native.drawMarker(1, phouse[0].x, phouse[0].y, phouse[0].z-1, 0,0,0,0,0,0, 1,1,1, 150,150,0,100,0,0,0,0,0,0,0);
    }
    if(jarak < 2) {
        setMeta('moteldoor', 1)
        handletext('~INPUT_PICKUP~ Enter Motel')
    } else { setMeta('moteldoor', 0);
  }
  }, 1000);
}

let mdoor;

function gotoroom(pos) {
  native.lockMinimapPosition(pos[0].x, pos[0].y);
  alt.emitServer('inthehouse', pos[0])
  alt.emitServer('gotoroom', pos)
  //for(let i in interiorpos) {
  let door = alt.setInterval(()=>{
    native.doScreenFadeIn( 4000);
   // alt.emit('disableweapon', true);
    alt.clearInterval(door);
    //interact()
    mdoor = alt.everyTick(()=>{
      //native.blockWeaponWheelThisFrame();
      alt.emit('fakemap', true, pos[1].x, pos[1].y)
      //native.setFakePausemapPlayerPositionThisFrame(pos[1].x, pos[1].y);
      roomdoor(interiorpos[0]);
      roomdoor(interiorpos[1]);
      roomdoor(interiorpos[2]);
  })
  }, 5000);  
}

alt.on('keydown', (key) => {
  if(key == 'E'.charCodeAt(0)){
    let moteldoor = getMeta('moteldoor');
    if(moteldoor == 1) {
    native.doScreenFadeOut(1000);
    setMeta('moteldoor', 0);
    gotoroom(pos);
    } else {}
    let door = getMeta('roomout');
    let bed = getMeta('sleep');
    let char = getMeta('editchar');
    if(door == 1) {
      alt.clearEveryTick(mdoor);
      goout();
    } else {}
    if(bed == 1) {
      //alt.emitServer('sleep');
      sleep()
    } else {}
    if(char == 1) {
      alt.emit('createmenu', "","wardrobe", wardrobemenu)
     // alt.emit('openwardrobe');
    } else {}
}});

function goout() {
  native.doScreenFadeOut(1000);
  alt.emitServer('roomout', pos);
  
  let keluar = alt.setInterval(()=>{
    alt.emitServer('outroom');
    setMeta('roomout', 0);
    native.doScreenFadeIn(5000);
    //alt.emit('disableweapon', false);
    alt.clearInterval(keluar);
    native.unlockMinimapPosition();
    alt.emit('fakemap', false, pos[1].x, pos[1].y)
  },2000)
}
alt.onServer('unloadipl', (ipl) =>{
  native.removeIpl(ipl);
})
alt.onServer('gotobed', ()=>{
   let anim = native.isEntityPlayingAnim(alt.Player.local.scriptID, "mp_bedmid", "f_getin_r_bighouse", 0,);
   
 if(anim == false) {
playanim("mp_bedmid", "f_getin_r_bighouse");
} else if(anim == true) {
  native.clearPedTasks(alt.Player.local.scriptID);
}
})

function playanim(animdict, animname){
native.requestAnimDict(animdict);
  let interval = alt.setInterval(() => { 
      if (game.hasAnimDictLoaded(animdict)) {
          alt.clearInterval(interval);
          native.taskPlayAnim(alt.Player.local.scriptID, animdict, animname, 8.0, 3, -1, 3, 0, false, false, false);
          //native.playEntityAnim(alt.Player.local.scriptID, animdict, animname, 0, false, true, false, 0, 0)
      }
}, 0);
}


const propertylist = [
  'property1', 'property2', 'property3', 'property4', 'property5'
]

const garagelist = [
  'housegarage1', 'housegarage2', 'housegarage3', 'housegarage4', 'housegarage5',
]
alt.onServer('saveproperty', (data)=>{
  let pprop = getMeta('ownedhouse');
  alt.emitServer('updatedata', 'accounts', 'apartments', data, true)
  alt.emitServer('updatedata', 'accounts', 'defaulthouse', data, false)
  setMeta('ownedhouse', pprop+1)
  loadapartments(data);
})

let fees = 0;
let playerProperty = []

function loadplayerproperty(data) {

  setMeta('housedoor', 0);
  //for(let i in propertylist) {
  //loadapartments(propertylist[i])
  //}
  for(let i in data.apartments) {
    loadapartments(data.apartments[i])
  }

  paidrental(0, 'You Pay Property Daily Fees $')
  let house = data.defaulthouse //alt.LocalStorage.get('defaulthouse');
  //alt.emitServer('spawnhouse', {x: house.x3, y: house.y3, z: house.z3});
  native.requestIpl(house.ipl);
  let spawn = alt.setTimeout(()=>{
    alt.clearTimeout(spawn);
    alt.emitServer('defaulthouseset', house); 
  }, 500);
  
}

function loadapartments(data) {
  //let aptdata = alt.LocalStorage.get(data);
  //if(!aptdata) return;
    playerProperty.push(data);
    if(data.capacity == 2) {
      fees += 25;
    } else if(data.capacity == 6) {
      fees += 50;
    } else if(data.capacity == 10) {
      fees += 75;
    }
    houseblip(data.name, data);
    //propertydoor(aptdata);
    //setMeta(aptdata.name, 1);
}

let playerhouse;
let house;
let aptdoor = 0

alt.onServer('stopshop', ()=>{
  if(aptdoor > 0) {
    alt.clearInterval(aptdoor)
    aptdoor = 0
  }
})

alt.onServer('startshop', ()=>{
  if(aptdoor == 0) {
    propertydoor()
  }
})

function propertydoor() {
let door = 'none'
aptdoor = alt.setInterval(()=>{
for(let i in playerProperty) {

  let jarak = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, playerProperty[i].x, playerProperty[i].y, playerProperty[i].z, true);
   if(jarak < 50) {
    alt.emit('marker', 1, playerProperty[i].x, playerProperty[i].y, playerProperty[i].z-1,0.8,0.8,0.3, 0,250,250,150)
  //native.drawMarker(1, coord.x, coord.y, coord.z-1.1, 0,0,0,0,0,0, 1,1,1, 0,250,250,150,0,0,0,0,0,0,0);
    if(jarak < 1) {
      //door = getMeta('housedoor');
      if(door == 'none') {
        door = playerProperty[i].name
        native.requestIpl(playerProperty[i].ipl);
       // alt.emit('createmenu', "","aptdoor", wardrobemenu)
        setMeta('housedoor', 1);
        handletext('~INPUT_PICKUP~ Enter Apartment');
       house = playerProperty[i];
      }
} else if(jarak > 1) {
if(door == playerProperty[i].name) {
  door = 'none'
  setMeta('housedoor', 0);
}}
}}
}, 1000)
}


let housedoor, wardrobe = 0, chairpos, chair = 0, sitting = 0, tv = false, tvprop, tvmodel, tvscreen = 0, channel = 1, notif = false

let wardrobemenu = [
  {type: 0, worktype: "~g~Select menu", job: ""},
  {type: 1, worktype: "Wardrobe", job: ""},
  {type: 2, worktype: "Character Editor", job: ""},
]

alt.onServer('houseint', (pos)=>{
  let spos = [], cpos = []
  if(sofapos[pos.type]) {
    spos = sofapos[pos.type]
  }

  let enter = alt.setInterval(()=>{
    native.doScreenFadeIn(4000);
    alt.clearInterval(enter);
    playerhouse = pos;
    alt.emitServer('inthehouse', {x:pos.x, y:pos.y, z:pos.z})

    let interior = native.getInteriorFromPrimaryView()
    
    for(let i in spos) {
      let offset = native.getOffsetFromInteriorInWorldCoords(interior, spos[i].x, spos[i].y, spos[i].z);
      let offset1 = native.getOffsetFromInteriorInWorldCoords(interior, spos[i].x1, spos[i].y1, spos[i].z );
      let h = native.getHeadingFromVector2d(offset1.x - offset.x, offset1.y - offset.y)

      let upos = {x:offset.x, y:offset.y, z:offset.z, h: h}
      cpos.push(upos)
    }      
    housedoor = alt.everyTick(()=>{
    if(sitting == 1) {
      if(notif == false) {
      handletext('~INPUT_AIM~ to get up ~INPUT_PICKUP~ to turn on tv')
    notif = true
    }
  }
      for(let i in cpos) {
        roomdoor({x:cpos[i].x, y:cpos[i].y, z:cpos[i].z, h:cpos[i].h, type: 'sit', msg: '~INPUT_PICKUP~ to sit'});
      }
      //native.setFakePausemapPlayerPositionThisFrame(pos.x, pos.y);
      roomdoor({x:pos.x3, y:pos.y3, z:pos.z3, type: 'sleep', msg: '~INPUT_PICKUP~ Sleep'});
      roomdoor({x:pos.x4, y:pos.y4, z:pos.z4, type: 'editchar', msg: '~INPUT_PICKUP~ Wardrobe Menu'});
      roomdoor({x:pos.x1, y:pos.y1, z:pos.z1, type: 'exithouse', msg: '~INPUT_PICKUP~ Exit Apartment   ~INPUT_ENTER~ Enter Garage'});
      //roomdoor({x: -903.6160278320312, y: -364.2391052246094,  z: 113.07418060302734, type: 'wardrobe', msg: '~INPUT_PICKUP~ Open Wardrobe'})
  })
  }, 2000);
})


function roomdoor(coord) {
  let jarak = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, coord.x, coord.y, coord.z, true);
    //native.drawMarker(1, coord.x, coord.y, coord.z-1.1, 0,0,0,0,0,0, 1,1,1, 250,250,250,50,0,0,0,0,0,0,0);
    if(jarak <= 1) {
      let meta = getMeta(coord.type)
      if(meta == 0) {
        setMeta(coord.type, 1);
        if(sitting == 0) {
          handletext(coord.msg);
        } else {
          //handletext('~INPUT_AIM~ to get up');
        }
        
      }
      if(coord.type == 'editchar') {
        setwardrobe()
      } else if(coord.type == 'sit') {
        chairpos = coord
 
      }
      
} else if(jarak > 1) {
  setMeta(coord.type, 0);
  wardrobe = 0
 
}
}

alt.on('wardrobe', (type)=>{
  if(type == 1) {
    alt.emit('openwardrobe');
  } else if(type == 2) {
    alt.emitServer('editchar');
  } else if(type == 0) {}
})

function setwardrobe() {
  if(wardrobe == 0) {
    alt.emitServer('requestdata', 'characters', 'wardrobeset'); 
    wardrobe = 1
  }
}

function sitchair(offset) {
  native.taskStartScenarioAtPosition(alt.Player.local.scriptID, 'PROP_HUMAN_SEAT_CHAIR', offset.x, offset.y, offset.z, offset.h, 0,true,false);
  sitting = 1;
 // handletext('~INPUT_LOOK_UD~ to get up')
}


alt.on('keydown', (key) => {
  if(key == 'E'.charCodeAt(0)){
    let door = getMeta('housedoor');
    //let chair = getMeta('sit')
    if(door == 1) {
      setMeta('housedoor', 2);
      if(aptdoor > 0) {
        alt.clearInterval(aptdoor);
        aptdoor = 0
      }
      native.doScreenFadeOut(1000);
      alt.emitServer('enterhouse', house);
    } else {}
    let exit = getMeta('exithouse');
    if(exit == 1) {
      alt.clearEveryTick(housedoor);
      native.doScreenFadeOut(1000);
      deleteMeta('exithouse')
      alt.emitServer('exithouse', playerhouse);
      native.unlockMinimapPosition();
      let keluar = alt.setInterval(()=>{
        alt.clearInterval(keluar);
        alt.emitServer('outroom');
        deleteMeta('exithouse');
        setMeta('housedoor', 0);
        native.doScreenFadeIn(4000);
        let isreg = native.isNamedRendertargetRegistered(screen)
        if(isreg == true) {
            native.releaseNamedRendertarget(screen)
        }
        tvscreen = 0
        //alt.emit('disableweapon', false);
        propertydoor()
      },3000)
  }
  if(chairpos) {
  let chairdist = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, chairpos.x, chairpos.y, chairpos.z, true);
  if(chairdist <= 1) {
    if(sitting == 0) {
      sitchair(chairpos)
    } else {
      alt.emit('turntvon')
    }
  }
}

}})

alt.on('keydown', (key) => {
  if(key == 2){
    if(sitting == 1) {
      native.clearPedTasks(alt.Player.local.scriptID);
      sitting = 0;
      notif = false
    }
  }
})


alt.on('keydown', (key) => {
  if(key == 'F'.charCodeAt(0)){
    let door = getMeta('exithouse');
    if(door == 1) {
      alt.clearEveryTick(housedoor);
      alt.emit('entergarage', playerhouse.name);
      deleteMeta('exithouse');
    }
  
  } else if(key == 'A'.charCodeAt(0)){
    if(sitting == 1) {
    if(channel == 0) {
      channel = 19
    } else {
      channel -= 1
    }
    native.setTvChannelPlaylist(1, tvchannels[channel], 0) 
  }
  } else if(key == 'D'.charCodeAt(0)){
    if(sitting == 1) {
    if(channel == 20) {
      channel = 1
    } else {
      channel += 1
    }
    native.setTvChannelPlaylist(1, tvchannels[channel], 0) 
    }
  }
})

alt.on('enterfromgarage', (aptname)=>{
  
  for(let i in playerProperty) {
    if(playerProperty[i].name == aptname) {
      alt.emitServer('enterhouse', playerProperty[i]);
    }
  }
  
})

function sleep() {
  native.requestAnimDict("mp_bedmid")
  let pos = alt.Player.local.pos
  for(let i in beds) {
    let model = alt.hash(beds[i])
    let bed = native.getClosestObjectOfType(pos.x, pos.y, pos.z, 2.0, model, false, false, false);
    if(bed) {
      let coor = native.getEntityCoords(bed, false);
      let rot = native.getEntityRotation(bed, 2);
      let tidur = alt.setInterval(()=>{
        alt.clearInterval(tidur);
        let sleep = native.networkCreateSynchronisedScene(coor.x,coor.y, coor.z, rot.x, rot.y, rot.z, 2, false, false, 1065353216, 0, 1.3)
        native.networkAddPedToSynchronisedScene(alt.Player.local.scriptID, sleep, "mp_bedmid", "f_sleep_r_loop_bighouse", 1.5, -4.0, 1, 16, 1148846080, 0)
        native.networkAddEntityToSynchronisedScene(bed, sleep, "mp_bedmid", "f_sleep_r_loop_bighouse", 4.0, -8.0, 1)
        native.networkStartSynchronisedScene(sleep)
      , 500})
    }
  }
  
}
function paidrental(num, text) {
let price;
  alt.setInterval(()=>{
    if(num > 0) {
      price = num
    } else {
      price = fees;
    }
    alt.emit('paid', price, text+price)
    //alt.log('property fees', price)
  }, 60000*48);
}

function houseblip(blipId, apt){
  var aptblip = new alt.PointBlip(apt.x,apt.y, apt.z)
  aptblip.category = 11;
  aptblip.sprite = 40
  aptblip.alpha = 250;
  aptblip.name = apt.name;
  aptblip.color = 3;
  aptblip.shortRange = false;
}

function handletext(text) {
	game.beginTextCommandDisplayHelp("STRING");
	game.addTextComponentSubstringKeyboardDisplay(text);
	game.endTextCommandDisplayHelp(0, 0, true, -1);
};

function drawtext(msg, x, y, font, scale, wrap, r, g, b, a,) {
  native.beginTextCommandDisplayText('STRING');
  native.addTextComponentSubstringPlayerName(msg);
  native.setTextFont(font);
  native.setTextScale(1, scale);
  native.setTextWrap(0.0, wrap);
  native.setTextCentre(true);
  native.setTextColour(r,g,b,a);
  native.setTextOutline();
  native.setTextJustification(0);
  native.setTextDropShadow(true);
  native.endTextCommandDisplayText(x, y, 0);
  
}

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomListEntry(list) {
  return randomNumber(0, list.length - 1);
}
