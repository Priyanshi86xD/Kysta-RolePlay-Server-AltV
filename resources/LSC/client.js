import * as alt from 'alt-client';
import * as NativeUI from './NativeUI/NativeUi.js';
import * as native from 'natives';
import { setMeta, deleteMeta, getMeta } from 'alt-client';
import { armors, bombs, brakes, colors, countermeasures, engines, Exhausts, Fenders, Frames, frontbumpers, Grilles, handlings, Hoods, horns, Liverys, neonlayouts, paintcolors, plates, rearbumpers, roofs, Skirts, Spoilers, suspensions, tires, transmissions, turbos, wheelcolors, windows } from './vehiclemods.js';

const positions = [
    { garage: "LSC1", x: -210.975, y: -1323.923, z: 30.290, h:176.4051055908203,   }, //Bennys Garage
    { garage: "LSC2",x: 110.665, y: 6625.531, z: 31.098, h:43.86065673828125, cam:{x: 106.85629272460938,   y: 6629.12548828125,   z: 32.162845611572266} }, //Beekers Garage
    { garage: "LSC3",x: 1175.417, y: 2642.307, z: 37.268, h:181.54835510253906, cam:{x: 1176.5609130859375,  y: 2635.76708984375, z: 37.691307067871094} },  //Sandy Shores
    { garage: "LSC4",x: -341.876953125,   y: -138.91363525390625,  z: 38.32019805908203, h:251.9251708984375, cam:{x: -335.33660888671875,     y: -138.65147399902344, z: 39.2218132019043}  },  //Burton
    { garage: "LSC5",x: 732.1300659179688,    y: -1088.51416015625,    z: 21.924457550048828 , h:270.0713806152344, cam: {x: 736.8058471679688, y: -1087.0810546875,  z: 22.56528663635254}}, //La Mesa
    { garage: "LSC6",x: -1155.063232421875,    y: -2000.928466796875,    z: 12.524199485778809, h:133.7891082763672, cam: {x: -1158.4344482421875,    y: -2007.0625,  z: 13.67277717590332} },  //Los Santos Airport
]
let garagename;
let doorpos;
let planemod = false

let flareplanes = {
    ["mogul"] : true,
    ["rogue"] : true,
    ["starling"] : true,
    ["seabreeze"] : true,
    ["tula"] : true,
    ["bombushka"] : true,
    ["hunter"] : true,
    ["nokota"] : true,
    ["pyro"] : true,
    ["molotok"] : true,
    ["havok"] : true,
    ["alphaz1"] : true,
    ["microlight"] : true,
    ["howard"] : true,
    ["avenger"] : true,
    ["thruster"] : true,
    ["volatol"] : true,
    ["titan"] : true,
    ["strikeforce"] : true,
    ["lazer"] : true,
    ["hydra"] : true,
    ["akula"] : true,
    ["alkonost"] : true,
  }
  
let bombplanes = {
    ["cuban800"] : true,
    ["mogul"] : true,
    ["rogue"] : true,
    ["starling"] : true,
    ["seabreeze"] : true,
    ["tula"] : true,
    ["bombushka"] : true,
    ["hunter"] : true,
    ["avenger"] : true,
    ["akula"] : true,
    ["volatol"] : true,
    ["alkonost"] : true,
    ["strikeforce"] : true,
    ["molotok"] : true,
  }

const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    TitleScale: 1.2,
    TitleFont: NativeUI.Font.HouseScript,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
}

const EventNames = {
    ToggleMenu: "LSC:Menu",
}

const MenuText = {
    MenuTitle: "",
    MenuSubTitle: "~b~VEHICLE UPGRADES & MODIFICATIONS~b~",
    sprite: "shopui_title_carmod",
}

const pcoloritem = [
    {name : 'Classic', coltype : 'Classic', emit : 'vehcolor1'},
    {name : 'Metallic', coltype : 'Metallic', emit : 'vehcolor1'},
    {name : 'Matte', coltype : 'Matte', emit : 'vehcolor1'},
    {name : 'Metals', coltype : 'Metals', emit : 'vehcolor1'},
    {name : 'Pearlescent', coltype : 'Classic', emit : 'vehcolor3'},
]

const scoloritem = [
    {name : 'Classic', coltype : 'Classic', emit : 'vehcolor2'},
    {name : 'Metallic', coltype : 'Metallic', emit : 'vehcolor2'},
    {name : 'Matte', coltype : 'Matte', emit : 'vehcolor2'},
    {name : 'Metals', coltype : 'Metals', emit : 'vehcolor2'},
]
const vehicleclass = ['Compacts','Sedans','SUVs','Coupes','Muscle','Sports Classics','Sports','Super','Motorcycles','Off-Road',
'Industrial','Utility','Vans','Cycles','Boats','Helicopters','Planes','Service','Emergency','Military','Commercial','Trains',]

let price;
let price1;

let color1;
let color2;
let perleascent;
let dashcolor;
let engine ;
let turbo;
let window ;
let plate ;
let wheeltype;
let wheelmodel ;
let rearwheel ;
let wheelcolor ;
let customTires;
let bulletproof;
let xenon ;
let neon ;// {front: false, back: false, left: false, right: false };
let neoncolor ;// = {};
let tireSmokecolor;// = {};
let bomb;
let countermeasure;
let vehicle;
let pricetag;
let pricelabel;
let pveh;
// DO NOT EDIT
const LSCMenu = new NativeUI.Menu(MenuText.MenuTitle, 'CATEGORIES', MenuSettings.Point, MenuText.sprite, MenuText.sprite);
LSCMenu.Visible = false;
LSCMenu.CloseableByUser = false;
LSCMenu.GetTitle().Scale = MenuSettings.TitleScale,
LSCMenu.GetTitle().Font = MenuSettings.TitleFont;
LSCMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
LSCMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;

function LSCModMenu() {
    vehicle = alt.Player.local.vehicle;
    if (!vehicle) {
    LSCMenu.Visible = false;
    console.log('YOU ARE NOT IN A VEHICLE');
    } else {
        native.doScreenFadeOut(500);
        pveh = native.getEntityModel(vehicle);
        let manu = native.getMakeNameFromVehicleModel(pveh);
        let vehdisp = native.getDisplayNameFromVehicleModel(pveh);
        let vclass = native.getVehicleClass(vehicle);
        let vclas = vehicleclass[vclass];
        let vehname = native.getFilenameForAudioConversation(vehdisp);
        let vmanu = native.getFilenameForAudioConversation(manu);
        let pos = positions.filter(function(name) {
            return name.garage == garagename;
        })
        
        vehilcename([vmanu,' ','',vehname].join(''),5,0.8,4,1.6,0.9,255,255,255,255);
        vehilcename(vclas,5,0.85,1,1.3,0.91,0, 102, 255,255);

        let data = vehicle.getSyncedMeta('cardata');
        if(!data) {} else {
        color1 = data.color1;
        color2 = data.color2;
        perleascent = data.perleascent;
        wheelmodel = data.wheelmodel;
        wheelcolor = data.wheelcolor;
    }
        let vehtimeout = alt.setInterval(() =>{
         native.setEntityHeading(vehicle, pos[0].h);
         native.setVehicleOnGroundProperly(alt.Player.local.vehicle, 5.0)
        native.taskVehicleDriveToCoord(alt.Player.local.scriptID, vehicle, pos[0].x, pos[0].y, pos[0].z, 5, 0, pveh, 786468, 1, 8);
        lsccamera(pos[0].cam)
        let health = native.getVehicleBodyHealth(vehicle);
        //native.freezeEntityPosition(vehicle, true);
        //native.setVehicleDoorsLocked(vehicle, 4);
        
        let menuinterval = alt.setInterval(() => {
            if(health < 999) {
                repair()
            } else {
                LSCMenu.Open();
            }
            alt.clearInterval(menuinterval);
            
            pricetag = alt.everyTick(()=>{
                drawtext(pricelabel, 0.33, 0.216, 0, 0.35, 0.25, 255,255,255,255);
            })
        },1000);
        alt.clearInterval(vehtimeout);
    },500)  

}
}

// ========================================================================================================
// Repair Menu

//LSCMenu.AddItem(RepairItem);
function repair() {
    let health = native.getVehicleBodyHealth(alt.Player.local.vehicle);
        let vh = 1000 - health;
                let repaircost = Math.round((vh/1000) * 3000)
let RepairMenu = new NativeUI.Menu(MenuText.MenuTitle, "~b~REPAIR~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
RepairMenu.Visible = false;
RepairMenu.CloseableByUser = false;

let RepairItem = new NativeUI.UIMenuItem("Repair Vehicle", "Fix Vehicle Damages");
RepairItem.RightLabel = '$ '+repaircost;
RepairMenu.AddItem(RepairItem);
RepairMenu.Open()
RepairMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Repair Vehicle") {
        alt.emitServer("Repair");
        alt.emit('buy', repaircost)
        RepairMenu.Close()
        LSCMenu.Open()
    }
});
}
// ========================================================================================================
// Upgrade Menu

const LSCMod = [
    {name: 'Armor', type: 16, data: armors },
    {name: 'Brakes', type: 12, data: brakes},
    {name: 'Engine', type: 11, data: engines },
    {name: 'Transmission', type: 13, data: transmissions},
]

LSCMod.forEach(element =>{
    let lscmoditem = new NativeUI.UIMenuItem(element.name, "", element.data)
    LSCMenu.AddItem(lscmoditem);

    LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < LSCMod.length) {
            let Selected = LSCMod[selectedItemIndex];
            LSCMenu.Close()
            modmenu(Selected.name.toUpperCase(), Selected.type, Selected.data)
        }
    })
})


function modmenu(maintitle, max, data) {
let endef = native.getVehicleMod(alt.Player.local.vehicle, max);
//alt.log(endef);
let EngineMenu = new NativeUI.Menu(MenuText.MenuTitle, maintitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
EngineMenu.CloseableByUser = false;

data.forEach(element => {
	let EngineModItem = new NativeUI.UIMenuItem(element.name, "");
    if(endef == element.id) {
        EngineModItem.RightBadge = 12;
    } else {
        EngineModItem.RightLabel = ('$ '+ element.price)
    }
	EngineMenu.AddItem(EngineModItem);
    
});
EngineMenu.AddItem(new NativeUI.UIMenuItem("Back", ""));

EngineMenu.Open();
EngineMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < data.length) {
        let SelectedEngine = data[selectedItemIndex];
		let mod = SelectedEngine.id;
        if(mod == endef) {} else {
            price = SelectedEngine.price;
            let mods = alt.setInterval(()=>{
                native.playSound(0, "Super_Mod_Garage_Upgrade_Car_Default", "0", true, 0 ,false)
                alt.emitServer("vehmod", alt.Player.local.vehicle, max, SelectedEngine.id+1, 1);
                alt.emit('buy', price);
                EngineMenu.Close()
                let reopen = alt.setInterval(()=>{
                    modmenu(maintitle, max, data)  
                    alt.clearInterval(reopen);
                }, 500);
                alt.clearInterval(mods);
            }, 500);  
        }
}
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
        EngineMenu.Close()
        LSCMenu.Open()
    }
});
}


let TurboItem = new NativeUI.UIMenuItem("Turbo", "Turbo Tuning");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Turbo") {
        LSCMenu.Close(true);
        Turbomenu()
    }})

function Turbomenu() {
let endef = native.getVehicleMod(alt.Player.local.vehicle, 18);
let TurboMenu = new NativeUI.Menu(MenuText.MenuTitle, "TURBO", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
TurboMenu.CloseableByUser = false;

turbos.forEach(element => {
	let TurboModItem = new NativeUI.UIMenuItem(element.name, "");
    if(endef == element.id) {
        TurboModItem.RightBadge = 12;
    } else {
        TurboModItem.RightLabel = ('$ '+ element.price)
    }
	TurboMenu.AddItem(TurboModItem);
});
TurboMenu.AddItem(new NativeUI.UIMenuItem("Back", ""));

TurboMenu.Open();
TurboMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < turbos.length) {
        let SelectedTurbo = turbos[selectedItemIndex];
		turbo = SelectedTurbo.id;
        if(turbo == endef) {} else {
            price = SelectedTurbo.price;
            let mod = alt.setInterval(()=>{
                native.setVehicleMod(alt.Player.local.vehicle, 18, turbo, customTires)
                //alt.emitServer("vehmod", alt.Player.local.vehicle, 18, turbo, 1);
                if(turbo == 0) {
                    native.setVehicleBoostActive(alt.Player.local.vehicle, true);
                } else {
                    native.setVehicleBoostActive(alt.Player.local.vehicle, false);
                }
                TurboMenu.Close()
                let reopen = alt.setInterval(()=>{
                    Turbomenu()  
                    alt.clearInterval(reopen);
                }, 500);
                alt.clearInterval(mod);
            }, 500);  
        }
}
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
        TurboMenu.Close()
        LSCMenu.Open()
    }
});
}

let ColorItem = new NativeUI.UIMenuItem("Respray", "Transform vehicle appearance.");
let ColorMenu = new NativeUI.Menu(MenuText.MenuTitle, "RESPRAYS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);


let PrimaryItem = new NativeUI.UIMenuItem("Primary Color", "");
ColorMenu.AddItem(PrimaryItem);
let SecondaryItem = new NativeUI.UIMenuItem("Secondary Color", "");
ColorMenu.AddItem(SecondaryItem);

let PrimaryMenu = new NativeUI.Menu(MenuText.MenuTitle, "PRIMARY COLORS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
ColorMenu.AddSubMenu(PrimaryMenu, PrimaryItem)
let SecondaryMenu = new NativeUI.Menu(MenuText.MenuTitle, "SECONDARY COLORS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
ColorMenu.AddSubMenu(SecondaryMenu, SecondaryItem)

pcoloritem.forEach(element =>{
    let coltype = new NativeUI.UIMenuItem(element.name, "", pcoloritem);
    PrimaryMenu.AddItem(coltype);

    PrimaryMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < pcoloritem.length) {
            let type = pcoloritem[selectedItemIndex];
            LSCMenu.Close(true);
            modcolor('PRIMARY COLORS', type.name, type.coltype, type.emit)

        }
    })
})

scoloritem.forEach(element =>{
    let coltype = new NativeUI.UIMenuItem(element.name, "", scoloritem);
    SecondaryMenu.AddItem(coltype);

    SecondaryMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < scoloritem.length) {
            let type = scoloritem[selectedItemIndex];
            LSCMenu.Close(true);
            modcolor('SECONDARY COLORS', type.name, type.coltype, type.emit)

        }
    })
})

function modcolor(maintitle, paint, filter, emit) {
    let data = paintcolors.filter(function(color) {
        return color.type == filter
    })

let ColorsMenu = new NativeUI.Menu(MenuText.MenuTitle, maintitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
ColorsMenu.CloseableByUser =false;
let vcolor;
let color = new NativeUI.UIMenuAutoListItem(paint, "", 0, data.length-1, 0, data)
ColorsMenu.AddItem(color);
ColorsMenu.Open()
ColorsMenu.AutoListChange.on((selectedItem, selectedItemIndex) =>{
    let mod = data[selectedItemIndex]
    vcolor = mod.id
    price = mod.price;
    pricelabel = "$ "+price;
    alt.emitServer(emit, alt.Player.local.vehicle, vcolor)
})
ColorsMenu.AddItem(new NativeUI.UIMenuItem("Purchase", ""))
ColorsMenu.AddItem(new NativeUI.UIMenuItem("Cancel", ""))

ColorsMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        if(emit == "vehcolor1") {
            color1 = vcolor;
        } else if(emit == "vehcolor2") {
            color2 = vcolor;
        } else if(emit == "vehcolor3") {
            perleascent = vcolor;
        }
        alt.emit('buy', price);
        pricelabel = ""
        if(maintitle == "PRIMARY COLORS") {
            ColorsMenu.Close()
            PrimaryMenu.Open()
        } else {
            ColorsMenu.Close()
            SecondaryMenu.Open()
        }
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        alt.emitServer(emit, alt.Player.local.vehicle, color1)
        pricelabel = ""
        if(maintitle == "PRIMARY COLORS") {
            ColorsMenu.Close()
            PrimaryMenu.Open()
        } else {
            ColorsMenu.Close()
            SecondaryMenu.Open()
        }
    }
});
}

let dashItem = new NativeUI.UIMenuItem("Dashboard Color", "");
ColorMenu.AddItem(dashItem);
let dashMenu = new NativeUI.Menu("DASHBOARD", "")
ColorMenu.AddSubMenu(dashMenu, dashItem)

let color = new NativeUI.UIMenuAutoListItem("Dashboard color", "", 0, 169, 0, paintcolors)
dashMenu.AddItem(color);
let mod;
dashMenu.AutoListChange.on((selectedItem, selectedItemIndex) =>{
    mod = color.SelectedValue
    price = 500
    pricelabel = "$ "+price;
    alt.emitServer('dashcolor', alt.Player.local.vehicle, mod)
})
dashMenu.AddItem(new NativeUI.UIMenuItem("Purchase", ""))
dashMenu.AddItem(new NativeUI.UIMenuItem("Cancel", ""))

dashMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        dashcolor = mod
        alt.emit('buy', price);
        pricelabel = ""
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        alt.emitServer('dashcolor', alt.Player.local.vehicle, dashcolor)
        pricelabel = ""
    }
        dashMenu.Close()
        ColorMenu.Open()
});


let SpoilerItem = new NativeUI.UIMenuItem("Spoiler", "Increase downforce.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Spoiler") {
        LSCMenu.Close(true);
        modsmenu("SPOILERS", 0, Spoilers)
}})



function modsmenu(maintitle, type, data) {
let max = native.getNumVehicleMods(alt.Player.local.vehicle, type)
let endef = (native.getVehicleMod(alt.Player.local.vehicle, type))+1;
alt.log(endef);
let SpoilerMenu = new NativeUI.Menu(MenuText.MenuTitle, maintitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
SpoilerMenu.CloseableByUser = false;

let SpoilerModItem = new NativeUI.UIMenuAutoListItem("Choose Type :", "", 0, max, endef, data);
SpoilerMenu.AddItem(SpoilerModItem);
SpoilerMenu.AddItem(new NativeUI.UIMenuItem("Purchase Mod", ""));
SpoilerMenu.AddItem(new NativeUI.UIMenuItem("Cancel", ""));
SpoilerMenu.Open();
SpoilerMenu.AutoListChange.on((selectedItem, selectedItemIndex) =>{
    let mod = SpoilerModItem.SelectedValue;
    price = data[selectedItemIndex].price;
    pricelabel = '$ '+price;
    native.playSound(0, "Super_Mod_Garage_Upgrade_Car_Default", "0", true, 0 ,false)
    alt.emitServer("vehmod", alt.Player.local.vehicle, type, mod, 1);
})

SpoilerMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Mod") {
        pricelabel = ""
        alt.emit('buy', price);
        SpoilerMenu.Close()
        LSCMenu.Open()
    }
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        pricelabel = ""
        alt.emitServer("vehmod", alt.Player.local.vehicle, type, endef, 1);
        SpoilerMenu.Close()
        LSCMenu.Open()
    }
});
}

let BumperItem = new NativeUI.UIMenuItem("Bumper", "Custom front and rear bumpers.");
let BumperMenu = new NativeUI.Menu(MenuText.MenuTitle, "BUMPERS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);


let FBumperItem = new NativeUI.UIMenuItem("Front Bumper", "Custom front bumpers.");
BumperMenu.AddItem(FBumperItem);
BumperMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Front Bumper") {
        BumperMenu.Close(true);
        modsmenu("FRONT BUMPERS", 1, frontbumpers)
    }})

let RBumperItem = new NativeUI.UIMenuItem("Rear Bumper", "Custom Rear bumpers.");
BumperMenu.AddItem(RBumperItem);
BumperMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Rear Bumper") {
        BumperMenu.Close(true);
        modsmenu("REAR BUMPERS", 2, rearbumpers)
    }})

let SkirtItem = new NativeUI.UIMenuItem("Skirt", "Enhance vehicle's look with custom side skirts.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Skirt") {
        LSCMenu.Close(true);
        modsmenu("SIDE SKIRTS", 3, Skirts)
    }})

let ExhaustItem = new NativeUI.UIMenuItem("Exhaust", "Custom exhaust.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Exhaust") {
        LSCMenu.Close(true);
        modsmenu("EXHAUST", 4, Exhausts)
    }})

let FrameItem = new NativeUI.UIMenuItem("Frame", "Enhance vehicle's look with custom Frames.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Frame") {
        LSCMenu.Close(true);
        modsmenu("FRAMES", 5, Frames)
    }})

let GrilleItem = new NativeUI.UIMenuItem("Grille", "Enhance vehicle's look with custom Grilles.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Grille") {
        LSCMenu.Close(true);
        modsmenu("GRILLES", 6, Grilles)
    }})

let HoodItem = new NativeUI.UIMenuItem("Hood", "Enhance vehicle's performance with custom hoods.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Hood") {
        LSCMenu.Close(true);
        modsmenu("HOODS", 7, Hoods)
    }})

let fenderItem = new NativeUI.UIMenuItem("fender", "Enhance vehicle's look with custom fenders.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "fender") {
        LSCMenu.Close(true);
        modsmenu("FENDERS", 8, Fenders)
    }})

let RfenderItem = new NativeUI.UIMenuItem("Rear Fender", "Enhance vehicle's look with custom fenders.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Rear Fender") {
        LSCMenu.Close(true);
        modsmenu("REAR PANEL", 9, Fenders)
    }})

let RoofItem = new NativeUI.UIMenuItem("Roof", "Custom vehicle roofs.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Roof") {
        LSCMenu.Close(true);
        modsmenu("ROOFS", 10, roofs)
    }})

let SuspensItem = new NativeUI.UIMenuItem("Suspension", "Custom wheel Suspensions.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Suspension") {
        LSCMenu.Close(true);
        modmenu("SUSPENSIONS", 15, suspensions)
    }})

let LIveryItem = new NativeUI.UIMenuItem("Livery", "Custom vehicle liveries.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Livery") {
        LSCMenu.Close(true);
        modsmenu("LIVERIES", 48, Liverys)
    }})

let HornItem = new NativeUI.UIMenuItem("Horn", "Custom musical horns.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Horn") {
        LSCMenu.Close(true);
        modmenu("HORNS", 14, horns)
    }})

let WindowsItem = new NativeUI.UIMenuItem("Window", "Custom Window glasses.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Window") {
        LSCMenu.Close(true);
        Windowsmenu()
    }})

function Windowsmenu() {
let endef = native.getVehicleMod(alt.Player.local.vehicle, 55);
let WindowsMenu = new NativeUI.Menu(MenuText.MenuTitle, "WINDOWS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
WindowsMenu.CloseableByUser = false;

windows.forEach(element => {
	let WindowsModItem = new NativeUI.UIMenuItem(element.name, "");
    if(endef == element.id) {
        WindowsModItem.RightBadge = 12;
    } else {
        WindowsModItem.RightLabel = ('$ '+ element.price)
    }
	WindowsMenu.AddItem(WindowsModItem);
    
});
WindowsMenu.AddItem(new NativeUI.UIMenuItem("Back", ""));

WindowsMenu.Open();
WindowsMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < windows.length) {
        let SelectedWindows = windows[selectedItemIndex];
		window = SelectedWindows.id;
        if(window == endef) {} else {
            price = SelectedWindows.price;
            let mod = alt.setInterval(()=>{
                native.playSound(0, "Super_Mod_Garage_Upgrade_Car_Default", "0", true, 0 ,false)
                alt.emitServer("vehwin", alt.Player.local.vehicle, window);
                alt.emit('buy', price);
                WindowsMenu.Close()
                let reopen = alt.setInterval(()=>{
                    Windowsmenu()  
                    alt.clearInterval(reopen);
                }, 500);
                alt.clearInterval(mod);
            }, 500);  
        }
}
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
        WindowsMenu.Close()
        LSCMenu.Open()
    }
});
}

let PlateItem = new NativeUI.UIMenuItem("Plate", "Number plate colors.");
LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Plate") {
        LSCMenu.Close(true);
        Platemenu()
    }})

function Platemenu() {
let max = native.getNumVehicleMods(alt.Player.local.vehicle, 7); 
let endef = native.getVehicleMod(alt.Player.local.vehicle, 7);
let PlateMenu = new NativeUI.Menu(MenuText.MenuTitle, "NUMBER PLATE STYLES", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
PlateMenu.CloseableByUser = false;

plates.forEach(element => {
	let PlateModItem = new NativeUI.UIMenuItem(element.name, "");
    if(endef == element.id) {
        PlateModItem.RightBadge = 12;
    } else {
        PlateModItem.RightLabel = ('$ '+ element.price)
    }
	PlateMenu.AddItem(PlateModItem);
});
PlateMenu.AddItem(new NativeUI.UIMenuItem("Back", ""));

PlateMenu.Open();
PlateMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < plates.length) {
        let SelectedPlate = plates[selectedItemIndex];
		plate = SelectedPlate.id;
        if(plate == endef) {} else {
            price = SelectedPlate.price;
            let mod = alt.setInterval(()=>{
                native.playSound(0, "Super_Mod_Garage_Upgrade_Car_Default", "0", true, 0 ,false)
                alt.emitServer("vehplate", alt.Player.local.vehicle, plate);
                alt.emit('buy', price);
                PlateMenu.Close()
                let reopen = alt.setInterval(()=>{
                    Platemenu()  
                    alt.clearInterval(reopen);
                }, 500);
                alt.clearInterval(mod);
            }, 500);  
        }
}
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
        PlateMenu.Close()
        LSCMenu.Open()
    }
});
}

let WheelItem = new NativeUI.UIMenuItem("Wheel", "Custom vehicle wheels");
let WheelsMenu = new NativeUI.Menu(MenuText.MenuTitle, "WHEELS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
WheelsMenu.Visible = false;

let WheelsItem = new NativeUI.UIMenuItem("Wheel Type", "Wheel rims and color");
WheelsMenu.AddItem(WheelsItem);

let WheelMenu = new NativeUI.Menu(MenuText.MenuTitle, "WHEEL TYPES", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
WheelMenu.Visible = false;
WheelsMenu.AddSubMenu(WheelMenu, WheelsItem);

let SportMenuItem = new NativeUI.UIMenuItem("Sport", "");
WheelMenu.AddItem(SportMenuItem);

let SportMenu = new NativeUI.Menu(MenuText.MenuTitle, "SPORTS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
SportMenu.Visible = false;
WheelMenu.AddSubMenu(SportMenu, SportMenuItem);

let sports = tires.filter(function(type) {
    return type.type == 'Sport'
})

SportMenu.AddItem( new NativeUI.UIMenuItem("Stock Rims", ""))
SportMenu.AddItem( new NativeUI.UIMenuItem("Chrome Rims", ""))
SportMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Stock Rims") {
        wheelmenu("SPORTS","Stock Rims design", 0, 24, sports, 0)
        SportMenu.Close()
        WheelMenu.Close(true);
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Chrome Rims") {
        wheelmenu("SPORTS","Chrome Rims design", 25, 49, sports, 0)
        SportMenu.Close()
        WheelMenu.Close(true);
    }
})

let MuscleMenuItem = new NativeUI.UIMenuItem("Muscle", "");
WheelMenu.AddItem(MuscleMenuItem);

let MuscleMenu = new NativeUI.Menu(MenuText.MenuTitle, "MUSCLES", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
MuscleMenu.Visible = false;
WheelMenu.AddSubMenu(MuscleMenu, MuscleMenuItem);

let Muscles = tires.filter(function(type) {
    return type.type == 'Muscle'
})

MuscleMenu.AddItem( new NativeUI.UIMenuItem("Stock Rims", ""))
MuscleMenu.AddItem( new NativeUI.UIMenuItem("Chrome Rims", ""))
MuscleMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Stock Rims") {
        wheelmenu("MUSCLES","Stock Rims design", 0, 16, Muscles, 1)
        MuscleMenu.Close()
        WheelMenu.Close(true);
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Chrome Rims") {
        wheelmenu("MUSCLES","Chrome Rims design", 17, 33, Muscles, 1)
        MuscleMenu.Close()
        WheelMenu.Close(true);
    }
})

let LowMenuItem = new NativeUI.UIMenuItem("Lowrider", "");
WheelMenu.AddItem(LowMenuItem);

let LowMenu = new NativeUI.Menu(MenuText.MenuTitle, "LOWRIDERS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
LowMenu.Visible = false;
WheelMenu.AddSubMenu(LowMenu, LowMenuItem);

let Lows = tires.filter(function(type) {
    return type.type == 'Lowrider'
})

LowMenu.AddItem( new NativeUI.UIMenuItem("Stock Rims", ""))
LowMenu.AddItem( new NativeUI.UIMenuItem("Chrome Rims", ""))
LowMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Stock Rims") {
        wheelmenu("LOWRIDERS","Stock Rims design", 0, 14, Lows, 2)
        LowMenu.Close()
        WheelMenu.Close(true);
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Chrome Rims") {
        wheelmenu("LOWRIDERS","Chrome Rims design", 15, 29, Lows, 2)
        LowMenu.Close()
        WheelMenu.Close(true);
    }
})

let SUVMenuItem = new NativeUI.UIMenuItem("SUV", "");
WheelMenu.AddItem(SUVMenuItem);

let SUVMenu = new NativeUI.Menu(MenuText.MenuTitle, "SUVS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
SUVMenu.Visible = false;
WheelMenu.AddSubMenu(SUVMenu, SUVMenuItem);

let SUVs = tires.filter(function(type) {
    return type.type == 'SUV'
})

SUVMenu.AddItem( new NativeUI.UIMenuItem("Stock Rims", ""))
SUVMenu.AddItem( new NativeUI.UIMenuItem("Chrome Rims", ""))
SUVMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Stock Rims") {
        wheelmenu("SUV","Stock Rims design", 0, 18, SUVs, 3)
        SUVMenu.Close()
        WheelMenu.Close(true);
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Chrome Rims") {
        wheelmenu("SUV","Chrome Rims design", 19, 37, SUVs, 3)
        SUVMenu.Close()
        WheelMenu.Close(true);
    }
})

let OffroadMenuItem = new NativeUI.UIMenuItem("Offroad", "");
WheelMenu.AddItem(OffroadMenuItem);

let OffroadMenu = new NativeUI.Menu(MenuText.MenuTitle, "OFFROADS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
OffroadMenu.Visible = false;
WheelMenu.AddSubMenu(OffroadMenu, OffroadMenuItem);

let Offroads = tires.filter(function(type) {
    return type.type == 'Offroad'
})

OffroadMenu.AddItem( new NativeUI.UIMenuItem("Stock Rims", ""))
OffroadMenu.AddItem( new NativeUI.UIMenuItem("Chrome Rims", ""))
OffroadMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Stock Rims") {
        wheelmenu("OFFROADS","Stock Rims design", 0, 9, Offroads, 4)
        OffroadMenu.Close()
        WheelMenu.Close(true);
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Chrome Rims") {
        wheelmenu("OFFROADS","Chrome Rims design", 10, 19, Offroads, 4)
        OffroadMenu.Close()
        WheelMenu.Close(true);
    }
})

let TunerMenuItem = new NativeUI.UIMenuItem("Tuner", "");
WheelMenu.AddItem(TunerMenuItem);

let TunerMenu = new NativeUI.Menu(MenuText.MenuTitle, "TUNERS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
TunerMenu.Visible = false;
WheelMenu.AddSubMenu(TunerMenu, TunerMenuItem);

let Tuners = tires.filter(function(type) {
    return type.type == 'Tuner'
})

TunerMenu.AddItem( new NativeUI.UIMenuItem("Stock Rims", ""))
TunerMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Stock Rims") {
        wheelmenu("TUNERS","Stock Rims design", 0, 23, Tuners, 5)
        TunerMenu.Close()
        WheelMenu.Close(true);
    }

})

let HighEndMenuItem = new NativeUI.UIMenuItem("High End", "");
WheelMenu.AddItem(HighEndMenuItem);

let HighEndMenu = new NativeUI.Menu(MenuText.MenuTitle, "HIGH END'S", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
HighEndMenu.Visible = false;
WheelMenu.AddSubMenu(HighEndMenu, HighEndMenuItem);

let HighEnds = tires.filter(function(type) {
    return type.type == 'High End'
})

HighEndMenu.AddItem( new NativeUI.UIMenuItem("Stock Rims", ""))
HighEndMenu.AddItem( new NativeUI.UIMenuItem("Chrome Rims", ""))
HighEndMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Stock Rims") {
        wheelmenu("HIGH END'S","Stock Rims design", 0, 19, HighEnds, 7)
        HighEndMenu.Close()
        WheelMenu.Close(true);
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Chrome Rims") {
        wheelmenu("HIGH END'S","Chrome Rims design", 20, 39, HighEnds, 7)
        HighEndMenu.Close()
        WheelMenu.Close(true);
    }
})

let BikeMenuItem = new NativeUI.UIMenuItem("Bike", "");
WheelMenu.AddItem(BikeMenuItem);

let BikeMenu = new NativeUI.Menu(MenuText.MenuTitle, "MOTORCYCLES", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
BikeMenu.Visible = false;
WheelMenu.AddSubMenu(BikeMenu, BikeMenuItem);

let Bikes = tires.filter(function(type) {
    return type.type == 'Bike'
})

BikeMenu.AddItem( new NativeUI.UIMenuItem("Stock Rims", ""))
BikeMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Stock Rims") {
        wheelmenu("MOTORCYCLES","Stock Rims design", 0, 35, Bikes, 6)
        BikeMenu.Close()
        WheelMenu.Close(true);
    }
})

let StreetMenuItem = new NativeUI.UIMenuItem("Street", "");
WheelMenu.AddItem(StreetMenuItem);

let StreetMenu = new NativeUI.Menu(MenuText.MenuTitle, "STREETS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
StreetMenu.Visible = false;
WheelMenu.AddSubMenu(StreetMenu, StreetMenuItem);

let Streets = tires.filter(function(type) {
    return type.type == 'Street'
})

StreetMenu.AddItem( new NativeUI.UIMenuItem("Stock Rims", ""))
StreetMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Stock Rims") {
        wheelmenu("STREETS","Stock Rims design", 0, 29, Streets, 11)
        StreetMenu.Close()
        WheelMenu.Close(true);
    }
})

let TrackMenuItem = new NativeUI.UIMenuItem("Track", "");
WheelMenu.AddItem(TrackMenuItem);

let TrackMenu = new NativeUI.Menu(MenuText.MenuTitle, "TRACKS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
TrackMenu.Visible = false;
WheelMenu.AddSubMenu(TrackMenu, TrackMenuItem);

let Tracks = tires.filter(function(type) {
    return type.type == 'Track'
})

TrackMenu.AddItem( new NativeUI.UIMenuItem("Stock Rims", ""))
TrackMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Stock Rims") {
        wheelmenu("TRACKS","Stock Rims design", 0, 29, Tracks, 12)
        TrackMenu.Close()
        WheelMenu.Close(true);
    }
})

function wheelmenu(maintitle, title, min, max, data, type) {
    let model;
    let sport1Menu = new NativeUI.Menu(MenuText.MenuTitle, maintitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
    let SportItem = new NativeUI.UIMenuAutoListItem(title, "", min, max, 0, data);
    sport1Menu.CloseableByUser = false;
    sport1Menu.AddItem(SportItem);
    
    sport1Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {
        model = SportItem.SelectedValue;
        price = data[selectedItemIndex].price;
        pricelabel = '$ '+price;
        native.playSound(0, "Super_Mod_Garage_Upgrade_Car_Default", "0", true, 0 ,false)
        alt.emitServer("wheelmod", alt.Player.local.vehicle, type, model);
        
    })
    
    sport1Menu.AddItem(new NativeUI.UIMenuItem("Purchase", ""))
    sport1Menu.AddItem(new NativeUI.UIMenuItem("Cancel", ""))
    sport1Menu.Open()
    sport1Menu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        pricelabel = ""
        alt.emit('buy', price);
        wheeltype = type;
        wheelmodel = model;
        sport1Menu.Close()
        WheelMenu.Open()
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        pricelabel = ""
        alt.emitServer("wheelmod", alt.Player.local.vehicle, wheeltype, wheelmodel);
        sport1Menu.Close()
        WheelMenu.Open()
    }
    });
}

let COLWHEMenuItem = new NativeUI.UIMenuItem("Wheel Color", "Custom wheel colors");
WheelsMenu.AddItem(COLWHEMenuItem);

let COLWHEMenu = new NativeUI.Menu(MenuText.MenuTitle, "WHEEL COLORS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
COLWHEMenu.Visible = false;
COLWHEMenu.CloseableByUser =false;
WheelsMenu.AddSubMenu(COLWHEMenu, COLWHEMenuItem);

let COLWHEItem = new NativeUI.UIMenuAutoListItem("Choose Wheel Color", "", 0, 159, 0, wheelcolors);
COLWHEMenu.AddItem(COLWHEItem);

let whlcolor;
COLWHEMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    whlcolor = COLWHEItem.SelectedValue;
    price = 2000 //wheelcolors[selectedItemIndex].price;
    pricelabel = '$ '+price;
    native.playSound(0, "Super_Mod_Garage_Upgrade_Car_Default", "0", true, 0 ,false)
    alt.emitServer("wheelcol",alt.Player.local.vehicle, whlcolor);
})

COLWHEMenu.AddItem(new NativeUI.UIMenuItem("Purchase", ""))
COLWHEMenu.AddItem(new NativeUI.UIMenuItem("Cancel", ""))
COLWHEMenu.ItemSelect.on((item, selectedItemIndex) => {
if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
    pricelabel = ""
    wheelcolor = whlcolor;
    alt.emit('buy', price);
    COLWHEMenu.Close()
    WheelsMenu.Open()
}
if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
    pricelabel = ""
    alt.emitServer("wheelcol", alt.Player.local.vehicle, wheelcolor);
    COLWHEMenu.Close()
    WheelsMenu.Open()
}
});

let TireItem = new NativeUI.UIMenuItem("Tires", "");
WheelsMenu.AddItem(TireItem);
let TireMenu = new NativeUI.Menu(MenuText.MenuTitle, "TIRES", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
WheelsMenu.AddSubMenu(TireMenu, TireItem);

let TireDItem = new NativeUI.UIMenuItem("Tire Design", "");
TireMenu.AddItem(TireDItem);
let TireDMenu = new NativeUI.Menu(MenuText.MenuTitle, "TIRE DESIGN", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
TireMenu.AddSubMenu(TireDMenu, TireDItem);
TireDMenu.AddItem(new NativeUI.UIMenuItem("Standard", ""))
TireDMenu.AddItem(new NativeUI.UIMenuItem("Custom Tire", ""))

TireDMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Standard") {
        customTires = false;
        alt.emitServer('wheelcust', alt.Player.local.vehicle, false);
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Custom Tire") {
        customTires = true;
        alt.emitServer('wheelcust', alt.Player.local.vehicle, true);
        alt.emit('buy', 5000);
    }
});

let TireEItem = new NativeUI.UIMenuItem("Tire Enhancements", "");
TireMenu.AddItem(TireEItem);
let TireEMenu = new NativeUI.Menu(MenuText.MenuTitle, "TIRE ENHANCEMENTS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
TireMenu.AddSubMenu(TireEMenu, TireEItem);
let invinctire = new NativeUI.UIMenuItem("Bulletproof Tire", "")
let standtire = new NativeUI.UIMenuItem("Standard", "")
standtire.RightLabel = "$ 1000";
invinctire.RightLabel = "$ 25000";
TireEMenu.AddItem(standtire)
TireEMenu.AddItem(invinctire)

TireEMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Standard") {
        bulletproof = false;
        native.setVehicleWheelsCanBreak(alt.Player.local.vehicle, true);
        native.setVehicleTyresCanBurst(alt.Player.local.vehicle, true);
        alt.emit('buy', 1000);
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Bulletproof Tire") {
        bulletproof = true;
        native.setVehicleWheelsCanBreak(alt.Player.local.vehicle, false);
        native.setVehicleTyresCanBurst(alt.Player.local.vehicle, false);
        alt.emit('buy', 25000);
    }
});

let TireSItem = new NativeUI.UIMenuItem("Tire Smoke", "");
TireMenu.AddItem(TireSItem);
TireMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Tire Smoke") {
        LSCMenu.Close(true);
        TireSmenu()
    }})

function TireSmenu() {
let endef = tireSmokecolor
let tsmoke;
let TireSMenu = new NativeUI.Menu(MenuText.MenuTitle, "TIRE SMOKES", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
TireSMenu.CloseableByUser = false;

colors.forEach(element => {
	let TireSmokeItem = new NativeUI.UIMenuItem(element.color, "", colors);
    
    if(endef == element.color) {
        TireSmokeItem.RightBadge = 12;
    } else {
        TireSmokeItem.RightLabel = ('$ '+ element.price)
    }
	TireSMenu.AddItem(TireSmokeItem);
    
});
TireSMenu.AddItem(new NativeUI.UIMenuItem("Back", ""));

TireSMenu.Open();
TireSMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < colors.length) {
        let SelectedTireColor = colors[selectedItemIndex];
        let tcolor1 = SelectedTireColor.r;
        let tcolor2 = SelectedTireColor.g;
        let tcolor3 = SelectedTireColor.b;
        tsmoke = SelectedTireColor.color;
        price = SelectedTireColor.price;
       // if(tireSmokecolor == endef) {} else {
            price = SelectedTireColor.price;
            let mod = alt.setInterval(()=>{
                alt.emitServer("smokecol", alt.Player.local.vehicle, tcolor1, tcolor2, tcolor3);
                tireSmokecolor = tsmoke;
                alt.emit('buy', price);
                TireSMenu.Close()
                let reopen = alt.setInterval(()=>{
                    TireSmenu()  
                    alt.clearInterval(reopen);
                }, 500);
                alt.clearInterval(mod);
            }, 500);  
       // }
}
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
        TireSMenu.Close()
        TireMenu.Open()
    }
});
}

let lightItem = new NativeUI.UIMenuItem("Light", "Vehicle lights customizations");
let lightMenu = new NativeUI.Menu(MenuText.MenuTitle, "LIGHTS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
lightMenu.Visible = false;

let HeadlightItem = new NativeUI.UIMenuItem("Headlight", "", native.getNumVehicleMods(alt.Vehicle, 22));
lightMenu.AddItem(HeadlightItem);

let HeadlightMenu = new NativeUI.Menu(MenuText.MenuTitle, "HEADLIGHTS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
HeadlightMenu.Visible = false;
HeadlightMenu.CloseableByUser = false;
lightMenu.AddSubMenu(HeadlightMenu, HeadlightItem);

let headlight;
let LightColorItem = new NativeUI.UIMenuAutoListItem("Xenon Headlight Colors", "", -1, 12, -1);
HeadlightMenu.AddItem(LightColorItem);
HeadlightMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    xenon = native.getVehicleXenonLightColorIndex(alt.Player.local.vehicle)
    headlight = LightColorItem.SelectedValue;
    if(headlight == 0) {
        price = 7500
    } else if(headlight > 0) {
        price = 10000;
    } else { price = 0}
    pricelabel = "$ "+price;
    native.setVehicleHeadlightShadows(alt.Player.local.vehicle, 2)
    alt.emitServer("xenon", alt.Player.local.vehicle, headlight); 
});

HeadlightMenu.AddItem(new NativeUI.UIMenuItem("Purchase", ""))
HeadlightMenu.AddItem(new NativeUI.UIMenuItem("Cancel", ""))
HeadlightMenu.ItemSelect.on((item, selectedItemIndex) => {
if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
    pricelabel = ""
    xenon = headlight;
    native.setVehicleHeadlightShadows(alt.Player.local.vehicle, 0)
    alt.emit('buy', price);
    HeadlightMenu.Close()
    lightMenu.Open()
}
if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
    pricelabel = ""
    alt.emitServer("xenon", alt.Player.local.vehicle, xenon);
    native.setVehicleHeadlightShadows(alt.Player.local.vehicle, 0)
    HeadlightMenu.Close()
    lightMenu.Open()
}
});

let NeonItem = new NativeUI.UIMenuItem("Neon Kits", "");
lightMenu.AddItem(NeonItem);

let NeonMenu = new NativeUI.Menu(MenuText.MenuTitle, "NEON KITS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
NeonMenu.Visible = false;
lightMenu.AddSubMenu(NeonMenu, NeonItem);

neonlayouts.forEach((element)=>{
    let neonitem = new NativeUI.UIMenuItem(element.layout, "", neonlayouts)
    NeonMenu.AddItem(neonitem);
})

NeonMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < neonlayouts.length) {
        let vneon = neonlayouts[selectedItemIndex]
        price = vneon.price; 
        neon = {f:vneon.f, b:vneon.b, l:vneon.l, r:vneon.r}
        alt.emitServer("neonEn", alt.Player.local.vehicle, vneon.f, vneon.b, vneon.l, vneon.r);
        alt.emit('buy', price);
    }
});

const neoncolors = [
{color: "White", r: 222, g: 222, b: 255, price: 0},
{ color: "Blue", r: 2, g: 21, b: 255, price: 5000},
{ color: "Electric Blue", r: 3, g: 83, b: 255, price: 5000},
{ color: "Mint Green", r: 0, g: 255, b: 140, price: 5000},
{ color: "Lime Green", r: 94, g: 255, b: 1, price: 7000},
{ color: "Yellow", r: 255, g: 255, b: 0, price: 5000},
{ color: "Golden Shower", r: 255, g: 150, b: 0, price: 6000},
{ color: "Orange", r: 255, g: 62, b: 0, price: 6000},
{ color: "Red", r: 	255, g: 1, b: 1, price: 6000},
{ color: "Pony Pink", r: 255, g: 50, b: 100, price: 7000},
{ color: "Hot Pink", r: 255, g: 5, b: 190, price: 8000},
{ color: "Purple", r: 35, g: 1, b: 255, price: 8000},
{ color: "Blacklight", r: 15, g: 3, b: 255, price: 1500},
];

let NeonColorItem = new NativeUI.UIMenuAutoListItem("Neon Colors", "", 0, 12, 0, neoncolors);
NeonMenu.AddItem(NeonColorItem);
let neoncol;

NeonMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    neoncol = neoncolors[selectedItemIndex];
    let color1 = neoncol.r
    let color2 = neoncol.g
    let color3 = neoncol.b
    alt.emitServer("neonCol", alt.Player.local.vehicle, color1, color2, color3);
    price = neoncol.price;
})

NeonMenu.AddItem(new NativeUI.UIMenuItem("Purchase", ""))
NeonMenu.AddItem(new NativeUI.UIMenuItem("Cancel", ""))
NeonMenu.ItemSelect.on((item, selectedItemIndex) => {
if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
    pricelabel = ""
    neoncolor = {r: neoncol.r, g: neoncol.g, b: neoncol.b}
    alt.emit('buy', price);
    NeonMenu.Close()
    lightMenu.Open()
}
if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
    pricelabel = ""
    alt.emitServer("neonCol", alt.Player.local.vehicle, neoncolor.r, neoncolor.g, neoncolor.b);
    NeonMenu.Close()
    lightMenu.Open()
}
});

// ========================================================================================================
// Event Section

LSCMenu.AddItem(BumperItem);
LSCMenu.AddSubMenu(BumperMenu, BumperItem)
LSCMenu.AddItem(ExhaustItem);
LSCMenu.AddItem(fenderItem);
LSCMenu.AddItem(FrameItem);
LSCMenu.AddItem(GrilleItem);
LSCMenu.AddItem(HoodItem);
LSCMenu.AddItem(HornItem);
LSCMenu.AddItem(lightItem);
LSCMenu.AddSubMenu(lightMenu, lightItem);
LSCMenu.AddItem(LIveryItem);
LSCMenu.AddItem(PlateItem);
LSCMenu.AddItem(ColorItem);
LSCMenu.AddSubMenu(ColorMenu, ColorItem)
LSCMenu.AddItem(RfenderItem);
LSCMenu.AddItem(RoofItem);
LSCMenu.AddItem(SkirtItem);
LSCMenu.AddItem(SpoilerItem);
LSCMenu.AddItem(SuspensItem);
LSCMenu.AddItem(TurboItem);
LSCMenu.AddItem(WheelItem);
LSCMenu.AddSubMenu(WheelsMenu, WheelItem);
LSCMenu.AddItem(WindowsItem);

LSCMenu.AddItem(new NativeUI.UIMenuItem("Finish & Close", ""));

LSCMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Finish & Close") {
        alt.clearEveryTick(pricetag);
        LSCMenu.Close(true);
        //LSCMenu.Clear();
        let pos = alt.Player.local.pos;
        let h = native.getHeadingFromVector2d((doorpos.x-pos.x),(doorpos.y-pos.y))
        native.doScreenFadeOut(500);
        if(vehicle.hasSyncedMeta('cardata')) {
            savevehiclemod();
        } else {}
        
        let vpos = native.getEntityForwardVector(alt.Player.local.scriptID);
        alt.log(vpos);
        let garageout = alt.setInterval(()=>{
            native.setEntityHeading(alt.Player.local.vehicle, h);
            native.setVehicleOnGroundProperly(alt.Player.local.vehicle, 5.0)
            let campos = {x:doorpos.x*2, y:doorpos.y*2, z:doorpos.z+0.3}
            lsccamera(doorpos);
            native.taskVehicleDriveToCoord(alt.Player.local.scriptID, vehicle, doorpos.x, doorpos.y, doorpos.z, 8, 0, pveh, 786603, 1, 8)
            native.freezeEntityPosition(vehicle, false);
            native.setVehicleDoorsLocked(vehicle, 0);
            //native.doScreenFadeIn(3000)
            alt.clearInterval(garageout);
        }, 1000);
        
    }
});

function savevehiclemod() {
    let veh = alt.Player.local.vehicle;
    let data = veh.getSyncedMeta('cardata');
    let vehmod = {
        garagenumber : data.garagenumber,
        garagename : data.garagename,
        garageindex : data.garageindex,
        model : data.model,
        display : data.display,
        garageslot : data.garageslot,
        color1 : color1,
        color2 : color2,
        perleascent : perleascent,
        dashboardcol : dashcolor,
        engine : native.getVehicleMod(veh, 11),
        brake : native.getVehicleMod(veh, 12),
        transmission : native.getVehicleMod(veh, 13),
        armor : native.getVehicleMod(veh, 16),
        turbo : native.getVehicleMod(veh, 18),
        spoiler : native.getVehicleMod(veh, 0),
        fbumper : native.getVehicleMod(veh, 1),
        rbumper : native.getVehicleMod(veh, 2),
        skirt : native.getVehicleMod(veh, 3),
        exhaust : native.getVehicleMod(veh, 4),
        frame : native.getVehicleMod(veh, 5),
        grille : native.getVehicleMod(veh, 6),
        hood : native.getVehicleMod(veh, 7),
        fender : native.getVehicleMod(veh, 8),
        rfender : native.getVehicleMod(veh, 9),
        roof : native.getVehicleMod(veh, 10),
        suspension : native.getVehicleMod(veh, 15),
        livery : native.getVehicleMod(veh, 48),
        horn : native.getVehicleMod(veh, 14),
        window : native.getVehicleWindowTint(veh),
        plate : native.getVehicleNumberPlateTextIndex(veh),
        wheeltype : native.getVehicleWheelType(veh),
        wheelmodel : wheelmodel,
        rearwheel : rearwheel,
        wheelcolor : wheelcolor,
        customtire : native.getVehicleTyresCanBurst(veh),
        xenon : native.getVehicleXenonLightColorIndex(veh),
        neon : { f : native.getVehicleNeonEnabled(veh, 2),
            b : native.getVehicleNeonEnabled(veh, 3), l : native.getVehicleNeonEnabled(veh, 0),
            r : native.getVehicleNeonEnabled(veh, 1)
        },
        neoncolor : native.getVehicleNeonColour(veh, 0,0,0), 
        tireSmoke : native.getVehicleTyreSmokeColor(veh,0,0,0),
        wheelproof :native.getVehicleTyresCanBurst(veh),
    }
    alt.emit('savecarmod', vehmod);
}
alt.on(EventNames.ToggleMenu, () => {
    LSCMenu.Visible = !LSCMenu.Visible;
});


alt.onServer("Close:LSCMenu", () => {
    
});

const carwashes = [
 { x: -699.652, y: -946.035, z: 19.601 }, //Little Seoul Car Wash
{ x: 57.513451, y: -1389.658691, z: 28.968079 } //Strawberry Car Wash
]

alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
        let shop = getMeta('LSC');
        let lsc = getMeta(shop);
        if(lsc == 1) {
            garagename = shop;
            doorpos = alt.Player.local.vehicle.pos;
            setMeta(lsc, 2)
            LSCModMenu();
        }
       
	}
});

alt.on('planemodmenu', () =>{
    if(planemod == false) {
        let vdata = alt.Player.local.vehicle.getSyncedMeta('owner')
        color1 = vdata.data.color1;
        color2 = vdata.data.color2;
        perleascent = vdata.data.pearlsc
        bomb = vdata.data.bomb;
        countermeasure = vdata.data.countermeasure;
        hangarmod(vdata.data.model)
        planemod = true
        pricetag = alt.everyTick(()=>{
            drawtext(pricelabel, 0.33, 0.216, 0, 0.35, 0.25, 255,255,255,255);
        })
    }  
})

function hangarmod(model) {
    const hmodmenu = new NativeUI.Menu("", 'AIRCRAFT WORKSHOP', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
    hmodmenu.Visible = false;
    hmodmenu.CloseableByUser = false;
    let modlist = [
        {name: 'Armor', type: 16, data: armors },
        {name: 'Bombs', type: 9, data: bombs},
        {name: 'Countermeasures', type: 1, data: countermeasures},
        {name: 'Drop Tanks', type: 3, data: [
            {id : -1, name: 'No drop tanks', price: 0},
            {id : 0, name: 'Drop tanks', price: 5500},
        ] },
        {name: 'Engine', type: 11, data: engines },
        {name: 'Handling', type: 12, data: handlings},
        {name: 'Livery', type: 48, data: Liverys },
        {name: 'Respray', type: 66, data: paintcolors },
        {name: 'Weapon', type: 10, data: [
            {id : -1, name: 'No Missiles', price: 0},
            {id : 0, name: 'Homing Missiles', price: 195000},
        ] },
        {name: 'Sell', type: 0, data: [] },
        {name: 'Close', type: 0, data: [] },
    ]

    modlist.forEach(element =>{
        let moditem = new NativeUI.UIMenuItem(element.name, "", "");
        hmodmenu.AddItem(moditem);
    })

        hmodmenu.Open()
        hmodmenu.ItemSelect.on((item, selectedItemIndex) => {
            if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < modlist.length) {
                let Selectedmod = modlist[selectedItemIndex];
                if(Selectedmod.name == 'Respray') {
                    hmodmenu.Close(true)
                    hcolormenu()
                } else if(Selectedmod.name == 'Livery') {
                    hmodmenu.Close()
                    hmodsmenu((Selectedmod.name.toUpperCase()), Selectedmod.type, Selectedmod.data)
                } else if(Selectedmod.name == 'Close') {
                    hmodmenu.Close(true)
                    if(pricetag) {
                        alt.clearEveryTick(pricetag);  
                    }
                } else if(Selectedmod.name == 'Sell') {
                    hmodmenu.Close(true)
                    alt.emit('sellaircraft')
                    if(pricetag) {
                        alt.clearEveryTick(pricetag);  
                    }
                } else if(Selectedmod.name == 'Bombs') {
                    if(bombplanes[model]) {
                        hmodmenu.Close(true)
                        acmodmenu((Selectedmod.name.toUpperCase()), Selectedmod.type, Selectedmod.data)
                    }
                } else if(Selectedmod.name == 'Countermeasures') {
                    if(flareplanes[model]) {
                        hmodmenu.Close(true)
                        acmodmenu((Selectedmod.name.toUpperCase()), Selectedmod.type, Selectedmod.data)
                    }
                }  else {
                    hmodmenu.Close(true)
                    acmodmenu((Selectedmod.name.toUpperCase()), Selectedmod.type, Selectedmod.data)
                }
                
            }
    })
}

function acmodmenu(maintitle, max, data) {
   // let model = native.getEntityModel(alt.Player.local.vehicle)
    let endef
    //let modcount = native.getNumVehicleMods(alt.Player.local.vehicle, max)
    //alt.log(maintitle, modcount)
    if(maintitle == 'BOMBS') {
        endef = bomb
    } else if(maintitle == 'COUNTERMEASURES') {
        endef = countermeasure
    } else {
    endef = native.getVehicleMod(alt.Player.local.vehicle.scriptID, max);
    }
    //alt.log(endef);
    let EngineMenu = new NativeUI.Menu(MenuText.MenuTitle, maintitle, MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar");
    EngineMenu.CloseableByUser = false;
    
    data.forEach(element => {
        let EngineModItem = new NativeUI.UIMenuItem(element.name, "");
        if(endef == element.id) {
            EngineModItem.RightBadge = 12;
        } else {
            EngineModItem.RightLabel = ('$ '+ element.price)
        }
        //if(modcount >= 1) {
            EngineMenu.AddItem(EngineModItem);
       // }
    });
    EngineMenu.AddItem(new NativeUI.UIMenuItem("Back", ""));
    
    EngineMenu.Open();
    EngineMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < data.length) {
            let SelectedEngine = data[selectedItemIndex];
            let mod = SelectedEngine.id;
            if(mod == endef) {} else {
                price = SelectedEngine.price;
                if(maintitle == 'BOMBS') {
                    bomb = mod
                } else if(maintitle == 'COUNTERMEASURES') {
                    countermeasure = mod
                } 
                alt.emitServer("vehmod", alt.Player.local.vehicle, max, SelectedEngine.id+1, 1);
                let mods = alt.setInterval(()=>{
                    native.playSound(-1, "Super_Mod_Garage_Upgrade_Car_Default", "0", true, 0 ,false)
                    
                    alt.emit('buy', price);
                    EngineMenu.Close()
                    saveplanemod()
                    let reopen = alt.setInterval(()=>{
                        acmodmenu(maintitle, max, data)  
                        alt.clearInterval(reopen);
                    }, 500);
                    alt.clearInterval(mods);
                }, 500);  
            }
    }
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
            EngineMenu.Close(true)
            hangarmod()
        }
    });
}

function hmodsmenu(maintitle, type, data) {
    let max = native.getNumVehicleMods(alt.Player.local.vehicle, type)
    let endef = (native.getVehicleMod(alt.Player.local.vehicle, type))+1;
    //alt.log(endef);
    let SpoilerMenu = new NativeUI.Menu(MenuText.MenuTitle, maintitle, MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar");
    SpoilerMenu.CloseableByUser = false;
    
    let SpoilerModItem = new NativeUI.UIMenuAutoListItem("Choose Type :", "", 0, max, endef, data);
    SpoilerMenu.AddItem(SpoilerModItem);
    SpoilerMenu.AddItem(new NativeUI.UIMenuItem("Purchase Mod", ""));
    SpoilerMenu.AddItem(new NativeUI.UIMenuItem("Cancel", ""));
    SpoilerMenu.Open();
    SpoilerMenu.AutoListChange.on((selectedItem, selectedItemIndex) =>{
        let mod = SpoilerModItem.SelectedValue;
        price = data[selectedItemIndex].price;
        pricelabel = '$ '+price;
        native.playSound(0, "Super_Mod_Garage_Upgrade_Car_Default", "0", true, 0 ,false)
        alt.emitServer("vehmod", alt.Player.local.vehicle, type, mod, 1);
    })
    
    SpoilerMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Mod") {
            pricelabel = ""
            saveplanemod()
            alt.emit('buy', price);
            SpoilerMenu.Close(true)
            hangarmod()
        }
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
            pricelabel = ""
            alt.emitServer("vehmod", alt.Player.local.vehicle, type, endef, 1);
            SpoilerMenu.Close(true)
            hangarmod()
        }
    });
}

function hcolormenu() {
const hColorMenu = new NativeUI.Menu(MenuText.MenuTitle, "RESPRAYS", MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar");

let Primary = new NativeUI.UIMenuItem("Primary Color", "");
//hColorMenu.AddItem(PrimaryItem);
let Secondary= new NativeUI.UIMenuItem("Secondary Color", "");
//hColorMenu.AddItem(SecondaryItem);

let HPrimary = new NativeUI.Menu(MenuText.MenuTitle, "PRIMARY COLORS", MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar");
hColorMenu.AddSubMenu(HPrimary, Primary)
let HSecondary = new NativeUI.Menu(MenuText.MenuTitle, "SECONDARY COLORS", MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar");
hColorMenu.AddSubMenu(HSecondary, Secondary)
hColorMenu.Open()
pcoloritem.forEach(element =>{
    let coltype = new NativeUI.UIMenuItem(element.name, "", pcoloritem);
    HPrimary.AddItem(coltype);
})
    HPrimary.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < pcoloritem.length) {
            let type = pcoloritem[selectedItemIndex];
            hColorMenu.Close(true);
            hmodcolor('PRIMARY COLORS', type.name, type.coltype, type.emit)

        }
})

scoloritem.forEach(element =>{
    let coltype = new NativeUI.UIMenuItem(element.name, "", scoloritem);
    HSecondary.AddItem(coltype);
})
    HSecondary.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < scoloritem.length) {
            let type = scoloritem[selectedItemIndex];
            hColorMenu.Close(true);
           hmodcolor('SECONDARY COLORS', type.name, type.coltype, type.emit)

        }
})

}

function hmodcolor(maintitle, paint, filter, emit) {
    let data = paintcolors.filter(function(color) {
        return color.type == filter
    })

let hColorsMenu = new NativeUI.Menu(MenuText.MenuTitle, maintitle, MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar");
hColorsMenu.CloseableByUser =false;
let vcolor;
let color = new NativeUI.UIMenuAutoListItem(paint, "", 0, data.length-1, 0, data)
hColorsMenu.AddItem(color);
hColorsMenu.Open()
hColorsMenu.AutoListChange.on((selectedItem, selectedItemIndex) =>{
    let mod = data[selectedItemIndex]
    vcolor = mod.id
    price = mod.price;
    pricelabel = "$ "+price;
    alt.emitServer(emit, alt.Player.local.vehicle, vcolor)
})
hColorsMenu.AddItem(new NativeUI.UIMenuItem("Purchase", ""))
hColorsMenu.AddItem(new NativeUI.UIMenuItem("Cancel", ""))

hColorsMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        if(emit == "vehcolor1") {
            color1 = vcolor;
        } else if(emit == "vehcolor2") {
            color2 = vcolor;
        } else if(emit == "vehcolor3") {
            perleascent = vcolor;
        }
        alt.emit('buy', price);
        saveplanemod()
        pricelabel = ""
        hColorsMenu.Close(true)
        hangarmod()

    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        alt.emitServer(emit, alt.Player.local.vehicle, color1)
        pricelabel = ""
        hColorsMenu.Close()
        hangarmod()
    }
});
}

function saveplanemod() {
    let veh = alt.Player.local.vehicle
    let vehdata = veh.getSyncedMeta('owner')
    let planedata = {
        id : vehdata.data.id,
        display : vehdata.data.display,
        model : vehdata.data.model,
        color1 : color1,
        color2 : color2,
        pearls : perleascent,
        armor : native.getVehicleMod(veh, 16),
        bomb : bomb,
        countermeasure : countermeasure,
        tank : native.getVehicleMod(veh, 3),
        engine : native.getVehicleMod(veh, 11),
        handling : native.getVehicleMod(veh, 12),
        livery : native.getVehicleMod(veh, 48),
        weapon : native.getVehicleMod(veh, 10),
    }
    
    alt.emit('saveplanemod', vehdata.data.id, planedata)
}
function vehilcename(msg, x, y, font, scale, wrap, r, g, b, a,) {
    let title = alt.everyTick(() => {
    drawtext(msg, x, y, font, scale, wrap, r, g, b, a,)
},);
let titlet = alt.setInterval(()=>{
    alt.clearEveryTick(title);
    alt.clearInterval(titlet);
},6000);
}

function drawtext(msg, x, y, font, scale, wrap, r, g, b, a,) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(font);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, wrap);
    native.setTextCentre(true);
    native.setTextColour(r,g,b,a);
    native.setTextJustification(2);
    native.setTextDropShadow(true);
    native.endTextCommandDisplayText(x, y, 0);
}

function handletext(text) {
	native.beginTextCommandDisplayHelp("STRING");
	native.addTextComponentSubstringKeyboardDisplay(text);
	native.endTextCommandDisplayHelp(0, 0, true, -1);
};

let camera;
let zpos = 0;
let fov = 90;
let startPosition;
let startCamPosition;

function lsccamera(pos) {
    //native.doScreenFadeOut(500)
    native.setEntityInvincible(alt.Player.local.vehicle, true)
    //createCamera(pos);
    startPosition = { ...alt.Player.local.vehicle.pos };
    if (!camera) {
      fov = 50;
      camera = native.createCamWithParams(
          'DEFAULT_SCRIPTED_CAMERA',
          pos.x, pos.y, pos.z+0.3,0,0,0,fov, true, 0);

      native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z);
      //native.pointCamAtEntity(camera, alt.Player.local.vehicle,0,0,1,1)
      native.setCamActive(camera, true);
      native.renderScriptCams(true, false, 1, true, false, 0);
      native.doScreenFadeIn(2000);
    }
    let camtime = alt.setInterval(()=>{
        destroyCamera();
        clearInterval(camtime);
        native.setEntityInvincible(alt.Player.local.vehicle, false)
    }, 5000);
}



function createCamera(pos) {
  startPosition = { ...alt.Player.local.vehicle.pos };
  if (!camera) {
      fov = 50;
      native.setFollowVehicleCamViewMode(0)
      camera = native.createCamWithParams(
          'DEFAULT_ANIMATED_CAMERA', pos.x, pos.y, pos.z+0.3,
          0,
          0,
          0,
          fov,
          true,
          0
      );

      native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z);
      native.setCamActive(camera, true);
      native.renderScriptCams(true, false, 1, true, false, 0);
  }
  
}

function destroyCamera() {

  if (camera) {
      camera = null;
  }

  native.destroyAllCams(true);
  native.renderScriptCams(false, 0, 1000, false, false, 0);
  //native.setFollowVehicleCamViewMode(0)
  //native.pointCamAtEntity()
  zpos = 0;
  fov = 90;
  startPosition = { ...alt.Player.local.pos };
  startCamPosition = native.getEntityForwardVector(alt.Player.local.scriptID);
}

function setFov(value) {
  fov = value;

  native.setCamFov(camera, fov);
  native.setCamActive(camera, true);
  native.renderScriptCams(true, false, 0, true, false, 0);
}

function setZPos(value) {
  zpos = value;

  native.setCamCoord(camera, startCamPosition.x, startCamPosition.y, startCamPosition.z + zpos);
  native.pointCamAtCoord(camera, startPosition.x, startPosition.y, startPosition.z + zpos);
  native.setCamActive(camera, true);
  native.renderScriptCams(true, false, 0, true, false, 0);
}