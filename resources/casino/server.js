import * as alt from 'alt-server';

let casino = new alt.ColshapeCylinder(924.4614868164062,46.42258071899414, 81.10635375976562-1, 2, 1.5)
let ml = new alt.ColshapeCylinder(987.66943359375, 80.0074462890625, 80.99053955078125-1, 2, 1.5)

alt.on('entityEnterColshape', (colshape, entity) => {
    if(entity instanceof alt.Player) {
        if(colshape == casino) {
            alt.emitClient(entity, 'casinonotif')
        } else if(colshape == ml) {
            alt.emitClient(entity, 'mlnotif')
        }
    }
});

alt.on('entityLeaveColshape', (colshape, entity) => {
    if(entity instanceof alt.Player) {
        if(colshape == casino) {
            alt.emitClient(entity, 'casinoof')
        } else if(colshape == ml) {
            alt.emitClient(entity, 'casinoof')
        }
    }
});