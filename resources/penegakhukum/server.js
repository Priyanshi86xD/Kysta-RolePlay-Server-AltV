import alt from 'alt-server';

let officer = []

let policecopter = new alt.Vehicle('polmav', 448.2987365722656,-982.0383911132812, 43.69166946411133,0,0,0);
policecopter.setSyncedMeta('tank', 100);

alt.onClient('policeonduty', (player)=>{
    officer[player.id] = player.id;
    player.setSyncedMeta("onduty", 1);
    player.maxHealth = 200;
    player.maxArmour = 100;
})

alt.onClient('policeoffduty', (player, money)=>{
    player.deleteSyncedMeta("onduty");
    alt.emitClient(player, 'gotmoney', money)
    let veh = player.getMeta('policecar');
    officer[player.id] = null;
    if(!veh) {} 
    else {
        veh.destroy();
        player.deleteMeta('policecar');
    }
})

alt.onClient('policeweapon', (Player, weapon, comp)=>{
    for(let i in weapon) {
        let weap = alt.hash(weapon[i])
        Player.giveWeapon(weap, 500, false);
        for(let a in comp) {
            Player.addWeaponComponent(weap, comp[a]);
        }
    }
})

alt.onClient('policegarage', (player, ppos)=>{
    player.pos = ppos;
    player.dimension = player.id;
})

alt.onClient('spawnpoliceout', (player, veh)=>{
    player.dimension = 0;
    veh.dimension = 0;
})

alt.onClient('policecar', (player, carmodel)=>{
    if(player.hasMeta('policecar')) {
        let veh = player.getMeta('policecar');
        veh.destroy();
    } else {}

    let vehicle = new alt.Vehicle(carmodel, 406.2132873535156 + 1, -963.2853393554688, -99.00408935546875, 0,0,0);
    vehicle.dimension = player.id;
    vehicle.setSyncedMeta('tank', 100);
    player.setMeta('policecar', vehicle);
    vehicle.numberPlateIndex = 3;
    vehicle.numberPlateText = "COP "+vehicle.id;
    alt.emitClient(player, 'copcar', vehicle);
})

alt.onClient('robbed', (playerd, cashId, cash, stat, pos) =>{
    for(let player of alt.Player.all) {
        if(player.hasSyncedMeta('onduty')) {
            alt.emitClientRaw(player, "robbery", pos, playerd.name)
        }
    }
})

alt.onClient('copkiller', (playerd, pos, copid)=>{
    for(let player of alt.Player.all) {
        if(player.hasSyncedMeta('onduty')) {
            alt.emitClientRaw(player, "copkilled", pos, playerd.name)
        }
    }
})