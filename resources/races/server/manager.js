import * as alt from 'alt-server';

let racer = [
   [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
]

let finish = [
  [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
]

const colors = [
  150,135,134,89,55,70,41,3,0,39,42,140,136,92,
]

let cars;

alt.onClient("race", (player, num, cartype) => {
  if(player.hasSyncedMeta('races')) {
    player.setSyncedMeta('races', 0)
  }
  
  if(racer[num].length > 0) {
    alt.emitClient(player, 'racenotif', 'This race already started!')
  } else {
  //racer[num] = []
    racer[num].push(player);
    player.setSyncedMeta('races', num)
    //cars = carlist;
    alt.emitClient(player, 'racerlist', racer[num], num, player);
    alt.log('starting race',num,  player.name)
  }
})

alt.onClient('joinrace', (player, race, pos) =>{
  player.setSyncedMeta('races', race)
      racer[race].push(player);
      alt.emitClient(player, 'setrace', racer[race].length-1, cartype);
      alt.emitAllClients('racerlist', racer[race], race, player);
      alt.log('join race', race, player.name)
    
})

alt.onClient('addbot', (player, race, pos, car, bot)=>{
  racer[race].push(player);
  let veh = new alt.Vehicle(car, pos.x, pos.y, pos.z-0.5, 0, 0, 0);
    veh.setSyncedMeta('tank', 100);
    veh.setSyncedMeta('racebot', race);
    veh.numberPlateText = 'bot '+veh.id;
    veh.primaryColor = colors[getRandomInt(0, colors.length-1)]
    let mod = veh.modKitsCount;
    let liv = veh.getModsCount(48);
    let spoiler = veh.getModsCount(0)
      let vehtime = alt.setTimeout(()=> {
        if(mod > 0) {
          veh.modKit = 1;
      if(liv > 0) {
        veh.setMod(48, getRandomInt(0, liv-2))
      }
      if(spoiler > 0) {
        veh.setMod(0, getRandomInt(0, spoiler-2))
      }
      veh.setMod(11, 4);
      veh.setMod(12,3);
      veh.setMod(16,4);
      alt.clearTimeout(vehtime);
      //alt.emitClient(player, 'heading', veh, pos.h);
      alt.emitAllClients('racebot', veh, race, bot, pos);
    }
    },200)
})

alt.onClient('startpos', (player, pos) => {
  player.pos = pos;
  player.dimension = player.id;
  alt.emitClient(player, 'setcam');
  alt.emitClient(player, 'stopshop');
})

alt.onClient('racetrack', (player, veh)=>{
  player.dimension = 0;
  veh.dimension = 0;
})

alt.onClient('start', (playerd, race) =>{
  for(let player of alt.Player.all) {
    if(player.hasSyncedMeta('races')) {
      let raceid = player.getSyncedMeta('races');
      if(raceid == race) {
        alt.emitClientRaw(player, 'setstart', race);
        //alt.emitClientRaw(player, 'stopwandercar');
        playerd.setMeta('race', 0);
    }
  
}}});

alt.onClient('raceinvite', (player, playerId, race, startpos, checkpos, cartype) => {
  let host = player.name;
  alt.emitAllClients('inviterace', playerId, host, race, startpos, checkpos, cartype);
});

let posrace =[]

alt.onClient('checkpoint', (player, race, lap)=>{
  alt.emitAllClientsRaw('racerpos', player, race, lap);
})

alt.onClient('botcheckpoint', (player, race, lap, bot)=>{
  alt.emitAllClientsRaw('botracerpos', bot, race, lap);
})

alt.onClient('botracefinish', (player, bot, race)=>{
  finish[race].push(bot);
 // let remove = alt.setInterval(()=>{
 //   car.destroy();
  //  alt.emitClient(player, 'deletebot', bot);
  //  alt.clearInterval(remove);
 // }, 10000);
})

alt.onClient('racefinish', (player, race, rank)=>{
  finish[race].push(player.id)
  let rp, money;
  let racers = alt.Player.all.filter(data=>{
    return data.getSyncedMeta('races') == race;
  });
  if(racers.length <= 3) {
    money = Math.ceil(10000/finish[race].length);
    rp = Math.ceil(30/finish[race].length);
  } else if(racers.length <= 10 && racers.length > 3) {
    money = Math.ceil(15000/finish[race].length);
    rp = Math.ceil(60/finish[race].length);
  } else if(racers.length > 10) {
    money = Math.ceil(25000/finish[race].length);
    rp = Math.ceil(75/finish[race].length);
  }
  alt.emitClient(player, 'finishrace', race, finish[race].length)
  alt.emitClient(player, 'rppoint', rp);
    
  alt.log(player.name, 'finish race', race, 'rank', finish[race].length);
  
    
    if(finish[race].length == 3 || finish[race].length >= racer[race].length) {
      racer[race] = []
      finish[race] = []
      alt.emitAllClients('endrace', race);
      for(let car of alt.Vehicle.all) {
        if(car.getSyncedMeta('racebot') == race) {
          car.destroy();
        }
      }
    }
    let destroy = alt.setInterval(()=>{
      alt.emitClient(player, 'gotmoney', money);
      alt.emitClient(player, 'startshop');
      
      //pvehicle.destroy();
      alt.clearInterval(destroy);
    }, 2000); 

});

alt.onClient('racefail', (player, race, rank)=>{
  alt.emitClient(player, 'rppoint', 10);
  alt.log(player.name, 'fnish race', race, 'rank', rank);
  let destroy = alt.setInterval(()=>{
    alt.emitClient(player, 'gotmoney', 2000); 
    alt.emitClient(player, 'startshop');
    //pvehicle.destroy();
    alt.clearInterval(destroy);
  }, 2000); 
})

let pvehicle;

alt.onClient('racevehicle', (player, vehId, h, race) => {
  let pvehicle = player.getMeta('vehicle');
  if(!pvehicle) {}
  else {
    pvehicle.destroy();
 }
  
    let veh = new alt.Vehicle(vehId, 407.669384765625, -963.39111328125,-99.67940521240234, 0, 0, 0);
    veh.dimension = player.id;
    player.setMeta('vehicle', veh);
    veh.setSyncedMeta('tank', 100);
    veh.setSyncedMeta('racecar', race);
    let mod = veh.modKitsCount;
    let liv = veh.getModsCount(48);
    let spoiler = veh.getModsCount(0)
    veh.numberPlateText = player.name;
    veh.primaryColor = 112;
      let vehtime = alt.setTimeout(()=> {
        if(mod > 0) {
          veh.modKit = 1;
      if(liv > 0) {
        veh.setMod(48, getRandomInt(0, liv-2))
      }
      if(spoiler > 0) {
        veh.setMod(0, getRandomInt(0, spoiler-2))
      }
      veh.setMod(11, 4);
      veh.setMod(12,3);
      //veh.setMod(13,2);
      veh.setMod(16,4);
      alt.clearTimeout(vehtime);
      alt.emitClientRaw(player, 'heading', veh, h);
    }
    },100)
    
  } 
);

alt.onClient('color', (player, color)=>{
  let vehicle = player.getMeta('vehicle')
  let liv = vehicle.getModsCount(48);
  let spoiler = vehicle.getModsCount(0)
  vehicle.primaryColor = color;
  vehicle.secondaryColor = color;
    let vehtime = alt.setTimeout(()=> {
    if(liv > 0) {
      vehicle.setMod(48, getRandomInt(0, liv-2))
    }
    if(spoiler > 0) {
      vehicle.setMod(0, getRandomInt(0, spoiler-2))
    }
    alt.clearTimeout(vehtime);
}, 100);
})

alt.onClient('carselect', (player) =>{
player.dimension = 0;
})

alt.onClient('setraceradio', (player, radio)=>{
  
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getdistance2d(x,y,x1,y1) {
  let distx = Math.abs(x - x1)
  let disty = Math.abs(y - y1)
  let dist = Math.sqrt((distx*distx) + (disty*disty));
  return Math.floor(dist);
}