import * as alt from 'alt-server';

alt.onClient('lesterdoor', (player)=>{
    let level = player.getSyncedMeta('rank');
    if(level >= 10) {
        alt.emitClient(player, 'lesterset')
    } else {
        alt.emitClient(player, 'lesternot')
    }
})