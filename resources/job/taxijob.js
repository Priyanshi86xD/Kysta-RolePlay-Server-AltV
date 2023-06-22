import * as alt from 'alt-client';
import { deleteMeta, getMeta, setMeta } from 'alt-shared';
import { addBlipForCoord, addBlipForEntity, clearAllBlipRoutes, createPed, drawMarker, drawRect, getDistanceBetweenCoords, getEntityCoords, getPositionBySideOfRoad, getRandomIntInRange, getRandomPedAtCoord, getRoadBoundaryUsingHeading, getZonePopschedule, isEntityDead, isPedInAnyTaxi, isPedInVehicle, isPedTryingToEnterALockedVehicle, playPedAmbientSpeechNative, playPedAmbientSpeechWithVoiceNative, playSound, preloadScriptPhoneConversation, removeBlip, requestModel, setBlipColour, setBlipRoute, setBlipSprite, setEntityInvincible, setGpsDisabledZone, setModelAsNoLongerNeeded, setPedAllowVehiclesOverride, setPedCanRagdoll, setPedCanTorsoVehicleIk, setPedFleeAttributes, setPedIsIgnoredByAutoOpenDoors, setPedVehicleForcedSeatUsage, setRadarZoom, setRadarZoomToDistance, setRoadsInArea, startAudioScene, startPreloadedConversation, startScriptConversation, startScriptPhoneConversation, taskEnterVehicle, taskGoToEntity, taskLeaveVehicle, taskOpenVehicleDoor, taskStartScenarioInPlace, taskTurnPedToFaceEntity, taskWanderStandard, taskWarpPedIntoVehicle } from 'natives';
import { addmissionped, drawtext, handletext, peds } from './client.js';
import { removemissionped } from './client.js';



const destinations = [
    {x: 1170.066650390625,y: 1808.7525634765625,z: 74.51216888427734},
    {x: 1306.81005859375, y: 1103.03369140625,  z: 105.62620544433594},
    {x: 920.677490234375, y: 49.4031867980957, z: 80.89842987060547},
    {x: 990.9789428710938,y: -544.03955078125, z: 59.68771743774414},
    {x: 1223.0673828125, y: -1373.3468017578125,  z: 35.04416275024414},
    {x: 1534.2235107421875,  y: -2062.37109375, z: 77.228515625},
    {x: 800.79296875,  y: -3025.6259765625,  z: 5.742122173309326},
    {x: 154.2542266845703,  y: -2614.23486328125,  z: 6.014929294586182},
    {x: -1020.3894653320312,  y: -2730.5849609375,  z: 13.682942390441895},
    {x: -445.0110778808594,        y: -2161.314453125,        z: 10.256553649902344},
    {x: -1123.880859375,        y: -1522.005859375,        z: 4.280231952667236},
    {x: -929.7342529296875,        y: -1197.8853759765625,        z: 5.089959621429443},
    {x: -722.9762573242188,        y: -954.3998413085938,        z: 18.291189193725586},
    {x: 293.476, y:-590.163, z:42.7371},
    {x: 253.404,y:-375.86,z:44.0819},
    {x: 120.808,y:-300.416,z:45.1399},
    {x: -38.4132,y:-381.576,z:38.3456},
    {x: -107.442,y:-614.377,z:35.6703},
    {x: -252.292,y:-856.474,z:30.5626},
    {x: -236.138,y:-988.382,z:28.7749},
    {x: -276.989,y:-1061.18,z:25.6853},
    {x:  -576.451,y:-998.989,z:21.785},
    {x: -602.798,y:-952.63,z:21.6353},
    {x: -790.653,y:-961.855,z:14.8932},
    {x: -912.588,y:-864.756,z:15.0057},
    {x: -1069.77,y:-792.513,z:18.8075},
    {x: -1306.94,y:-854.085,z:15.0959},
    {x: -1468.51,y:-681.363,z:26.178},
    {x: -1380.89,y:-452.7,z:34.0843},
    {x: -1326.35,y:-394.81,z:36.0632},
    {x: -1383.68,y:-269.985,z:42.4878},
    {x: -1679.61,y:-457.339,z:39.4048},
    {x: -1812.45,y:-416.917,z:43.6734},
    {x: -2043.64,y:-268.291,z:22.9927},
    {x: -2186.45,y:-421.595,z:12.6776},
    {x: -1862.08,y:-586.528,z:11.1747},
    {x: -1859.5,y:-617.563,z:10.8788},
    {x: -1634.95,y:-988.302,z:12.6241},
    {x: -1283.99,y:-1154.16,z:5.30998},
    {x: -1126.47,y:-1338.08,z:4.63434},
    {x: -867.907,y:-1159.67,z:5.00795},
    {x: -847.55,y:-1141.38,z:6.27591},
    {x:  -722.625,y:-1144.6,z:10.2176},
    {x: -575.503,y:-318.446,z:34.5273},
    {x: -592.309,y:-224.853,z:36.1209},
    {x: -559.594,y:-162.873,z:37.7547},
    {x: -534.992,y:-65.6695,z:40.634},
    {x: -758.234,y:-36.6906,z:37.2911},
    {x: -1375.88,y:20.9516,z:53.2255},
    {x: -1320.25,y:-128.018,z:48.097},
    {x: -1285.71,y:294.287,z:64.4619},
    {x: -1245.67,y:386.533,z:75.0908},
    {x: -760.355,y:285.015,z:85.0667},
    {x: -626.786,y:254.146,z:81.0964},
    {x: -563.609,y:267.962,z:82.5116},
    {x: -486.806,y:271.977,z:82.8187},
    {x: 88.295,y:250.867,z:108.188},
    {x: 234.087,y:344.678,z:105.018},
    {x: 434.963,y:96.707,z:99.1713},
    {x: 482.617,y:-142.533,z:58.1936},
    {x: 762.651,y:-786.55,z:25.8915},
    {x: 809.06,y:-1290.8,z:25.7946},
    {x: 490.819,y:-1751.37,z:28.0987},
    {x: 432.351,y:-1856.11,z:27.0352},
    {x: 164.348,y:-1734.54,z:28.8982},
    {x: -57.6909,y:-1501.4,z:31.1084},
    {x: 52.2241,y:-1566.65,z:29.006},
    {x: 310.222,y:-1376.76,z:31.4442},
    {x: 181.967,y:-1332.79,z:28.8773},
    {x: -74.6091,y:-1100.64,z:25.738},
    {x: -887.045,y:-2187.46,z:8.13248},
    {x: -749.584,y:-2296.59,z:12.4627},
    {x: -1064.83,y:-2560.66,z:19.6811},
    {x: -1033.44,y:-2730.24,z:19.6868},
    {x: -1018.67,y:-2732,z:13.2687},
    {x:  797.354,y:-174.423,z:72.708},
    {x: 508.156, y:-117.908,z: 60.780},
    {x: 159.458,y: -27.555, z:67.380},
    {x: -36.382,y: -106.912,z: 56.982},
    {x: -355.801,y: -270.404,z: 33.011},
    {x: -831.196, y:-76.871, z:37.323},
    {x: -1038.707, y:-214.593, z:37.437},
    {x: 1918.448, y:3691.410, z:32.261},
    {x: 1820.217, y:3697.115,z: 33.493},
    {x: 1619.323, y:3827.162,z: 34.482},
    {x:  1418.628,y: 3602.243,z: 34.511},
    {x: 1944.858, y:3856.252, z:31.741},
    {x: 2285.278, y:3839.444, z:34.023},
    {x: 2760.945, y:3387.813,z: 55.659},
    {x: 1952.819, y:2627.731, z:45.368},
    {x: 1051.414, y:474.833,z: 93.653},
    {x: 866.393,y: 17.635, z:78.654},
    {x: 318.985, y:167.410, z:103.335},
    {x: 88.836,y: 254.054,z: 108.236},
    {x:  -44.852,y: 70.414, z:72.437},
    {x:  -115.496, y:84.333,z: 70.792},
    {x: -384.806, y:226.868,z:83.548},
    {x: -578.669, y:139.085, z:61.337},
    {x: -651.334, y:-584.879, z:34.116},
    {x: -571.847,y: -1195.648,z: 17.869},
    {x: -1513.271,y: -670.039,z: 28.362},
    {x: -1297.484, y:-654.913, z:26.123},
    {x: -1645.546,y: 144.571,z: 61.664},
    {x: -1160.618,y: 744.418,z: 154.571},
    {x: -798.090, y:831.699,z: 204.351},
]

export function taxidriverjob () {
    let cabco = addBlipForCoord( 895.5653076171875, -179.51722717285156, 74.70035552978516)
    setBlipSprite(cabco, 198);
    setBlipColour(cabco, 5);
    alt.emit('jobstart', "Go to ~y~Downtown Cab-Co~w~ to start the job")
    setMeta('taxijob', 0)
    taxijobs();
}
let time;
let wait;
let taxi = 0;
let taxiearn = 0;
let pedblip;
let dest;
let cab = 0, pedmodel, taxiwork = 0

alt.on('taxijobnotif', ()=>{
    let taxijob = getMeta('taxiwork')
    let work = getMeta('activejob');
    let taxiwork = getMeta('taxijob')
    if(work == "Taxi Work") {}
    else {
   // alt.log('taxi', taxijob)
    if(!taxijob) { } else {
        if(taxijob > 0) {
            setMeta('taxijob', 2);
            handletext("~INPUT_SPECIAL_ABILITY_SECONDARY~ Start taxi job")
        }
    }
    if(taxiwork == 2) {
        //setMeta('taxijob', 1);
        taxiworkstart()
    }
}
})

function taxijobs() {
    time = alt.everyTick(()=>{
        let pos = alt.Player.local.pos;
        let dist = getDistanceBetweenCoords(pos.x, pos.y, pos.z, 895.5653076171875, -179.51722717285156, 74.70035552978516, true);
        if(dist < 100) {
            drawMarker(1, 895.5653076171875, -179.51722717285156, 74.70035552978516-1, 0,0,0,0,0,0, 0.8,0.8,1, 0,80,120,150,0,0,0,0,0,0,0)
            if(cab == 0) {
                cab += 1;
                alt.emitServer('createcar', "taxi","CAB ", 915.60107421875,-170.33885192871094, 73.86458587646484, 273.15740966796875)
            } else {}
        } else {}
        if(dist <= 1) {
            let taxijob = getMeta('taxijob');
            if(taxijob == 0) {
                handletext("~INPUT_PICKUP~ Start taxi job")
                setMeta('taxijob', 1);
                alt.emit('jobstart', "")
            } else {}
        } else {
            let taxijob = getMeta('taxijob');
            if(taxijob == 1) {
                setMeta('taxijob', 0)
            } else {}
        }
        //let taxicab = isPedInAnyTaxi(alt.Player.local.scriptID);
      //  if(taxicab == true) {
          //  let taxijob = getMeta('taxijob');
           // if(taxijob == 2) {
           //     alt.clearEveryTick(time);
           //     taxiworkstart()
        //} else {}
   // }
    });

    alt.on('keydown', (key) => {
        if(key == 'E'.charCodeAt(0)){
            let chat = getMeta('chat');
            if(chat == 1) {}
            else {
                if(taxiwork == 0) {
            let taxijob = getMeta('taxijob');
            
            if(taxijob == 1) {
                alt.emit('jobstart', "Drive a taxi cab");
                setMeta('taxijob', 2);
                if(time > 0) {
                    alt.clearEveryTick(time);
                    time = 0
                }
                
            } else {}
            
        } else {
            let cab = getMeta('cabsignal');
            if(cab == 1) {
                setMeta('cabsignal', 2);
            } else {}
        }
    }
    }
})
}

function taxiworkstart() {
    alt.emit('jobstart', "")
                setMeta('activejob', 'Taxi Work');
                taxiwork = 1;
                playSound(0, "Event_Start_Text", "GTAO_FM_Events_Soundset", true, 0 ,false)
                let jobnotif = alt.everyTick(()=>{
                    drawtext('TAXI WORK',0.5,0.22,4,2,0.9,255,255,255,255,0);
                    drawtext('~y~Take customers to their destinations~y~',0.5,0.32,4,0.7,0.9,255, 255, 255,255,0);
                })
                let stop = alt.setInterval(()=>{
                    alt.clearEveryTick(jobnotif);
                    alt.clearInterval(stop);
                }, 6000);
                taxijobrun();
}



alt.on('keydown', (key) => {
    if(key == 'B'.charCodeAt(0)){
        let chat = getMeta('chat');
        if(chat == 1) {}
        else {
            if(taxiwork == 0) {
        let taxijob = getMeta('taxijob');
        if(taxijob == 2) {
            let taxis = alt.setInterval(()=>{
                taxiworkstart();
                alt.clearInterval(taxis);
            }, 3000);
        } else {}
    }
    }}
})

function taxijobrun() {
    const location = [
        {x:alt.Player.local.pos.x+100, y:alt.Player.local.pos.y, z:alt.Player.local.pos.z},
        {x:alt.Player.local.pos.x+100, y:alt.Player.local.pos.y+100, z:alt.Player.local.pos.z},
        {x:alt.Player.local.pos.x, y:alt.Player.local.pos.y+100, z:alt.Player.local.pos.z},
        {x:alt.Player.local.pos.x-100, y:alt.Player.local.pos.y, z:alt.Player.local.pos.z},
        {x:alt.Player.local.pos.x, y:alt.Player.local.pos.y-100, z:alt.Player.local.pos.z},
        {x:alt.Player.local.pos.x-100, y:alt.Player.local.pos.y-100, z:alt.Player.local.pos.z},
        {x:alt.Player.local.pos.x, y:alt.Player.local.pos.y+100, z:alt.Player.local.pos.z},
    ]
    
   
    //let pos = location[getRandomIntInRange(0, location.length-1)];
    let pos = alt.Player.local.pos;
    pedmodel = peds[getRandomIntInRange(0,peds.length-1)];
    requestModel(pedmodel);
    alt.emit('requestped', pos, 100, 'taxiped');
    //alt.loadModel(pedmodel);
   // let road = getRoadBoundaryUsingHeading(pos.x, pos.y, pos.z, 0, pos);
   // let croad = getPositionBySideOfRoad(road[1].x, road[1].y, road[1].z, 1, road[1])
   // let peds1 = getRandomPedAtCoord(pos.x, pos.y, pos.z, 100,100,100, 26)
}

alt.on('taxiped', (data)=>{
  //  alt.log(data);
   let peds1 = createPed(5, pedmodel, data.x, data.y, data.z, 0, false, false);
    setPedCanRagdoll(peds1, true);
    //setPedAllowVehiclesOverride(peds1, true);
    taskStartScenarioInPlace(peds1, "WORLD_HUMAN_STAND_MOBILE", -1, false);
    pedblip = addBlipForEntity(peds1);
    setBlipSprite(pedblip, 792);
    setBlipColour(pedblip, 3);
    alt.emit('jobstart', "Pick up the ~b~customer.")
    setModelAsNoLongerNeeded(pedmodel)
    addmissionped(peds1);
    wait = alt.setInterval(()=>{
        if(time > 0) {
            alt.clearEveryTick(time);
            time = 0
        }
        removeBlip(pedblip);
        alt.emit('jobstart', "Failed to pick customer, wait for another dispatch.")
        let job = alt.setInterval(()=>{
            taxijobrun();
            alt.clearInterval(job);
        }, 7000);
        alt.clearInterval(wait);
        wait = 0;
    }, 60000*5)
    setMeta('cabsignal', 0);
    time = alt.everyTick(()=>{
        let pos1 = alt.Player.local.pos;
        let peds = getEntityCoords(peds1, true);
        let dist = getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, peds.x, peds.y, peds.z, true);
        let dead = isEntityDead(peds1, false);
                       if(dead == true) {
                        if(wait > 0) {
                            alt.clearInterval(wait);
                            wait =0;
                        }
                        if(time > 0) {
                            alt.clearEveryTick(time);
                            time = 0
                        }
                        
                        alt.emit('jobstart', "Customer dead, wait for another dispatch.")
                        let job = alt.setInterval(()=>{
                            taxijobrun();
                            alt.clearInterval(job);
                        }, 5000);
                       }
        if(dist <= 80) {
            drawMarker(2, peds.x, peds.y, peds.z+1.3, 0,0,0,180,0,0, 0.5,0.5,0.5, 113,238,252,100,true,0,0,0,0,0,0);
        }
        if(dist < 7) {
            let cab = getMeta('cabsignal');
            if(cab == 0) {
                removeBlip(pedblip);
            setMeta('cabsignal', 1);
            handletext("~INPUT_PICKUP~ Signal the customer")
            alt.emit('jobstart', "Wait for the ~b~customer ~w~to enter the Taxi.")
            //alt.emitServer('createcar', "taxi","CAB CO", 915.60107421875,-170.33885192871094, 73.86458587646484, 273.15740966796875)
            } else if(cab == 2) {
                setMeta('cabsignal', 3);
                setPedCanTorsoVehicleIk(peds1, true);
                taskGoToEntity(peds1, alt.Player.local.vehicle.scriptID, 4000,4.0, 100, 1073741824, 0)
                taskEnterVehicle(peds1, alt.Player.local.vehicle.scriptID, 15000,1,1.0,1,0);               
            } else {}
                let cust = isPedInAnyTaxi(peds1);
                if(cust == true) {
                    if(time > 0) {
                        alt.clearEveryTick(time);
                        time = 0
                    }
                    alt.clearInterval(wait);
                    wait = 0;
                    playPedAmbientSpeechNative(peds1, "GENERIC_HI", "SPEECH_PARAMS_STANDARD",0 )
                    let pos2 = destinations[getRandomIntInRange(0, destinations.length-1)];
                    let sum = getDistanceBetweenCoords(data.x, data.y, data.z, pos2.x, pos2.y, pos2.z, true);
                    let fare = Math.round(sum*0.1);
                    let tip = Math.round((sum*0.4)+2000);
                    
                    dest = addBlipForCoord(pos2.x, pos2.y, pos2.z);
                    setBlipRoute(dest, true);

                    alt.emit('jobstart', "Drive the customer to their ~y~destination.")
                  alt.emit('timerbar', 1,["TIP", "$ "+tip, 140], ["FARE", "$ "+fare, 140], ["", "", 0])
                    time = alt.everyTick(()=>{
                        let pos3 = alt.Player.local.pos;
                       let dead = isEntityDead(peds1, false);
                       if(dead == true) {
                        if(time > 0) {
                            alt.clearEveryTick(time);
                            time = 0
                        }
                        
                        clearAllBlipRoutes();
                        removeBlip(dest);

                        alt.emit('jobstart', "Customer dead, wait for another dispatch.")
                        let job = alt.setInterval(()=>{
                            taxijobrun();
                            alt.clearInterval(job);
                        }, 5000);
                       }
                        let jarak = getDistanceBetweenCoords(pos3.x, pos3.y, pos3.z, pos2.x, pos2.y, pos2.z, true);
                        if(jarak <= 100) {
                            drawMarker(1, pos2.x, pos2.y, pos2.z-0.8, 1,0,0,0,0,0, 3,3,1, 100,100,0,120,0,0,0,0,0,0,0)
                            if(jarak <= 4) {
                                let driver = isPedInAnyTaxi(alt.Player.local);
                                if(driver == true) {
                                    if(time > 0) {
                                        alt.clearEveryTick(time);
                                        time = 0
                                    }
                                    clearAllBlipRoutes();
                                    removeBlip(dest);
                                    alt.emit('jobstart', "")
                                    playPedAmbientSpeechNative(peds1, "GENERIC_THANKS", "SPEECH_PARAMS_STANDARD",0 )
                                    taskLeaveVehicle(peds1, alt.Player.local.vehicle, 0);
                                    taskWanderStandard(peds1, 0, 10)
                                    alt.emitServer("jobfinish", fare+tip, 30);
                                    playSound(0, "package_delivered_success", "DLC_GR_Generic_Mission_Sounds", true, 0 ,false)
                                    alt.emit('timerbar', 0,["", "", 0], ["", "", 0], ["", "", 0])
                                    taxi += 1
                                    taxiearn += (fare+tip)
                                    let taxijobfinish = alt.LocalStorage.get("taxijob");
                                    let taxijobmoney = alt.LocalStorage.get("taxijobmoney");
                                    handletext("Fare : "+taxi+" Money earn : $ "+taxiearn);
                                    if(taxijobfinish == undefined) {
                                        alt.LocalStorage.set("taxijob", 1);
                                        alt.LocalStorage.set("taxijobmoney", fare+tip);
                                        alt.LocalStorage.save()
                                    } else {
                                        alt.LocalStorage.set("taxijob", taxijobfinish+1);
                                        alt.LocalStorage.set("taxijobmoney", taxijobmoney+(fare+tip));
                                        alt.LocalStorage.save()
                                    }
                                    let job = alt.setInterval(()=>{
                                        taxijobrun();
                                        alt.clearInterval(job);
                                        removemissionped()
                                    }, 7000);
                                }
                            }
                        }
                    });
                }
            }
        },)
})

alt.on('Taxi Work', ()=>{
    if(time > 0) {
        alt.clearEveryTick(time)
    }  else { }
    if(wait > 0) {
        alt.clearInterval(wait);
    }  else {}
    if(pedblip > 0) {
        removeBlip(pedblip)
    } else {}
    if(dest > 0) {
        removeBlip(dest);
    }
    alt.emit('timerbar', 0,["", "", 0], ["", "", 0], ["", "", 0])
    playSound(0, "package_delivered_success", "DLC_GR_Generic_Mission_Sounds", true, 0 ,false)
    clearAllBlipRoutes();
    alt.emit('jobstart', "")
    deleteMeta('taxijob');
    deleteMeta('cabsignal');
    deleteMeta('activejob');
    setMeta('fixjob', 0)
    taxiwork = 0;
    let cab = isPedInAnyTaxi(alt.Player.local.scriptID);
    if(cab == true) {
        taskLeaveVehicle(alt.Player.local.scriptID, alt.Player.local.vehicle.scriptID, 0);
    } else {}
    let jobnotif = alt.everyTick(()=>{
        drawtext('TAXI WORK COMPLETE',0.5,0.22,4,1.8,0.9,255,255,255,255,0);
        drawtext('~y~Fare complete : ~y~'+taxi+'~y~ Money earned : $'+taxiearn,0.5,0.32,4,0.7,0.9,255, 255, 255,255,0);
    })
    let stop = alt.setInterval(()=>{
        alt.clearEveryTick(jobnotif);
        alt.clearInterval(stop);
        handletext("Pres ~INPUT_SPECIAL_ABILITY_SECONDARY~ in a taxi cab to start taxi job")
        removemissionped()
    }, 6000);
   })