import alt from 'alt-server';
import * as chat from 'alt:chat';

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomListEntry(list) {
  return randomNumber(0, list.length - 1);
}

let cab1 = new alt.Vehicle("taxi", 911.108, -177.867, 74.283,0,0,0);
cab1.setSyncedMeta('heading', 225.0);
cab1.setSyncedMeta('tank', 80);
cab1.numberPlateText = "CAB CO"

alt.on('playerConnect', (player) => {
      alt.emitClient(player, 'setjob');
});

alt.onClient('jobready', (player, name)=>{
  player.setMeta('job', 0);
  alt.log(name+' ready for job');
})

alt.onClient('startjob', (player, job)=>{
    alt.emitClient(player, job);
})

alt.onClient('startingjob', (player)=>{
  player.setMeta('job', 3)
})

const color = [
  123, 53, 55,70,91,137,150,44
]
alt.onClient('createcar', (player, model, plate, x, y,z,h, colorles)=>{
  let veh = player.getSyncedMeta('jobcar');
  if(!veh) {} else {
    veh.destroy();
  }
  let carjob = new alt.Vehicle(model,x,y,z,0,0,0);
  player.setSyncedMeta('jobcar', carjob)
  carjob.setSyncedMeta('tank', 100);
  carjob.numberPlateText = plate+carjob.id;
  if(colorles == 1) {
  carjob.primaryColor = color[getRandomListEntry(color)]
  }
  alt.emitClient(player, 'pvehheading', carjob, h);
})

alt.onClient('createtrailer', (player, model, pos)=>{
  let trail = player.getSyncedMeta('jobtrailer');
  if(!trail) {} else {
    trail.destroy();
  }
  let trailer = new alt.Vehicle(model, pos.x, pos.y, pos.z,0,0,0);
  player.setSyncedMeta('jobtrailer', trailer);
  alt.emitClient(player, 'pvehheading', trailer, pos.h)
})

alt.onClient('jobfinish', (player, money, rp)=>{
  alt.emitClient(player, 'rppoint', rp);
    if(money > 0) {
      let smoney = alt.setInterval(()=>{
        alt.clearInterval(smoney);
      alt.emitClient(player, 'gotmoney', money);
      alt.log(player.name, "job $",money, "rp ",rp)
      
    },3000);
  }

})

let busdriver = []

alt.onClient("busdriver", (player)=>{
  if(busdriver.length == 7) {
    busdriver = []
  }
  busdriver.push(player.name);
  alt.emitClient(player, "busroute", busdriver.length-1);
})

alt.onClient("busdriverstop", (player)=>{
  let veh = player.getMeta('jobcar');
  if(!veh) {} else {
    veh.destroy();
  }
})

alt.onceClient('ammujobnotif', (player)=>{
  chat.send(player, '{34dfeb}Ammunation Contract{ffffff}, Go to {ffb700} Bunker {ffffff}to Start the job'); 
})

alt.onClient('ammujobstart', (player)=>{
 
  let veh = new alt.Vehicle('dloader',  883.2544555664062, -3241.15625, -98.56831359863281-0.8, 0, 0, 0);
    veh.dimension = player.id;
    veh.numberPlateText = 'GR 474H';
    player.dimension = player.id;
    player.setMeta('job', 1);
    player.setMeta('amucar', veh);
   alt.emitClient(player, 'ammujobinfo', veh, 181.21148681640625);
    alt.emitClient(player, 'jobwarn', '~w~Go to ~w~ ~b~Vehicle~b~')
    veh.setSyncedMeta('tank', 90)
});

alt.onClient('ammujobset', (player)=>{
  player.dimension = player.id;
    player.setMeta('job', 1);
    alt.emitClient(player, 'ammujobinfo', veh, 181.21148681640625);
    alt.emitClient(player, 'jobwarn', '~w~Go to ~w~ ~b~Vehicle~b~')
})

alt.onClient('outbunker', (player)=>{
  let veh = player.getMeta('amucar');
  player.dimension = 0;
  if(!veh) {} else {
    veh.destroy()
  }
  alt.emitClient(player, 'jobwarn', '')
})

alt.on('playerEnteredVehicle', (player, targetVehicle) => {
  if(player instanceof alt.Player) {
    let veh = player.getMeta('amucar');
    if(targetVehicle == veh) {
      let job = player.getMeta('job');
      if(job == 1) {
      alt.emitClient(player, 'ammujobdeliver', veh);
      alt.emitClient(player, 'jobwarn', '')
      alt.emitClient(player, 'jobtext', '~w~Deliver this Vehicle to~w~ ~y~Destination~y~')
      alt.emitClient(player, 'stopshop')
      player.setMeta('job', 2)
      let drive = alt.setInterval(()=>{
        player.dimension = 0;
        targetVehicle.dimension = 0;
        alt.clearInterval(drive);
      }, 5000);
      } else if(job == 2)  {
        alt.emitClient(player, 'jobtext', '~w~Deliver this Vehicle to~w~ ~y~Destination~y~')
        alt.emitClient(player, 'jobwarn', '')
      } else {}
    } else {}
  }
});

alt.on('playerLeftVehicle', (player, targetVehicle) => {
  if(player instanceof alt.Player){
    let veh = player.getMeta('amucar');
    if(targetVehicle == veh){
      let job = player.getMeta('job');
      if(job == 2){
        alt.emitClient(player, 'jobwarn', '~w~Get Back to~w~ ~b~Vehicle~b~')
        alt.emitClient(player, 'jobtext', '')
      } else {}
    } else {}
}});

alt.onClient('ammujobfinish', (player)=>{
  let job = player.getMeta('job');
  if(job == 0) {} else
  alt.emitClient(player, 'jobtext', '')
  alt.emitClient(player, 'jobwarn', '')
  alt.emitClient(player, 'rppoint', 120);
  let money = alt.setInterval(()=>{
    alt.emitClient(player, 'gotmoney', 30000);
    alt.emitClient(player, 'startshop');
    alt.clearInterval(money);
  }, 3000);
player.setMeta('job', 0);
chat.broadcast(`{1cacd4}${player.name} {ffffff}has deliver {00ff00}Weapon Crates`)
alt.log(player.name+' deliver Weapons got 30000')
let vehdestroy = alt.setInterval(()=>{
  let veh = player.getMeta('amucar');
  alt.clearInterval(vehdestroy)
  if(veh) {
    veh.destroy();
  }
  
}, 10000);
alt.emitClient(player,'setjob');
}) 

alt.onClient('ammujobfail', (player)=>{
  alt.emitClient(player, 'jobtext', '')
  alt.emitClient(player, 'jobwarn', '')
player.setMeta('job', 0);
chat.broadcast(`{1cacd4}${player.name} {ffffff}destroy {00ff00}Weapon Crates`)
alt.log(player.name+' Ammunation contract failed')
alt.emitClient(player, 'startshop');
let vehdestroy = alt.setInterval(()=>{
  let veh = player.getMeta('amucar');
  alt.clearInterval(vehdestroy)
  if(veh) {
    veh.destroy();
  }
  
}, 10000);
alt.emitClient(player,'setjob');
}) 

alt.onClient('rivalchase', (player, pos, head, car, ped, plate, weap)=>{
  let chase = alt.setInterval(()=>{
      alt.clearInterval(chase);
    let mw1 = new alt.Vehicle(car, pos.x, pos.y, pos.z+0.5, 0,0,0);
    mw1.setSyncedMeta('chasecar', player.id);
    mw1.setSyncedMeta('tank', 90);
    mw1.numberPlateText = plate+mw1.id
    alt.emitAllClients('chasecar', player.id, mw1, head, ped, weap);
    
  }, 1000);
})

