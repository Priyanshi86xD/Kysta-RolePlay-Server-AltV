import * as alt from 'alt-server';
import { carspoints } from './carspawnpoints.js';
import { pedspawnpoints } from './spawnpoints.js';

const pedmodel = [
    0x8247D331, 0x2307A353, 0x14D506EE, 0xA5BA9A16, 0x4E4179C6, 0x199881DC, 0x969B6DFE, 0x6F139B54,0x158C439C,0x445AC854,0xBE086EFD,0x54DBEE1F,0x76284640,0xA039335F,0x5C2CF7F8,0x20C8012F,0x36DF2D5D,0xFA389D4F,0x379F9596, 0x2799EFD8,0x1FC37DBC,0xC99F21C4,0x31430342,0xA1435105,0x168775F6,0x51C03FA4,0x4E0CE5D3,0x457C64FB,0xD1CCE036,0xA5720781 ,0x2F4AEC3E,0xC6B49A2F,0x99BB00F8,0x092D9CC1, 0x2A22FBCE,0xDB134533
]

const armyped = [0xF2DAA2ED,0x65793043,0x58D696FE,0x72C0CAD2]

const airpped = 0x62018559

const car = [
    'jackal', 'oracle', 'baller', 'felon2', 'sentinel', 'zion2', 'gresley', 'mesa', 'rocoto', 'premier', 'stratum', 'ninef', 'massacro', 'comet2', 'rapidgt2', 'schafter2', 'peyote', 'tornado', 'bullet', 'voltic', 'rumpo', 'asbo', 'blista', 'prairie', 'bati', 'faggio', 'faggio2', 'hexer', 'chino', 'buccaneer', 'dominator', 'gauntlet', 'moonbeam', 'ruiner', 'stalion', 'asterope', 'cognoscenti', 'fugitive', 'intruder', 'tailgater', 
]

const carcolors = [
1,4,8,10,34,112,118,141,153,31,26,18,20
]

let spoints = [],cpoints = [], peds = [], spawnpos = {x:0, y:0, z:0, h:0}


let citycar1 = carspoints.filter((dist)=> {
    return dist.pos.y < -2000
});
let citycar2 = carspoints.filter((dist)=> {
    return dist.pos.y < -1000 && dist.pos.y > -2000
});
let citycar3 = carspoints.filter((dist)=> {
    return dist.pos.y < 0 && dist.pos.y > -1000
});
let citycar4 = carspoints.filter((dist)=> {
    return dist.pos.y < 2000 && dist.pos.y > 0
});
let citycar5 = carspoints.filter((dist)=> {
    return dist.pos.y < 4000 && dist.pos.y > 2000
});
let citycar6 = carspoints.filter((dist)=> {
    return dist.pos.y < 7000 && dist.pos.y > 4000
});

let city1 = pedspawnpoints.filter((dist)=> {
    return dist.pos.y < -2000 && dist.pos.x < 0;
});
let city1a = pedspawnpoints.filter((dist)=> {
    return dist.pos.y < -2000 && dist.pos.x > 0;
});
let city2 = pedspawnpoints.filter((dist)=> {
    return dist.pos.y < -1000 && dist.pos.y > -2000 && dist.pos.x < 0;
});
let city2a = pedspawnpoints.filter((dist)=> {
    return dist.pos.y < -1000 && dist.pos.y > -2000 && dist.pos.x > 0;
});
let city3 = pedspawnpoints.filter((dist)=> {
    return dist.pos.y < 0 && dist.pos.y > -1000 && dist.pos.x < 0;
});
let city3a = pedspawnpoints.filter((dist)=> {
    return dist.pos.y < 0 && dist.pos.y > -1000 && dist.pos.x > 0;
});
let city4 = pedspawnpoints.filter((dist)=> {
    return dist.pos.y < 3000 && dist.pos.y > 0 && dist.pos.x < 0;
});
let city4a = pedspawnpoints.filter((dist)=> {
    return dist.pos.y < 3000 && dist.pos.y > 0 && dist.pos.x > 0;
});
let city5 = pedspawnpoints.filter((dist)=> {
    return dist.pos.y < 7000 && dist.pos.y > 3000 && dist.pos.x < 0;
});
let city5a = pedspawnpoints.filter((dist)=> {
    return dist.pos.y < 7000 && dist.pos.y > 3000 && dist.pos.x > 0;
});

let vehiclewander = 0

let pa =8000, pednum = [], po = 0;

setInterval(() => {
    
    for(let player of alt.Player.all) {

        let pos = player.pos;
            let pveh = alt.Vehicle.all.filter((data)=>{
                return data.getSyncedMeta('wandercar') == player.id
            })

    if(pos.x > 1866.93 && pos.y < -3108 ) {
        alt.emitClient(player, 'stopshop');
    }

    for(let veh of pveh) {
        if(!veh) {} else {
        let dist = getdistance2d(pos.x, pos.y, veh.pos.x, veh.pos.y);
        if(dist >= 200) {
            if(!veh) {} else {
                veh.destroy()
                vehiclewander -= 1;
            }
        }
        }
    }
    let copveh = alt.Vehicle.all.filter((data)=>{
        return data.getSyncedMeta('chasecar') == player.id
    })
    for(let veh of copveh) {
        if(!veh) {} else {
        let dist = getdistance2d(pos.x, pos.y, veh.pos.x, veh.pos.y);
        if(dist >= 200) {
            if(!veh) {} else {
                veh.destroy()
            }
        }
        }
    }


    }
    
}, 2000);

function getspawndata(pos, cardata) {
let carsdata =[]
    for(let i in cardata) {
        let dist = getdistance2d(pos.x, pos.y, cardata[i].pos.x, cardata[i].pos.y);
        if(dist <= 200 && dist > 100) {
            carsdata.push(cardata[i])
        }
    }

return {carspawndata: carsdata}
}


function createwanderped(model, pos, player) {
    if(spoints[pos.name] > 0) {} else {
        alt.emitAllClients('createped', model, pos);
        spoints[pos.name] = player.id;
    }
}

alt.onClient('wandercar', (player, pos) =>{
    let dist = getdistance2d(pos.x, pos.y, spawnpos.x, spawnpos.y);
            if(dist > 10 ) {
            
    let max = 20
    let carmodel = car;
    let color = true
    let ped = pedmodel[getRandomInt(0, pedmodel.length-1)]
    let pveh = alt.Vehicle.all.filter((data)=>{
        return data.getSyncedMeta('wandercar') == player.id
    })
    let pvehs = alt.Vehicle.all.filter((data)=>{
        return data.hasSyncedMeta('wandercar')
    })
    if(pos.y > 1500) {
        max = 5
    }
    if(pos.x < -1241.16 && pos.x > -2747.72 && pos.y < 3094.46 && pos.y > 2551.41) {
        carmodel = ['crusader','barracks3','rhino','barracks2']
        ped = armyped[getRandomInt(0, armyped.length-1)]
        max = 5
        color = false
    } 
    if(pos.x < -460 && pos.x > -2754.72 && pos.y < -2702.6 && pos.y > -3556.38) {
        carmodel = ['airtug', 'ripley']
        ped = airpped
        max = 3
        color = false
    } 
    if(pveh.length < max) {
        if(pvehs.length < 100) {
            if(pos.x < 1902.51 && pos.x > 1567.97 && pos.y < 2838.02 && pos.y > 2403.49) { } 
            else {
                createwandercar(carmodel[getRandomInt(0,carmodel.length-1)],pos, player, ped, color);
                spawnpos = pos
            }   
        }
}
}
})


function createwandercar(model, pos, player, ped, color) {
    //if(vehiclewander < 500) {
    let vehwander = new alt.Vehicle(model, pos.x, pos.y, pos.z, 0,0,0);
    if(color == true) {
        vehwander.primaryColor = carcolors[getRandomInt(0, carcolors.length-1)]
        vehwander.secondaryColor = 0;
        vehwander.pearlColor = 0;
    }
    vehwander.numberPlateText = 'FC '+vehwander.id+' WK';
    vehwander.setSyncedMeta("wandercar", player.id)
    vehwander.setSyncedMeta("tank", getRandomInt(30, 80));
    vehwander.setSyncedMeta('rentcar', 0);

    alt.emitAllClients('setcarwander', vehwander, pos, ped);
    //cpoints[vehpos.name] = 1;
    vehiclewander += 1;
    //let reset = alt.setInterval(()=>{
        //cpoints[vehpos.name] = 0;
       // alt.clearInterval(reset);
    //}, 15000);
   // } else {
       // alt.log('vehiclewander total', vehiclewander)
//}
}

alt.onClient('removewandercar', (player, veh)=>{
    if(!veh) {}
    else {
        veh.destroy();
        vehiclewander -= 1;
        //alt.log('vehicle total', vehiclewander)
    }
})

alt.onClient('removechasecar', (player, veh)=>{
    if(!veh) {}
    else {
        veh.destroy();
    }
})

alt.onClient('carpedjacked', (player, car)=>{
    alt.emitAllClientsRaw('pedcarjacked', player, car)
})

alt.onClient('carpedkilled', (player, car)=>{
    alt.emitAllClientsRaw('pedcardead', player, car)
})

alt.on('playerConnect', (player) => {
    peds[player.id] = 'nothing'
   // player.setMeta('peds', 'nothing')

});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getdistance2d(x,y,x1,y1) {
    let distx, disty
    if(x > x1) {
        distx = x - x1;
    } else if(x1 > x) {
        distx = x1 - x;
    }
    if(y > y1) {
        disty = y - y1;
    } else if(y1 > y) {
        disty = y1 - y;
    }
    let dist = Math.sqrt((distx*distx) + (disty*disty));
    return Math.floor(dist);
}

