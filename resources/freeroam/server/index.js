import * as alt from "alt-server";
import * as chat from "alt:chat";

const spawns = [
  { x: -695.1956176757812, y: 83.94725036621094, z: 55.85205078125 },
  { x: -527.6835327148438, y: -678.7252807617188, z: 33.6607666015625 },
  { x: 200.6637420654297, y: -935.2879028320312, z: 30.6783447265625 },
  { x: 897.7318725585938, y: -1054.6944580078125, z: 32.818359375 },
  { x: 363.1516418457031, y: -2123.156005859375, z: 16.052734375 },
  { x: -265.3582458496094, y: -1898.0703125, z: 27.7464599609375 },
];
const spawnModels = ["mp_m_freemode_01", "mp_f_freemode_01"];

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomListEntry(list) {
  return randomNumber(0, list.length - 1);
}

alt.on('playerConnect', (player) => {
    console.log(`${player.name} has connected!`);
  if(player instanceof alt.Player) {
  if (player.name.includes("admin")) {
    player.kick();
    return;
}
alt.emitClient(player, 'auth:Open');
//alt.emitClient(player, 'introstat');
}
});

alt.on('auth:Done', exitAuthWindow);

function exitAuthWindow(player, id, username, nickname, intro, data, weapons, clothes) {
    alt.emitClient(player, 'auth:Exit');
    player.setSyncedMeta('NAME', nickname)
    player.setSyncedMeta('rank', data.rank.rank)
    console.log(`${username} has authenticated! Database ID is: ${id} nickname: ${nickname}`);
    //alt.emitClient(player, 'introstat', intro);
    player.model = "mp_m_freemode_01";
    player.spawn(-1212.79, -1673.52, 7, 0)
    player.visible = false;
    player.setMeta("vehicle", 0);
    //player.setSyncedMeta('NAME', player.name)
    alt.emitClient(player, "freeroam:spawned", intro, data, weapons, clothes);


let connectTimeout = alt.setTimeout(() => {
  if (player && player.valid) {
    const playerCount = alt.Player.all.length;
    alt.emitAllClients('playerjoin', player.id, nickname, playerCount);
    //chat.broadcast(`{1cacd4}${player.name} {ffffff}has {00ff00}joined {ffffff}the Server..  (${playerCount} players online)`);
    //chat.send(player, "{80eb34}Press {34dfeb}M {80eb34}to open {34dfeb}Player Menu");
  }
  alt.clearTimeout(connectTimeout);
}, 8000);   

}


alt.onClient('introset', (player)=>{
//const spawn = spawns[getRandomListEntry(spawns)];


})

alt.onClient('setmodel', (player, data) => {
  player.model = data;
  alt.emitClient(player, 'setface');
});

alt.onClient('spawnhouse', (player,pos)=>{
  player.pos = {x: pos.x, y: pos.y, z: pos.z}
    player.dimension = player.id
    player.visible = true;
})

alt.onClient('spawn', (player, pos) =>{
  //player.model = "mp_m_freemode_01";
    alt.log(player.name, 'intro start')  
    //player.pos = pos
    player.dimension = player.id
    player.visible = true;
    player.giveWeapon(0x99B507EA, 1, false);
    alt.emitClient(player, 'saveweapon', 0x99B507EA);
    alt.emitClient(player, 'setchar');
    //alt.emitAllClients('playerjoin', player.id, player.name);
    
})

alt.on("playerDeath", (player, killer) => {
  if (killer instanceof alt.Player) {
    alt.emitClient(player, 'deathcam', true, killer.name, killer.id);
    for(let plyr of alt.Player.all) {
      if(plyr.id == killer.id && plyr.id !== player.id) {
        alt.emitClient(plyr, 'killnotif', player.name, player.id);
      }
    }
    alt.log(`${killer.name} gave ${player.name} the rest!`);
    alt.emitAllClients('deathnote', player, killer.name)
   // chat.broadcast(`{1cacd4}${killer.name} {00ff00}killed {1cacd4}${player.name}`);
  } else {
    alt.emitClient(player, 'deathcam', false, "",0);
    alt.log(`${player.name} died!`);

  }
});

alt.onClient('respawn', (player, pos, killed)=>{
  let playerDeathTimeout = alt.setTimeout(() => {
    if (player && player.valid) {
      player.spawn(pos.x, pos.y, pos.z, 0);
      player.clearBloodDamage();
      alt.emitClient(player, 're-spawn', killed);
    }
    alt.clearTimeout(playerDeathTimeout);
  }, 7000);
})

alt.on("playerDisconnect", (player, reason) => {
  alt.emit('stopjob');
  let pvehicle = player.getMeta('vehicle');
    if(!pvehicle){}
    else
      pvehicle.destroy();
  chat.broadcast(`{1cacd4}${player.name} {ffffff}has {ff0000}left {ffffff}the Server..)`);
  alt.log(`${player.name} has leaved the server becauseof ${reason}`);

});

alt.onClient('loadweapon', (player)=>{
  player.dimension = 0;
});

alt.emit('spawnparkedcars', 300)