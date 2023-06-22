import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from './NativeUI/NativeUi.js';
import { drawtext, handletext } from './client.js';

const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    TitleScale: 0.8,
    TitleFont: 4,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
    Color: new NativeUI.Color(116,155,205,255),
}

const slots = [
    {name: 'slot1', type : 8, pos : { x: -1256.71,  y: -3035.50, z: -47.95, h : 357.68 }},
    {name: 'slot2', type : 8, pos : {x: -1277.005,  y: -3035.008, z: -47.95, h : 357.68 }},
    {name: 'slot3', type : 8, pos : {x: -1267.17, y: -3023.66,  z: -47.95, h : 358.74}},
    {name: 'slot4', type : 8, pos : { x: -1252.428,  y: -3022.70, z: -47.95, h : 38.25 }},
    {name: 'slot5', type : 8, pos : { x: -1281.84, y: -3021.79,  z: -47.94, h : 323.43 }},
    {name: 'slot6', type : 8, pos :  { x: -1267.18,  y: -3008.13,  z: -47.648, h : 359.72 }} , 
    {name: 'slot7', type : 25, pos  : { x: -1273.8217,   y: -2990.8496,   z: -46.76025, h:25.1252 }}, //large slot
    {name: 'slot8', type : 8, pos  : { x: -1280.009,   y: -2996.457,  z: -48.333, h : 338.248}}  ,
    {name: 'slot9', type : 8, pos  : { x: -1254.859,  y: -2996.968,  z: -48.333 , h : 24.474}} ,
    {name: 'slot10', type : 8, pos  : { x: -1266.718,  y: -2984.618, z: -48.333, h : 359.622} },
    {name: 'slot11', type : 8, pos  : { x: -1276.289,  y: -2970.47,  z: -48.333, h : 334.930} },
    {name: 'slot12', type : 8, pos  : { x: -1257.98,   y: -2972.702, z: -48.333, h : 25.450 } }
]

const slotpos = {
    slot1 : { x: -1256.71,  y: -3035.50, z: -47.95, h : 357.68 } ,
    slot2 : {x: -1277.005,  y: -3035.008, z: -47.95, h : 357.68 } ,
    slot3 : {x: -1267.17, y: -3023.66,  z: -47.95, h : 358.74},
    slot4 : { x: -1252.428,  y: -3022.70, z: -47.95, h : 38.25 } ,
    slot5 : { x: -1281.84, y: -3021.79,  z: -47.94, h : 323.43 } ,
    slot6 :  { x: -1267.18,  y: -3008.13,  z: -47.648, h : 359.72 } , 
    slot7 : { x: -1273.8217,   y: -2990.8496,   z: -46.76025, h:25.1252 }, //large slot
    slot8 : { x: -1280.009,   y: -2996.457,  z: -48.333, h : 338.248}  ,
    slot9 : { x: -1254.859,  y: -2996.968,  z: -48.333 , h : 24.474} ,
    slot10 : { x: -1266.718,  y: -2984.618, z: -48.333, h : 359.622} ,
    slot11 : { x: -1276.289,  y: -2970.47,  z: -48.333, H : 334.930} ,
    slot12 : { x: -1257.98,   y: -2972.702, z: -48.333, h : 25.450 } 
}

const propcrate = {
    aircrate : { model: 'prop_drop_armscrate_01', hash: -1319782883},
    landcrate : { model: 'prop_drop_armscrate_02', hash: 1877891248}
}

const hangarspawn = {x:-1933.367, y:3112.114, z:32.810}

let slotsdata, planesdata, hangarplanesdata, cargobob = 0, titan = 0, militaryplane = 0

let chosenplane, mark = 0, markpos, markscale = null, planepos = null, job = false, cooldown = false, escort = false

let dooropen = false, box, carrybox = false, crateload = 0, cargodoor = false, dropready = false, dropcrate = 0
let dropaudoname = "Drop_Package", dropaudioref = "DLC_Exec_Air_Drop_Sounds", dropzone = [], crates =[]
let missionped = [], missionveh = [], missionblips = [], escortplane, escortpilot, helichase = 0

function openhangarmenu(hangarplanes, planedata, slotdata ) {
    chosenplane = null
const hangarmenu = new NativeUI.Menu("", 'SELECT AREA', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
hangarmenu.Visible = false;
hangarmenu.GetTitle().Scale = MenuSettings.TitleScale,
hangarmenu.GetTitle().Font = MenuSettings.TitleFont;
hangarmenu.GetTitle().DropShadow = MenuSettings.DropShadow;
hangarmenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;

let floor = new NativeUI.Menu("", 'SELECT AIRCRAFT', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
let storage = new NativeUI.Menu("", 'SELECT AIRCRAFT', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
hangarmenu.AddSubMenu(floor, new NativeUI.UIMenuItem("Floor", "Select to view aircraft in area", ""));
hangarmenu.AddSubMenu(storage, new NativeUI.UIMenuItem("Storage", "Select to view aircraft in storage", ""));

let planelist = []
let planeslot = []

for(let i in slotdata) {
    if(slotdata[i].slot == null) {} else {
        planeslot.push(slotdata[i])
    }
}
for(let i in planedata) {
    if(planedata[i].slot == null) {
        if(planedata[i].data == null) {} else {
            planelist.push(planedata[i].data)
        }
    } 
}
planeslot.forEach(element =>{
    let slotitem = new NativeUI.UIMenuItem(element.model, "Press 'Enter' to move the aircraft")
    floor.AddItem(slotitem)
})

planelist.forEach(element => {
    let storeitem = new NativeUI.UIMenuItem(element.display, "Press 'Enter' to select the aircraft")
    storage.AddItem(storeitem)   
})

hangarmenu.Open()

floor.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < planeslot.length) {
        let slot = planeslot[selectedItemIndex];
        let pos = slot.pos
        chosenplane = slot.plane

        if(slot.model == 'Empty') {} else {
       // for(let i in hangarplanes) {
          //  let pdata = hangarplanes[i].getSyncedMeta('vehdata');
           // if(pdata.slot == slot.slot) {
            //    chosenplane = hangarplanes[i]
                planepos = pos
                
                hangarmenu.Close(true);
                if(slot.data.seat > 6) {
                    markpos = slots[6].pos
                    markscale = slots[6].type
                    hangarslot(slot.slot, slot.data, 'large', slotdata)
                } else {
                    markpos = slots[0].pos
                    markscale = slots[0].type
                    hangarslot(slot.slot, slot.data, 'small', slotdata)
                }
                
                if(mark == 0) {
                    slotmarker()
                }
         //   }
        }
    }
})

storage.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < planelist.length) {
        let plane = planelist[selectedItemIndex];
        planepos = null;
        if(plane.seat > 6) {
            markpos = slots[6].pos
            markscale = slots[6].type
            //slotname = slots[slot].name
            if(mark == 0) {
                slotmarker()
            }
            hangarmenu.Close(true);
            hangarslot(null, plane, 'large', slotdata)
        } else {
            hangarmenu.Close(true);
            markpos = slots[0].pos
            markscale = slots[0].type
            hangarslot(null, plane, 'small', slotdata)
        }
        
    }
})
}

function hangarslot(cslot, data, type, hangarplanes) {
    let slotmenu = new NativeUI.Menu("", data.display, MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
    slotmenu.Visible = false;
    let slotname, slot

    let slotitem = new NativeUI.UIMenuAutoListItem('Select slot :', "Select the new slot for the aircraft", 1, 12, 1, slotpos);
    let slotLitem = new NativeUI.UIMenuItem('Select slot :', "Select the new slot for the aircraft", slotpos);
    slotLitem.RightLabel = '(Large Slot)'
    let choseslot = new NativeUI.UIMenuItem('Move aircraft', "Move the choosen aircraft to this slot", "")
    let cancel = new NativeUI.UIMenuItem('Cancel', "", "")
    if(type == 'small') {
        slotmenu.AddItem(slotitem);
    } else {
        slotmenu.AddItem(slotLitem);
        slotname = 'slot7'

    }
    slotmenu.AddItem(choseslot);
    slotmenu.AddItem(cancel);

    slotmenu.Open()

    slotmenu.AutoListChange.on((selectedItem, selectedItemIndex) =>{
        slot = slotitem.SelectedValue;
        markpos = slots[slot-1].pos
        markscale = slots[slot-1].type
        slotname = slots[slot-1].name
        if(mark == 0) {
            slotmarker()
        }

    })
    slotmenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Move aircraft") {
            let vdata = {
                model : "",
                data : {
                    display : "",
                }
            }
            if(type == 'large') {
                removeslot('slot4')
                removeslot('slot5')
                removeslot('slot6')
                removeslot('slot7')
                removeslot('slot8')
                removeslot('slot9')
                removeslot('slot10')
                removeslot('slot11')
                removeslot('slot12')

                alt.emitServer('hangarplanes', data, slots[6].pos, 'slot7')
                
            } else {
                if(cslot == slotname) {} else {
                   // for(let i in hangarplanes) {
                       // if(hangarplanes[i]) {
                            
                            if(hangarplanes[slotname].plane == null) {} else {
                                let pdata = hangarplanes[slotname].plane.getSyncedMeta('owner');
                                alt.emit('changehangarslot', slotname, slotname, pdata, null)
                                alt.emitServerRaw('removeplanes', hangarplanes[slotname].plane)
                               // hangarplanesdata[slotname].plane = null
                                
                        //    }
                      //  }

                    }
                    if(slotname == 'slot6' || slotname == 'slot8' || slotname == 'slot9' || slotname == 'slot10' || slotname == 'slot11' || slotname == 'slot12') {
                        if(hangarplanes.slot7.plane == null) {} else {
                            let pdata = hangarplanes.slot7.plane.getSyncedMeta('owner');
                            alt.emit('changehangarslot', 'slot7', 'slot7', pdata, null)
                            alt.emitServerRaw('removeplanes', hangarplanes.slot7.plane)
                            //hangarplanes.slot7.plane == null
                           }
                    }
                    if(chosenplane == null) {
                        alt.emitServer('hangarplanes', data, markpos, slotname)

                    } else {
                        alt.emitServerRaw('removeplanes', chosenplane)
                        alt.emitServer('hangarplanes', data, markpos, slotname)
                        alt.emit('changehangarslot', cslot, cslot, vdata, null)
                    }
            }
             
            }
            if(mark > 0) {
                alt.clearEveryTick(mark);
                mark = 0;
                planepos = null;
            }
            slotmenu.Close();

        }
        if(item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
            if(mark > 0) {
                alt.clearEveryTick(mark);
                mark = 0;
            }
            slotmenu.Close();

        }
    })
}

export function hangarslotmenu(slot, planes, aircrafts) {

    slotsdata = slot
    planesdata = planes
    hangarplanesdata = aircrafts
    openhangarmenu(slot, planes, aircrafts)
}

function slotmarker() {
    mark = alt.everyTick(()=>{
        if(planepos == null) {} else {
            native.drawMarker(2, planepos.x,planepos.y,planepos.z+6, 0,0,0,180,0,0, 2.2,2.2,2, 55,155,225,100,true,0,0,0,0,0,0);
        }
        if(markpos == null) {} else {
            native.drawMarker(1, markpos.x, markpos.y, markpos.z-2, 0,0,0,0,0,0, markscale, markscale, 5,55,155,225,125,0,0,2,0,0,0,0)
        }
        
    })
}

function removeslot(slot) {
    if(hangarplanesdata[slot].plane == null) {} else {
        let pdata = hangarplanesdata[slot].plane.getSyncedMeta('owner');
        alt.emit('changehangarslot', slot, slot, pdata, null)
        alt.emitServerRaw('removeplanes', hangarplanesdata[slot].plane)
       // hangarplanesdata[slot].plane == null
       }
}

const hoffice = new NativeUI.Menu("", 'HANGAR BUSINESS', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
hoffice.Visible = false;
hoffice.CloseableByUser = false;
hoffice.AddItem(new NativeUI.UIMenuItem('~b~Categories', ""))
hoffice.AddItem(new NativeUI.UIMenuItem('Military Transport', "Purchase Cargobob to unlock this job"))
hoffice.AddItem(new NativeUI.UIMenuItem('Cargo Transport', "Purchase Titan to unlock this job"))
hoffice.AddItem(new NativeUI.UIMenuItem('Escort Airplane', "Purchase any weaponized aircraft to unlock this job"))
//hoffice.AddItem(new NativeUI.UIMenuItem('Military Task', "Purchase any weaponized aircraft to unlock this job"))
hoffice.AddItem(new NativeUI.UIMenuItem('Close', ""))


hoffice.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Close") {
        hoffice.Close();
        native.clearPedTasks(alt.Player.local.scriptID)
    }
    
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Military Transport") {
        if(cargobob == 1) {
                hoffice.Close();
                native.clearPedTasks(alt.Player.local.scriptID)
                if(job == false) {
                    alt.emitServer('hangarjob', 'cargobobjob')
                ///miltransport()
                } else {

                }
            } else {
                alt.log('job start fail, no cargobob found')
                alt.emit('notif','Cargobob not available')
            }
        }  
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cargo Transport") {
            if(titan == 1) {
                    hoffice.Close();
                    native.clearPedTasks(alt.Player.local.scriptID)
                    if(job == false) {
                        alt.emitServer('hangarjob', 'titanjob')
                    } else {
                    }
                } else {
                    alt.log('job start fail, no titan found')
                  alt.emit('notif','Titan not available')
                }
    }  
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Escort Airplane") {
        if(militaryplane == 1) {
                hoffice.Close();
                native.clearPedTasks(alt.Player.local.scriptID)
                if(job == false) {
                    alt.emitServer('hangarjob', 'escortjob')
                } else {
                }
            } else {
                alt.log('job start fail, no weaponize aircraft found')
                alt.emit('notif','No weaponized aircraft found')
            }
}  
})

alt.on('hangaroffice', (data)=>{
    if(job == false) {
        planesdata = data
        for(let i in data) {
            if(data[i].data.model == 'cargobob') {
                cargobob = 1
            }
            if(data[i].data.model == 'titan') {
                titan = 1
            }
            if(data[i].data.type == 'MILITARY') {
                militaryplane = 1
            }
        }
        if(hoffice.Visible) {} else {
            hoffice.Open()
        }
    } else {
        alt.log('job not available')
        handletext('Job not available right now')
    }
   
})

alt.onServer('escortjobnotif', (player)=>{
    escortpilot = player
})

function pegasmenu(data, pos) {
const pegasusmenu = new NativeUI.Menu("", 'SELECT AIRCRAFT', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
pegasusmenu.Visible = false;

let planelist = []
for(let i in data) {
        planelist.push(data[i].data)
    
}

planelist.forEach(element =>{
    let listitem = new NativeUI.UIMenuItem(element.display, "", planelist);
    pegasusmenu.AddItem(listitem)
})
pegasusmenu.Open()

pegasusmenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < planelist.length) {
        let plane = planelist[selectedItemIndex];
        
        pegasusmenu.Close()
        native.doScreenFadeOut(1000);
        let spawn = alt.setInterval(()=>{
            alt.clearInterval(spawn);
            alt.emitServer('hangarplanes', plane, pos, null)
            native.doScreenFadeIn(3000)
        }, 2000)
    }
})

}

alt.on('keydown', (key) => {
    if(key == 'E'.charCodeAt(0)){
        if(dooropen == true && job == true && crateload < 5) {
            let bone = native.getPedBoneIndex(alt.Player.local.scriptID, 0x60f2);
            native.taskPlayAnim(alt.Player.local.scriptID, "xm3_drg2_pln_mcs1-3", "prop_box_wood04a^1-3", 8.0, 1, -1, 49, 1, false, false, false)
            native.taskPlayAnim(alt.Player.local.scriptID, "anim@heists@box_carry@", "walk", 8.0, 1, -1, 49, 1, false, false, false)
            native.attachEntityToEntity(box, alt.Player.local.scriptID, bone, -0.1,0.31,0,0,90,180, false, false, false, true, 1, true, 0 );
            carrybox = true
        }
        if(cargodoor == true && job == true) {
            cargodoor = false
            native.setVehicleDoorOpen(alt.Player.local.vehicle, 5, false, false)
        } if(dooropen == true && job == true) {
            if(alt.Player.local.vehicle) {
                native.setVehicleDoorShut(alt.Player.local.vehicle, 5, false)
            }
        }

    }
})

alt.on('keydown', (keycode) => {
    if(keycode == 32){
        if(dropready == true && job == true) {
            //let pos = native.getEntityCoords(alt.Player.local.vehicle, false)
            let offset = native.getOffsetFromEntityInWorldCoords(alt.Player.local.vehicle, 0.0, -4.0, -0.6)
            dropcrate = native.createObjectNoOffset(propcrate.aircrate.hash, offset.x, offset.y, offset.z, 1,0,0)
            crates.push(dropcrate)
            native.setEntityCollision(dropcrate, false, true)
            //native.freezeEntityPosition(dropcrate, true)
            //native.setEntityHasGravity(dropcrate, true)
            native.playSoundFromEntity(-1, dropaudoname, alt.Player.local.vehicle, dropaudioref, true, 1)
        }
    }
})


alt.on('pegasusmenu', pegasmenu)

alt.onServer('hangarjobready', (type, ready)=>{
    if(ready == true) {
        starthangarjob(type)
    } else {
        handletext('Job not available right now')
    }
})

function starthangarjob(type) {
    if(type == 'cargobobjob') {
        miltransport()
    } else if(type == 'titanjob') {
        titanjob()
    } else if(type == 'escortjob') {
        escortjob()
    }
}

function miltransport() {
job = true;
alt.emitServer('hangarjobstart', 'cargobobjob')
const destpos = [
    { x: 3630.990966796875,  y: 3762.917724609375, z: 28.515714645385742, h : 126.8276596069336, pay: 30000, rp: 250 },
    { x: 2444.6181640625,   y: -367.1756896972656,  z: 93.32929229736328 , h :  241.58023071289062, pay: 30000, rp: 250 },
    { x: 487.8796081542969,  y: -3308.025634765625, z: 6.3371171951293945 , h : 180.22238159179688, pay: 40000, rp: 270 }

]
    let hook = false, tank = false, vblip = 0
    let target = destpos[native.getRandomIntInRange(0, destpos.length-1)]

    jobnotif('CARGO TRANSPORT', '~y~Transport a Military Vehicle', "Event_Start_Text", "GTAO_FM_Events_Soundset")
    alt.emitServer('zancudoveh', 'rhino',  {x: -2174.582,y: 3198.026, z: 34.6757, h: 150.80197 } )
    let sub = alt.setInterval(()=>{
        alt.clearInterval(sub)
        let veh = alt.Player.local.getSyncedMeta('pegasusveh')
        alt.emit('jobstart', 'Take a Cargobob to start the job')
        alt.setMeta('mission', 'cargobob')
        let vpos = native.getEntityCoords(veh, false)
            let time = alt.setInterval(()=>{
                if(vblip == 0) {
                    vblip = native.addBlipForEntity(veh);
                    native.setBlipSprite(vblip, 421)
                    native.setBlipColour(vblip, 3)
                }
                if(alt.Player.local.vehicle) {
                    let cgb = native.getEntityModel(alt.Player.local.vehicle);
                    if(cgb == alt.hash('cargobob')) {
                        if(hook == false) {
                            alt.emit('jobstart', 'Hook the ~b~tank')
                            alt.emit('marker2', 2, vpos.x, vpos.y, vpos.z+2,3,3,2,5,10,195,100,1)
                            hook = true;
                        }
                            let hooked = native.isVehicleAttachedToCargobob(alt.Player.local.vehicle, veh);
                            if(hooked == true) {
                                alt.clearInterval(time);
                                alt.emit('marker2', 2, vpos.x, vpos.y, vpos.z+2,3,3,2,5,10,195,0,0)
                                alt.emit('jobstart', 'Deliver the ~b~tank ~w~to ~y~destination')
                                let pos3 = native.addBlipForCoord( target.x, target.y, target.z)
                                native.setBlipAsShortRange(pos3, false)
                                let time1 = alt.setInterval(()=>{
                                    let pos = native.getEntityCoords(veh, false)
                                    let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, target.x, target.y, target.z, true)
                                    if(dist < 50) {
                                        alt.emit('marker', 1, target.x, target.y, target.z-1,5,5,3,155,155,55,100)
                                    }
                                    if(dist <= 4) {
                                        alt.clearInterval(time1);
                                        alt.emit('jobstart', '')
                                        native.removeBlip(pos3)
                                        native.removeBlip(vblip);
                                        alt.emit('marker', 1, target.x, target.y, target.z-1,3,3,3,155,155,55,0)
                                       jobnotif( 'JOB COMPLETE', 'Tank delivered, $ '+target.pay+' & RP '+target.rp, "package_delivered_success", "DLC_GR_Generic_Mission_Sounds")
                                       alt.emitServer('jobfinish', target.pay, target.rp)
                                       hook = false;
                                       jobcooldown('cargobobjob')
                                    }
                                    let engine = native.getVehicleEngineHealth(veh);
                                    if(engine <= -1000) {
                                        alt.clearInterval(time1);
                                        alt.emit('jobstart', '')
                                        native.removeBlip(pos3)
                                        native.removeBlip(vblip);
                                        alt.emit('marker', 1, target.x, target.y, target.z-1,3,3,3,155,155,55,0)
                                       jobnotif( 'JOB FAILED', 'Tank Destroyed!', "ScreenFlash", "MissionFailedSounds")
                                       alt.emitServer('jobfinish', 0, 30)
                                       hook = false;
                                       jobcooldown('cargobobjob')
                                    }
                                }, 1000)
                        } else {
                            handletext('~INPUT_PICKUP~ to deploy the hook')
                        }
 
                    }
            }
            }, 1000)

    }, 5000)

}

function titanjob() {
    
    let effect = "core"
    let money = 0, rp = 0, jobplane, count = 0, chase = false
    crates = []
    let planepos =  {  x: -2193.57, y: 3161.3125, z: 33.65, h : 150.518 } 
    let cratemodel = propcrate.landcrate.hash, hook = false, dropped = 0, flare = 0
    let targetpos = [
        { id: 1,  x: -1154.7457275390625,  y: 4923.79248046875, z: 222.00399780273438,  pay: 30000, rp: 250 },
        { id: 2, x: 1457.439208984375,    y: 1111.0264892578125, z: 114.33392333984375 , pay: 30000, rp: 250 },
        { id: 3,  x: 3805.619384765625,   y: 4461.04638671875,   z: 4.519468784332275 , pay: 40000, rp: 270 },
        { id: 4,  x: -355.2249450683594,  y: -94.3096923828125, z: 45.66229248046875 , pay: 40000, rp: 270 },
        { id: 5,   x: -517.2386474609375, y: -1715.2178955078125, z: 19.319683074951172 , pay: 40000, rp: 270 },

    ]
    let cratepos = [
        { x: -2190.376708984375, y: 3181.197021484375, z: 32.81016159057617},
        { x: -2190.376708984375+0.5, y: 3181.197021484375, z: 32.81016159057617},
        { x: -2190.376708984375, y: 3181.197021484375+0.5, z: 32.81016159057617},
        { x: -2190.376708984375-0.5, y: 3181.197021484375, z: 32.81016159057617},
        { x: -2190.376708984375, y: 3181.197021484375-0.5, z: 32.81016159057617},
    ]
    let tblips = [], crateblips = [], dropzone = []

    native.requestModel(cratemodel)
    job = true;
    
    jobnotif('CARGO TRANSPORT', '~y~Airplane Cargo Delivery', "Event_Start_Text", "GTAO_FM_Events_Soundset")
    let sub = alt.setInterval(()=>{
        alt.clearInterval(sub)
        alt.emit('jobstart', 'Take a Titan to start the job')
        alt.setMeta('mission', 'titan')
        let time = alt.setInterval(()=>{
            
            if(tblips.length < 1) {
                let tblip = native.addBlipForRadius(planepos.x, planepos.y, planepos.z, 60);
                tblips.push(tblip)
                native.setBlipColour(tblip, 3); 
                native.setBlipAlpha(tblip, 180) 
                
            }
            if(alt.Player.local.vehicle) {
                let pos
                let cgb = native.getEntityModel(alt.Player.local.vehicle);
                if(cgb == alt.hash('titan')) {
                    pos = alt.Player.local.vehicle.pos
                    if(hook == false) {
                        hook = true
                        jobplane = alt.Player.local.vehicle.scriptID
                        alt.emit('jobstart', 'Taxi the plane to the ~b~Blue area')

                    }                
                }
                let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, planepos.x, planepos.y, planepos.z, true);
                if(dist < 50) {
                    if(crates.length < 5) {
                        alt.emit('marker',1, planepos.x, planepos.y, planepos.z-1,20,20,5,55,155,185,120)
                        for(let i in cratepos) {
                            let crate = native.createObjectNoOffset(cratemodel, cratepos[i].x, cratepos[i].y, cratepos[i].z, 1,0,0)
                            crates.push(crate)
                            native.setEntityHeading(crate, 90)
                            native.placeObjectOnGroundProperly(crate)
                        }
                        
                    } else {
                        native.setModelAsNoLongerNeeded(cratemodel)
                    }   
                }
                if(dist < 5) {
                    alt.clearInterval(time);
                    for(let i in tblips) {
                        native.removeBlip(tblips[i]);
                    }
                    alt.emit('marker',1, planepos.x, planepos.y, planepos.z-1,20,20,5,55,155,185,0)
                    alt.emit('jobstart', 'Open plane cargo door')
                    handletext('~INPUT_PICKUP~ to open cargo door')
                    alt.emitServer('escortplaneset')
                    cargodoor = true
                    let door = alt.setInterval(()=>{
                        let open = native.getVehicleDoorAngleRatio(alt.Player.local.vehicle, 5)
                        if(open >= 0.8) {
                            alt.clearInterval(door);
                            let target = native.getOffsetFromEntityInWorldCoords(alt.Player.local.vehicle, 0.0, -4.0, -0.1)
                            dooropen = true;
                            alt.emit('marker2', 2, cratepos[0].x, cratepos[0].y, cratepos[0].z+1,1,1,1,5,10,195,100,1)
                            alt.emit('jobstart', 'Load the ~b~crates ~w~to the plane')
                            
                            
                            for(let i in crates) {
                                if(crates[i]) {
                                    let cblip = native.addBlipForEntity(crates[i])
                                    crateblips[crates[i]] = cblip
                                    //crateblips.push(cblip)
                                    native.setBlipSprite(cblip, 568);
                                    native.setBlipColour(cblip, 3)
                                }
                            }
     
                            //native.requestAnimDict("anim@narcotics@trash")
                            native.requestAnimDict("anim@heists@box_carry@")
                            //native.requestAnimDict("xm3_drg2_pln_mcs1-3")
                            let load = alt.setInterval(()=>{
                                let pos = alt.Player.local.pos
                                box = native.getClosestObjectOfType(pos.x, pos.y, pos.z, 1, cratemodel, false, false, false)
                                let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, target.x, target.y, target.z, true);
                                if(box) {
                                    if(carrybox == false) {
                                        if(dist > 3) {
                                            handletext('~INPUT_PICKUP~ to pickup the crate')
                                        }
                                    } 
                                }
                                if(carrybox == true) {
                                    alt.emit('marker',1, target.x, target.y, target.z-1,3,3,2,155,155,55,100)
                                        if(dist <= 2) {
                                            carrybox = false
                                            crateload += 1
                                            if(crateblips[box]) {
                                                native.removeBlip(crateblips[box])
                                            }
                                            //alt.clearInterval(count)
                                            //native.taskPlayAnim(alt.Player.local.scriptID, "anim@narcotics@trash","drop_front" , 8.0, 1, -1, 49, 1, false, false, false)
                                            native.detachEntity(box, true, true)
                                            native.clearPedTasks(alt.Player.local.scriptID);
       
                                        }
                                    } else {
                                        alt.emit('marker',1, target.x, target.y, target.z-1,3,3,2,155,155,55,0)
                                    }
                               // native.taskPlayAnim(alt.Player.local.scriptID, "xm3_drg2_pln_mcs1-3", "prop_box_wood04a^1-3", 8.0, 1, -1, 49, 1, false, false, false)
                                
                               // native.taskPlayAnim(alt.Player.local.scriptID, "anim@heists@box_carry@", "walk", 8.0, 1, -1, 49, 1, false, false, false)
                               // native.attachEntityToEntity(box, alt.Player.local.scriptID, bone, -0.1,0.31,0,0,90,180, false, false, false, true, 1, true, 0 );
                               if(crateload >= 5) {
                                alt.emit('marker',1, target.x, target.y, target.z-1,3,3,2,155,155,55,0)
                                alt.emit('marker2', 2, cratepos[0].x, cratepos[0].y, cratepos[0].z+1,1,1,1,5,10,195,100,0)
                                alt.emit('jobstart', 'Close the plane cargo door')
                                
                                if(alt.Player.local.vehicle) {
                                    let cgb = native.getEntityModel(alt.Player.local.vehicle);
                                    if(cgb == alt.hash('titan')) {
                                    handletext('~INPUT_PICKUP~ to close the cargo door')
                                    let open = native.getVehicleDoorAngleRatio(alt.Player.local.vehicle, 5)
                                    if(open < 0.1) {
                                        alt.clearInterval(load)
                                        dooropen = false;
                                        tblips = []
                                        crateblips = []
                                        alt.emitServer('titanjobwarn')
                                        for(let i in crates) {
                                            if(crates[i]) {
                                                native.deleteObject(crates[i])
                                            }
                                        }
                                        alt.emit('jobstart', 'Deliver ~b~crates ~w~to the ~y~destination')
                                        for(let i in targetpos) {
                                            let dropblip = native.addBlipForCoord(targetpos[i].x, targetpos[i].y, targetpos[i].z);
                                            tblips[targetpos[i].id] = dropblip
                                        }
                                        alt.emit('timerbar', 1,["", "Crates Delivered : 0 / 3", 140], ["", "", 0], ["", "", 0])
                                        native.requestPtfxAsset();
                                        native.requestNamedPtfxAsset(effect)
                                        native.requestModel(propcrate.aircrate.hash)
                                        
                                        let send = alt.setInterval(()=>{
                                            let pos = alt.Player.local.pos;
                                            for(let i in targetpos) {
                                            let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, targetpos[i].x, targetpos[i].y, targetpos[i].z, false);
                                            if(dist <= 1000) {
                                                if(!crateblips[targetpos[i].id]) {
                                                    dropcrate = 0
                                                    let droparea = native.addBlipForRadius(targetpos[i].x, targetpos[i].y, targetpos[i].z, 100)
                                                    crateblips[targetpos[i].id] = droparea
                                                    native.setBlipColour(droparea, 5)
                                                    native.setBlipAlpha(droparea, 110)
                                                    native.useParticleFxAsset(effect)
                                                    let smoke = native.startParticleFxLoopedAtCoord("exp_grd_flare", targetpos[i].x, targetpos[i].y, targetpos[i].z, 0, 0.0, 0.0, 10, 1, 1, 1, false)
                                                    dropzone.push(smoke)
                                                    native.setParticleFxLoopedColour(smoke, 155,55,85,0)
                                                    native.setParticleFxLoopedAlpha(smoke, 100)
                                                }
                                                if(flare == 0) {
                                                    flare = 1
                                                }    
                                            }
                                            if(dist < 100) {
                                                if(dropcrate == 0 && dropready == false) {
                                                    //alt.emit('jobstart', 'Drop the crates')
                                                    dropready = true
                                                    handletext('~INPUT_CELLPHONE_EXTRA_OPTION~ to drop the crate')
                                                    native.removeBlip(tblips[targetpos[i].id])
                                                    native.removeBlip(crateblips[targetpos[i].id])
                                                }
                                            }
                                            if(dropcrate > 0) {
                                                    if(dropready == true) {
                                                        dropready = false
                                                        dropped += 1
                                                        flare = 0
                                                        money += 25000
                                                        rp += 80
                                                        
                                                        alt.emit('timerbar', 1,["", "Crates Delivered : "+dropped+" / 3", 140], ["", "", 0], ["", "", 0])
                                                    } 
                                            }
                                            
                                        }
                                        if(dropped == 5) {
                                            alt.clearInterval(send);
                                            alt.emit('jobstart', '')
                                            alt.emit('timerbar', 0,["","", 0], ["", "", 0], ["", "", 0])
                                            jobnotif( 'JOB COMPLETE', 'Crates delivered, ~w~$ '+money+' & RP '+rp, "package_delivered_success", "DLC_GR_Generic_Mission_Sounds")
                                            alt.emitServer('jobfinish', money, rp)
                                            for(let i in dropzone) {
                                                native.stopParticleFxLooped(dropzone[i], 0);
                                            }
                                            
                                            native.removePtfxAsset()
                                            native.removeNamedPtfxAsset(effect)
                                            native.setModelAsNoLongerNeeded(propcrate.aircrate.hash)
                                            alt.deleteMeta('mission')
                                            jobcooldown('titanjob', true)
                                            for(let i in crates) {
                                                if(crates[i]) {
                                                    native.deleteObject(crates[i])
                                                }
                                            }
                                        }
                                        let engine = native.getVehicleEngineHealth(alt.Player.local.vehicle)
                                        if(engine < -3500) {
                                            alt.clearInterval(send);
                                            alt.emit('jobstart', '')
                                            alt.emit('timerbar', 0,["","", 0], ["", "", 0], ["", "", 0])
                                            jobnotif( 'JOB FAILED', 'Crates Destroyed!, ~w~$ '+money+' & RP '+rp, "ScreenFlash", "MissionFailedSounds")
                                            alt.emitServer('jobfinish', money, rp)
                                            for(let i in dropzone) {
                                                native.stopParticleFxLooped(dropzone[i], 0);
                                            }
                                            
                                            native.removePtfxAsset()
                                            native.removeNamedPtfxAsset(effect)
                                            native.setModelAsNoLongerNeeded(propcrate.aircrate.hash)
                                            alt.deleteMeta('mission')
                                            jobcooldown('titanjob', false)
                                            for(let i in crates) {
                                                if(crates[i]) {
                                                    native.deleteObject(crates[i])
                                                }
                                            }
                                        }

                                        if(count >= 30) {
                                            count = 30
                                            if(chase == false && helichase < 2) {
                                                chase = true
                                                let pos1 = native.getOffsetFromEntityInWorldCoords(alt.Player.local.vehicle, -15, -30.0, -0.6)
                                                let pos2 = native.getOffsetFromEntityInWorldCoords(alt.Player.local.vehicle, 15, -30.0, -0.6)
                                                alt.emitServer('hangarhelichase', pos1)
                                                alt.emitServer('hangarhelichase', pos2)
                                            }
                                           
                                        } else {
                                            count += 1
                                        }
                                        if(count == 30 && helichase == 0) {
                                            if(chase == true) {
                                                count = 0
                                                chase = false
                                            }
                                        }

                                        }, 1000)
                                    }
                                }}
                               }
                               
                            }, 1000)
                            
                        }
                    }, 1000)
                }
            }

            }, 1000)

    },5000)
    alt.setMeta('mission', 'titan')
 
}

function escortjob() {
let pilot = 0
let spawnpos = {x: -2920.0042, y: 3634.3474, z: 850.8103}, destination = {x:2175.050, y:-2479.1914,  z:650.98003}
job = true;
    
    jobnotif('AIRPLANE ESCORT', '~y~Defend the cargo airplane', "Event_Start_Text", "GTAO_FM_Events_Soundset")
    let sub = alt.setInterval(()=>{
        alt.clearInterval(sub)
        alt.emit('jobstart', 'Take a Weaponize Aircraft to start the job')
        alt.setMeta('mission', 'escort')
        alt.emitServer('escortplanestart')
        let time = alt.setInterval(()=>{
            let pos = alt.Player.local.pos
            let spawn = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, hangarspawn.x, hangarspawn.y, hangarspawn.z, true);
            if(spawn < 10) {
                alt.clearInterval(time)
                let esplane = alt.Player.local.getSyncedMeta('escortveh')
                native.setVehicleAllowHomingMissleLockon(alt.Player.local.vehicle, false, 0)
                alt.emit('jobstart', 'Rendezvous with the ~b~Titan')
                let pblip = native.addBlipForEntity(esplane)
                missionblips.push(pblip)
                native.setBlipSprite(pblip, 307);
                native.setBlipColour(pblip, 3)
                native.setBlipAsShortRange(pblip, false)

                let escort = alt.setInterval(()=>{
                    let pos = alt.Player.local.pos
                    if(esplane) {
                        escortplane = esplane;
                        let pos2 = native.getEntityCoords(esplane, false)
                        let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, pos2.x, pos2.y, pos2.z, true);
                        let engine = native.getVehicleEngineHealth(esplane);
                            if(engine <= 0) {
                                engine = 0
                            }
                        if(dist < 200) {
                            alt.emit('jobstart', 'Defend the ~b~Titan')
                            alt.emit('progressbar', true, engine, 1000)
                            alt.emit('timerbar', 1,["Titan :","", 0], ["", "", 0], ["", "", 0])
                        } else {
                            alt.emit('jobstart', 'You are too far from the ~b~Titan')
                        }

                        if(engine <= 0) {
                           // alt.clearInterval(escort);
                           // alt.emit('jobstart', '')
                            alt.emit('progressbar', false, "", "")
                            alt.emit('timerbar', 0,["","", 0], ["", "", 0], ["", "", 0])
                            //jobnotif( 'JOB FAILED', 'Titan Destroyed', "ScreenFlash", "MissionFailedSounds")
                            
                            //jobcooldown('escortjob')
                        }
                    }                     
                }, 1000)

                alt.onServer('escortjobfinish', (succes)=>{
                    alt.clearInterval(escort);
                    alt.emit('jobstart', '')
                    alt.emit('progressbar', false, 0, 1000)
                    alt.emit('timerbar', 0,["","", 0], ["", "", 0], ["", "", 0])
                    if(succes == true) {
                        jobnotif( 'JOB FINISH', 'Titan Escorted', "package_delivered_success", "DLC_GR_Generic_Mission_Sounds")
                        alt.emitServer('jobfinish', 35000, 280)
                    } else {
                        jobnotif( 'JOB FAILED', 'Titan Destroyed', "ScreenFlash", "MissionFailedSounds")
                        alt.emitServer('jobfinish', 5000, 80)
                    } 
                    jobcooldown('escortjob')
                })
            }

        }, 2000)
    }, 5000)

    
}

alt.onServer('setescortplane', (plane, pos)=>{
    alt.emit('jobstart', 'Rendezvous with the ~b~Titan')
    native.freezeEntityPosition(plane, true);
    native.setVehicleEngineOn(plane, true, true, false)
    let pblip = native.addBlipForEntity(plane);
    alt.log('escort',plane, pblip)
    missionblips.push(pblip)
    native.setBlipSprite(pblip, 307);
    native.setBlipColour(pblip, 3)
    
    
})

alt.onServer('setchaseheli', starthelichase)

function starthelichase(heli) {
    let create = alt.setInterval(()=>{
        alt.clearInterval(create)
    native.freezeEntityPosition(heli, true);
    native.setVehicleAllowHomingMissleLockonSynced(heli, false, false)
    native.setVehicleEngineOn(heli, true, true, false);
    let ped = native.createRandomPedAsDriver(heli, false)
    //let ped = native.createPedInsideVehicle(heli, 6, model, -1, false, false);
    missionped.push(ped);
    missionveh.push(heli)
    helichase += 1
    let hblip = native.addBlipForEntity(heli);
    missionblips.push(hblip)
    native.setBlipSprite(hblip, 353)
    native.setBlipHiddenOnLegend(hblip, true);

    let chase = alt.setInterval(()=>{
        alt.clearInterval(chase)
        native.freezeEntityPosition(heli, false);
        native.taskHeliChase(ped, escortplane,5.0,5.0,5)
        native.taskVehicleShootAtPed(ped, escortpilot, 1.0)
        native.setEntityIsTargetPriority(escortplane, true, 0)
    }, 300)
   
    let dead = alt.setInterval(()=>{
        let isbroke = native.isVehicleDriveable(heli, true);
            
        if(isbroke == false) {
            alt.clearInterval(dead);
            native.removeBlip(hblip)
            alt.emitServer('jobfinish', 0, 60)
            helichase -= 1

        }
        let isdead = native.isEntityDead(ped, false);
        if(isdead == true) {
            alt.clearInterval(dead);
            native.removeBlip(hblip);
            alt.emitServer('jobfinish', 0, 60)
            helichase -= 1
        }
    }, 1000)
    },300)
}


function jobnotif(text1, text2, audioname, audioref) {
    native.playSound(0, audioname, audioref, true, 0 ,false)
      let info = alt.everyTick(()=>{
        drawtext(text1,0.5,0.25,4,1.3,0.9,255,255,255,255);
        drawtext(text2,0.5,0.32,4,0.7,0.9,255, 255, 255,255);
      })
      let sinfo = alt.setInterval(()=>{
        alt.clearEveryTick(info);
        alt.clearInterval(sinfo);
      }, 5000);
    
}

function jobcooldown(job, success) {
    alt.deleteMeta('mission')
    alt.emitServer('hangarjobfinish', job, success)
    job = false
    for(let i in missionblips) {
        if(missionblips[i]) {
            native.removeBlip(missionblips[i])
        }
    }
    let cool = alt.setInterval(()=>{
        alt.clearInterval(cool);
        missionblips = []
        job = false
        //alt.emit('notif', '~b~Hangar Job ~w~now available')
    }, 60000*15)
}