import * as alt from 'alt-server';

const bankdoors =  [
    {name: 'fleeca1', no: 1, door1 : {loc  : { x: 316.3251953125,  y: -273.8537292480469,  z: 53.92026138305664}, h :  160.91, txtloc :  { x: 312.93, y: -284.45, z: 54.16}, obj :  null, locked :  true}, door2 : {loc :  { x: 310.93, y: -284.44, z: 54.16}, txtloc :  { x: 310.93, y: -284.44, z: 54.16}, state :  null, locked :  true}},
    {name: 'fleeca2', no: 2, door1 : {loc :  { x: 151.3173065185547,y: -1036.1785888671875, z: 29.339279174804688}, h :  158.54, txtloc :  { x: 148.76, y: -1045.89, z: 29.37}, obj :  null, locked :  true}, door2 : {loc :  { x: 146.61, y: -1046.02, z: 29.37}, txtloc :  { x: 146.61, y: -1046.02, z: 29.37}, state :  null, locked :  true}},
    {name: 'fleeca3', no: 3, door1: {loc :  {  x: -1214.6788330078125, y: -327.0234680175781, z: 37.672847747802734}, h :  213.67, txtloc :  { x: -1209.66, y: -335.15, z: 37.78}, obj :  null, locked :  true}, door2 : {loc :  { x: -1211.07, y: -336.68, z: 37.78}, txtloc :  { x: -1211.07, y: -336.68, z: 37.78}, state :  null, locked :  true}},
    {name: 'fleeca4', no: 4, door1 : {loc :  { x: -2967.711669921875,  y: 483.2257080078125,  z: 15.468698501586914}, h :  267.73, txtloc :  { x: -2957.26, y: 483.53, z: 15.70}, obj :  null, locked :  true}, door2 : {loc :  { x: -2956.68, y: 481.34, z: 15.70}, txtloc :  { x: -2956.68, y: 481.34, z: 15.7}, state :  null, locked :  true}},
    {name: 'fleeca5', no: 5, door1 : {loc :  { x: -349.6382141113281,  y: -44.976810455322266, z: 49.03683090209961}, h :  159.79, txtloc :  { x: -351.97, y: -55.18, z: 49.04}, obj :  null, locked :  true}, door2 : {loc :  { x: -354.15, y: -55.11, z: 49.04}, txtloc :  { x: -354.15, y: -55.11, z: 49.04}, state :  null, locked :  true}},
    {name: 'fleeca6', no: 6, door1 : {loc :  { x: 1175.62353515625,  y: 2701.9619140625,  z: 38.172462463378906}, h :  160.91, txtloc :  { x: 1174.24, y: 2712.47, z: 38.09}, obj :  null, locked :  true}, door2 : {loc :  { x: 1176.40, y: 2712.75, z: 38.09}, txtloc :  { x: 1176.40, y: 2712.75, z: 38.09}, state :  null, locked :  true}},
]

let bankloot = [
    0,0,0,0,0,0
]

let bankped = [
    [0], [0], [0], [0], [0], [0], 
]

setInterval(() => {

for(let player of alt.Player.all) {
    if(player.hasSyncedMeta('onduty')) {} else {
        for(let i in bankdoors) {
            let door = bankdoors[i].door1.loc
        
        let dist = getdistance2d(player.pos.x, player.pos.y, door.x, door.y);
        if(dist <= 30) {
            if(bankloot[bankdoors[i].no-1] > 0) {} else {
            if(player.hasMeta('pedbanks')) {} else {
                alt.emitClient(player, 'setbankped', bankdoors[i].no)
                player.setMeta('pedbanks', bankdoors[i].no)
            }
        } 
    }else {
            let pedbank = player.getMeta('pedbanks');
            if(pedbank == bankdoors[i].no) {
                alt.emitClient(player, 'deletebankped', bankdoors[i].no)
                player.deleteMeta('pedbanks');
            }
        }
        
        if(dist <= 2) {
            if(bankloot[bankdoors[i].no-1] > 0) {
                alt.emitClient(player, 'bankrobnotif', bankdoors[i].no, bankdoors[i].door1.loc, 'This bank already being robbed')
            } else {
            if(player.hasMeta('bankrob')) {} else {
                player.setMeta('bankrob', bankdoors[i].no)
                alt.emitClient(player, 'bankrobnotif', bankdoors[i].no, bankdoors[i].door1.loc, "~INPUT_PICKUP~ Robbing this bank")
            }
        }
        } else {
            let bank = player.getMeta('bankrob');
            if(bank == bankdoors[i].no) {
                player.deleteMeta('bankrob');
                alt.emitClient(player, 'clearbank');
            }
        }
    }
    }
}
}, 1000);

alt.onClient('fleecarobstart', (playerd, bank, pos)=>{
    if(playerd.hasMeta('bankrob')) {
    alt.emitClient(playerd, 'fleecarobbegin');
    alt.emitClient(playerd, 'stopshop');
    alt.log('rob start ',bankdoors[bank].name, playerd.name)
    let copnotif = alt.setInterval(()=>{
        alt.clearInterval(copnotif);
        for(let player of alt.Player.all) {
            if(player.hasSyncedMeta('onduty')) {
                alt.emitClientRaw(player, "robbery", pos, playerd.name)
            }
        }
        
    }, 30000);
}
})

alt.onClient('opendoor', (player, door)=>{
    alt.emitClient(player, 'openvault', door);
})

alt.onClient('lootfinish', (player, bank, trolley)=>{
    bankloot[bank] = trolley
    alt.log('trolley looted', bankloot[bank])
    alt.emitClient(player, 'rppoint', 30);
    if(trolley == 3) {
        alt.emitClient(player, 'lootsuccess');
    }
    
})

alt.onClient('fleecarobfinish', (player, bank, money)=>{
    alt.emitClient(player, 'rppoint', 250);
    if(money > 0) {
        let smoney = alt.setInterval(()=>{
        alt.emitClient(player, 'gotmoney', money);
        alt.log(player.name, "fleeca rob $",money, "rp ",150)
        alt.clearInterval(smoney);
        alt.emitClient(player, 'startshop');
      },3000);
    }
    let reset = alt.setInterval(()=>{
        bankloot[bank] = 0;
        alt.clearInterval(reset);
    }, 60000*30)
})

alt.on('playerConnect', (player) => {
    for(let i in bankdoors) {
        let bank = bankdoors[i]
        alt.emitClient(player, 'createblip', bank.name, "Fleeca Bank", { x: bank.door1.loc.x, y: bank.door1.loc.y, z: bank.door1.loc.z }, 374, 2, 1, true);
    }
    
});

function getdistance2d(x,y,x1,y1) {
    let distx = Math.abs(x - x1)
    let disty = Math.abs(y - y1)
    let dist = Math.sqrt((distx*distx) + (disty*disty));
    return Math.floor(dist);
  }