import alt, { Entity } from 'alt-server';


const motelpos= [
    { x: 318.1509, y: 2623.7537, z: 44.4703 }, //route68
    { x: 1141.3378, y: 2664.0466, z: 38.1609 },
]

const motel = [{x: 152.2605, y: -1004.471, z: -98.99999},
{x: 261.4586, y: -998.8196,z:-99.00863}]


const rentroom =[
    { x: 340.6799, y: 2616.3550, z: 44.6285 },
    { x: 1136.3059, y: 2642.8999, z: 38.1437 },
]

const roompos = { x: -127.4632, y: -1457.2163, z: 37.7919 }

const doorpos = { x:151.3027, y:-1007.7420, z:-98.99999}

alt.onClient('motel', (player)=>{
    alt.emitClient(player, 'house');
    alt.emitClient(player, 'jobwarn', 'Go to ~y~Destination~y~');
})


alt.onClient('motelarrive', (player, houserent, roompos) => {
            alt.emitClient(player, 'jobwarn', 'Go to your ~y~Room~y~');
            alt.emitClient(player, 'introfinish');
            alt.log(player.name+' intro finished');
});

alt.onClient('sethouse', (player, housepos, spawnpos, carpos)=>{
    player.pos = {x: spawnpos.x, y: spawnpos.y, z: spawnpos.z}
    player.dimension = player.id;
    
   // alt.emitClient(player, 'room', roompos)
    alt.emitClient(player, 'fadein');
    let weap = alt.setInterval(()=>{
        player.giveWeapon(0xA2719263, 1, true);
        alt.emitClient(player, 'loadplayervehicle', carpos);  
        alt.clearInterval(weap);
    }, 2000);
    
})



alt.onClient('roomout', (player, pos)=>{
        //alt.emitClient(player, 'outfadein');
        //alt.emitClient(player, 'getoutroom');
                let keluar = alt.setInterval(()=>{
                    player.pos = {x:pos[0].x, y:pos[0].y, z:pos[0].z}
                    player.dimension = 0;
                    //alt.emitClient(player, 'startcount');
                    alt.clearInterval(keluar);
    },2000)
               
});

alt.onClient('enterhouse', (player, house)=>{
    let kamar = alt.setInterval(()=>{
        player.pos = {x: house.x1, y: house.y1, z: house.z1}
        player.dimension = player.id;
        player.giveWeapon(0xA2719263, 1, true);
        alt.emitClient(player, 'houseint', house)
        alt.clearInterval(kamar);
    }, 2000);
})

alt.onClient('exithouse', (player, housepos)=>{
            let keluar = alt.setInterval(()=>{
                player.pos = {x:housepos.x, y:housepos.y, z:housepos.z}
                player.dimension = 0;
                alt.clearInterval(keluar);
                alt.emitClient(player, 'unloadipl', housepos.ipl);
},2000)    
});

alt.onClient('editchar', (player)=>{
    alt.emitClient(player, 'careditormenu');
})

alt.onClient('sleep', (player)=>{
    let bed = player.getMeta('bed');
    if(bed == 1){
        alt.emitClient(player, 'gotobed');
    } else if(bed == 0) {}
})

alt.onClient('gotoroom', (player, pos)=>{
    alt.emitClient(player, 'jobwarn', '');
        let kamar = alt.setInterval(()=>{
            player.pos = {x: pos[2].x, y: pos[2].y, z: pos[2].z}
            player.dimension = player.id;
            player.giveWeapon(0xA2719263, 1, true);
            alt.clearInterval(kamar);
        }, 1000);
});

alt.onClient('defaulthouseset', (player, house)=>{
    player.pos = {x: house.x3, y: house.y3, z: house.z3}
    player.dimension = player.id;
    player.visible = true;
    alt.emitClient(player, 'houseint', house)
    let weap = alt.setInterval(()=>{
        player.giveWeapon(0xA2719263, 1, true);
        alt.clearInterval(weap);
    }, 2000);
})
function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  
  function getRandomListEntry(list) {
    return randomNumber(0, list.length - 1);
  }

