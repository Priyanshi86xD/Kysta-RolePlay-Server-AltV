import * as alt from 'alt-client';
import * as native from 'natives';
import { handletext } from './client.js';

let carwashready = false

alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
        let cuci = alt.getMeta('carwash');
            if(alt.Player.local.vehicle) {
                if(carwashready == true) {
                    if(cuci == 'carwash1') {
                        carwash1();
                    } else {
                        carwash2();
                    }
                }
            } 
	}
});

export function carwashnotif() {
    if(alt.Player.local.vehicle) {
        let vehtype = native.getVehicleClass(alt.Player.local.vehicle)
        if(vehtype == 8 || vehtype == 13) {} else {
            if(carwashready == false) {
                handletext("~INPUT_PICKUP~ to use carwash. cost $ 15")
                carwashready = true
            }
        }
    } 
}

function carwash1() {
    native.requestModel(1435400154)
    native.requestModel(-382832258)
    let veh = alt.Player.local.vehicle
    native.requestPtfxAsset()
    native.requestNamedPtfxAsset("scr_carwash");
native.setEntityCoords(alt.Player.local.vehicle, -699.78, -923.90, 18.50, 0,0,0,1)
native.setEntityHeading(alt.Player.local.vehicle, 180.6404266357422)
native.taskVehicleDriveToCoord(alt.Player.local.scriptID, veh, -699.856, -946.0045,  19, 2,1,0,16777216,1,0)
native.useParticleFxAsset('scr_carwash')
let water3 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet",   -702.5,-927.7, 20, 280.0, 0.0, 90.0, 0.7, 1, 1, 1, false)
   native.useParticleFxAsset('scr_carwash')
    let water4 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet", -697.5, -927.7,  20, 90.0, 0.0, 90.0, 0.7, 1, 1, 1, false)
    native.useParticleFxAsset('scr_carwash')
    let water5 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet",   -702.5,-927.7, 18.7, 280.0, 0.0, 90.0, 0.7, 1, 1, 1, false)
    native.useParticleFxAsset('scr_carwash')
    let water6 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet", -697.5, -927.7,  18.7, 90.0, 0.0, 90.0, 0.7, 1, 1, 1, false)
native.removeIpl("KT_CarWash");
native.requestIpl("kt_carwash_nobrush");

let bspin = native.createObjectNoOffset(1435400154, -700.,  -931.9, 21.5, 0,0,1)
let bigspinrot = native.getEntityRotation(bspin, 2);
let vspin1 = native.createObjectNoOffset(-382832258, -701.9, -934.9501, 19.6, 0,0,1)
let vspin2 = native.createObjectNoOffset(-382832258, -698, -934.9501, 19.6, 0,0,1)
native.setEntityCollision(bspin, false, true)
native.setEntityCollision(vspin1, false, true)
native.setEntityCollision(vspin2, false, true)
let vspinrot = native.getEntityRotation(vspin1, 2);
let rolls = 0
let updown = 0
let side = 0

let start = alt.setInterval(()=>{
    alt.clearInterval(start)
    let roll = alt.setInterval(()=>{
        native.setEntityRotation(bspin, bigspinrot.x - rolls, bigspinrot.y, bigspinrot.z, 2, 1);
        native.setEntityRotation(vspin1, vspinrot.x , vspinrot.y, vspinrot.z- rolls, 2, 1);
        native.setEntityRotation(vspin2, vspinrot.x , vspinrot.y, vspinrot.z- rolls, 2, 1);
        if(updown < 2) {
        native.setEntityCoordsNoOffset(bspin, -700.,  -931.9, 21.5 - updown, 0,0,0)
        }
        if(side < 0.8) {
            native.setEntityCoordsNoOffset(vspin1,  -701.9 + side, -934.9501, 19.6 , 0,0,0)
            native.setEntityCoordsNoOffset(vspin2,  -698 - side, -934.9501, 19.6, 0,0,0)
        }
        rolls += 20
        updown += 0.2
        side += 0.1
        
    }, 20);
    native.useParticleFxAsset('scr_carwash')
    let water = native.startParticleFxLoopedOnEntity("ent_amb_car_wash", bspin, 0,0,0,0,0,0,1,0,0,0)
    native.useParticleFxAsset('scr_carwash')
    let water1 = native.startParticleFxLoopedOnEntity("ent_amb_car_wash", vspin1, 0,0,0,0,0,0,1,0,0,0)
    native.useParticleFxAsset('scr_carwash')
    let water2 = native.startParticleFxLoopedOnEntity("ent_amb_car_wash", vspin2, 0,0,0,0,0,0,1,0,0,0)          
    
    native.useParticleFxAsset('scr_carwash')
    let water7 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet",   -702.5,-938.7, 20, 280.0, 0.0, 90.0, 0.7, 1, 1, 1, false)
    native.useParticleFxAsset('scr_carwash')
    let water8 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet", -697.5, -938.7,  20, 90.0, 0.0, 90.0, 0.7, 1, 1, 1, false)
    native.useParticleFxAsset('scr_carwash')
    let water9 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet",   -702.5,-938.7, 18.7, 280.0, 0.0, 90.0, 0.7, 1, 1, 1, false)
    native.useParticleFxAsset('scr_carwash')
    let water10 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet", -697.5, -938.7,  18.7, 90.0, 0.0, 90.0, 0.7, 1, 1, 1, false)
    native.washDecalsFromVehicle(veh, 1.0)
    native.setVehicleDirtLevel(veh,0)
    alt.emitServer('cleanvehicle');
    let del = alt.setInterval(()=>{
        alt.emit('buy', 15)
        alt.clearInterval(roll)
        alt.clearInterval(del)
        native.deleteObject(bspin)
        native.deleteObject(vspin1)
        native.deleteObject(vspin2)
        
        native.stopParticleFxLooped(water, 0);
        native.stopParticleFxLooped(water1, 0);
        native.stopParticleFxLooped(water2, 0);
        native.stopParticleFxLooped(water3, 0);
        native.stopParticleFxLooped(water4, 0);
        native.stopParticleFxLooped(water5, 0);
        native.stopParticleFxLooped(water6, 0);
        native.stopParticleFxLooped(water7, 0);
        native.stopParticleFxLooped(water8, 0);
        native.stopParticleFxLooped(water9, 0);
        native.stopParticleFxLooped(water10, 0);
        native.removeIpl("kt_carwash_nobrush");
        native.requestIpl("KT_CarWash");
        native.setModelAsNoLongerNeeded(1435400154)
    native.setModelAsNoLongerNeeded(-382832258)
    native.removePtfxAsset()
    native.removeNamedPtfxAsset("scr_carwash")
    
    carwashready = false
    }, 9000)
}, 3000)
}

function carwash2() {

    native.requestModel(1435400154)
    native.requestModel(-382832258)
    let veh = alt.Player.local.vehicle
    native.requestPtfxAsset()
    native.requestNamedPtfxAsset("scr_carwash");
native.setEntityCoords(veh, 47.308, -1391.924, 28.688, 0,0,0,1)
native.setEntityHeading(veh, 89.6)
native.taskVehicleDriveToCoord(alt.Player.local.scriptID, veh, -6.875, -1391.904, 28.615, 2.3,1,0,16777216,1,0)
native.useParticleFxAsset('scr_carwash')
let water3 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet",   37.00, -1389.8, 30, 0.0, 90.0, 90.0, 0.7, 1, 1, 1, false)
   native.useParticleFxAsset('scr_carwash')
    let water4 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet",  36.88, -1393.9, 30, 0.0, 280.0, 90.0, 0.7, 1, 1, 1, false)
    native.useParticleFxAsset('scr_carwash')
    let water5 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet",   37.00, -1389.8, 29, 0.0, 90.0, 90.0, 0.7, 1, 1, 1, false)
    native.useParticleFxAsset('scr_carwash')
    let water6 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet", 36.88, -1393.9, 29, 0.0, 280.0, 90.0, 0.7, 1, 1, 1, false)
native.removeIpl("carwash_with_spinners");
native.requestIpl("carwash_without_spinners");

let bspin = native.createObjectNoOffset(1435400154,  29.2215, -1391.7138, 31.2, 0,0,1)
native.setEntityHeading(bspin, 269)
let bigspinrot = native.getEntityRotation(bspin, 2);
let vspin1 = native.createObjectNoOffset(-382832258, 20.950, -1390.0236, 30, 0,0,1)
let vspin2 = native.createObjectNoOffset(-382832258, 20.950, -1393.6268, 30, 0,0,1)
native.setEntityCollision(bspin, false, true)
native.setEntityCollision(vspin1, false, true)
native.setEntityCollision(vspin2, false, true)
let vspinrot = native.getEntityRotation(vspin1, 2);
let rolls = 0
let updown = 0
let side = 0

let start = alt.setInterval(()=>{
    alt.clearInterval(start)
    let roll = alt.setInterval(()=>{
        native.setEntityRotation(bspin, bigspinrot.x - rolls, bigspinrot.y, bigspinrot.z, 2, 1);
        native.setEntityRotation(vspin1, vspinrot.x , vspinrot.y, vspinrot.z- rolls, 2, 1);
        native.setEntityRotation(vspin2, vspinrot.x , vspinrot.y, vspinrot.z- rolls, 2, 1);
        if(updown < 1.4) {
        native.setEntityCoordsNoOffset(bspin, 29.2215, -1391.7138, 31.2 - updown, 0,0,0)
        }
        if(side < 0.6) {
            native.setEntityCoordsNoOffset(vspin1,  20.950, -1390.0236 - side, 30 , 0,0,0)
            native.setEntityCoordsNoOffset(vspin2,  20.950, -1393.6268 + side, 30, 0,0,0)
        }
        rolls += 20
        updown += 0.2
        side += 0.1
        
    }, 20);
    native.useParticleFxAsset('scr_carwash')
    let water = native.startParticleFxLoopedOnEntity("ent_amb_car_wash", bspin, 0,0,0,0,0,0,1,0,0,0)
    native.useParticleFxAsset('scr_carwash')
    let water1 = native.startParticleFxLoopedOnEntity("ent_amb_car_wash", vspin1, 0,0,0,0,0,0,1,0,0,0)
    native.useParticleFxAsset('scr_carwash')
    let water2 = native.startParticleFxLoopedOnEntity("ent_amb_car_wash", vspin2, 0,0,0,0,0,0,1,0,0,0)          
    
    native.useParticleFxAsset('scr_carwash')
    let water7 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet",   13.86, -1389.8, 30, 0.0, 90.0, 90.0, 0.7, 1, 1, 1, false)
    native.useParticleFxAsset('scr_carwash')
    let water8 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet", 13.89, -1393.9, 30, 0.0, 280.0, 90.0, 0.7, 1, 1, 1, false)
    native.useParticleFxAsset('scr_carwash')
    let water9 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet",   13.86, -1389.8, 29, 0.0, 90.0, 90.0, 0.7, 1, 1, 1, false)
    native.useParticleFxAsset('scr_carwash')
    let water10 = native.startParticleFxLoopedAtCoord("ent_amb_car_wash_jet", 13.89, -1393.9, 29, 0.0, 280.0, 90.0, 0.7, 1, 1, 1, false)
    native.washDecalsFromVehicle(veh, 1.0)
    native.setVehicleDirtLevel(veh,0)
    alt.emitServer('cleanvehicle');
    let del = alt.setInterval(()=>{
        alt.emit('buy', 15)
        alt.clearInterval(roll)
        alt.clearInterval(del)
        native.deleteObject(bspin)
        native.deleteObject(vspin1)
        native.deleteObject(vspin2)
        
        native.stopParticleFxLooped(water, 0);
        native.stopParticleFxLooped(water1, 0);
        native.stopParticleFxLooped(water2, 0);
        native.stopParticleFxLooped(water3, 0);
        native.stopParticleFxLooped(water4, 0);
        native.stopParticleFxLooped(water5, 0);
        native.stopParticleFxLooped(water6, 0);
        native.stopParticleFxLooped(water7, 0);
        native.stopParticleFxLooped(water8, 0);
        native.stopParticleFxLooped(water9, 0);
        native.stopParticleFxLooped(water10, 0);
        native.removeIpl("carwash_without_spinners");
        native.requestIpl("carwash_with_spinners");
        native.setModelAsNoLongerNeeded(1435400154)
    native.setModelAsNoLongerNeeded(-382832258)
    native.removePtfxAsset()
    native.removeNamedPtfxAsset("scr_carwash")     
      carwashready = false
      }, 14000)
  }, 3000)
}