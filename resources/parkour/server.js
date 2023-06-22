import * as alt from 'alt-server';

const colors = [
    150,135,134,89,55,70,41,3,0,39,42,140,136,92,
]

let parkourcar = [
    {ready : null},{ready : null},{ready : null},{ready : null},{ready : null},{ready : null},{ready : null},{ready : null},{ready : null},
]

alt.onClient('startparkour', (player, course)=>{
    if(parkourcar[course].ready == null) {
        alt.emitAllClients('setparkour', course, player );
    } else {
        alt.emitClient(player, 'This Challenge already active, join using Player Menu  ~INPUT_INTERACTION_MENU~')
    }
})

alt.onClient('parkourjoin', (player, data)=>{
    player.setSyncedMeta('parkour', data)
    player.giveWeapon(0xFBAB5776, 10, true);
    alt.log(player.name, 'join parkour', type);
})

alt.onClient('parkourcar', (player, data, course)=>{
    if(parkourcar[course].ready == null) {
    let veh = new alt.Vehicle(data.prop, data.position.x,data.position.y,data.position.z, data.rotation.x,data.rotation.y,data.rotation.z);
    veh.setSyncedMeta('parkourcar', course);
    veh.setSyncedMeta('tank', 100);
    veh.numberPlateText = 'PARKOUR'
    veh.primaryColor = colors[getRandomInt(0, colors.length-1)]
    }
})

alt.onClient('courseready', (player, type)=>{
parkourcar[type].ready = true;
player.setSyncedMeta('parkour', type);
player.giveWeapon(0xFBAB5776, 10, true);
alt.log(player.name, 'start parkour', type);

})

alt.onClient('coursefinish', (player, type)=>{
    alt.emitClient(player, 'rppoint', 100);
    let bonus = alt.setInterval(()=>{
        player.giveWeapon(0xFBAB5776, 10, true);
        alt.emitClient(player, 'gotmoney', 100000);
        alt.log(player.name, 'finish parkour', type);
        if(player.vehicle) {
            player.vehicle.deleteSyncedMeta('parkourcar')
            if(player.vehicle.model == 1233534620) {

            }
        }
        alt.clearInterval(bonus);
    },2000)
})

alt.onClient('parkourend', (player, type)=>{
    player.deleteSyncedMeta('parkour');
    let players = alt.Player.all.filter(data=>{
        return data.hasSyncedMeta('parkour') && data.getSyncedMeta('parkour') == type;
    })
    if(players.length < 1) {
        parkourcar[type].ready = null;
        for(let veh of alt.Vehicle.all) {
            if(veh.getSyncedMeta('parkourcar') == type) {
                veh.destroy();
            }
        }
    }
})
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}