import * as alt from 'alt-client';
import * as native from 'natives';

const model = 0x4DA6E849
const chair = 'prop_wheelchair_01'

const lesterhome = [
    { x: 1275.078125,    y: -1721.4180908203125,    z: 54.655067443847656}, //door
    {x: 1274.977783203125,y: -1710.8665771484375,z: 54.77149200439453}, //chair
]

const types = [
    {type: 0, worktype: "~y~Select your request", job: ""},
    {type: 1, worktype: "Clear Criminal Record $ 20,000", job: ""},
    {type: 2, worktype: "Fleeca Bank ID Card   $ 15,000", job: ""},
]

let lesthouse = 0, peds, lestmenu = 0, Idcard = 0

alt.on('lesterhouse', ()=>{
    if(lesthouse == 0) {
        lesthouse = 1;
        native.freezeEntityPosition(alt.Player.local.scriptID, true);
        alt.emitServer('lesterdoor');
    }
})

alt.onServer('lesterset', ()=>{
    lesterset()
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
})

alt.onServer('lesternot', ()=>{
    let door = native.getClosestObjectOfType(1275.078125,-1721.4180908203125,54.655067443847656, 3, alt.hash('v_ilev_lester_doorfront'), false, false,false,)
    native.freezeEntityPosition(door, true);
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
    handletext('Reach level 10 to meet Lester');

})


function lesterset() {
native.requestModel(model);
native.requestModel(alt.hash(chair))

let time = alt.setInterval(()=>{
    alt.clearInterval(time);
let lchair =  native.createObject(alt.hash(chair), 1274.977783203125, -1710.8665771484375, 54.77149200439453, false, false, true);
native.setEntityHeading(lchair, 160)
native.placeObjectOnGroundProperly(lchair);
let lester = native.createPed(4, model, 1274.977783203125, -1710.8665771484375, 54.77149200439453, 0, false, false);
peds = lester
native.setEntityNoCollisionEntity(lester, lchair, false);
let p = native.getEntityCoords(lchair, false);
let h = native.getEntityHeading(lchair);
native.taskStartScenarioAtPosition(lester, 'PROP_HUMAN_SEAT_CHAIR', p.x, p.y, p.z, h+180, 1, false, true)
native.setPedCanPlayAmbientBaseAnims(lester, true);

let menu = alt.setInterval(()=>{
    let pos = alt.Player.local.pos
    let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, 1274.977783203125, -1710.8665771484375, 54.77149200439453, true);
    if(dist <= 2) {
        if(lestmenu == 0) {
            lestmenu = 1
            handletext("~INPUT_PICKUP~ Ask Lester")
        }
    } else {
        lestmenu = 0
    }
}, 1000)
}, 300)

alt.on("keydown", (key) => {
    if (key == "E".charCodeAt(0)) {
        if(lestmenu == 1) {
            alt.emit('createmenu', "Lester Chrest","lestermenu", types)
       
}}})

}

alt.on('lestermenu', (type)=>{
    if(type == 1) {
        clearcrimerecord()
    } else if (type == 2) {
        fleecacard()
    } else if(type == 0) {}
})

alt.on('crimecleared', ()=>{
    notification('Your Criminal Record Cleared')
})

function clearcrimerecord() {

    let data = alt.Player.local.getSyncedMeta('crimedata');
    if(!data || data.active.crime == 0) { 
        notification('You dont have any criminal record')
    } else 
    if(data.active.crime > 0) {
        alt.emit('clearcrimedata');
        alt.emit('buy', 20000)
    }
}

function fleecacard() {
    if(Idcard == 0) {
        let card = alt.getMeta('bankIdcard');
        if(card == 1) { 
            notification('You already have an ID Card')
        } else {

            alt.setMeta('bankIdcard', 1);
            Idcard = 1
            alt.emit('buy', 15000)
            notification('Fleeca Bank ID Card Aqcuired')
    
            let coold = alt.setTimeout(()=>{
                alt.clearTimeout(coold);
                Idcard == 0
            }, 60000*20)
        }
        
    } else {
        notification('ID Card not available right now')
    }
}

function handletext(text) {
    native.beginTextCommandDisplayHelp("STRING");
    native.addTextComponentSubstringKeyboardDisplay(text);
    native.endTextCommandDisplayHelp(0, 0, true, -1);
};

function notification(message) {
    native.beginTextCommandThefeedPost('STRING')
    native.setColourOfNextTextComponent(-1)
    native.thefeedSetBackgroundColorForNextPost(140)
    native.thefeedSetFlashDurationParameterForNextMessage(1000)
    native.thefeedSetRgbaParameterForNextMessage(0,0,0,50)
    native.addTextComponentSubstringPlayerName(message)
    native.endTextCommandThefeedPostTicker(true, true)

}
