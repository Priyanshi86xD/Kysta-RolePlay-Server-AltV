import * as alt from 'alt-server';

let warblips = []
let warzones = []

alt.onClient('startwarzone', (player)=>{
    let pos = player.pos;
    let warblip = new alt.AreaBlip(pos.x, pos.y, pos.z, 1000, 100);
    warblip.alpha = 100;
    warblip.color = 1;
    warblips[player.id] = warblip;
    warzone(pos);
})

function warzone(pos) {
    let arena = new alt.ColshapeCylinder(pos.x, pos.y, pos.z, 1000, 500);

}