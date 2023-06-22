import * as alt from 'alt-server';

alt.log("LSC Loaded");

const positions = {
  garage2 : { lsc : { x: -210.975, y: -1323.923, z: 30.290 }, }, //Bennys Garage
  garage3 : { lsc : { x: 110.665, y: 6625.531, z: 31.098 }, }, //Beekers Garage
  garage4 : { lsc : { x: 1175.417, y: 2642.307, z: 37.268 }, }, //Sandy Shores
  garage6 : { lsc : { x: -342.047, y: -137.584, z: 38.519 }, }, //Burton
  garage8 : { lsc : { x: 729.122, y: -1088.153, z: 21.679 }, }, //La Mesa
  garage10 : { lsc : { x: -1154.665, y: -2002.482, z: 12.690 }, },  //Los Santos Airport
};

const lscshape = {
  garage2 : { lsc : null, },
  garage3 : { lsc : null, },
  garage4 : { lsc : null, },
  garage6 : { lsc : null, },
  garage8 : { lsc : null, },
  garage10 : { lsc : null, },
}

alt.onClient("Repair", (player, vehicle) => {
  if(vehicle = player.vehicle) {
    vehicle.repair()
  }
});

alt.onClient('vehmod', (player, veh, modtype, modid, modkit) => {
  //veh.modKitsCount
    veh.modKit = modkit;
      veh.setMod(modtype, modid);

});

alt.onClient('vehplate', (player, veh, modid) => {
      veh.numberPlateIndex = modid;
});

alt.onClient('vehwin', (player, veh, modid) => {
      veh.windowTint = modid;
});

alt.onClient('wheelmod', (player, veh, modtype, modid) => {
  veh.modKit = 1;
     veh.setWheels(modtype, modid);
     veh.setRearWheels(modid);
});

alt.onClient('wheelcol', (player, veh,  modid) => {
     veh.wheelColor = modid;
});

alt.onClient('wheelcust', (player, veh, bool)=>{
  veh.customTires = bool;
})

alt.onClient('smokecol', (player, veh, tcolor1, tcolor2, tcolor3) => {
  veh.modKit = 1;
  veh.setMod(20, 1);
     veh.tireSmokeColor = {r: tcolor1, g: tcolor2, b: tcolor3, a: 255 };
});


alt.onClient('vehcolor1', (player, veh, color) => {
      //const vehicle = player.vehicle
      veh.primaryColor = color
});

alt.onClient('vehcolor2', (player, veh, color) => {
  veh.secondaryColor = color
});

alt.onClient('vehcolor3', (player, veh, color) => {
  veh.pearlColor = color
});

alt.onClient('dashcolor', (player, veh, color) => {
  veh.dashboardColor = color;
});

alt.onClient('xenon', (player, veh, modid) => {
  veh.headlightColor = modid;
});

alt.onClient('neonEn', (player, veh, f, b, l, r) => {
  veh.neon = {front: f, back: b, left: l, right: r };
});

alt.onClient('neonCol', (player, color1, color2, color3) => {
  const vehicle = player.vehicle
  vehicle.neonColor = {r: color1, g: color2, b: color3, a: 255 };

});

alt.onClient('cleanvehicle', (player)=>{
  const vehicle = player.vehicle
  vehicle.dirtLevel = 0;
})

