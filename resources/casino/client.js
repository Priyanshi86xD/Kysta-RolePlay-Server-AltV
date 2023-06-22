import * as alt from 'alt-client';
import * as native from 'natives';
import { casinopeds } from './peds.js';

const ipls = {
    building : [
        "hei_dlc_windows_casino",
        "hei_dlc_casino_aircon",
        "vw_dlc_casino_door",
        "hei_dlc_casino_door",
        "vw_casino_billboard"
    ],
    casino : ["vw_casino_main"],
    garage : ["vw_casino_garage"],
    carpark : ["vw_casino_carpark"],
    penthouse : ['vw_casino_penthouse',"ch_int_placement_ch_interior_4_dlc_casino_hotel_milo_",
    "vw_int_placement_vw_interior_1_dlc_casino_apart_milo_"],
   
}

const interior = {
    casinodoor : {x: 924.4614868164062,y: 46.42258071899414, z: 81.10635375976562 ,h: 55.17625045776367 },
    casino : {x: 1089.6716, y: 206.939,z: -48.9997, h:327.4283 },
    casinoh : {x:2490.67, y:-280.40, z:-58.71},
    casinocar : { x: 1100.4964599609375, y: 219.7486114501953, z: -49.447044372558594, h:174.9524688720703 },
    LoadingBay: {x:2536.276, y:-278.98, z:-64.722},
    VaultLobby: {x:2483.151, y:-278.58, z:-70.694},
    Vault: {x:2516.765, y:-238.056, z:-70.737},
    Carpark: {x:1380.000, y:200.000, z: -50.000},
    VIPCarpark: {x:1295.000, y: 230.000, z: -50.000},
    hotel: {x:2504.400, y:-257.200, z:-39.100},
    penthouse: {x: 976.636, y:70.295, z:115.164},
    musiclocker: {x: 1550.0, y: 250.0, z: -48.0}
}

const entityset = {
    casino : ['vw_prop_vw_animated_walls', 'vw_prop_vw_casino'],
    vault: ['Set_Vault_Door', 'set_vault_dressing', 'Set_vault_cash_01', 'Set_vault_cash_02',
        'Set_vault_gold_01', 'Set_vault_gold_02', 'Set_vault_art_01', 'Set_vault_art_02', 'Set_vault_diamonds_01',
        'Set_vault_diamonds_02'],
        musiclocker : [
            "EntitySet_DJ_Lighting",
            "dj_01_lights_01",
           // "dj_01_lights_02",
          //  "dj_01_lights_03",
           // "dj_01_lights_04",
            "dj_02_lights_01",
           // "dj_02_lights_02",
           // "dj_02_lights_03",
           // "dj_02_lights_04",
            "dj_03_lights_01",
          //  "dj_03_lights_02",
           // "dj_03_lights_03",
          //  "dj_03_lights_04",
            "dj_04_lights_01",
          //  "dj_04_lights_02",
          //  "dj_04_lights_03",
           // "dj_04_lights_04",
            "int01_ba_bar_content",
            "int01_ba_booze_01",
          //  "int01_ba_booze_02",
          //  "int01_ba_booze_03",
            "int01_ba_dj01",
         //   "int01_ba_dj02",
         //   "int01_ba_dj03",
          //  "int01_ba_dj04",
           // "int01_ba_dj_keinemusik",
            "int01_ba_dj_moodyman",
           // "int01_ba_dj_palms_trax",
           // "int01_ba_dry_ice",
           // "int01_ba_equipment_setup",
            "int01_ba_equipment_upgrade",
            "int01_ba_lightgrid_01",
            "int01_ba_lights_screen",
            "int01_ba_screen",
            "int01_ba_security_upgrade",
            "int01_ba_style02_podium",
          //  "light_rigs_off",
    
        ]
}
const pentset = {
    color : ["Set_Pent_Tint_Shell"],
    pattern : [ 
    "Set_Pent_Pattern_01",
    "Set_Pent_Pattern_02",
    "Set_Pent_Pattern_03",
    "Set_Pent_Pattern_04",
    "Set_Pent_Pattern_05",
    "Set_Pent_Pattern_06",
    "Set_Pent_Pattern_07",
    "Set_Pent_Pattern_08",
    "Set_Pent_Pattern_09",
    ],
    bar : [
        "Set_Pent_Spa_Bar_Open",
        "Set_Pent_Spa_Bar_Closed",
    ],
    media : [
        "Set_Pent_Media_Bar_Open",
        "Set_Pent_Media_Bar_Closed",
    ],
    dealer : [
        "Set_Pent_Dealer",
        "Set_Pent_NoDealer",
    ],
    arcade : [
        "",
        "Set_Pent_Arcade_Retro",
        "Set_Pent_Arcade_Modern",
    ],
    clutter : [
        "Set_Pent_Bar_Clutter",
        "Set_Pent_Clutter_01",
        "Set_Pent_Clutter_02",
        "Set_Pent_Clutter_03",
    ],
    barlight : [
        "",
        "set_pent_bar_light_0",
        "set_pent_bar_light_01",
        "set_pent_bar_light_02",
    ],
    barparty : [
        "",
        "set_pent_bar_party_0",
        "set_pent_bar_party_1",
        "set_pent_bar_party_2",
        "set_pent_bar_party_after",
    ]
}

for(let i in ipls.building) {
    native.requestIpl(ipls.building[i])
}

const dcasdoor = [
    {type: -1, worktype: "~b~Select option", job: "", price: 0},
    {type: 1, worktype: "Exit Casino", job: "", price: 0},
]

const dcasroofdoor = [
    {type: -1, worktype: "~b~Select option", job: "", price: 0},
    {type: 1, worktype: "Enter Casino", job: "", price: 0},
    {type: 2, worktype: "Enter Penthouse", job: "", price: 0},
]

const dcaslift = [
    {type: -1, worktype: "~b~Select option", job: "", price: 0},
    {type: 1, worktype: "Go to Rooftop", job: "", price: 0},
    {type: 2, worktype: "Enter Penthouse", job: "", price: 0},
]
const dteller = [
    {type: -1, worktype: "~b~Select option", job: "", price: 0},
    {type: 1, worktype: "Buy Penthouse", job: "", price: 0},
   // {type: 2, worktype: "Enter Penthouse", job: "", price: 0},
]

const casinopos = [
     {x: 1089.6716, y: 206.939,z: -48.9997, h:327.4283, type : dcasdoor, task: 'casdoor'}, // casino enter
     {x: 964.2484741210938,y: 58.73808288574219,z: 112.5530014038086 ,h: 58.48407745361328, type : dcasroofdoor , task: 'casroofdoor'}, //roof
     {x: 1085.315185546875,  y: 214.57843017578125,  z: -49.20042419433594, h: 311.1542663574219, type : dcaslift, task : 'caslift'}, //casino lift
     { x: 1087.5947265625,    y: 219.25723266601562,   z: -49.20039749145508, h: 343.5599060058594, type : dteller , task : 'casteller'}, // casino teller
     // {x: 987.66943359375, y: 80.0074462890625,  z: 80.99053955078125  ,h: 338.9423522949219 }, //ml
 ]



let peds = [], tick = 0, menu = 0, casino = false, cars =[], carspin = 0

alt.onServer('casinonotif', ()=>{
    handletext('~INPUT_PICKUP~ to Enter Diamond Casino')
    alt.setMeta('casino', 1)
})

alt.onServer('mlnotif', ()=>{
    handletext('~INPUT_PICKUP~ to Enter Music Locker')
    alt.setMeta('casino', 3)
})

alt.on('keydown', (key) => {
    if(key == 'E'.charCodeAt(0)){
        let chat = alt.getMeta('chat');
        if(chat == 1) {} else {
            let cas = alt.getMeta('casino')
            if(cas == 1) {
                native.doScreenFadeOut(2000)
                if(casino == false) {
                    entercasino(interior.casino)
                }
                
            } else if(cas == 3) {
                native.doScreenFadeOut(2000)
                enterml()
            }
        }
    }
})

alt.on('casdoor', (type) =>{
    if(type == 1) {
        native.doScreenFadeOut(2000)
        exitcasino(interior.casinodoor)
    }
})

alt.on('casroofdoor', (type)=>{
    if(type == 1) {
        native.doScreenFadeOut(2000)
        if(casino == false) {
            entercasino(casinopos[2])
        }
        
    }  else if(type == 2) {
        native.doScreenFadeOut(2000)
        enterpenthouse()
    }
})

alt.on('caslift', (type)=>{
    if(type == 1) {
        native.doScreenFadeOut(2000)
        exitcasino(casinopos[1])
        roofdoor()
    }  else if(type == 2) {
        native.doScreenFadeOut(2000)
        enterpenthouse()
    }
})

alt.onServer('casinoof', ()=>{
    alt.deleteMeta('casino')
})

function entercasino(door) {
    casino = true
    let wheelm = alt.hash('vw_prop_vw_luckywheel_02a')
    native.requestModel(wheelm)

    for(let i in ipls.casino) {
        native.requestIpl(ipls.casino[i]); 
    }
    for(let i in entityset.casino) {
        //native.activateInteriorEntitySet(275201, entityset.casino[i])
    }
    native.requestStreamedTextureDict('Prop_Screen_Vinewood', 1)
    loadpeds()
    let enter = alt.setInterval(()=>{
        alt.clearInterval(enter)
        alt.setMeta('casino', 2)
        let wheel = native.createObject(wheelm, 1111.052, 229.84, -50.38, false, false, true)
            native.setEntityHeading(wheel, 0.0)
            native.setModelAsNoLongerNeeded(wheelm)

        createcar(0x3944D5A0, interior.casinocar)
        alt.emitServer('inthehouse', {x:924.461,y:46.422, z:81.106})
        native.setEntityCoords(alt.Player.local.scriptID, door.x,door.y,door.z,0,0,0,1)
        native.setEntityHeading(alt.Player.local.scriptID, interior.casino.h)
        native.doScreenFadeIn(3000)

        native.registerNamedRendertarget('casinoscreen_01', 1)
        native.linkNamedRendertarget(alt.hash('vw_vwint01_video_overlay'))
        
        tick = alt.setInterval(()=>{
            let WallTarget = native.getNamedRendertargetRenderId('casinoscreen_01')
            //native.setRadarAsInteriorThisFrame(275201,door.x,door.y,door.z,0)
            if(WallTarget) {
                setVideoWallTvChannelWin(WallTarget)
            }
            let pos = alt.Player.local.pos
            for(let i in casinopos) {
                let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, casinopos[i].x,casinopos[i].y,casinopos[i].z, true)
                if(dist < 1) {
                    if(menu == 0) {
                        alt.emit('createmenu', 'Diamond Casino & Resort', casinopos[i].task, casinopos[i].type)
                        menu = casinopos[i].task
                    }
                    
                } else {
                    if(menu == casinopos[i].task) {
                        menu = 0
                        alt.emit('closemenu', casinopos[i].task)
                    }
                }
            }
        }, 1000)

    }, 7000)
}

function exitcasino(door) {
    casino = false
    if(carspin > 0) {
        alt.clearInterval(carspin)
    }
    if(tick > 0) {
        alt.clearInterval(tick);
        let exit = alt.setInterval(()=>{
            alt.clearInterval(exit);
            native.setEntityCoords(alt.Player.local.scriptID, door.x, door.y, door.z,0,0,0,1 );
            native.setEntityHeading(alt.Player.local.scriptID, door.h);
            native.doScreenFadeIn(2000)
            for(let i in peds) {
                native.deleteEntity(peds[i]);
            }
            for(let i in ipls.casino) {
                native.removeIpl(ipls.casino[i])
            }
            for(let i in entityset.casino) {
                native.deactivateInteriorEntitySet(275201, entityset.casino[i])
            }
            for(let i in cars) {
                if(cars[i]) {
                    native.deleteEntity(cars[i])
                }
            }
            let screen = 'casinoscreen_01'
            //native.setTvChannel(2);
            let isreg = native.isNamedRendertargetRegistered(screen)
            if(isreg == true) {
                native.releaseNamedRendertarget(screen)
            }
            peds = []
            cars = []
            alt.emitServer('outroom')
        }, 5000)
    }
    
}
function enterpenthouse() {
    for(let i in ipls.penthouse) {
        native.requestIpl(ipls.penthouse[i]);
    }

    let enter = alt.setInterval(()=>{
        alt.clearInterval(enter)
        native.setEntityCoords(alt.Player.local.scriptID, interior.penthouse.x,interior.penthouse.y,interior.penthouse.z,0,0,0,1)
        native.doScreenFadeIn(2000)
        
        native.activateInteriorEntitySet(274689, "Set_Pent_Tint_Shell")
        native.setInteriorEntitySetTintIndex(274689, "Set_Pent_Tint_Shell", 3)

    }, 6000)
}

function roofdoor() {
    menu = 0
    let timeout = alt.setTimeout(()=>{
        alt.clearTimeout(timeout);
        tick = alt.setInterval(()=>{
            let pos = alt.Player.local.pos
                let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, casinopos[1].x,casinopos[1].y,casinopos[1].z, true)
                if(dist < 1) {
                    if(menu == 0) {
                        alt.emit('createmenu', 'Diamond Casino & Resort', casinopos[1].task, casinopos[1].type)
                        menu = casinopos[1].task
                    }
                    
                } else {
                    if(menu == casinopos[1].task) {
                        menu = 0
                        alt.emit('closemenu', casinopos[1].task)
                    }
                }
        }, 1000)
    }, 6000)
}

function enterml() {

    let enter = alt.setInterval(()=>{
        alt.clearInterval(enter)
        native.setEntityCoords(alt.Player.local.scriptID, interior.musiclocker.x,interior.musiclocker.y,interior.musiclocker.z,0,0,0,1)
        native.doScreenFadeIn(2000)
        for(let i in entityset.musiclocker) {
            let ml = native.getInteriorAtCoords(interior.musiclocker.x,interior.musiclocker.y,interior.musiclocker.z)
            native.activateInteriorEntitySet(ml, entityset.musiclocker[i])
        }
        
    }, 3000)
}

function loadpeds() {
    for(let i in casinopeds) {
        native.requestModel(casinopeds[i].model);
        if(casinopeds[i].property.animactive) {
            if(casinopeds[i].property.animactive == true) {
                native.requestAnimDict(casinopeds[i].property.animdict)
            }
        }
        let time = alt.setTimeout(()=>{
            alt.clearTimeout(time);
            let ped = native.createPed(casinopeds[i].type, casinopeds[i].model,casinopeds[i].pos.x,casinopeds[i].pos.y,casinopeds[i].pos.z,casinopeds[i].pos.yaw, false, false);
            //native.setEntityRotation(ped, casinopeds[i].pos.roll, casinopeds[i].pos.roll,casinopeds[i].pos.yaw, 2, 1)
            native.setEntityHeading(ped, casinopeds[i].pos.yaw)
            peds.push(ped);
            let peddata = casinopeds[i].property
            for(let i in peddata.pedcomp) {
                native.setPedComponentVariation(ped, peddata.pedcomp[i].id, peddata.pedcomp[i].draw,peddata.pedcomp[i].text, 0)
            }
            for(let i in peddata.pedprop) {
                native.setPedPropIndex(ped, peddata.pedprop[i].id,peddata.pedprop[i].draw,peddata.pedprop[i].text, true,0)
            }
            native.setPedArmour(ped, peddata.armor)
            if(casinopeds[i].property.facialmood) {
                native.setFacialClipset(ped,casinopeds[i].property.facialmood)
            }
            
           // native.setPedGravity(ped, true);
           // native.setPedCanRagdoll(ped, casinopeds[i].property.ragdoll)
            
            
            if(casinopeds[i].property.scenarioactive) {
            if(casinopeds[i].property.scenarioactive == true) {
                //native.taskStartScenarioInPlace(ped, casinopeds[i].property.scenario, 0, false);
                native.taskStartScenarioAtPosition(ped, casinopeds[i].property.scenario,casinopeds[i].pos.x,casinopeds[i].pos.y,casinopeds[i].pos.z,casinopeds[i].pos.yaw,0,0,1)
            }   }
            if(casinopeds[i].property.animactive) {
                if(casinopeds[i].property.animactive == true) {
                    native.taskPlayAnimAdvanced(ped, casinopeds[i].property.animdict, casinopeds[i].property.animname,casinopeds[i].pos.x,casinopeds[i].pos.y,casinopeds[i].pos.z,casinopeds[i].pos.pitch, casinopeds[i].pos.roll,casinopeds[i].pos.yaw, 8.0,1,-1,1,1,0,0)
                    //native.taskPlayAnim(ped, casinopeds[i].property.animdict, casinopeds[i].property.animname, 8.0, 1, -1, 1, 1, false, false, false)
                }
            }
            native.setModelAsNoLongerNeeded(casinopeds[i].model)
            native.removeAnimDict(casinopeds[i].property.animdict)
        }, 300)
    }
}

function createcar(model, pos) {
    native.requestModel(model)
    let timeout = alt.setTimeout(()=>{
        alt.clearTimeout(timeout)
        let car = native.createVehicle(model, pos.x, pos.y, pos.z+0.8, pos.h, false, false, false)
        native.setVehicleCustomPrimaryColour(car, 155,55,0);
        native.setVehicleCustomSecondaryColour(car, 155,55,0)
        native.setVehicleOnGroundProperly(car, 5.0)
        cars.push(car)
        let h = native.getEntityHeading(car);
        carspin = alt.setInterval(()=>{
            native.setEntityHeading(car, h += 0.075)
            h += 0.55
        }, 30)
    }, 300)
}

function handletext(text) {
    native.beginTextCommandDisplayHelp("STRING");
    native.addTextComponentSubstringKeyboardDisplay(text);
    native.endTextCommandDisplayHelp(0, 0, true, -1);
};

function setVideoWallTvChannelWin() {
    native.setTvChannel(0)
    native.setTvChannelPlaylist(0, 'CASINO_DIA_PL', true)
    native.setTvAudioFrontend(true)
    native.setTvVolume(-100.0)

    let draw = alt.everyTick(()=>{
        native.setTextRenderId(WallTarget)
        native.setScriptGfxDrawOrder(4)
        native.setScriptGfxDrawBehindPausemenu(true)
        native.drawSpriteNamedRendertarget('Prop_Screen_Vinewood', 'BG_Wall_Colour_4x4', 0.25, 0.5, 0.5, 1.0, 0.0, 255, 255, 255, 255,1)
                    //native.drawSpriteArx('Prop_Screen_Vinewood', 'BG_Wall_Colour_4x4', 0.25, 0.5, 0.5, 1.0, 0.0, 255, 255, 255, 255, 0,0)
        native.drawTvChannel(0.5, 0.5, 1.0, 1.0, 0.0, 255, 255, 255, 255)
        native.setTextRenderId(native.getDefaultScriptRendertargetRenderId())
    })
    
    
}