import * as alt from 'alt-client';
import * as native from 'natives';

const countermeasures = [
    { id:	0	, name : "None", color: {r: 222, g: 222, b: 255}	},
    { id:	1	, name : "Chaff", color: {r: 222, g: 222, b: 255}	},
    { id:	2	, name : "Flare", color: {r: 222, g: 222, b: 255}	},
    { id:	3	, name : "White Smoke", color: { r: 222, g: 222, b: 255}	},
    { id:	4	, name : "Black Smoke", color: { r: 15, g: 3, b: 255}},
    { id:	5	, name : "Blue Smoke",  color: { r: 2, g: 21, b: 255	}},
    { id:	6	, name : "Yellow Smoke", color: { r: 255, g: 255, b: 0	}},
    { id:	7	, name : "Purple Smoke", color: { r: 35, g: 1, b: 255	}},
    { id:	8	, name : "Orange Smoke", color: { r: 255, g: 62, b: 0	}},
    { id:	9	, name : "Green Smoke", color: { r: 94, g: 255, b: 1	}},
    { id:	10, name : "Red Smoke",  color: { r: 255, g: 1, b: 1	}},
    { id:	11, name : "Pink Smoke", color: { r: 255, g: 50, b: 100}	},
    { id:	12, name : "Cyan Smoke", color: { r: 255, g: 5, b: 190	}},
]

let flare_models = {
    [alt.hash("mogul")] : true,
    [alt.hash("rogue")] : true,
    [alt.hash("starling")] : true,
    [alt.hash("seabreeze")] : true,
    [alt.hash("tula")] : true,
    [alt.hash("bombushka")] : true,
    [alt.hash("hunter")] : true,
    [alt.hash("nokota")] : true,
    [alt.hash("pyro")] : true,
    [alt.hash("molotok")] : true,
    [alt.hash("havok")] : true,
    [alt.hash("alphaz1")] : true,
    [alt.hash("microlight")] : true,
    [alt.hash("howard")] : true,
    [alt.hash("avenger")] : true,
    [alt.hash("thruster")] : true,
    [alt.hash("volatol")] : true,
    [alt.hash("titan")] : true,
    [alt.hash("strikeforce")] : true,
    [alt.hash("lazer")] : true,
    [alt.hash("hydra")] : true,
    [alt.hash("akula")] : true,
    [alt.hash("alkonost")] : true,
}


let planeoffset = {
    [alt.hash("cuban800")] : { x: 0.0, y: -3.0, z: -0.3 },
    [alt.hash("mogul")] : { x: 0.0, y: -5.0, z:  0.7 },
    [alt.hash("rogue")] : { x: 0.0, y: -7.0, z:  0.6 },
    [alt.hash("starling")] : { x: 0.0, y: -3.0,  z: 0.6 },
    [alt.hash("seabreeze")] : { x: 0.0, y: -3.0, z:  0.2 },
    [alt.hash("tula")] : { x: 0.0, y: -5.0,  z: 0.7 },
    [alt.hash("bombushka")] : { x: 0.0, y: -21.0,  z: 4.5 },
    [alt.hash("hunter")] : { x: 0.0, y: -6.0, z:  0.0 },
    [alt.hash("nokota")] : { x: 0.0, y: -4.0, z:  0.0 },
    [alt.hash("pyro")] : { x: 0.0, y: -3.0, z:  0.3 },
    [alt.hash("molotok")] : { x: 0.0, y: -5.0,  z: 0.3 },
    [alt.hash("havok")] : { x: 0.0, y: -4.0,  z: 0.3 },
    [alt.hash("alphaz1")] : { x: 0.0, y: -2.5, z:  -0.2 },
    [alt.hash("microlight")] : { x: 0.0, y: -2.0,  z: 0.5 },
    [alt.hash("howard")] : { x: 0.0, y: -3.5,  z: 0.5 },
    [alt.hash("avenger")] : { x: 0.0, y: -10.0,  z: 1.0 },
    [alt.hash("akula")] : { x: 0.0, y: -6.0,  z: 0.0 },
    [alt.hash("thruster")] : { x: 0.0, y: -0.5, z:  0.0 },
    [alt.hash("oppressor2")] : { x: 0.0, y: -1.2,  z: -0.1 },
    [alt.hash("volatol")] : { x: 0.0, y: -20.0,  z: 1.0 }
  }

let bombplanes = {
    [alt.hash("cuban800")] : true,
    [alt.hash("mogul")] : true,
    [alt.hash("rogue")] : true,
    [alt.hash("starling")] : true,
    [alt.hash("seabreeze")] : true,
    [alt.hash("tula")] : true,
    [alt.hash("bombushka")] : true,
    [alt.hash("hunter")] : true,
    [alt.hash("avenger")] : true,
    [alt.hash("akula")] : true,
    [alt.hash("volatol")] : true,
    [alt.hash("alkonost")] : true,
    [alt.hash("strikeforce")] : true,
}

let bombcamoffset = {
    [alt.hash("cuban800")] : { x: 0.0, y: 0.2, z: 1.0 },
    [alt.hash("mogul")] : { x: 0.0, y: 0.2, z: 0.97 },
    [alt.hash("rogue")] : { x: 0.0, y: 0.3, z: 1.10 },
    [alt.hash("starling")] : { x: 0.0, y: 0.25, z: 0.55 },
    [alt.hash("seabreeze")] : { x: 0.0, y: 0.2, z: 0.4 },
    [alt.hash("tula")] : { x: 0.0, y: 0.0, z: 1.0 },
    [alt.hash("bombushka")] : { x: 0.0, y: 0.3, z: 0.8 },
    [alt.hash("hunter")] : { x: 0.0, y: 0.0, z: 1.0 },
    [alt.hash("avenger")] : { x: 0.0, y: 0.0, z: 0.5 },
    [alt.hash("akula")] : { x: 0.0, y: 0.0, z: 0.8 },
    [alt.hash("volatol")] : { x: 0.0, y: 0.0, z: 2.0 },
}

let unk_offsets = {
    [alt.hash("cuban800")] : 0.5,
    [alt.hash("mogul")] : 0.45,
    [alt.hash("rogue")] : 0.46,
    [alt.hash("starling")] : 0.55,
    [alt.hash("seabreeze")] : 0.5,
    [alt.hash("tula")] : 0.6,
    [alt.hash("bombushka")] : 0.43,
    [alt.hash("hunter")] : 0.5,
    [alt.hash("avenger")] : 0.36,
    [alt.hash("akula")] : 0.4,
    [alt.hash("volatol")] : 0.54,
}

let bombmodels = {
    [1] : -1695500020,
    [2] : 1794615063, // fire explosion
    [3] : 1430300958, // gas explosion
    [4] : 220773539, // cluster explosion
}

let speed = -4.0
let sound_name = "flares_released"
let soundname = "flares_empty"
let sound_dict = "DLC_SM_Countermeasures_Sounds"
let flare_hash = alt.hash("weapon_flaregun")
let HelpShown = false
let HelpShown2 = false
let HelpShown3 = false

let fxDict = "scr_ar_planes"
let fxName = "scr_ar_trail_smoke"
let smoke = false, vsmoke = []

export function planecounter(entity, model, countm) {
    let color = countermeasures[countm].color
    alt.log('smoke', countm)
    //let entity = alt.Player.local.vehicle
    if(countm == 2) {
        if(flare_models[model] == true) {
            native.requestScriptAudioBank(sound_dict, true, -1)
            native.requestModel(flare_hash)
            native.requestWeaponAsset(flare_hash, 31, 26)
    
            let pos = native.getEntityCoords(entity, false)
            let offset1 = native.getOffsetFromEntityInWorldCoords(entity, -6.0, -4.0, -0.2)
            let offset2 = native.getOffsetFromEntityInWorldCoords(entity, -3.0, -4.0, -0.2)
            let offset3 = native.getOffsetFromEntityInWorldCoords(entity, 6.0, -4.0, -0.2)
            let offset4 = native.getOffsetFromEntityInWorldCoords(entity, 3.0, -4.0, -0.2)
            native.playSoundFromEntity(-1, sound_name, entity, sound_dict, true, 1)
            native.shootSingleBulletBetweenCoordsIgnoreEntityNew(pos.x, pos.y, pos.z, offset1.x, offset1.y, offset1.z, 0, true, flare_hash, alt.Player.local.scriptID, true, true, speed, entity, false, false, entity, true, 1, 0, 0)
            native.shootSingleBulletBetweenCoordsIgnoreEntityNew(pos.x, pos.y, pos.z, offset2.x, offset2.y, offset2.z, 0, true, flare_hash, alt.Player.local.scriptID, true, true, speed, entity, false, false, entity, true, 1, 0, 0)
            native.shootSingleBulletBetweenCoordsIgnoreEntityNew(pos.x, pos.y, pos.z, offset3.x, offset3.y, offset3.z, 0, true, flare_hash, alt.Player.local.scriptID, true, true, speed, entity, false, false, entity, true, 1, 0, 0)
            native.shootSingleBulletBetweenCoordsIgnoreEntityNew(pos.x, pos.y, pos.z, offset4.x, offset4.y, offset4.z, 0, true, flare_hash, alt.Player.local.scriptID, true, true, speed, entity, false, false, entity, true, 1, 0, 0)
            native.setModelAsNoLongerNeeded(flare_hash)
        }
    } else if(countm >= 3) {
        if(smoke == false) {
        native.requestNamedPtfxAsset(fxDict)
        
        let offset

        if(planeoffset[model]) {
            offset = planeoffset[model]
        } else {
            let minmax = native.getModelDimensions(model, 0.0, 0.0)
            offset = {x:0.0, y:minmax[1].y, z:0.0}
        }
       // let smoking = alt.setInterval(()=>{
           // alt.clearInterval(smoking)
            native.useParticleFxAsset(fxDict)
            let psmoke = native.startNetworkedParticleFxLoopedOnEntityBone(fxName, entity, offset.x, offset.y, offset.z, 0,0,0,-1, 1, 0,0,0,color.r, color.g, color.b, 195)
            native.setParticleFxLoopedColour(psmoke, color.r, color.g, color.b, 0)
            native.setParticleFxLoopedScale(psmoke, 1)
            native.setParticleFxLoopedFarClipDist(psmoke, 1000.0)
            vsmoke.push(psmoke)
            smoke = true           
       // },500)
    } else if(smoke == true) {
        for(let i in vsmoke) {
            if(vsmoke[i]) {
                native.stopParticleFxLooped(vsmoke[i], 0)
            }
        }
        native.removePtfxAsset()
        native.removeNamedPtfxAsset(fxDict)
        smoke = false
        vsmoke = []
    }

    }
   
}

export function stopsmoke() {
    if(smoke == true) {
        for(let i in vsmoke) {
            if(vsmoke[i]) {
                native.stopParticleFxLooped(vsmoke[i], 0)
            }
        }
        native.removePtfxAsset()
        native.removeNamedPtfxAsset(fxDict)
        smoke = false
        vsmoke = []
    }
}

export function planebomb(entity, model, bomtype) {
   // let entity = alt.Player.local.vehicle
    native.requestModel(bombmodels[bomtype])
    native.requestWeaponAsset(bombmodels[bomtype], 31,26)
    native.requestScriptAudioBank("DLC_SM_Bomb_Bay_Bombs_Sounds", true, -1)
    let pos = entity.pos
    let minmax = native.getModelDimensions(model, 0.0, 0.0)
    let offset = native.getOffsetFromEntityInWorldCoords(entity, 0.0, -4.0, minmax[1].z-0.5)
    
   // let door = native.getAreBombBayDoorsOpen(entity)
   // if(door == false) {
      //  native.openBombBayDoors(entity)
  //  } else {
        native.shootSingleBulletBetweenCoordsIgnoreEntityNew(pos.x, pos.y, pos.z, offset.x, offset.y, offset.z, 0, true, bombmodels[bomtype], alt.Player.local.scriptID, true, true, speed, entity, false, false, entity, true, 1, 0, 0)
        native.playSoundFromEntity(-1, "bomb_deployed", entity, "DLC_SM_Bomb_Bay_Bombs_Sounds", true, 1)
       // native.setModelAsNoLongerNeeded(bombmodels[bomtype])
  //  }  
}