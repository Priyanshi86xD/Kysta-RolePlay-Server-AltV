
import * as alt from 'alt-client';
import { getMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import * as game from 'natives';
import { changecarindex, deletecarindex, highgarage, lowgarage, mediumgarage, savecarindex } from './garages.js';

const garagelist = {
    garage1:'property1', garage2: 'property2', garage3: 'property3', garage4: 'property4', garage5: 'property5'
}

const playergarages = ['garage1', 'garage2', 'garage3', 'garage4', 'garage5']

setMeta('garagedrive', 0);
setMeta('garagedoor', 0);

let thisgarage;
let garnumber;
let dist;
let pos;
let garagedata =[], garageblips = []
let count

alt.on('setgarage',(data)=>{
    //alt.LocalStorage.set('garage', 0);
    //alt.LocalStorage.set('playerproperty', 0);
    //alt.LocalStorage.save()
    setMeta('garage', data.property);
    //setMeta('playerproperty', data.property);
    if(data.property > 0) {
        loadgarage(data.garages)
        garagedata = data.garages
    }
});

alt.on('keydown', (key) => {
    if(key == 'E'.charCodeAt(0)){
        let garagedoor = getMeta('garagedoor');
        if(garagedoor == 1) {
            //setMeta('garagedoor', 0);
            entergarage(thisgarage, garnumber)
        } else {}
    }
})

alt.on('entergarage',(garname)=>{
    let gar = getMeta(garname);
    entergarage(gar.data, gar.garnumber);
})

function entergarage(thisgarage, garnumber) {
    let pgarage = getMeta(thisgarage.nama);
            if(thisgarage.capacity == 2) {
                pos = lowgarage;
            } else if(thisgarage.capacity == 6) {
                pos = mediumgarage;
            } else if(thisgarage.capacity == 10) {
                pos = highgarage;
            }
            let vehicle = alt.Player.local.vehicle;
            
            if(!vehicle) {
                if(dist) {
                alt.clearEveryTick(dist);
                } else if(!dist) {}
                native.doScreenFadeOut(1500);
                let screen = alt.setInterval(()=>{
                    alt.emitServer('inthehouse', {x:thisgarage.x, y:thisgarage.y, z:thisgarage.z})
                    alt.emitServer('garageinside', thisgarage, garnumber, pos);
                    native.setEntityCoords(alt.Player.local.scriptID, thisgarage.x1, thisgarage.y1, thisgarage.z1, 0,0,0,1);
                    alt.clearInterval(screen);
                }, 2000);
                let screen2 = alt.setInterval(()=>{
                    native.doScreenFadeIn(3000)
                    alt.clearInterval(screen2);
                }, 4000)
            } else if(vehicle) {
            if(vehicle.hasSyncedMeta('owner')) {
            let vehstatus = vehicle.getSyncedMeta('owner');
            //let a = pgarage-1;
            if(vehstatus.owner = alt.Player.local.id) {
                if(vehstatus.garageid == thisgarage.nama) {

                        alt.clearEveryTick(dist);
                        let a = vehstatus.garageslot;
                        native.doScreenFadeOut(1500);
                        let screen = alt.setInterval(()=>{
                            alt.emitServer('inthehouse', {x:thisgarage.x, y:thisgarage.y, z:thisgarage.z})
                            alt.emitServer('garageinside', thisgarage, garnumber, pos);
                            //native.setEntityCoords(alt.Player.local.scriptID, thisgarage.x1, thisgarage.y1, thisgarage.z1, 0,0,0,1);
                            native.setEntityCoords(vehicle, pos[a].x, pos[a].y, pos[a].z, 0,0,0,0);

                            removepersonalvehicle();
                            let setgar = alt.setInterval(()=>{
                                native.setEntityHeading(vehicle, pos[a].h);
                                native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle, -1);
                                native.doScreenFadeIn(2000)
                                native.taskLeaveVehicle(alt.Player.local.scriptID, vehicle, 0);
                                alt.clearInterval(setgar);
                            }, 500)
                            alt.clearInterval(screen);
                        }, 3000);
                        
                    } else {
                        if(pgarage < thisgarage.capacity) {
                            alt.clearEveryTick(dist);
                            alt.emit('garagemenu', garnumber, thisgarage.capacity, 2);
                        
                        } else { 
                        handlenotif('GARAGE CAPACITY LIMIT EXCEEDED!');
                    }
                }
            } else { 
                    handlenotif('THIS VEHICLE NOT BELONG TO YOU!');
            }
        } else { handlenotif('YOU CANNOT STORE THIS VEHICLE!');
        }
    }
}

alt.on('movegarage', (slot, garnumber) => {
    let vehicle = alt.Player.local.vehicle;
    let vehstatus = vehicle.getSyncedMeta('owner');
    let vehdata = vehicle.getSyncedMeta('cardata')
    let a = slot;
    native.doScreenFadeOut(1500);
let screen = alt.setInterval(()=>{
    alt.emitServer('inthehouse', {x:thisgarage.x, y:thisgarage.y, z:thisgarage.z})
    alt.emitServer('garageinside', thisgarage, garnumber, pos);
    //native.setEntityCoords(alt.Player.local.scriptID, thisgarage.x1, thisgarage.y1, thisgarage.z1, 0,0,0,1);
    native.setEntityCoords(vehicle, pos[a].x, pos[a].y, pos[a].z, 0,0,0,0);
    removepersonalvehicle()
    let setgar = alt.setInterval(()=>{
        native.setEntityHeading(vehicle, pos[a].h);
        native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle, -1);
        native.doScreenFadeIn(2000)
        native.taskLeaveVehicle(alt.Player.local.scriptID, vehicle, 0);
        changecarindex(vehstatus.index, garnumber, a, thisgarage.nama, vehdata)
        alt.clearInterval(setgar);
    }, 500)
    alt.clearInterval(screen);
}, 3000);
})

let doors;
alt.onServer('createdoor', (gar)=>{
    thisgarage = gar;
    let gardata = getMeta(gar.nama)
    let aptlift = gar.nama
    let lift = gar.capacity
    doors = alt.everyTick(()=>{
        native.setFakePausemapPlayerPositionThisFrame(gar.x, gar.y);
        native.drawMarker(1, pos[lift].x, pos[lift].y, pos[lift].z-1., 0,0,0,0,0,0, 1,1,1, 150,150,0,100,0,0,0,0,0,0,0)
        native.drawMarker(1, gar.x2, gar.y2, gar.z2-1.1, 0,0,0,0,0,0, 1,1,1, 150,150,0,100,0,0,0,0,0,0,0)
        let pintu = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, gar.x2, gar.y2, gar.z2, true);
        let pintulift = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, pos[lift].x, pos[lift].y, pos[lift].z, true);
        if(pintu < 1) {
            alt.clearEveryTick(doors);
            native.doScreenFadeOut(1000);
            alt.emitServer('outgarage', gar);
            setMeta('garagedrive', 0);
            alt.emitServer('outroom');
            let garout = alt.setInterval(()=>{
                native.doScreenFadeIn( 3000);
                alt.clearInterval(garout);
            }, 2000);
        }
        if(pintulift < 1) {
            alt.clearEveryTick(doors);
            native.doScreenFadeOut(1000);
            alt.emit('enterfromgarage', aptlift);
            setMeta('garagedrive', 0);
            alt.emitServer('garageout');
            let garout = alt.setInterval(()=>{
                native.doScreenFadeIn( 3000);
                alt.clearInterval(garout);
            }, 2000);
        }
    })
})

alt.on('keydown', (key) => {
    if(key == 'W'.charCodeAt(0)){
        let garasi =getMeta('garagedrive');
            if(garasi == 1) {
        let vehseat = native.isPedInAnyVehicle(alt.Player.local.scriptID, false);
        if(vehseat == false) {}
        else if(vehseat == true) {
            alt.clearEveryTick(doors);
        let vehicle = alt.Player.local.vehicle.scriptID;
        
        native.doScreenFadeOut(2000);
        let out = alt.setInterval(()=>{
        native.setEntityCoords(vehicle, thisgarage.x3, thisgarage.y3, thisgarage.z3, 0,0,0,1);
        native.setPedIntoVehicle(vehicle, alt.Player.local.vehicle.scriptID, -1);
        native.freezeEntityPosition(vehicle, false);
        native.setEntityHeading(vehicle, thisgarage.h);
        native.doScreenFadeIn(3000);
        alt.emitServer('drive', thisgarage);
        setMeta('garagedrive', 0);
        alt.clearInterval(out);
        }, 1500);
    } 
} else {}
}});


alt.onServer('garageheading', (veh, head)=>{
    let heading = alt.setInterval(() => {
            native.setEntityHeading(veh, head);
            native.setVehicleOnGroundProperly(veh, 5);
            //native.freezeEntityPosition(veh, true);
    }, 700);
    let headstop = alt.setInterval(()=>{
        alt.clearInterval(heading);
        alt.clearInterval(headstop);
    }, 6000);
})

alt.onServer('wheelproof', (veh, data)=>{
    native.setVehicleTyresCanBurst(veh, data);
})

alt.onServer('pvehheading', (veh, head)=>{
    native.setEntityCollision(veh, false, true);
    let heading = alt.setInterval(()=>{
      native.setEntityHeading(veh, head);
      native.setVehicleOnGroundProperly(veh, 5);
      native.setEntityCollision(veh, true, true);
      alt.clearInterval(heading);
    }, 200);
})

alt.onServer('ingaragecar', ()=>{
    setMeta('garagedrive', 1);
    native.freezeEntityPosition(alt.Player.local.vehicle, true);
})

alt.onServer('outgaragecar', ()=>{
    setMeta('garagedrive', 0);
})



alt.onServer('savegarage', savegarage);

function savegarage(data, num){
    //let prop = alt.LocalStorage.get('playerproperty');
    let garages = {
        garnumber : playergarages[num],
        slot : 0,
        gardata : data
    }
    garagedata.push(garages)
    alt.emitServer('updatedata', 'accounts', 'garages', garages, true)
    alt.emitServer('updatedata', 'accounts', 'property', num+1, false)
    setMeta('garage', num+1);
    //alt.emitServer('getdata', 'accounts', 'loadgarage', 'garages');
    loadgarage(garagedata)
}

function loadgarage(data) {
    if(count > 0 ) {
        alt.clearInterval(count)
    }
    for(let i in garageblips) {
        if(garageblips[i]) {
            garageblips[i].destroy()
        }
    }
    garageblips = []

    for(let i in data) {
        let garmeta = {data: data[i].gardata, garnumber: data[i].garnumber, slot: data[i].slot}
        let meta = {nama: data[i].gardata.nama, capacity: data[i].gardata.capacity}
        setMeta(data[i].gardata.nama, garmeta );
        setMeta(data[i].garnumber, meta);
        garageblip(data[i].gardata.nama, data[i].gardata);
    }
    alt.emitServer('garageloaded', data);  
     garagecount(data)
}

alt.onServer('loadgarage', (data)=>{
   // loadgarage(data);
})

function garagecount(garage) {
count = alt.setInterval(()=>{
for(let i in garage) {
    let garagedist = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, garage[i].gardata.x3, garage[i].gardata.y3, garage[i].gardata.z3, true);
    
    if(garagedist < 30) {
        alt.emit('marker3', 1, garage[i].gardata.x3, garage[i].gardata.y3, garage[i].gardata.z3-1,2,2,0.7, 150,150,0,100)

    if(garagedist < 2){
        let gardoor = getMeta('garagedoor');
        if(gardoor == 0) {
        setMeta('garagedoor', 1);
        handletext('~INPUT_PICKUP~ Enter Garage')
        thisgarage = garage[i].gardata;
        garnumber = garage[i].garnumber
        } else {}
        } else {
        let gardoor = getMeta('garagedoor');
        if(gardoor == 1) {
            if(garnumber == garage[i].garnumber) {
                setMeta('garagedoor', 0)
            }
        } 
    }
}
}}, 1000)

}

alt.onServer('savecar', savecar);

function savecar(vehmodel, vehdisplay, primcolor, seconcolor, garnumber, garname, garindex, slot) {
let veh = alt.Player.local.vehicle.scriptID
    let vehdata = {
        garagenumber : garnumber,
        garagename : garname,
        garageindex : garindex,
        garageslot : slot,
        model : vehmodel,
        display : vehdisplay,
        color1 : primcolor,
        color2 : seconcolor,
        perleascent : 0,
        dashboardcol : 0,
        engine : -1,
        brake : -1,
        transmission : -1,
        armor : -1,
        turbo : false,
        spoiler : native.getVehicleMod(veh, 0),
        fbumper : native.getVehicleMod(veh, 1),
        rbumper : native.getVehicleMod(veh, 2),
        skirt : -1,
        exhaust : -1,
        frame : -1,
        grille : -1,
        hood : native.getVehicleMod(veh, 7),
        fender : -1,
        rfender : -1,
        roof : -1,
        suspension : -1,
        livery : native.getVehicleMod(veh, 48),
        horn : 0,
        window : -1,
        plate : 0,
        wheeltype : 0,
        wheelmodel : 0,
        rearwheel : 0,
        wheelcolor : 0,
        customtire : -1,
        xenon : -1,
        neon : {front: false, back: false, left: false, right: false },
        neoncolor : {},
        tireSmoke : {},
    }
    savecarindex(vehdata);
    alt.emitServer('cardata', vehdata)
    alt.LocalStorage.set('pvehicle', vehdata);
    alt.LocalStorage.set('personalvehicle', 1);
    alt.LocalStorage.save();

   // setMeta(garname, num+1);
    setMeta('personalvehicle', 1);
}

alt.on('spawnpersonalvehicle', (pos) =>{
    loadplayercar(pos);
})

function loadplayercar(pos) {
    let playercar = alt.LocalStorage.get('personalvehicle');
    if(playercar > 0) {
    let pveh = alt.LocalStorage.get('pvehicle');
    alt.emitServer('spawnpersonalvehicle', pveh, pos);
        setMeta('personalvehicle', 1);
   
    } else {
        setMeta('personalvehicle', 0);
    }
}

alt.onServer('savepersonalvehicle', (vehdata)=>{

    alt.LocalStorage.set('pvehicle', vehdata);
    alt.LocalStorage.set('personalvehicle', 1);
    alt.LocalStorage.save();
    setMeta('personalvehicle', 1);
})

alt.onServer('deletevehicle', (veh, vehdata)=>{
    alt.LocalStorage.delete('pvehicle');
    alt.LocalStorage.set('personalvehicle', 0);
    alt.LocalStorage.save();
    deletecarindex(vehdata.garageindex);
    setMeta('personalvehicle', 0);

})


function removepersonalvehicle () {
    alt.LocalStorage.delete('pvehicle');
    alt.LocalStorage.set('personalvehicle', 0);
    alt.LocalStorage.save();
    setMeta('personalvehicle', 0);
}


function garageblip(blipId, garage){
    var garageblip = new alt.PointBlip(garage.x3, garage.y3, garage.z3)
    garageblips.push(garageblip)
        garageblip.category = 11;
        garageblip.sprite = 357
        garageblip.alpha = 225;
        garageblip.name = 'Player Garage';
        garageblip.color = 3
        garageblip.shortRange = false;      

}

function handlenotif(text) {
    let notif = alt.everyTick(()=>{
        drawtext(text,0.5,0.35,4,0.7,0.9,255, 255, 0,255 )
    })
    let closenotif = alt.setInterval(()=>{
        alt.clearEveryTick(notif);
        alt.clearInterval(closenotif);
    }, 5000);
    
}

function handletext(text) {
	game.beginTextCommandDisplayHelp("STRING");
	game.addTextComponentSubstringKeyboardDisplay(text);
	game.endTextCommandDisplayHelp(0, 0, true, -1);
};

function drawtext(msg, x, y, font, scale, wrap, r, g, b, a,) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(font);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, wrap);
    native.setTextCentre(true);
    native.setTextOutline();
    native.setTextColour(r,g,b,a);
    native.setTextJustification(0);
    native.setTextDropShadow(true);
    native.endTextCommandDisplayText(x, y, 0);
    
  }