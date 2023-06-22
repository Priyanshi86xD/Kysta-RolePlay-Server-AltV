import * as alt from 'alt-server';

let cops = []

let copnumber = 0

alt.onClient('losecop', (player)=>{
    alt.emitClient(player, 'rppoint', 30);
    alt.log(player.name, 'lose the cop')
})

alt.onClient('crimedata', (player, data)=>{
    player.setSyncedMeta('crimedata', data)
    alt.log(player.name, data)
})

alt.onClient('copchase', (player, pos, head, car, ped, plate, weap)=>{
    let chase = alt.setInterval(()=>{
        alt.clearInterval(chase);
      let mw1 = new alt.Vehicle(car, pos.x, pos.y, pos.z+0.5, 0,0,0);
      mw1.setSyncedMeta('chasecar', player.id);
      mw1.setSyncedMeta('tank', 90);
      mw1.numberPlateText = plate+mw1.id
      alt.emitAllClientsRaw('copchase', player.id, mw1, head, ped, weap, copnumber, copnumber+1, pos);
      copnumber + 2

    }, 1000);
})

alt.onClient('copkiller', (player, pos, copId)=>{
    alt.emitAllClientsRaw('copdeath', copId);
})