import * as alt from 'alt-server';

alt.onClient('playerpic', (player, data)=>{
  player.setSyncedMeta('pic', data)
})

alt.onClient('playerrank', (player, rank)=>{
  player.setSyncedMeta('rank', rank);
});

alt.on('vehtank', (player, veh, fuel)=>{
  if(player instanceof alt.Player){
    player.setMeta('tank', veh, fuel);
  }
});

alt.on('playerEnteredVehicle', (player, targetVehicle, seat) => {
    if(player instanceof alt.Player){
        if(targetVehicle){
            if (seat == 1){
          if(player.dimension == 0) {
              let hud = alt.setInterval(()=>{
                let fuel = player.vehicle.getSyncedMeta('tank')
                //lastvehicle = player.vehicle;
                alt.emitClient(player, 'showHud', fuel, seat);
                if(player.vehicle.hasSyncedMeta('owner')) {
                let vehdata = player.vehicle.getSyncedMeta('owner');
                if(vehdata.owner == player.id) {
                alt.emitClient(player, 'destroycarblip', player.vehicle);
                } else {}
              } else {}
              if(player.vehicle.hasSyncedMeta('pegasusveh')) {
                alt.emitClient(player, 'removeplaneblip')
              }
              alt.clearInterval(hud);
              if(player.vehicle.hasSyncedMeta('wandercar')) {
                player.vehicle.deleteSyncedMeta('wandercar');
              }
              }, 300);
            }}
          }
          }
});

alt.on('playerChangedVehicleSeat', (player, targetVehicle, oldSeat, newSeat) => {
  if(player instanceof alt.Player){
    if(targetVehicle){
        if (newSeat == 1){
      if(player.dimension == 0) {
          let hud = alt.setInterval(()=>{
            let fuel = player.vehicle.getSyncedMeta('tank')
            //lastvehicle = player.vehicle;
            alt.emitClient(player, 'showHud', fuel, newSeat);
            if(player.vehicle.hasSyncedMeta('owner')) {
            let vehdata = player.vehicle.getSyncedMeta('owner');
            if(vehdata.owner == player.id) {
            alt.emitClient(player, 'destroycarblip', player.vehicle);
            } else {}
          } else {}
          if(player.vehicle.hasSyncedMeta('pegasusveh')) {
            alt.emitClient(player, 'removeplaneblip')
          }
          alt.clearInterval(hud);
          if(player.vehicle.hasSyncedMeta('wandercar')) {
            player.vehicle.deleteSyncedMeta('wandercar');
          }
          }, 300);
        }}
      }
      }
});

alt.on('playerLeftVehicle', (player, targetVehicle, seat) => {
    if(player instanceof alt.Player){
        if(targetVehicle){
            if (seat == 1){
            if(player.dimension == 0) {
              alt.emitClient(player, 'closeHud', targetVehicle, seat);
              if(targetVehicle.hasSyncedMeta('owner')) {
              let vehdata = targetVehicle.getSyncedMeta('owner');
              if(vehdata.owner == player.id && player.dimension !== player.id) {
                if(targetVehicle) {
                  alt.emitClient(player, 'carblip', targetVehicle);
                }
                
              } else {}
            } else {}
          }
       }}}
});

alt.onClient('pertamax', (player, veh, tank)=>{
  if(!veh) {}
  else {
    veh.setSyncedMeta('tank', tank);
  }
  
})

alt.onClient('vehclass', (player, nomor)=>{
  if(nomor == 13 ) {}
  else
  player.setMeta('lastvehicle', player.vehicle);
})

