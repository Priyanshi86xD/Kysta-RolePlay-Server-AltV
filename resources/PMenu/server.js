import * as alt from 'alt-server';


alt.log("Player Menu Loaded");

alt.onClient('pmodel', (player, data) => {
    player.model = data;
    alt.emitClient(player, 'chardone');
  });

  
alt.onClient('Edit:Char', (player) => {
  alt.emit('character:Edit', player);
  });

  const dest = {
    dest1 : {x: 432.300, y: -632.469, z: 28.714},
    dest2 : {x: -330.229, y: 6190.808, z: 31.349},
    }


alt.on('playerDeath', (player)=>{
  alt.emitClient(player, 'closemenu');
})

alt.onClient('givecar', (player, model)=>{
  let veh = player.getMeta('vehicle');
  if(!veh) {} else {
    veh.destroy();
  }
  let vehicle = new alt.Vehicle(model, player.pos.x+1, player.pos.y, player.pos.z, 0,0,0);
  vehicle.modKit = 1;
  vehicle.setSyncedMeta('tank', 100);
  vehicle.setMod(11, 3);
  vehicle.numberPlateText = player.name;
  player.setMeta('vehicle', vehicle);
  alt.emitClient(player, 'pseat', vehicle);
})
