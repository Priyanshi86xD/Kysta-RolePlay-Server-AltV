import * as alt from 'alt-client';
import * as native from 'natives';
import { drawtext, removemissionped } from './client.js';


const bunker = [
    {x: -755.2523193359375, y: 5943.52734375, z: 19.877212524414062, x1: -746.614990234375,y1: 5945.5927734375,z1: 19.092355728149414, h:286.05670166015625,     x2: -784.4200439453125,  y2: 5934.4990234375, z2: 23.910856246948242}, //paleto
    {x: -389.1861877441406, y: 4340.66552734375, z: 56.16859817504883,x1: -387.7176513671875, y1: 4334.43115234375, z1: 55.43854522705078, h:187.77915954589844,   x2: -393.0851135253906,y2: 4367.0693359375, z2: 58.135799407958984}, //raton
    {x: 1801.2689208984375, y: 4705.705078125, z: 39.79388427734375, x1: 1796.849365234375,  y1: 4704.7744140625, z1: 39.779197692871094, h:96.10829162597656,     x2: 1828.9178466796875,  y2: 4707.740234375,  z2: 41.935970306396484}, //grapeseed
  ]
  
  const delivery = [
    { x: -1328.592896, y: -387.114410, z: 36.126881}, 
    { x: -665.232727, y: -952.522522, z: 20.866556}, 
    { x: 844.439026, y: -1009.422424, z: 27.511728}, 
    { x: 17.377790, y: -1122.183105, z: 28.469843}, 
    { x: 814.442017, y: -2130.448486, z: 28.867798}, 
  ]
  
  let dest;
  let carpos;
  let bunkblip



export function ammujob() {

    ammujobstart();

}

function ammujobstart() {
  native.activateInteriorEntitySet(258561, 'bunker_style_a');
  native.activateInteriorEntitySet(258561, 'upgrade_bunker_set');
  native.activateInteriorEntitySet(258561, 'security_upgrade');
  native.activateInteriorEntitySet(258561, 'office_upgrade_set');
  native.activateInteriorEntitySet(258561, 'Gun_schematic_set');
  
    dest = delivery[native.getRandomIntInRange(0,delivery.length-1)];
    carpos = bunker[native.getRandomIntInRange(0, bunker.length-1)];
  
    native.playSound(0, "Event_Start_Text", "GTAO_FM_Events_Soundset", true, 0 ,false)
    if(alt.hasMeta('mission')) {} else {
      let weedinfo = alt.everyTick(()=>{
        drawtext('AMMUNATION CONTRACT',0.5,0.25,4,1.3,0.9,255,255,255,255,0);
        drawtext('~y~GO TO UNDERGROUND BUNKER TO START THE JOB!~y~',0.5,0.32,4,0.7,0.9,255, 255, 255,255,0);
      })
      alt.emitServer('ammujobnotif');
      let info = alt.setInterval(()=>{
        alt.clearEveryTick(weedinfo);
        alt.clearInterval(info);
      }, 5000);
    }
    alt.emit('notif', '~r~Ammunation Contract ~w~go to the Bunker to start the job')    
  
    bunkblip = native.addBlipForCoord(carpos.x, carpos.y, carpos.z);
    native.setBlipSprite(bunkblip, 557);
    native.setBlipColour(bunkblip, 5);
    native.setBlipFlashes(bunkblip, true);
    native.setBlipAsShortRange(bunkblip, false);
    bunkerpos();
  }
  
  function bunkerpos() {
    let ammucount = alt.everyTick(()=>{
      let ammupos = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, carpos.x, carpos.y, carpos.z, true);
      if(ammupos <= 50) {
        native.drawMarker(1, carpos.x, carpos.y, carpos.z-1, 0,0,0,0,0,0,1,1,1,0,100,200,100,0,0,0,0,0,0,0);
      if(ammupos <= 1) {
        alt.clearEveryTick(ammucount);
        bunkerdoor()
        outpos = {x:carpos.x1, y:carpos.y1, z:carpos.z1-1, h:carpos.h}
        let enter = alt.setInterval(()=>{
          alt.clearInterval(enter);
        }, 5000);
      }}
    })
  }
  
  function bunkerdoor() {
    let pos = alt.Player.local.pos;
    native.doScreenFadeOut(0);
    let bunkerClosedDoor = native.getClosestObjectOfType(pos.x, pos.y, pos.z, 50.0, 913755451, 0, 1, 0)
           native.setEntityAlpha(bunkerClosedDoor,0, true)
         native.freezeEntityPosition(bunkerClosedDoor, true)
         native.setEntityCollision(bunkerClosedDoor, false, true)
         let bunkerRotaion = native.getEntityRotation(bunkerClosedDoor, 2)
           let bunkerClosedDoorCoords = native.getEntityCoords(bunkerClosedDoor, false)
           let bunkerHeading = native.getEntityHeading(bunkerClosedDoor)
         native.requestModel(-1855746761)
           let bunkerDoorBottom = native.createObjectNoOffset(-1855746761, bunkerClosedDoorCoords.x, bunkerClosedDoorCoords.y, bunkerClosedDoorCoords.z+1, false, false, false)	   
          native.setEntityRotation(bunkerDoorBottom, bunkerRotaion.x, bunkerRotaion.y, bunkerRotaion.z, 2, true)
          native.setEntityHeading(bunkerDoorBottom, bunkerHeading)		  
          let bunkerDoorBottomCoords = native.getEntityCoords(bunkerDoorBottom, false)
         let bunkerDoorBottomRot = native.getEntityRotation(bunkerDoorBottom, 2)
    native.requestModel(-884803471);
             let bunkerDoorTop = native.createObjectNoOffset(-884803471, carpos.x2, carpos.y2, bunkerDoorBottomCoords.z, false,false, true)
      native.setEntityHeading(bunkerDoorTop, native.getEntityHeading(bunkerDoorBottom))
          let entityRot1 = native.getEntityRotation(bunkerDoorTop, 2)
    
        native.setEntityRotation(bunkerDoorTop, entityRot1.x, entityRot1.y +20, entityRot1.z, 2, 1)
        
          let bunkerMove = 0
          //native.playSound(0, "hangar_doors_loop", "dlc_xm_facility_entry_exit_sounds", true, 0 ,false)
          native.playSoundFrontend(-1, "Door_Open_Limit", "DLC_GR_Bunker_Door_Sounds", true)
          native.doScreenFadeIn(2000);
          native.taskGoStraightToCoord(alt.Player.local.scriptID, carpos.x2, carpos.y2, carpos.z2, 1, 4000, bunkerHeading - 180, 10);
          let bunkeropen = alt.setInterval(()=>{
            if(bunkerMove < 20){	    
            native.setEntityRotation(bunkerDoorTop, entityRot1.x, entityRot1.y +20 - bunkerMove, entityRot1.z, 2, 1)
           bunkerMove += 0.5
            }
           if(bunkerMove >= 16){
            alt.clearInterval(bunkeropen);
            native.doScreenFadeOut(1000);
            enterbunker(outpos);
            let doorfinish = alt.setInterval(()=>{
              native.setEntityAlpha(bunkerClosedDoor,255, true)
            native.freezeEntityPosition(bunkerClosedDoor, false)
            native.setEntityCollision(bunkerClosedDoor, true, true)
            native.deleteEntity(bunkerDoorTop)
            native.deleteEntity(bunkerDoorBottom)
            alt.clearInterval(doorfinish);
            }, 2000);
           }
          }, 100);
      
  }
  
  let amuveh;
  let outpos;
  let bunkint;
  let carblip;
  let weapbox;
  
  const bunkp = [
    {t:'exit',   x: 894.6420288085938,  y: -3245.758056640625,  z: -98.25834655761719},
  ]
  function enterbunker(pos) {
    
    let enter = alt.setInterval(()=>{
      //alt.emitServer('ammujobset');
      native.setEntityCoords(alt.Player.local.scriptID, 890.5518,-3246.038, -99.04907, 0,0,0,1 ); 
      native.requestModel(alt.hash('dloader'));
      alt.clearInterval(enter);
    }, 2000);
    let setjob = alt.setInterval(()=>{

      alt.emitServer('ammujobstart', dest, carpos);
      native.doScreenFadeIn(3000);
      alt.clearInterval(setjob);
      
    }, 3500);
    for(let i in bunkp) {
    bunkint = alt.everyTick(()=>{
        native.drawMarker(1, bunkp[i].x, bunkp[i].y, bunkp[i].z-1, 0,0,0,0,0,0,1,1,1,0,100,200,50,0,0,0,0,0,0,0);
      let bunkpos = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, bunkp[i].x, bunkp[i].y, bunkp[i].z, true);
      if(bunkpos < 1) {
        alt.clearEveryTick(bunkint);
        //native.playSound(-1, "Door_Open_Long", "DLC_GR_Bunker_Door_Sounds",  true, 0 ,false)
        native.doScreenFadeOut(2000);
        let out = alt.setInterval(()=>{
        native.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z, 0,0,0,1);
        native.doScreenFadeIn(2000);
        alt.emitServer('outbunker')
        native.deleteEntity(weapbox);
        alt.clearInterval(out);
        ammujob();
      }, 3000);
      }})
    }
  }
  
  alt.onServer('ammujobinfo', (veh, h)=>{
    amuveh = veh;
    native.setEntityInvincible(veh, true);
    let heading = alt.setInterval(()=>{
      native.setEntityHeading(veh, h);
          let bone = native.getEntityBoneIndexByName(veh, 'carriage');
          weapbox = native.createObject(alt.hash('gr_prop_gr_rsply_crate04b'),883.2544555664062, -3241.15625, -99.56831359863281, false, false, false);
      native.attachEntityToEntity(weapbox, veh, bone,0,-1.4,0.38,0,0,90,false, true, true, false, 1, true, 0);
      carblip = native.addBlipForEntity(veh);
      native.setBlipSprite(carblip, 750);
      native.setBlipColour(carblip, 3);
      alt.clearInterval(heading);
    }, 300);
  })
  
  alt.onServer('ammujobdeliver', (veh)=>{
    //handletext("~INPUT_PICKUP~ to Deliver Packet");
    amuveh = veh;
    native.doScreenFadeOut(2000);
    let startdelivery = alt.setInterval(()=>{
      native.playSoundFrontend(-1, "Enter_Car_Ramp_Deploy", "DLC_GR_MOC_Enter_Exit_Sounds", true)
    native.setEntityCoords(alt.Player.local.scriptID, outpos.x, outpos.y, outpos.z, 0,0,0,1)
    native.setEntityCoords(veh, outpos.x, outpos.y, outpos.z, 0,0,0,1)
    native.setEntityHeading(veh, outpos.h);
    native.setPedIntoVehicle(alt.Player.local.scriptID, veh, -1);
    native.freezeEntityPosition(veh, false);
    native.setEntityInvincible(veh, false);
    alt.clearEveryTick(bunkint);
    native.doScreenFadeIn(2000);
    alt.clearInterval(startdelivery);
    sendpacket(veh);
    delivertime();
  }, 3000);
  })
  
  let timermin, timersec, minute = 14 , second = 60 , destination;
  
  function sendpacket(veh) {
    native.removeBlip(bunkblip);
    destination = native.addBlipForCoord(dest.x, dest.y, dest.z);
    native.setBlipRoute(destination, true);
    //native.setRadioToStationName("RADIO_04_PUNK");
    native.prepareMusicEvent("BKR_RESCUE_CONTACT_POLICE_START")
    native.triggerMusicEvent("BKR_RESCUE_CONTACT_POLICE_START")
    native.deactivateInteriorEntitySet(258561, 'bunker_style_a');
    native.deactivateInteriorEntitySet(258561, 'upgrade_bunker_set');
    native.deactivateInteriorEntitySet(258561, 'security_upgrade');
    native.deactivateInteriorEntitySet(258561, 'office_upgrade_set');
    native.deactivateInteriorEntitySet(258561, 'Gun_schematic_set');
    let merryw = alt.setInterval(()=>{
      let pos = alt.Player.local.pos;
      let h = native.getEntityHeading(alt.Player.local.scriptID);
      alt.emitServer('rivalchase', pos, h, 'mesa3', 0x613E626C, "AC ", 0x13532244);
      alt.clearInterval(merryw);
    }, 30000);
    let deliver = alt.everyTick(()=>{
      let carhealth = native.getVehicleEngineHealth(veh);
      let carcond = native.isEntityInWater(veh);
      if(carcond == true) {
        native.setVehicleEngineHealth(veh, -2000);
      }
      if(carhealth <= 0) {
        alt.clearEveryTick(deliver);
        alt.clearInterval(timermin);
        alt.clearInterval(timersec);
        ammujobfail();
      }
      if(minute == 0 && second == 0) {
        alt.clearEveryTick(deliver);
        ammujobfail();
      }
      let jarakdeliver = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, dest.x, dest.y, dest.z,true);
      if(jarakdeliver < 50) {
        native.drawMarker(1, dest.x, dest.y, dest.z-0.5, 0,0,0,0,0,0,3,3,2,0,100,200,200,0,0,0,0,0,0,0);
      if(jarakdeliver < 2) {
        if(alt.Player.local.vehicle == veh) {
        alt.clearEveryTick(deliver);
        alt.clearInterval(timermin);
        alt.clearInterval(timersec);
        native.triggerMusicEvent('GLOBAL_KILL_MUSIC');
        alt.emitServer('ammujobfinish');
        removemissionped()
        native.playSound(0, "package_delivered_success", "DLC_GR_Generic_Mission_Sounds", true, 0 ,false)
        native.freezeEntityPosition(veh, true);
        alt.emit('timerbar', 0,["", "", 0], ["", "", 0], ["", "", 0])
        native.taskLeaveVehicle(alt.Player.local.scriptID, veh, 1);
        native.setVehicleDoorsLockedForAllPlayers(veh, true);
          native.clearAllBlipRoutes()
          native.removeBlip(carblip);
            native.removeBlip(destination);
            native.removeBlip(bunkblip);
        let weedinfo = alt.everyTick(()=>{
          drawtext('~y~JOB COMPLETE~y~',0.5,0.25,7,1.6,1.0,255,0,0,255,0);
          drawtext('WEAPON DELIVERED! YOU GOT $ 30000',0.5,0.32,4,0.7,0.9,255, 255, 255,255,0);
        })
        let info = alt.setInterval(()=>{
          native.deleteEntity(weapbox);
          alt.clearEveryTick(weedinfo);
          alt.clearInterval(info);
          alt.LocalStorage.set('ammujob', 1);
          alt.LocalStorage.save();
        }, 5000);
      } else {}
    }
  }})
  }
  
  function ammujobfail() {
        
        native.triggerMusicEvent('GLOBAL_KILL_MUSIC');
        native.playSound(0, "ScreenFlash", "MissionFailedSounds", true, 0 ,false)
        alt.emit('timerbar', 0, ["", "", 0], ["", "", 0], ["", "", 0])
        native.clearAllBlipRoutes();
          native.removeBlip(carblip);
          native.removeBlip(destination);
          native.removeBlip(bunkblip);
          alt.emitServer('ammujobfail');
          removemissionped()
          let weedinfo = alt.everyTick(()=>{
            drawtext('~y~JOB FAILED~y~',0.5,0.25,7,1.6,1.0,255,0,0,255,0);
            drawtext('VEHICLE WAS DESTROYED',0.5,0.32,4,0.7,0.9,255, 255, 255,255,0);
          })
          let info = alt.setInterval(()=>{
            native.deleteEntity(weapbox);
            alt.clearEveryTick(weedinfo);
            alt.clearInterval(info);
          }, 5000)
  }
  
  function delivertime() {
    timermin = alt.setInterval(()=>{
        minute -= 1;
        if(minute == 0) {
          clearInterval(timermin);
        }
      }, 60000)
    timersec = alt.setInterval(()=>{
      if(second == 0) {
        second = 60;
      }
        second -= 1;
      if(minute == 0 && second == 0) {
        alt.clearInterval(timersec);
      }
      alt.emit('timerbar', 1,["TIME REMAINING", String(minute).padStart(2, '0')+":"+String(second).padStart(2, '0'), 140], ["", "", 0], ["", "", 0])
      },1000)
    }