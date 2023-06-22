import alt from 'alt-server';

alt.onClient('teleport', (player, coord)=>{
    player.invincible = false;
    player.pos = coord;
    player.dimension = 0;
    if(player.vehicle) {
        player.vehicle.pos = coord;
    }
})


alt.onClient('introvehicle', (player)=>{
    player.setMeta('intro', 1);
    let vehicle = new alt.Vehicle('emperor', -1027.3423, -2733.3677, 19.6117, 0, 0, 0);
    vehicle.numberPlateText = 'freecity';
    vehicle.setSyncedMeta('tank', 80);
    alt.emitClient(player, 'vehheading', vehicle);
    player.dimension = player.id;
    vehicle.dimension = player.id;
    alt.emitClient(player, 'carblip', vehicle);

    alt.on('playerEnteredVehicle', (player, targetVehicle, seat) => {
        if(player instanceof alt.Player){
            let intro = player.getMeta('intro');
                if(intro > 0) {
            if(targetVehicle == vehicle){
                    alt.emitClient(player, 'destroycarblip', vehicle);
                    alt.emitClient(player, 'rpoint', 100);
                    alt.emitClient(player, 'showHud', 80, 1)
                let carinterval = alt.setInterval(()=>{
                    player.dimension = 0;
                    vehicle.dimension = 0;
                    player.deleteMeta('intro')
                    alt.clearInterval(carinterval);
                }, 3000);
            } else {}
            }
        }
    });
})

alt.onClient('money', (player, money)=>{
    alt.emitClient(player, 'gotmoney', money)
    //player.dimension = 0
    for(let veh of alt.Vehicle.all) {
        if(veh) {
          //  veh.destroy()
        }
    }
})


