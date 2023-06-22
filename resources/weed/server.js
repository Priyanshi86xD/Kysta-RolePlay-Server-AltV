import alt from 'alt-server';
import * as chat from 'alt:chat';

alt.log("IWeed Loaded");

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomListEntry(list) {
  return randomNumber(0, list.length - 1);
}

alt.onClient('weedstart', (player, tujuan, startpos, car)=>{
    let veh = new alt.Vehicle(car, startpos.x, startpos.y, startpos.z, startpos.h, 0, 0);
    veh.dimension = player.id;
    veh.numberPlateText = 'WEEDAN';
    veh.setSyncedMeta('tank', (randomNumber(10, 90)))
    player.setSyncedMeta('weedcar', veh);
    alt.emitClient(player, 'weedinfo', veh);
    chat.send(player, '{34dfeb}Weed Delivery Job{ffffff}, Go to {00ff00} Green Icon {ffffff}to Start the job'); 
})

alt.onClient('weedready', (player)=>{
  let veh = player.getSyncedMeta('weedcar');
  player.setMeta('job', 1);
  veh.dimension = 0;
})

alt.onClient('weedjobfail', (player)=>{
let veh = player.getSyncedMeta('weedcar');
player.setMeta('job', 0)
alt.emitClient(player, 'jobtext', '')
alt.emitClient(player, 'jobwarn', '')
alt.log(player.name+' weed job failed')
alt.emitClient(player,'setjob');
let vehdestroy = alt.setInterval(()=>{
veh.destroy();
player.deleteMeta('weedcar');
alt.clearInterval(vehdestroy)
}, 60000*3);
})

alt.on('playerEnteredVehicle', (player, targetVehicle, seat) => {
  if(player instanceof alt.Player){
    let weedjob = player.getMeta('job');
      if(weedjob == 1){
    let veh = player.getSyncedMeta('weedcar');
    if(targetVehicle == veh){
      if(seat = -1){
        alt.emitClient(player, 'jobtext', '~w~Deliver this Vehicle to~w~ ~y~Destination~y~')
        alt.emitClient(player, 'jobwarn', '')
        //alt.emitClient(player, 'stopcount')
      }
    } else {}
  } else {}
  }
});

alt.on('playerLeftVehicle', (player, targetVehicle, seat) => {
  if(player instanceof alt.Player){
    let weedjob = player.getMeta('job');
      if(weedjob == 1){
    let veh = player.getSyncedMeta('weedcar');
    if(targetVehicle == veh){
      if(seat = -1){
        alt.emitClient(player, 'jobwarn', '~w~Get Back to~w~ ~b~Vehicle~b~')
        alt.emitClient(player, 'jobtext', '')
      }} else {}
    } else {}
}});


alt.onClient('weedjobfinish', (player)=>{
  let veh = player.getSyncedMeta('weedcar');
        let job = player.getMeta('job');
        if(job == 0) {} else
        alt.emitClient(player, 'jobtext', '')
        alt.emitClient(player, 'jobwarn', '')
      alt.emitClient(player, 'rppoint', 50);
      let money = alt.setInterval(()=>{
        alt.emitClient(player, 'gotmoney', 20000);
        alt.clearInterval(money);
      }, 3000);
      
      player.setMeta('job', 0);
      chat.broadcast(`{1cacd4}${player.name} {ffffff}has deliver {00ff00}the Weed..`)
      alt.log(player.name+' deliver Weed got 20000')
      let vehdestroy = alt.setInterval(()=>{
        veh.destroy();
        player.deleteMeta('weedcar');
        alt.clearInterval(vehdestroy)
      }, 15000);
      alt.emitClient(player,'setjob');
}) 