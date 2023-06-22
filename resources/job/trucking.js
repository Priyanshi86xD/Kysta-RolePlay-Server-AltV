import * as alt from 'alt-client';
import { clearEveryTick, getMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import { drawtext, handletext } from './client.js';

const trucks = [
    0x5A82F9AE, 0x809AA4CB, 0x21EEE87D
]

const warehouse = [
   { x: -1024.830810546875, y: -2126.956298828125, z: 13.167476654052734, 
    x1: -981.1085815429688, y1: -2232.6025390625, z1: 8.94600772857666, h1:224.6415252685547,
    trailpos: {x: -1032.9061279296875,  y: -2217.218017578125, z: 9.066777229309082, h: 225.37149047851562},
    trailer: ["trailers2", "trailers", "trailers3"], pos:0
  },
  {x: -63.5618782043457, y: -2520.3935546875, z: 7.400388717651367,
   x1: -110.24451446533203, y1: -2523.759033203125,  z1: 6.066964626312256, h1:231.94491577148438,
   trailpos: {x: -50.85441970825195,y: -2417.590576171875,z: 6.066908836364746, h:270.0694274902344},
   trailer: ["trailers2", "trailers", "trailers3"], pos:1
    },
   {x: 1180.6329345703125,   y: -3113.8603515625,  z: 6.028026103973389,
    x1: 1197.45458984375,    y1: -3102.540771484375,  z1: 6.031097888946533, h1:0.05067214369773865,
    trailpos: {x: 1200.964111328125,     y: -3192.13134765625,  z: 6.113795757293701, h:180.2244415283203},
    trailer: ["trailers2", "trailers", "trailers3", "tr4"], pos:2
    },
    {x: 835.4368896484375,        y: -912.667724609375,        z: 25.546232223510742,
    x1: 887.0237426757812, y1: -889.7557373046875, z1: 26.646921157836914, h1:88.91055297851562,
    trailpos: { x: 873.6270751953125, y: -952.7511596679688,  z: 26.36737632751465, h:359.9805908203125},
    trailer: ["trailers2", "trailers", "trailers3"], pos:3
    },
    {x: 1093.4534912109375,        y: -2252.2109375,        z: 31.23392105102539,
    x1: 1113.8607177734375,          y1: -2282.493896484375,        z1: 30.576343536376953, h1:84.25080871582031,
    trailpos: {  x: 1114.0697021484375,      y: -2235.558349609375,    z: 30.309833526611328, h:86.0159912109375},
    trailer: ["trailers2", "trailers", "trailers3"] , pos:4
    },
    { x: 569.9910888671875, y: 2796.76123046875,        z: 42.01618957519531,
    x1: 582.5747680664062,  y1: 2790.86572265625,       z1: 42.40318298339844, h1:3.590308904647827,
    trailpos: {         x: 616.794677734375,            y: 2797.210205078125,   z: 42.22755813598633, h:3.7041566371917725},
    trailer: ["trailers2", "trailers", "trailers3"] , pos:5
    },
    {x: 2709.81640625,        y: 3454.54638671875,        z: 56.3173713684082,
    x: 2675.07861328125,     y: 3461.397216796875,     z: 55.755157470703125, h1:157.07809448242188,
    trailpos: {        x: 2670.56591796875,        y: 3516.39892578125,        z: 52.790382385253906, h:67.08457946777344},
    trailer: ["trailers2", "trailers", "trailers3"] , pos:6
    },
    {x: 2671.35107421875,        y: 1612.7591552734375,        z: 24.500688552856445,
     x: 2679.1611328125,         y: 1601.5711669921875,        z: 24.579710006713867, h1:268.89459228515625,
    trailpos: {         x: 2674.0283203125,        y: 1692.4515380859375,        z: 24.573528289794922, h:179.0082244873047},
    trailer: ["tanker"] , pos:7
    },
    {x: 2890.7900390625,        y: 4391.52587890625,        z: 50.33936309814453,
    x1: 2900.5615234375,       y1: 4372.25146484375,        z1: 50.44253921508789, h1:295.2215576171875,
    trailpos: {   x: 2896.91455078125,        y: 4383.4091796875,      z: 50.44309616088867,h:293.2027893066406},
    trailer: ["tanker"] , pos:8   
    },
    {x: 147.98240661621094,        y: 6362.34326171875,        z: 31.52920913696289,
     x1: 139.77191162109375,            y1: 6391.3515625,            z1: 31.26226806640625, h1:298.8408203125,
     trailpos: {       x: 187.5196990966797,      y: 6395.89111328125,      z: 31.468820571899414, h:297.41180419921875},
     trailer: ["trailers2", "trailers", "trailers3"] , pos:9
    },
    {x: -566.22412109375,        y: 5326.08984375,        z: 73.593017578125,
     x1: -573.9492797851562,         y1: 5252.5166015625,    z1: 70.70188903808594, h1: 342.2255859375,
     trailpos: {     x: -512.0927734375,     y: 5260.345703125,    z: 80.8380355834961, h:159.62576293945312},
     trailer: ["trailerlogs"] , pos:10 
    },
    {x: 1309.342041015625,        y: 4362.04296875,        z: 41.54283142089844,
    x1: 1304.1993408203125,            y1: 4324.43212890625,            z1: 38.52305221557617, h1:305.81158447265625,
    trailpos: {    x: 1360.8172607421875,     y: 4372.86865234375,    z: 44.561485290527344, h:272.0373229980469},
    trailer: ["tr3"] , pos:11 
    }
]



const trailers = ["trailers2", "trailers", "trailers3", "tanker", "tr4", "tr3", "trailerlogs"]

const destination = [
    {x: -1170.7423095703125,y: -2197.240478515625,z: 13.43020248413086},
    {x: -146.2659149169922,y: -2414.398681640625, z: 6.06746768951416},
    {x: 1063.3748779296875,y: -3188.49658203125, z: 5.9873948097229},
    {x: 853.3709716796875,y: -896.8878784179688, z: 25.404314041137695},
    {x: 1092.7489013671875, y: -2301.927978515625, z: 30.35627555847168},
    {x: 592.5726318359375,        y: 2790.617431640625,        z: 42.407615661621094},
    {x: 2687.862548828125,        y: 3454.718017578125,        z: 55.84364318847656},
    {x: 2675.79638671875,        y: 1445.4769287109375,        z: 24.586408615112305},
    {x: 2910.468505859375,        y: 4375.0810546875,        z: 50.47807693481445},
    {x: 135.60694885253906,        y: 6369.1220703125,        z: 31.437938690185547},
    {x: -600.9555053710938,        y: 5301.974609375,        z: 70.4483871459961},
    {x: 1351.4144287109375,        y: 4326.6650390625,        z: 38.34918975830078},
]

let jobblips = []
let warehouse1, jobtime, jobcar = 0;

export function truckjob() {
    for(let i in warehouse) {
        let jobblip = native.addBlipForCoord(warehouse[i].x, warehouse[i].y, warehouse[i].z);
        native.setBlipSprite(jobblip, 473);
        native.setBlipColour(jobblip, 5);
        jobblips.push(jobblip);
        setMeta('truckjob', 0);
        alt.emit('jobstart', "Go to ~y~Shipping Warehouse ~w~to start the job")
        jobtime = alt.setInterval(()=>{
            let pos = alt.Player.local.pos;
            let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z,warehouse[i].x, warehouse[i].y, warehouse[i].z, true );
            if(dist <= 50) {
                alt.emit('marker', 1, warehouse[i].x, warehouse[i].y, warehouse[i].z-1,0.8,0.8,1.1,55,255,155,80)
            }
            if(dist <=1) {
                let job = getMeta('truckjob');
                if(job == 0 ) {
                    alt.emit('jobstart', "")
                    setMeta('truckjob', 1);
                    handletext("~INPUT_PICKUP~ start work as truck driver")
                    warehouse1 = warehouse[i];
                } else if(job == 2) {
                    setMeta('truckjob', 3);
                    warehouse1 = warehouse[i];
                    handletext("~INPUT_PICKUP~ request cargo for delivery")
                }
            }
        }, 1000);
    }

    
alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
        let job = getMeta('truckjob');
        if(job == 1) {

            setMeta('activejob', 'Truck Driver Work');
            alt.emitServer('startingjob');
            if(jobcar == 0) {
            truckwork();
        } else {}
    } else if(job == 3) {
        truckdeliver();
    }
}})
}


function truckwork() {
   
    let car = trucks[native.getRandomIntInRange(0, trucks.length-1)]
        alt.emitServer('createcar', car, "TRC ", warehouse1.x1, warehouse1.y1, warehouse1.z1, warehouse1.h1)
        jobcar += 1;
    let carblip = native.addBlipForCoord(warehouse1.x1, warehouse1.y1, warehouse1.z1)
    native.setBlipSprite(carblip, 477)
    native.setBlipFlashes(carblip, true);
    native.setBlipColour(carblip, 3)
    
    alt.emit('jobstart', "Drive ~b~The Truck");
    let worktime = alt.setInterval(()=>{
        let seat = native.isPedInAnyVehicle(alt.Player.local.scriptID, false);
        if(seat == false) {} else {
            let vmodel = native.getEntityModel(alt.Player.local.vehicle);
            if(vmodel == car) {
                alt.clearInterval(worktime);
                native.removeBlip(carblip);
                truckdeliver();
                native.playSound(0, "Event_Start_Text", "GTAO_FM_Events_Soundset", true, 0 ,false)
                let jobnotif = alt.everyTick(()=>{
                    drawtext('TRUCK DRIVER WORK',0.5,0.22,4,1.2,0.9,255,255,255,255, 0);
                    drawtext("DELIVER CARGO TRAILER TO THEIR DESTINATION",0.5,0.28,4,0.7,0.9,200, 155, 0,255, 0);
                })
                let job = alt.setInterval(()=>{
                    alt.clearEveryTick(jobnotif);
                    clearInterval(job);
                },6000)
        }
        }
    }, 1000)
}

let minute = 0, second = 60, timermin,timersec,fakemin = 0;

function truckdeliver() {
    let dest;
    let rp = 0
    alt.emit('jobstart', "Attach ~b~The Trailer");
    let trailer = warehouse1.trailer[native.getRandomIntInRange(0,warehouse1.trailer.length-1)]
    let num = native.getRandomIntInRange(0, destination.length-1);
    if(num == warehouse1.pos) {
        if(num == destination.length-1) {
            dest = destination[num-2]
        } else {
            dest = destination[num+1]
        }
    } else {
        dest = destination[num]
    }
    let dist = native.getDistanceBetweenCoords(warehouse1.trailpos.x, warehouse1.trailpos.y, warehouse1.trailpos.z, dest.x, dest.y, dest.z, true);
        alt.emitServer('createtrailer', trailer, warehouse1.trailpos);
        let trailerblip = native.addBlipForCoord(warehouse1.trailpos.x, warehouse1.trailpos.y, warehouse1.trailpos.z)
        native.setBlipSprite(trailerblip, 479)
        native.setBlipColour(trailerblip, 3)
        native.setBlipFlashes(trailerblip, true);
        let cargo = alt.Player.local.getSyncedMeta('jobtrailer');
        let cargomodel = native.getEntityModel(cargo);
        native.setEntityCollision(cargo, false, true);
       
        //native.setTrailerLegsRaised(cargo);
        let marker = alt.everyTick(()=>{
            native.drawMarker(2, warehouse1.trailpos.x, warehouse1.trailpos.y, warehouse1.trailpos.z+5, 0,0,0,180,0,0, 2,2,2, 55,255,155,100,true,0,0,0,0,0,0);
            if(cargomodel == 0x6A59902D) {
                let pos = alt.Player.local.vehicle.pos;
                let tdist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, warehouse1.trailpos.x, warehouse1.trailpos.y, warehouse1.trailpos.z, true);
                if(tdist <= 15) {
                    native.attachVehicleToTrailer(alt.Player.local.vehicle, cargo, 15);
                    alt.log(cargomodel);
                }
            }
        })
        if(dist > 2000) {
            rp = 40
        } else if(dist > 4000) {
            rp = 70
        } else {
            rp = 30
        }
    let trailertime = alt.setInterval(()=>{
        let sit = native.isPedInAnyVehicle(alt.Player.local.scriptID, false);
        if(sit == false) {} else {
        let trailer = native.isVehicleAttachedToTrailer(alt.Player.local.vehicle);
        if(trailer == true) {
            alt.clearInterval(trailertime);
            native.removeBlip(trailerblip);
            alt.clearEveryTick(marker);
            let destblip = native.addBlipForCoord(dest.x, dest.y, dest.z);
            native.setBlipRoute(destblip, true);
            
            let cargo = alt.Player.local.getSyncedMeta('jobtrailer');
            let fee = dist*0.9
            if((dist/1000) < 4) {
                minute = 4;
                fakemin = 5;
            } else {
                minute = Math.round(dist/400)
                fakemin = minute+1
            }
            alt.emit('jobstart', "Deliver The Trailer to ~y~Destination");
            delivertime()
            let deliverytime = alt.setInterval(()=>{
                let chealth = native.getEntityHealth(cargo)*0.1;
                let price = Math.round((chealth/100)*fee);
                let pos = native.getEntityCoords(cargo, false);
                let bonus;
                if(fakemin == 0 && second == 0) {
                    bonus = 1000;
                } else {
                    if(dist > 2000) {
                        bonus = 5000
                    } else if(dist > 4000) {
                        bonus = 8000
                    } else {
                        bonus = 3000;
                    }
                }
                alt.emit('timerbar', 1,["TIME : "+minute+':'+second, 'CARGO : '+(Math.round(chealth))+"%", 140], ["BONUS TIME", "$"+bonus, 140], ["DRIVER FEE", "$"+price, 140])
                let dist2 = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, dest.x, dest.y, dest.z, true);
                if(chealth <= 10) {
                    alt.clearInterval(deliverytime);
                    if(minute > 0) {
                        clearInterval(timermin);
                        clearInterval(timersec);
                    }
                    native.playSound(0, "ScreenFlash", "MissionFailedSounds", true, 0 ,false)
                    native.removeBlip(destblip);
                    native.clearAllBlipRoutes();
                    alt.emit('timerbar', 0,["", "", 0], ["", "", 0], ["", "", 0])
                    alt.emit('jobstart', "");
                    setMeta('truckjob', 2);
                    let jobnotif = alt.everyTick(()=>{
                        drawtext('WORK FAILED',0.5,0.22,4,1.2,0.9,255,255,255,255, 0);
                        drawtext("CARGO TRAILER NOT DELIVERED!",0.5,0.28,4,0.7,0.9,200, 155, 0,255, 0);
                    })
                    minute = 0;
                    second = 60;
                    let restartjob = alt.setInterval(()=>{
                        alt.clearEveryTick(jobnotif);
                        handletext("Go to any warehouse to start another work")
                        clearInterval(restartjob);
                    },6000);
                }
                if(dist2 <= 50) {
                    alt.emit('marker', 1, dest.x, dest.y, dest.z-1,2,2,2,55,255,155,80)
                }
                if(dist2 <= 4) {
                    alt.clearInterval(deliverytime);
                    native.detachVehicleFromTrailer(alt.Player.local.vehicle);
                    if(minute > 0) {
                        clearInterval(timermin);
                        clearInterval(timersec);
                    }
                    
                    native.playSound(0, "package_delivered_success", "DLC_GR_Generic_Mission_Sounds", true, 0 ,false)
                    setMeta('truckjob', 2);
                    native.removeBlip(destblip);
                    native.clearAllBlipRoutes();
                    alt.emit('timerbar', 0,["", "", 0], ["", "", 0], ["", "", 0])
                    alt.emit('jobstart', "");
                    alt.emitServer("jobfinish", price+bonus, rp);
                    
                    let jobnotif = alt.everyTick(()=>{
                        drawtext('DELIVERY COMPLETE',0.5,0.22,4,1.2,0.9,255,255,255,255, 0);
                        drawtext("DELIVERY FEE $"+price+" DELIVERY BONUS $"+bonus,0.5,0.28,4,0.7,0.9,200, 155, 0,255, 0);
                    })
                    minute = 0;
                    second = 60;
                    let restartjob = alt.setInterval(()=>{
                        alt.clearEveryTick(jobnotif);
                        handletext("Go to any warehouse to start another work")
                        clearInterval(restartjob);
                        let truckjob = alt.LocalStorage.get('truckjob');
                    if(!truckjob) {
                        alt.LocalStorage.set('truckjob', 1)
                        alt.LocalStorage.save();
                    } else {
                        alt.LocalStorage.set('truckjob', truckjob+1);
                        alt.LocalStorage.save();
                    }
                    }, 6000)
                }
                alt.on('Truck Driver Work', ()=>{
                    if(trailertime > 0) {
                        alt.clearInterval(trailertime)
                    }
                    if(trailerblip > 0) {
                        native.removeBlip(trailerblip);
                    }
                    if(marker > 0) {
                        alt.clearEveryTick(marker);
                    }
                    if(deliverytime > 0) {
                        alt.clearInterval(deliverytime);
                    }
                    if(timermin > 0) {
                        alt.clearInterval(timermin);
                    }
                    if(timersec > 0) {
                        alt.clearInterval(timersec);
                    }
                    if(destblip > 0) {
                        native.removeBlip(destblip);
                        native.clearAllBlipRoutes();
                    }
                    alt.clearInterval(jobtime);
                    alt.emit('timerbar', 0,["", "", 0], ["", "", 0], ["", "", 0])
                    alt.emit('jobstart', "");
                    deleteMeta('truckjob');
                    setMeta('fixjob', 0);
                    for(let i in jobblips) {
                        native.removeBlip(jobblips[i]);
                        let blips = []
                        jobblips = blips;
                    }
                    let jobnotif = alt.everyTick(()=>{
                        drawtext('DELIVERY CANCELLED',0.5,0.22,4,1.2,0.9,255,255,255,255, 0);
                        drawtext("YOU QUIT THE JOB!",0.5,0.28,4,0.7,0.9,200, 155, 0,255, 0);
                    })
                    minute = 0;
                    second = 60;
                    let restartjob = alt.setInterval(()=>{
                        alt.clearEveryTick(jobnotif);
                        clearInterval(restartjob);
                    }, 6000);
                })              
            },1000)
        }}
    }, 500);
}

function delivertime() {
    timermin = alt.setInterval(()=>{
        minute -= 1;
        fakemin -= 1;
        if(fakemin == 0) {
            minute = 0;
          clearInterval(timermin);
        }
      }, 60000)
    timersec = alt.setInterval(()=>{
      if(second == 0) {
        second = 60;
      }
        second -= 1;
      if(fakemin == 0 && second == 0) {
        alt.clearInterval(timersec);
      }
     },1000)
}

