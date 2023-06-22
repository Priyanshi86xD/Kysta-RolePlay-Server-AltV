import * as alt from 'alt-server';

const pomlocation = {
  pom1 : { pom : { x: -723.4592, y: -935.8537, z: 19.2139 },},
  pom2 : { pom : { x: -68.8666, y: -1762.2250, z: 29.3925  },},
  pom3 : { pom : { x: 269.1527, y: -1264.9862, z: 29.1429  },},
  pom4 : { pom : { x: 812.2198, y: -1028.9410, z: 26.2723  },},
  pom5 : { pom : { x: -2091.8281, y: -312.0596, z: 13.0270  },},
  pom6 : { pom : { x: 1207.3287, y: 2659.6797, z: 37.8998  },},
  pom7 : { pom : { x: 2680.6565, y: 3264.1204, z: 55.2406 },},
  pom8 : { pom : { x: -2555.1062, y: 2327.3074, z: 33.0779  },},
  pom9 : { pom : { x: 183.6960, y: 6605.2417, z: 31.8485  },},
  pom10 : { pom : { x: 2588.2964, y: 361.2392, z: 108.4688  },},
  pom11 : { pom : { x: 1702, y:6418, z: 32.6416  },},
  pom12 : { pom : { x: -1805.4750, y: 802.9376, z: 138.5134   },},
  pom13 : { pom : { x: -94.4441, y: 6419.8457, z: 31.4895  },},
  pom14 : { pom : { x: 264.4612, y: 2606.6116, z: 44.9817  },},
  pom15 : { pom : { x: 50, y:2776, z: 58.0440  },},
  pom16 : { pom : { x: 2539.4612, y: 2594.2424, z: 37.9449  },},
  pom17 : { pom : { x: 1186.1285, y: -333.8720, z: 69.1746  },},
  pom18 : { pom : { x: -529.8272, y: -1209.2400, z: 18.1849  },},
  pom19 : { pom : { x: 1208.5411, y: -1402.7734, z: 35.2242  },},
  pom20 : { pom : { x: 2005, y:3775, z: 32.1808  },},
  pom21 : { pom : { x: 621.1182, y: 268.9331, z: 103.0895  },},
  pom22 : { pom : { x: -1431.4758, y: -282.5051, z: 46.2077  },},
  pom23 : { pom : { x: 1687, y:4929, z: 42.0781 },}, 
  pom24 : { pom : { x: 1043.3528, y: 2671.4436, z: 39.5509   },},
  pom25 : { pom : { x: 175.9648, y: -1562.1593, z: 29.2639   },},
}

const pombensin = {
  pom1 : { pom : null,},
  pom2 : { pom : null,},
  pom3 : { pom : null,},
  pom4 : { pom : null,},
  pom5 : { pom : null,},
  pom6 : { pom : null,},
  pom7 : { pom : null,},
  pom8 : { pom : null,},
  pom9 : { pom : null,},
  pom10 : { pom : null,},
  pom11 : { pom : null,},
  pom12 : { pom : null,},
  pom13 : { pom : null,},
  pom14 : { pom : null,},
  pom15 : { pom : null,},
  pom16 : { pom : null,},
  pom17 : { pom : null,},
  pom18 : { pom : null,},
  pom19 : { pom : null,},
  pom20 : { pom : null,},
  pom21 : { pom : null,},
  pom22 : { pom : null,},
  pom23 : { pom : null,},
  pom24 : { pom : null,},
  pom25 : { pom : null,},
}

alt.onClient('pom', (player)=>{
  if(player instanceof alt.Player){
    //const p = player.getMeta('pom');
    let veh = player.getMeta('lastvehicle');
   // if(p == 1){
      alt.emitClient(player, 'Pom:Menu', veh);
   // } else return;    
  }
});

alt.onClient('givecan', (player) =>{
  player.giveWeapon(0x34A67B97, 100, true);
});

