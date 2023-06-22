import * as alt from 'alt-server';


alt.onClient('garageupdate', (player) => {
   // alt.emitClient(player, 'loadgarage');
});

alt.onClient('updateplayercars', (player)=>{
    alt.emitClient(player, 'loadplayervehicles');
    alt.log(player.name+' vehicles updated');
})

alt.onClient('garageloaded', (player, data)=>{
        alt.emitClient(player, 'loadplayervehicles', data);  
        alt.log(player.name+' garage loaded');
});

alt.onClient('garageinside', (player, garage, garnumber, garpos)=>{
    let index;
    let cars = []
    player.dimension = player.id;
    
    if(player.vehicle) {
        cars.push(player.vehicle);
        player.setMeta('activevehicle', 0);
        player.setMeta('playervehicle', 0);
        
        let cardata = player.vehicle.getSyncedMeta('owner')
        index = cardata.index;
        player.vehicle.dimension = player.id;
        player.vehicle.repair()
        
    } else {
        index = player.getMeta('activevehicle');   
    }
    player.setMeta('garagecars', cars)
    alt.emitClient(player, 'garload', garnumber, garage.capacity, index, garpos);
   
    alt.emitClient(player,'createdoor', garage);
    player.setMeta('garage', 1);

})

alt.onClient('outgarage', (player, garage) => {
            let out = alt.setInterval(()=>{
            player.pos = {x:garage.x3, y:garage.y3, z:garage.z3};
            player.dimension = 0;
            alt.clearInterval(out);
            //destroygarage(garage.capacity, player.id);
            player.setMeta('garage', 0);     
            let cars = player.getMeta('garagecars');
            if(cars.length > 0) {
                for(let i in cars) {
                    if(cars[i].dimension == player.id) {
                        cars[i].destroy()
                    }
                }   
            }
            }, 2000)  
        });


alt.onClient('spawncargarage', (player, model, pos, col1, col2, carindex, vehdata)=>{
    let garagecars = player.getMeta('garagecars')
    let car = new alt.Vehicle(model, pos.x, pos.y, pos.z, 0, 0, 0);
    car.dimension = player.id;
    car.primaryColor = col1;
    car.secondaryColor = col2;
    car.pearlColor = vehdata.perleascent;
    car.modKit = 1;
    car.dashboardColor = vehdata.dashcolor;
    car.numberPlateText = player.name;
    car.setMod(0, vehdata.spoiler+1);
    car.setMod(1, vehdata.fbumper+1);
    car.setMod(2, vehdata.rbumper+1);
    car.setMod(3, vehdata.skirt+1);
    car.setMod(4, vehdata.exhaust+1);
    car.setMod(5, vehdata.frame+1);
    car.setMod(6, vehdata.grille+1);
    car.setMod(7, vehdata.hood+1);
    car.setMod(8, vehdata.fender+1);
    car.setMod(9, vehdata.rfender+1);
    car.setMod(10, vehdata.roof+1);
    car.setMod(11, vehdata.engine+1);
    car.setMod(12, vehdata.brake+1);
    car.setMod(13, vehdata.transmission+1);
    car.setMod(14, vehdata.horn+1);
    car.setMod(15, vehdata.suspension+1);
    car.setMod(16, vehdata.armor+1);
    car.setMod(18, vehdata.turbo+1);
    car.setMod(48, vehdata.livery+1);
    car.windowTint = vehdata.window;
    car.numberPlateIndex = vehdata.plate;
    car.setWheels(vehdata.wheeltype, vehdata.wheelmodel);
    car.wheelColor = vehdata.wheelcolor;
    car.headlightColor = vehdata.xenon;
    car.neon = {front:vehdata.neon.f, back: vehdata.neon.b, left: vehdata.neon.l, right: vehdata.neon.r}
    car.neonColor = {r: vehdata.neoncolor[1], g: vehdata.neoncolor[2], b:vehdata.neoncolor[3], a: 255}
    car.customTires = vehdata.customtire;
    car.tireSmokeColor = {r:vehdata.tireSmoke[1], g:vehdata.tireSmoke[2], b:vehdata.tireSmoke[3], a:255};
    let cardata = {owner:player.id, garagenumber: vehdata.garagenumber, garageid:vehdata.garagename, index:carindex, garageslot:vehdata.garageslot}
    car.setSyncedMeta('owner', cardata);
    car.setSyncedMeta('cardata', vehdata)
    car.setSyncedMeta('tank', 100);
    car.setSyncedMeta('rentcar', 0);
    alt.emitClient(player, 'garageheading', car, pos.h);
    alt.emitClient(player, 'wheelproof', car, vehdata.wheelproof);

    garagecars.push(car);
    player.setMeta('garagecars', garagecars)
})

alt.onClient('garageout', (player)=>{
    player.setMeta('garage', 0);   
})

alt.on('playerEnteredVehicle', (player, targetVehicle, seat) => {
    let garasi = player.getMeta('garage');
    if(garasi == 1) {
    if(player instanceof alt.Player) {
        if(targetVehicle = alt.Vehicle) {
            if(seat = -1) {
                    alt.emitClient(player, 'ingaragecar');
                } 
            }
        }
    }else {}
});

alt.on('playerLeftVehicle', (player, targetVehicle, seat) => {
    let garasi = player.getMeta('garage');
                if(garasi == 1) {
    if(player instanceof alt.Player) {
        if(targetVehicle = alt.Vehicle) {
            if(seat = -1) {
                    alt.emitClient(player, 'outgaragecar');
                } 
            }
        }
    } else {}
});

alt.onClient('drive', (player, garage)=>{
    player.dimension = 0;
        player.vehicle.dimension = 0;
        player.setMeta('playervehicle', player.vehicle);
        player.setMeta('garage', 0);
        let cardata = player.vehicle.getSyncedMeta('cardata');
        player.setMeta('activevehicle', cardata.garageindex)
        alt.emitClient(player, 'savepersonalvehicle', cardata);
        let garageout = alt.setInterval(()=>{
            let cars = player.getMeta('garagecars');
            if(cars.length > 0) {
                for(let i in cars) {
                    if(cars[i].dimension == player.id) {
                        cars[i].destroy()
                    }
                }   
            }
            alt.clearInterval(garageout);
        }, 5000);      
})

alt.onClient('changecargarage', (player, cardata) =>{
    alt.emitClient(player, 'savepersonalvehicle', cardata);
})

alt.onClient('loadpersonalvehicle', (player,veh, pos)=> {
    let car = player.getMeta('playervehicle');
    if(car) {
       alt.emitClient(player, 'destroycarblip', car); 
      car.destroy();
    } else {}
    let spawn = alt.setInterval(()=>{
    let pveh = new alt.Vehicle(veh.model, pos.x, pos.y, pos.z+0.2, 0,0,0 );
    pveh.numberPlateText = player.name;
    pveh.primaryColor = veh.color1;
    pveh.secondaryColor = veh.color2;
    
    pveh.setSyncedMeta('tank', 100);
    pveh.setSyncedMeta('rentcar', 0);
    pveh.setSyncedMeta('cardata', veh);
    player.setMeta('playervehicle', pveh);
    let cardata = {owner:player.id, garagenumber: veh.garagenumber, garageid:veh.garagename, index:veh.garageindex, garageslot:veh.garageslot}
    pveh.setSyncedMeta('owner', cardata);
    player.setMeta('activevehicle', veh.garageindex);
    alt.emitClient(player, 'pvehheading', pveh, pos.h);
    alt.emitClient(player, 'carblip', pveh);
    alt.clearInterval(spawn)
    }, 1500);
})

alt.onClient('spawnpersonalvehicle', (player, veh, pos)=>{
    let car = player.getMeta('playervehicle');
    if(car) {
       alt.emitClient(player, 'destroycarblip', car); 
      car.destroy();
    } else {}
    let spawn = alt.setInterval(()=>{
    let pveh = new alt.Vehicle(veh.model, pos.x, pos.y, pos.z+0.2, 0,0,0 );
    pveh.numberPlateText = player.name;
    pveh.primaryColor = veh.color1;
    pveh.secondaryColor = veh.color2;
    pveh.pearlColor = veh.perleascent;
    pveh.setSyncedMeta('tank', 100);
    pveh.setSyncedMeta('rentcar', 0);
    pveh.setSyncedMeta('cardata', veh);
    player.setMeta('playervehicle', pveh);
    pveh.modKit = 1;
    pveh.dashboardColor = veh.dashcolor;
    pveh.setMod(0, veh.spoiler+1);
    pveh.setMod(1, veh.fbumper+1);
    pveh.setMod(2, veh.rbumper+1);
    pveh.setMod(3, veh.skirt+1);
    pveh.setMod(4, veh.exhaust+1);
    pveh.setMod(5, veh.frame+1);
    pveh.setMod(6, veh.grille+1);
    pveh.setMod(7, veh.hood+1);
    pveh.setMod(8, veh.fender+1);
    pveh.setMod(9, veh.rfender+1);
    pveh.setMod(10, veh.roof+1);
    pveh.setMod(11, veh.engine+1);
    pveh.setMod(12, veh.brake+1);
    pveh.setMod(13, veh.transmission+1);
    pveh.setMod(14, veh.horn+1);
    pveh.setMod(15, veh.suspension+1);
    pveh.setMod(16, veh.armor+1);
    pveh.setMod(18, veh.turbo+1);
    pveh.setMod(48, veh.livery+1);
    pveh.windowTint = veh.window;
    pveh.numberPlateIndex = veh.plate;
    pveh.setWheels(veh.wheeltype, veh.wheelmodel);
    pveh.wheelColor = veh.wheelcolor;
    pveh.headlightColor = veh.xenon;
    pveh.neon = {front:veh.neon.f, back: veh.neon.b, left: veh.neon.l, right: veh.neon.r}
    pveh.neonColor = {r: veh.neoncolor[1], g: veh.neoncolor[2], b:veh.neoncolor[3], a: 255}
    pveh.customTires = veh.customtire;
    pveh.tireSmokeColor = {r:veh.tireSmoke[1], g:veh.tireSmoke[2], b:veh.tireSmoke[3], a:255};
    alt.emitClient(player, 'wheelproof', pveh, veh.wheelproof);
    
    let cardata = {owner:player.id, garagenumber: veh.garagenumber, garageid:veh.garagename, index:veh.garageindex, garageslot:veh.garageslot}
    pveh.setSyncedMeta('owner', cardata);
    player.setMeta('activevehicle', veh.garageindex);
    alt.emitClient(player, 'pvehheading', pveh, pos.h);
    alt.emitClient(player, 'carblip', pveh,);
    alt.emitClient(player, 'savepersonalvehicle', veh);
    alt.clearInterval(spawn)
    }, 1500);
})

alt.onClient('reqreturnvehicle', (player)=>{
    let veh = player.getMeta('playervehicle');
    alt.emitClient(player, 'destroycarblip', veh);
    let dest = alt.setInterval(()=>{
        veh.destroy();
        alt.clearInterval(dest)
    }, 1000);
    player.setMeta('activevehicle', 0);
})

alt.onClient('cardata', (player,data)=>{
    player.vehicle.setSyncedMeta('cardata', data)
})