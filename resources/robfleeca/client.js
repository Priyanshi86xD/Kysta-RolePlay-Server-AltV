import * as alt from 'alt-client';
import { deleteMeta, getMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import { bankdoors, bankloc } from './fleeca.js';


let currentbank, currentpos, robready = 0, bankpeds = 0, bankdata, bars = 0, peds =[], text = 0, targets =[], Doors, trolleys = [], trolley
let money = 0, key, vaultdoor, looted = 0, sec, bpeds =[], baghash, dropbag, bag2, bagdrop = 0

const security = 0xD768B228
const loot = [
    1500,2000,1000,800,1200
]
alt.onServer('bankrobnotif', (bankname, bankpos, text)=>{
    if(robready == 0) {
        handletext(text);
        currentbank = bankname-1;
        currentpos = bankpos;
        robready = 1
    }
    
})

alt.onServer('clearbank', ()=>{
    if(robready == 1) {
        robready = 0;
    }
})

alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
    if(robready == 1) {
        let card = getMeta('bankIdcard');
        let pbag = native.getPedDrawableVariation(alt.Player.local.scriptID, 5);
        if(card == 1) {
            if(pbag == 44 || pbag == 45) {
                alt.emitServer('fleecarobstart', currentbank, currentpos);
            } else {
                handletext('Buy a Bag for Heist first!')
            }
    } else {
        handletext('You dont have the ID Card')
    }
} else if(robready == 3) {
        alt.emitServer('opendoor', 1)
        let model = alt.hash("hei_prop_hei_cash_trolly_01") 
        native.requestModel(model)
        SpawnTrolleys(model)
        
    } else if(robready == 5) {
        alt.emitServer('opendoor', 2)
    } else if(robready == 7) {
        StartGrab();
    }
}
});

alt.onServer('fleecarobbegin', ()=>{
    native.requestModel(security);
    let bank = bankloc[currentbank]
    native.prepareMusicEvent("MP_MC_START_HEIST_4")
    if(bankpeds == 0) {
        peds = []
        let create = alt.setInterval(()=>{
            alt.clearInterval(create);
            let secs = native.createPed(4, security, bank.doors.startloc.x, bank.doors.startloc.y, bank.doors.startloc.z, bank.doors.startloc.h+180, false, false);
            native.taskStartScenarioInPlace(secs, 'WORLD_HUMAN_GUARD_STAND', 0, false);
            native.setEntityMaxHealth(secs, 200);
            native.giveWeaponToPed(secs, 0x2BE6766B, 500, false, true);
            native.taskShootAtEntity(secs, alt.Player.local.scriptID, 0, 8)
            sec = native.addBlipForEntity(secs)
            native.setBlipSprite(sec, 119)
            native.setBlipScale(sec, 0.8);
            native.setBlipColour(sec, 1)
            
            peds.push(secs);
            bankpeds = 1;
            bankrob(bankloc[currentbank])
            native.triggerMusicEvent("MP_MC_START_HEIST_4")
        }, 300)
        
    }
    bankdata = bankloc[currentbank];
    native.setPedComponentVariation(alt.Player.local.scriptID, 5, 44, 0, 0)
    native.requestModel(alt.hash("p_ld_id_card_01"))
    setMeta('mission', 1)
    robready = 2;
    //handletext('rob begin')
    notif("~y~FLEECA BANK HEIST", "Rob The Fleeca Bank")
    
    
})

alt.onServer('openvault', (door)=>{
    bankdoor(door)
})

function bankrob(sdata) {
    let data = bankloc[currentbank]
    alt.emit('timerbar', 1, ["Total Cash :", "$ "+money, 140], ["", "", 0], ["", "", 0])
    for(let i in peds) {
        if(peds[i]) {
            alt.emitServer('jobstart', 'Kill the ~r~security guard')
            text = 1
        }
    }
    key = native.addBlipForCoord(data.doors.startloc.x, data.doors.startloc.y, data.doors.startloc.z)
    native.setBlipSprite(key, 619);
    native.setBlipColour(key, 2)   

    let gotodoor = alt.everyTick(()=>{
        for(let i in peds) {
            if(peds[i]) {
                let isdead = native.isEntityDead(peds[i], false);
                if(isdead == true) {
                    if(text == 1) {
                    native.playSound(0, "Bell_01", "ALARMS_SOUNDSET", 0,0,1)
                    if(sec) {
                        native.removeBlip(sec);
                        text = 0;
                    }
                    }  
                } 
            }
        }
        let pos = alt.Player.local.pos;
        
        if(robready == 2) {
        if(text == 0) {
            alt.emitServer('jobstart', 'Hack the ~g~vault door')
            text = 1
        }
        let dst = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, data.doors.startloc.x, data.doors.startloc.y, data.doors.startloc.z, true);
        if(dst < 1) {
                handletext("~INPUT_PICKUP~ to access the panel ");
                robready = 3;
            }
        } else if(robready == 4) {
            let dst = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, data.doors.secondloc.x, data.doors.secondloc.y, data.doors.secondloc.z, true);
            if(dst < 1) {
                    handletext("~INPUT_PICKUP~ to access the panel ");
                    robready = 5;
                }
        } else if(robready == 6) {
            let obj = native.getClosestObjectOfType(pos.x, pos.y, pos.z,1.0, alt.hash("hei_prop_hei_cash_trolly_01"), false, false, false )
            if(obj) {
                trolley = obj
                handletext("~INPUT_PICKUP~ to start grab the cash");
                robready = 7;
            }
        } else if(robready == 8) {
            let wanted = getMeta('wanted')
            if(bagdrop == 1) {
                let pickbag = native.getClosestObjectOfType(pos.x, pos.y, pos.z,1.0, alt.hash('prop_cs_heist_bag_01'), false, false, false )
            if(pickbag) {
                bagdrop = 0
                native.deleteObject(bag2);
                native.playSound(0, "ROBBERY_MONEY_TOTAL", "HUD_FRONTEND_CUSTOM_SOUNDSET", true, 0 ,false)
                native.setPedComponentVariation(alt.Player.local.scriptID, 5, 45, 0, 0)
                alt.emit('timerbar', 1, ["Total Cash :", "$ "+money, 140], ["", "", 0], ["", "", 0])
                alt.emitServer('jobstart', 'Lose the ~r~Cops')
            }
        }
           // let dst2 = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, currentpos.x, currentpos.y, currentpos.z, true);
          //  if(dst2 > 500) {
            if(wanted == 0) {
                alt.clearEveryTick(gotodoor);
                native.triggerMusicEvent("GLOBAL_KILL_MUSIC")
                notif('~y~HEIST COMPLETE', 'Fleeca Bank Rob Success')
                native.playSound(0, "LOCAL_PLYR_CASH_COUNTER_COMPLETE", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", 0,0,1)
                alt.emitServer('fleecarobfinish', currentbank, money);
                alt.emit('timerbar', 0, ["", "", 0], ["", "", 0], ["", "", 0])
                robready = 0
                bankpeds = 0
                looted = 0
                text = 0
                money = 0
                
                alt.emitServer('jobstart', '')
                deleteMeta('mission');
                setMeta('bankIdcard', 0);
                for(let i in peds) {
                    if(peds[i]) {
                        native.deleteEntity(peds[i]);
                    }
                }
                for(let i in trolleys) {
                    if(trolleys[i]) {
                        native.deleteEntity(trolleys[i])
                    }
                }
                if(vaultdoor) {
                    native.setEntityHeading(vaultdoor, bankdoors[currentbank].door1.h)
                }
                for(let i in bpeds) {
                    if(bpeds[i]) {
                        native.deleteEntity(bpeds[i]);
                    }
                }

            }
        }
    })
}

function bankdoor(door) {
    money = 0;
    trolleys = []
    
    let data = bankloc[currentbank]
    let vault
    let prop
    if(door == 1) {
        vault= data.doors.startloc
        prop = data.prop.first
    } else {
        vault = data.doors.secondloc
        prop = data.prop.second
    }
  
    let pedco = native.getEntityCoords(alt.Player.local.scriptID, true)
    let boneIndex = native.getPedBoneIndex(alt.Player.local.scriptID, 28422)
   
    let time = alt.setInterval(()=>{
        alt.clearInterval(time);
        let IdProp = native.createObject(alt.hash("p_ld_id_card_01"), pedco.x, pedco.y, pedco.z, 1, 1, 0)
        
        native.attachEntityToEntity(IdProp, alt.Player.local.scriptID, boneIndex, 0.12, 0.028, 0.001, 10.0, 175.0, 0.0, true, true, false, true, 1, true, 1)
        //native.taskStartScenarioAtPosition(ped, "PROP_HUMAN_ATM", vault.animcoords.x, vault.animcoords.y, vault.animcoords.z+0.7, vault.animcoords.h, 0, false, false);
        native.setEntityCoords(alt.Player.local.scriptID, vault.animcoords.x, vault.animcoords.y, vault.animcoords.z,0,0,0,true);
        native.setEntityHeading(alt.Player.local.scriptID, vault.animcoords.h);
        
        native.taskStartScenarioInPlace(alt.Player.local.scriptID, "PROP_HUMAN_ATM", 0, true)
        alt.emitServer('jobstart', '')
        let wait = alt.setInterval(()=>{ 
           // let isscen = native.isPedUsingScenario(ped, "PROP_HUMAN_ATM") ;
           // if(isscen == true) {
                alt.clearInterval(wait);
                native.detachEntity(IdProp, false, false)
            native.setEntityCoords(IdProp, prop.coords.x,prop.coords.y,prop.coords.z, 0.0, 0.0, 0.0, false)
            native.setEntityRotation(IdProp, prop.rot.x, prop.rot.y,prop.rot.z, 1, true)
            native.freezeEntityPosition(IdProp, true)
            native.playSoundFrontend(-1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
            let process = alt.setTimeout(()=>{
                alt.clearTimeout(process);
                progressbar()
                let wait2 = alt.setInterval(()=>{
                    if(bars == 2000) {
                    alt.clearInterval(wait2);
                    
                    native.playSoundFrontend(-1, "HACKING_DOOR_UNLOCK_SOUNDS", "0", false)
                    //native.playSoundFrontend(-1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
                    native.clearPedTasksImmediately(alt.Player.local.scriptID)
                    notification('Hacking complete')
                    //native.freezeEntityPosition(IdProp, false)
                    native.setObjectAsNoLongerNeeded(IdProp);
                    native.deleteObject(IdProp)                   
                    if(door == 1) {
                        robready = 4;
                        opendoor()
                    } else {
                        robready = 6
                        if(Doors) {
                            native.freezeEntityPosition(Doors, false);
                            alt.emitServer('jobstart', 'Loot the ~g~cash')
                            for(let i in targets) {
                                if(targets[i]) {
                                    let cblip = native.addBlipForEntity(targets[i])
                                    native.setBlipSprite(cblip, 500);
                                    native.setBlipColour(cblip, 2)
                                }
                            }
                            
                        }
                    }
                }
                }, 300);   

            }, 1000)       
                             
        },1500)
    }, 500)

}

function opendoor() {
    let data = bankloc[currentbank];
    let vault = data.doors.startloc
    let door = data.doors.secondloc
    let vdoor
    let door2  = alt.hash("v_ilev_gb_vaubar")
    if(currentbank == 3) {
        vdoor = 4231427725
    } else {
        vdoor = alt.hash("v_ilev_gb_vauldr")
    }
    let obj = native.getClosestObjectOfType(vault.x,vault.y, vault.z, 2.0, vdoor, false, false, false)
    let obj2 = native.getClosestObjectOfType(door.x,door.y, door.z, 2.0, door2, false, false, false)
    Doors = obj2
    let count = 0
    native.freezeEntityPosition(obj2, true);
    vaultdoor = obj;
    native.playSoundFrontend(-1, "vault_unlock", "dlc_heist_fleeca_bank_door_sounds", false)
    let open = alt.setInterval(()=>{
        if(count == 400) {
            alt.clearInterval(open);
            key = native.addBlipForCoord(door.x,door.y, door.z)
            native.setBlipSprite(key, 619);
            native.setBlipColour(key, 2)
            alt.emitServer('jobstart', 'Hack the ~g~vault door')
        } else {
        let heading = native.getEntityHeading(obj) - 0.20
        native.setEntityHeading(obj, heading)
        count += 1
        }
    }, 5)
}

alt.onServer('setbankped', (sbank)=>{
    bpeds = []
    let pedpos = bankdoors[sbank-1].peds;
    for(let i in pedpos) {
        native.requestModel(pedpos[i].model);
        let timeout = alt.setTimeout(()=>{
            alt.clearTimeout(timeout);
            let bped = native.createPed(5, pedpos[i].model, pedpos[i].x, pedpos[i].y, pedpos[i].z, pedpos[i].h, false,false);
            native.placeObjectOnGroundProperly(bped);
            native.taskStartScenarioInPlace(bped, pedpos[i].scen, 0, false);
            native.setPedFleeAttributes(bped, 0x8000, true)
            native.setPedCanCowerInCover(bped, true);
            bpeds.push(bped);
        },300)

    }
})

alt.onServer('deletebankped', (sbank)=>{
    for(let i in peds) {
        if(peds[i]) {
            native.deleteEntity(peds[i])
        }
    }
    for(let i in bpeds) {
        if(bpeds[i]) {
            native.deleteEntity(bpeds[i])
        }
    }
    bankpeds = 0;
    bpeds = []
})

alt.onServer('lootsuccess', ()=>{
    alt.emitServer('jobstart', 'Escape the ~r~cops');
    alt.emit('timerbar',1, ["Total Cash :", "$ "+money, 140], ["", "", 0], ["", "", 0])
    robready = 8;
})

function SpawnTrolleys(tmodel) {
    let data = bankloc[currentbank];
    let Trolley1 = native.createObject(tmodel, data.trolley1.x, data.trolley1.y, data.trolley1.z, 1, 1, 0)
    let Trolley2 = native.createObject(tmodel, data.trolley2.x, data.trolley2.y, data.trolley2.z, 1, 1, 0)
    let Trolley3 = native.createObject(tmodel, data.trolley3.x, data.trolley3.y, data.trolley3.z, 1, 1, 0)
    let h1 = native.getEntityHeading(Trolley1)
    let h2 = native.getEntityHeading(Trolley2)
    let h3 = native.getEntityHeading(Trolley3)

    native.setEntityHeading(Trolley1, h1 + data.trolley1.h)
    native.setEntityHeading(Trolley2, h2 + data.trolley2.h)
    native.setEntityHeading(Trolley3, h3 + data.trolley3.h)
    targets.push(Trolley1)
    targets.push(Trolley2)
    targets.push(Trolley3)
    //TriggerServerEvent("utk_fh:startLoot", data, name, missionplayers)
}

function StartGrab(name) {
    native.requestAnimDict("anim@heists@ornate_bank@grab_cash")

let male = native.isPedMale(alt.Player.local.scriptID);
if(male == true) {
    baghash = alt.hash("hei_p_m_bag_var22_arm_s")
} else {
    baghash = alt.hash("hei_p_f_bag_var20_arm_s")
}
    let cash = alt.hash("hei_prop_heist_cash_pile")
    let cpos = native.getEntityCoords(trolley, false)
    let crot = native.getEntityRotation(trolley, 2)
    let emptyobj = alt.hash("hei_prop_hei_cash_trolly_03")

    native.requestModel(baghash)
    native.requestModel(cash);
    native.requestModel(emptyobj);
    
    let pos
    //let boneIndex = native.getPedBoneIndex(alt.Player.local.scriptID, -1)
    native.networkRequestControlOfEntity(trolley)

    let bag;
    let scen1 = alt.setInterval(()=>{

        let scene1 = native.networkCreateSynchronisedScene(cpos.x, cpos.y, cpos.z, crot.x, crot.y, crot.z, 2, false, false, 1065353216, 0, 1.3)
        native.networkAddPedToSynchronisedScene(alt.Player.local.scriptID, scene1, "anim@heists@ornate_bank@grab_cash", "intro", 1.5, -4.0, 1, 16, 1148846080, 0)
        //native.networkAddEntityToSynchronisedScene(bag, scene1, "anim@heists@ornate_bank@grab_cash", "bag_intro", 4.0, -8.0, 1)
        native.networkStartSynchronisedScene(scene1)
        alt.clearInterval(scen1);
        
    },300)    
           
    let scen2 = alt.setInterval(()=>{
        let h = native.getEntityHeading(alt.Player.local.scriptID);
        native.setPedComponentVariation(alt.Player.local.scriptID, 5, 0, 0, 0)
        pos = alt.Player.local.pos;
        bag = native.createObject(baghash, pos.x, pos.y, pos.z-0.1, 1,1,0)
       // native.attachEntityToEntity(bag, alt.Player.local.scriptID, boneIndex, 0.05,0.05,0.1,0,0,260, true, true, false, true, 1, true, 1)
        native.setEntityHeading(bag, h+260);
        cashappear()
        let scene2 = native.networkCreateSynchronisedScene(cpos.x, cpos.y, cpos.z, crot.x, crot.y, crot.z, 2, false, false, 1065353216, 0, 1.3)
        native.networkAddPedToSynchronisedScene(alt.Player.local.scriptID, scene2, "anim@heists@ornate_bank@grab_cash", "grab", 1.5, -4.0, 1, 16, 1148846080, 0)
        //native.networkAddEntityToSynchronisedScene(bag, scene2, "anim@heists@ornate_bank@grab_cash", "bag_grab", 4.0, -8.0, 1)
        native.networkAddEntityToSynchronisedScene(trolley, scene2, "anim@heists@ornate_bank@grab_cash", "cart_cash_dissapear", 4.0, -8.0, 1)
        native.networkStartSynchronisedScene(scene2)
        alt.clearInterval(scen2);
    }, 1500)
    let scen3 = alt.setInterval(()=>{
        native.deleteObject(bag)
        native.setPedComponentVariation(alt.Player.local.scriptID, 5, 45, 0, 0)
	let scene3 = native.networkCreateSynchronisedScene(cpos.x, cpos.y, cpos.z, crot.x, crot.y, crot.z, 2, false, false, 1065353216, 0, 1.3)

	native.networkAddPedToSynchronisedScene(alt.Player.local.scriptID, scene3, "anim@heists@ornate_bank@grab_cash", "exit", 1.5, -4.0, 1, 16, 1148846080, 0)
	//native.networkAddEntityToSynchronisedScene(bag, scene3, "anim@heists@ornate_bank@grab_cash", "bag_exit", 4.0, -8.0, 1)
	native.networkStartSynchronisedScene(scene3)
    alt.clearInterval(scen3);

	native.networkRequestControlOfEntity(trolley)
    native.deleteObject(trolley)
    let NewTrolley = native.createObject(emptyobj, cpos.x, cpos.y, cpos.z - 0.985, 1,1,0)
    trolleys.push(NewTrolley);
   // native.setEntityNoCollisionEntity(trolley, NewTrolley, false);
    native.setEntityRotation(NewTrolley, crot.x, crot.y, crot.z, 2, false)
    native.placeObjectOnGroundProperly(NewTrolley)

	let end = alt.setInterval(()=>{
        alt.clearInterval(end);
        
        native.removeAnimDict("anim@heists@ornate_bank@grab_cash")
        native.setModelAsNoLongerNeeded(emptyobj)
        native.setModelAsNoLongerNeeded(alt.hash("p_ld_id_card_01"))
        native.setModelAsNoLongerNeeded(cash)
        native.setModelAsNoLongerNeeded(baghash)
        robready = 6
        looted += 1
        alt.emitServer('lootfinish', currentbank, looted)
        alt.log('cash looted', looted)
        if(looted == 2) {
            alt.emit('copchase', 5);
            notification('Police has been notified!')
        }
        
    }, 1800)
	
    }, 17000)

}

function cashappear() {
    let pile = loot[native.getRandomIntInRange(0,4)]
    let cash = alt.hash("hei_prop_heist_cash_pile")
    let pos = alt.Player.local.pos
    let grabobj = native.createObject(cash, pos.x, pos.y, pos.z, false, false, true)

	    native.freezeEntityPosition(grabobj, true)
	    native.setEntityInvincible(grabobj, true)
	    native.setEntityNoCollisionEntity(grabobj, alt.Player.local.scriptID, false)
	    native.setEntityVisible(grabobj, false, false)
	    native.attachEntityToEntity(grabobj, alt.Player.local.scriptID, native.getPedBoneIndex(alt.Player.local.scriptID, 60309), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, false, 0, true, 1)
	    

        let pilecash = alt.everyTick(()=>{
                native.disableControlAction(0, 73, true)
                let appear = native.hasAnimEventFired(alt.Player.local.scriptID, alt.hash("CASH_APPEAR"))
                let disappear = native.hasAnimEventFired(alt.Player.local.scriptID, alt.hash("RELEASE_CASH_DESTROY"))
                let visible = native.isEntityVisible(grabobj)
                if(appear == true) {
                    if(visible == false) {
                        native.setEntityVisible(grabobj, true, false)
                    }    
                } 
                if(disappear == true) {
                    if(visible == true) {
                        native.setEntityVisible(grabobj, false, false) 
                    }
                        money += pile;
                        native.playSound(0, "ROBBERY_MONEY_TOTAL", "HUD_FRONTEND_CUSTOM_SOUNDSET", true, 0 ,false)
                        alt.emit('timerbar', 1, ["Total Cash :", "$ "+money, 140], ["", "", 0], ["", "", 0]) 
                }
                
        })
                
        let stop = alt.setInterval(()=>{
            alt.clearEveryTick(pilecash);
            alt.clearInterval(stop);
            native.deleteObject(grabobj)
            
        }, 17000)
}

alt.on('progresbar', progressbar)

alt.onServer('deathcam', ()=>{
    if(robready == 8) {
        native.requestModel(alt.hash('prop_cs_heist_bag_01'))
        let pos = alt.Player.local.pos
        let pickup = alt.setInterval(()=>{
            alt.clearInterval(pickup);
            bag2 = native.createObject(alt.hash('prop_cs_heist_bag_01'), pos.x, pos.y, pos.z-0.1, 1,1,1);
            native.placeObjectOnGroundOrObjectProperly(bag2);
            native.setTeamPickupObject(bag2,1,1);
            native.setPickupObjectArrowMarker(bag2, true);
            dropbag = native.addBlipForEntity(bag2);
            native.setBlipSprite(dropbag, 586)
            native.setBlipColour(dropbag, 2)
            native.setPedComponentVariation(alt.Player.local.scriptID, 5, 0, 0, 0)
            alt.emit('timerbar', 1, ["Total Cash :", "$ 0", 140], ["", "", 0], ["", "", 0]) 
            alt.emitServer('jobstart', 'Pickup ~g~The Loot Bag');
            bagdrop = 1
    }, 500)

    }
})

function handletext(text) {
    native.beginTextCommandDisplayHelp("STRING");
	native.addTextComponentSubstringKeyboardDisplay(text);
	native.endTextCommandDisplayHelp(0, 0, true, -1);
}

function progressbar() {
    bars = 0
    let bar = alt.everyTick(()=>{
        if(bars == 2000) {
            alt.clearEveryTick(bar);
            if(key) {
                native.removeBlip(key)
            }
            //bars = 0;
        } else {
            drawbar();
            bars += 5;
        }
    })
}
function drawbar() {
    native.drawRect(0.5,0.5,0.05,0.01,60,80,94,255,false);
    native.drawRect(0.475+(0.025/(2000/bars)),0.5,(0.05/(2000/bars)),0.01,137,206,252,255,false);
}

function notif(text1, text2) {
    let notif = alt.everyTick(()=>{
        drawtext(text1,0.5,0.23,7,1.8,1.0,255,0,0,255, 0);
        drawtext(text2,0.5,0.32,4,0.7,1.2,255, 255, 255,255, 0);
    })
    let stop = alt.setInterval(()=>{
        alt.clearEveryTick(notif);
        alt.clearInterval(stop);
    }, 6000);
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

function notification(message) {
    native.beginTextCommandThefeedPost('STRING')
    native.setColourOfNextTextComponent(-1)
    native.thefeedSetBackgroundColorForNextPost(140)
    //native.thefeedSetFlashDurationParameterForNextMessage()
    native.thefeedSetRgbaParameterForNextMessage(0,0,0,50)
    native.addTextComponentSubstringPlayerName(message)
    native.endTextCommandThefeedPostTicker(false, false)
}