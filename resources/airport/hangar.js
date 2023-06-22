import * as alt from 'alt-client';
import * as native from 'natives';
import { buyinfo, createblip, handletext } from './client.js';

export const hangar = [
    { name: 'lshangar', title : "Hangar", colour : 3, id : 359, pos: { x: -1619.35, y: -3147.55, z: 13.99 }, h : 159.66961669921875}, //ls ap
    { name: 'zchangar',title : "Hangar", colour : 3, id : 569, pos: {x: -1920.0042, y: 3134.3474, z: 32.8103} , h: 164.168 }, //zancudo
]

const planeexitpos = { x: -1933.36767578125,   y: 3112.1142578125,   z: 32.81032943725586, h: 140.47549438476562 }

const slot = ['slot1', 'slot2', 'slot3']

const lsaspawn =  {x: -1651.0748291015625,y: -3140.700927734375,z: 13.992228507995605, h: 326.3483581542969}

export let slotpos = {
    slot1 : { plane: null, model: "Empty", data: null, pos: { x: -1256.71,  y: -3035.50, z: -47.95, h : 357.68 } },
    slot2 : { plane: null, model: "Empty", data: null, pos: { x: -1277.005,  y: -3035.008, z: -47.95, h : 357.68 }} ,
    slot3 : { plane: null, model: "Empty", data: null, pos: { x: -1267.17, y: -3023.66,  z: -47.95, h : 358.74}},
    slot4 : { plane: null, model: "Empty", data: null, pos: { x: -1252.428,  y: -3022.70, z: -47.95, h : 38.25 } },
    slot5 : { plane: null, model: "Empty", data: null, pos: { x: -1281.84, y: -3021.79,  z: -47.94, h : 323.43 } },
    slot6 :  { plane: null, model: "Empty", data: null, pos: {x: -1267.18,  y: -3008.13,  z: -47.648, h : 359.72 } }, 
    slot7 : { plane: null, model: "Empty", data: null, pos: {x: -1273.8217,   y: -2990.8496,   z: -46.76025, h:25.1252 }}, //large slot
    slot8 : { plane: null, model: "Empty", data: null, pos: {x: -1280.009,   y: -2996.457,  z: -48.333, h : 338.248} } ,
    slot9 : { plane: null, model: "Empty", data: null, pos: {x: -1254.859,  y: -2996.968,  z: -48.333 , h : 24.474} },
    slot10 : { plane: null, model: "Empty", data: null, pos: {x: -1266.718,  y: -2984.618, z: -48.333, h : 359.622} },
    slot11 : { plane: null, model: "Empty", data: null, pos: {x: -1276.289,  y: -2970.47,  z: -48.333, H : 334.930} },
    slot12 : { plane: null, model: "Empty", data: null, pos: {x: -1257.98,   y: -2972.702, z: -48.333, h : 25.450 } }
}

export let hangarinterior = {
    pos : {x: -1266.0, y: -3014.0,z: -47.0},
    officechair : {  x: -1239.926, y: -3001.34375,  z: -43.8415, h: 350 },
    interior : 260353,
    interiorsProps : [
        "set_lighting_hangar_b",
        "set_tint_shell",
        "set_bedroom_tint",
        "set_crane_tint",
        "set_modarea",
        "set_lighting_tint_props",
        "set_floor_1",
        "set_bedroom_modern",
        "set_office_modern",
        "set_bedroom_blinds_open",
        "set_lighting_wall_tint01"
    ],

    interiorsPropColors : [
         "set_tint_shell" ,
         "set_bedroom_tint" ,
         "set_crane_tint" ,
         "set_modarea" ,
         "set_lighting_tint_props" ,
         
    ],
    floor : "set_floor_decal_1" ,
    color : 1,
    style : [
        {name:'style 1', value: 1, price: 90000, price2: 50000},
        {name:'style 2', value: 2, price: 100000, price2: 95000},
        {name:'style 3', value: 3, price: 133000, price2: 110000},
        {name:'style 4', value: 4, price: 167000, price2: 125000},
        {name:'style 5', value: 5, price: 200000, price2: 140000},
        {name:'style 6', value: 6, price: 234000, price2: 155000},
        {name:'style 7', value: 7, price: 267000, price2: 170000},
        {name:'style 8', value: 8, price: 300000, price2: 185000},
        {name:'style 9', value: 9, price: 320000, price2: 200000},
    ]
}

let playerhangar = [], lshangar = 0, zchangar = 0, count = 0, hangarmenu = false, modmenu = false, currenthangar, seat = false, chair, sit = false
let lsamenu = false, hangarinside = false, planemod = false

export let hangarslot = []
export let aircraft = []
export let hangaraircraft = []

alt.on('sethangar', (data)=>{
    if(data.hangar.data) {
        playerhangar.push(hangar[1])
        zchangar = 1
        alt.emit('createblip', 'hangar1', 'Player Hangar', hangar[1].pos, hangar[1].id, hangar[1].colour, 1, false)

        hangarinterior.color = data.hangar.style
        hangarinterior.floor = data.hangar.floor
        alt.log(data.hangar)
        
        if(data.aircrafts.length > 0) {
            aircraft = data.aircrafts
        }
        if(data.hangarslot.length > 0) {
            hangarslot = data.hangarslot
        }
    } 
    if(data.airporth > 0) {
        playerhangar.push(hangar[0])
        lshangar = 1
        alt.emit('createblip', 'hangar2', 'Player Hangar', hangar[0].pos, hangar[0].id, hangar[0].colour, 1, false)
    }
    alt.setMeta('phangar', playerhangar.length)

    
})

alt.onServer('startshop', ()=>{
    if(playerhangar.length > 0) {
        if(count == 0 ) {
            hangarcount()
        }
    }
})

alt.onServer('savehangar', (data)=>{
    if(data.name == 'lshangar') {
        if(lshangar == 0) {
            playerhangar.push(hangar[0])
            lshangar = 1
            alt.emit('createblip', 'hangar2', 'Player Hangar', hangar[0].pos, hangar[0].id, hangar[0].colour, 1, false)
            alt.emitServer('updatedata', 'accounts', 'airporth', 1, false);
            alt.setMeta('phangar', playerhangar.length)
            buyinfo('~y~HANGAR PURCHASED', 'LS Airport Hangar Unlocked', 800000)

        } else {
            handletext('LSIA hangar already purchased')
        }
    } else
    if(data.name == 'zchangar') {
        if(zchangar == 0) {
            let hangardata = {
                data : data,
                style : 1,
                floor : "set_floor_decal_1"
            }
            playerhangar.push(hangar[1])
            zchangar = 1
            alt.emit('createblip', 'hangar1', 'Player Hangar', hangar[1].pos, hangar[1].id, hangar[1].colour, 1, false)
            alt.emitServer('updatedata', 'accounts', 'hangar', hangardata, false);
            alt.emitServer('updatedata', 'accounts', 'hangarslot', hangarslot, false)
            alt.setMeta('phangar', playerhangar.length)
            buyinfo('~y~HANGAR PURCHASED', 'Fort Zancudo Hangar Unlocked', 1600000)
        } else {
            handletext('Fort Zancudo hangar already purchased')
        }
    }
    if(count > 0) {
        alt.clearInterval(count);
    }
    hangarcount()
})

alt.on('savehangarstyle', (style, floortype) =>{
    hangarinterior.color = style
    hangarinterior.floor = floortype
    let hangardata = {
        data : hangar[1],
        style : style,
        floor : floortype
    }
    alt.emitServer('updatedata', 'accounts', 'hangar', hangardata, false);
    alt.log('hangar style saved')
})

alt.onServer('setplaneslot', (vslot, planeid, data)=>{
    let pslot = hangarslot.filter((pos) => {
        return pos.slot == vslot
    })
    if(pslot.length == 0) {
        let slotdata = {
            slot : vslot,
            model : data.display,
            pos : slotpos[vslot],
            data : data
        }
        hangarslot.push(slotdata)
    } else 
    for(let i in hangarslot) {
        if(hangarslot[i].slot == vslot) {
        hangarslot[i].model = data.display
        hangarslot[i].data = data
        }
    }
    for(let i in aircraft) {
        if(aircraft[i].data.id == data.id) {
            aircraft[i].slot = vslot;
        }
    }
    slotpos[vslot].plane = planeid
    slotpos[vslot].model = data.display
    alt.emitServer('updatedata', 'accounts', 'hangarslot', hangarslot, false)
    alt.emitServer('updatedata', 'accounts', 'aircrafts', aircraft, false)

})

alt.onServer('saveaircraft', (modelname, vdisplay, pricolor, seccolor, pearlc, seat, vtype)=>{
    let planedata = {
        id : aircraft.length,
        display : vdisplay,
        model : modelname,
        color1 : pricolor,
        color2 : seccolor,
        pearls : pearlc,
        tank : -1,
        armor : -1,
        bomb : 0,
        countermeasure : 0,
        engine : -1,
        handling : -1,
        livery : -1,
        weapon : -1,
        seat : seat,
        type : vtype
    } 
    let slot = hangarslot.length;
    let hslot = 'slot'+(slot+1)
    let aslot = false
  

    if(zchangar == 1 ) {
    
        if(slot < 12 && seat <= 6) {
            aslot = true
            let slotdata = {
                slot : hslot,
                model : vdisplay,
                pos : slotpos[hslot],
                data : planedata
            }
            hangarslot.push(slotdata)
            alt.emitServer('updatedata', 'accounts', 'hangarslot', hangarslot, false)
        //    alt.emitServer('hangarplanes', planedata, slotpos[hslot], hslot)
    } 

    }
    let acdata = {
        slot : null,
        data : planedata
    }
    aircraft.push(acdata)
    alt.emitServer('updatedata', 'accounts', 'aircrafts', acdata, true)

})

alt.on('changehangarslot', (slot, oldslot, vdata, vehId)=>{

    for(let i in hangarslot) {

        if(hangarslot[i].slot == oldslot) {
            hangarslot[i].model = 'Empty'
            hangarslot[i].data = null
        }
    }
    for(let i in aircraft) {
        if(aircraft[i].data.id == vdata.data.id) {
            if(vehId == null) {
                aircraft[i].slot = null
            }
        }
    }
    slotpos[oldslot].plane = null
    slotpos[oldslot].model = "Empty"
})

alt.onServer('sethangarplanes', hangarplanes)

alt.on('removeaircraft', (vslot, data) =>{
    for(let i in aircraft) {
        if(aircraft[i].data.id == data.data.id) {
            aircraft[i].data = null
            aircraft[i].slot = null
        }
    }
    for(let i in hangarslot) {
        if(hangarslot[i].data.id == data.data.id) {
            hangarslot[i].model = 'Empty'
            hangarslot[i].data = null
        }
    }
    slotpos[vslot].plane = null
    slotpos[vslot].model = 'Empty'
    alt.emitServer('updatedata', 'accounts', 'hangarslot', hangarslot, false)
    alt.emitServer('updatedata', 'accounts', 'aircrafts', aircraft, false)
})
alt.on('saveplanemod', (planeid, planedata)=>{
    for(let i in aircraft) {
        if(aircraft[i].data.id == planeid) {
            aircraft[i].data = planedata
        }
    }
    for(let i in hangarslot) {
        if(hangarslot[i].data == null) {} else 
        if(hangarslot[i].data.id == planeid) {
            hangarslot[i].data = planedata
        
    }
    }
    alt.emitServer('updatedata', 'accounts', 'aircrafts', aircraft, false)
    alt.emitServer('updatedata', 'accounts', 'hangarslot', hangarslot, false)
    alt.emitServer('updatevehdata', planedata)
})

alt.onServer('aircraftdata', (data)=>{
    hangaraircraft = data
})

alt.on('keydown', (key) => {
    if(key == 'E'.charCodeAt(0)){
        if(seat == true) {
            alt.emit('hangaroffice', aircraft)
        }
        if(lsamenu == true) {
            alt.emit('lsamenu', lsaspawn)
        }
        
        if(planemod == true) {
            alt.emit('planemodmenu')   
        }
    }
});

alt.on('hangarstorage', ()=>{
    alt.emit('pegasusmenu', aircraft, lsaspawn)
})

alt.onServer('escortjobnotif',(player)=>{
    if(zchangar == 1) {
        alt.log('Escort Job started, go to your hangar to start the job')
        alt.emit('notif', '~b~HANGAR JOB ~w~Escort Job is Ready, Go to your Hangar to start the job')
        
    }
})

function hangarcount() {
   count = alt.setInterval(()=>{
        let pos = alt.Player.local.pos
        for(let i in playerhangar) {
            let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, playerhangar[i].pos.x, playerhangar[i].pos.y, playerhangar[i].pos.z, true)
            if(dist <= 30) {
                alt.emit('marker', 1, playerhangar[i].pos.x, playerhangar[i].pos.y, playerhangar[i].pos.z-1,1,1,1,55,125,155,100)
            }
            if(dist < 1.5) {
                if(playerhangar[i].name == 'lshangar' ) {
                    if(lsamenu == false) {
                        lsamenu = true
                        handletext('~INPUT_PICKUP~ to open Hangar menu')
                        currenthangar = playerhangar[i]
                    }

                } else {
                    if(count > 0) {
                        alt.clearInterval(count);
                        count = 0
                        currenthangar = playerhangar[i]
                        if(hangarinside == false) {
                            insidehangar() 
                        }
                        
                    }
                }
            } else {
                if(playerhangar[i].name == 'lshangar' ) {
                alt.emitServer('removebuyplane')
                lsamenu = false
                }
            }
        }
    }, 1000)
}

function insidehangar() {
    hangarinside = true;
    native.doScreenFadeOut(1000);
    native.requestModel(867556671)
    
    native.playSoundFrontend(-1, "Door_Open_Limit", "DLC_SM_Hangar_Door_Sounds", 1)
    native.requestIpl("sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_")
            for(let i in hangarinterior.interiorsProps) {
                native.activateInteriorEntitySet(hangarinterior.interior, hangarinterior.interiorsProps[i])
                native.setInteriorEntitySetTintIndex(hangarinterior.interior, hangarinterior.interiorsProps[i], hangarinterior.color)
            }
            native.activateInteriorEntitySet(hangarinterior.interior, hangarinterior.floor)
            native.setInteriorEntitySetTintIndex(hangarinterior.interior, hangarinterior.floor, hangarinterior.color)
            let enter = alt.setInterval(()=>{
                alt.clearInterval(enter)
                alt.emitServer('insidehangar')
                hangarplanes()
                alt.emitServer('inthehouse', hangar[1].pos)
                alt.emit('fakemap', true, hangar[1].pos.x, hangar[1].pos.y)
                native.setEntityCoords(alt.Player.local.scriptID, -1266.70, -2965.12, -48.48, 0,0,0,0);
                
                native.setEntityHeading(alt.Player.local.scriptID, 183)
                native.doScreenFadeIn( 3000);
                chair = native.createObject(867556671, hangarinterior.officechair.x, hangarinterior.officechair.y, hangarinterior.officechair.z, 0,0,0);
                native.setEntityHeading(chair, hangarinterior.officechair.h)
                native.placeObjectOnGroundProperly(chair);
                native.setModelAsNoLongerNeeded(867556671)
                let intcount = alt.setInterval(()=>{
                    let pos = alt.Player.local.pos
                    let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, -1243.52, -2996.07, -42.88, true);
                    let dist1 = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, -1266.59, -2960.29, -48.48, true);
                    let dist2 = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z,hangarinterior.officechair.x, hangarinterior.officechair.y, hangarinterior.officechair.z, true);
                    if(dist  <= 20) {
                        alt.emit('marker', 1, -1243.52, -2996.07, -42.88-1,1,1,1,55,95,155,100)
                    }
                    if(dist1  <= 20) {
                        alt.emit('marker', 1, -1266.59, -2960.29, -48.48-1,1,1,1,55,95,155,100)
                    }
                    if(dist <= 2) {
                        if(hangarmenu == false) {
                            hangarmenu = true
                            handletext('~INPUT_PICKUP~ Open Hangar Management')
                            alt.setMeta('hangarmenu', 1)
                           // alt.emitServer('planedata')
                            hangaraircraft = alt.Player.local.getSyncedMeta('hangarveh')
                        }
                    } else {
                        if(hangarmenu == true) {
                            hangarmenu = false
                            alt.emitServer('removebuyplane')
                            if(alt.hasMeta('hangarmenu')) {
                                alt.deleteMeta('hangarmenu')
                            }
                        }
                    }
                    let isplane = native.isPedInAnyVehicle(alt.Player.local.scriptID, false);
                    if(isplane == true) {
                        if(planemod == true) { } else {
                            native.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, false, true, true)
                            alt.setMeta('playeraircraft', alt.Player.local.vehicle)
                            handletext('~INPUT_PICKUP~ to modify your aircraft')
                            planemod = true
                            native.freezeEntityPosition(alt.Player.local.vehicle.scriptID, true)
                        }
                        alt.on('keydown', (key) => {
                            if(key == 'W'.charCodeAt(0)){
                                if(planemod == true) {
                                if(intcount > 0) {
                                    alt.clearInterval(intcount)
                                    intcount = 0
                                    planemod = false
                                }
                                    let veh = alt.getMeta('playeraircraft')
                                    native.doScreenFadeOut(1000);
                                    native.playSoundFrontend(-1, "Door_Open_Limit", "DLC_SM_Hangar_Door_Sounds", 1)
                                    let out = alt.setInterval(()=>{
                                        alt.clearInterval(out)
                                        native.setEntityCoords(veh, -1933.367, 3112.114, 32.810, 0,0,0,1)
                                        native.setEntityHeading(veh, 140)
                                        native.setPedIntoVehicle(alt.Player.local.scriptID, veh, -1)
                                        //native.doScreenFadeIn(3000)
                                        native.freezeEntityPosition(alt.Player.local.vehicle.scriptID, false)
                                        native.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, true, false, false)
                                        alt.emitServer('hangarout')
                                        alt.emit('fakemap', false, -1266.70, -2965.12)
                                        let data = alt.Player.local.vehicle.getSyncedMeta('owner');
                                        slotpos[data.slot].plane = null;
                                        for(let i in hangarslot) {
                                            if(hangarslot[i].slot == data.slot) {
                                                hangarslot[i].model = 'Empty'
                                                hangarslot[i].data = null
                                                alt.emitServer('updatedata', 'accounts', 'hangarslot', hangarslot, false)
                                            }
                                        }
                                        for(let i in aircraft) {
                                            if(aircraft[i].data.id == data.data.id) {
                                                aircraft[i].slot = false
                                                alt.emitServer('updatedata', 'accounts', 'aircrafts', aircraft, false)
                                            }
                                        }
                                        hangarout()
                                    }, 2000)
                            }
                        }
                        })
                    } else {
                        if(planemod == true) {
                            planemod = false;
                        }
                    }
                    if(dist1 < 2) {
                        alt.clearInterval(intcount)
                        native.doScreenFadeOut(1000);   
                        native.playSoundFrontend(-1, "Door_Open_Limit", "DLC_SM_Hangar_Door_Sounds", 1)
                        let out = alt.setInterval(()=>{
                            alt.clearInterval(out);
                            native.setEntityCoords(alt.Player.local.scriptID, -1921.761962890625,  3131.2978515625, 32.810298919677734, 0,0,0,1);
                            native.setEntityHeading(alt.Player.local.scriptID, 164)
                            alt.emitServer('hangarout')
                            hangarout()
                        },2000)                 
                    }
                    if(dist2 < 2) {
                        native.placeObjectOnGroundProperly(chair);
                        if(seat == false) {
                            seat = true;
                            handletext('~INPUT_PICKUP~ Open Hangar Business menu')
                        }
                    } else {
                        sit = false
                        seat = false
                    }
                }, 1000)
                
            }, 3000)
}

function hangarplanes() {
       // for(let i in hangarslot) {
         //   if(hangarslot[i].model == 'Empty') { } else {
         //       alt.emitServer('hangarplanes', hangarslot[i].data, hangarslot[i].pos, hangarslot[i].slot)
         //   } 
       // }
        for(let i in aircraft) {
            if(aircraft[i].slot == null) {} else {
                let slot = aircraft[i].slot
                alt.emitServer('hangarplanes', aircraft[i].data, slotpos[slot].pos, aircraft[i].slot)
            }
        }
}

function hangarout() {
   // native.doScreenFadeOut(1000);
   
   alt.emit('fakemap', false, -1266.70, -2965.12)
    let out = alt.setInterval(()=>{
        alt.clearInterval(out);
        for(let i in hangarinterior.interiorsProps) {
            native.deactivateInteriorEntitySet(hangarinterior.interior, hangarinterior.interiorsProps[i])
        }
        native.deactivateInteriorEntitySet(hangarinterior.interior, hangarinterior.floor)
        native.removeIpl("sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_")
        native.deleteObject(chair);
        native.doScreenFadeIn(3000)
        let recount = alt.setInterval(()=>{
            alt.clearInterval(recount)
            alt.emitServer('outroom')
            hangarinside = false;
          //  hangarcount()
        }, 5000)
    }, 2000)
}

