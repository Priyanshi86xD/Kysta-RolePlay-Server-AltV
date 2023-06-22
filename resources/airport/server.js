import * as alt from 'alt-server';

const airport = [
{x: -1042.5313720703125,    y: -2745.447998046875,    z: 21.35940170288086}, 
{x: -964.5941162109375,    y: -2800.050048828125,    z: 14.239081382751465},
{x: -2301.202880859375,    y: 3389.962890625,    z: 31.02276611328125   }, //zancudo
]

const islandcarpos = [
    {  x: 4517.88232421875, y: -4499.8623046875,  z: 3.493098258972168, h: 290.4847106933594 }
]

const carmodel = [
    0xF376F1E6, 0x40C332A3, 0x11CBC051
]

let islandcars = [], islandplayers = 0, yanktoncars = [], yanktonplayers = 0

let hangarjob = {
    titanjob : false, 
    cargobobjob : false, 
    escortjob : true
}

let airp = new alt.ColshapeCylinder(airport[0].x, airport[0].y, airport[0].z-1, 2, 1.1);
let hang = new alt.ColshapeCylinder(airport[1].x, airport[1].y, airport[1].z-1, 2, 1.1);
let zanc = new alt.ColshapeCylinder(airport[2].x, airport[2].y, airport[2].z-1, 2, 1.1);

let escortplane, titanpilot, helichase1, helichase2

alt.onClient('hangarjob', (player, type)=>{
    if(hangarjob[type] == false) {
        alt.emitClient(player, 'hangarjobready', type, true)
    } else {
        alt.emitClient(player, 'hangarjobready', type, false)
    }
})

alt.onClient('hangarjobstart', (player, type)=>{
    hangarjob[type] = true;
    if(type == 'titanjob') {
        hangarjob.escortjob = false;
        alt.emitAllClients('escortjobnotif', player)
    }

})

alt.onClient('escortplaneset', (player)=>{
    escortplane = player.vehicle
    titanpilot = player
    alt.log('titan job start, escortjob ready')
})

alt.onClient('titanjobwarn', (player)=>{

    alt.emitAllClients('escortattackjob', escortplane)
})

alt.onClient('hangarjobfinish', (player, type, success)=>{
    if(type !== 'escortjob') {
        hangarjob[type] = false;
    }
    alt.log(player.name, 'hangarjob complete', type)
    if(type == 'titanjob') {
        for(let Player of alt.Player.all) {
            if(Player.hasSyncedMeta('escortveh')) {
                player.deleteSyncedMeta('escortveh')
                alt.emitClient(Player, 'escortjobfinish', success)
            }
        }
    }
})

alt.on('entityEnterColshape', (colshape, entity) => {
    if(entity instanceof alt.Player) {
        if(colshape == airp) {
            alt.emitClient(entity, 'airportmenu');
        } else if(colshape == hang) {
            alt.emitClient(entity, 'hangarmenu')
        } else if(colshape == zanc) {
            alt.emitClient(entity, 'zancudomenu')
        }
    }
});

alt.onClient('traveling', (player)=>{
    alt.emitClient(player, 'stopshop');
    alt.emitClient(player, 'stopwandercar');
})

alt.onClient('backtoLS', (player, from)=>{
    if(from == 'island') {
        islandplayers -= 1
    } else if(from == 'yankton') {
        yanktonplayers -= 1
    }
    alt.emitClient(player, 'startshop');
    alt.emitClient(player, 'startwandercar');
    if(islandplayers == 0) {
        for(let i in islandcars) {
            if(islandcars[i]) {
                islandcars[i].destroy()
            }
            islandcars = []
        }
    }
    if(yanktonplayers == 0) {
        for(let i in yanktoncars) {
            if(yanktoncars[i]) {
                yanktoncars[i].destroy()
            }
            yanktoncars = []
        }
    }
})

alt.onClient('cayoisland', (player)=>{
    islandplayers += 1
    for(let i in islandcarpos) {
        let car = new alt.Vehicle(carmodel[0],islandcarpos[i].x,islandcarpos[i].y,islandcarpos[i].z,islandcarpos[i].h,0,0 );
        car.setSyncedMeta('tank', 90);
        car.numberPlateText = 'CP '+car.id
        islandcars.push(car);
    }
})


alt.onClient('zancudoveh', (player, model, pos)=>{
    alt.log(model)
    let pveh = player.getSyncedMeta('pegasusveh');
    if(pveh) {
        pveh.destroy()
    }
    let veh = new alt.Vehicle(model, pos.x, pos.y, pos.z, 0,0,0)
    player.setSyncedMeta('pegasusveh', veh)
    veh.setSyncedMeta('tank', 100);
    alt.emitClientRaw(player, 'airpheading', veh, pos.h, true)
})

alt.onClient('buyhangar', (player, data)=>{
    alt.emitClient(player, 'savehangar', data)
})

alt.onClient('insidehangar', (player)=>{
    player.dimension = player.id
    let planes = []
    player.setSyncedMeta('hangarveh', planes)
    //alt.emitClient(player, 'sethangarplanes')
})

alt.onClient('hangarplanes', (player, data, pos, vslot)=>{
    let planes = player.getSyncedMeta('hangarveh');
    if(data.model) {
        let plane = new alt.Vehicle(data.model, pos.x, pos.y, pos.z, 0,0,0);
        if(vslot == null) {
            let pveh = player.getSyncedMeta('personalaircraft');
            if(pveh) {
                pveh.destroy()
            }
            alt.emitClient(player, 'carblip', plane)
            player.setSyncedMeta('personalaircraft', plane)
        } else {
            plane.dimension = player.id;
            alt.emitClient(player, 'setplaneslot', vslot, plane, data)
            planes.push(plane);
            player.setSyncedMeta('hangarveh', planes)
        }
        let vdata = {
            slot : vslot,
            owner : player.id,
            data : data
        }
        plane.setSyncedMeta('owner', vdata)
        plane.setSyncedMeta('tank', 100);
       
        alt.emitClient(player, 'airpheading', plane, pos.h, false)
        
        plane.primaryColor = data.color1;
        plane.secondaryColor = data.color2;
        plane.pearlColor = data.pearls;
        let mkit = plane.modKitsCount
        //if(mkit > 1) {
            plane.modKit = 1
            plane.setMod(48, data.livery+1);
            plane.setMod(11, data.engine+1);
            plane.setMod(12, data.handling+1);
            plane.setMod(16, data.armor+1);
            plane.setMod(3, data.tank+1);
            plane.setMod(10, data.weapon+1);
        //}
    }
})

alt.onClient('updatevehdata', (player, data)=>{
    let pdata = player.vehicle.getSyncedMeta('owner')
    let vdata = {
        slot : pdata.slot,
        owner : player.id,
        data : data
    }
    player.vehicle.setSyncedMeta('owner', vdata)
})


alt.onClient('hangarout', (player)=>{

    player.dimension = 0
    if(player.vehicle) {
        let pveh = player.getSyncedMeta('personalaircraft');
        if(pveh) {
            pveh.destroy()
            player.setSyncedMeta('personalaircraft', player.vehicle)
        } else {
            player.setSyncedMeta('personalaircraft', player.vehicle)
        }
        player.vehicle.dimension = 0
       
    }
    
    let planes = player.getSyncedMeta('hangarveh');
    if(planes.length > 0) {
        for(let i in planes) {
            if(planes[i] && planes[i].dimension == player.id) {
                planes[i].destroy()
            }
        }
    }

})

alt.onClient('removeplanes', (player, veh)=>{
    if(veh) {
        veh.destroy()
    }
})

alt.onClient('escortplanestart', (player)=>{
    //let plane = new alt.Vehicle(model, pos.x, pos.y, pos.z, 0,0,0);
    //escortplane = plane
    //alt.emitClient(player, 'setescortplane', escortplane)
        player.setSyncedMeta('escortveh', escortplane)
    
})

alt.onClient('hangarhelichase', (player, pos) =>{
    let chaseheli = []
    if(player.hasSyncedMeta('helichase')) {
        chaseheli = player.getSyncedMeta('helichase')
    } 
    let heli = new alt.Vehicle('buzzard', pos.x, pos.y, pos.z,0,0,0);
    chaseheli.push(heli);
    player.setSyncedMeta('helichase', chaseheli)
    //alt.log(player.name, ' chaseheli ', chaseheli)
    alt.emitClientRaw(player, 'setchaseheli', heli)
})
