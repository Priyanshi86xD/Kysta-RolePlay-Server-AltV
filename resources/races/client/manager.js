/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import { deleteMeta, getMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import * as game from'natives';
import * as NativeUI from '../NativeUI/NativeUi.js';
import { fastpoint, faststart, race1point, race1start, race4point, race4start, race5point, race5start, race6point, race6start, race7point, race7start, race8point, race8start, race9point, race9start, race10start, race10point, race11point, race11start, race12start, race12point, race13start, race13point, race14start, race14point, race15start, race15point, race16start, race16point, race17start, race17point, race18start, race18point, race19start, race19point, race20start, race20point, race21start, race21point, race22start, race22point, race23start, race23point } from './fast.js';

let racename, race, racehost, racestarts = [],racepoints = [], bot=0, racerbots =[]

const racetracks = [
    { id: 1, name: 'DIAMOND CASINO RACE', racestart: faststart, racepoint: fastpoint },
    { id: 2, name: 'OFF ROAD 1', racestart: race1start, racepoint: race1point },
    { id: 3, name: 'OFF ROAD 2', racestart: race4start, racepoint: race4point },
    { id: 4, name: 'OFF ROAD 2', racestart: race5start, racepoint: race5point},
    { id: 5, name: 'OFF ROAD 2', racestart: race6start, racepoint: race6point },
    { id: 6, name: 'ALAMO AROUND', racestart: race7start, racepoint: race7point },
    { id: 7, name: 'Across the Wilderness', racestart: race9start, racepoint: race9point}, //bike
    { id: 8, name: 'Arms Races', racestart: race10start, racepoint: race10point},
    { id: 9, name: 'At The Races', racestart: race11start, racepoint: race11point},
    { id: 10, name: 'Before It Was Cool', racestart: race12start, racepoint: race12point},
    { id: 11, name: 'Bluffing', racestart: race13start, racepoint: race13point},
    { id: 12, name: 'Business Trip', racestart: race14start, racepoint: race14point},
    { id: 13, name: 'Cayo Perico', racestart: race15start, racepoint: race15point},
    { id: 14, name: 'Congestion Charge', racestart: race16start, racepoint: race16point},
    { id: 15, name: 'Criminal Records', racestart: race17start, racepoint: race17point},
    { id: 16, name: 'Crossing Paths', racestart: race18start, racepoint: race18point},
    { id: 17, name: 'Cutting Coroners', racestart: race19start, racepoint: race19point},
    { id: 18, name: 'Day Turn', racestart: race20start, racepoint: race20point},
    { id: 19, name: 'Dipping In', racestart: race21start, racepoint: race21point},
    { id: 20, name: 'Dock Ring', racestart: race22start, racepoint: race22point},
    { id: 21, name: 'Dorset Drive', racestart: race23start, racepoint: race23point},
]

const bots = [
    {name: 'Franklin', model:0x9B22DBAF}, 
    {name: 'Michael', model:0x0D7114C9}, 
    {name: 'Trevor', model:0x9B810FA2},
    {name: 'Lamar', model: 0x65B93076}, 
    {name: 'Hao', model:0x65978363}, 
    {name: 'Ron', model:0xBD006AF1}, 
    {name: 'Wade', model:0x92991B72},
    {name: 'Miguel', model: 0xA5CD7CD8},
]
const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    TitleScale: 1.3,
    TitleFont: NativeUI.Font.HouseScript,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
}

const EventNames = {
    ToggleMenu: "Race1:Menu",
}

const MenuText = {
    MenuTitle: "Street Races",
    MenuSubTitle: "",
    Description:"",
    sprite:"shopui_title_ie_modgarage"
}

//const player = alt.Player.local;

// DO NOT EDIT
function racemenu() {
const Race1 = new NativeUI.Menu(MenuText.MenuTitle, "STREET RACES", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
Race1.Visible = false;

Race1.GetTitle().Font = MenuSettings.TitleFont;
Race1.GetTitle().DropShadow = MenuSettings.DropShadow;
Race1.GetTitle().TextAlignment = MenuSettings.TextAlignment;
//Race1.CloseableByUser = false;

Race1.Open();
let trackitem = new NativeUI.UIMenuItem('Race Tracks', MenuText.Description)
let trackMenu = new NativeUI.Menu(MenuText.MenuTitle, 'RACE TRACKS', MenuSettings.Point, MenuText.sprite, MenuText.sprite);
Race1.AddSubMenu(trackMenu, trackitem)


racetracks.forEach(element =>{
    let tracks = new NativeUI.UIMenuItem(element.name, "", racetracks.length)
    trackMenu.AddItem(tracks);
})
trackMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < racetracks.length) {
        let track = racetracks[selectedItemIndex];
        racestarts = track.racestart;
        racepoints = track.racepoint;
        racename = track.name;
        race = track.id;
        Race1.Close(true);
        classmenu(track.class)
    }
})
}

const sports = [
    'coquette4', 'comet3', 'drafter', 'elegy', 'italigto', 'jester3', 'jugular', 'locust', 'neo', 'pariah', 'panthere', 'penumbra2',
    'r300', 'raiden', 'schlagen', 'seven70', 'sugoi', 'sultan2', 'vstr', 'italirsx', 'zr350', 'calico', 'euros', 'jester4', 'comet6',
    'growler', 'vectre', 'cypher', 'sultan3', 'rt3000'
]

const sportsclassic =[
    'ardent', 'cheetah2', 'coquette2', 'infernus2', 'jb700', 'mamba', 'monroe', 'rapidgt3', 'stingergt', 'swinger', 'torero', 'turismo2',
    'viseris', 'z190'
]

const supers = [
    'autarch', 'cyclone', 'deveste', 'entity2', 'entity3', 'entityxf', 'emerus', 'fmj', 'furia', 'gp1', 'italigtb2', 'krieger', 'le7b', 'nero2', 
    'osiris', 'penetrator', 'pfister811', 'prototipo', 'reaper', 's80', 'sc1', 't20', 'taipan', 'tempesta', 'tezeract', 'thrax',
    'tigon', 'turismor', 'tyrant', 'tyrus', 'vagner', 'virtue', 'visione', 'xa21', 'zentorno', 'zorrusso',
]

const offroad = [
    'brawler', 'caracara2', 'everon', 'freecrawler', 'kamacho', 'outlaw', 'trophytruck', 'trophytruck2', 'vagrant', 
]
const muscle = [
    'deviant', 'dominator3', 'dukes', 'ellie', 'gauntlet3', 'gauntlet4', 'gauntlet5', 'impaler2', 'nightshade', 'sabregt2', 'vigero',
    'virgo3', 'yosemite2'
]
const suv = [
    'huntley', 'landstalker2', 'novak', 'rebla', 'toros', 'xls',
]
const motorcycle = [
    'akuma', 'bati', 'bf400', 'carbonrs', 'defiler', 'double', 'manchez', 'powersurge', 'ruffian', 'sanchez2', 'vortex', 
]
const bike = [
    'bmx', 'scorcher', 'tribike', 'tribike2', 'tribike3'
]
const formula = [
    'formula', 'formula2', 'openwheel1', 'openwheel2', 
]
const bomcar = [
    'veto', 'veto2', 
]
const caddy = [
    'airtug', 'caddy', 'caddy2', 'caddy3', 'mower'
]
const vehicles = [
    {cclass: 'SPORTS', cars: sports},
    {cclass: 'SPORTS CLASSIC', cars: sportsclassic},
    {cclass: 'SUPER', cars: supers},
    {cclass: 'MUSCLE', cars: muscle},
    {cclass: 'OFF-ROAD', cars: offroad},
    {cclass: 'SUV', cars: suv},
    {cclass: 'MOTORCYCLE', cars: motorcycle},
    {cclass: 'CYCLE', cars: bike},
    {cclass: 'OPEN-WHEEL', cars: formula},
    //{cclass: 'GO-KART', cars: bomcar},
    //{cclass: 'CADDY', cars: caddy},
]

function classmenu(classes) {
let classMenu = new NativeUI.Menu(MenuText.MenuTitle, 'VEHICLE CLASS', MenuSettings.Point, MenuText.sprite, MenuText.sprite);
classMenu.Visible = false;
let cars;
classMenu.GetTitle().Font = MenuSettings.TitleFont;
classMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
classMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
classMenu.CloseableByUser = false;


let cartype = new NativeUI.UIMenuListItem("Select Vehicle Type", "", new NativeUI.ItemsCollection(['SPORTS', 'SPORTS CLASSIC', 'SUPER', 'MUSCLE', 'OFF-ROAD', 'SUV', 'MOTORCYCLE', 'CYCLE', 'OPEN-WHEEL']), 0, vehicles)
    classMenu.AddItem(cartype);

classMenu.Open();
classMenu.ListChange.on((selectedItem, selectedItemIndex) => {
    let veclass = vehicles[selectedItemIndex];
    vclass = veclass.cclass
    //alt.log(cars)

})

let StartItem = new NativeUI.UIMenuItem('Start', MenuText.Description);
classMenu.AddItem(StartItem);
classMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Start") {
        classMenu.Close(true);
        alt.emitServer("race", race, vclass)
        racehost = 1;
        racerbots =[]
        setcar(vclass);
        carpos = 0
}});
}

alt.onServer('setrace', (pos, carclas)=>{
    carpos = pos;
    vclass = carclas
    setcar(carclas)
})

function setcar(cars) {
    native.doScreenFadeOut(1000);
    if(race == 13) {
        alt.emit('loadcayoipl')
    }
    let set = alt.setInterval(()=>{
        let pos = {x:406.2132873535156, y:-963.2853393554688, z:-99.00408935546875}
        alt.emitServer('startpos', pos)
        alt.emitServer('hideblip');

        native.doScreenFadeIn(4000);
        vehiclemenu(cars);
        native.setEntityHeading(alt.Player.local.scriptID, 354.8772888183594)
        
        native.freezeEntityPosition(alt.Player.local.scriptID, true);
        alt.clearInterval(set);
    },2000)
}

let racecar;
const colors = [
    150,135,134,89,55,70,41,3,0,39,42,140,136,92,
]

function vehiclemenu(cars) {
let VehMenu = new NativeUI.Menu(MenuText.MenuTitle, '~b~SELECT YOUR CAR~b~', MenuSettings.Point, MenuText.sprite, MenuText.sprite);
VehMenu.Visible = false;
VehMenu.CloseableByUser = false;

let vcars = vehicles.filter(function(type) {
    return type.cclass == cars;
})

let cares = new NativeUI.UIMenuListItem('Select Car', "", new NativeUI.ItemsCollection(vcars[0].cars), 0, vcars[0].cars)
let h = native.getEntityHeading(alt.Player.local.scriptID);
VehMenu.AddItem(cares);
VehMenu.Open();
alt.emitServerRaw("racevehicle", vcars[0].cars[0], h, race);

VehMenu.ListChange.on((selectedItem, selectedItemIndex) => {
    let selectedvehicle = vcars[0].cars[selectedItemIndex];
    
    alt.emitServerRaw("racevehicle", selectedvehicle, h, race);
    let manu = native.getMakeNameFromVehicleModel(alt.hash(selectedvehicle));
        let vehdisp = native.getDisplayNameFromVehicleModel(alt.hash(selectedvehicle));
        let vehname = native.getFilenameForAudioConversation(vehdisp);
        let vmanu = native.getFilenameForAudioConversation(manu);
        alt.emit('carname', vmanu+' '+vehname,vclass);
});

let ColorItem = new NativeUI.UIMenuAutoListItem("Color & Customizations", "", 0, 7, 0, colors);
if(vclass == 'CYCLE') {} else {
    VehMenu.AddItem(ColorItem);
}

VehMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let color = colors[selectedItemIndex];
    alt.emitServer("color", color);
});

VehMenu.AddItem(new NativeUI.UIMenuItem('Confirm', ""))
VehMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Confirm") {
        native.freezeEntityPosition(alt.Player.local.scriptID, false);
        VehMenu.Close(true);
        native.taskEnterVehicle(alt.Player.local.scriptID, racecar, 8000, -1, 1.0, 1,0)
        let seat = alt.setInterval(()=>{
            alt.emit('carname', "","");
            destroycamera()
            setrace(racestarts, racepoints, carpos)
            racerbots =[]
            //if(racehost == 1) {
                racemenu2(racename, vclass);
            //} else {} 
            alt.clearInterval(seat);
        }, 2000)
        
}});
}

const radios = [255,0,1,2,3,4,5,8,9,10,11,12,13,14,15,16,17,18]

function racemenu2(name, classes) {
    let Race2 = new NativeUI.Menu(MenuText.MenuTitle, name, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
    Race2.Visible = false;
    Race2.GetTitle().Font = MenuSettings.TitleFont;
    Race2.GetTitle().DropShadow = MenuSettings.DropShadow;
    Race2.GetTitle().TextAlignment = MenuSettings.TextAlignment;
    Race2.CloseableByUser = false;

    let radiolist = []

    for(let i in radios) {
        radiolist.push(native.getFilenameForAudioConversation(native.getRadioStationName(radios[i])))
    }
        let radio = new NativeUI.UIMenuListItem('Radio Station',"", new NativeUI.ItemsCollection(radiolist),0,radios)
        Race2.AddItem(radio)
        Race2.ListChange.on((selectedItem, selectedItemIndex) => {
            let selectradio = radios[selectedItemIndex];
            native.setRadioToStationIndex(selectradio)
            alt.emitServer('setraceradio', selectradio);
})
    
        
    let InviteItem = new NativeUI.UIMenuItem('Invite Players', MenuText.Description);
    let InviteMenu = new NativeUI.Menu(MenuText.MenuTitle, 'INVITE PLAYERS', MenuSettings.Point, MenuText.sprite, MenuText.sprite);
    InviteMenu.Visible = false;
    
    Race2.Open()
    Race2.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Invite Players") {
            InviteMenu.Clear();
            const players = alt.Player.all.map(player => ({
        id: player.id,
        name: player.name,
        pos: player.pos
        }))
    
    players.forEach(player => {
        let playerlist = new NativeUI.UIMenuItem(player.name, "", players.length);
        InviteMenu.AddItem(playerlist);
        })
    
        InviteMenu.ItemSelect.on((item, selectedItemIndex) => {
            if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < players.length) {
                let SelectedP = players[selectedItemIndex];
                    let player = SelectedP.id;
                    let playername = SelectedP.name;
                   // setMeta('pos', pos);
                  //  alt.log(pos);
                    alt.emitServer('raceinvite', player, race, racestarts, racepoints, vclass);
                    handletext([(playername.toUpperCase()),' ','INVITED'].join(''));
        }});
    }});
    
    let StartItem = new NativeUI.UIMenuItem('Start Race', MenuText.Description);
    let botItem = new NativeUI.UIMenuItem('Add Bot', "Add Random NPC as opponents");
    if(racehost == 1) {
        Race2.AddSubMenu(InviteMenu, InviteItem);
        Race2.AddItem(botItem);
        Race2.AddItem(StartItem);
    }

    Race2.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Start Race") {
            Race2.Close(true);
            alt.emitServer('start', race);    
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Add Bot") {
        if(racer.length < racestarts.length) {
            if(bot < bots.length) {
                let car = vehicles.filter(type=>{
                    return type.cclass == vclass;
                })

            alt.emitServer('addbot', race, racestarts[racer.length], car[0].cars[native.getRandomIntInRange(0, car[0].cars.length-1)], bots[bot]);
            }
        } 
}

});

}

alt.onServer('heading', (veh, h)=>{
    native.setEntityHeading(veh, h);
    racecar = veh;
})

let vclass;
let racer = []
let carpos;

alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
        let host = getMeta('racehost');
        if(host == 1){ 
            setMeta('racehost', 2);
            racemenu()
            racehost = 1;
        } else {   
        }}
});

alt.on('joinrace', ()=>{
    let srace = getMeta('race');
    let join = getMeta('joinrace');
    racehost = 0
    if(srace > 0) {
            alt.emitServer('joinrace', join.type, {x:406.2132873535156, y:-963.2853393554688, z:-99.00408935546875});
            race = join.type;
    } else {}
})

function setrace(pos, point, i) {
    native.doScreenFadeOut(500);
    let setpos = alt.setInterval(()=>{
        let veh = alt.Player.local.vehicle;
        native.setEntityCoords(veh, pos[i].x, pos[i].y, pos[i].z, 0,0,0,1);
        native.setEntityHeading(veh, pos[0].h);
        native.setVehicleOnGroundProperly(veh, 5);
        native.setPedIntoVehicle(alt.Player.local.scriptID, veh, -1);
        native.freezeEntityPosition(veh, true);
        native.setVehicleDoorsLocked(veh, 4);
        alt.emitServer('racetrack', veh);
        alt.emitServer('outroom');
        if(race == 13) {
            native.setDeepOceanScaler(0.0)
            native.setZoneEnabled(native.getZoneFromNameId("IsHeistZone"), true);
        }
        setMeta('pos', i+1);
        deleteMeta('racehost');
        alt.emitServer('Repair', veh);
        native.getFollowVehicleCamViewMode();
        native.setFollowVehicleCamViewMode(0)
        native.doScreenFadeIn(3000);
        alt.clearInterval(setpos);
    }, 2000)
    
   // native.prepareMusicEvent("BKR_RESCUE_CONTACT_POLICE_START")
  //  native.triggerMusicEvent("BKR_RESCUE_CONTACT_POLICE_START")
}

alt.onServer('racenotif', (text)=>{
    handletext(text);
})

alt.onServer('inviterace', (playerId, phost, race, start, check, type) => {
    if(playerId == alt.Player.local.id){
        setMeta('race', 1);
        setMeta('joinrace', {type: race, host: phost});
        setMeta('host', 0);
        racestarts = start;
        racepoints = check;
        racename = racetracks[race-1].name;
        vclass = type;
        alt.emit('notif', '~b~'+phost+' ~w~Invite you to a race')
        let join = alt.setInterval(()=>{
            handletext("Open Player Menu ~INPUT_INTERACTION_MENU~ to accept the challenge")
            alt.clearInterval(join);
        },3000);
        let exp = alt.setInterval(()=>{
            deleteMeta('race');
            deleteMeta('joinrace');
            deleteMeta('host');
            alt.clearInterval(exp);
        }, 25000);
    }
});

function racerpos() {

}

alt.onServer('setstart', (num)=>{
    if(race == num) {
    let veh = alt.Player.local.vehicle;
    if(race == 13) {
        native.setDeepOceanScaler(0.0)
    }
    let pos = getMeta('pos');
    if(pos > 0){
    
    deleteMeta('joinrace');
    deleteMeta('host');
    let no = 3

    let time3 = alt.setInterval(()=>{
        if(no == 1) {
            alt.clearInterval(time3);
            alt.clearEveryTick(race);
            native.playSound(0, "Go", "Car_Club_Races_Street_Race_Sounds", true, 0, false);
            native.freezeEntityPosition(veh, false);
            setMeta('pos', 0);
            plyr = racer.length;
            races(racepoints, 0);
            //if(racehost == 1) {
                racebot(racepoints, 0)
            //}
            lap = 0
            botlap = 0
            check = 0
            racetime(racepoints);
        } else {
        native.playSound(0, "321", "Car_Club_Races_Street_Race_Sounds", true, 0, false);
        no -= 1;
        }
    },1000)
    let race = alt.everyTick(()=>{
        if(no <= 1) {
            drawtext('~y~GO~y~',0.5,0.25,7,2.6,1.0,255,0,0,255, 0);
        } else {
            drawtext('~y~'+no+'~y~',0.5,0.25,7,2.6,1.0,255,0,0,255, 0);
        }
    })
}else return;
} else {}
}
);

let marker1;
let marker2;
let min;
let sec;
let ms;
let rank = 0
let plyr;
let timemin, timesec, timems

function racebot(pos,a) {
for(let i in racerbots) {
    if(racerbots[i]) {
        let car = native.getVehiclePedIsIn(racerbots[i], false)
        native.taskVehicleDriveToCoord(racerbots[i], car, pos[a].x, pos[a].y, pos[a].z, 70, 1, native.getEntityModel(car), 262144, 3, 1 )
        let count = alt.everyTick(()=>{
            if(!racerbots[i]) {
                alt.clearEveryTick(count);
            }
            let pos1 = native.getEntityCoords(racerbots[i], false);
            let dist = native.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos[a].x, pos[a].y, pos[a].z, true);
            if(dist <= 6) {
                alt.clearEveryTick(count);
                    racebot2(racerbots[i], car, pos, a+1); 
                
            }
        })
    }
    
}
}

function racebot2(ped, car, pos, a) {
    alt.emitServerRaw('botcheckpoint', race, a, ped)

    //let car = native.getVehiclePedIsIn(ped)
   // native.taskVehicleDriveToCoord(ped, car, pos[a].x, pos[a].y, pos[a].z, 70, 1, native.getEntityModel(car), 262144, 3, 1 )
    native.taskVehicleDriveToCoordLongrange(ped, car, pos[a].x, pos[a].y, pos[a].z, 70, 262144, 3)
    let count = alt.everyTick(()=>{
        native.setPedKeepTask(ped, true);
        if(!ped) {
            alt.clearEveryTick(count);
        }
        let pos1 = native.getEntityCoords(ped, false);
        let dist = native.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos[a].x, pos[a].y, pos[a].z, true);
        if(dist <= 6) {
            alt.clearEveryTick(count);
            if(a == pos.length - 1) {
                native.taskVehicleDriveWander(ped, car, 20, 786468);
                alt.emitServer('botracefinish', ped, race);
            } else {
                racebot2(ped, car, pos, a+1); 
            }
        }
    })
}

function racetime(pos) {
    min = 0;
    sec = 0;
    ms = 0;
    timemin = alt.setInterval(()=>{
        min += 1;
    }, 60000);
    timesec = alt.setInterval(()=>{
        if(sec == 59) {
            sec = 0;
        } else {
            sec +=1;
        }
        alt.emit('timerbar', 1, ["CHECKPOINT", check+"/"+pos.length, 140], ["POSITION", rank+"/"+plyr, 140], ["", "", 0])
        if(race == 13) {
            native.setDeepOceanScaler(0.0)
        }
    }, 1000)
   // timems = alt.setInterval(()=>{
       // if(ms == 90 ) {
       //     ms = 0;
       // } else {
       //     ms += 10
       // }
   // },100)
}

let racerposs =[]
let lap, botlap = 0, check

alt.onServer('botracerpos', (bot, racename, laps)=>{
    if(race == racename) {
        if(laps > lap) {
            //botlap = laps
            lap = laps
            racerposs = []
            racerposs.push(bot);
           // rank = racerposs.length + 1;
            
        } else {
            racerposs.push(bot);
            //rank = racerposs.length + 1;
        }
    }
})

alt.onServer('deletebot', (ped)=>{
    if(ped) {
        native.deleteEntity(ped)
    }
})

alt.onServer('racerpos', (racer, racename, laps)=>{
    if(race == racename) {
        if(laps > lap) {
            lap = laps
            //let racss = []
            racerposs = []
            racerposs.push(racer.id);
            if(racer.name == alt.Player.local.name) {
                //lap = laps;
                //setMeta('raceposition', racerposs.length)
                rank = racerposs.length
            } else {
               // rank += 1
            }
        } else {
            racerposs.push(racer.id);
            if(racer.name == alt.Player.local.name) {
                //setMeta('raceposition', racerposs.length)
                rank = racerposs.length
            }
        }

        //alt.emit('timerbar', ["CHECKPOINT", a+"/"+pos.length, 140], ["POSITION", rank+"/"+plyr, 140], ["", "", 0])
    }
})
let dist, racing

function races(pos, a) {
let high = 40;
let raceblip = native.addBlipForCoord(pos[a].x, pos[a].y, pos[a].z);
let rot
let h
if(a == pos.length-1) {
marker1 = 4;
h = 0
} else {
    h = native.getHeadingFromVector2d((pos[a].x - pos[a+1].x), (pos[a].y - pos[a+1].y))
    marker1 = 21;
    //raceblip2 = native.addBlipForCoord(pos[a+1].x, pos[a+1].y, pos[a+1].z);
}
if(a+1 == pos.length-1) {
    marker2 = 4;
    rot = 0
    } else {
     marker2 = 21;
     rot = 90
}

//alt.emit('timerbar', ["CHECKPOINT", a+"/"+pos.length, 140], ["POSITION", rank+"/"+plyr, 140], ["", "", 0])

racing = alt.everyTick(()=>{
let p = alt.Player.local.pos;

native.drawMarker(1, pos[a].x, pos[a].y, pos[a].z,0,0,0,0,0,0,8,8,high,246,221,141,30,0,0,0,0,0,0,0);

if(a == pos.length-1) {
    native.drawMarker(4, pos[a].x, pos[a].y, pos[a].z+6,0,0,0,0,0,0,5,5,4,101,220,255,110,0,1,0,0,0,0,0);
}
else {
    native.drawMarker(marker1, pos[a].x, pos[a].y, pos[a].z+6,0,0,0,90,h,0,7,7,4,101,220,255,150,0,0,0,0,0,0,0);
    native.drawMarker(1, pos[a+1].x, pos[a+1].y, pos[a+1].z,0,0,0,0,0,0,8,8,40,246,221,141,50,0,0,0,0,0,0,0);
    native.drawMarker(marker2, pos[a+1].x, pos[a+1].y, pos[a+1].z+6,0,0,0,rot,0,0,5,5,4,101,220,255,110,0,0,0,0,0,0,0);
}
    dist = native.getDistanceBetweenCoords(p.x, p.y, p.z, pos[a].x, pos[a].y, pos[a].z, true);
    
    if(dist < 30) {
        high = dist-10;
    }
    if(dist < 4) {
        alt.clearEveryTick(racing);
        racing = 0;
        alt.emitServerRaw('checkpoint', race, a+1);

        native.removeBlip(raceblip);
        if(a == pos.length - 1) {
            //rank = getMeta('raceposition');
            alt.emitServer('racefinish', race, rank);
            
        } else {
            native.playSound(1, "Checkpoint", "Car_Club_Races_Street_Race_Sounds", 1,0,1);
            races(pos, a+1);
            check += 1
         
            
        }
    }
})
}


alt.onServer('racerlist', (list, num, join)=>{
    if(race == num) {
        racer = list;
        if(alt.Player.local.name == join.name) {} else {
            alt.emit('notif', '~b~'+join.name+' ~w~Join race')
        }
    }
})

alt.onServer('racebot', (veh, num, npc, pos)=>{
    //native.requestModel(npc.model);
    alt.loadModel(npc.model)
    native.setVehicleDoorsLocked(veh, 2);
    
    let createped = alt.setInterval(()=>{
        let peds = native.createPedInsideVehicle(veh, 4, npc.model, -1, false, false);
        //let peds = native.createRandomPedAsDriver(veh, false);
        
        if(race == num) {
            racer.push(npc.name);
            racerbots.push(peds);
            native.setDriverAbility(peds, 1.0)
            let pedrace = native.addBlipForEntity(veh);
            native.setBlipScale(pedrace, 0.8);
            native.setBlipColour(pedrace, 3)
            handletext(npc.name+' Join The Race')
            bot += 1;
        }
        alt.clearInterval(createped);
    }, 300);
    let seth = alt.setInterval(()=>{
       // if(Math.abs(pos.h - native.getEntityHeading(veh.scriptID)) > 2) {
            native.setEntityHeading(veh, pos.h);
       // } else {
            native.setVehicleOnGroundProperly(veh, 5.0)
            alt.clearInterval(seth);
      //  }
    },200)
})

alt.onServer('finishrace', (racename, frank)=>{
    if(race == racename ) {
        finishrace('~b~FINISH~b~', 'You got Position '+frank); 
    }
})

alt.onServer('endrace', (raceno)=>{
    if(race == raceno) {
        if(racing > 0) {
            alt.clearEveryTick(racing);
            racing = 0;
            //rank = getMeta('raceposition');
            finishrace("~y~FAILED~y~", 'You Dont finish the race');
            alt.emitServer('racefail', race, rank)
        } else {}
        if(racehost == 1) {
            racemenu();
        }
        for(let i in racerbots) {
            if(racerbots[i]) {
                native.deleteEntity(racerbots[i])
            }
        }
    }
})


function finishrace(text, text2) {
    alt.clearInterval(timemin);
            alt.clearInterval(timesec);
            vclass = "";
            native.playSound(1, "Checkpoint_Finish", "Car_Club_Races_Street_Race_Sounds", 1,0,1);

            let finish = alt.everyTick(()=>{
                drawtext(text,0.5,0.15,7,3,1.0,255,0,0,205, 0);
                drawtext(text2,0.5,0.32,4,0.7,1.2,255, 255, 255,255, 0);
              })
              let info = alt.setInterval(()=>{
                alt.clearEveryTick(finish);
                alt.emit('timerbar', 1, ["", "", 0], ["", "", 0], ["", "", 0])
                alt.clearInterval(info);
                
                native.setVehicleDoorsLocked(alt.Player.local.vehicle.scriptID, 0);
                
                racer = [];
                race = 0
                bot = 0
              }, 5000);
}

export function handletext(text) {
    game.beginTextCommandDisplayHelp("STRING");
	game.addTextComponentSubstringKeyboardDisplay(text);
	game.endTextCommandDisplayHelp(0, 0, true, -1);
}

alt.onServer('showtext', (text)=>{
    drawtext(text,0.5,0.25,7,2.6,1.0,255,0,0,255);
});

function drawtext(msg, x, y, font, scale, wrap, r, g, b, a, i) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(font);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, wrap);
    native.setTextCentre(true);
    native.setTextColour(r,g,b,a);
    native.setTextJustification(i);
    native.setTextDropShadow(true);
    native.endTextCommandDisplayText(x, y, 0);
}

let camera;
let zpos = 0;
let fov = 90;
let startPosition;
let startCamPosition;

alt.onServer('setcam', setcamera)

function setcamera() {
    startPosition = { x:407.369384765625, y:-963.39111328125,z:-99.67940521240234 };
    if (!camera) {
      let fov = 50;
      camera = native.createCamWithParams(
          'DEFAULT_SCRIPTED_CAMERA',
          405.33319091796875,  -959.2392578125, -99.00411224365234+0.3,0,0,0,fov, true, 0);

      native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z);
      //native.pointCamAtEntity(camera, alt.Player.local.vehicle,0,0,1,1)
      native.setCamActive(camera, true);
      native.renderScriptCams(true, false, 1, true, false, 0);
      //native.doScreenFadeIn(2000);
  }
}

function destroycamera() {
  if (camera) {
      camera = null;
  }
  native.destroyAllCams(true);
  native.renderScriptCams(false, 1, 0, false, false, 0);

  zpos = 0;
  fov = 90;
  startPosition = { ...alt.Player.local.pos };
  startCamPosition = native.getEntityForwardVector(alt.Player.local.scriptID);
}