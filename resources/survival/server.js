import * as alt from 'alt-server';

alt.onClient('survivalstart', (player, duo, friend, type, data)=>{
    alt.log(player.name,' start survival ', type)
    player.dimension = player.id
    
    let time = alt.setTimeout(()=>{
        alt.clearTimeout(time);
       // player.pos = {x:data[0], y:data[1], z:data[2]}
        player.maxHealth = 200
        player.maxArmour = 200
        player.armour = 200
        alt.emitClient(player, 'setsurvival', type);
        alt.emitClient(player, 'stopshop');

    }, 2000)
    if(duo == 2) {
    for(let plyr of alt.Player.all) {
        if(plyr.id == friend) {
            plyr.dimension = player.id
            alt.emitClient(plyr, 'setsurvival', type);
        }
    }
}
})

alt.onClient('targetkilled', (player, rp) =>{
    alt.emitClient(player, 'rppoint', rp)
})

alt.onClient('survivalheli', (player, pos, ped)=>{
    let heli = new alt.Vehicle("buzzard", pos[0], pos[1], pos[2], 0,0,0);
    heli.dimension = player.id
    heli.setSyncedMeta('survival', 1);
    alt.emitClient(player, 'setheli', heli, ped)
})

alt.onClient('survivalfinish', (player, rp, money)=>{
    alt.emitClient(player, 'rppoint', rp);
    alt.log('survival finish', player.name, 'rp ', rp, 'money ', money)
    let cash = alt.setInterval(()=>{
        alt.clearInterval(cash);
        alt.emitClient(player, 'gotmoney', money)
        player.dimension = 0
        alt.emitClient(player, 'startshop')
    }, 5000)
})
