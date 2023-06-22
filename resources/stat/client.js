import alt, { deleteMeta, getMeta, hasLocalMeta, hasMeta, setMeta } from 'alt-client'
import { getSyncedMeta } from 'alt-shared';
import * as native from 'natives';


const playFieldCoord = { x: -1212.79, y: -1673.52, z: 7 };
const airportCoord = { x: -1466.79, y: -2507.52, z: 0 };


//let introstat = 0;

alt.on('introscene', ()=>{
        native.requestCutsceneWithPlaybackList("mp_intro_concat", 31, 8);
        native.setCutsceneEntityStreamingFlags('MP_Male_Character', 0, 1);
        alt.emitServer('spawn', playFieldCoord);
        alt.emit('setplayerweapon');
        introcutscene(); 
})

alt.on('cutscene', (name)=>{
    playcutscene(name);
})
function playcutscene(cutsname) {
    native.requestCutscene(cutsname, 8)
    let start = alt.setTimeout(() => {
        let isload = native.hasThisCutsceneLoaded(cutsname)
        if(isload == true) {
            //native.setCutsceneEntityStreamingFlags('MP_Male_Character', 1, 1);
            native.registerEntityForCutscene(alt.Player.local.scriptID, "MP_Male_Character", 0, native.getEntityModel(alt.Player.local.scriptID), 0)
            alt.clearTimeout(start);
            native.startCutscene(0)
        }  
    }, 300);
}


function introcutscene(){
    let interval = alt.setInterval(()=>{
        native.setClockTime(9,0,0)
    const ped = alt.Player.local.scriptID;

let load = native.hasThisCutsceneLoaded("mp_intro_concat")
if(load == false) {}
else {

  native.prepareMusicEvent('GLOBAL_KILL_MUSIC');
  native.prepareMusicEvent('FM_INTRO_START');
  native.doScreenFadeIn(3000);
  native.switchToMultiSecondpart(alt.Player.local.scriptID);
  native.triggerMusicEvent('GLOBAL_KILL_MUSIC');
  native.triggerMusicEvent('FM_INTRO_START');

  native.setCutsceneEntityStreamingFlags("MP_Female_Character" , 0, 1); // disable other gender
  // Unload other gender
    native.registerEntityForCutscene(ped, "MP_Female_Character" , 3, native.getHashKey("mp_m_freemode_01" ), 0);
  
    for (let i = 0; i <= 7; i++) {
        native.setCutsceneEntityStreamingFlags("MP_Plane_Passenger_" + i, 0, 1);
        native.registerEntityForCutscene(0, 'MP_Plane_Passenger_' + i, 3, native.getHashKey('mp_f_freemode_01'), 0);
        native.registerEntityForCutscene(0, 'MP_Plane_Passenger_' + i, 3, native.getHashKey('mp_m_freemode_01'), 0);
      }

      native.newLoadSceneStartSphere(playFieldCoord.x, playFieldCoord.y, playFieldCoord.z, 1000, 0);

native.startCutscene(4);

native.registerEntityForCutscene(ped, "MP_Male_Character" , 0, 0, 0);

let wait = alt.setInterval(()=>{
    native.newLoadSceneStartSphere(airportCoord.x, airportCoord.y, airportCoord.z, 1000, 0);
    native.triggerMusicEvent('GLOBAL_KILL_MUSIC')
    alt.clearInterval(wait);
},22000);

let introfinish = alt.setInterval(()=>{
    alt.emitServer('settime');
    native.doScreenFadeOut(2000);
    alt.clearInterval(introfinish);
    alt.emitServer('motel');
    alt.emitServer("Give:Weapon", 0x1B06D571);
    alt.emitServer('buyweapon',0x1B06D571 );
    alt.emitServer('introvehicle');
    alt.emit('setmoney');
    alt.emit('savetopm', 225,1,8,0,15,0,0,-1)
    alt.emit('savepantm', 26,1);
    alt.emit('saveshoem', 99,1);

let play = alt.setInterval(()=>{
    native.doScreenFadeIn(2000);
    alt.clearInterval(play);
}, 8000);
}, 78000);

}
alt.clearInterval(interval);
}, 7000);
}

alt.onServer('vehheading', (veh)=>{
    let int = alt.setInterval(()=>{
        native.setEntityHeading(veh, 242.09896850585938);
        alt.clearInterval(int);
    },1000);
    
})


alt.on('playcut', playcut)

function playcut(cuts, time) {
   
    native.requestCutscene(cuts, 8);
    let start = alt.setInterval(() => {
         let isload = native.hasThisCutsceneLoaded(cuts)
         if(isload == true) {
             alt.clearInterval(start)
             alt.emit('hidepstat')
             //native.registerEntityForCutscene(alt.Player.local.scriptID, "MP_1", 0, 0, 0);
             native.doScreenFadeIn(1000)
             native.startCutscene(0)
            // native.removeCutscene(cuts)
            let stop = alt.setInterval(()=>{
                alt.clearInterval(stop)
                native.stopCutsceneImmediately()
                native.doScreenFadeOut(0)
                native.removeCutscene()
            }, time)
            let clear = alt.setInterval(()=>{
                alt.clearInterval(clear);
                native.doScreenFadeIn(2000)
                alt.emit('showpstat')
            }, time+4000)
         }
    }, 300)
}


function handletext(text) {
	native.beginTextCommandDisplayHelp("STRING");
	native.addTextComponentSubstringKeyboardDisplay(text);
	native.endTextCommandDisplayHelp(0, 0, true, -1);
};

function handletext2(text1, text2) {
    native.beginTextCommandDisplayHelp("TWOSTRINGS")
    native.addTextComponentSubstringPlayerName(text1)
    native.addTextComponentSubstringPlayerName(text2)
    native.endTextCommandDisplayHelp(0, false, true, -1)
}