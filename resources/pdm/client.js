import alt, { deleteMeta, getMeta, loadYtyp, Player, setMeta } from 'alt-client';
import * as native from 'natives';
import { VehicleData } from './vehicles.js';
import * as NativeUI from './NativeUI/NativeUi.js';
import * as game from 'natives';

native.requestIpl("reh_simeonfix")
native.requestIpl("shr_int")
native.activateInteriorEntitySet(7170, "csr_beforemission");

alt.onServer("freeroam:spawned", () => {
//setMeta('testdrive', 0);
//setMeta('renttime', 0);
//setMeta('sellcar', 0);
//setMeta('sellcooldown', 0);
setMeta('vehiclerequest', 0);
});

let money;
let sellcooldown = 0, sellcar = 0, testdrive = 0, renttime = 0, planespawnpos, currentplane, currentmodel, planemenu = 0, spawned = 0, rotate = 0

alt.setInterval(()=>{
    for (let veh of alt.Vehicle.all) {
        if (veh.scriptID > 0 && 
            veh.hasSyncedMeta('heading') &&
            typeof veh.yawSet === "undefined"
            ) {
                let heading = veh.getSyncedMeta("heading")
    
                if (Math.abs(heading - native.getEntityHeading(veh.scriptID)) > 2) {
                    native.setEntityHeading(veh.scriptID, heading);
                    
                } else {
                    veh.yawSet = true;
                    veh.deleteMeta('heading');
                    native.setVehicleOnGroundProperly(veh, 5);
                    //native.freezeEntityPosition(veh, true);
                }
            }
        }
}, 3000);

let testcoold = 'Test Drive Available'
let buyedcar;
let carprice;
let model;
let vehdisplay;
let TestMenu;

function pdmdealer() {
    native.setPedHelmet(alt.Player.local.scriptID, false);
    setMeta('pdm', 1); 
    //alt.emit('disableweapon', true);
    let pdm = alt.everyTick(()=>{
            native.blockWeaponWheelThisFrame();
            native.disablePlayerFiring(alt.Player.local.scriptID, true);
            drawtext(testcoold, 0.5, 0.95, 0, 0.5, 0.9, 255,255,255,255);
            let seat = native.isPedInAnyVehicle(alt.Player.local.scriptID, false);
            if(seat == true) {
                    let testmenu = getMeta('pdm');
                    if(testmenu == 1) {
                        setMeta('pdm', 0);
                        native.freezeEntityPosition(alt.Player.local.vehicle.scriptID, true);
                    //native.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, false, true,true);  
                        let testd = alt.setInterval(()=>{
                        testdrivemenu();
                        alt.clearInterval(testd);
                    }, 1000);
                    } else {}       
        } 
            let pdmrange = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z,-41.8290, -1097.8564,26.4224, true);
            if(pdmrange > 10) {
                alt.clearEveryTick(pdm);
                deleteMeta('pdm');
                native.setPedHelmet(alt.Player.local.scriptID, true);
                //alt.emit('disableweapon', false);
            }})
}

    function showpdmmenu(car, price, type){
        native.drawRect(0.62, 0.382, 0.25, 0.17, 10, 10, 10, 180, false);
        native.drawRect(0.51, 0.443, 0.015, 0.025, 255, 255, 255, 230, false);
        native.drawRect(0.51, 0.413, 0.015, 0.025, 255, 255, 255, 230, false);
        drawcarmenu(type + ' ' + car, 0.5, 0.3, 1, 1, 255, 255, 255, 205);
        drawcarmenu('Price $' + price, 0.5, 0.358, 0, 0.5, 100, 200, 255, 205);
        drawcarmenu('~l~ F ~l~  ~w~Test Drive~w~', 0.5, 0.426, 0, 0.4, 255, 255, 255, 205);
        drawcarmenu('~l~ E ~l~  ~w~Purchase~w~', 0.5, 0.396, 0, 0.4, 255, 255, 255, 235);
    }
    
    function drawcarmenu(msg, x, y, font, scale, r, g, b, a,) {

        native.beginTextCommandDisplayText('STRING');
        native.addTextComponentSubstringPlayerName(msg);
        native.setTextFont(font);
        native.setTextScale(1, scale);
        native.setTextJustification(1);
        native.setTextWrap(0.0, 1.0);
        native.setTextCentre(false);
        native.setTextDropShadow(true);
        native.setTextColour(r,g,b,a);
        native.endTextCommandDisplayText(x, y, 0);
      }

const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    TitleScale: 0.8,
    TitleFont: 4,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
    Color: new NativeUI.Color(116,155,205,255),
}

const EventNames = {
    ToggleMenu: "PDM:Menu",
}

const MenuText = {
    MenuTitle: '',
    MenuSubTitle: "",
    sprite: 'shopui_title_premium_deluxe_motorsport',
}

const PDMMenu = new NativeUI.Menu(MenuText.MenuTitle, '~b~CATEGORIES~b~', MenuSettings.Point, MenuText.sprite, MenuText.sprite);
PDMMenu.Visible = false;
PDMMenu.GetTitle().Scale = MenuSettings.TitleScale,
PDMMenu.GetTitle().Font = MenuSettings.TitleFont;
PDMMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
PDMMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;

const vsell = VehicleData.filter(function(element) {
    return element.price >= 200000;
})

const vsella = vsell.filter(function(element) {
    return element.sell == true;
})

alt.on('testdrive', ()=>{
if(alt.Player.local.vehicle.getSyncedMeta('rentcar') == 1) {
    testdrivemenu()
}   
})

function testdrivemenu() {
    let testcar = alt.Player.local.vehicle.scriptID;
    native.freezeEntityPosition(testcar, true);
   //let testd = getMeta('testdrive');
    let vehname = native.getFilenameForAudioConversation(native.getDisplayNameFromVehicleModel(native.getEntityModel(alt.Player.local.vehicle.scriptID)));
    let brand = native.getFilenameForAudioConversation(native.getMakeNameFromVehicleModel(native.getEntityModel(alt.Player.local.vehicle.scriptID)))
    let data = VehicleData.filter(function(vehicle){
        return vehicle.display == vehname;
    })
    //alt.log(brand, vehname)
    for(let i in data){
    carprice = data[i].price; 
    }
    let menutitle = brand+' '+vehname;
    vehdisplay = vehname
    TestMenu = new NativeUI.Menu(MenuText.MenuTitle, menutitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
    TestMenu.Visible = false;
    TestMenu.CloseableByUser = true;
    TestMenu.GetTitle().Scale = MenuSettings.TitleScale;
    TestMenu.GetTitle().Font = MenuSettings.TitleFont;
    
    let TestdriveItem = new NativeUI.UIMenuItem("Test Drive", "");
    if(testdrive == 1) {
        TestdriveItem.RightLabel = '~b~(cooldown)~b~'
    } 
    TestMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Test Drive") {
                //let testd = getMeta('testdrive');
                if(testdrive == 0){
                    TestMenu.Close(true);
                
               // testcar.deleteMeta('pdmmenu');
                native.doScreenFadeOut(2000)
                let coord = native.getEntityCoords(testcar, false)
                alt.emitServer('pdmcreate', {x:coord.x, y:coord.y, z:coord.z, h:120}, native.getVehicleClass(testcar));
                let test = alt.setInterval(()=>{
                native.setEntityCoords(testcar, -59.1759, -1076.6713, 26.4398, 1,0,0,1);
                native.setEntityHeading(testcar, 69.5324935913086)
                native.setPedIntoVehicle(alt.Player.local.scriptID, testcar, -1);
                native.freezeEntityPosition(alt.Player.local.vehicle.scriptID, false);
                //native.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, true, false,false);
                //setMeta('testdrive', 1);
                testdrive = 1
                testcoold = 'Test Drive Cooldown'
                alt.clearInterval(test);
                native.doScreenFadeIn(2500);
            }, 3000);
            let coold = alt.setInterval(()=>{
                //setMeta('testdrive', 0);
                testdrive = 0
                testcoold = 'Test Drive Available'
                
                if(alt.Player.local.vehicle) {
                    if(alt.Player.local.vehicle.scriptID == testcar) {
                        native.taskLeaveVehicle(alt.Player.local.scriptID, testcar, 0);
                        alt.emit('notif', "Test Drive Time has ended")
                        native.setVehicleDoorsLocked(testcar, 2);
                        alt.emitServer('removecar', testcar);
                    }
                }
                alt.clearInterval(coold);
            }, 60000*15);
            } else if(testdrive == 1){
           // }
         } else {}
        }
        })

        let DoorItem = new NativeUI.UIMenuItem("Vehicle Door", "");
        TestMenu.AddItem(DoorItem)
        TestMenu.AddItem(TestdriveItem)
        let DoorMenu = new NativeUI.Menu("Vehicle Door Menu", "~b~DOOR OPTIONS~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
        TestMenu.AddSubMenu(DoorMenu, DoorItem);
        
        DoorMenu.AddItem(new NativeUI.UIMenuItem("Open Front Right", ""));
        DoorMenu.AddItem(new NativeUI.UIMenuItem("Open Front Left", ""));
        DoorMenu.AddItem(new NativeUI.UIMenuItem("Open Back Right", ""));
        DoorMenu.AddItem(new NativeUI.UIMenuItem("Open Back Left", ""));
        DoorMenu.AddItem(new NativeUI.UIMenuItem("Open Bonnet", ""));
        DoorMenu.AddItem(new NativeUI.UIMenuItem("Open Cargo", ""));
        DoorMenu.AddItem(new NativeUI.UIMenuItem("Open All Doors", ""));
        DoorMenu.AddItem(new NativeUI.UIMenuItem("Close All Doors", ""));
        
        DoorMenu.ItemSelect.on((item, selectedItemIndex) => {
            let veh = alt.Player.local.vehicle.scriptID;
            if (item instanceof NativeUI.UIMenuItem && item.Text == "Open Front Right") {
                dooroption(veh, 1)
            }
            if (item instanceof NativeUI.UIMenuItem && item.Text == "Open Front Left") {
                dooroption(veh, 0)
            }
            if (item instanceof NativeUI.UIMenuItem && item.Text == "Open Back Right") {
                dooroption(veh, 3)
            }
            if (item instanceof NativeUI.UIMenuItem && item.Text == "Open Back Left") {
                dooroption(veh, 2)
            }
            if (item instanceof NativeUI.UIMenuItem && item.Text == "Open Bonnet") {
                dooroption(veh, 4)
            }
            if (item instanceof NativeUI.UIMenuItem && item.Text == "Open Cargo") {
                dooroption(veh, 5)
            }
            if (item instanceof NativeUI.UIMenuItem && item.Text == "Open All Doors") {
                dooroption(veh, 0); dooroption(veh, 1); dooroption(veh, 2); dooroption(veh, 3); dooroption(veh, 4); dooroption(veh, 5);
            }
            if (item instanceof NativeUI.UIMenuItem && item.Text == "Close All Doors") {
                native.setVehicleDoorsShut(veh, false);
                native.playVehicleDoorCloseSound(veh, 0);
            }
        });
        
    let BuyItem = new NativeUI.UIMenuItem("Purchase Vehicle", "");
    BuyItem.RightLabel = '$ '+carprice;
    TestMenu.AddItem(BuyItem)
    TestMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Vehicle") {
            money = getMeta('money');
            if((money.cash + money.bank) > carprice){
                buyedcar = alt.Player.local.vehicle
                let garage = getMeta('garage');
                if(garage > 0) {
                      TestMenu.Close(true)
                        GarageMenu.Open()
                        
                } else { handletext('GARAGE NOT AVAILABLE!')}
    } else { handletext('NOT ENOUGH MONEY!') }
    }
    });
    TestMenu.Open()

    alt.on('pdmtestclose', ()=>{
        if(TestMenu.Visible) {
            TestMenu.Close();
            let testmenu = getMeta('pdm');
            if(testmenu == 0) {
                setMeta('pdm', 1);
            }
        }
    })
}

const vehicles = [
    {class: 'COMPACT', name: 'Compacts'},
    {class: 'COUPE', name: 'Coupes'},
    {class: 'MUSCLE', name: 'Muscles'},
    {class: 'OFF-ROAD', name: 'Off-Roads'},
    {class: 'SEDAN', name: 'Sedans'},
    {class: 'SPORT', name: "Sports"},
    {class: 'SPORT CLASSIC', name: 'Sport Classics'},
    {class: 'SUPER', name: 'Super'},
    {class: 'SUV', name: 'SUVs'},
    {class: 'MOTORCYCLE', name: 'Motorcycles'},
    //{cclass: 'CYCLE', cars: bike},
    //{cclass: 'OPEN-WHEEL', name},
    //{cclass: 'GO-KART', cars: bomcar},
    //{cclass: 'CADDY', cars: caddy},
]

vehicles.forEach(element =>{
    let vehicleitem = new NativeUI.UIMenuItem(element.name, "", vehicles.length);
    PDMMenu.AddItem(vehicleitem);
})

PDMMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < vehicles.length) {
        let Selected = vehicles[selectedItemIndex];
        PDMMenu.Close();
        vehiclemenu(Selected.class);
    }
});

function vehiclemenu(title) {
    
    let CarMenu = new NativeUI.Menu(MenuText.MenuTitle, title, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
    CarMenu.Visible = false;
    CarMenu.GetTitle().Scale = MenuSettings.TitleScale;
    
    const car = vsella.filter(function(vehicle) {
        return vehicle.class == title;
    });
    
    car.forEach(element => {
        let carMenuItem = new NativeUI.UIMenuItem(element.display, "");
        carMenuItem.RightLabel = ('$ '+ element.price)
        CarMenu.AddItem(carMenuItem);
    });
    
    CarMenu.Open()
    CarMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < car.length) {
            
            let SelectedVeh = car[selectedItemIndex];
            let vehId = SelectedVeh.name;
            spawnveh(vehId,SelectedVeh.display,SelectedVeh.price);
        }
    });

}

let selectedgarage;
let capacity;
let garagedata;

let garagepoint = new NativeUI.Point(50, -50)
const GarageMenu = new NativeUI.Menu(MenuText.MenuTitle, "~b~PLAYER GARAGES~b~", garagepoint, MenuText.sprite, MenuText.sprite);
GarageMenu.Visible = false;
GarageMenu.SetNoBannerType();  
GarageMenu.CloseableByUser = false;

const garlist = [
    {name: 'Garage 1', garnumber: 'garage1'},
    {name: 'Garage 2', garnumber: 'garage2'},
    {name: 'Garage 3', garnumber: 'garage3'},
    {name: 'Garage 4', garnumber: 'garage4'},
    {name: 'Garage 5', garnumber: 'garage5'},
]

garlist.forEach(element=>{
    let garlistitem = new NativeUI.UIMenuItem(element.name,"", garlist)
    GarageMenu.AddItem(garlistitem);
})
    GarageMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < garlist.length) {
            let garselected = garlist[selectedItemIndex]
            let garage = getMeta(garselected.garnumber);
            if(garage === undefined) {
                handletext('GARAGE UNAVAILABLE!')
            }
            else {
            let gar = getMeta(garage.nama);
                selectedgarage = garselected.garnumber;
                capacity = gar.slot;
                garagedata = gar.data;
                GarageMenu.Close();
                BuyMenu.Close();
                SlotMenu.Open();
                garageselected(selectedgarage, garage.capacity);
}}
});


let slots;

let slotpoint = new NativeUI.Point(50, -50)
const SlotMenu = new NativeUI.Menu(MenuText.MenuTitle, "~b~GARAGE SLOT~b~", slotpoint, MenuText.sprite, MenuText.sprite);
SlotMenu.Visible = false;
SlotMenu.CloseableByUser = false;
SlotMenu.SetNoBannerType();  

const garslots = [
    {name: '', meta:'slot1', slot: 0},
    {name: '', meta:'slot2', slot: 1},
    {name: '', meta:'slot3', slot: 2},
    {name: '', meta:'slot4', slot: 3},
    {name: '', meta:'slot5', slot: 4},
    {name: '', meta:'slot6', slot: 5},
    {name: '', meta:'slot7', slot: 6},
    {name: '', meta:'slot8', slot: 7},
    {name: '', meta:'slot9', slot: 8},
    {name: '', meta:'slot10', slot: 9},
]

garslots.forEach(element => {
    let SlotMenuItem = new NativeUI.UIMenuItem(element.name, "", garslots.length);
    SlotMenuItem.HighlightedBackColor = MenuSettings.Color;
    SlotMenu.AddItem(SlotMenuItem);
});

SlotMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < garslots.length) {    
        let selectedslot = garslots[selectedItemIndex];
        let slot = selectedgarage+selectedslot.meta;
        let garslot = getMeta(slot);
        alt.clearEveryTick(slots);
        let spawn = getMeta('vehiclerequest');
        if(spawn < 1) {
        if(garslot.slot == 0) {
            let playercar = getMeta('personalvehicle');
            if(playercar > 0) {
            alt.emitServer('reqreturnvehicle');
            } else {}
            SlotMenu.Close(true);
            alt.clearEveryTick(slots);
            buycar(garagedata, selectedgarage, slot, model, vehdisplay, selectedslot.slot);
            
        } else {
            handletext('THIS SLOT ALREADY USED!')
        }
    } else if(spawn == 1) {
        if(garslot.slot == 0) {}
        else {
        let pos = alt.Player.local.pos;
        let roadpos = native.getClosestRoad(pos.x, pos.y, pos.z, 1,0, pos, pos, 1,0,0, true);
        let h = native.getHeadingFromVector2d((roadpos[1].x - roadpos[2].x), (roadpos[1].y - roadpos[2].y));
        let roadpos2 = native.getRoadBoundaryUsingHeading(roadpos[1].x, roadpos[1].y, roadpos[1].z, h, roadpos[1]);
        let spawnpos = {x: roadpos2[1].x, y: roadpos2[1].y, z: roadpos2[1].z, h}
        SlotMenu.Close();
        //alt.clearEveryTick(slots);
        alt.emit('spawnvehicle', slot, spawnpos);
        setMeta('vehiclerequest', 0);
        }
    } else if(spawn == 2) {
        if(garslot.slot == 0 ) {
            SlotMenu.Close();
           // alt.clearEveryTick(slots);
            alt.emit('movegarage', selectedslot.slot, selectedgarage);
        } else {
            handletext('THIS SLOT ALREADY USED!')
        }
        setMeta('vehiclerequest', 0);
    }
}
})

function garageselected(selectedgarage, capacity) {

        let slot1 = getMeta(selectedgarage+garslots[0].meta);
        let slot2 = getMeta(selectedgarage+garslots[1].meta);
        let slot3 = getMeta(selectedgarage+garslots[2].meta);
        let slot4 = getMeta(selectedgarage+garslots[3].meta);
        let slot5 = getMeta(selectedgarage+garslots[4].meta);
        let slot6 = getMeta(selectedgarage+garslots[5].meta);
        let slot7 = getMeta(selectedgarage+garslots[6].meta);
        let slot8 = getMeta(selectedgarage+garslots[7].meta);
        let slot9 = getMeta(selectedgarage+garslots[8].meta);
        let slot10 = getMeta(selectedgarage+garslots[9].meta);
        showslotmenu(slot1.vehicle, slot2.vehicle, slot3.vehicle, slot4.vehicle,slot5.vehicle,slot6.vehicle,
            slot7.vehicle,slot8.vehicle,slot9.vehicle,slot10.vehicle, capacity)
}

function showslotmenu(s1,s2,s3,s4,s5,s6,s7,s8,s9,s10, capacity) {
    slots = alt.everyTick(()=>{
        if(capacity == 2) {
            drawcarmenu('Slot 1 : '+s1, 0.036, 0.087, 0, 0.37, 255,255,255,200);
            drawcarmenu('Slot 2 : '+s2, 0.036, 0.123, 0, 0.37, 255,255,255,200);
        } else if(capacity == 6) {
        drawcarmenu('Slot 1 : '+s1, 0.036, 0.087, 0, 0.37, 255,255,255,200);
        drawcarmenu('Slot 2 : '+s2, 0.036, 0.123, 0, 0.37, 255,255,255,200);
        drawcarmenu('Slot 3 : '+s3, 0.036, 0.158, 0, 0.37, 255,255,255,200);
        drawcarmenu('Slot 4 : '+s4, 0.036, 0.193, 0, 0.37, 255,255,255,200);
        drawcarmenu('Slot 5 : '+s5, 0.036, 0.229, 0, 0.37, 255,255,255,200);
        drawcarmenu('Slot 6 : '+s6, 0.036, 0.265, 0, 0.37, 255,255,255,200);
        } else if(capacity == 10) {
            drawcarmenu('Slot 1 : '+s1, 0.036, 0.087, 0, 0.37, 255,255,255,200);
            drawcarmenu('Slot 2 : '+s2, 0.036, 0.123, 0, 0.37, 255,255,255,200);
            drawcarmenu('Slot 3 : '+s3, 0.036, 0.158, 0, 0.37, 255,255,255,200);
            drawcarmenu('Slot 4 : '+s4, 0.036, 0.193, 0, 0.37, 255,255,255,200);
            drawcarmenu('Slot 5 : '+s5, 0.036, 0.229, 0, 0.37, 255,255,255,200);
            drawcarmenu('Slot 6 : '+s6, 0.036, 0.265, 0, 0.37, 255,255,255,200);
            drawcarmenu('Slot 7 : '+s7, 0.036, 0.3005, 0, 0.37, 255,255,255,200);
            drawcarmenu('Slot 8 : '+s8, 0.036, 0.336, 0, 0.37, 255,255,255,200);
            drawcarmenu('Slot 9 : '+s9, 0.036, 0.3715, 0, 0.37, 255,255,255,200);
            drawcarmenu('Slot 10 : '+s10, 0.036, 0.407, 0, 0.37, 255,255,255,200);
        }
        
    })
}

alt.on('garagemenu', (garageid, garcapacity, type)=>{
    setMeta('vehiclerequest', type);
    selectedgarage = garageid;
    SlotMenu.Open();
    garageselected(garageid, garcapacity);
})

alt.onServer('returnvehicle', (veh, vehdata)=>{
    let pos = getMeta(vehdata);
    let ped = native.createPedInsideVehicle(veh, 4, 0xF7A74139, -1, false, false);
    native.taskVehicleDriveToCoord(ped, veh, pos.x, pos.y, pos.z, 60, 0, (native.getEntityModel(veh)), 4, 3, 0);
})

function buycar(garage, garnumber, index, model, display, slot) {
    GarageMenu.Close(true);
    BuyMenu.Close(true);
let drive = alt.setInterval(()=>{
    native.setEntityCoords(buyedcar, -59.1759, -1076.6713, 26.4398, 1,0,0,1);
    native.setEntityHeading(buyedcar, 69.5324935913086)
    native.setPedIntoVehicle(alt.Player.local.scriptID, buyedcar, -1);
    native.freezeEntityPosition(buyedcar, false);
    alt.emitServer('carpurchased', model, carprice, garnumber, garage.nama, garage.capacity, index, display, slot);
    buyinfo('~y~VEHICLE PURCHASED~y~', 'CONGRATS YOU OWN THIS CAR', carprice);
    native.doScreenFadeIn(2000);
    alt.clearInterval(drive);
}, 3000);
let testscreen = alt.setInterval(()=>{
    native.doScreenFadeOut(1500)
    alt.clearInterval(testscreen);
}, 1000);
    
}

let CancelItem = new NativeUI.UIMenuItem("~b~Cancel~b~", "");

GarageMenu.AddItem(CancelItem)
GarageMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "~b~Cancel~b~") {
      GarageMenu.Close();
      BuyMenu.Close();
}});




alt.onServer('pdmcar', (car)=>{
    buyedcar = car;
    let head = alt.setInterval(()=>{
        native.setEntityHeading(car, 120);
        native.freezeEntityPosition(car, true);
        if((native.getEntityHeading(car))==120){
        alt.clearInterval(head);
        }
    }, 200);
    
});

const colors = [
    150,135,134,89,55,70,41,3,0
]

let BuyMenu = new NativeUI.Menu(MenuText.MenuTitle, "~b~PURCHASE VEHICLE ?~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
BuyMenu.Visible = false;
BuyMenu.CloseableByUser = false;
BuyMenu.GetTitle().Scale = MenuSettings.TitleScale;
BuyMenu.GetTitle().Font = MenuSettings.TitleFont;

let ColorItem = new NativeUI.UIMenuAutoListItem("Choose Color", "", 0, 7, 0, colors);

BuyMenu.AddItem(ColorItem);

BuyMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let color = colors[selectedItemIndex];
    alt.emitServer("pdmcolor", color);
});

let BuyMenuItem = new NativeUI.UIMenuItem("Purchase Vehicle", "");
BuyMenu.AddItem(BuyMenuItem)
BuyMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Vehicle") {
        money = getMeta('money');
        if((money.cash + money.bank) > carprice){
            let garage = getMeta('garage');
            if(garage > 0) {
                    GarageMenu.Open()
                    BuyMenu.Close()
            } else { handletext('GARAGE NOT AVAILABLE!')}
} else { handletext('NOT ENOUGH MONEY!') }
}
});

let NoBuyItem = new NativeUI.UIMenuItem("Cancel", "");
BuyMenu.AddItem(NoBuyItem)
BuyMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
      BuyMenu.Close();
      
}});


function dooroption(veh, door) {
    native.setVehicleDoorOpen(veh, door, false, false);
    native.playVehicleDoorOpenSound(veh, door);
}


function spawnveh(vehId, disp, price, ) {
    carprice = price;
    PDMMenu.Close(true);
    BuyMenu.Open();
    model = vehId;
    vehdisplay = disp;
    alt.emitServer("pdmspawn", vehId);
}

alt.onServer('pdminfo', (text)=>{
    handletext(text);
});

alt.onServer('openpdmmenu', ()=>{
    PDMMenu.Open();
});

alt.on('pdmclose', ()=>{
    if(PDMMenu.Visible) {
        PDMMenu.Close(true);
        
        setMeta('pdmmenu', 0);
    }
    alt.emitServer('pdmmenuclose');
});


const RentalMenu = new NativeUI.Menu(MenuText.MenuTitle, '~b~RENT A VEHICLE~b~', MenuSettings.Point, 'shopui_title_ie_modgarage', 'shopui_title_ie_modgarage');
RentalMenu.Visible = false;
RentalMenu.GetTitle().Scale = MenuSettings.TitleScale,
RentalMenu.GetTitle().Font = MenuSettings.TitleFont;
RentalMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
RentalMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;

const rentcar = VehicleData.filter(function(vehicle) {
    return vehicle.sell == true;
});

const rentcars = rentcar.filter(function(vehicle) {
    return vehicle.price > 200000;
})

let rentprice;
rentcars.forEach(element => {

    let rentalMenuItem = new NativeUI.UIMenuItem(element.display+'('+element.class+')', "You can only rent a car once per 15 minutes");
    if(element.price > 1000000) {
        rentprice = 20000;
    } else rentprice = 10000;
    rentalMenuItem.RightLabel = ('$ '+ rentprice);
   RentalMenu.AddItem(rentalMenuItem);
});

RentalMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < rentcars.length) {
        
        let SelectedVeh = rentcars[selectedItemIndex];
        let vehId = SelectedVeh.name;
       // let renttime = getMeta('renttime');
        if(renttime == 0) {
        alt.emitServer('rentcar', vehId)
        RentalMenu.Close(true);
        } else {}
    }
});


alt.onServer('openrentalmenu', ()=>{
    //let renttime = getMeta('renttime');
    if(renttime == 0) {
        RentalMenu.Open();
    } else {}
});

alt.onServer('rentalmenuclose', ()=>{
    //setMeta('rental', 0);
    //rental = 0
    if(RentalMenu.Visible) {
        RentalMenu.Close(true);
    }
});

alt.onServer('headrentcar', (veh, head)=>{
    //setMeta('renttime', 1);
    renttime = 1
    let renthead = alt.setInterval(()=>{
        native.setEntityHeading(veh, head);
        alt.clearInterval(renthead);
    }, 300);  
    let time = alt.setInterval(()=>{
        //setMeta('renttime', 0);
        renttime = 0
        alt.clearInterval(time);
    }, 60000*15);
});

let sellprice;
let pdmped = 0;

alt.onServer('startshop', pdmcount)

function pdmcount() {
let count = alt.setInterval(()=>{
    let pos = alt.Player.local.pos;
    if(pos.x > -500 && pos.x < 100 && pos.y > -1300 && pos.y < -800) {
    let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, -221.5570, -1162.1600, 23.0241, true);
    let dist2 = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, -41.8290, -1097.8564,26.4224, true);
    if(dist <= 30) {
        alt.emit('marker', 1, -221.5570, -1162.1600, 23.0241-1,4,4,1.1,249,0,50,80);
    }
    if(dist2 <= 50) {
        if(pdmped == 0) {
            pdmped += 2;
            alt.emit('pdmped');
        } else {}
    } else {
        pdmped = 0;
    }
    if(dist2 <= 9) {
        setMeta('pdm', 1);
        //pdmdealer()
    } else {
        setMeta('pdm', 0)
    }
    if(dist <= 4) {
        //let sell = getMeta('sellcar');
        if(sellcar == 0) {
        //setMeta('sellcar', 2);
        sellcar = 2
        //let sellcooldown = getMeta('sellcooldown');
        let vehicle = alt.Player.local.vehicle;
        if(vehicle){
            let iscop = native.isPedInAnyPoliceVehicle(alt.Player.local.scriptID);
            if(iscop == true) {
                handletext('CANNOT SELL POLICE CAR')
            } else {
        if(sellcooldown == 0) {
            let vehstatus = vehicle.getSyncedMeta('rentcar');
            if(vehstatus == 1 || vehicle.hasSyncedMeta('racecar')) {
                handletext("CANNOT SELL THIS VEHICLE!");
            } else {
            let vehname = native.getFilenameForAudioConversation(native.getDisplayNameFromVehicleModel(native.getEntityModel(vehicle)));
            let vehprice = VehicleData.filter(function(vehicle) {
            return vehicle.display == vehname;
        });
        for(let i in vehprice) {
            sellprice = Math.round(vehprice[i].price*0.7);
            } 
        if(vehicle.hasSyncedMeta('owner')) {
        let vehdata = vehicle.getSyncedMeta('owner');
        if(vehdata.owner == alt.Player.local.id) {
        
            handletext("~INPUT_PICKUP~ Sell this Vehicle for $ "+sellprice);
            sellcar = 1
           // setMeta('sellcar', 1);
        } else {
                handletext("THIS VEHICLE NOT BELONG TO YOU!");
            }
        } else {
        let price;
        if(sellprice >= 200000) {
            sellprice = 15000
        } else { sellprice = 0.05*sellprice}
        handletext("~INPUT_PICKUP~ Sell this Vehicle for $ "+sellprice);
        sellcar = 1
        //setMeta('sellcar', 1);
    }
        }
    } else {
            handletext('CANNOT SELL VEHILCE RIGHT NOW!')
        }}
    }else if(!vehicle){
        handletext("DRIVE A VEHICLE!")
    }
    } else {}

} else {
    sellcar = 0
   // setMeta('sellcar', 0);
}
    }
}, 1000)

alt.onServer('stopshop', ()=>{
    if(count > 0) {
        alt.clearInterval(count);
        count = 0
    }
})
}

alt.on('keydown', (key) => {
    if(key == 'E'.charCodeAt(0)){
        let pdmmenu = getMeta('pdmmenu');
        let rental = getMeta('rentalmenu');
            if(pdmmenu == 1){
                alt.emitServer('pdmmenuopen');  
                money = getMeta('money'); 
    } 
    if(rental == 1) {
        if(RentalMenu.visible) {}
        else {
        money = getMeta('money'); 
        if((money.cash + money.bank) > 30000) {
            //let renttime = getMeta('renttime');
            if(renttime == 0) {
            RentalMenu.Open()
            } else handletext('RENT NOT AVAILABLE!')
        } else if((money.cash+money.bank) < 20000) {
            handletext('NOT ENOUGH MONEY!')
        } }
    } 
    if(sellcar == 1) {
         alt.emitServer('sellcar', sellprice);
    }
}});

alt.onServer('sellingcar', (veh)=>{
    //setMeta('sellcar', 0);
    //setMeta('sellcooldown', 1);
    sellcar = 0
    sellcooldown = 1
    buyinfo('~y~SELL SUCCESS~y~', 'Your vehicle has been sold!', 0)

    native.taskLeaveVehicle(alt.Player.local.scriptID, veh, 0);
    native.freezeEntityPosition(veh, true);
    native.setVehicleDoorsLocked(veh, 3);

    let down = alt.setInterval(()=>{
        //setMeta('sellcooldown', 0);
        sellcooldown = 0
        alt.clearInterval(down);
    }, 60000 * 30);

});

function buyinfo(title, text, price){
    let buyinfo = alt.everyTick(()=>{
        native.playSound(0, "PROPERTY_PURCHASE", "HUD_AWARDS", true, 0 ,false)
        drawtext(title,0.5,0.25,7,1.6,1.0,255,0,0,255);
        drawtext(text,0.5,0.35,4,0.7,0.9,255, 255, 255,255);
      })
      let info = alt.setInterval(()=>{
        alt.emit('buy', (price))
        alt.clearEveryTick(buyinfo);
        alt.clearInterval(info);
      }, 5000)
}



let planes = vsella.filter(type =>{
    return type.type == 'AIRCRAFT'
})

const acmenu = new NativeUI.Menu("", '~b~SELECT AIRCRAFT~b~', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
acmenu.Visible = false;
acmenu.GetTitle().Scale = MenuSettings.TitleScale,
acmenu.GetTitle().Font = MenuSettings.TitleFont;
acmenu.GetTitle().DropShadow = MenuSettings.DropShadow;
acmenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;

planes.forEach(element =>{
    let aclist = new NativeUI.UIMenuItem(element.display, "Pres 'ENTER' to Purchase", planes);
    acmenu.AddItem(aclist);
    aclist.RightLabel = '$ '+element.price;

})
    acmenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < planes.length) {
            spawned = 0
            let SelectedVeh = planes[selectedItemIndex];
            let model = alt.hash(SelectedVeh.name)
            if(currentmodel == model) {
                acmenu.Close(true);
                alt.log(model)
                //if(planemenu == 0) {
                  //  planemenu = 1
                    planebuy(SelectedVeh.display, SelectedVeh.name, SelectedVeh.price, SelectedVeh.seats, SelectedVeh.class)
                //}
                

            } else {
                spawn(SelectedVeh.name, SelectedVeh.display)
                currentmodel = model
            }
        }
})

alt.on('aircraftbuy', (pos)=>{
    if(acmenu.Visible) { } else {
        planespawnpos = pos
        acmenu.Open()
    }
})

alt.onServer('rotateplane', (plane)=>{
    alt.log(plane)
    native.setEntityAlpha(plane, 100, false)
    native.setEntityCollision(plane, false, false)
    //native.setVehicleGravity(plane, false)
let h = native.getEntityHeading(plane)
   rotate = alt.setInterval(()=>{
    native.setEntityHeading(plane, h += 0.1)
    h += 0.8
   }, 40)
})

function spawn(model, name) {   
    let pos = planespawnpos
    let spawn = alt.setInterval(()=>{
        alt.clearInterval(spawn);
        if(spawned == 0) {
            spawned = 1
            alt.emitServer('spawnplane', model, planespawnpos, true)
        } 
        
    }, 200)
}

function planebuy(title, model, price, seat, type) {
    alt.log(title)
    let pbuymenu = new NativeUI.Menu("", '~b~PURCHASE AIRCRAFT~b~', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
    //pbuymenu.Visible = false;
    pbuymenu.GetTitle().Scale = MenuSettings.TitleScale
    pbuymenu.AddItem(new NativeUI.UIMenuItem(title, "", ""))
    let pbuyitem = new NativeUI.UIMenuItem("Purchase", "", "")
    pbuyitem.RightLabel = '$ '+price
    pbuymenu.AddItem(pbuyitem)
    if(pbuymenu.Visible) {} else {
        pbuymenu.Open()
        //planemenu = 0
    }
    
   // planemenu = 0;
    pbuymenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
    money = getMeta('money');
    if((money.bank + money.cash) >= price) {
        native.doScreenFadeOut(1000)
        pbuymenu.Close();
        let tbuy = alt.setInterval(()=>{
            alt.clearInterval(tbuy);
            alt.emitServer('buyaircraft', model, title, seat, type)
            native.doScreenFadeIn(4000)
        }, 2000)
        let buyn = alt.setInterval(()=>{
            alt.clearInterval(buyn);
            buyinfo('~y~AIRCRAFT PURCHASED~y~', 'Congrats! You Own this Aircraft', price);
            alt.emit('notif', title+' now available in your hangar')
        }, 5000)
        
    } else {
        handletext('Not enough money')
    } 
}});
}

alt.on('removeplane', ()=>{
    if(currentplane) {
        //native.deleteEntity(currentplane)
    }
})

function lsamenu() {
const pegasus = new NativeUI.Menu("", 'PEGASUS CONCIERGE', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
pegasus.Visible = false;
pegasus.AddItem(new NativeUI.UIMenuItem('~b~Categories', ""))
let buyplane = new NativeUI.Menu("", 'SELECT AIRCRAFT', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
pegasus.AddSubMenu(buyplane, new NativeUI.UIMenuItem('Buy an Aircraft', ""))
pegasus.AddItem(new NativeUI.UIMenuItem('Aircraft Storage', ""))
pegasus.AddItem(new NativeUI.UIMenuItem('Airport Job', ""))

pegasus.Open()

pegasus.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Aircraft Storage") {
        pegasus.Close(true);
        alt.emit('hangarstorage')
    }
})

const aircrafts = [
{type: 1, model: 'cuban800', seat: 2, price: 240000},
{type: 2, model: 'alphaz1', seat: 2, price: 2121500},
{type: 3, model: 'howard', seat: 2, price: 1296000},
{type: 4, model: 'nimbus', seat: 2, price: 1900000},
{type: 5, model: 'seabreeze', seat: 2, price: 1130000},
{type: 6, model: 'shamal', seat: 2, price: 1150000},
{type: 7, model: 'stunt', seat: 2, price: 1200000},
{type: 8, model: 'velum', seat: 2, price: 450000},
{type: 9, model: 'microlight', seat: 2, price: 365000},
{type: 10, model: 'blimp', seat: 2, price: 1190500},
{type: 11, model: 'buzzard2', seat: 2, price: 1350000},
{type: 12, model: 'cargobob2', seat: 2, price: 1995000},
{type: 13, model: 'frogger', seat: 2, price: 780000},
{type: 14, model: 'havok', seat: 2, price: 2309000},
{type: 15, model: 'maverick', seat: 2, price: 450000},
{type: 16, model: 'skylift', seat: 10, price: 2835000},
{type: 17, model: 'supervolito', seat: 2, price: 2113000},
{type: 18, model: 'swift', seat: 2, price: 1500000},
{type: 19, model: 'volatus', seat: 2, price: 2295000},
//{type: 20, model: 'jet', seat: 2, price: 20000},
]
let planename

aircrafts.forEach(element =>{
    planename = native.getFilenameForAudioConversation(native.getDisplayNameFromVehicleModel(alt.hash(element.model)));
    let planeitem = new NativeUI.UIMenuItem(planename, "", aircrafts);
    planeitem.RightLabel = '$ '+ element.price
    buyplane.AddItem(planeitem)
})

buyplane.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < aircrafts.length) {
        let pplane = alt.Player.local.getSyncedMeta('personalaircraft');
        if(pplane) {
            let ppos = native.getEntityCoords(pplane, false);
            let dist = native.getDistanceBetweenCoords(planespawnpos.x,planespawnpos.y, planespawnpos.z, ppos.x, ppos.y, ppos.z, true );
            if(dist < 10) {
                alt.emitServerRaw('removeplanes', pplane)
            }
        }
        let plane = aircrafts[selectedItemIndex]
        if(currentmodel == plane.model) {
            pegasus.Close(true)
            let pname = native.getFilenameForAudioConversation(native.getDisplayNameFromVehicleModel(alt.hash(plane.model)))
            planebuy(pname, plane.model, plane.price, plane.seat, 'AIRCRAFT')
        } else {
            alt.emitServer('spawnplane', plane.model, planespawnpos, false)
            currentmodel = plane.model
        }
    }
})
}

alt.on('lsamenu', (pos)=>{
    planespawnpos = pos;
    lsamenu()
})

let sellmenu = [
    {type: -1, worktype: "~g~Select Option", seat: 2, price: 0},
    {type: 1, worktype: "Sell", seat: 2, price: 0},
]

let planedata

alt.on('sellaircraft', ()=>{

    let vplane = alt.Player.local.vehicle.getSyncedMeta('owner')
    for(let i in VehicleData) {
        if(vplane.data.model == VehicleData[i].name) {
            sellmenu[1].price += VehicleData[i].price
            sellmenu[1].job = VehicleData[i].display
            planedata = vplane
            alt.emit('createmenu', VehicleData[i].display, 'planesell', sellmenu)

        }
    }
    
})

alt.on('planesell', (type)=>{
    if(type == 1) {
        let price = 0.7*sellmenu[1].price
        native.doScreenFadeOut(1000);
        let sel = alt.setInterval(()=>{
            alt.clearInterval(sel)
        alt.emit('removeaircraft', planedata.slot, planedata, null)
        alt.emitServer('sellplane', sellmenu[1].job, price)
        native.doScreenFadeIn(2000);
        }, 3000)
        let seln = alt.setInterval(()=>{
            alt.clearInterval(seln);
            buyinfo('~y~SELL SUCCESS~y~', sellmenu[1].job+'has been Sold for $ '+price, 0);
        }, 5000)
    }
})

function handletext(text) {
	game.beginTextCommandDisplayHelp("STRING");
	game.addTextComponentSubstringKeyboardDisplay(text);
	game.endTextCommandDisplayHelp(0, 0, true, -1);
};

function handlemultitext(text1, text2) {
    game.beginTextCommandDisplayHelp("TWOSTRINGS");
	game.addTextComponentSubstringKeyboardDisplay(text1);
    game.addTextComponentSubstringKeyboardDisplay(text2);
	game.endTextCommandDisplayHelp(0, 0, false, 2);
}
function drawtext(msg, x, y, font, scale, wrap, r, g, b, a,) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(font);
    //native.setTextOutline();
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, wrap);
    native.setTextCentre(true);
    native.setTextColour(r,g,b,a);
    native.setTextJustification(0);
    native.setTextDropShadow(true);
    native.endTextCommandDisplayText(x, y, 0);
    
  }