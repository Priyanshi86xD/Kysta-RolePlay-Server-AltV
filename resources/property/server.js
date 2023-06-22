import alt from 'alt-server';

alt.onClient('buyproperty', (player, housedata, garagedata, price, gar)=>{
    alt.emitClient(player, 'saveproperty', housedata);
    alt.emitClient(player, 'savegarage', garagedata, gar);
    alt.log(player.name, 'buy property', housedata.name, garagedata.nama, price);
    if(player.dimension == player.id) {
        player.pos = {x:housedata.x, y:housedata.y, z:housedata.z}
        player.dimension = 0;
    } else {}
})

alt.onClient('buygarage', (player, gardata, prop)=>{
    alt.emitClient(player, 'savegarage', gardata, prop);
})

alt.onClient('getinhouse', (player, loc) =>{
    player.pos = loc;
    player.dimension = player.id;
})

alt.onClient('getouthouse', (player, loc) =>{
    player.pos = loc;
    player.dimension = 0;
})

alt.onClient('lsbusiness', (player)=>{
    player.pos = {x:-141.1945,y: -620.8729,z: 168.8204}

    alt.emitClient(player, 'lsbusinessinterior', 190.2799072265625);
})

alt.onClient('outbusinessoffice', (player)=>{
    player.pos = {x:-116.11048889160156, y:-604.9024658203125,z: 36.28071975708008}
})