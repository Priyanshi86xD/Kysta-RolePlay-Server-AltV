import * as alt from "alt-server";
import { vehicleGenerators } from "./CarGenerators.js";
import { colorlessVehicles } from "./ColorlessCars.js";
import { vehiclePopGroups } from "./PopGroup.js";


const ALLOWED_FLAGS = [ 1632, 3616,];

const colors = [
    1,4,8,10,34,112,118,141,153,31,26,18,20
]

const _vehicles = [];

const _takenSpots = [];

alt.on('spawnparkedcars', (num)=>{
    spawn(num);
})

function spawn(amount) {
    let vehicleGens = vehicleGenerators.filter((generator) => {
        if (generator.Flags > 5000 || !ALLOWED_FLAGS.includes(generator.Flags))
            return false;
        return true;
    });

    for (
        let i = 0, random, item, model, vehicle, notFound = 0;
        i < amount;
        i++
    ) {
        if (notFound >= vehicleGens.length) break; // * There are no available spots anymore, cancel the loop
        random = getRandomInt(0, vehicleGens.length - 1);
        item = vehicleGens[random]; // * Get a random parking spot from the JSON data

        let spawnpos = new alt.Vector3(
            Math.ceil(item.Position.x / 5),
            Math.ceil(item.Position.y / 5),
            Math.ceil(item.Position.z / 5)
        );
        if (
            !!_takenSpots.find(
                (spot) =>
                    spot.x === spawnpos.x &&
                    spot.y === spawnpos.y &&
                    spot.z === spawnpos.z
            )
        ) {
            // * The spot is already taken, try again
            notFound++;
            i--;
            continue;
        }
        _takenSpots.push(spawnpos);

        // * Determine the correct vehicle model
        if (item.CarModel !== "") model = item.CarModel;
        else if (item.PopGroup !== "")
            model =
                vehiclePopGroups[item.PopGroup][
                    getRandomInt(0, vehiclePopGroups[item.PopGroup].length - 1)
                ];
        else
            model =
                vehiclePopGroups["none"][
                    getRandomInt(0, vehiclePopGroups["none"].length - 1)
                ];

        // * Create the vehicle
        vehicle = new alt.Vehicle(
            model,
            item.Position.x,
            item.Position.y,
            item.Position.z + 0.2,
            0,
            0,
            0
        );
        vehicle.setStreamSyncedMeta("OrientX", item.OrientX);
        vehicle.setStreamSyncedMeta("OrientY", item.OrientY);
        vehicle.setSyncedMeta("tank", getRandomInt(10, 70));
        vehicle.setSyncedMeta('rentcar', 0);
        vehicle.numberPlateText = 'FC '+vehicle.id+' WK'
        
        // * Set the vehicle color
        if (!colorlessVehicles.includes(model)) {
            let vcolor = colors[getRandomInt(0, colors.length-1)];
            vehicle.primaryColor = vcolor
            vehicle.secondaryColor = vcolor
        }

        vehicleGens.splice(random, 1);
        _vehicles.push(vehicle);
        notFound = 0;
    }

    //alt.log(`Created ${_vehicles.length} generated vehicles`);
}

export function clear() {
    let vehs = Array.from(_vehicles);
    _vehicles = [];
    vehs.forEach((veh) => veh.destroy());
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
