import * as alt from 'alt-client';
import { getMeta, hasMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import * as game from 'natives';
import * as NativeUI from './NativeUI/NativeUi.js';
import { addreppoint, drawrank, loadpoints, setpoint } from './playerpoints.js';
import { planebomb, planecounter, stopsmoke } from './airplane.js';


const MenuSettings = {
    Point: new NativeUI.Point(50, -57),
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
    Size: new NativeUI.Size(10, 10),
    Color: new NativeUI.Color(137,206,252,60),
}

let bank=0;
let cash=0;
let sick = 0
let playerpics = []

let profilpic = {
    playername : 'none',
    playerpic : 'none'
}

native.displayRadar(false)

alt.on("setmoney", ()=>{
    let money = {bank:0, cash:0}
    //alt.LocalStorage.set('money', money);   
   // alt.LocalStorage.save();
    setpoint();
    setMeta('money', money)
    setMeta('chat', 0);
    //getmugshot()
    let stat = alt.setInterval(()=>{
        showpstat();
        alt.clearInterval(stat);
    }, 3000)
    let gotmoney = alt.setInterval(()=>{
        playermoney(money);
        //loadpoints();
        bank += 20000;
        cash += 0;
        shownotif('CONGRATULATIONS! YOU GOT WELCOME MONEY');
        showcashreduce('bank +$', 20000,0,100,220);
        alt.clearInterval(gotmoney);
    },60000*2);
});

alt.on('playerstat', (data)=>{
    //getmugshot()
    showpstat();
    playermoney(data.money);
    loadpoints(data);
   // setMeta('chat', 0);
    
});

function playermoney(money) {
    //let money = alt.LocalStorage.get('money')
    bank += money.bank;
    cash += money.cash;
    setMeta('money', money);
let gotmoney = alt.setInterval(()=>{
    alt.setInterval(()=>{
        bank += 2000;
        showcashreduce('bank +$', 2000,0,100,220)
        notification('Yout got Daily Money from Freebank');
    },60000*48)
alt.clearInterval(gotmoney);
}, 5000);
}

let plyrlist = 0;

alt.on("keydown", (key) => {
	if (key == "Z".charCodeAt(0)) {
        if(plyrlist == 1) {} 
        else {
            //native.displayRadar(true)
            let sum = alt.Player.all.length
            let chat = getMeta('chat');
            let subtitle =  ["GTA Online (Public, "+sum+' )']. join('');
            const Playerlist = new NativeUI.Menu("", subtitle, MenuSettings.Point);
            Playerlist.GetTitle().DropShadow = MenuSettings.DropShadow;
            Playerlist.GetTitle().TextAlignment = MenuSettings.TextAlignment;
            Playerlist.SetNoBannerType();     
            Playerlist.Clear();    
    
            const players = alt.Player.all.map(player => ({
                id: player.id,
                name: player.name,
                rank: player.getSyncedMeta('rank'),
                //pic: player.getSyncedMeta('pic')
            }))
            players.forEach(player => {
                
                let playerlist = new NativeUI.UIMenuItem(player.name, "", players.length);
                playerlist.HighlightedBackColor = MenuSettings.Color;
                playerlist.BackColor = MenuSettings.Color;
                playerlist.RightBadge = 32;
                playerlist.RightBadge = 31;
                //let pict = new NativeUI.BadgeStyle(player.pic)
                //playerlist.LeftBadge = pict
                if(player.rank) {
                    playerlist.RightLabel = player.rank.toString()
                }
                Playerlist.AddItem(playerlist);
            })
            if(chat == 1) { }  
                else {
                        Playerlist.Open()
                        plyrlist = 1
                        showstatus();
            }
    
            alt.emit('shownametag')

            let interval = alt.setInterval(() => {
         
                    Playerlist.Close(true);
                    //native.displayRadar(false)
              
                plyrlist = 0;
                alt.clearInterval(interval);
                }, 5000)
        }
        }      
});
    

function showstatus(){
    let status = alt.everyTick(()=>{
    drawtext('bank $'+ bank, 0.5, 0.05, 7, 0.6, 0.9, 109,236,143,255,0);
    drawtext('cash $'+ cash, 0.5, 0.085, 7, 0.6, 0.9, 44,178,80,255,0);
    drawrank();
    });
    let statint = alt.setInterval(()=>{
        alt.clearEveryTick(status);
        alt.clearInterval(statint);
    }, 5000);
}
let hungry = 100;
let sleepy = 100;
let subwarn;
let markerdoor;
let pstat;
let rpoint;

native.requestStreamedTextureDict("mprankbadge", true);
native.requestStreamedTextureDict("mpleaderboard", true);
native.requestStreamedTextureDict("timerbars", true);

alt.onServer('rppoint', (point)=>{
    addreppoint(point);
   
})

alt.on('jobstart', (text)=>{
    subwarn = text;
})

alt.on('createmarker', (pos)=>{
    markerdoor = pos;
})

alt.onServer('re-spawn', ()=>{
    hungry = 100
    sleepy = 100
})

alt.setInterval(()=>{
        if(hungry >1){
        hungry -= 1;
        if(hungry <= 10){ showwarning('YOU ARE THIRSTY! DRINK SOME WATER!!!');
    }
    } else {
        hungry = 0
        if(sick == 0) {
            sick = 1
            reducehealth();
        }

    }
},50000)

alt.setInterval(()=>{
        if(sleepy >= 1){
        sleepy -= 1;
        } else {}
},100000)

let marker1 = [0,0,0,0,0, 0,0,0,0,0,0,0]
let marker2 = [0,0,0,0,0, 0,0,0,0,0,0,0,0]
let marker3 = [0,0,0,0,0, 0,0,0,0,0,0,0]
let vehname = 0
let carname =""
let carclass =""
let timerbar = 0, wanted = 0, blink = 0, red = 0
let fakemap = {
    set : false,
    x : 0, 
    y : 0
}
let pbar = {show: false, value:0, max:0}

alt.on('fakemap', (set, x, y) =>{
    fakemap.set = set
    fakemap.x = x;
    fakemap.y = y
})

alt.on('marker', (type, x,y,z,x1,y1,z1,r,g,b,a)=>{
   marker1 = [ type, x,y,z,x1,y1,z1,r,g,b,a]
})
alt.on('marker3', (type, x,y,z,x1,y1,z1,r,g,b,a)=>{
    marker3 = [ type, x,y,z,x1,y1,z1,r,g,b,a]
 })

alt.on('marker2', (type, x,y,z,x1,y1,z1,r,g,b,a,rx)=>{
    marker2 = [ type, x,y,z,x1,y1,z1,r,g,b,a,rx]
 })

alt.on('carname', (name, type)=>{
    carname = name;
    carclass = type;
})

alt.on('wanted', (star)=>{   
    if(star > 6) {
        wanted = 6
    } else {
        wanted = star;
    }
})

alt.on('progressbar', (show, value, total)=>{
    pbar.show = show
    pbar.value = value
    pbar.max = total
})

let timerbar1text = "", timer1text2 ="", timerbar1alpha = 0;
let timerbar2text ="", timer2text2 ="", timerbar2alpha = 0;
let timerbar3text ="", timer3text2 ="", timerbar3alpha = 0;

alt.onServer('jobtext', (text)=>{
    subtitle = text;
})
alt.on('timerbar', (stat, timer1, timer2, timer3)=>{
    timerbar = stat
    timerbar1text = timer1[0]; timer1text2 = timer1[1]; timerbar1alpha = timer1[2];
    timerbar2text = timer2[0]; timer2text2 = timer2[1]; timerbar2alpha = timer2[2];
    timerbar3text = timer3[0]; timer3text2 = timer3[1]; timerbar3alpha = timer3[2];
})


function showpstat(){
    native.displayRadar(true)
    pstat = alt.everyTick(()=>{
        
        let interior = native.getInteriorFromPrimaryView()
            if(interior > 0) {
                native.setRadarZoom(200);
                if(hasMeta('mission')) {} else {
                native.disablePlayerFiring(alt.Player.local.scriptID, true);
                native.hudSuppressWeaponWheelResultsThisFrame();
                native.disableAimCamThisUpdate();
            }
            if(fakemap.set == true) {
                let pause = native.isPauseMenuActive()
                if(pause == true) {
                    native.setFakePausemapPlayerPositionThisFrame(fakemap.x, fakemap.y);
                } 
            }
        } else {
            native.setRadarZoom(1100);
        }
        if(wanted > 0) {
            if(wanted == 1) {
                native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.02, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
             }else if(wanted == 2 ) {
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.02, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.045, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                  } else if(wanted == 3) {
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.02, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.045, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.07, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                  } else if(wanted == 4) {
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.02, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.045, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.07, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.095, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    }else if(wanted == 5) {
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.02, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.045, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.07, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.095, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.12, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    } else if(wanted == 6) {
                        native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.02, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                        native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.045, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                        native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.07, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                        native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.095, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                        native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.12, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                        native.drawSprite("mpleaderboard","leaderboard_star_icon", 0.145, 0.75, 0.02, 0.03, 0.0,255,red,red,175,true,1);
                    }
 
            if(blink >= 100 && blink <= 200) {
                red = 255
            }
            if(blink >= 200) {
                blink = 0;
                red = 0
            }
            blink += 2    
        }
        if(marker1[10] > 0) {
            native.drawMarker(marker1[0],marker1[1],marker1[2],marker1[3] , 0,0,0,0,0,0,marker1[4],marker1[5],marker1[6], marker1[7],marker1[8],marker1[9],marker1[10],0,0,0,0,0,0,0);
        }
        if(marker2[10] > 0) {
            native.drawMarker(marker2[0],marker2[1],marker2[2],marker2[3] , 0,0,0,marker2[11],0,0,marker2[4],marker2[5],marker2[6], marker2[7],marker2[8],marker2[9],marker2[10],true,1,0,0,0,0,0);
        }
        if(marker3[10] > 0) {
            native.drawMarker(marker3[0],marker3[1],marker3[2],marker3[3] , 0,0,0,0,0,0,marker3[4],marker3[5],marker3[6], marker3[7],marker3[8],marker3[9],marker3[10],0,0,0,0,0,0,0);
        }

        drawtext(subwarn, 0.5, 0.95, 0, 0.5, 0.9, 255,255,255,255, 0);
        drawtext(carname, 5,0.8,4,1.6,0.9,255,255,255,255,2)
        drawtext(carclass, 5,0.87,1,1.3,0.91,0, 102, 255,255,2)

        let radar = native.isRadarHidden()

        if(radar == false) {
            
        native.drawRect(0.087, 0.8,0.142,-0.018, 0,0,0,100,false)
        native.drawRect(0.0517, 0.8,0.071,-0.010, 243,243,50, 55,false)
        native.drawRect((((hungry-100)*0.00071)+0.1034)/2, 0.8,hungry*0.00071,-0.009, 243,243,50,hungry+105,false)
        native.drawRect(0.123, 0.8,0.068,-0.01, 255,255,255,55,false)
        native.drawRect((((sleepy-100)*0.00068)+0.246)/2, 0.8,sleepy*0.00068,-0.009, 255,255,255,sleepy+105,false) 
        }

        if(timerbar > 0) {
            native.drawSprite("timerbars", "all_black_bg", 0.915, 0.782, 0.165, 0.035, 0.0,55,150,250,timerbar3alpha,true,1)
            native.drawSprite("timerbars", "all_black_bg", 0.915, 0.821, 0.165, 0.035, 0.0,55,150,250,timerbar2alpha,true,1)
            native.drawSprite("timerbars", "all_black_bg", 0.915, 0.86, 0.165, 0.035, 0.0,55,150,250,timerbar1alpha,true,1)
    
            drawtext2(timerbar3text, 0.83, 0.769, 0, 0.32, 0.98, 255,255,255,255, 1);
            drawtext2(timer3text2, 0.96, 0.767, 0, 0.4, 0.99, 255,255,255,255, 2);
            drawtext2(timerbar2text, 0.83, 0.808, 0, 0.32, 0.98, 255,255,255,255, 1);
            drawtext2(timer2text2, 0.96, 0.806, 0, 0.4, 0.99, 255,255,255,255, 2);
            drawtext2(timerbar1text, 0.83, 0.847, 0, 0.32, 0.98, 255,255,255,255, 1);
            drawtext2(timer1text2, 0.96, 0.845, 0, 0.4, 0.99, 255,255,255,255, 2);
        }
        if(pbar.show == true) {
            native.drawRect(0.93, 0.86,0.1,0.02, 0,0,0,140,false)
            native.drawRect(0.88+(0.05/(pbar.max/pbar.value)), 0.86,0.1/(pbar.max/pbar.value),0.02, 255,255,255, 200,false)
        }
    if(alt.Player.local.vehicle) {
        let seat = native.getSeatPedIsTryingToEnter(alt.Player.local.scriptID);
        if(seat == -1) {

        }
    }    
    })
}

alt.on('showpstat', ()=>{
    let interval = alt.setInterval(()=>{
        alt.clearInterval(interval);
        if(pstat > 0) {} else {
            showpstat();
        }
    
    }, 2000);    
})

alt.on('hidepstat', ()=>{
    if(pstat) {
        alt.clearEveryTick(pstat);
        pstat = 0
    }
    
})


function reducehealth(){
    let hauss = alt.setInterval(()=>{
    let phealth = native.getEntityHealth(alt.Player.local.scriptID);
    native.setEntityHealth(alt.Player.local.scriptID, phealth-1, 100 );
    if(hungry >= 10){
        alt.clearInterval(hauss);
        sick = 0
    }
}, 10000)
}


alt.on('water', ()=>{
    setMeta('water', hungry);
    setMeta('ngantuk', sleepy);
    let money = {bank:bank, cash:cash}
    setMeta('money', money);
})


function showwarning(text){
    let warning = alt.everyTick(()=>{
    drawtext('WARNING',0.5, 0.25, 7, 1.1, 0.9, 155,50,50,255,0);
    drawtext(text,0.5, 0.31, 4, 0.6, 0.9, 255,255,255,255,0);
})
let stopwarn = alt.setInterval(()=>{
    alt.clearEveryTick(warning);
    alt.clearInterval(stopwarn);
}, 5000);
}

alt.on('minum', (water)=>{
    hungry += water;
    if(hungry >= 100){
        hungry = 100;
    }
    setMeta('water', hungry);
});

alt.on('ngopi', (kopi)=>{
    sleepy += kopi;
    if(sleepy >= 100){
        sleepy = 100;
    }
    setMeta('ngantuk', sleepy);
});

const vehicleclass = {
    0: {class: 'Compacts', fuel : 500, },
    1: {class: 'Sedans', fuel : 600, },
    2: {class: 'SUVs', fuel : 800, },
    3: {class: 'Coupes', fuel : 600, },
    4: {class: 'Muscle', fuel : 600, },
    5: {class: 'Sports Classics', fuel : 600, },
    6: {class: 'Sports', fuel : 600, },
    7: {class: 'Super', fuel : 600, },
    8: {class: 'Motorcycles', fuel : 300, },
    9: {class: 'Off-road', fuel : 1000, },
    10: {class: 'Industrial', fuel : 800, },
    11: {class: 'Utility', fuel : 800, },
    12: {class: 'Vans', fuel : 700, },
    13: {class: 'Cycles', fuel : Infinity, },
    14: {class: 'Boats', fuel : 1000, },
    15: {class: 'Helicopters', fuel : 3000, },
    16: {class: 'Planes', fuel : 5000, },
    17: {class: 'Service', fuel : 700, },
    18: {class: 'Emergency', fuel : 700, },
    19: {class: 'Military', fuel : 1000, },
    20: {class: 'Commercial', fuel : 700, },
    21: {class: 'Trains', fuel : 10000, },
    22: {class: 'Open-Wheel', fuel : 600, },
}

const electrics = [
    3789743831, //'omnisegt', 
    2765724541, //'raiden', 
    989294410, //'voltic2',
    1392481335,// 'cyclone', 
    4008920556, //'rcbandito', 
    2400073108, //'surge',
    3164157193, // 'dilettante', 
    1031562256, //'tezeract', 
    662793086, //'iwagen', 
    3162245632, //'imorgon',
    544021352, //'khamelion', 
    2672523198,//'voltic', 
    2445973230, //'neon',
    669204833, //virtue
    2908631255, //powersurge
]

let vfuel;
let _speedtick;
let speedo;
let speed;
let Fuel;
let tank = 100;
let engine;
let bensin;

let health;
let vhealth;

let vclass;
let subtitle;

alt.onServer('showHud', (pertamax, seat) => {
    //alt.log(seat)
    //if(seat == -1) {
    //native.displayRadar(true)
    let countermeasure = 0, bom = 0
    let pdm = getMeta('pdm');
    if(pdm == 1) {
        alt.emit('testdrive');
    } else {}
    let vehicle = alt.Player.local.vehicle;  
    let model = native.getEntityModel(vehicle)

    for(let i in electrics) {
        if( model == electrics[i]) {
            bensin = 'Battery'
        } else {
            bensin = 'Fuel'
        }
    }
    tank = pertamax;
    let taxi = native.isPedInAnyTaxi(alt.Player.local.scriptID);
    vclass = native.getVehicleClass(vehicle);
    if(vclass == 15 || vclass == 16) {
        let textbom = ""
        if(vehicle.hasSyncedMeta('owner')) {
            let vdata = vehicle.getSyncedMeta('owner') 
            if(vdata.data.bomb > 0) {
                bom = vdata.data.bomb
                textbom = ' ~INPUT_SPECIAL_ABILITY_SECONDARY~ to deploy a bomb'
            }
                if(vdata.data.countermeasure > 0) {
                    countermeasure = vdata.data.countermeasure
                    //alt.log(countermeasure)
                    let notif = alt.setInterval(()=>{
                        let height = native.getEntityHeightAboveGround(vehicle);
                        if(height >= 10) {
                            alt.clearInterval(notif)
                            handletext('~INPUT_PICKUP~ to activate countermeasure'+textbom) 
                        }
                        
                    }, 1000)
                }

            }
    }
    if(vclass == 13){ return } else
        alt.emitServer('vehclass', vclass);
        vfuel = vehicleclass[vclass].fuel;
        if(bensin == 'Battery') {
             vfuel = (vehicleclass[vclass].fuel) / 2
         }
    if(taxi == true) {
        alt.emit('taxijobnotif');
    } else {}
    if(model == 0x4C80EB0E || 0xD577C962 || 0x84718D34) {
        alt.emit('busjobnotif', vehicle);
    } 
        speedo = alt.setInterval(()=>{
                speed = Math.round(native.getEntitySpeed(vehicle)*3.6);
                vhealth = native.getVehicleEngineHealth(vehicle);
                if(vhealth <= 0) {
                    vhealth = 0
                } 
                },100);
        Fuel = alt.setInterval(()=>{
                    if(tank > 0){
                        tank -= ((speed*0.0005)+0.02);
                    }
         }, vfuel*3.6);

        _speedtick = alt.everyTick(()=>{

                    if(tank <= 1){
                        native.setVehicleEngineOn(vehicle,false, true, true); 
                    }
                    drawtext(subtitle, 0.5, 0.95, 0, 0.5, 0.9, 255,255,255,255,0);
                    drawtext(speed+' Km/h', 0.2, 0.85, 4, 0.8, 0.9, 255,255,255,255,0);
                    drawtext(bensin, 0.2, 0.90, 4, 0.5, 0.9, 255,255,255,255,0);
                    drawtext('Engine', 0.2, 0.935, 4, 0.4, 0.9, 255,255,255,255,0);
                    native.drawRect(0.2, 0.919,0.062,-0.026, 0,0,0,150,false)
                    native.drawRect((((tank-100)*0.0006)+0.4)/2, 0.92,tank*0.0006,-0.025, 0,100,220,155,false)
                    native.drawRect(0.2, 0.949,0.062,0.023, 0,0,0,150,false)
                    native.drawRect((((vhealth-1000)*0.00006)+0.4)/2, 0.95,vhealth*0.00006,0.024, (1000-vhealth)/4,(vhealth/1000)*255,(vhealth/1000)*55,155,false)

        });
               

                alt.on('keydown', (keycode) => {
                    if(vehicle && keycode == 37){
                        native.setVehicleIndicatorLights(vehicle, 0, false);
                        native.setVehicleIndicatorLights(vehicle, 1, true);
                        native.drawRect
                    }else if(vehicle && keycode == 39){
                        native.setVehicleIndicatorLights(vehicle, 1, false);
                        native.setVehicleIndicatorLights(vehicle, 0, true);
                    }else if(vehicle && keycode == 40){
                        native.setVehicleIndicatorLights(vehicle, 1, false);
                        native.setVehicleIndicatorLights(vehicle, 0, false);
                    } 
                    if(alt.Player.local.vehicle && keycode == 69 && countermeasure > 0){
                        planecounter(vehicle, model, countermeasure)
                    } 
                    if(alt.Player.local.vehicle && keycode == 66 && bom > 0){
                        planebomb(vehicle, model, bom)
                    } 
                    
                });
           // }
});

let lastveh;

alt.onServer('closeHud', (veh) => {
    //native.displayRadar(false)
    lastveh = veh;
            alt.clearEveryTick(_speedtick);
            alt.clearInterval(speedo);
            alt.clearInterval(Fuel);
            alt.emitServer('pertamax', veh, tank);
            alt.emit('pdmtestclose');
            stopsmoke()
})

let fuelbar;
let vol=0;
let price=0;
let liter;
let fill, count = 0

alt.on('drawfuel', ()=>{
    fuelbar = alt.everyTick(()=>{
        drawtext('Vol: '+Math.round(vol)+' L', 0.45, 0.333, 4, 0.7, 0.9, 255,255,255,255,0);
        drawtext('Price: $ '+Math.round(price), 0.55, 0.333, 4, 0.7, 0.9, 255,255,255,255,0);
        drawtext('Fuel', 0.5, 0.27, 4, 0.8, 0.9, 255,255,255,255,0);
        native.drawRect(0.5, 0.298,0.204,0.054, 0,0,0,150,false)
        native.drawRect((((tank-100)*0.002)+1)/2, 0.299,tank*0.002,0.05, 0,100,220,155,false)
        native.drawRect(0.5, 0.359,0.204,0.052, 0,0,0,150,false)
        native.drawRect(0.45, 0.36,0.09,0.046, 250,0,0,150,false)
        native.drawRect(0.55, 0.36,0.09,0.046, 250,0,0,150,false)
        
    })
})

alt.on('fuelstop', ()=>{
    vol = 0;
    price = 0;
    if(fuelbar > 0) {
        alt.clearEveryTick(fuelbar);
    } else {}
})

alt.on('buy', (price)=>{
    if(price > 0){
    if(price > cash){
        bank -= (price - cash);
        cash-=cash;
    } else cash -= price;
    showcashreduce('cash -$', price, 225, 0,0);
    alt.log('you paid $', price)
} else {}
})

alt.on('paid', (price, text)=>{
    if(price < bank) {
        bank -= price;
        showcashreduce('Bank -$', price, 225, 0,0);
    } else {
        cash -= price;
        showcashreduce('Cash -$', price, 225, 0,0);
    }
    notification(text);
    alt.log('you paid ',text, price)
    
})

alt.onServer('gotmoney', (price)=>{
    cash += price;
    showcashreduce('cash +$', price, 0, 100,200);
    alt.log('you got money $', price)
    //picnotification('',9,'Cash +'+price,'','' )
})

alt.on('fillgas', ()=>{
    setMeta('tank', tank);
    if(vclass == 8){
        liter = (vfuel*0.0005)-0.03;
    } else
    liter = (vfuel*0.0005)+0.05;
    if(tank >= 99){
        alt.emit('gasfull', 'FUEL TANK IS FULL!!!')  
    } else {
        let bensin = getMeta('tank');
        vol = 0;
        price = 0;
        if(cash > (liter * ((101-bensin)*300))){
            game.playSound(0, "Garage_Door_Open", "GTAO_Script_Doors_Faded_Screen_Sounds", true, 0, false);
        fill = alt.setInterval(()=>{
            tank += 1;
            vol += liter
            price = Math.round(vol*1.5);
            },300)  
    } else shownotif('NOT ENOUGH MONEY!');
    let isi = alt.setInterval(()=>{
        cash -= price;
        alt.emitServer('pertamax', lastveh, tank);
        showcashreduce('cash -$', price, 225,0,0);
    alt.clearInterval(fill);
    alt.clearInterval(isi);

},(101-bensin)*300);
}});

alt.onServer('playerjoin', (data, name, total)=>{

        if(alt.Player.local.id == data) { } 
        else {
            picnotification('', 4, 'Player Join', name, "")
           // getmugshot(player.name, player.id, player.scriptID)   
        }
})
  
alt.on('notif', (text)=>{
    notification(text);
})

alt.onServer('deathnote', (playerd, killer)=>{
    if(alt.Player.local.id == playerd.id) {} else {
        notification(killer+' kill '+playerd.name)
    }
})

alt.on('pvpnotif', (data)=>{
    notification('~b~'+data.name+' ~w~'+data.death+'~r~ VS ~w~'+data.kill+' ~b~'+alt.Player.local.name)
})

function showcashreduce(text, price, r,g,b){
    let moneyplusmin = alt.everyTick(()=>{
        drawtext('bank $'+ bank, 0.5, 0.05, 7, 0.6, 0.9, 109,236,143,255,0);
        drawtext('cash $'+ cash, 0.5, 0.085, 7, 0.6, 0.9, 44,178,80,255,0);
    drawtext(text+ price, 0.5, 0.12, 7, 0.5, 0.9, r,g,b,255,0);
    })
    let money = {bank:bank, cash:cash}
    //alt.LocalStorage.set('money', money);
    //alt.LocalStorage.save();
    alt.emitServer('updatedata', 'accounts','money', money, false)
    setMeta('money', money);
    //alt.emitServer('playermoney', money);
    
    let showcash = alt.setInterval(()=>{
        alt.clearEveryTick(moneyplusmin);
        alt.clearInterval(showcash);
    },5000);
}

alt.on('saving',()=>{
    let money = {bank:bank, cash:cash}
    alt.clearEveryTick(pstat);
    alt.LocalStorage.set('money', money);
    alt.LocalStorage.save();
});


function shownotif(text) {
    let notif = alt.everyTick(()=>{
    drawtext(text, 0.5, 0.27, 4, 0.7, 0.9, 228,223,102,255, 0);
    })
    let text2 = alt.setInterval(()=>{
        alt.clearEveryTick(notif);
        alt.clearInterval(text2);
    }, 5000);
}

export function drawtext(msg, x, y, font, scale, wrap, r, g, b, a, j) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(font);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, wrap);
    native.setTextCentre(true);
    native.setTextColour(r,g,b,a);
    native.setTextOutline();
    native.setTextJustification(j);
    native.setTextDropShadow(true);
    native.endTextCommandDisplayText(x, y, 0);
}

function drawtext2(msg, x, y, font, scale, wrap, r, g, b, a, j) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(font);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, wrap);
    native.setTextCentre(true);
    native.setTextColour(r,g,b,a);
    native.setTextJustification(j);
    native.setTextDropShadow(true);
    native.endTextCommandDisplayText(x, y, 0);
}

function getmugshot(name, id, scriptid) {
    let mshot = native.registerPedheadshotTransparent(scriptid);
    let time = alt.setInterval(()=>{
        let ready = native.isPedheadshotReady(mshot);
        let valid = native.isPedheadshotValid(mshot);
        if(ready == true && valid == true) {
            alt.clearInterval(time);
            let mugshot = native.getPedheadshotTxdString(mshot)
            native.releasePedheadshotImgUpload(mshot)
            //alt.emitServer('playerpic', mugshot);
            if(scriptid == alt.Player.local.scriptID) {
                alt.setMeta('ppic', mugshot);
            }  
            profilpic.playername = name
            profilpic.playerpic = mugshot
            playerpics[id] = profilpic;
            alt.log('mugshot',name, mugshot)
            picnotification(mugshot, 4, 'Player join', name, "")
        } else {
        if(count == 3) {
            alt.clearInterval(time);
            alt.log('player join', name, 'total player ', total)
            count = 0
            picnotification('', 4, 'Player Join', name, "")
        } else {
            count + 1
        }
    }
    }, 2000);
    
}

function notification(message) {
    native.beginTextCommandThefeedPost('STRING')
    native.setColourOfNextTextComponent(-1)
    native.thefeedSetBackgroundColorForNextPost(140)
    //native.thefeedSetFlashDurationParameterForNextMessage()
    native.thefeedSetRgbaParameterForNextMessage(0,0,0,50)
    native.addTextComponentSubstringPlayerName(message)
    native.endTextCommandThefeedPostTicker(false, true)
   // native.endTextCommandThefeedPostVersusTu()
}

function picnotification(pic, icon, sender, message1, message2) {
    native.beginTextCommandThefeedPost('STRING')
    native.setColourOfNextTextComponent(-1)
    //native.thefeedSetScriptedMenuHeight(0.1)
    native.thefeedSetBackgroundColorForNextPost(140)
    //native.thefeedSetFlashDurationParameterForNextMessage(1000)
    //native.thefeedSetSnapFeedItemPositions(true);
    native.thefeedSetRgbaParameterForNextMessage(0,150,100,50)
    native.addTextComponentSubstringPlayerName(message2)
    native.endTextCommandThefeedPostMessagetext(pic,pic, true, icon, sender, message1)
    native.endTextCommandThefeedPostTicker(false, false)
}

function handletext(text) {
	native.beginTextCommandDisplayHelp("STRING");
	native.addTextComponentSubstringKeyboardDisplay(text);
	native.endTextCommandDisplayHelp(0, 0, true, -1);
};
