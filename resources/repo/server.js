import alt from 'alt-server';
import * as chat from 'alt:chat';


const plate = [
    'big bos', 'super', 'fast', 'highlife', 'ndasmu', 'speed'
  ]

const vehcolor = [
    4,7,28,35,38,42,44,55,70,73,89,92,138,139,140
]

  function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  
  function getRandomListEntry(list) {
    return randomNumber(0, list.length - 1);
  }

//let targetcar;

alt.onClient('repostart', (player, car, spawn)=>{
    let targetcar = new alt.Vehicle(car, spawn.x, spawn.y, spawn.z, 0,0,spawn.h);
    targetcar.dimension = player.id;
    targetcar.primaryColor = vehcolor[getRandomListEntry(vehcolor)]
    targetcar.secondaryColor = 12;
    targetcar.numberPlateText = plate[getRandomListEntry(plate)];
    player.setSyncedMeta('repocar', targetcar);
    targetcar.setSyncedMeta('tank', (randomNumber(40, 90)));
    chat.send(player, '{34dfeb}Vehicle Cargo Mission{ffffff}, Find a car at the {1cacd4}Blue Area')
    
    alt.emitClient(player, 'repoinfo', spawn, targetcar);
});

alt.onClient('startrepo', (player, dest)=>{
  let targetcar = player.getSyncedMeta('repocar');
  if(targetcar.dimension = player.id) {
    targetcar.dimension = 0;
    player.setMeta('job', 1)
  } else {}
})

alt.on('playerEnteredVehicle', (player, targetVehicle, seat) => {
    if(player instanceof alt.Player){
      let repojob = player.getMeta('job');
      if(repojob == 1) { 
      let targetcar = player.getSyncedMeta('repocar');
        if(targetVehicle == targetcar){
            if(seat = -1){
                alt.emitClient(player, 'repodeliver', targetVehicle);
                alt.emitClient(player, 'jobtext', '~w~Deliver this Vehicle to~w~ ~y~Destination~y~')
                alt.emitClient(player, 'jobwarn', '')
                } else {}
            }
        } else {}
    }
});

alt.on('playerLeftVehicle', (player, targetVehicle, seat) => {
    if(player instanceof alt.Player){
      let repojob = player.getMeta('job');
      if(repojob == 1) {
      let targetcar = player.getSyncedMeta('repocar');
        if(targetVehicle == targetcar){
            if(seat = -1){
                alt.emitClient(player, 'jobwarn', '~w~Get Back to~w~ ~b~Vehicle~b~')
                alt.emitClient(player, 'jobtext', '')
            } else {}
        } 
        } else {}
}});

alt.onClient('repofinish', (player, money)=>{
  let targetcar = player.getSyncedMeta('repocar');
        if(player.vehicle == targetcar){
            alt.emitClient(player, 'jobtext', '')
            alt.emitClient(player, 'jobwarn', '')
            alt.emitClient(player, 'rppoint', 160);
            let smoney = alt.setInterval(()=>{
              alt.emitClient(player, 'gotmoney', money);
              alt.clearInterval(smoney);
            }, 3000);
            chat.broadcast(`{1cacd4}${player.name} {ffffff}has deliver {00ff00}the Vehicle..`)
            alt.log(player.name+' deliver vehicle got '+money);
            let vehdestroy = alt.setInterval(()=>{
                targetcar.destroy();
                player.deleteMeta('repocar');
                alt.clearInterval(vehdestroy)
              }, 6000);
              alt.emitClient(player,'setjob');
              player.setMeta('job', 0);
    } else {}
})

alt.onClient('repojobfail', (player)=>{
  let targetcar = player.getSyncedMeta('repocar');
    alt.emitClient(player, 'jobtext', '')
    alt.emitClient(player, 'jobwarn', '')
  player.setMeta('job', 0);
  chat.broadcast(`{1cacd4}${player.name} {ffffff}fail to deliver {00ff00}the vehicle`)
  alt.log(player.name+' Repo job failed')
  let vehdestroy = alt.setInterval(()=>{
    targetcar.destroy();
    player.deleteMeta('repocar');
    alt.clearInterval(vehdestroy)
  }, 10000);
  alt.emitClient(player,'setjob');
}) 