import * as alt from 'alt-client';
import { deleteMeta, getMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import { drawtext, handletext } from './client.js';

let cooldown = 0

const jobtypes = [
    {type: -1, worktype: "~g~Select Job", job: ""},
    {type: 1, worktype: "Killing", job: ""},
    {type: 2, worktype: "Kidnapping", job: ""},
    {type: 3, worktype: "Stealing", job: ""},
]

export function trevorjob() {  
    alt.on("keydown", (key) => {
        if (key == "E".charCodeAt(0)) {
            let job = getMeta('trevormenu');
            if(job == 1) {
                if(cooldown == 0) {
                    alt.emit('createmenu', "TREVOR QUEST","trevorjob", jobtypes)
                } else {
                    handletext('Job not available right now')
                }
                
    }}})
}

alt.on('trevorjob', (type)=>{
    if(type == 1) {
        trevorkilljob();
    } else if(type == 2) {
        trevorkidnapjob();
    } else if(type == 3) {
        trevorstealjob();
    }
});

function trevorkilljob() {
    let target = native.getRandomIntInRange(20, 30);
    setMeta('trevorjobkill', target);
    native.playSound(0, "Event_Start_Text", "GTAO_FM_Events_Soundset", true, 0 ,false)
    jobnotif('~y~POLICE KILLER', "~w~Kill "+target+" cops to get Money & RP")
    alt.emit('jobstart', 'Rob any store to get wanted')

    let money = (target - 20)*500 + 15000
    let rp = (target - 20)*5 + 100

    alt.on('trevorjobkill', (point)=>{
        if(point == target) {
            deleteMeta('trevorjobkill');
            alt.emit('jobstart', "Lose the ~r~cops")

            let escape = alt.setInterval(()=>{
                let wanted = getMeta('wanted');
                if(wanted == 0) {
                    alt.clearInterval(escape);
                    jobfinish(money, rp);     
                }
            }, 1000)
        }

    })
}

function trevorkidnapjob() {
handletext('not available right now')
}

function trevorstealjob() {
    handletext('not available right now')
}


function jobfinish(money, rp) {
    jobnotif('~Y~JOB COMPLETE', 'You got $'+money+' & '+rp+' RP')
    alt.emit('jobstart', "")
    let finish = alt.setTimeout(()=>{
        alt.emitServer('jobfinish', money, rp)
        alt.clearTimeout(finish);
        cooldown = 1
        let cool = alt.setTimeout(()=>{
            cooldown = 0;
            alt.clearTimeout(cool)
        }, 60000*15);
    }, 5000)
}

function jobnotif (text1, text2) {
    let jobnotif = alt.everyTick(()=>{
        drawtext(text1,0.5,0.25,7,1.3,0.9,255,0,0,255, 0);
        drawtext(text2,0.5,0.32,4,0.7,0.9,255, 255, 255,255, 0);
    })
    let job = alt.setInterval(()=>{
        alt.clearEveryTick(jobnotif);
        clearInterval(job);
    },6000)
}

