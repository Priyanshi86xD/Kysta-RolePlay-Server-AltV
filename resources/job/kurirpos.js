import * as alt from 'alt-client';
import { deleteMeta, getMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import { attach, deleteobj, drawtext, handletext, playanim, setclothes } from './client.js';
import { kotakpos, letterbox } from './kotakpos.js';

const vehicle = 'boxville4';

const postop = [
    { x: -231.2771, y: -913.6957, z: 32.3108 },
]


const jobtypes = [
    {type: -1, worktype: "~y~Select Job", job: "Collect mails from the ~y~Postboxes"},
    {type: 1, worktype: "Mail collector", job: "Collect mails from the ~y~Postboxes"},
    {type: 2, worktype: "Mail courier", job: "Deliver mails to their ~y~respective addresses"},
]

let jobblip, jobtime, kotakposlist = [], mailboxs = []
let postujuan = []
let carpos = {  x: -223.47439575195312,   y: -892.9353637695312,  z: 28.921010971069336, h:254.2901153564453}
let jobtype = 0, postvan;
let destamount = 0, bonus =0, price=0,timermin,timersec,minute=14,second=60,fakemin=15,destblip,deliver = 0,jobstart=0, marker=0

export function postmailjob() {
    
    native.requestModel(alt.hash("prop_poly_bag_money"));
    for(let i in kotakpos) {
        let dest = native.getDistanceBetweenCoords(postop[0].x, postop[0].y, postop[0].z, kotakpos[i].Position.X,kotakpos[i].Position.Y,kotakpos[i].Position.Z,true );
        if(dest <= 2000) {
            kotakposlist.push(kotakpos[i].Position);
        }
    }
    for(let i in letterbox) {
        let dest = native.getDistanceBetweenCoords(postop[0].x, postop[0].y, postop[0].z, letterbox[i].Position.X,letterbox[i].Position.Y,letterbox[i].Position.Z,true );
        if(dest <= 2000) {
            mailboxs.push(letterbox[i].Position);
        }
    }
    jobblip = native.addBlipForCoord(postop[0].x, postop[0].y, postop[0].z);
    native.setBlipSprite(jobblip, 525);
    native.setBlipColour(jobblip, 5);
    setMeta('postjob', 0);
    alt.emit('jobstart', "Go to ~y~Post Office ~w~to start the job")
    //alt.log('postbox', kotakposlist.length)
    jobtime = alt.setInterval(()=>{
        let pos = alt.Player.local.pos;
        let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z,postop[0].x, postop[0].y, postop[0].z, true );
        if(dist <= 50) {
            alt.emit('marker', 1, postop[0].x, postop[0].y, postop[0].z-1,0.8,0.8,1,55,255,155,80)
        }
        if(dist <=1) {
            let job = getMeta('postjob');
            if(job == 0 ) {
                alt.emit('jobstart', "")
                setMeta('postjob', 1);
                handletext("~INPUT_PICKUP~ start work as postman")
            } else if(job == 2) {
                if(postujuan.length > 0) {
                    setMeta('postjob', 3);
                    handletext("~INPUT_PICKUP~ request another work")
                }
            }
        }
    }, 1000);

    alt.on("keydown", (key) => {
        if (key == "E".charCodeAt(0)) {
            let job = getMeta('postjob');
            if(job == 1) {
                //setMeta('postjob', 2);
                alt.emitServer('startingjob');
                alt.emit('createmenu', "POS INDONESIA","poskurir", jobtypes)
                //postmailwork();
            } else if(job == 3) {
                alt.emit('createmenu', "POS INDONESIA","poskurir", jobtypes)
            //attach("prop_poly_bag_money",0.35, 0.0, 0.06,0,-100,90)
        }
    }})

}



alt.on('poskurir', (type)=>{
    postmailwork(type);
});

function postmailwork(selected) {
    jobtype = selected;
    if(selected == 1) {
        getenum(kotakposlist, 0,100);
    } else if(selected == 2) {
        getenum(mailboxs, 0,100);
    }  
    native.doScreenFadeOut(500);
    alt.emit('saveoutfit', 'default');
    alt.emitServer('createcar', 'boxville4', "POS ", carpos.x,carpos.y,carpos.z, carpos.h, 0);
    let seen = alt.setInterval(()=>{
        native.clearAllPedProps(alt.Player.local.scriptID);
    let model = native.getEntityModel(alt.Player.local.scriptID);
    if(model == 0x705E61F2) {
        setclothes(11,424,0);
        setclothes(3,0,0);
        setclothes(8,15,0);
    } else if(model ==  0x9C9EFFD8 ) {
        setclothes(11,453,0);
        setclothes(3,0,0);
        setclothes(8,2,0);
    }
        native.doScreenFadeIn(2000);
        alt.clearInterval(seen);
        native.playSound(0, "Event_Start_Text", "GTAO_FM_Events_Soundset", true, 0 ,false)
                let jobnotif = alt.everyTick(()=>{
                    drawtext('POSTMAN WORK',0.5,0.22,4,1.2,0.9,255,255,255,255, 0);
                    drawtext("Collect and Deliver Mails",0.5,0.28,4,0.7,0.9,200, 155, 0,255, 0);
                })
                let job = alt.setInterval(()=>{
                    alt.clearEveryTick(jobnotif);
                    postvan = alt.Player.local.getSyncedMeta('jobcar')
                    clearInterval(job);
                },6000)
    }, 2000);
    let carblip = native.addBlipForCoord(carpos.x,carpos.y,carpos.z);
        native.setBlipSprite(carblip, 616);
        native.setBlipColour(carblip, 3);
        alt.emit('jobstart', "Drive ~b~The Post Van");
                
                setMeta('activejob', 'Postmail Courier Work');
                
                
                let van = alt.everyTick(()=>{
                    native.drawMarker(2, carpos.x,carpos.y,carpos.z+3.2, 0,0,0,180,0,0, 1.2,1.2,1, 195,155,25,100,true,0,0,0,0,0,0);
                    let inveh = native.isPedInAnyVehicle(alt.Player.local.scriptID, false);
                    if(inveh === false) {}
                    else if(inveh === true) {
                        if(alt.Player.local.vehicle == postvan) {
                        
                            alt.clearEveryTick(van);
                            native.removeBlip(carblip);
                            setMeta('postjob', 2);
                            if(jobstart == 0) {
                                jobstart += 1;
                                posdeliver(0);
                                delivertime();
                                
                            } else {}
                          
            }}
        })
}

function getenum(data, start, snum) {
    let a = native.getRandomIntInRange(0,snum)
    let num = start + a
    postujuan.push(data[num])

    if(postujuan.length < 10) {
        getenum(data, num, 5)
    } else {
    alt.log('enums', postujuan) 
}
}

function posdeliver(num) {
    alt.log('kurirposstart', deliver);
    let pos1 = postujuan[num]
    if(jobtype == 2) {
        alt.emit('jobstart', jobtypes[1].job); 
    } else if(jobtype == 1){
    alt.emit('jobstart', jobtypes[0].job);
    }
    destblip = native.addBlipForCoord(postujuan[num].X,postujuan[num].Y,postujuan[num].Z );
    native.setBlipRoute(destblip, true);
    
               deliver = alt.setInterval(()=>{
                            let pos = alt.Player.local.pos;
                            let dests = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, postujuan[num].X,postujuan[num].Y,postujuan[num].Z, true)
                            if(dests < 50) {
                                if(marker == 0) {
                                    alt.emit('marker', 1, postujuan[num].X,postujuan[num].Y,postujuan[num].Z-1,1.5,1.5,1.6,195,155,25,180);
                                    marker = 1;
                                }
                                
                            }
                            if(dests <= 8) {
                                let inveh = native.isPedInAnyVehicle(alt.Player.local.scriptID, false);
                                if(inveh == false) {}
                                else if(inveh == true) {
                                    if(alt.Player.local.vehicle == postvan) {
                                        if(deliver > 0) {
                                    alt.clearInterval(deliver);
                                    deliver = 0;
                                    native.requestModel(alt.hash("p_cash_envelope_01_s"));
                                    native.taskLeaveVehicle(alt.Player.local, postvan, 0);
                                    if(jobtype == 2){
                                        attach("p_cash_envelope_01_s", 0.08, 0.05, 0.0, -80,-100,0)
                                    }
                                        }
                                    alt.emit('marker2', 2, postujuan[num].X,postujuan[num].Y,postujuan[num].Z+2,1,1,1,195,155,25,180,180)

                                let box = alt.setInterval(()=>{
                                    let pos3 = alt.Player.local.pos;
                                    let dests = native.getDistanceBetweenCoords(pos3.x, pos3.y, pos3.z, postujuan[num].X,postujuan[num].Y,postujuan[num].Z, true)
                                    if(dests <= 2) {
                                        alt.clearInterval(box);
                                        deleteobj();
                                        destamount += 1;
                                        if(marker > 0) {
                                            alt.emit('marker', 1, postujuan[num].X,postujuan[num].Y,postujuan[num].Z-1,3,3,1.2,55,255,155,0);
                                            alt.emit('marker2', 2, postujuan[num].X,postujuan[num].Y,postujuan[num].Z+2,1,1,1,195,155,25,0,0)
                                            marker = 0;
                                        }
                                        
                                        alt.emit('jobstart', "Get back to ~b~Post Van");
                                        native.removeBlip(destblip);
                                            native.clearAllBlipRoutes();
                                           // playanim("mp_am_hold_up", "purchase_chocbar");
                                            if(jobtype == 1) {
                                                attach("prop_poly_bag_money",0.35, 0.0, 0.06, 0, -100, 90)
                                            } else {
                                                price += 5;
                                            }
                                            alt.emitServer('jobfinish', 0, 5);
                                            if(destamount < 10) {
                                                let van = alt.everyTick(()=>{
                                                    let vanpos = native.getEntityCoords(postvan, false);
                                                    native.drawMarker(2, vanpos.x,vanpos.y,vanpos.z+3.2, 0,0,0,180,0,0, 1.2,1.2,1, 195,155,25,100,true,0,0,0,0,0,0);
                                                    let inveh = native.isPedInAnyVehicle(alt.Player.local.scriptID, true);
                                                    if(inveh === false) {}
                                                    else if(inveh === true) {
                                                        if(alt.Player.local.vehicle == postvan) {
                                                            alt.clearEveryTick(van);
                                                            deleteobj()
                                                            posdeliver(num+1);
                                                            
                                                }
                                            }
                                        })   
                                            } else {
                                                finishjob();
                                            }
                                    }
                                }, 500)
                            }
                            }
                        }
                       
                           
                    },1000)
                }
            

alt.on('Postmail Courier Work', ()=>{
    alt.emit('jobstart', "");
    if(jobtime>0) {
        alt.clearInterval(jobtime);
    }
    if(jobblip>0) {
        native.removeBlip(jobblip);
    }
    native.doScreenFadeOut(1000);
    let stopjob = alt.setInterval(()=>{
        alt.emit('loadoutfit', 'default');
        native.doScreenFadeIn(2000);
        alt.clearInterval(stopjob);
        deleteMeta('postjob');
        deleteMeta('activejob');
        destamount = 0, minute = 9,fakemin = 10, second = 60, bonus = 0, price = 0; kotakposlist =[], mailboxs =[]
    },2000)
    
    if(deliver > 0) {
        alt.clearInterval(deliver);
        native.removeBlip(destblip);
        alt.emit('marker', 1, pos1.X,pos1.Y,pos1.Z-1,3,3,1.2,55,255,155,0);
        alt.clearInterval(timermin);
        alt.clearInterval(timersec);
        native.playSound(0, "OOB_Cancel", "GTAO_FM_Events_Soundset", true, 0 ,false)
        let jobnotif = alt.everyTick(()=>{
            drawtext('YOU QUIT THE JOB',0.5,0.22,4,1.2,0.9,255,255,255,255, 0);
            drawtext("Completed : "+destamount+" Money Received $"+(price+1000),0.5,0.28,4,0.7,0.9,200, 155, 0,255, 0);
        })
        let restartjob = alt.setInterval(()=>{
            alt.clearEveryTick(jobnotif);
            alt.emitServer('jobfinish', price+1000, 10);
            setMeta('fixjob', 0);
            clearInterval(restartjob);
        }, 6000);
        alt.emit('timerbar', 0,["", "", 0], ["", "", 0], ["", "", 0])
    }
})

function finishjob() {   
    if(timermin > 0) {
        alt.clearInterval(timermin);
    }
    if(timersec > 0) {
        alt.clearInterval(timersec);
    }
    native.playSound(0, "package_delivered_success", "DLC_GR_Generic_Mission_Sounds", true, 0 ,false)
    //
    let jobnotif = alt.everyTick(()=>{
        drawtext('JOB FINISHED',0.5,0.22,4,1.2,0.9,255,255,255,255, 0);
        drawtext("Completed : "+destamount+" Money Received $"+(price+bonus),0.5,0.28,4,0.7,0.9,200, 155, 0,255, 0);
    })
    minute = 0;
    second = 60;
    let restartjob = alt.setInterval(()=>{
        alt.clearEveryTick(jobnotif);
        alt.emitServer('jobfinish', price+bonus, 30);
        destamount = 0, minute = 14,fakemin = 15, second = 60, bonus = 0, price = 0;
        alt.emit('jobstart', "Go back to ~y~Post Office ~w~ to start another work");
        clearInterval(restartjob);
    }, 6000);
    alt.emit('timerbar', 0,["", "", 0], ["", "", 0], ["", "", 0])
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
        bonus = 2000;
      } else {
        bonus = 5000;
      }
      if(jobtype == 1) {
        alt.emit('timerbar', 1,["TIME : "+minute+':'+second, "BONUS : $"+bonus, 140], ["COLLECTED :", destamount+"/10", 140], ["", "", 0])
      } else {
        alt.emit('timerbar', 1,["TIME : "+minute+':'+second, "BONUS : $"+bonus, 140], ["DELIVERED :"+destamount+"/10", "FEE : $"+price, 140], ["", "", 0])
      }
      
      
     },1000)
}

