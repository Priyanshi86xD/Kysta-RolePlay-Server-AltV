import * as alt from 'alt-client';
import { deleteMeta, getMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import { drawtext, handletext, setclothes } from './client.js';


const firedept = [
    {x: 213.08038330078125,  y: -1642.015380859375, z: 29.758987426757812, x1: 212.4237,y1:-1643.214,z1:28.80326,h:-0.582168},
    {x: 1195.1253662109375,  y: -1478.9246826171875, z: 34.859535217285156, x1:1204.937,y1:-1467.976,z1:33.85952,h:0.032083},
    {x: -1034.8729248046875, y: -2383.716552734375,    z: 14.0927734375, x1:-993.8002,y1:-2357.895,z1:12.94472,h:2.542726},
    {x: -633.5642700195312,  y: -121.99695587158203,   z: 39.013771057128906, x1: -635.56427,  y1: -124.996,   z1: 39.0137, h:0},
    
]

let jobblips = [], jobstart, office


export function fireman() {
    for(let i in firedept) {
        setMeta('fireman', 0);
        let jobblip = native.addBlipForCoord(firedept[i].x,firedept[i].y,firedept[i].z );
        native.setBlipSprite(jobblip, 648);
        native.setBlipColour(jobblip, 5);
        native.setBlipNameFromTextFile(jobblip, "Fireman")
        jobblips.push(jobblip);
        alt.emit('jobstart', "Go to ~y~Firefighter Stations~w~to start the job")
        jobstart = alt.setInterval(()=>{
            let pos = alt.Player.local.pos;
            let dest = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, firedept[i].x,firedept[i].y,firedept[i].z, true);
            if(dest <= 50) {
                alt.emit('marker', 1, firedept[i].x,firedept[i].y,firedept[i].z-1,0.8,0.8,1,255,55,55,80);
            }
            if(dest <=2) {
                let job = getMeta('fireman');
                if(job == 0) {
                    setMeta('fireman', 1);
                    handletext("~INPUT_PICKUP~ start work as firefighter");
                    office = firedept[i];
                }
            }
        }, 1000);
    }
}

alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
        let job = getMeta('fireman');
        if(job == 1) {
            alt.emitServer('startingjob');
            setMeta('fireman', 2);
            //alt.emit('createmenu', "Select Job","poskurir", jobtypes)
            firemanwork()
        } else if(job == 3) {
           // alt.emit('createmenu', "Select Job","poskurir", jobtypes)

    }
}})

function firemanwork() {
    native.doScreenFadeOut(500);
    alt.emit('saveoutfit', 'default');
    let start = alt.setInterval(()=>{
        alt.emitServer('createcar', 'firetruk', "LSR ", office.x1,office.y1,office.z1, office.h, 0);
        native.clearAllPedProps(alt.Player.local.scriptID);
        native.removeAllPedWeapons(alt.Player.local.scriptID, true);
        let model = native.getEntityModel(alt.Player.local.scriptID);
        if(model == 0x705E61F2) {
            setclothes(1,0,0);
            setclothes(3,96,0);
            setclothes(4,120,0);
            setclothes(5,0,0);
            setclothes(6,56,1);
            setclothes(7,0,0);
            setclothes(8,15,0);
            setclothes(9,0,0);
            setclothes(10,64,0);
            setclothes(11,315,0);
            native.setPedPropIndex(alt.Player.local.scriptID, 0,138,0,true)
        } else if(model ==  0x9C9EFFD8 ) {
            setclothes(1,0,0);
            setclothes(3,111,0);
            setclothes(4,126,0);
            setclothes(5,0,0);
            setclothes(6,59,1);
            setclothes(7,0,0);
            setclothes(8,14,0);
            setclothes(9,0,0);
            setclothes(10,73,0);
            setclothes(11,326,0);
            native.setPedPropIndex(alt.Player.local.scriptID, 0,137,0,true)
        }
            native.doScreenFadeIn(2000);
            setMeta('activejob', 'Firefighter Work')
            alt.emitServer('Give:Weapon', 0x060EC506)
            alt.clearInterval(start);
            native.playSound(0, "Event_Start_Text", "GTAO_FM_Events_Soundset", true, 0 ,false)
            let jobnotif = alt.everyTick(()=>{
                drawtext('FIREFIGHTER WORK',0.5,0.22,4,1.2,0.9,255,255,255,255, 0);
                drawtext("",0.5,0.28,4,0.7,0.9,200, 155, 0,255, 0);
            })
            let job = alt.setInterval(()=>{
                alt.clearEveryTick(jobnotif);
                clearInterval(job);
            },7000)
    }, 1000)

}

alt.on('Firefighter Work', ()=>{
    native.doScreenFadeOut(500);
    alt.emit('marker', 1, 0,0,0,0.8,0.8,1,255,55,55,0);
    alt.emit('jobstart', "")
    let offjob = alt.setInterval(()=>{
        alt.clearInterval(jobstart);
        for(let i in jobblips) {
            native.removeBlip(jobblips[i]);
            
        }
        native.clearAllPedProps(alt.Player.local.scriptID);
        native.removeAllPedWeapons(alt.Player.local.scriptID, true);
        alt.emit('loadoutfit', 'default');
        alt.emit('loadweapon');
        setMeta('fixjob', 0)
        deleteMeta('activejob');
        native.doScreenFadeIn(2000);
        alt.clearInterval(offjob);
    }, 1000)
})

function firemanworkstart() {
    
}