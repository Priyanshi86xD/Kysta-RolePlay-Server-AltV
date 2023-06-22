import * as alt from 'alt-client';
import { getMeta, hasMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import { pedspawnpoints } from './spawnpoints.js';

const player = alt.Player.local.scriptID;

const pedmodel = [
    0x8247D331, 0x2307A353, 0x14D506EE, 0xA5BA9A16, 0x4E4179C6, 0x199881DC, 0x969B6DFE, 0x6F139B54,0x158C439C,0x445AC854,0xBE086EFD,0x54DBEE1F,0x76284640,0xA039335F,0x5C2CF7F8,0x20C8012F,0x36DF2D5D,0xFA389D4F,0x379F9596, 0x2799EFD8,0x1FC37DBC,0xC99F21C4,0x31430342,0xA1435105,0x168775F6,0x51C03FA4,0x4E0CE5D3,0x457C64FB,0xD1CCE036,0xA5720781 ,0x2F4AEC3E,0xC6B49A2F,0x99BB00F8,0x092D9CC1, 0x2A22FBCE,0xDB134533
]
const armyped = [0xF2DAA2ED,0x65793043,0x58D696FE,0x72C0CAD2]

const labped = [0x4117D39B]

const jailped = [0x5F2113A1,0x7B9B4BC0,0xB1BB9B59, 0x56C96FC6]

const scens = [
    'WORLD_HUMAN_STAND_MOBILE', 'WORLD_HUMAN_DRINKING', 'WORLD_HUMAN_STAND_IMPATIENT','WORLD_HUMAN_SMOKING','WORLD_HUMAN_STAND_MOBILE_UPRIGHT','EAR_TO_TEXT'
]

const drivestyle = [
    786603, // Normal,
    2883621, // Ignore Lights,
    786468, // Avoid Traffic,
    1076, //crazy
    8388614, //precise
    786491,
    262144, //"Take shortest path"
    16777216, // "Ignore all pathing" (Goes straight to destination)
]
let pedspawns = [], pednum =[], pedpos=[], maxped = 0, pedwander = 0

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

let peds =[]
let striper = [0x028ABF95, 0x6E0FB794,  0x14C3E407]
let model = striper[native.getRandomIntInRange(0,2)]


alt.on("pdmped", () => {
    chairped('simeon', 4, 0xC0937202, -31.38020133972168, -1106.377685546875, 26.422340393066406 , 0,'PROP_HUMAN_SEAT_COMPUTER',867556671) 
    chairped('pdmsvc', 5, 0x5972CCF0, -56.95058059692383,-1099.068115234375,26.42237663269043, 90,'PROP_HUMAN_SEAT_CHAIR_UPRIGHT', -109356459);
});

const pedestrian = [
    {name: 1001, type: 6, model: 0x5E3DA4A4, x: 431.687, y:-984.598, z:30.711, r:90, scen: 'WORLD_HUMAN_COP_IDLES', animdict:"", animname:""},
    {name: 1002,type: 6, model: 0x5E3DA4A4, x: 432.553, y:-978.959, z:30.711,r: 100, scen:'WORLD_HUMAN_COP_IDLES', animdict:"", animname:""},
    {name: 1003,type: 6, model: 0x5E3DA4A4, x: 620.5913, y:19.4672, z:88.0634,r: 0, scen:'WORLD_HUMAN_COP_IDLES', animdict:"", animname:""},
    {name: 1004,type: 6, model: 0x5E3DA4A4, x: 639.8525, y:-1.4872, z:82.7874,r: 260, scen:'WORLD_HUMAN_COP_IDLES', animdict:"", animname:""},
    {name: 1005,type: 6, model: 0x5E3DA4A4, x: 641.4476, y:3.2599, z:82.7864 ,r: 260, scen:'WORLD_HUMAN_COP_IDLES', animdict:"", animname:""},
    {name: 1006,type: 6, model: 0x5E3DA4A4, x: 442.6953, y:-981.3184, z:30.6896 ,r: 0,scen: 'WORLD_HUMAN_COP_IDLES', animdict:"", animname:""},
    {name: 1007,type: 6, model: 0x5E3DA4A4, x: 441.1809, y:-978.4889, z:30.6896 ,r: 180,scen: 'WORLD_HUMAN_CLIPBOARD', animdict:"", animname:""},
    {name: 1008,type: 6, model: 0x5E3DA4A4, x: -1093.8456, y:-808.8433, z:19.2858 ,r: 10, scen:'WORLD_HUMAN_COP_IDLES', animdict:"", animname:""},
    {name: 1009,type: 6, model: 0x5E3DA4A4, x: -1092.3324, y:-807.7886, z:19.2761,r: 35, scen:'WORLD_HUMAN_COP_IDLES', animdict:"", animname:""},
    {name: 10010,type: 6, model: 0x5E3DA4A4, x: -1112.6421, y:-851.7892, z:13.4874,r:110, scen:'WORLD_HUMAN_COP_IDLES', animdict:"", animname:""},
    {name: 10011,type: 6, model: 0x5E3DA4A4, x: -449.7457, y:6011.2754, z:31.7164, r: 0, scen:'WORLD_HUMAN_CLIPBOARD', animdict:"", animname:""},
    {name: 10012,type: 6, model: 0x5E3DA4A4, x: -448.4981, y:6012.6733, z:31.7164,r: 320, scen:'WORLD_HUMAN_COP_IDLES', animdict:"", animname:""},
    {name: 10013,type: 4, model: 0x5244247D,  x: -140.80453491210938,  y: 231.0335235595703,  z: 94.95147705078125,r: 22, scen:'WORLD_HUMAN_COP_IDLES', animdict:"", animname:""},//saitama
    {name: 10014,type: 4, model: 0xB3B3F5E6 , x:111.01768493652344,  y:-1284.203369140625,  z:28.26094627380371, r:236, scen:'WORLD_HUMAN_STRIP_WATCH_STAND',animdict:"", animname:""},
    {name: 10015, type: 4, model: 0xE716BDCB , x:110.5965576171875, y:-1293.818115234375,  z:28.260950088500977, r:0, scen: 'WORLD_HUMAN_STRIP_WATCH_STAND', animdict:"", animname:""},
    {name: 10016, type: 5, model: model , x:112.50567626953125, y:-1286.723388671875,  z: 28.45868492126465, r:0, scen: '', animdict:"mini@strip_club@pole_dance@pole_dance2", animname:"pd_dance_02"},
    {name: 10017, type: 5, model: 0x780C01BD , x:129.15089416503906, y:-1283.4727783203125, z: 29.278240203857422, r:120, scen: '', animdict:"anim@amb@nightclub@mini@drinking@bar@drink_v2@idle_a", animname:"idle_a_bartender"},
    
]

let cops = []

function createped(pedid, pedtype, pedm, x, y, z, rot,scen, animdict, animname){
native.requestModel(pedm);

let pedmake = alt.setInterval(()=>{
    alt.clearInterval(pedmake);
 let ped = native.createPed(pedtype, pedm, x, y, z, rot, false, false)
 peds.push(ped)
 pedwander += 1

// let pblip = native.addBlipForEntity(ped);
 //native.setBlipAsFriendly(pblip, true);
 if(ped == 0x5E3DA4A4) {
    cops.push(ped);
    native.setPedAsCop(ped, true);
 }
 if(pedtype == 6) {
    native.giveWeaponToPed(ped, 0x1B06D571, 300, false, false);
    native.taskShootAtEntity(ped, player, 10000, 7);
 }
native.taskWanderStandard(ped,rot,10);
native.setModelAsNoLongerNeeded(pedm)

},300)

}

alt.onServer('createped', (data)=>{
    createped(data.name, 5, data.model, data.x,data.y,data.z,data.h,data.scen, "","" );
})

alt.on('deleteped', (peddata)=>{
    native.deleteEntity(peds[peddata])
})

function chairped(pedid, pedtype, ped, x, y, z, rot, scen, kursi){
native.requestModel(ped)
let cpos;
let chair = native.getClosestObjectOfType(x, y, z, 2, kursi, false, false, false);

let pedmake = alt.setInterval(()=>{

native.freezeEntityPosition(chair, true);
cpos = native.getEntityCoords(chair, false);
let ped1 = native.createPed(pedtype, ped, x, y, z, rot, false, false)
peds.push(ped1);

native.setEntityNoCollisionEntity(chair, ped1, false);
native.taskStartScenarioAtPosition(ped1, scen, cpos.x, cpos.y, cpos.z+0.5, native.getEntityHeading(chair) + 180.0, 1, false, true);
    alt.clearInterval(pedmake);
    native.setModelAsNoLongerNeeded(ped)
    if(ped == 0x9B810FA2) {
      native.setPedComponentVariation(ped1, 3,26,0,0);
        native.setPedComponentVariation(ped1, 4,21,0,0);
       native.setPedComponentVariation(ped1, 6,6,0,0);
    }
}, 300)

}

const car = [
    'jackal', 'oracle', 'baller', 'felon2', 'sentinel', 'zion2', 'gresley', 'mesa', 'rocoto', 'premier', 'stratum', 'ninef', 'massacro', 'comet2', 'rapidgt2', 'schafter2', 'peyote', 'tornado', 'bullet', 'voltic', 'rumpo', 'asbo', 'blista', 'prairie', 'bati', 'faggio', 'faggio2', 'hexer', 'chino', 'buccaneer', 'dominator', 'gauntlet', 'moonbeam', 'ruiner', 'stalion', 'asterope', 'cognoscenti', 'fugitive', 'intruder', 'tailgater', 
]

let carpeds =[]
let clubpeds = 0
let carcreate = 0, currentpos = 0

alt.onServer('startwandercar', ()=>{
    if(carcreate == 0) {
        carwanderstart();
    }

});

//carwanderstart()

function carwanderstart() {
    native.canCreateRandomDriver()

carcreate = alt.setInterval(()=>{
if(currentpos >= 6) {
    currentpos = 0
} else {
    currentpos += 1
}
    let pos1 = alt.Player.local.pos;
    
    if(pos1.y < -1000 && pos1.x < 500) {
    let clubs = native.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, 135.548096, -1308.388306, 28.344141, true);
if(clubs <= 50) {
    if(clubpeds == 0) {
    clubpeds += 1;
   chairped('trevor', 4, 0x9B810FA2 , 94.58936309814453, -1293.161865234375, 29.268762588500977, 0,'PROP_HUMAN_SEAT_CHAIR_DRINK_BEER', alt.hash('v_club_officechair'));
}
} else if(clubs > 200) {
    if(clubpeds == 1) {
        clubpeds = 0;
    }
}}

const location = [
    {x:pos1.x+100, y:pos1.y, z:pos1.z},
    {x:pos1.x+100, y:pos1.y+100, z:pos1.z},
    {x:pos1.x, y:pos1.y+100, z:pos1.z},
    {x:pos1.x-100, y:pos1.y, z:pos1.z},
    {x:pos1.x, y:pos1.y-100, z:pos1.z},
    {x:pos1.x-100, y:pos1.y-100, z:pos1.z},
    {x:pos1.x, y:pos1.y+100, z:pos1.z},
]
let pos = location[currentpos]

let zonename = native.getNameOfZone(pos.x,pos.y,pos.z);
if(zonename !== "CMSW" || zonename !=="MTChil" || zonename !=="MTGordo" || zonename !=="MTJose" || zonename !=="SanChia" || zonename !=="Tatamo" ) {

let h = native.getHeadingFromVector2d((pos1.x - pos.x), (pos1.y - pos.y))
let roadpos1 = native.getRoadBoundaryUsingHeading(pos.x, pos.y, pos.z, h, pos);

let spawnpos1 = {x: roadpos1[1].x, y: roadpos1[1].y, z: roadpos1[1].z, h}


    let see = alt.isPointOnScreen(spawnpos1.x, spawnpos1.y, spawnpos1.z);
    if(see == false) {
        alt.emitServerRaw('wandercar', spawnpos1)
    }
} else {}

for (let veh of alt.Vehicle.all) {
    if (veh.scriptID > 0 &&  veh.hasSyncedMeta('wandercar')) {
        let carId = veh.getSyncedMeta('wandercar');
        if(carId == alt.Player.local.id) {
            let isdrown = native.isEntityInWater(veh);
            if(isdrown == true) {
                alt.emitServer('removewandercar', veh);
            }       
    }

}
}

for(let i in pedestrian) {
    
    if(peds[pedestrian[i].name] > 0) {

    } else {
    let dist = native.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pedestrian[i].x, pedestrian[i].y, pedestrian[i].z, true);
    if(dist <= 100) {
        
        native.requestModel(pedestrian[i].model)
        native.requestAnimDict(pedestrian[i].animdict)
        let pedmake = alt.setInterval(()=>{
            pedestrian[i].name = native.createPed(pedestrian[i].type, pedestrian[i].model,pedestrian[i].x, pedestrian[i].y,pedestrian[i].z,pedestrian[i].r,false,false,false);
            peds[pedestrian[i].name] = pedestrian[i].name
            if(pedestrian[i].model == 0x5244247D) { //saitama
            native.setPedComponentVariation(pedestrian[i].name, 0,0,0,0);
            native.setPedComponentVariation(pedestrian[i].name, 3,0,0,0);
            }
            if(pedestrian[i].type == 6) {
               native.giveWeaponToPed(pedestrian[i].name, 0x1B06D571, 300, false, false);
               native.taskShootAtEntity(pedestrian[i].name, player, 10000, 7);
               if(pedestrian[i].model == 0x5E3DA4A4) {
                cops.push(pedestrian[i].name)
               }
               
            }
            native.taskStartScenarioInPlace(pedestrian[i].name, pedestrian[i].scen, -1, false);
            alt.clearInterval(pedmake);
            let interval = alt.setInterval(() => { 
                native.setModelAsNoLongerNeeded(pedestrian[i].model)
                if (native.hasAnimDictLoaded(pedestrian[i].animdict)) {
                     alt.clearInterval(interval);
                     native.taskPlayAnim(pedestrian[i].name, pedestrian[i].animdict, pedestrian[i].animname, 8.0, 1, -1, 1, 1, false, false, false);
                 }
            }, 200);
           },200)

           
        //createped(pedestrian[i].name, pedestrian[i].type,pedestrian[i].model,pedestrian[i].x,pedestrian[i].y,pedestrian[i].z,pedestrian[i].r,pedestrian[i].scen,"","");
        }
    }
            
}


for(let i in carpeds) {
        let sit = native.isPedInAnyVehicle(carpeds[i], true);
        if(sit == false) {
            let see = native.isEntityOnScreen(carpeds[i]);
            if(see == false) {
                native.deleteEntity(carpeds[i]);
            } else {
                native.taskSmartFleeCoord(carpeds[i], pos1.x,pos1.y,pos1.z, 50, 10000, false, true);
            }          
        }  
    }


if(pedwander < 20) {
    let model = pedmodel
        let posa = location[native.getRandomIntInRange(0, location.length-1)]
      //  let dist = native.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, posa.x, posa.y, posa.z, true);
      //  if(dist <= 100) {
        let road = native.getRoadBoundaryUsingHeading(posa.x, posa.y, posa.z, 0, posa)
        let pedpos = native.getPositionBySideOfRoad(road[1].x, road[1].y, road[1].z, 1, road[1])
        let zonename = native.getNameOfZone(pedpos[1].x,pedpos[1].y,pedpos[1].z);
        if(zonename == 'ARMYB') {
            model = [0xF2DAA2ED,0x65793043,0x58D696FE,0x72C0CAD2]
        } else if(zonename == 'HUMLAB') {
            model = [0x4117D39B,]
        } else if(zonename == 'JAIL') {
            model = [0x5F2113A1,0x7B9B4BC0,0xB1BB9B59, 0x56C96FC6]
        }
        createped(peds.length, 5,model[native.getRandomIntInRange(0, model.length-1)] , pedpos[1].x,pedpos[1].y,pedpos[1].z, native.getRandomIntInRange(0,360), "","","");
        
}

for(let i in peds) {
    if(peds[i]) {
        let pos2 = native.getEntityCoords(peds[i], false);
        let dist = native.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, true);
        if(dist > 200) {
            native.deleteEntity(peds[i]);
            peds[i] = 0
            pedwander -= 1
        }
    }
}

}, 1000)

alt.onServer('stopwandercar', ()=>{
    if(carcreate > 0) {
        alt.clearInterval(carcreate);
        carcreate = 0
    }
    
    for(let i in cops) {
        if(cops[i]) {
            native.deleteEntity(cops[i])
        }
    }
    for(let i in peds) {
        if(peds[i]) {
            native.deleteEntity(peds[i])
        }
    }
    let del = alt.setInterval(()=>{
        cops = [];
        peds = []
        alt.clearInterval(del);
    }, 2000);
    
})

}


alt.onServer('createwanderped', (tmodel, data, max)=>{
//alt.log('pedwader', pedwander, 'max', max)
    let model = tmodel
    let pos1 = alt.Player.local.pos
    maxped = max
    if(pedwander < max) {
    let dist = native.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, data.pos.x, data.pos.y, data.pos.z, true);
        if(dist <= 100) {
            
        let zonename = native.getNameOfZone(data.pos.x, data.pos.y, data.pos.z);
        if(zonename == 'ARMYB') {
            model = armyped[native.getRandomIntInRange(0, armyped.length-1)]
        } else if(zonename == 'HUMLAB') {
            model = [0x4117D39B,]
        } else if(zonename == 'JAIL') {
            model = [0x5F2113A1,0x7B9B4BC0,0xB1BB9B59, 0x56C96FC6]
        }
    createped(data.name, 5, model, data.pos.x, data.pos.y, data.pos.z, data.pos.h, "", "", "" );
    }  
    }
})

alt.onServer('setcitypeds', (data, name)=>{
    pedpos = data
    for(let i in peds) {
        if(peds[i]) {
            native.deleteEntity(peds[i])
        }
    }
    peds = []
    pedwander = 0
    //alt.log('pedata updated', pedpos.length, name)
})


alt.onServer('setcarwander', (veh, pos, model)=>{
    let dmodel;
   // let zonename = native.getNameOfZone(pos.x,pos.y,pos.z);
     //   if(zonename == 'ARMYB') {
      //  dmodel = armyped[native.getRandomIntInRange(0,armyped.length-1)]
 //   } else {
   //     dmodel = model
  //  } 
    native.setEntityHeading(veh, pos.h);
   native.setVehicleOnGroundProperly(veh, 5.0)
   native.requestModel(model)
   
let drive = alt.setInterval(()=>{
   // let driverped = native.createRandomPedAsDriver(veh, false);
    let driverped = native.createPedInsideVehicle(veh, 5, model, -1, false, false);
    native.setPedCanRagdoll(driverped, true);
    native.setPedCanRagdollFromPlayerImpact(driverped, true);
    native.setPedCanBeShotInVehicle(driverped, true);
    native.setPedCanBeDraggedOut(driverped, true);
    native.setPedCanBeKnockedOffVehicle(driverped, 1)
    native.taskVehicleDriveWander(driverped, veh, 15, drivestyle[0]);
    //let cblip = native.addBlipForEntity(veh);
   // native.setBlipColour(cblip, 3)
    carpeds.push(driverped);
    native.setModelAsNoLongerNeeded(model);
    alt.clearInterval(drive);
}, 200);
});

alt.on('requestped', (pos, dists, job)=>{
    let pedds =[]
    for(let i in pedpos) {
        let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, pedpos[i].pos.x, pedpos[i].pos.y, pedpos[i].pos.z, true);
        if( dist < dists ) {
            if(pedds.length == 10) {
                alt.emit(job, pedds[native.getRandomIntInRange(0,9)])
            } else {
                pedds.push(pedpos[i].pos); 
            }
        }
    }
})
function wanderpeds(city) {
    
        for(let i in peds) {
            if(!peds[i]) {} else {
            native.deleteEntity(peds[i]);
            
            }
        }
    
    //alt.log('pedtotal', city.length, peds.length, pednum.length)
    peds = []
    for(let i in pednum) {
        let model = pedmodel
        if(city[pednum[i]]) {
        let zonename = native.getNameOfZone(city[pednum[i]].pos.x,city[pednum[i]].pos.y,city[pednum[i]].pos.z);
        if(zonename == 'ARMYB') {
            model = [0xF2DAA2ED,0x65793043,0x58D696FE,0x72C0CAD2]
        } else if(zonename == 'HUMLAB') {
            model = [0x4117D39B,]
        } else if(zonename == 'JAIL') {
            model = [0x5F2113A1,0x7B9B4BC0,0xB1BB9B59, 0x56C96FC6]
        }
            createped(city[pednum[i]].name, 5,model[native.getRandomIntInRange(0, model.length-1)] , city[pednum[i]].pos.x,city[pednum[i]].pos.y,city[pednum[i]].pos.z, native.getRandomIntInRange(0, 360), scens[native.getRandomIntInRange(0, scens.length-1)],"","");   
    }
    }    
}
