import alt, { setMeta } from 'alt-client';
import * as native from 'natives';
import { ammujob } from './ammujob.js';
import { busjob } from './busjob.js';
import { trevorjob } from './clubjob.js';
import { fireman } from './fireman.js';
import { postmailjob } from './kurirpos.js';
import { taxidriverjob } from './taxijob.js';
import { towingjob } from './towing.js';
import { truckjob } from './trucking.js';

const randomjobs = [
    'weed',
    'repo1',
    'ammujob',
]

let pedjobs = []

export const peds = [
  0x445AC854, 0xD172497E, 0x7E0961B8, 0xBE086EFD, 0x2799EFD8,  0x7E6A64B7, 0x31430342, 0xB3B3F5E6, 0xAD9EF1BB, 0x04430687, 
  0x7E4F763F,    0x51C03FA4, 0x3F789426, 0xDE0E0969,0x03B8C510, 0xFFE63677, 0x87B25415, 0x8BD990BA, 0x5B81D86C, 0x20C8012F, 0xB7C61032
]

const jobs =[
  {name: "Taxi Work", code: "taxijob"}
]

alt.onServer('setjob', ()=>{
    let name = alt.Player.local.name;
    startjob()
    alt.emitServer('jobready', name);
    setMeta('fixjob', 0)
});

let jobinterval;

function startjob(){
    jobinterval = alt.setInterval(()=>{
      let job = randomjobs[native.getRandomIntInRange(0, randomjobs.length-1)];
      alt.emitServer('startjob', job);
      alt.clearInterval(jobinterval);
    }, 60000*10)
  }
  
alt.on('stopjob', (player)=>{
    alt.clearInterval(jobinterval);
})

let activejob;

alt.on('TaxiWork', ()=>{
  setMeta('fixjob', 1)
  taxidriverjob()
})

alt.on('BusWork', ()=>{
  setMeta('fixjob', 1)
  busjob();
})

alt.on('TruckWork', ()=>{
 setMeta('fixjob', 1)
  truckjob()
})

alt.on('TowJob', ()=>{
  setMeta('fixjob', 1)
towingjob();
})

alt.on('PostJob', ()=>{
  setMeta('fixjob', 1)
postmailjob();
})

alt.on('FiremanWork', ()=>{
  setMeta('fixjob', 1);
  fireman()
})

trevorjob()

alt.onServer('ammujob', ammujob)


alt.onServer('chasecar', (playerid, veh, h, ped, weap)=>{
  native.requestModel(ped);
  native.setEntityHeading(veh);
  let chase = alt.setTimeout(()=>{
    alt.clearTimeout(chase);
    chasecar(veh, ped, 0, weap)
    chasecar(veh, ped, -1, weap)
  }, 3000)
})

function chasecar(veh, ped, seat, weap) {
   
  let cped = alt.setInterval(()=>{
      alt.clearInterval(cped);
      native.setVehicleEngineOn(veh, true, true, false)
      let mw = native.createPedInsideVehicle(veh, 6, ped, seat, false, false);
            native.setPedCanRagdoll(mw, true);
              native.giveWeaponToPed(mw, weap, 900, false, true);
      let mwblip = native.addBlipForEntity(mw)
          native.setBlipAsFriendly(mwblip, false);
          native.setBlipScale(mwblip, 0.8);
          native.setBlipFlashes(mwblip, true);

          pedjobs.push(mw);  
      
      if(seat == -1) {
          native.setDriverAbility(mw, 1.0);
          native.taskVehicleFollow(mw, veh, alt.Player.local.scriptID, 110, 1074528293, 0);
          native.taskVehicleChase(mw, alt.Player.local.scriptID);
          
      } else {
          native.setEntityIsTargetPriority(alt.Player.local.scriptID, true, 0);
          native.taskVehicleShootAtPed(mw, alt.Player.local.scriptID, 0.9);
          native.taskCombatPed(mw, alt.Player.local.scriptID, 0, 16); 
          //native.taskShootAtEntity(mw, alt.Player.local.scriptID, 10000,7)
      }
      native.setPedTargetLossResponse(mw, 1);
    }, 300)
}

export function addmissionped(ped) {
  pedjobs.push(ped);
}

export function removemissionped() {
  for(let i in pedjobs) {
    if(pedjobs[i]) {
      native.deleteEntity(pedjobs[i])
    }
  }
  pedjobs = []
}

export function canceljob(_job) {
  let job = randomjobs[native.getRandomIntInRange(0, _job - 1)];
  alt.emitServer('startjob', job);
}

export function handletext(text) {
    native.beginTextCommandDisplayHelp("STRING");
    native.addTextComponentSubstringKeyboardDisplay(text);
    native.endTextCommandDisplayHelp(0, 0, true, -1);
};

export function drawtext(msg, x, y, font, scale, wrap, r, g, b, a, j) {
  native.beginTextCommandDisplayText('STRING');
  native.addTextComponentSubstringPlayerName(msg);
  native.setTextFont(font);
  native.setTextScale(1, scale);
  native.setTextWrap(0.0, wrap);
  native.setTextCentre(true);
  native.setTextColour(r,g,b,a);
  //native.setTextOutline();
  native.setTextJustification(j);
  native.setTextDropShadow(true);
  native.endTextCommandDisplayText(x, y, 0);
}

let object;

export function attach(entity, xpos, ypos, zpos, xrot, yrot, zrot){

  if(object > 0) {
    native.deleteObject(object);
  }
  let player = alt.Player.local.scriptID;
  native.setCurrentPedWeapon(player, 0xA2719263, true);
  let bone = native.getPedBoneIndex(player, 0x8cbd);
  let pos = native.getPedBoneCoords(player, 0x8cbd, 0,0,0);
  object = native.createObject((alt.hash(entity)), pos.x, pos.y, pos.z, false, false, true);
  native.attachEntityToEntity(object, player, bone, xpos, ypos, zpos,xrot, yrot, zrot, false, true, false, true, 1, true, 0 );
 // let burinterval = alt.setInterval(() => {
   // let sit = native.isPedInAnyVehicle(alt.Player.local.scriptID, false);
   // if(sit == true) {
     // alt.clearInterval(burinterval);
     // native.deleteObject(object);
   // }
 // },1000);
 native.setModelAsNoLongerNeeded(alt.hash(entity))
}

export function deleteobj() {
  if(object) {
    native.deleteObject(object);
  }
}
export function playanim(animdict, animname){
  native.requestAnimDict(animdict);
    let interval = alt.setInterval(() => { 
        if (native.hasAnimDictLoaded(animdict)) {
            alt.clearInterval(interval);
            native.taskPlayAnim(alt.Player.local.scriptID, animdict, animname, 8.0, 1, 3000, 49, 1, false, false, false);
            if(object > 0) {
              native.deleteEntity(object);
            }
        }
}, 0);
}

export function setclothes(compid, drawid, textid) {
  native.setPedComponentVariation(alt.Player.local.scriptID, compid, drawid, textid, 0);
}