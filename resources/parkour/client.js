import * as alt from 'alt-client';
import * as native from 'natives';
import { parkour1, parkour2, parkour3, parkour4, parkour5, parkour6, parkour7 } from './parkours.js';
import { getMeta, setMeta } from 'alt-shared';

const parkours = [
    parkour1, parkour2, parkour3, parkour4, parkour5, parkour6, parkour7
]
const menu = [
    {type: 1, worktype: 'Parkour 1', job:""},
    {type: 2, worktype: 'Parkour 2', job:""},
    {type: 3, worktype: 'Parkour 3', job:""},
    {type: 4, worktype: 'Parkour 4', job:""},
    {type: 5, worktype: 'Parkour 5', job:""},
    {type: 6, worktype: 'Parkour 6', job:""},
    {type: 7, worktype: 'Parkour 7', job:""},
]
let props = [], marker=0, course, host = 0, pmenu = 0


alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
        let parkour = getMeta('parkour');
        if(parkour == 1){ 
                alt.emit('createmenu', "Select Course","parkour", menu)

        }
    }

})

alt.on('parkour', (type)=>{
    if(host == 0) {
        alt.emitServer('startparkour', type-1);
    }
})

alt.onServer('setparkour', (data, player)=>{
    if(alt.Player.local.id == player.id) {
        startparkour(parkours[data], data+1);
        //course = data
        host = 1;
    } else {
        alt.emit('notif', '~b~'+player.name+" ~w~invite you to parkour challenge");
        setMeta('joinparkour', {type: data, host: player.name})
        course = data
        let join = alt.setInterval(()=>{
            handletext("Open Player Menu ~INPUT_INTERACTION_MENU~ to accept the challenge")

            alt.clearInterval(join);
        }, 3000);
    }
    
})

alt.on('joinparkour', ()=>{
    alt.emitServer('parkourjoin', course)
    startparkour(parkours[course], course+1);
})


function startparkour(course, type) {
    alt.emit('hidepstat');
    native.switchToMultiFirstpart(alt.Player.local.scriptID, 0, 2);
    props = []
    
    let pos1
    let pos2 = course[0].position
    
        for(let i in course) {
            if(course[i].type == 'prop') {
            native.requestModel(course[i].prop);
            let set = alt.setInterval(()=>{
                let prop = native.createObjectNoOffset(course[i].prop, course[i].position.x, course[i].position.y, course[i].position.z, false, false, course[i].dynamic);
                props.push(prop);
                native.setEntityRotation(prop, course[i].rotation.x, course[i].rotation.y, course[i].rotation.z, 2, true);
                native.setEntityQuaternion(prop, course[i].quaternion.x, course[i].quaternion.y, course[i].quaternion.z, course[i].quaternion.w);
                native.setEntityHasGravity(prop, false);
                native.setObjectPhysicsParams(prop, 0, 0,0,0,0,0,0,0,0,0,0);
                //native.freezeEntityPosition(prop, true);
                alt.clearInterval(set);
            }, 300);
        } else if(course[i].type == 'vehicle') {
            if(host == 1) {
                alt.emitServer('parkourcar', course[i], type)
            }
        } else if(course[i].type == 'finish') {
            pos1 = course[i].position
            //alt.emit('marker2', 5, course[i].position.x, course[i].position.y, course[i].position.z+1.5,2,2,2,255,0,155,100,0)
    
            if(host == 1) {
                alt.emitServer('courseready', type);
            }
            let switcin = alt.setInterval(()=>{
                native.setEntityCoords(alt.Player.local.scriptID, course[0].position.x, course[0].position.y, course[0].position.z+2, 0,0,0,true);
                native.switchToMultiSecondpart(alt.Player.local.scriptID);
                alt.clearInterval(switcin);
                native.requestNamedPtfxAsset("proj_indep_firework");
                
                let isready = alt.setInterval(()=>{
                    alt.emit('marker', 1, course[i].position.x, course[i].position.y, course[i].position.z-1,4,4,1,255,0,155,70)
                    native.playSound(-1, "Event_Start_Text","GTAO_FM_Events_Soundset", 1,0,1);
                    notif('~b~PARKOUR CHALLENGE~b~', 'Finish The Challenge to get RP and Money')
                    parkour = 2;
                        alt.clearInterval(isready);
                        alt.emit('showpstat');
                        let finish = alt.everyTick(()=>{
    
                            let pos = alt.Player.local.pos;
                            let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, pos1.x, pos1.y, pos1.z, true );
                            let dist2 = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, pos2.x, pos2.y, pos2.z, false );
                            if(dist < 3) {
                                alt.clearEveryTick(finish);
                                
                                alt.emit('marker', 1, pos1.x, pos1.y, pos1.z-1,4,4,1,255,0,155,0)
                                alt.emit('marker2', 5, pos1.x, pos1.y, pos1.z+1.5,2,2,2,255,0,155,0,0)
                                let firework = native.startParticleFxLoopedAtCoord("scr_indep_firework_air_burst", pos1.x, pos1.y, pos1.z+2, 0,0,0,2,0,0,0,0);
                                marker = 0;
                                parkour = 0;
                                host = 0
                                native.playSound(1, "MP_WAVE_COMPLETE", "HUD_FRONTEND_DEFAULT_SOUNDSET", 1,0,1);
                                alt.emitServer('coursefinish', type);
                                notif('~b~COMPLETE~b~', 'You Finish The Challenge')
                                
                                let destroy = alt.setInterval(()=>{
                                    let pos = alt.Player.local.pos;
                                    let dist2 = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, pos2.x, pos2.y, pos2.z, false );
                                    if(dist2 > 1500) {
                                        alt.clearInterval(destroy);
                                        alt.emitServer('parkourend', type);
                                        native.stopParticleFxLooped(firework, 0);
                                    for(let i in props) {
                                        if(props[i]) {
                                            native.deleteEntity(props[i]);
                                        }
                                    }  
                                }
                                }, 2000);
                            }
                            if(dist2 > 1500) {
                                alt.clearEveryTick(finish);
                                alt.emit('marker', 1, pos1.x, pos1.y, pos1.z-1,4,4,1,255,0,155,0)
                                alt.emit('marker2', 5, pos1.x, pos1.y, pos1.z+1.5,2,2,2,255,0,155,0,0)
                                alt.emitServer('parkourend', type);
                                for(let i in props) {
                                    if(props[i]) {
                                        native.deleteEntity(props[i]);
                                    }
                                }
                                if(parkour == 2) {
                                    notif('~y~CHALLENGE FAILED~y~', 'You Leave the Parkour Course area')
                                    
                                    marker = 0;
                                    parkour = 0; 
                                    host = 0;
                                }
                            }
                        })
                    
                }, 3000);
    
            }, 3000)

        }
        }
}

function notif(text1, text2) {
    let notif = alt.everyTick(()=>{
        drawtext(text1,0.5,0.23,7,1.8,1.0,255,0,0,255, 0);
        drawtext(text2,0.5,0.32,4,0.7,1.2,255, 255, 255,255, 0);
    })
    let stop = alt.setInterval(()=>{
        alt.clearEveryTick(notif);
        alt.clearInterval(stop);
    }, 6000);
}

function handletext(text) {
    native.beginTextCommandDisplayHelp("STRING");
	native.addTextComponentSubstringKeyboardDisplay(text);
	native.endTextCommandDisplayHelp(0, 0, true, -1);
}

function drawtext(msg, x, y, font, scale, wrap, r, g, b, a, i) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(font);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, wrap);
    native.setTextCentre(true);
    native.setTextColour(r,g,b,a);
    native.setTextJustification(i);
    native.setTextDropShadow(true);
    native.endTextCommandDisplayText(x, y, 0);
}