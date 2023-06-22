import alt from 'alt-client';
import { getMeta, setMeta } from 'alt-shared';


export const highgarage =[
{x: 224.5651,  y:-1002.746,  z: -99, h : -105},
{x: 224.358,  y:-998.8716,  z: -99, h : -105},
{x: 223.6087,  y:-993.9386,  z: -99, h : -105},
{x: 223.6477,  y:-989.0426,  z: -99, h : -105},
{x: 224.1817, y:-983.5068,  z: -99, h : -105},
{x: 234.4395, y:-1000.904,  z: -99, h : 134},
{x: 233.6815,  y:-995.9008,  z: -99, h : 134},
{x: 233,  y:-991.1509 , z: -99, h : 134},
{x: 232.9441,  y:-985.7643 , z: -99, h : 134},
{x: 232.3889 , y:-981.3881,  z: -99, h : 134},
{x: 240.19581604003906,  y: -1004.927734375,  z: -98.9998779296875}, //lift
]

export const mediumgarage =[
{x: 203.9246,  y:-1002.606,  z: -99, h : 180},
{x: 200.8011,  y:-1002.726,  z: -99, h : 180},
{x: 196.1008,  y:-1002.641,  z: -99, h : 180},
{x: 192.8021,  y:-1002.617,  z: -99, h : 180},
{x: 202.5106,  y:-996.9224,  z: -99, h : -90},
{x: 194.3197,  y:-996.7084,  z: -99, h : -90},
{x: 203.9246,  y:-1002.606,  z: -99, h : 180},
]


export const lowgarage =[
 {x: 171.5648,  y:-1003.981,  z: -99, h : 180},
 {x: 175.242,  y:-1004.045,  z: -99, h : 180},
 {x: 175.242,  y:-1004.045,  z: -99, h : 180},
]

const slot = [
    {name: '', meta:'slot1'},
    {name: '', meta:'slot2'},
    {name: '', meta:'slot3'},
    {name: '', meta:'slot4'},
    {name: '', meta:'slot5'},
    {name: '', meta:'slot6'},
    {name: '', meta:'slot7'},
    {name: '', meta:'slot8'},
    {name: '', meta:'slot9'},
    {name: '', meta:'slot10'},
]

let cardata =[]

alt.onServer('vehicledata', (data)=>{
    cardata = data
})

export function savecarindex(data) {
    //alt.LocalStorage.set(data.garageindex, data);
    //alt.LocalStorage.save();
    let slotdata = {
        slot : 1,
        vehicle : data.display,
    }
    setMeta(data.garageindex, slotdata);
    alt.emitServer('updatesubdata', 'accounts', 'vehicles', data.garageindex, data, true)
    cardata[data.garageindex] = data
    let update = alt.setTimeout(()=>{
        alt.clearTimeout(update);
        alt.emitServer('getsubdata', 'accounts', 'vehicledata', 'vehicles');
    }, 5000)
}

alt.on('savecarmod', (data)=>{
savecarindex(data);
})

export function deletecarindex(data) {

    let slotdata = {
        slot : 0,
        vehicle : 'empty',
    }
    setMeta(data, slotdata);
    let vehdata = []
    alt.emitServer('updatesubdata', 'accounts', 'vehicles', data, vehdata, true)
    let update = alt.setTimeout(()=>{
        alt.clearTimeout(update);
        alt.emitServer('getsubdata', 'accounts', 'vehicledata', 'vehicles');
    }, 5000)
}

export function changecarindex(index, garnumber, pos, garagenama,car) {
    //let a = pos;
    //let car = alt.Player.local.vehicle.getSyncedMeta('cardata')
    let garindex = garnumber+slot[pos].meta;

    let vehdata = {
        garagenumber : garnumber,
        garagename : garagenama,
        garageindex : garindex,
        garageslot : pos,
        model : car.model,
        display : car.display,
        color1 : car.color1,
        color2 : car.color2,
        perleascent : car.perleascent,
        dashboardcol : car.dashboardcol,
        engine : car.engine,
        brake : car.brake,
        transmission :car.transmission,
        armor : car.armor,
        turbo : car.turbo,
        spoiler :car.spoiler,
        fbumper : car.fbumper,
        rbumper : car.rbumper,
        skirt : car.skirt,
        exhaust : car.exhaust,
        frame : car.frame,
        grille : car.grille,
        hood : car.hood,
        fender : car.fender,
        rfender : car.rfender,
        roof : car.roof,
        suspension : car.suspension,
        livery : car.livery,
        horn : car.horn,
        window : car.window,
        plate : car.plate,
        wheeltype : car.wheeltype,
        wheelmodel : car.wheelmodel,
        rearwheel : car.rearwheel,
        wheelcolor : car.wheelcolor,
        customtire : car.customtire,
        xenon : car.xenon,
        neon : car.neon,
        neoncolor : car.neoncolor,
        tireSmoke : car.tireSmokecolor,
    }
       // alt.LocalStorage.set(garindex, vehdata);
       // alt.LocalStorage.save();
       // alt.LocalStorage.delete(index);
        setMeta(index, {slot : 0, vehicle : "empty",});
        setMeta(garindex, {slot : 1, vehicle : car.display,});
        alt.emitServer('updatesubdata', 'accounts', 'vehicles', garindex, vehdata, true)
        alt.emitServer('updatesubdata', 'accounts', 'vehicles', index, [], true)
        let update = alt.setTimeout(()=>{
            alt.clearTimeout(update);
            alt.emitServer('getsubdata', 'accounts', 'vehicledata', 'vehicles');
        }, 5000)
        alt.log('car moved '+vehdata.display, index, garindex)
}

alt.onServer('loadplayervehicles', (data)=>{
cardata = data.vehicles
    for(let i in slot) {
        loadplayervehicles('garage1'+slot[i].meta)
        loadplayervehicles('garage2'+slot[i].meta)
        loadplayervehicles('garage3'+slot[i].meta)
        loadplayervehicles('garage4'+slot[i].meta)
        loadplayervehicles('garage5'+slot[i].meta)
        
       // loadplayervehicles(garageslots[i].meta1, garageslots[i].meta2, garageslots[i].meta3)
    }
})

function loadplayervehicles(garage) {
    setMeta(garage, {slot : 0, vehicle : "empty",});
    if(cardata) {
    let car = cardata[garage]
    
    if(!car) {} 
    else if(car.garageindex == garage) {

    setMeta(garage, {slot : 1, vehicle : car.display,});
    }
}
}

alt.onServer('garload', (garnumber, capacity, carindex, garpos)=>{
let pos = garpos;

for(let i in slot) {
        let garage = garnumber+slot[i].meta;
        loadslot(garage, pos[i], carindex);
    
}})

function loadslot(slotdata, pos, carindex) {
    let garslot = getMeta(slotdata);
    
    if(garslot.slot == 1) {
    if(carindex == slotdata) {  } 
    else {
    let car = cardata[slotdata]
    spawncar(car, pos);
    }     
} else {}
}

alt.on('spawnvehicle', (data, pos)=>{
    let car = cardata[data]
    alt.emitServer('spawnpersonalvehicle', car, pos);
})

function spawncar(data, pos) {
alt.emitServer('spawncargarage', data.model, pos, data.color1, data.color2, data.garageindex, data);
}
