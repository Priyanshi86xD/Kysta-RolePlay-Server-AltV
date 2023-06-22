import * as alt from 'alt-client';
import * as native from 'natives';

alt.setInterval(() => {
    for (let veh of alt.Vehicle.all) {
        if (veh.scriptID > 0 && 
            veh.hasStreamSyncedMeta("OrientY") && 
            typeof veh.yawSet === "undefined"
        ) {
            let heading = native.getHeadingFromVector2d(veh.getStreamSyncedMeta("OrientX"), veh.getStreamSyncedMeta("OrientY"));

            if (Math.abs(heading - native.getEntityHeading(veh.scriptID)) > 2) {
                native.setEntityHeading(veh.scriptID, heading);
            } else {
                veh.yawSet = true;
            }
        }
    }
}, 3000);