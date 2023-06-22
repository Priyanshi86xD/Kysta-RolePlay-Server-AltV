import * as alt from 'alt-client';
import { deleteMeta, getMeta, hasMeta, setMeta } from 'alt-client';
import { getSyncedMeta } from 'alt-shared';
import * as native from 'natives';
import * as game from 'natives';
import * as NativeUI from './NativeUI/NativeUi.js';
import { femaleofficer, inventory, maleofficer } from './outfits.js';

const cops = [
{ name: "Vinewood Police Station", agency: "lspd1", script: "vinewoodPol", x: 638.5, y:1.75, z:82.8, h: 70, x1: 535.2194, y1:-28.05378, z1:70.88766, 
x2: 528.2743, y2: -26.18892, z2: 70.62952, h2: 210, x3: 534.696, y3:-26.82411, z3: 70.24203, h3: 210 }, // GarageSpawnPosition

{ name: "La Mesa Police Station", agency: "lspd2", script: "laMesaPol", x: 826.8, y:-1290, z:28.24, h: 92, 
x2: 871.0622, y2: -1350.213, z2: 26.30929, h2: 90, x3: 859.6852, y3: -1342.589, z3:25.63685, h3: 90 }, // GarageSpawnPosition
	
{ name: "Rockford Hills Police Station", agency: "lspd3", script: "rockfordPol", x: -561.65, y:-131.65, z:38.21, h: 203.98614501953125, 
x2: -571.2919, y2:-143.5269, z2: 37.07582, h2: 22, x3: -575.2366, y3:-150.0565, z3:37.53278, h3: 202 }, // GarageSpawnPosition
	
{ name: "Vespucci Police Station", agency: "lspd4", script: "vespucciPol", x: -1108.18,y: -845.18,z: 19.32, h: 305, 
x2: -1123.17, y2:-838.1166,z2: 13.36657, h: 130, x3: -1123.946, y3:-845.0295, z3:13.03633, h3: 128 }, // GarageSpawnPosition
	
{ name: "Downtown Police Station", agency: "lspd5", script: "downtownInterior", x: 450.0654, y:-993.0596, z: 30, h: 320, 	
x2: 434.0721, y2: -1014.013,z2: 28.7524, h2: 90, x3: 435.76,y3: -1017.744,z3: 28.48, h3: 90 }, // GarageSpawnPosition

{ name: "Davis Sheriff Station", agency: "lspd6", script: "davisSheriff", x: 360.97, y:-1584.70,z: 29.29, h: 52, 
x2: 378.4163, y2:-1629.533, z2:28.44473, h2: 320, x3: 384.5281,y3: -1622.423,z3: 28.89813, h3: 320 }, // GarageSpawnPosition

{ name: "Sandy Shores Sheriff Station", agency: "lspd7", script: "sandySheriff", x: 1848.73, y:3689.98,z: 34.27, h: 28, x3: 1854.31, y3: 3675.401,z3: 33.33306, h3: 210 }, // GarageSpawnPosition

{ name: "Paleto Bay Sheriff Station", agency: "lspd8", script: "paletoSheriff", x: -448.22,y: 6008.23,z: 31.72, h: 135, x3: -438.5157,y3: 6028.824,z3: 30.94723, h3: 31 }, // GarageSpawnPosition

//{ name: "Beaver Bush Ranger Station", agency: "lspd9", script: "beaverRanger", x: 379.31, y:792.06,z: 190.41, h: 0}, 

{ name: "Los Santos Intl. Airport Field Office", agency: "lspd10", script: "lsxAirport", x: -864.61,y: -2408.92,z: 14.03, h: 243, 
x2: -887.7394,y2: -2373.455,z2: 14.02436, h2: 140, x3: -897.2624,y3: -2384.005,z3: 13.5493, h3: 148 }, // GarageSpawnPosition

{ name: "Bolingbroke Penitentiary", agency: "lspd11", script: "prison", x: 1846.49, y:2585.95,z: 45.67, h: 90}, 

]

const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    TitleScale: 1.2,
    TitleFont: 2,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
}

const EventNames = {
    ToggleMenu: "Police:Menu",
}

const MenuText = {
    MenuTitle: "L S P D",
    MenuSubTitle: "",
}

let copbase;
let policestation;
let policecar, locker, salary = 0, salarytime


function policemenu(){
let officename = policestation.name.toUpperCase()
let cop = getMeta('police');
let PoliceMenu = new NativeUI.Menu(MenuText.MenuTitle, officename, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
PoliceMenu.Visible = false;
PoliceMenu.CloseableByUser = false;
PoliceMenu.GetTitle().Scale = MenuSettings.TitleScale,
PoliceMenu.GetTitle().Font = MenuSettings.TitleFont;
PoliceMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
PoliceMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;

PoliceMenu.AddItem(new NativeUI.UIMenuItem("Go On Duty", "Select to go On Duty and access the locker."))

PoliceMenu.Open();

PoliceMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Go On Duty") {
        PoliceMenu.Close(true);
        native.clearAllPedProps(alt.Player.local.scriptID);
        native.removeAllPedWeapons(alt.Player.local.scriptID, false);
        alt.emitServer('policeonduty');
        setMeta('police', 2);
        setMeta('activejob', 'Police Officer')
        native.setPedAsCop(alt.Player.local.scriptID, true);
        native.setPoliceIgnorePlayer(alt.Player.local.scriptID, true);
        native.setPedArmour(alt.Player.local.scriptID, 100);
        lockermenu();
        copsalary()

    }
})
}

function lockermenu() {
let officename = policestation.name.toUpperCase()
let lockermenu = new NativeUI.Menu(MenuText.MenuTitle, officename, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
lockermenu.Visible = false;
lockermenu.GetTitle().Scale = MenuSettings.TitleScale,
lockermenu.GetTitle().Font = MenuSettings.TitleFont;
lockermenu.GetTitle().DropShadow = MenuSettings.DropShadow;
lockermenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;

//lockermenu.CloseableByUser = false;
let outfitmenu = new NativeUI.Menu(MenuText.MenuTitle, "OFFICER OPTIONS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
outfitmenu.Visible = false;

lockermenu.AddSubMenu(outfitmenu, new NativeUI.UIMenuItem("Police Locker", "Select to change your outfit."))
let outfitss = []

for(let i in copbase) {
    outfitss.push(copbase[i].name);
}
    let outfits = new NativeUI.UIMenuListItem("Outfit", "Select an outfit to wear.", new NativeUI.ItemsCollection(outfitss),0, copbase);
    outfitmenu.AddItem(outfits);

//let loadout = new NativeUI.UIMenuListItem("Inventory", "Select an inventory to equip.", new NativeUI.ItemsCollection(["Guard","Patrol", "SWAT"]),0, inventory);
//outfitmenu.AddItem(loadout);

lockermenu.Open();
locker = 1;

outfitmenu.ListChange.on((item, selectedItemIndex) => {
        let cop = maleofficer[selectedItemIndex];
        let copoutfit = cop.outfit;
        let prop = cop.prop[0];
        let weaps = cop.weapon;
         if(cop.name == "Current") {
                native.clearAllPedProps(alt.Player.local.scriptID);
                alt.emit('loadoutfit', 'default');
            } else {
                for(let i in copoutfit) {
            native.clearAllPedProps(alt.Player.local.scriptID);
            setclothes(copoutfit[i].id, copoutfit[i].drawable, copoutfit[i].texture)
            if(cop.helm == 1) {
                native.setPedPropIndex(alt.Player.local.scriptID, prop.id, prop.drawable, prop.texture, true);
        }}
    }
    let weap = inventory.filter(function(weapon) {
        return weapon.name == weaps;
    })
    native.removeAllPedWeapons(alt.Player.local.scriptID, false);
    alt.emitServer('policeweapon', weap[0].weapon, weap[0].component);
})


let caritem = new NativeUI.UIMenuItem("Police Garage", "Enter police garage and choose a vehicle.");
lockermenu.AddItem(caritem);

let offitem = new NativeUI.UIMenuItem("Off Duty", "Go off duty")
lockermenu.AddItem(offitem);

lockermenu.ItemSelect.on((item, selectedItemIndex) => {
if (item instanceof NativeUI.UIMenuItem && item.Text == "Police Garage") {
    lockermenu.Close(true);
    let pos = {x:406.2132873535156, y:-963.2853393554688, z:-99.00408935546875}
    native.doScreenFadeOut(500);
    let copgar = alt.setInterval(()=>{
        alt.emitServer("policegarage", pos)
        native.doScreenFadeIn(2000);
        alt.emitServer('policecar', "police");
        alt.emit('carname', "Vapid Police Cruiser", "Lost Santos Police Department");
        garagemenu();
        alt.clearInterval(copgar);
    }, 1000)
}
if (item instanceof NativeUI.UIMenuItem && item.Text == "Off Duty") {
    lockermenu.Close(true);
    alt.emitServer('policeoffduty');
    native.clearAllPedProps(alt.Player.local.scriptID);
    native.removeAllPedWeapons(alt.Player.local.scriptID, false);
    alt.emit('loadoutfit', 'default');
    setMeta('police', 0);
    alt.emit('loadweapon');
}
})
}

function garagemenu() {
let carmenu = new NativeUI.Menu(MenuText.MenuTitle, "SELECT VEHICLE", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
carmenu.Visible = false;
carmenu.GetTitle().Scale = MenuSettings.TitleScale,
carmenu.GetTitle().Font = MenuSettings.TitleFont;
carmenu.GetTitle().DropShadow = MenuSettings.DropShadow;
carmenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
carmenu.CloseableByUser = false;

const vehicles = [
    { name : "Police Cruiser" , fullname : "Vapid Police Cruiser" , agency : "lspd", carmodel : "police" },
    { name : "Police Buffalo" , fullname : "Bravado Buffalo" , agency : "lspd", carmodel : "police2" },
    { name : "Police Interceptor" , fullname : "Vapid Police Interceptor" , agency : "lspd", carmodel : "police3" },
    { name : "Police Transporter" , fullname : "Declasse Police Transporter" , agency : "lspd", carmodel : "policet" },
    { name : "Police Biker" , fullname : "WMC Police Bike" , agency : "sahp", carmodel : "policeb" },
    
    { name : "Sheriff Cruiser" , fullname : "Vapid Police Cruiser" , agency : "lssd", carmodel : "sheriff" },
    { name : "Sheriff SUV" , fullname : "Declasse Granger" , agency : "lssd", carmodel : "sheriff2" },
    { name : "Police Roadcruiser" , fullname : "Albany Roadcruiser" , agency : "nysp", carmodel : "policeold1" },
    { name : "Police Rancher" , fullname : "Declasse Rancher" , agency : "nysp", carmodel : "policeold2" },
    { name : "Unmarked Cruiser" , fullname : "Vapid Police Cruiser", agency : "Local &amp; Federal Agencies", carmodel : "police4" },
    
    { name : "Unmarked Buffalo" , fullname : "Bravado Buffalo", agency : "Local &amp; Federal Agencies", carmodel : "fbi" },
    { name : "Unmarked Granger" , fullname : "Declasse Granger", agency: "Local &amp; Federal Agencies", carmodel : "fbi2" },
    { name : "Park Ranger" , fullname : "Declasse Granger" , agency : "sapr", carmodel : "pranger" },
    { name : "Police Riot" , fullname : "Brute Police Stockade" , agency : "noose", carmodel : "riot" },
]

carmenu.Open();

let carlist = []
for(let i in vehicles) {
    carlist.push(vehicles[i].name)
}
    let copcar = new NativeUI.UIMenuListItem("Model", "Select which vehicle to deploy", new NativeUI.ItemsCollection(carlist),0, vehicles)
    carmenu.AddItem(copcar);

    carmenu.ListChange.on((selectedItem, selectedItemIndex) =>{
        let car = vehicles[selectedItemIndex];
        alt.emitServer('policecar', car.carmodel);
        alt.emit('carname', car.fullname, "Lost Santos Police Department");
})

carmenu.AddItem(new NativeUI.UIMenuItem('Select & Continue', "Exit police garage with your vehicle"))
carmenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == 'Select & Continue') {
        carmenu.Close(true);
        alt.emit('carname', "","");
        native.doScreenFadeOut(500);
        let pos = {x:policestation.x3, y:policestation.y3, z:policestation.z3}
        let carspawn = alt.setInterval(()=>{
            native.setEntityCoords(policecar, pos.x, pos.y, pos.z, 0,0,0,1);
            native.setEntityHeading(policecar, policestation.h3);
            native.setPedIntoVehicle(alt.Player.local.scriptID, policecar, -1);
            alt.emitServer('spawnpoliceout', policecar);
            setMeta('police', 2);
            native.setVehicleTyresCanBurst(policecar, false);
            native.doScreenFadeIn( 3000);
            alt.clearInterval(carspawn);
        }, 1000);
    }
})

}

alt.onServer('copcar', (veh)=>{
policecar = veh;
let getin = alt.setInterval(()=>{
    native.setPedIntoVehicle(alt.Player.local.scriptID, veh, -1);
    alt.clearInterval(getin);
}, 200);
})

let copblips = []
let copmenu;
let copjob;

alt.on('Cops', policejob)

function policejob() {
    setMeta('police', 0);
    for(let i in cops) {
        let copblip = native.addBlipForCoord(cops[i].x, cops[i].y, cops[i].z);
        copblips.push(copblip);
        native.setBlipSprite(copblip, 60);
        native.setBlipColour(copblip, 38);
        alt.emitServer("jobstart", "Go to ~y~Police Station ~w~to start the job");
        copjob = alt.setInterval(() => {
        let pos = alt.Player.local.pos;
            let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, cops[i].x, cops[i].y, cops[i].z, true);
            if(dist <= 50) {
                alt.emit('marker', 1, cops[i].x, cops[i].y, cops[i].z-1,1,1,1.3,155,55,165,80)
            }
            if(dist <= 2) {
                alt.emit('marker', 1, cops[i].x, cops[i].y, cops[i].z-1,1,1,1.3,155,55,165,0)
                let cop = getMeta('police');
                alt.emitServer("jobstart", "");
                if(cop == 0 ) {
                    setMeta('police', 1)
                    alt.emitServer("jobstart", "");
                    handletext("~INPUT_PICKUP~ Start Police Work")
                    policestation = cops[i];
                } else if(cop == 2) {
                    //setMeta('police', 3)
                    setMeta(cops[i].agency, 1)
                    policestation = cops[i];
                    handletext("~INPUT_PICKUP~ Police Locker")
                }  else {}
            } else {
                deleteMeta(cops[i].agency)
            }
        }, 1000);
    }
}

alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
        let cop = getMeta('police');
        let coptask = getMeta('dispatch')
        if(cop == 1) {
            let model = native.getEntityModel(alt.Player.local.scriptID);
            if(model == alt.hash("mp_m_freemode_01")) {
            copbase = maleofficer;
        } else if(model == alt.hash("mp_f_freemode_01")) {
            copbase = femaleofficer;
        }
        alt.emit('saveoutfit', 'default');
        native.taskAchieveHeading(alt.Player.local.scriptID, policestation.h, 2000);
        policemenu()
        } else if(cop == 2) {
            if(hasMeta(policestation.agency)) {
                native.taskAchieveHeading(alt.Player.local.scriptID, policestation.h, 2000);
                lockermenu()
            } else {}
        }
        if(coptask == 1) {
            pursuit()
        }
	}
});

let crimepos, badguy, tkpname;

alt.onServer('robbery', (pos, culprit)=>{
    let cop = getMeta('police');
    if(cop == 2) {
        let crimeloc = native.getNameOfZone(pos.x, pos.y, pos.z)
        crimepos = pos;
        badguy = culprit;
        tkpname = crimeloc;
        setMeta('dispatch', 1)
        crimenotif('ROBBERY', "ROBBERY AT "+crimeloc);
        native.playPoliceReport("SCRIPTED_SCANNER_REPORT_AH_3B_01", 1);
    }
})

alt.onServer('copkilled', (pos, culprit)=>{
    notification('Cop has been killed')
})


function pursuit() {
    setMeta('dispatch', 2);
    let crimeblip = native.addBlipForCoord(crimepos.x, crimepos.y, crimepos.z);
    native.setBlipRoute(crimeblip, true);
    let crime = native.addBlipForRadius(crimepos.x, crimepos.y, crimepos.z, 80);
    native.setBlipColour(crime, 1)
    native.setBlipAlpha(crime, 100)
    //alt.emit('timerbar', ["SUSPECT", badguy, 140], ["CASE", "ROBBERY", 140], ["", "", 0])
    let purs = alt.setInterval(()=>{
        let pos = alt.Player.local.pos;
        let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, crimepos.x, crimepos.y, crimepos.z, true);
        if(dist <= 20) {
            alt.clearInterval(purs);
            alt.emit('notification', 'Find the suspect!'+' ~b~'+badguy+' ~w~')
            native.removeBlip(crimeblip);
            native.removeBlip(crime);
            native.clearAllBlipRoutes();
            let purs1 = alt.setInterval(()=>{
                alt.clearInterval(purs1);
                native.playSound(0, "ScreenFlash", "MissionFailedSounds", true, 0 ,false)
                alt.emit('timerbar', ["", "", 0], ["", "", 0], ["", "", 0])
                setMeta('dispacth', 0);
                crimenotif('SUSPECT ESCAPED', "FAIL TO CATCH THE SUSPECT!");
            },30000);
        }
    }, 1000);
    
}

function setclothes(compid, drawid, textid) {
    game.setPedComponentVariation(alt.Player.local.scriptID, compid, drawid, textid, 0);
}

function crimenotif(title, text) {
    let notif = alt.everyTick(()=>{
        drawtext(title,0.5,0.22,4,1.2,0.9,255,255,255,255);
        drawtext(text,0.5,0.28,4,0.7,0.9,200, 155, 0,255);
    })
    let stop = alt.setInterval(()=>{
        alt.clearEveryTick(notif);
        handletext("~INPUT_PICKUP~ Start Pursuit")
        alt.clearInterval(stop);
    }, 6000);
}

alt.on('Police Officer', ()=>{
    if(copjob > 0) {
        alt.clearInterval(copjob);
        if(salarytime > 0) {
            alt.clearInterval(salarytime);
        }
        alt.emitServer('policeoffduty', salary);
        alt.emit('notification', '~b~Cop Salary ~w~$ '+salary)
        native.clearAllPedProps(alt.Player.local.scriptID);
        native.removeAllPedWeapons(alt.Player.local.scriptID, false);
        alt.emit('loadoutfit', 'default');
        alt.emit('loadweapon');
        deleteMeta('police');
        deleteMeta('dispatch');
        salary = 0
        for(let i in copblips) {
            native.removeBlip(copblips[i]);
        }
    }
})

function copsalary() {
    salarytime = alt.setInterval(()=>{
        salary += 1000
    }, 60000)
}
function handletext(text) {
	native.beginTextCommandDisplayHelp("STRING");
	native.addTextComponentSubstringKeyboardDisplay(text);
	native.endTextCommandDisplayHelp(0, 0, true, -1);
};

function drawtext(msg, x, y, font, scale, wrap, r, g, b, a,) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(font);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, wrap);
    native.setTextCentre(true);
    native.setTextColour(r,g,b,a);
    native.setTextOutline();
    native.setTextJustification(0);
    native.setTextDropShadow(true);
    native.endTextCommandDisplayText(x, y, 0);
}

function notification(message) {
    native.beginTextCommandThefeedPost('STRING')
    native.setColourOfNextTextComponent(-1)
    native.thefeedSetBackgroundColorForNextPost(-1)
    //native.thefeedSetFlashDurationParameterForNextMessage()
    native.thefeedSetRgbaParameterForNextMessage(0,0,0,50)
    native.addTextComponentSubstringPlayerName(message)
    native.endTextCommandThefeedPostTicker(true, true)
}

function picnotification(pic, sender, message) {
    native.beginTextCommandThefeedPost('STRING')
    native.setColourOfNextTextComponent(-1)
    native.thefeedSetBackgroundColorForNextPost(-1)
    //native.thefeedSetFlashDurationParameterForNextMessage()
    native.thefeedSetRgbaParameterForNextMessage(0,0,0,50)
    native.addTextComponentSubstringPlayerName(message)
    native.endTextCommandThefeedPostMessagetext(pic,pic, true, 4, sender, message)
    native.endTextCommandThefeedPostTicker(true, true)
}