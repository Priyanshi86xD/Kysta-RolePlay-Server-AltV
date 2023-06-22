import * as alt from 'alt-client';
import { getMeta, setMeta } from 'alt-client';
import { drawtext } from './client.js';
import * as native from 'natives';

let ranks = 1
let rpoints = 0
let cpoints = 0
let rankup = 0
let oldpoints;

const playerrank = [

]

export function setpoint() {
    let points = {rank:1, rp:0, cp:0, rankup:1}
    rankup += 1;
    //alt.LocalStorage.set('rankup', rankup);
    //alt.LocalStorage.set('point', points)
    //alt.LocalStorage.save();
    setMeta('playerrank', {rank:ranks, rp:rpoints, cp:cpoints})
    alt.emitServer('updatedata', 'accounts','rank', points, false)
    alt.emitServer('playerrank', ranks);
    
}


export function loadpoints(data) {
    let rpoint = data.rank
    //let rankuppoint = data.rankup
    ranks = rpoint.rank;
    rpoints = rpoint.rp;
    cpoints = rpoint.cp;
    rankup = rpoint.rankup;
    setMeta('playerrank', {rank:ranks, rp:rpoints, cp:cpoints})
    alt.emitServer('playerrank', ranks);

}


export function addreppoint(pointadded) {
    let points = 0
    let add = pointadded / 10
        let addpoint = alt.setInterval(()=>{
            rpoints += add
            points += add
            if(rpoints >= (rankup*800)) {
                levelup();
                ranks += 1;
                rankup += 0.5;
                rpoints = add;
                alt.emitServer('playerrank', ranks);
            }
            
            if(points >= pointadded) {
                alt.clearInterval(addpoint);
           
            }
        },200)
    
    let srank = alt.everyTick(()=>{
        drawrank();
    })
    let stopsrank = alt.setInterval(()=>{
        alt.clearEveryTick(srank);
        alt.emitServer('updatedata', 'accounts','rank', {rank:ranks, rp:rpoints, cp:cpoints, rankup:rankup}, false)
        //alt.LocalStorage.set('rankup', rankup);
        //alt.LocalStorage.set('point', {rank:ranks, rp:rpoints, cp:cpoints})
        //alt.LocalStorage.save();
        setMeta('playerrank', {rank:ranks, rp:rpoints, cp:cpoints})
        //alt.log('you got', pointadded, ' RP')
        alt.clearInterval(stopsrank);
    }, 5000);
}

let glober = 27, globeg = 126, globeb = 255;
let glober1 = 27, globeg1 = 126, globeb1 = 255;
let texta1 = 255, texta2 = 255;

function levelup() {
    native.playSound(0, "RANK_UP", "HUD_AWARDS", true, 0 ,false)
    let up = alt.setInterval(()=>{
        glober1 = 255, globeg1 = 255, globeb1 = 255
        alt.clearInterval(up);
    }, 100);
    let up1 = alt.setInterval(()=>{
        glober = 255, globeg = 255, globeb = 255
        alt.clearInterval(up1);
    },300);
    let up2 = alt.setInterval(()=>{
        texta1 = 0, texta2 = 0;
        alt.clearInterval(up2);
    },400);
    let up3 = alt.setInterval(()=>{
        glober = 27, globeg = 126, globeb = 255;
        glober1 = 27, globeg1 = 126, globeb1 = 255;
        alt.clearInterval(up3);
    },500);
    let up4 = alt.setInterval(()=>{
        texta1 = 255, texta2 = 255;
        alt.clearInterval(up4);
    },600);

}

export function drawrank() {
     
        native.drawRect(0.5,0.04,0.24,0.01,60,80,94,255,false);
        native.drawRect(0.5-(0.24/2)+((0.24/(800*rankup))*(rpoints/2)),0.04,(0.24/(800*rankup))*rpoints,0.01,137,206,252,255,false);
        native.drawSprite("mprankbadge", "globe_bg",0.36,0.04,0.04,0.065,0,13,10,15,205,true,1);
        native.drawSprite("mprankbadge", "globe",0.36,0.04,0.04,0.065,0,glober, globeg, globeb,205,true,1);
        native.drawSprite("mprankbadge", "globe_bg",0.64,0.04,0.04,0.065,0,13,10,15,205,true,1);
        native.drawSprite("mprankbadge", "globe",0.64,0.04,0.04,0.065,0,glober1, globeg1, globeb1,205,true,1);
        drawtext(""+ranks, 0.36,0.0178,4,0.65,0.9,255,255,255,texta1,0);
        drawtext(""+ranks, 0.64,0.0178,4,0.65,0.9,255,255,255,texta2,0);
        drawtext(""+Math.ceil(rpoints)+"/"+(rankup*800), 0.5,0.01,4,0.4,0.9,255,255,255,255,0);
}