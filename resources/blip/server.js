import alt, { Player, PointBlip } from 'alt-server';

var vehicleSprite = [
    326,
    724,
    821,
    326,
    824,
    756,
    523,
    825,
    348,
    757,
    318,
    85,
    67,
    348,
    410,
    422,
    423,
    513,
    56,
    421,
    477,
    795, // Train
];

var cfg = {
    defaultBlip: {
        sprite: 1,
        scale: 1.0,
        alpha: 225,
        color: 0,
    },
    vehicleBlip: {
        sprite: 326,
        scale: 1.0,
        alpha: 225,
        color: 0,
    },
    houseBlip: {
        sprite: 417,
        scale: 1.0,
        alpha: 225,
        color: 0,
    }
}

var createdBlips = []
var houseBlips = []
PointBlip.all.forEach(function (blip) { return blip.destroy(); });

alt.on('playerConnect', function(player) {
    var playerBlip = new PointBlip(0, 0, 0);
        playerBlip.alpha = 0;
        createdBlips[player.id] = playerBlip;
        var houseBlip = new PointBlip(0, 0, 0);
        houseBlip.alpha = 0;
        houseBlips[player.id] = houseBlip;
        //PlayerBlip(player, cfg.defaultBlip);
        
        alt.emitClientRaw(player, 'bliphide', player);
});

alt.on('playerDisconnect', function (player) {
    if (!createdBlips[player.id])
        return;
    createdBlips[player.id].display = 0;
    createdBlips[player.id].destroy();
    if (!houseBlips[player.id])
        return;
    houseBlips[player.id].display = 0;
    houseBlips[player.id].destroy();
});

alt.onClient('inthehouse', function (player, pos) {
    createdBlips[player.id].alpha = 0;
   
   // if(!houseBlips[player.id]) {
    player.giveWeapon(0xA2719263, 1, true);
    alt.emitClient(player, 'stopwandercar');
    alt.emitClient(player, 'stopshop');
        HouseBlip(player, cfg.houseBlip, pos);
        //houseBlips[player.id].display = 1;
       // alt.emitAllClientsRaw('bliprefresh');
        alt.emitClientRaw(player, 'bliphide', player);
   // }else {}
})

alt.onClient('outroom', function(player) {
    PlayerBlip(player, cfg.defaultBlip);
    alt.emitClient(player, 'startwandercar')
    alt.emitClient(player, 'startshop');
    houseBlips[player.id].alpha = 0;
    //createdBlips[player.id].display = 1;
    alt.emitClientRaw(player, 'bliphide', player);
    //alt.emitAllClientsRaw('bliprefresh');
})

alt.onClient('hideblip', function(player) {
    createdBlips[player.id].alpha = 0;
})

alt.onClient('vehclass', function(player, vclass) {
  if(player.dimension !== player.id) {
    PlayerBlip(player, cfg.vehicleBlip, vehicleSprite[vclass])
  }
})

setInterval(function () { 
    Player.all.forEach(function (player) {
        if (createdBlips[player.id] == null)
            return;
        if (player.dimension == player.id)
            createdBlips[player.id].alpha = 0;
            //return;
        
        createdBlips[player.id].pos = player.pos;
        createdBlips[player.id].alpha = 225;
        
    });
}, 50);

function PlayerBlip(player, data, sprite) {
    alt.log(sprite)
    var blip = createdBlips[player.id];
    blip.sprite = sprite ? sprite : data.sprite;
    blip.color = data.color;
    blip.alpha = data.alpha;
    blip.name = player.name;
    createdBlips[player.id] = blip;
}

function HouseBlip(player, data, pos) {
    var blip = houseBlips[player.id];
    blip.sprite = data.sprite;
    blip.color = data.color;
    blip.alpha = data.alpha;
    blip.name = player.name;
    houseBlips[player.id].pos = pos;
}