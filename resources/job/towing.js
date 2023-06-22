import * as alt from 'alt-client';
import { setMeta } from 'alt-client';
import * as native from 'natives';
import { drawtext, handletext } from './client.js';

const cars = [
    0xB12314E0, 0xE5A2D6C6
]
const towstart = [
{x: 399.3163146972656,y: -1635.0419921875,z: 29.00063705444336, h:230.5334930419922},
{x: 404.0601501464844,y: -1632.5572509765625, z: 28.999374389648438, h:140.2458038330078}
]

export function towingjob() {
    let towtruck = 0;
    let towblip = native.addBlipForCoord(towstart[0].x, towstart[0].y,towstart[0].z);
    native.setBlipSprite(towblip, 68);
    native.setBlipColour(towblip, 5);
    alt.emit('jobstart', "Go to ~y~Towing Impound ~w~to start the job");
    setMeta('towjob', 0)

    let towtime = alt.setInterval(()=>{
        let pos = alt.Player.local.pos;
        let towdist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, towstart[0].x, towstart[0].y,towstart[0].z, true);
        if(towdist < 50) {
            if(towtruck == 0) {
                towtruck = 1;
                alt.emitServer('createcar', cars[0], "TOW "+alt.Player.local.id, towstart[0].x, towstart[0].y,towstart[0].z, towstart[0].h)
            } else {}
        }
        if(towdist <= 10) {
            alt.emit('jobstart', "Drive the ~b~Tow Truck ~w~to start the job");
            let sit = native.isPedInAnyVehicle(alt.Player.local.scriptID, true);
            if(sit == false) {} else if(sit == true) {
                let veh = native.getEntityModel(alt.Player.local.vehicle);
                if(veh == cars[0]) {
                    alt.clearInterval(towtime);
                    alt.emit('jobstart', "");
                    setMeta('fixjob', 1);
                    setMeta('towjob', 1);
                    towjobstart();
                    let jobnotif = alt.everyTick(()=>{
                        drawtext('TOWING JOB',0.5,0.22,4,1.2,0.9,255,255,255,255, 0);
                        drawtext("TOW THE ABANDONED CARS TO TOWING IMPOUND",0.5,0.28,4,0.7,0.9,200, 155, 0,255, 0);
                    })
                    let job = alt.setInterval(()=>{
                        alt.clearEveryTick(jobnotif);
                        clearInterval(job);
                    },6000)
                }
            }
        }
    }, 1000)
}
let abandonedcars =[]
let towedcar = 0;
let toweddistance = 0;
let moneygot = 0;
let towcarpos;

function towjobstart() {
    let scanveh = alt.setInterval(()=>{
        for(let veh of alt.Vehicle.all) {
            if (veh.scriptID > 0 &&  veh.hasSyncedMeta('wandercar') ) {
                let seat = native.isVehicleSeatFree(veh, -1, true);
                if(seat == false) {} else if(seat == true) {
                    alt.clearInterval(scanveh);
                    native.addBlipForEntity(veh);
                    native.setVehicleEngineHealth(veh, 300)
                    abandonedcars.push(veh.scriptID);
                    let vpos = native.getEntityCoords(veh, false);
                    //native.addBlipForCoord(vpos.x, vpos.y, vpos.z);
                    towcarpos = native.addBlipForRadius(vpos.x, vpos.y, vpos.z, 50);
                    native.setBlipColour(towcarpos, 2);
                    native.setBlipAlpha(towcarpos, 80);
                    //native.startGpsMultiRoute(5, true, false);
                    //native.addPointToGpsMultiRoute(vpos.x, vpos.y, vpos.z)
                    //native.setGpsMultiRouteRender(true);
                    towingstart();
                }
            }
        }
    }, 500);   
}

function towingstart() {
    alt.emit('jobstart', "Go to the abandoned cars ~y~locations");
    alt.emit('timerbar', 1,["TOWING FEE", "$"+moneygot, 140], ["VEHICLES TOWED", towedcar+"/"+abandonedcars.length, 140], ["", "", 0])
    let towdest = alt.setInterval(()=>{
        for(let veh of alt.Vehicle.all) {
            if (veh.scriptID > 0 &&  veh.hasSyncedMeta('wandercar') ) {
                let vehtow = native.isVehicleAttachedToTowTruck(alt.Player.local.vehicle, veh.scriptID);
                if(vehtow == false) {} else if(vehtow == true) {
                    alt.clearInterval(towdest);
                    native.removeBlip(towcarpos);
                    alt.emit('jobstart', "Deliver this vehicle to ~y~Towing Impound");
                    //native.setGpsMultiRouteRender(false);
                    let toweddest = native.addBlipForCoord(towstart[1].x, towstart[1].y,towstart[1].z);
                    native.setBlipRoute(toweddest);
                    let delivertime = alt.setInterval(()=>{
                        let pos = alt.Player.local.vehicle.pos;
                        let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, towstart[1].x, towstart[1].y,towstart[1].z, true);
                        if(toweddistance == 0) {
                            toweddistance = dist;
                        } else {}
                        if(dist < 50) {
                            alt.emit('marker', 1,towstart[1].x, towstart[1].y,towstart[1].z-1,3,3,1.1,155,155,55,80);
                        }
                        if(dist <= 3) {
                            alt.clearInterval(delivertime);
                            let money = dist*0.4;
                            native.removeBlip(toweddest);
                            native.clearAllBlipRoutes()
                            toweddistance = 0;
                            alt.emitServer("jobfinish", money);
                            moneygot += money;
                            towedcar += 1;
                            handletext('Tow another vehicles to get more money')
                            towjobstart();
                            alt.emit('timerbar',1, ["TOWING FEE", "$"+moneygot, 140], ["VEHICLES TOWED", towedcar+"/"+abandonedcars.length, 140], ["", "", 0])
                            native.setGpsMultiRouteRender(true);
                            let removecar = alt.setInterval(()=>{
                                let pos = alt.Player.local.vehicle.pos;
                                let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, towstart[1].x, towstart[1].y,towstart[1].z, true);
                                if(dist > 10) {
                                    alt.clearInterval(removecar);
                                    alt.emitServer('removewandercar', veh);
                                }
                            }, 1000);
                        }
                    })
                }
            }
        }
    },1000)
}

