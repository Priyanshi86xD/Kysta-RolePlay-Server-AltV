import * as alt from 'alt-client';
import * as native from 'natives';
import { startpoints, survivals } from './survivals.js';
import { deleteMeta, setMeta } from 'alt-shared';


const SurvivalNames = [
    {type: 0, worktype: "~b~Select Location", job: ""},
    {type: 1, worktype: "Construction Site Survival", job: ""},
    {type: 2, worktype: "Del Perro Survival", job: ""},
    {type: 3, worktype:  "Desert Alien Survival", job: ""},
    {type: 4, worktype: "Groove Street Survival", job: ""},
    {type: 5, worktype: "Maze Bank Tower Survival", job: ""},
    {type: 6, worktype: "Junkyard Survival", job: ""},
    {type: 7, worktype: "Industrial Zone Survival", job: ""},
    {type: 8, worktype: "Sawmill Survival", job: ""},
    {type: 9, worktype: "Halloween Survival", job: ""},
    {type: 10, worktype: "Rancho Survival", job: ""},
    {type: 11, worktype: "Xmas Survival", job: ""},
    {type: 12, worktype: "Police Station Survival", job: ""},
    {type: 13, worktype: "Cayo Perico Mansion Survival", job: ""},
    {type: 14, worktype: "Cayo Perico Survival", job: ""},
    {type: 15, worktype: "El Burro Heights Survival", job: ""},
    {type: 16, worktype: "Kortz Center Survival", job: ""},
    {type: 17, worktype: "Meth Lab Survival", job: ""},
    {type: 18, worktype: "Altruist Camp Survival", job: ""},
    {type: 19, worktype: "Vanilla Unicorn Survival", job: ""},
    {type: 20, worktype: "Cargo Survival", job: ""},
	{type: 21, worktype: "Bunker Survival", job: ""},
    {type: 22, worktype: "Nuclear Silo Survival", job: ""},
    {type: 23, worktype: "Maibatsu Motors Survival", job: ""},
]

const survivalpos = [
    {x: -542.5311279296875,   y: -272.59271240234375,   z: 35.269805908203125},
    {x: 1420.5283203125,     y: 3608.365966796875,      z: 34.94862365722656}
]

const racepos = [
    { x: 512.7387, y: -1892.393188, z: 25.3662, name: 'Street Race'},
    { x: 385.1972, y: 2977.131, z: 40.1329231, name: 'Off-Road Race'},
    { x: 247.71237182617188,y: 1175.987060546875, z: 225.36964416503906, name: 'Street Race'},
]

let marker = 0, notif = 0, current = 0, wave = 0, peds = [], killed = 0, totalkill = 0, pedlive = 0, pedgrups = [], timer, death = 3, killcount
let enemies = [12,18,23,29,33,37,45,52,58,65]
let pickups = [], pblips = []

alt.onServer('startshop', challengecount)

challengecount()
function challengecount() {

let count = alt.setInterval(()=>{
    let pos = alt.Player.local.pos;
    for(let i in racepos) {
        let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, racepos[i].x, racepos[i].y, racepos[i].z, true);
        if(dist <= 30) {
            if(marker == 0) {
                marker = 1
                //alt.setMeta('racehost', 0);
                alt.emit('marker', 1, racepos[i].x, racepos[i].y, racepos[i].z-1,4,4,1.5,255,0,155,100)
                alt.emit('marker2', 36, racepos[i].x, racepos[i].y, racepos[i].z+2,1,1,1,255,0,155,100,0)
            }
        }
        if(dist <= 4) {
            //let host = alt.getMeta('racehost');
            if(notif == 0) {
                notif = 1
                handletext("~INPUT_PICKUP~ start a race");
                alt.setMeta('racehost', 1);
        } 
            } else {
                if(notif == 1) {
                    notif = 0
                    //alt.deleteMeta('racehost');
                }
            }
            
    }

    if(pos.x < -1600 && pos.y < -800 && pos.y > -1000) {
        
    let dist1 = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, -1700.7205810546875, -882.2415161132812,8.319831848144531, true);
    if(dist1 < 50) {
        if(marker == 0) {
            alt.emit('marker', 1, -1700.7205810546875, -882.2415161132812,8.319831848144531-1,4,4,1,255,0,155,100)
            alt.emit('marker2', 42, -1700.7205810546875, -882.2415161132812,8.319831848144531+1.5,2,2,2,255,0,155,100,0)
            marker = 1;
        }
    } else {
        marker = 0
    }
    if(dist1 < 4) {
        if(notif == 0) {
            notif =1;
            handletext("~INPUT_PICKUP~ start a parkour challenge")
            setMeta('parkour', 1)
        }
    } else {

            deleteMeta('parkour')
        
    }
} else {
    deleteMeta('parkour')
}

for(let i in survivalpos) {
    let dist2 = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, survivalpos[i].x, survivalpos[i].y, survivalpos[i].z, true)
    if(dist2 <= 50) {
        if(marker == 0) {
            marker = 1
            alt.emit('marker', 1, survivalpos[i].x, survivalpos[i].y, survivalpos[i].z-1,4,4,1.5,255,0,155,100)
            alt.emit('marker2', 27, survivalpos[i].x, survivalpos[i].y, survivalpos[i].z+2,1,1,1,255,0,155,100,0)
        }
    } else {
        marker = 0
    }
    if(dist2 <= 4) {
        if(notif ==0) {
            notif = 1
            handletext("~INPUT_PICKUP~ start Survival challenge");
            alt.setMeta('survival', 1);
    } 
    } else {
        if(notif == 1) {
           notif = 0
            //alt.deleteMeta('survival');
        }
    }
}

}, 1000);

alt.onServer('stopshop', ()=>{
    if(count > 0) {
        alt.clearInterval(count);
        count = 0
    }
})

alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
        let start = alt.getMeta('survival');
        if(start == 1){ 
            alt.emit('createmenu', "","survival", SurvivalNames)
           // startparkour();
        }
    }
})

}

alt.on('survival', (type)=>{
    //alt.log('survival', type)
    if(type == 13 || type == 14) {
        alt.emit('loadcayoipl')
        native.setZoneEnabled(native.getZoneFromNameId("IsHeistZone"), true);
    }
    current = type-1
    native.doScreenFadeOut(1000)
    let data = survivals[current]
    alt.emitServer('survivalstart', 1, 0, current, data.location);
    let friend = native.getNearestPlayerToEntity(alt.Player.local.scriptID);
    if(friend) {
        for(let player of alt.Player.all) {
            if(player.scriptID == friend) {
                alt.emitServer('survivalstart', 2, player.id, current);
            }
        }
    } 
})


alt.onServer('setsurvival', ()=>{
    let startpos = [startpoints.x[current], startpoints.y[current], startpoints.z[current], startpoints.Headings[current]]
    native.setEntityCoords(alt.Player.local.scriptID, startpos[0], startpos[1],startpos[2]+2,0,0,0,1);
    //native.setEntityInvincible(alt.Player.local.scriptID, true)
    deleteMeta('survival')
    //native.setEntityMaxSpeed(alt.Player.local.scriptID, 10)
    //native.addAmmoToPed(alt.Player.local.scriptID, native.getSelectedPedWeapon(alt.Player.local.scriptID), 999)
    native.setPedAmmo(alt.Player.local.scriptID, native.getSelectedPedWeapon(alt.Player.local.scriptID), 999, true)
    let data = survivals[current]
    wave = 1
    death = 3
    let set = alt.setInterval(()=>{
        alt.clearInterval(set);
       //native.setEntityHeading(alt.Player.local.scriptID, startpos[3])
       
       // native.requestModel(alt.hash(data.models.peds.group1[0]))
       // native.requestModel(alt.hash(data.models.peds.group1[1]))
       // native.requestModel(alt.hash(data.models.peds.group2[0]))
       // native.requestModel(alt.hash(data.models.peds.group2[1]))
       // native.requestModel(alt.hash(data.models.peds.group3[0]))
       // native.requestModel(alt.hash(data.models.peds.group3[1]))
        for(let i in data.models.pickups) {
            native.requestModel(alt.hash(data.models.pickups[i]))
        }
        native.doScreenFadeIn(2000)
        let start = alt.setInterval(()=>{
            alt.clearInterval(start);
            //native.setEntityCoords(alt.Player.local.scriptID, data.location[0], data.location[1],data.location[2]+1,0,0,0,0);
            bignotif('SURVIVAL STARTED', SurvivalNames[current+1].worktype)
            native.playSound(-1, "Screen_Flash_Start","Deathmatch_Sounds", 1,0,1);
            survivalstart(1)
            alt.emit('jobstart', 'Prepare for the first wave')
            native.setLocalPlayerCanCollectPortablePickups(true);
            for(let i in data.models.pickups) {
                let model = alt.hash(data.models.pickups[i])
                let ph = pickupname(data.models.pickups[i])
                let pickup = native.createPickupRotate(ph.hash, data.spawnpoints.pickups.x[i],data.spawnpoints.pickups.y[i],data.spawnpoints.pickups.z[i],0,0,0,512,getvalue(data.models.pickups[i]),2, true, model)
                native.setPickupRegenerationTime(pickup, 60000);
                //let pickup = native.createPickup(native.getPickupTypeFromWeaponHash(model),data.spawnpoints.pickups.x[i],data.spawnpoints.pickups.y[i],data.spawnpoints.pickups.z[i], 1,1,true, model)
                let pblip = native.addBlipForCoord(data.spawnpoints.pickups.x[i],data.spawnpoints.pickups.y[i],data.spawnpoints.pickups.z[i])
                pblips.push(pblip)
                pickups[pickups.length] = {object:pickup, name:ph.name}
                native.setPickupUncollectable(pickup, false);
                native.setBlipSprite(pblip, getsprite(data.models.pickups[i]))
                if (ph.name == "Armor") {
                    native.setBlipColour(pblip, 3);
                }
                else if (ph.name == "Health")
                {
                    native.setBlipColour(pblip, 2);
                }
                native.setPlayerPermittedToCollectPickupsOfType(alt.Player.local.scriptID, ph.hash, true);
                native.allowAllPlayersToCollectPickupsOfType(ph.hash)
                
            }

        }, 2000)
    }, 2000)
})

function survivalstart(num) {
    setMeta('mission', 1)
    if(current == 12 || current == 13) {
        native.setDeepOceanScaler(0.0)
    }
    
    let data = survivals[current]
    peds = [], killed = 0
    let kill = 0, bar = 0, heli = 0, max = 5
    let time = 20, models = [], weapons = [], accuracy = 50, wavetime = 0, a = 0

    if(num <= 3) {
        models = [data.models.peds.group1[0], data.models.peds.group1[1]]
        weapons = data.weapons.weak
        accuracy = 30
    } else if(num > 3 && num <= 7) {
        models = [data.models.peds.group2[0], data.models.peds.group2[1]]
        weapons = data.weapons.medium
        accuracy = 35
        max = 7
    } else if(num > 7 && num <= 10) {
        models = [data.models.peds.group3[0], data.models.peds.group3[1]]
        weapons = data.weapons.strong
        accuracy = 40
        max = 10
    }
    
    timer = alt.setInterval(()=>{

        if(time == 0) {
            if(kill == 0) {
                alt.emit('jobstart', '')
                alt.emit('timerbar', 0, ["", "", 140], ["", "", 0], ["", "", 0])
                kill = enemies[num-1]
            }           
        } else {
            time -= 1
            alt.emit('timerbar', 1, ["START", "00:"+String(time).padStart(2, '0'), 140], ["", "", 0], ["", "", 0])
        }

        if(kill > 0) {
            if(bar == 0) {
                alt.emit('timerbar', 1, ["WAVE "+num, "", 140], ["", "", 0], ["", "", 0])
                bar = 1
                killbar()
                alt.emit('jobstart', 'Taket out the ~r~enemies')
            }

          //  if(!pedgrups[a]) {
          //      let pedgrup = native.createGroup(a)
           //     pedgrups[a] = pedgrup
          //  } 
            for(let i in pickups) {
                let ispicked = native.hasPickupBeenCollected(pickups[i].object)
                if(ispicked == true) {

                    alt.emit('notif', '~b~'+alt.Player.local.name+' ~w~Picked up '+pickups[i].name)
                    //alt.log('picked up', pickups[i].name)
                }
            }
            wavetime += 1
            
            if(peds.length < kill && pedlive < max) {

                let pos = [data.spawnpoints.peds.x[a],data.spawnpoints.peds.y[a],data.spawnpoints.peds.z[a]+0.5]
                let model = alt.hash(models[native.getRandomIntInRange(0,1)])
                let weap = alt.hash(weapons[native.getRandomIntInRange(0,weapons.length-1)])
                attackped(model, pos, weap, accuracy, pedgrups[a])
                
                if((a + 1) == data.spawnpoints.peds.x.length) {
                    a = 0
                } else {
                    a += 1
                }
            } else if (peds.length >= kill && pedlive == 0  && killed < kill) {
                let pos = [data.spawnpoints.peds.x[a],data.spawnpoints.peds.y[a],data.spawnpoints.peds.z[a]+0.5]
                let model = alt.hash(models[native.getRandomIntInRange(0,1)])
                let weap = alt.hash(weapons[native.getRandomIntInRange(0,weapons.length-1)])
                attackped(model, pos, weap, accuracy, pedgrups[a])
                alt.emit('jobstart', 'Taket out the remaining ~r~enemies')
                if((a + 1) == data.spawnpoints.peds.x.length) {
                    a = 0
                } else {
                    a += 1
                }
            }
        
            if(num >= 3 && wavetime >= 15 && heli == 0) {
                if(data.flags.aircraft == true) {
                    heli = 1
                    let a = native.getRandomIntInRange(0,data.spawnpoints.aircraft.x.length-1)
                    let model = alt.hash(models[native.getRandomIntInRange(0,1)])
                    let pos = [data.spawnpoints.aircraft.x[a],data.spawnpoints.aircraft.y[a],data.spawnpoints.aircraft.z[a]]
                    //alt.emitServer('survivalheli', pos, model);
 
                    createheli(pos, model)
                }
                
            }

            if(killed == kill ) {
                if(timer > 0) {
                alt.clearInterval(timer);
                timer = 0
                if(killcount > 0) {
                    alt.clearEveryTick(killcount)
                    killcount = 0
                }
                
                for(let i in peds) {
                    if(peds[i]) {
                        native.deleteEntity(peds[i])
                    }
                }
                
                pedgrups = []
                if(num == 10) {
                    let rp = totalkill*10
                    let money = totalkill*180
                    bignotif('complete', 'Wave 10 Passed')
                    native.playSoundFrontend(-1, "MP_WAVE_COMPLETE","HUD_FRONTEND_DEFAULT_SOUNDSET", true);
                    alt.emit('jobstart', '')
                    alt.emit('timerbar', 0, ["", "", 140], ["", "", 0], ["", "", 0])
                    alt.emitServer('survivalfinish', rp, money)
                    totalkill = 0
                    wave = 0
                    for(let i in pickups) {
                        if(pickups[i]) {
                            native.removePickup(pickups[i].object)
                        }
                    }
                    for(let i in pblips) {
                        native.removeBlip(pblips[i])
                    }
                    pickups = []
                    pblips = []
                } else {
                    bignotif('SURVIVED', 'WAVE '+num+' Killed '+killed)
                native.playSoundFrontend(-1, "BASE_JUMP_PASSED", "HUD_AWARDS", true);
                    survivalstart(num+1)
                    alt.emit('jobstart', 'Prepare for the next wave')
                }
                
                }
            }
        }
    }, 1000)

    function killbar() {
        killcount = alt.everyTick(()=>{
            native.drawRect(0.93, 0.86,0.1,0.02, 0,0,0,140,false)
            native.drawRect(0.88+(0.05/(kill/killed)), 0.86,0.1/(kill/killed),0.02, 255,255,255, 200,false)
        })
    }


}

alt.onServer('re-spawn', ()=>{
    if(wave > 0) {
        let startpos = [startpoints.x[current], startpoints.y[current], startpoints.z[current], startpoints.Headings[current]]
        let respawn = alt.setInterval(()=>{
            alt.clearInterval(respawn);
            native.setEntityCoords(alt.Player.local.scriptID, startpos[0], startpos[1],startpos[2]+2,0,0,0,1);
           // if(death == 0) {
                if(timer > 0) {
                    alt.clearInterval(timer);
                    timer = 0
                    if(killcount > 0) {
                        alt.clearEveryTick(killcount)
                        killcount = 0
                    }
                    wave = 0
                    bignotif('FAILED', 'You got Killed')
                    native.playSoundFrontend(-1, "Survival_Failed", "DLC_VW_AS_Sounds", true);
                    for(let i in peds) {
                        if(peds[i]) {
                            native.deleteEntity(peds[i])
                        }
                    }
                    for(let i in pickups) {
                        if(pickups[i]) {
                            native.removePickup(pickups[i].object)
                        }
                    }
                    for(let i in pblips) {
                        native.removeBlip(pblips[i])
                    }                    
                    let rp = totalkill*3
                    let money = totalkill*80
    
                    alt.emit('jobstart', '')
                    alt.emit('timerbar', 0, ["", "", 140], ["", "", 0], ["", "", 0])
                    alt.emitServer('survivalfinish', rp, money)
                    totalkill = 0
                    wave = 0
                    pickups = []
                    pblips = []
                    pedgrups = []
                }
          //  } else {
             //   death -= 1
    
         //   for(let i in peds) {
             //   if(peds[i]) {
               //     native.taskGotoEntityAiming(peds[i], alt.Player.local.scriptID, 40.0, 50)
               //     native.setEntityIsTargetPriority(alt.Player.local.scriptID, true, 1)
               //     native.taskCombatPed(peds[i], alt.Player.local.scriptID, 0,16);
    
              //  }
              //  }
           // }
        },8000)

    }
})

function attackped(model, pos, weap, acc, grup) {
    native.requestModel(model)
    let create = alt.setInterval(()=>{
        alt.clearInterval(create)
        let ped = native.createPed(6, model, pos[0], pos[1], pos[2] ,0,false,false);
        native.setPedAccuracy(ped, acc);
        native.setEntityOnlyDamagedByPlayer(ped, true);
        native.setPedConfigFlag(ped, 245, true)
        native.setPedConfigFlag(ped, 44, true)
        native.setPedRelationshipGroupHash(ped, 0x4325F88A)
        //native.setPedAsGroupMember(ped, grup)
    
        peds.push(ped);
        pedlive += 1
        //alt.log('peds', ped, model, pos)
        let enemy = native.addBlipForEntity(ped);
        native.setBlipAsFriendly(enemy, false);
        native.setBlipScale(enemy, 0.8);
        native.giveWeaponToPed(ped, weap, 1000, false, true);
        //native.setPedDropsWeaponsWhenDead(ped, true); 
        
        //native.taskGotoEntityOffset(ped, alt.Player.local.scriptID, 60000, 200, 0, 1, 0x02)
        native.taskGotoEntityAiming(ped, alt.Player.local.scriptID, 25.0, 30)
        native.setEntityIsTargetPriority(alt.Player.local.scriptID, true, 1)
        native.taskCombatPed(ped, alt.Player.local.scriptID, 0,16);
        //native.taskShootAtEntity(ped, alt.Player.local.scriptID,60000,8)
        native.setPedTargetLossResponse(ped, 1)
    
        let dead = alt.setInterval(()=>{
            let isdead = native.isEntityDead(ped, false);
            if(isdead == true) {
                //let pos = native.getEntityCoords(ped, false);
                alt.clearInterval(dead);
                //let weappickup = native.createPickupRotate(native.getPickupTypeFromWeaponHash(weap),pos.x,pos.y,pos.z, 0,0,0, 8, 300, 2,true, weap)
                pedlive -= 1
                native.removeBlip(enemy);
                let killer = native.getPedSourceOfDeath(ped);
    
                if(killer == alt.Player.local.scriptID) {
                    alt.emitServer('targetkilled', 20)
                    killed += 1
                    totalkill += 1
                }
            }
        }, 1000)
    }, 300)
    
}

alt.onServer('setheli', (heli, model)=>{

})

function createheli(pos, pedmodel) {
    let model = alt.hash('buzzard')
    native.requestModel(model)
    let create = alt.setInterval(()=>{
        alt.clearInterval(create)
    let heli = native.createVehicle(model, pos[0], pos[1], pos[2],0, false,false,false )
    native.freezeEntityPosition(heli, true);
    native.setVehicleEngineOn(heli, true, true, false);
    let ped = native.createRandomPedAsDriver(heli, false)
    //let ped = native.createPedInsideVehicle(heli, 6, model, -1, false, false);
    peds.push(ped);
    //pedlive += 1
    let blip = native.addBlipForEntity(heli);
    native.setBlipSprite(blip, 353)
    native.setBlipHiddenOnLegend(blip, true);

    let chase = alt.setInterval(()=>{
        alt.clearInterval(chase)
        native.freezeEntityPosition(heli, false);
        native.taskHeliChase(ped, alt.Player.local.scriptID,5.0,5.0,5)
        native.taskVehicleShootAtPed(ped, alt.Player.local.scriptID, 1.0)
        native.setEntityIsTargetPriority(alt.Player.local.scriptID, true, 0)
    }, 300)
   
    let dead = alt.setInterval(()=>{
        let isbroke = native.isVehicleDriveable(heli, true);
            
        if(isbroke == false) {
            alt.clearInterval(dead);
            alt.emitServer('targetkilled', 50)
            alt.emit('notif', '~b~'+alt.Player.local.name+' ~w~took out an air support vehicle')
            native.removeBlip(blip)
            //pedlive -= 1
            //killed += 1
        }
        let isdead = native.isEntityDead(ped, false);
        if(isdead == true) {
            alt.clearInterval(dead);
            //pedlive -= 1
            native.removeBlip(blip);
            let killer = native.getPedSourceOfDeath(ped);

            if(killer == alt.Player.local.scriptID) {
                alt.emitServer('targetkilled', 20)
               // killed += 1
                //totalkill += 1
            }
        }
    }, 1000)
    },300)
}
function bignotif(text1, text2) {
    let notift = alt.everyTick(()=>{
        drawtext(text1,0.5,0.23,7,2,1.0,255,255,255,255, 0);
        drawtext(text2,0.5,0.327,4,1.2,1.0,255, 255, 255,255, 0);
    })
    let stop = alt.setInterval(()=>{
        alt.clearEveryTick(notift);
        alt.clearInterval(stop);
    }, 5000);
}

function handletext(text) {
    native.beginTextCommandDisplayHelp("STRING");
	native.addTextComponentSubstringKeyboardDisplay(text);
	native.endTextCommandDisplayHelp(0, 0, true, -1);
}

function drawtext(msg, x, y, font, scale, wrap, r, g, b, a, i) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(font);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, wrap);
    native.setTextCentre(true);
    native.setTextColour(r,g,b,a);
    native.setTextJustification(i);
    native.setTextDropShadow(true);
    native.endTextCommandDisplayText(x, y, 0);
}

function getsprite(pickupModel) {
	if (pickupModel == "prop_armour_pickup")
	{
		return 175;
	}
	else if (pickupModel == "prop_ld_health_pack")
	{
		return 153;
	}
	else if (pickupModel == "w_lr_rpg")
	{
		return 157;
	}
	else if (pickupModel == "w_ar_specialcarbine")
	{
		return 150;
	}
	else if (pickupModel == "w_sg_assaultshotgun")
	{
		return 158;
	}
	else if (pickupModel == "w_ex_pe")
	{
		return 152;
	}
	else if (pickupModel == "w_ex_molotov")
	{
		return 155;
	}
	else if (pickupModel == "w_mg_minigun")
	{
		return 173;
	}
	else if (pickupModel == "w_sr_heavysniper")
	{
		return 160;
	}
	else if (pickupModel == "w_lr_grenadelauncher")
	{
		return 157;
	}
	else if (pickupModel == "w_ar_assaultrifle")
	{
		return 150;
	}
	else if (pickupModel == "w_sg_sawnoff")
	{
		return 158;
	}
	else if (pickupModel == "w_mg_combatmg")
	{
		return 159;
	}
	else if (pickupModel == "w_sb_microsmg")
	{
		return 159;
	}
	else if (pickupModel == "w_pi_appistol")
	{
		return 156;
	}
	else if (pickupModel == "w_ex_grenadefrag")
	{
		return 152;
	}
	else if (pickupModel == "w_pi_heavypistol")
	{
		return 156;
	}
	else if (pickupModel == "w_ar_carbinerifle")
	{
		return 150;
	}
}

function getvalue(pickupModel)
{
	if (pickupModel == "prop_armour_pickup")
	{
		return 200;
	}
	else if (pickupModel == "prop_ld_health_pack")
	{
		return 100;
	}
	else if (pickupModel == "w_lr_rpg")
	{
		return 3;
	}
	else if (pickupModel == "w_ar_specialcarbine")
	{
		return 150;
	}
	else if (pickupModel == "w_sg_assaultshotgun")
	{
		return 25;
	}
	else if (pickupModel == "w_ex_pe")
	{
		return 3;
	}
	else if (pickupModel == "w_ex_molotov")
	{
		return 3;
	}
	else if (pickupModel == "w_mg_minigun")
	{
		return 350;
	}
	else if (pickupModel == "w_sr_heavysniper")
	{
		return 15;
	}
	else if (pickupModel == "w_lr_grenadelauncher")
	{
		return 5;
	}
	else if (pickupModel == "w_ar_assaultrifle")
	{
		return 200;
	}
	else if (pickupModel == "w_sg_sawnoff")
	{
		return 25;
	}
	else if (pickupModel == "w_mg_combatmg")
	{
		return 200;
	}
	else if (pickupModel == "w_sb_microsmg")
	{
		return 200;
	}
	else if (pickupModel == "w_pi_appistol")
	{
		return 120;
	}
	else if (pickupModel == "w_ex_grenadefrag")
	{
		return 3;
	}
	else if (pickupModel == "w_pi_heavypistol")
	{
		return 30;
	}
	else if (pickupModel == "w_ar_carbinerifle")
	{
		return 200;
	}
}

function pickupname(pickupModel)
{
	if (pickupModel == "prop_armour_pickup")
	{
		return {name:"Armor", hash: 1274757841};
	}
	else if (pickupModel == "prop_ld_health_pack")
	{
		return {name: "Health", hash: 2406513688};
	}
	else if (pickupModel == "w_lr_rpg")
	{
		return {name: "RPG", hash: 1295434569};
	}
	else if (pickupModel == "w_ar_specialcarbine")
	{
		return { name: "Special Carbine" , hash: 157823901 };
	}
	else if (pickupModel == "w_sg_assaultshotgun")
	{
		return { name: "Assault Shotgun" , hash: 2459552091 };
	}
	else if (pickupModel == "w_ex_pe")
	{
		return { name: "Sticky Bomb" , hash: 2081529176 };
	}
	else if (pickupModel == "w_ex_molotov")
	{
		return { name: "Molotov" , hash: 2228647636 };
	}
	else if (pickupModel == "w_mg_minigun")
	{
		return { name: "Minigun" , hash: 792114228 };
	}
	else if (pickupModel == "w_sr_heavysniper")
	{
		return { name: "Heavy Sniper" , hash: 1765114797 };
	}
	else if (pickupModel == "w_lr_grenadelauncher")
	{
		return { name: "Grenade Launcher" , hash: 779501861 };
	}
	else if (pickupModel == "w_ar_assaultrifle")
	{
		return { name: "Assault Rifle" , hash: 4080829360 };
	}
	else if (pickupModel == "w_sg_sawnoff")
	{
		return { name: "Sawn-Off Shotgun" , hash: 2528383651 };
	}
	else if (pickupModel == "w_mg_combatmg")
	{
		return { name: "Combat MG" , hash: 2995980820 };
	}
	else if (pickupModel == "w_sb_microsmg")
	{
		return { name: "Micro SMG" , hash: 496339155 };
	}
	else if (pickupModel == "w_pi_appistol")
	{
		return { name: "AP Pistol" , hash:  996550793};
	}
	else if (pickupModel == "w_ex_grenadefrag")
	{
		return { name: "Grenade" , hash: 2803366040 };
	}
	else if (pickupModel == "w_pi_heavypistol")
	{
		return { name: "Heavy Pistol" , hash: 2633054488 };
	}
	else if (pickupModel == "w_ar_carbinerifle")
	{
		return { name: "Carbine Rifle" , hash: 3748731225 };
	}
}