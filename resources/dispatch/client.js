import * as alt from 'alt-client';
import { getMeta, hasMeta, setMeta } from 'alt-client';
import * as native from 'natives';

let star, cops = [], polices = 0, wanted = 0, copkilled = [], active = null

let criminal = {
    record : {
        copkilled : 0,
        crime : 0
    },
    active : {
        copkilled : 0,
        crime : 0
    }
}

alt.onServer("freeroam:spawned", (number, data)=>{
    if(number == 1) {
        criminal = data.criminal
    }
})

alt.on('copchase', copchase)

function copchase(stars) {
    star = stars;
    if(polices < 10) {
    let pos1 = alt.Player.local.pos;
    const location = [
        {x:pos1.x+100, y:pos1.y, z:pos1.z},
        {x:pos1.x+100, y:pos1.y+100, z:pos1.z},
        {x:pos1.x, y:pos1.y+100, z:pos1.z},
        {x:pos1.x-100, y:pos1.y, z:pos1.z},
        {x:pos1.x, y:pos1.y-100, z:pos1.z},
        {x:pos1.x-100, y:pos1.y-100, z:pos1.z},
        {x:pos1.x, y:pos1.y+100, z:pos1.z},
    ]
    let pos = location[native.getRandomIntInRange(0, location.length-1)]
    let h = native.getHeadingFromVector2d((pos1.x - pos.x), (pos1.y - pos.y))
    
    let roadpos1 = native.getRoadBoundaryUsingHeading(pos.x, pos.y, pos.z, h, pos);
   let spawnpos1 = {x: roadpos1[1].x, y: roadpos1[1].y, z: roadpos1[1].z, h}
    
    alt.emitServer('copchase', spawnpos1, spawnpos1.h, 'police3', 0x5E3DA4A4, "COP ", 0x1B06D571);
}
}

alt.onServer('copchase', (playerid, veh1, head, ped, weap, cop1, cop2, pos)=>{
    native.requestModel(ped);
    let chase = alt.setInterval(()=>{
       if(alt.Player.local.id == playerid) {
        alt.clearInterval(chase);
        native.setEntityHeading(veh1, head);
        native.setVehicleOnGroundProperly(veh1, 5.0)
        pedchasecar(veh1, ped, 0, weap, cop1);
        pedchasecar(veh1, ped, -1, weap, cop2);
       } 
      else {
        alt.clearInterval(chase);
        pedscar(veh1, ped, 0, weap, playerid, cop1, pos);
        pedscar(veh1, ped, -1, weap, playerid, cop2, pos);
      }
    }, 300);
  });


function pedscar(veh, ped, seat, weap, pId, copId, pos) {
let dist = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, pos.x, pos.y, pos.z, true)
if(dist <= 200) {
    let mw = native.createPedInsideVehicle(veh, 6, ped, seat, false, false);
    cops[copId] = mw
    polices += 1
    native.setPedCanRagdoll(mw, true);
    native.giveWeaponToPed(mw, weap, 900, false, true);
    native.taskShootAtEntity(mw, alt.Player.local.scriptID, 0,7) 
    native.setModelAsNoLongerNeeded(ped)
    for(let Player of alt.Player.all) {
        if(Player.id == pId) {
            native.reportPoliceSpottedPlayer(Player);
        }
    }

    let dead = alt.setInterval(()=>{
        let pos = alt.Player.local.pos;
        if(!mw) {
            alt.clearInterval(dead);
                        polices -= 1
                       // alt.log('cops ', polices)
        }
                let mwdead = native.isEntityDead(mw, false);
                if(mwdead == true) {
                   alt.clearInterval(dead);
                   let killer = native.getPedSourceOfDeath(mw);
                   if(killer == alt.Player.local.scriptID) {
                    copkilled.push(mw)
                    alt.emitServerRaw('copkiller', pos, cops[copId]);
    
                    //alt.log('copkilled', copkilled.length)
                    if(hasMeta('trevorjobkill')) {
                        let target = getMeta('trevorjobkill');
                        
                        if(copkilled.length === target) {
                            alt.emit('trevorjobkill', copkilled.length);
                        } else {
                            alt.emitServer('jobstart', 'Cop remaining ~r~'+(target-copkilled.length))
                        }
                        alt.log('copkilled', copkilled.length)
                    }
                    
                    polices -= 1
                    if(wanted > 0) {
                        star += 2
                        copchase(star)
                        wanted = Math.ceil(star/10)
                        setMeta('wanted', wanted)
                        alt.emit('wanted', wanted)
                    } else {
                        copchase(2)
                    }
                    //alt.log('wanted ', star)
                   }
                    native.removeBlip(mwblip);
                    
                  
                 } else {
                    let pos1 = native.getEntityCoords(mw, true);
                    let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, pos1.x, pos1.y, pos1.z, true);
                    if(dist >= 200) {
                        alt.clearInterval(dead);
                        native.deleteEntity(mw);
                        polices -= 1
                       // alt.log('cops ', polices)
                    }
                 }           
    }, 1000)
}
}

function pedchasecar(veh, ped, seat, weap, copId) {
   
    let cped = alt.setInterval(()=>{
        alt.clearInterval(cped);
        native.setVehicleEngineOn(veh, true, true, false)
        let mw = native.createPedInsideVehicle(veh, 6, ped, seat, false, false);

              native.setPedCanRagdoll(mw, true);
                native.giveWeaponToPed(mw, weap, 900, false, true);
        let mwblip = native.addBlipForEntity(mw)
            native.setBlipSprite(mwblip, 3)
            native.setBlipScale(mwblip, 0.5);
            native.setPedAiBlipHasCone(mwblip, true)
            //native.setBlipFlashes(mwblip, true);
            if(wanted == 0) {
                wanted = star
                setMeta('wanted', star)
                alt.emit('wanted', star);
                dispatch(star)
            }
            cops[copId] = mw
            native.setPedAsCop(mw, true);
            polices += 1;
            //native.setCopBlipSpriteAsStandard()
            native.setPoliceRadarBlips(true);
            native.setCopBlipSprite(mwblip, 1)
            native.reportPoliceSpottedPlayer(alt.Player.local.scriptID);

        if(seat == -1) {
            native.setDriverAbility(mw, 1.0);
            native.taskVehicleFollow(mw, veh, alt.Player.local.scriptID, 110, 1074528293, 0);
            native.taskVehicleChase(mw, alt.Player.local.scriptID);
            
        } else {
            native.setEntityIsTargetPriority(alt.Player.local.scriptID, true, 0);
            native.taskVehicleShootAtPed(mw, alt.Player.local.scriptID, 0.9);
            native.taskCombatPed(mw, alt.Player.local.scriptID, 0, 16); 
            //native.taskShootAtEntity(mw, alt.Player.local.scriptID, 10000,7)
        }
        native.setPedTargetLossResponse(mw, 1);
        
    
let dead = alt.setInterval(()=>{
    let pos = alt.Player.local.pos;
    if(!mw) {
        alt.clearInterval(dead);
                    polices -= 1
                   // alt.log('cops ', polices)
    }
            let mwdead = native.isEntityDead(mw, false);
            if(mwdead == true) {
               alt.clearInterval(dead);
               let killer = native.getPedSourceOfDeath(mw);
               if(killer == alt.Player.local.scriptID) {
                copkilled.push(mw)
                alt.emitServerRaw('copkiller', pos, cops[copId]);

                //alt.log('copkilled', copkilled.length)
                if(hasMeta('trevorjobkill')) {
                    let target = getMeta('trevorjobkill');
                    
                    if(copkilled.length === target) {
                        alt.emit('trevorjobkill', copkilled.length);
                    } else {
                        alt.emit('jobstart', 'Cop remaining ~r~'+(target-copkilled.length))
                    }
                    //alt.log('copkilled', copkilled.length)
                }
                
                polices -= 1
                if(wanted > 0) {
                    star += 2
                    copchase(star)
                    wanted = Math.ceil(star/10)
                    setMeta('wanted', wanted)
                    alt.emit('wanted', wanted)
                } else {
                    copchase(2)
                }
                //alt.log('wanted ', star)
               }
                native.removeBlip(mwblip);
                
              
             } else {
                let pos1 = native.getEntityCoords(mw, true);
                let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, pos1.x, pos1.y, pos1.z, true);
                if(dist >= 200) {
                    alt.clearInterval(dead);
                    native.deleteEntity(mw);
                    polices -= 1
                   // alt.log('cops ', polices)
                }
             }           
}, 1000)
}, 200)
}

function dispatch(stars) {
if(active == null) {
    active = true;
let star = stars*10
    let wanteds = alt.setInterval(()=>{
        if(wanted > 0) {
           // alt.log('wanted ',wanted, ' star ', star)
            if(polices == 0) {  
                if(star == 0) {
                    alt.clearInterval(wanteds);
                    
                    setMeta('wanted', 0)
                    alt.emit('wanted', 0)  
                    alt.emitServer('losecop')
                    //alt.LocalStorage.set('copkilled', copkilled.length);
                    for(let i in cops) {
                        if(cops[i]) {
                            native.deleteEntity(cops[i])
                        }
                    }
                    
                    active = null;
                    //star = 0
                    wanted = 0;
                    copkillcount()
                } else {
                    star -= 2
                    let wanted = Math.ceil(star/10)
                    
                    setMeta('wanted', wanted)
                    alt.emit('wanted', wanted)
                    copchase(star);
                   // alt.log(wanted, star)
                }
                }
                
            } 
    }, 1000);
}

}

alt.onServer('re-spawn', ()=>{
    if(active == true) {
        for(let i in cops) {
            if(cops[i]) {
                native.deleteEntity(cops[i]);

            }
        }
        polices = 0;
    }
})

alt.onServer('copdeath', (copdata)=>{
    if(cops[copdata]) {
        native.setEntityHealth(cops[copdata], 0, 0);

    }
})

alt.on('clearcrimedata', clearcrimedata)

function copkillcount() {

        criminal.active.copkilled += copkilled.length
        criminal.active.crime + 1
        alt.emitServer('updatedata','criminal', criminal, false)
        
        //alt.LocalStorage.set('crimedata', criminal);
        //alt.LocalStorage.save()
        alt.emitServer('crimedata', criminal)
        copkilled = []

}

function clearcrimedata() {
   // let crimedata = alt.LocalStorage.get('crimedata');

    criminal.record.copkilled += criminal.active.copkilled
    criminal.record.crime += criminal.active.crime
    criminal.active.copkilled = 0
    criminal.active.crime = 0

    alt.emitServer('updatedata', 'criminal', criminal, false)
   
    alt.emitServer('crimedata', criminal)
    alt.log('crime data cleared')
    alt.emit('crimecleared');
    //copkilled = []
    
}
