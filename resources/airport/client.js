import * as alt from 'alt-client';
import * as native from 'natives';
import { cayoIpls, yanktonipls } from './ipls.js';
import { islandpeds } from './islandpeds.js';
import { aircraft, hangar, hangaraircraft, hangarinterior, hangarslot, slotpos } from './hangar.js';

var vehicleSprite = [
    326,
    724,
    821,
    326,
    824,
    756,
    523,
    825,
    348,
    757,
    318,
    85,
    67,
    348,
    410,
    422,
    423,
    513,
    56,
    421,
    477,
    795, // Train
];

const airportmenu = [
    {type: -1, worktype: "~g~Select your destination", job: "", price: 0},
    {type: 1, worktype: "North Yankton", job: "", price: 10000},
    {type: 2, worktype: "Cayo Perico Island", job: "", price: 20000},
]

const hangarmenu = [
    {type: -1, worktype: "~g~Select options", job: "", price: 0},
    {type: 1, worktype: "Request an aircraft", job: "", price: 0},
    {type: 2, worktype: "Join Pegasus hangar", job: "", price: 800000},
]

const zancudomenu = [
    {type: -1, worktype: "~g~Select options", job: "", price: 0},
    {type: 1, worktype: "Request military vehicle", job: "", price: 0},
    {type: 2, worktype: "Request military aircraft", job: "", price: 0},
    {type: 3, worktype: "Purchase hangar", job: "", price: 1600000},
]

const hangaroption = [
    {type: -1, worktype: "~g~Select options", job: "", price: 0},
    {type: 1, worktype: "Aircraft management", job: "", price: 0},
    {type: 2, worktype: "Hangar styles", job: "", price: 0},
    {type: 3, worktype: "Purchase aircraft", job: "", price: 0},
]

const aircrafts = [
    {type: -1, worktype: '~r~Select aircraft', job: "", price: 0},
    {type: 1, worktype: 'cuban800', job: "", price: 5000},
    {type: 2, worktype: 'alphaz1', job: "", price: 10000},
    {type: 3, worktype: 'howard', job: "", price: 10000},
    {type: 4, worktype: 'nimbus', job: "", price: 10000},
    {type: 5, worktype: 'seabreeze', job: "", price: 20000},
    {type: 6, worktype: 'shamal', job: "", price: 10000},
    {type: 7, worktype: 'stunt', job: "", price: 12000},
    {type: 8, worktype: 'velum', job: "", price: 10000},
    {type: 9, worktype: 'microlight', job: "", price: 5000},
    {type: 10, worktype: 'blimp', job: "", price: 10000},
    {type: 11, worktype: 'buzzard2', job: "", price: 10000},
    {type: 12, worktype: 'cargobob2', job: "", price: 20000},
    {type: 13, worktype: 'frogger', job: "", price: 5000},
    {type: 14, worktype: 'havok', job: "", price: 10000},
    {type: 15, worktype: 'maverick', job: "", price: 5000},
    {type: 16, worktype: 'skylift', job: "", price: 20000},
    {type: 17, worktype: 'supervolito', job: "", price: 20000},
    {type: 18, worktype: 'swift', job: "", price: 20000},
    {type: 19, worktype: 'volatus', job: "", price: 20000},

]

const miliveh = [
    {type: -1, worktype: '~r~Select vehicle', job: "", price: 0},
    {type: 1, worktype: 'apc', job: "", price: 20000},
    {type: 2, worktype: 'barracks', job: "", price: 10000},
    {type: 3, worktype: 'barracks2', job: "", price: 10000},
    {type: 4, worktype: 'barracks3', job: "", price: 10000},
    {type: 5, worktype: 'barrage', job: "", price: 20000},
    {type: 6, worktype: 'chernobog', job: "", price: 30000},
    {type: 7, worktype: 'crusader', job: "", price: 10000},
    {type: 8, worktype: 'halftrack', job: "", price: 25000},
    {type: 9, worktype: 'rhino', job: "", price: 20000},
    {type: 10, worktype: 'scarab', job: "", price: 20000},
    {type: 11, worktype: 'vetir', job: "", price: 10000},
    {type: 12, worktype: 'technical', job: "", price: 20000},
    {type: 13, worktype: 'zhaba', job: "", price: 20000},
]

const milaircraft = [
    {type: -1, worktype: '~r~Select aircraft', job: "", price: 0},
    {type: 1, worktype: 'buzzard', job: "", price: 20000},
    {type: 2, worktype: 'cargobob', job: "", price: 20000},
    {type: 3, worktype: 'hunter', job: "", price: 25000},
    {type: 4, worktype: 'savage', job: "", price: 20000},
    {type: 5, worktype: 'valkyrie', job: "", price: 20000},
    {type: 6, worktype: 'annihilator2', job: "", price: 25000},
    {type: 7, worktype: 'besra', job: "", price: 20000},
    {type: 8, worktype: 'bombushka', job: "", price: 30000},
    {type: 9, worktype: 'hydra', job: "", price: 25000},
    {type: 10, worktype: 'lazer', job: "", price: 25000},
    {type: 11, worktype: 'mogul', job: "", price: 25000},
    {type: 12, worktype: 'molotok', job: "", price: 25000},
    {type: 13, worktype: 'nokota', job: "", price: 25000},
    {type: 14, worktype: 'pyro', job: "", price: 25000},
    {type: 15, worktype: 'rogue', job: "", price: 25000},
    {type: 16, worktype: 'starling', job: "", price: 25000},
    {type: 17, worktype: 'strikeforce', job: "", price: 25000},
    {type: 18, worktype: 'titan', job: "", price: 20000},
    {type: 19, worktype: 'tula', job: "", price: 20000},
    {type: 20, worktype: 'volatol', job: "", price: 30000},
    {type: 21, worktype: 'alkonost', job: "", price: 30000},

]

const cayoblips = [
    { title : "Cayo Perico Runway", colour : 3, id :  90, x :  4475.050, y :-4479.1914, z: 4.98003 },
    { title : "Island Beach Party", colour :  23, id :  614, x :  4918.11, y :  -4906.8, z :  3.44 },
    { title : "Island Weed Farm", colour :  25, id :  496, x :  5319.28, y :  -5248.54, z :  32.58 },
    { title : "Island Helipad", colour :  26, id :  542, x :  4890.52, y :  -5736.66, z :  26.35 },
    { title : "Island Mansion", colour :  30, id :  40, x :  5009.41, y :  -5749.76, z :  32.85 },
    { title : "Island House", colour :  7, id :  40, x :  5006.63, y :  -5787.81, z :  22.56 },
    { title : "Island House", colour :  7, id :  40, x :  5080.4, y :  -5756.1, z :  21.62 },
    { title : "Island House", colour :  7, id :  40, x :  5026.97, y :  -5735.91, z :  17.87 },
]

let notif = 0, island, plane, blips = [], menu = 0, spawn = 0, peds =[], travel = false, planeblip

alt.onServer('airportmenu', ()=>{
    if(menu == 0) {
        alt.emit('createmenu', 'Lost Santos Airport', 'travel', airportmenu)
        menu = 1
        let off = alt.setTimeout(()=>{
            menu = 0
            alt.clearTimeout(off)
        }, 1000)
    } 
})

alt.onServer('hangarmenu', ()=>{
    alt.emit('createmenu', 'Airport Management', 'hangar', hangarmenu)

})

alt.onServer('zancudomenu', ()=>{
    if(menu == 0) {
    alt.emit('createmenu', 'Zancudo Airbase Management', 'zancudo', zancudomenu)
    menu = 1
    let off = alt.setTimeout(()=>{
        menu = 0
        alt.clearTimeout(off)
    }, 1000)
} 
})

alt.on('zancudo', (type)=>{
    if(type == 1) {
        alt.emit('createmenu', 'Military Vehicles', 'milveh', miliveh)
    } else if(type == 2) {
        alt.emit('createmenu', 'Military Aircraft', 'milair', milaircraft)
    } else if(type == 3) {
        let playerhangar = alt.getMeta('phangar');
        if(playerhangar < 2) {
        alt.emitServer('buyhangar', hangar[1])
        } else {
            handletext('Property limit exceeded')
        }
    }
})

alt.on('hangar', (type)=>{
    if(type == 1) {
        alt.emit('createmenu', 'Aircraft', 'reqplane', aircrafts)
    } else if(type == 2) {
        let playerhangar = alt.getMeta('phangar');
        if(playerhangar < 2) {
            alt.emitServer('buyhangar', hangar[0])
        } else {
            handletext('Property limit exceeded')
        }
    }
})

alt.on('reqplane', (type)=>{
    let model
    for(let i in aircraft) {
        if(aircraft[i].type === type) {
            model = aircraft[i].worktype
        }
    }
    alt.emitServer('zancudoveh', model, {x: -1038.81640625,  y: -2975.765625, z: 13.949225425720215, h: 72.04735565185547 })

})

alt.on('milveh', (type)=>{
    let model
    for(let i in miliveh) {
        if(miliveh[i].type === type) {
            model = miliveh[i].worktype
        }
    }
    alt.emitServer('zancudoveh', model,  {x: -2174.582,y: 3198.026, z: 34.6757, h: 150.80197 } )
})

alt.on('milair', (type)=>{
    let model
    for(let i in milaircraft) {
        if(milaircraft[i].type == type) {
            model = milaircraft[i].worktype
       }
    }
    alt.emitServer('zancudoveh', model, {x: -2174.582,y: 3198.026, z: 34.6757, h: 150.80197 })
 
})

alt.on('travel', (type)=>{
    native.doScreenFadeOut(2000)
    alt.emitServer('traveling')
    if(type == 1) {
        if(travel == false) {
            yanktontravel()
        }

    } else if(type == 2) {
        if(travel == false) {
            cayotravel()
            travel = true
        }

    } else {}
})

alt.onServer('airpheading', (veh, h, blip)=>{
    let set = alt.setTimeout(()=>{
       // native.setEntityInvincible(veh, true)
        alt.clearTimeout(set)
        native.setEntityHeading(veh, h)
        
        native.setVehicleOnGroundProperly(veh, 5.0)
        if(blip == true) {
            //native.setEntityInvincible(veh, false)
            let vtype = native.getVehicleClass(veh);
            let pblip = native.addBlipForEntity(veh);
            planeblip = pblip
            native.setBlipSprite(pblip, vehicleSprite[vtype]);
        }
    }, 200)
    
})

alt.onServer('removeplaneblip', ()=>{
    if(planeblip > 0) {
        native.removeBlip(planeblip);
        planeblip = 0
    }
})

function yanktontravel() {
    for(let i in yanktonipls) {
        native.requestIpl(yanktonipls[i])
    }
    
    let arrive = alt.setInterval(()=>{
        alt.clearInterval(arrive)
        native.setEntityCoords(alt.Player.local.scriptID, 3217.697, -4834.826, 111.8152, 0,0,0,0)
        native.doScreenFadeIn(2000)
        native.setMinimapInPrologue(true);
        native.setZoneEnabled(native.getZoneFromNameId("PrLog"), true)
    }, 5000)
}

function cayotravel() {

for(let i in cayoIpls) {
    native.requestIpl(cayoIpls[i])
}
let start = alt.setTimeout(() => {
    let planemodel = alt.hash('nimbus')
        alt.clearTimeout(start)
        
       alt.emit('playcut', "hs4_lsa_take_nimb2", 8000)
        native.setZoneEnabled(native.getZoneFromNameId("PrLog"), false)
    native.setScenarioGroupEnabled('Heist_Island_Peds', 1)
    native.setAmbientZoneStatePersistent('AZL_DLC_Hei4_Island_Zones', 1, 1)
    native.setAmbientZoneStatePersistent('AZL_DLC_Hei4_Island_Disabled_Zones', 0, 1)

    native.requestModel(planemodel)
    let arrive = alt.setInterval(()=>{
        alt.clearInterval(arrive)
        native.setAllowStreamHeistIslandNodes(1)
        native.setUseIslandMap(true)
        native.loadGlobalWaterFile(1)
        plane = native.createVehicle(planemodel, 4475.050, -4479.1914,  4.98003, 114, false,false,false)
        createblip(cayoblips)
        native.setEntityCoords(alt.Player.local.scriptID, 4462.7998046875, -4484.56640625,  4.2089948654174805, 0,0,0,0)
        alt.emitServer('cayoisland')
        native.setIslandEnabled('HeistIsland', true)
        //native.doScreenFadeIn(5000)
        native.setClockTime(10,0,0)
        travel = false
        native.setModelAsNoLongerNeeded(planemodel)
        loadislandpeds(0)
       // native.doorSystemSetDoorState(alt.hash("h4_prop_h4_gate_r_03a"), 4981.012, -5712.747, 20.78103, true, 0, 0, -10);
       // native.doorControl(alt.hash("h4_prop_h4_gate_l_03a"), 4984.134, -5709.249, 20.78103, true, 0, 0, 10);
      //  native.doorControl(alt.hash("h4_prop_h4_gate_r_03a"), 4990.681, -5715.106, 20.78103, true, 0, 0, -10);
      //  native.doorControl(alt.hash("h4_prop_h4_gate_l_03a"), 4987.587, -5718.635, 20.78103, true, 0, 0, 10);
      
    
        island = alt.everyTick(()=>{
            let pos = alt.Player.local.pos
            
            native.setDeepOceanScaler(0.0)
            native.setRadarAsExteriorThisFrame()
            native.setRadarAsInteriorThisFrame(alt.hash('h4_fake_islandx'), 4700.0, -5145.0, 0, 0)
    
            let cayoh = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, 4475.050, -4479.1914,  4.98003, true);
            if(cayoh <= 4) {
                if(notif == 0) {
                    notif = 1
                    handletext('~INPUT_PICKUP~ Fly to Lost Santos')
                    alt.setMeta('cayoport', 1)
                }
                
            }
       
        });
    
}, 11000)
    
}, 5000);

}

alt.on('keydown', (key) => {
    if(key == 'E'.charCodeAt(0)){
        let chat = alt.getMeta('chat');
        let hangar = alt.getMeta('hangarmenu')
        
        if(chat == 1) {} else {
            let cayo = alt.getMeta('cayoport')
            if(cayo == 1) {
                backtols()
            }
        }
        if(hangar == 1) {
            alt.emit('createmenu', 'HANGAR MANAGEMENT', 'hangaroption', hangaroption)
        }

    }
})

alt.on('hangaroption', (type) =>{
    if(type == 1) {
        alt.emit('hangarslotmenu', hangarslot, aircraft, slotpos)
    } else if(type == 2) {
        alt.emit('interiormenu', hangarinterior)
    } else if(type == 3) {
        alt.emit('aircraftbuy', {x: -1266.98, y: -2995.95,  z: -48.48 + 7, h: 353.8})
    }
})
alt.on('keydown', (key) => {
    if(key == 'F'.charCodeAt(0)){
        let hangar = alt.getMeta('hangarmenu')
        if(hangar == 1) {
            
        }
    }
})


function backtols() {
    native.doScreenFadeOut(1000)
    if(island > 0) {
        alt.clearEveryTick(island);
        island = 0
    }
    alt.emit('playcut', 'hs4_isd_take_nimb2', 5000)
    
    let wait = alt.setInterval(()=>{
        alt.clearInterval(wait)
        native.setIslandEnabled('HeistIsland', false)
        native.setUseIslandMap(false)
        native.loadGlobalWaterFile(0)
        alt.emitServer('backtoLS', 'island')
        
        notif = 0
        alt.deleteMeta('cayoport')
        alt.emit('playcut', 'hs4_lsa_land_nimb', 9000)
        native.setEntityCoords(alt.Player.local.scriptID, -1039.389404296875, -2739.756591796875, 20.16929054260254, 0,0,0,1)
        native.setEntityHeading(alt.Player.local.scriptID, 340.9)
        for(let i in cayoIpls) {
            native.removeIpl(cayoIpls[i]);
        }
        native.deleteEntity(plane)
        for(let i in blips) {
            if(blips[i]) {
                native.removeBlip(blips[i]);
            }
        }
        blips = []
        for(let i in peds) {
            if(peds[i]) {
                native.deleteEntity(peds[i])
            }
        }
        peds = []
        let clear = alt.setInterval(()=>{
            alt.clearInterval(clear)
            native.doScreenFadeIn(2000)
            alt.emitServer('settime')
        }, 12000)
    }, 9000)
}

//loadislandpeds()

function loadislandpeds(a) {
    for(let i in islandpeds) {
        let model = alt.hash(islandpeds[i].model)
        let anim
        let animname
        native.requestModel(model);
        if(islandpeds[i].animation) {
        anim = islandpeds[i].animation.dict
        animname = islandpeds[i].animation.name
        native.requestAnimDict(anim)
        }
        let create = alt.setTimeout(()=>{
            alt.clearTimeout(create)
            let pos = islandpeds[i].locations
            for(let i in pos) {
                let ped = native.createPed(5, model, pos[i].x, pos[i].y, pos[i].z, pos[i].heading, 0,0);
                native.setPedCanRagdoll(ped, true);
                if(anim) {
                    native.taskPlayAnim(ped, anim, animname, 8.0, 1, -1, 1, 1.0, 0,0,0)
                    
                    native.setAnimLooped(ped, true, 1, 0)
                    //native.removeAnimDict(islandpeds[i].animation)
                } else
                if(islandpeds[i].scenario) {
                    native.taskStartScenarioInPlace(ped, islandpeds[i].scenario, 0, false);
                }
                if(islandpeds[i].weapons) {
                    let weap = islandpeds[i].defaultWeapon
                    native.giveWeaponToPed(ped, alt.hash(weap), 200, false, true);
                    native.taskShootAtEntity(ped, alt.Player.local.scriptID, 0, 7)
                }
                
                peds.push(ped)

            }

        }, 300)
    }
}

export function handletext(text) {
    native.beginTextCommandDisplayHelp("STRING");
    native.addTextComponentSubstringKeyboardDisplay(text);
    native.endTextCommandDisplayHelp(0, 0, true, -1);
};

export function handletext2(text1, text2) {
    native.beginTextCommandDisplayHelp("TWOSTRINGS")
    native.addTextComponentSubstringPlayerName(text1)
    native.addTextComponentSubstringPlayerName(text2)
    native.endTextCommandDisplayHelp(0, false, true, -1)
}

export function createblip(data) {
    for(let i in data) {
        let blip = native.addBlipForCoord(data[i].x, data[i].y, data[i].z)
        blips.push(blip)
        native.setBlipSprite(blip, data[i].id)
        native.setBlipDisplay(blip, 4)
        native.setBlipScale(blip, 1.0)
        native.setBlipColour(blip, data[i].colour)
        native.setBlipAsShortRange(blip, true)
        native.beginTextCommandSetBlipName("STRING")
        native.addTextComponentSubstringPlayerName(data[i].title)
        native.addTextComponentSubstringBlipName(blip)
        native.endTextCommandSetBlipName(blip)
    }
}

export function buyinfo(title, text, price){
    let buyinfo = alt.everyTick(()=>{
        native.playSound(0, "PROPERTY_PURCHASE", "HUD_AWARDS", true, 0 ,false)
        drawtext(title,0.5,0.25,7,1.6,1.0,255,0,0,255);
        drawtext(text,0.5,0.35,4,0.7,0.9,255, 255, 255,255);
      })
      let info = alt.setInterval(()=>{
        alt.emit('buy', (price))
        alt.clearEveryTick(buyinfo);
        alt.clearInterval(info);
      }, 5000)
}

export function drawtext(msg, x, y, font, scale, wrap, r, g, b, a,) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(font);
    //native.setTextOutline();
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, wrap);
    native.setTextCentre(true);
    native.setTextColour(r,g,b,a);
    native.setTextJustification(0);
    native.setTextDropShadow(true);
    native.endTextCommandDisplayText(x, y, 0);
    
  }