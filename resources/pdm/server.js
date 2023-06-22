import alt, { getMeta } from 'alt-server';
import { VehicleData } from './vehicles.js';

const vsell = VehicleData.filter(function(vehicle){
    return vehicle.sell == true;
})

const vsella = vsell.filter(function(vehicle){
        return vehicle.price > 500000;
})

const vsellb = vsell.filter(function(vehicle){
    return vehicle.price > 50000;
})

const bikes = vsellb.filter(function(vehicle){
    return vehicle.class == 'MOTORCYCLE';
})

const colors = [
    150,135,134,89,55,70,41,3,0
]

const carpos = [
{ x: -48.6403, y: -1101.3960, z: 25.9096, h:196.6592559814453 },
{ x: -45.2462, y: -1100.3748, z: 25.9073, h:196.6592559814453 },
{ x: -48.4700, y: -1092.5238, z: 25.9093, h:114.52450561523438 },
{ x: -43.4913, y: -1094.5126, z: 25.9071, h:114.52450561523438 },
{ x: -56.9296, y: -1097.7310, z: 25.9101, h:119.26683044433594 },
{ x: -48.3478, y: -1117.1853, z: 25.9184, h:0.8247500658035278 },

{    x: -786.3004760742188,    y: -246.552001953125,    z: 56.845680236816406  },

]

const vehiclename = [
    'SUPER', 'SPORT', 'SEDAN', 'MUSCLE',
]
const plate = [
    'big bos', 'super', 'fast', 'highlife', 'ndasmu', 'speed', 'turbo', 'ngacir', 'mabar', '1 fo all', 'jang an', 'anjay',
]

const vehcolor = [
    4,7,28,35,38,42,44,55,70,73,89,92,138,139,140
]
function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  
  function getRandomListEntry(list) {
    return randomNumber(0, list.length - 1);
  }

alt.onClient('pdmcreate', (player, coord, vclass)=>{
    let car = player.vehicle;
    //car.setSyncedMeta('pdmmenu', 0);
    //alt.log(player.name, player.id, 'test drive');
    let create = alt.setInterval(()=>{
        if(vclass == 8){
            createbike(coord.x, coord.y,coord.z, 120)
        } else
        createcar(coord.x, coord.y,coord.z, 120);
            alt.clearInterval(create);
    }, 60000*2)
})

alt.on('playerConnect', (player) => {
    player.setMeta('pdmveh', 0);
    player.setMeta('rentalveh', 0);
    player.setMeta('playervehicle', 0);
});


createcar(-48.6306, -1101.7507, 26.2712-0.2, 120);
createcar(-42.2325, -1101.4946, 26.2712-0.2, 120); 
createcar(-42.9381, -1095.5018, 26.2712-0.2, 120);
createcar(-46.2810, -1094.2317, 26.2712-0.2, 120);   
createbike(-35.6112, -1100.8899, 26.2712-0.2, 120); 
createbike(-35.6112, -1098.6189, 26.2712-0.2, 120);
createbike(-35.6112, -1102.7849, 26.2712-0.2, 120);

createcar(-786.664135742188,-243.04656372070312,37.5, 90);  //luxury
createcar(-790.564135742188,-235.84656372070312,37.5, 130);  //luxury
//});

function createcar(x, y, z, h){
    let vehname = vehiclename[getRandomListEntry(vehiclename)];
    let color = vehcolor[getRandomListEntry(vehcolor)];
    const vehicles = vsella.filter(function(vehicle){
        return vehicle.class == vehname;
    })
    let pdmcar = vehicles[getRandomListEntry(vehicles)];
    let vehicle = new alt.Vehicle(pdmcar.name, x, y, z, 0,0, 120);
    vehicle.setSyncedMeta('tank', 100);
    vehicle.setSyncedMeta('rentcar', 1);
    vehicle.setSyncedMeta('heading', h);
    vehicle.numberPlateText = plate[getRandomListEntry(plate)]; 
    vehicle.primaryColor = color;
    vehicle.secondaryColor = color;
    vehicle.dashboardColor = 13;
    vehicle.modKit = 1;
    let wing = vehicle.getModsCount(0);
    let fbum = vehicle.getModsCount(1);
    let rbum = vehicle.getModsCount(2);
    let hood = vehicle.getModsCount(7);
    let liv = vehicle.getModsCount(48);
    let vmods = alt.setInterval(()=>{
        if(wing > 1) {
            vehicle.setMod(0, randomNumber(0, wing-1));
        }
        if(fbum > 1) {
            vehicle.setMod(1, randomNumber(0, fbum-1));
        }
        if(rbum > 1) {
            vehicle.setMod(2, randomNumber(0, rbum-1));
        }
        if(hood > 1) {
            vehicle.setMod(7, randomNumber(0, hood-1));
        }
        if(liv > 1) {
            vehicle.setMod(48, randomNumber(0, liv-1));
        }
        alt.clearInterval(vmods);
    }, 500);   
}

function createbike(x, y, z){
    let pdmcar = bikes[getRandomListEntry(bikes)]
    let color = vehcolor[getRandomListEntry(vehcolor)];
    //let livery = randomNumber(0, 10);
    let vehicle = new alt.Vehicle(pdmcar.name, x, y, 26.2712-0.2, 0,0, 120);
    vehicle.numberPlateText = plate[getRandomListEntry(plate)]; 
    vehicle.setSyncedMeta('tank', 100);
    vehicle.setSyncedMeta('rentcar', 1);
    vehicle.setSyncedMeta('heading', 120);
    vehicle.primaryColor = color;
    vehicle.secondaryColor = color;
    vehicle.modKit = 1;
    let liv = vehicle.getModsCount(48);
    if(liv > 1) {
        vehicle.livery = randomNumber(0, liv-1);
    }
}

alt.onClient('rentcooldown', (player)=>{
    alt.emitClient(player, 'jobwarn', 'Rental not available, come again later!')
})

let pdmcatalog = 0

alt.onClient('pdmmenuopen', (player)=>{
    if(pdmcatalog == 0) {
        alt.emitClient(player, 'openpdmmenu');
        pdmcatalog = player.id;
    } else if(pdmcatalog == player.id) {
        alt.emitClient(player, 'openpdmmenu');
    } else {
        alt.emitClient(player, 'pdminfo', "Another player has open the menu");
    }
});

alt.onClient('pdmmenuclose', (player) =>{
    pdmcatalog = 0;
    let pdmveh = player.getMeta('pdmveh');
    if(!pdmveh){}
    else
    pdmveh.destroy();
})

alt.onClient('removecar', (player, veh)=>{
    if(veh) {
        let del = alt.setInterval(()=>{
            alt.clearInterval(del)
            veh.destroy();
        }, 5000)  
    }
});

alt.onClient('rentalmenu', (player)=>{
    let rentmenu = player.getMeta('rentalmenu');
    if(rentmenu == 1) {
        alt.emitClient(player, 'openrentalmenu');
    } else if(rentmenu == 2) {
        sellvehicle(player);
    } else {}
});

alt.onClient('rentcar', (player, veh)=>{
    let rentalveh = player.getMeta('rentalveh');
    if(rentalveh < 1){}
    else
    rentalveh.destroy();
    let vehicle = new alt.Vehicle(veh, 261.9019, -1161.9578, 28.5528, 0,0,0 );
    vehicle.numberPlateText = 'CAR RENT'
    vehicle.primaryColor = randomNumber(0, 92);
    vehicle.secondaryColor = 0;
    vehicle.setSyncedMeta('tank', randomNumber(70, 90));
    vehicle.setSyncedMeta('rentcar', 1);
    player.setMeta('rentalveh', vehicle)
    alt.emitClient(player, 'headrentcar', vehicle, 357.09912109375);
});

let pdmcar;

alt.onClient('pdmspawn', (player, veh)=>{
    let pdmveh = player.getMeta('pdmveh');
    if(pdmveh < 1){}
    else
    
    pdmveh.destroy();
    let vehtime = alt.setTimeout(()=> { 
    let vehicle = new alt.Vehicle(veh, -52.0924, -1092.7548, 26.2712-0.2, 0,0, 120);
    vehicle.numberPlateText = plate[getRandomListEntry(plate)]; 
    vehicle.primaryColor = randomNumber(0, 92);
    vehicle.secondaryColor = 0;
    vehicle.setSyncedMeta('tank', 100);
    player.setMeta('pdmveh', vehicle)
    pdmcar = vehicle;
    let carset = alt.setInterval(()=>{
        alt.emitClient(player, 'pdmcar', vehicle);
        alt.clearInterval(carset);
    }, 100);
    
    alt.clearTimeout(vehtime);
},300);
});

alt.onClient('carbuy', (player, veh)=>{
    pdmcar = veh;
});

alt.onClient('pdmcolor', (player, color)=>{
    let vehicle = pdmcar;
    vehicle.primaryColor = color;
    vehicle.secondaryColor = color;
});

alt.onClient('carpurchased', (player, vehmodel, price, garnumber, garagename, garagecapacity, carindex, display, slot)=>{
    player.setMeta('pdmveh', 0);
    let buycar = alt.setInterval(()=>{
        let cardata = {owner:player.id, garagenumber: garnumber, garageid:garagename, index:carindex, garageslot: slot}
        player.vehicle.setSyncedMeta('owner', cardata);
        player.vehicle.setSyncedMeta('rentcar', 0);
        player.vehicle.numberPlateText = player.name;
        alt.emitClient(player, 'savecar', vehmodel, display, player.vehicle.primaryColor, player.vehicle.secondaryColor, garnumber, garagename, carindex, slot);
        alt.log(player.name+' purchase vehicle '+display+' '+price)
        player.setMeta('playervehicle', player.vehicle);
        player.setMeta('activevehicle', carindex);
        alt.clearInterval(buycar);
    },2000);  
})

alt.onClient('sellcar', (player, price)=>{
    let veh = player.vehicle;
        if(veh.hasSyncedMeta('owner')) {
    let vehowner = veh.getSyncedMeta('owner');
    if(vehowner.owner == player.id) {
        player.setMeta('playervehicle', 0);
        alt.emitClient(player, 'destroycarblip', veh);
        alt.emitClient(player, 'deletevehicle', veh, vehowner);
        player.setMeta('activevehicle', 0);
        alt.emitClient(player, 'gotmoney', price);
        alt.emitClient(player, 'sellingcar', veh);
    } else {
    }
} else {
    alt.emitClient(player, 'sellingcar', veh);
    alt.emitClient(player, 'gotmoney', price);
}
let destroy = alt.setInterval(()=>{
    alt.clearInterval(destroy);
    veh.destroy(); 
}, 5000);
})

alt.onClient('buyaircraft', (player, vmodel, vdisplay, seat, type)=>{
    let plane = player.getMeta('buyplane');
    //let plane = player.vehicle
    
    alt.emitClient(player, 'saveaircraft', vmodel, vdisplay, plane.primaryColor,plane.secondaryColor,plane.pearlColor, seat, type)
    alt.log(player.name, 'buy aircraft ', vdisplay)
    if(plane) {
        plane.destroy()
    }
})

alt.onClient('sellplane', (player, pname, price)=>{
    if(player.vehicle) {
        player.vehicle.destroy();
        alt.emitClient(player, 'gotmoney', price)
        alt.log(player.name, ' sell aircraft ', pname, price)
    }
})

alt.onClient('spawnplane', (player, vmodel, pos, rotate) =>{
    
    let vplane = player.getMeta('buyplane');
    if(vplane) {
        vplane.destroy()
    }
    let plane = new alt.Vehicle(vmodel, pos.x, pos.y, pos.z, 0, 0,0);
    
    player.setMeta('buyplane', plane);
    plane.setSyncedMeta('tank', 100);
    if(rotate == true) {
        plane.dimension = player.id;
        plane.frozen = true
        plane.collision = false
        alt.emitClient(player, 'rotateplane', plane)
    } else {
        alt.emitClient(player, 'airpheading', plane, pos.h, false)
    }  
})

alt.onClient('removebuyplane', (player)=>{
    let vplane = player.getMeta('buyplane');
    if(vplane) {
        vplane.destroy()
    }
})