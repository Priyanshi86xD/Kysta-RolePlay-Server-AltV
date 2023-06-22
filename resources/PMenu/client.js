import * as alt from 'alt-client';
import * as native from 'natives';
import * as game from 'natives';
import * as NativeUI from './NativeUI/NativeUi.js';
import { Actionlist, Dancelist } from './emotes.js';
import { VehicleData } from './vehicles.js';
import { clearInterval, deleteMeta, getMeta, hasMeta, setMeta } from 'alt-shared';
import { loadchar, loadcharmodel, loadface, loadhead, saveoutfit, loadoutfit, savecharmodel, pbags, topclothes, ppants,paccs, pshoes, hats, pglasses, masks, lefthands, righthands, saveprops, loadprops, earrings } from './char.js';

let prop = null;


// THIS CAN YOU EDIT
const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    TitleScale: 1.2,
    TitleFont: NativeUI.Font.HouseScript,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
}

const EventNames = {
    ToggleMenu: "Player:Menu",
}
let player = alt.Player.local;

const MenuText = {
    MenuTitle: player.name,
    MenuSubTitle: "~b~INTERACTIVE MENU~b~",
    sprite: ""
}

const MaxListItems = 800;

// DO NOT EDIT
const PMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
PMenu.Visible = false;
PMenu.GetTitle().Scale = MenuSettings.TitleScale,
PMenu.GetTitle().Font = MenuSettings.TitleFont;
PMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
PMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;

// ========================================================================================================
// Character

let CharItem = new NativeUI.UIMenuItem("Character", "");
let CharMenu = new NativeUI.Menu("Character Menu", "~b~CHARACTER OPTIONS~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
CharMenu.GetTitle().Scale = MenuSettings.TitleScale;
CharMenu.Visible = false;
CharMenu.GetTitle().Font = MenuSettings.TitleFont;
CharMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
CharMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
PMenu.AddSubMenu(CharMenu, CharItem);

let CharEditItem = new NativeUI.UIMenuItem("Edit Character", "");
let CharEditMenu = new NativeUI.Menu("Character Editor", "~b~CHARACTER'S HEAD~b~", MenuSettings.Point, "", "");
CharEditMenu.CloseableByUser = false;
//CharMenu.AddItem(CharEditItem);
CharMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Edit Character") {
        createPedEditCamera();
        setFov(30);
        setZPos(0.6);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);
        native.setPlayerInvincible(alt.Player.local.scriptID, true);
        CharEditMenu.Open();
        
}}) ;       

const fModel = alt.hash('mp_f_freemode_01');
const mModel = alt.hash(`mp_m_freemode_01`);

native.requestModel(fModel);
native.requestModel(mModel);

let mMItem = new NativeUI.UIMenuItem("Male Character", "~b~Choose 'Finish' to Close Editor~b~");
CharEditMenu.AddItem(mMItem);
CharEditMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Male Character") {
        alt.emitServer('pmodel', mModel);
}});
let fMItem = new NativeUI.UIMenuItem("Female Character", "~b~Choose 'Finish' to Close Editor~b~");
CharEditMenu.AddItem(fMItem);
CharEditMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Female Character") {
        alt.emitServer('pmodel', fModel);
}});

alt.onServer('chardone', ()=> {
    native.setPedHeadBlendData(alt.Player.local.scriptID, 33, 45, 0, 45, 45, 0, 0.5, 0.5, 0, false);
    native.setPedComponentVariation(alt.Player.local.scriptID, 2, 11, 0, 0);
    native.setPedHairTint(alt.Player.local.scriptID, 5, 2);
    native.setPedHeadOverlayTint(alt.Player.local.scriptID, 2, 1, 5, 2);
    setMeta('snack', 0);
    setMeta('helm', 0);
});

let Fface = new NativeUI.UIMenuAutoListItem("Father Face : ", "~b~Choose 'Finish' to Close Editor~b~", 0, 45, 33, "");
let Mface = new NativeUI.UIMenuAutoListItem("Mother Face : ", "~b~Choose 'Finish' to Close Editor~b~", 0, 45, 45, "");
let FMix = new NativeUI.UIMenuAutoListItem("Face Mix : ", "~b~Choose 'Finish' to Close Editor~b~", 0, 10, 1, "");
let FSkin = new NativeUI.UIMenuAutoListItem("Father Skin : ", "~b~Choose 'Finish' to Close Editor~b~", 0, 45, 45, "");
let MSkin = new NativeUI.UIMenuAutoListItem("Mother Skin : ", "~b~Choose 'Finish' to Close Editor~b~", 0, 45, 45, "");
let SMix = new NativeUI.UIMenuAutoListItem("Skin Mix : ", "~b~Choose 'Finish' to Close Editor~b~", 0, 10, 1, "");
let Hair = new NativeUI.UIMenuAutoListItem("Hair: ", "~b~Choose 'Finish' to Close Editor~b~", 0, 80, 11, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 2));
let EyeB = new NativeUI.UIMenuAutoListItem("Eyebrow: ", "~b~Choose 'Finish' to Close Editor~b~", 0, 34, 0, native.getPedHeadOverlay(alt.Player.local.scriptID, 2));
let Eye = new NativeUI.UIMenuAutoListItem("Eye Color: ", "~b~Choose 'Finish' to Close Editor~b~", 0, 32, 0, native.getHeadBlendEyeColor(alt.Player.local.scriptID));

CharEditMenu.AddItem(Fface);
CharEditMenu.AddItem(Mface);
CharEditMenu.AddItem(FMix);
CharEditMenu.AddItem(FSkin);
CharEditMenu.AddItem(MSkin);
CharEditMenu.AddItem(SMix);
CharEditMenu.AddItem(Hair);
CharEditMenu.AddItem(EyeB);
CharEditMenu.AddItem(Eye);

CharEditMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let fface = Fface.SelectedValue;
    let mface= Mface.SelectedValue;
    let fskin = FSkin.SelectedValue;
    let mskin= MSkin.SelectedValue;
    let fmix = FMix.SelectedValue * 0.1;
    let smix= SMix.SelectedValue * 0.1;
    let hair= Hair.SelectedValue;
    let eyeb= EyeB.SelectedValue;
    let eye = Eye.SelectedValue;
    loadhead(fface,mface,fskin,mskin,fmix,smix);
    loadface(hair,0,0,eyeb,0,eye,-1,-1,-1,-1,-1,-1,-1,-1);
    
    let head = {face1:fface,face2:mface,skin1:fskin,skin2:mskin,fmix:fmix,smix:smix,}
    let phair = {hair1:hair, hair2:0, hair3:0,}
    setMeta('phead', head);
    setMeta('hair', phair);
});

let FeatItem = new NativeUI.UIMenuItem("Face Features", "~b~Edit Face Features~b~");
let FeatMenu = new NativeUI.Menu("Character Editor", "~b~FACE FEATURE CATEGORIES~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
CharEditMenu.AddSubMenu(FeatMenu, FeatItem);

let noseW = new NativeUI.UIMenuAutoListItem("Nose Width : ", "", -10, 10, 0, "");
let noseH = new NativeUI.UIMenuAutoListItem("Nose Height : ", "", -10, 10, 0, "");
let noseL = new NativeUI.UIMenuAutoListItem("Nose Length : ", "", -10, 10, 0, "");
let noseB = new NativeUI.UIMenuAutoListItem("Nose Bridge : ", "", -10, 10, 0, "");
let noseT = new NativeUI.UIMenuAutoListItem("Nose Tip : ", "", -10, 10, 0, "");
let noseBS = new NativeUI.UIMenuAutoListItem("Nose Bridge Shaft : ", "", -10, 10, 0, "");
let BrowH = new NativeUI.UIMenuAutoListItem("Brow Height : ", "", -10, 10, 0, "");
let BrowW = new NativeUI.UIMenuAutoListItem("Brow Width : ", "", -10, 10, 0, "");
let CheekH = new NativeUI.UIMenuAutoListItem("Cheekbone Height : ", "", -10, 10, 0, "");
let CheekbW = new NativeUI.UIMenuAutoListItem("Cheekbone Width : ", "", -10, 10, 0, "");
let CheekW = new NativeUI.UIMenuAutoListItem("Cheek Width : ", "", -10, 10, 0, "");
let Eyel = new NativeUI.UIMenuAutoListItem("Eyelids : ", "", -10, 10, 0, "");
let Lip = new NativeUI.UIMenuAutoListItem("Lips : ", "", -10, 10, 0, "");
let JawW = new NativeUI.UIMenuAutoListItem("Jaw Width : ", "", -10, 10, 0, "");
let JawH = new NativeUI.UIMenuAutoListItem("Jaw Height : ", "", -10, 10, 0, "");
let ChinL = new NativeUI.UIMenuAutoListItem("Chin Length : ", "", -10, 10, 0, "");
let ChinP = new NativeUI.UIMenuAutoListItem("Chin Position : ", "", -10, 10, 0, "");
let ChinW = new NativeUI.UIMenuAutoListItem("Chin Width : ", "", -10, 10, 0, "");
let ChinS = new NativeUI.UIMenuAutoListItem("Chin Shape : ", "", -10, 10, 0, "");
let NeckW = new NativeUI.UIMenuAutoListItem("Neck Width : ", "", -10, 10, 0, "");

FeatMenu.AddItem(noseW);
FeatMenu.AddItem(noseH);
FeatMenu.AddItem(noseL);
FeatMenu.AddItem(noseB);
FeatMenu.AddItem(noseT);
FeatMenu.AddItem(noseBS);
FeatMenu.AddItem(BrowH);
FeatMenu.AddItem(BrowW);
FeatMenu.AddItem(CheekH);
FeatMenu.AddItem(CheekbW);
FeatMenu.AddItem(CheekW);
FeatMenu.AddItem(Eyel);
FeatMenu.AddItem(Lip);
FeatMenu.AddItem(JawW);
FeatMenu.AddItem(JawH);
FeatMenu.AddItem(ChinL);
FeatMenu.AddItem(ChinP);
FeatMenu.AddItem(ChinW);
FeatMenu.AddItem(ChinS);
FeatMenu.AddItem(NeckW);

FeatMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let NoseW = noseW.SelectedValue * 0.1;
    let NoseH = noseH.SelectedValue * 0.1;
    let NoseL = noseL.SelectedValue * 0.1;
    let NoseB = noseB.SelectedValue * 0.1;
    let NoseT = noseT.SelectedValue * 0.1;
    let NoseBS = noseBS.SelectedValue * 0.1;
    let browH = BrowH.SelectedValue * 0.1;
    let browW = BrowW.SelectedValue * 0.1;
    let cheekH = CheekH.SelectedValue * 0.1;
    let cheekbW = CheekbW.SelectedValue * 0.1;
    let cheekW = CheekW.SelectedValue * 0.1;
    let eyel = Eyel.SelectedValue * 0.1;
    let lip = Lip.SelectedValue * 0.1;
    let jawW = JawW.SelectedValue * 0.1;
    let jawH = JawH.SelectedValue * 0.1;
    let chinL = ChinL.SelectedValue * 0.1;
    let chinP = ChinP.SelectedValue * 0.1;
    let chinW = ChinW.SelectedValue * 0.1;
    let chinS = ChinS.SelectedValue * 0.1;
    let neckW = NeckW.SelectedValue * 0.1;

    loadchar(NoseW,NoseH,NoseL,NoseB,NoseT,NoseBS,browH,browW,cheekH,cheekbW,cheekW,eyel,lip,jawW,jawH,chinL,chinP,chinW,chinS,neckW)

    const pface1 = {f0:NoseW,f1:NoseH,f2:NoseL,f3:NoseB,f4:NoseT,f5:NoseBS,f6:browH,f7:browW,f8:cheekH,f9:cheekbW,f10:cheekW,f11:eyel,f12:lip,f13:jawW,f14:jawH,f15:chinL,f16:chinP,f17:chinW,f18:chinS,f19:neckW, }
    setMeta('face', pface1);

});

let DoneItem = new NativeUI.UIMenuItem("Finish & Save Character", "");
CharEditMenu.AddItem(DoneItem);
CharEditMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Finish & Save Character") {
        CharEditMenu.Close();
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
    destroyPedEditCamera();
    native.setPlayerInvincible(alt.Player.local.scriptID, false);
    savecharmodel();
}});


const charoutfit = [
    {name: "Slot 1", data: "outfit1", prop: "props1"},
    {name: "Slot 2", data: "outfit2", prop: "props2"},
    {name: "Slot 3", data: "outfit3", prop: "props3"},
    {name: "Slot 4", data: "outfit4", prop: "props4"},
    {name: "Slot 5", data: "outfit5", prop: "props5"},
]

//let stylemenu = new NativeUI.Menu("Styles", "~b~PLAYER STYLES~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
CharMenu.AddItem(new NativeUI.UIMenuItem("Style", "Customize Character Accessories"));

CharMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Style") {
        if(hasMeta('police')) {
            handletext('NOT AVAILABLE')
        } else {
            
            PMenu.Close(true);
            wardrobeaccess()
        }
    }
})

let SaveCharItem = new NativeUI.UIMenuItem("Save Outfit", "Save Current Outfit");
let SaveCharMenu = new NativeUI.Menu("Save Outfit", "~b~SAVE OUTFITS~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
CharMenu.AddSubMenu(SaveCharMenu, SaveCharItem);

charoutfit.forEach((element)=>{
    let save = new NativeUI.UIMenuItem(element.name, "", charoutfit);
    SaveCharMenu.AddItem(save);
})

SaveCharMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < charoutfit.length) {
        let outfit = charoutfit[selectedItemIndex];
        if(hasMeta('police')) {
            let pol = getMeta('police');
            if(pol > 0) {
                handletext('NOT AVAILABLE, YOU ARE ON DUTY!')
            } else {
                saveoutfit(outfit.data);
                saveprops(outfit.prop);
            }
        } else {
            saveoutfit(outfit.data);
            saveprops(outfit.prop);
        }
    }
})

let LoadCharItem = new NativeUI.UIMenuItem("Load Outfit", "~b~Load Saved Outfits~b~");
let LoadCharMenu = new NativeUI.Menu("Load Outfit", "~b~LOAD OUTFITS~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
CharMenu.AddSubMenu(LoadCharMenu, LoadCharItem);

charoutfit.forEach((element)=>{
    let load = new NativeUI.UIMenuItem(element.name, "", charoutfit);
    LoadCharMenu.AddItem(load);
})

LoadCharMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < charoutfit.length) {
        let outfit = charoutfit[selectedItemIndex];
        if(hasMeta('police')) {
            let pol = getMeta('police');
            if(pol > 0) {
                handletext('NOT AVAILABLE, YOU ARE ON DUTY!')
            } else {
                loadoutfit(outfit.data);
                loadprops(outfit.prop);
            }
        } else {
            loadoutfit(outfit.data);
        loadprops(outfit.prop);
        }
    }
})
// ========================================================================================================
// JOb

let JobItem = new NativeUI.UIMenuItem("Job", "View player active job");
PMenu.AddItem(JobItem);
PMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Job") {
        if(hasMeta('activejob')) {
            PMenu.Close(true);
        jobmenu();
        } else {}
        
    }
})

function jobmenu() {
    let job = getMeta('activejob');
    let JobMenu = new NativeUI.Menu(MenuText.MenuTitle, "~b~ACTIVE JOB~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
    JobMenu.AddItem(new NativeUI.UIMenuItem(job, ""))
    JobMenu.AddItem(new NativeUI.UIMenuItem("Quit job", ""))
    JobMenu.Open()
    JobMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Quit job") {
            alt.emit(job);
            JobMenu.Close();
            PMenu.Close(true);
        }
    })
}
// ========================================================================================================
// Challenge

let InvitItem = new NativeUI.UIMenuItem("Challenge", "View challenge invitations");
PMenu.AddItem(InvitItem);
PMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Challenge") {
        PMenu.Close(true);
        invitemenu();  
    }
})

function invitemenu() {
let race = getMeta('joinrace');
let parkour = getMeta('joinparkour');
let InvitMenu = new NativeUI.Menu(MenuText.MenuTitle, "~b~ACTIVE CHALLENGE~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);

if(race) {
    let raceitem = new NativeUI.UIMenuItem("Race Invite", "");
    raceitem.RightLabel = race.host;
    InvitMenu.AddItem(raceitem);
}
if(parkour) {
    let parkouritem = new NativeUI.UIMenuItem("Parkour Invite", "");
    parkouritem.RightLabel = parkour.host;
    InvitMenu.AddItem(parkouritem);
}

InvitMenu.Open();

InvitMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Race Invite") {
        alt.emit('joinrace');
    }
    if(item instanceof NativeUI.UIMenuItem && item.Text == "Parkour Invite") {
        alt.emit('joinparkour');
    }
})
}

// ========================================================================================================
// Action

let ActionItem = new NativeUI.UIMenuItem("Action Menu", "");
PMenu.AddItem(ActionItem);

let ActionMenu = new NativeUI.Menu("Action Menu", "~b~ANIMATION MENU~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
ActionMenu.GetTitle().Scale = MenuSettings.TitleScale;
ActionMenu.GetTitle().Font = MenuSettings.TitleFont;
ActionMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
ActionMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
PMenu.AddSubMenu(ActionMenu, ActionItem);

let ActionStyleItem = new NativeUI.UIMenuItem("Action Style", "~b~Choose Action Styles~b~");
ActionMenu.AddItem(ActionStyleItem)

let ActionStyleMenu = new NativeUI.Menu("Action Styles", "~b~ANIMATION STYLES~b~", new NativeUI.Point(50, 50));
ActionStyleMenu.Visible = false;
ActionStyleMenu.GetTitle().Scale = MenuSettings.TitleScale;
ActionMenu.AddSubMenu(ActionStyleMenu, ActionStyleItem);

Actionlist.forEach(element => {
	let ActionStyleItem = new NativeUI.UIMenuItem(element.name, "Press 'Capslock' to instantly play selected animation anytime");
	ActionStyleMenu.AddItem(ActionStyleItem);
});

ActionStyleMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < Actionlist.length) {
		let SelectedAction = Actionlist[selectedItemIndex];
		playAnimation(SelectedAction.dict, SelectedAction.anim, 49, SelectedAction.EmoteDuration);
        const anim = {dict : SelectedAction.dict, anim :SelectedAction.anim, flag: 49, dur: SelectedAction.EmoteDuration}
        setMeta('action', anim);
        alt.LocalStorage.set('action', anim);
        alt.LocalStorage.save()
    }
});

let DanceItem = new NativeUI.UIMenuItem("Dance Style", "~b~Dance Animation~b~");
ActionMenu.AddItem(DanceItem)

let DanceMenu = new NativeUI.Menu("Dance Menu", "~b~DANCING STYLES~b~", new NativeUI.Point(50, 50));
DanceMenu.Visible = false;
DanceMenu.GetTitle().Scale = MenuSettings.TitleScale;
ActionMenu.AddSubMenu(DanceMenu, DanceItem);

Dancelist.forEach(element => {
	let DanceItem = new NativeUI.UIMenuItem(element.name, "~b~Press 'Capslock' to instantly play selected animation anytime~b~");
	DanceMenu.AddItem(DanceItem);
});

DanceMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < Dancelist.length) {
		let SelectedDance = Dancelist[selectedItemIndex];
		playAnimation(SelectedDance.dict, SelectedDance.anim, 49, 300000);
        const anim = {dict : SelectedDance.dict, anim :SelectedDance.anim, flag: 49, dur: 10000}
        setMeta('action', anim);
        alt.LocalStorage.set('action', anim);
        alt.LocalStorage.save()
    }
});

ActionMenu.AddItem(new NativeUI.UIMenuItem("Stop Action", "~b~Stop Played Animation.. Press 'Capslock' to instantly stop the animation~b~"));

ActionMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Stop Action") {
		game.clearPedTasks(alt.Player.local.scriptID);
		if (!prop || prop == null) return;
			alt.setTimeout(() => {
				game.detachEntity(prop, true, false);
				game.deleteObject(prop);
				prop = null;
			}, 800);
	} else {
    }
});

// ========================================================================================================
// Inventory Menu

function inventorymenu(data) {
const InvMenu = new NativeUI.Menu("Inventory", "~b~CATEGORIES~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
let SnackItem = new NativeUI.UIMenuItem("Snacks", "");
let SnackMenu = new NativeUI.Menu("Snacks", "~b~EAT STORED SNACKS TO GAIN HEALTH~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
InvMenu.AddSubMenu(SnackMenu, SnackItem);

InvMenu.Open();
SnackMenu.AddItem(new NativeUI.UIMenuItem('Eat Snack', "~b~get snacks from Stores!~b~"));
SnackMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == 'Eat Snack') {
        let eatn = getMeta('snack');
		let phealth = native.getEntityHealth(alt.Player.local.scriptID);
        if(phealth <= 199) {
            if(eatn >= 1) { 
                attach('prop_cs_burger_01',-120,-150,-55);
                playAnimation("mp_player_inteat@burger","mp_player_int_eat_burger",49,3000);
            let snack = eatn - 1
            setMeta('snack', snack);
            native.setEntityHealth(player, phealth + 50, 0);
            let text = ['YOUR STORED SNACK', '(',' ', eatn,' ', ')'].join('');
            handletext(text);}else{
            if(eatn <= 0) {
                handletext('YOUR STORED SNACK IS EMPTY!')
            }  }
        } else {
            if(phealth >= 199) {}
        }}});

let DrinkItem = new NativeUI.UIMenuItem("Energy Drink", "");
let DrinkMenu = new NativeUI.Menu("Energy Drinks", "~b~DRINK TO GAIN STAMINA~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
InvMenu.AddSubMenu(DrinkMenu, DrinkItem);
InvMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == 'Energy Drink') {
        alt.emit('water');
    }});

DrinkMenu.AddItem(new NativeUI.UIMenuItem('Drink Ecola', "~b~get energy drinks from Stores!~b~"));
DrinkMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == 'Drink Ecola') {
        let drink = getMeta('drink');
        let haus = 0 + getMeta('water');
        if(haus <= 99) {
            if(drink >= 1) { 
                attach('prop_ecola_can',-80,-100,-345);
                playAnimation("mp_player_intdrink","loop",49,3000);
            let water = drink - 1
            setMeta('drink', water);
            haus + 50;
            alt.emit('minum', 50);
            let text = ['YOUR STORED DRINKS', '(',' ', drink,' ', ')'].join('');
            handletext(text);}else{
            if(drink <= 0) {
                handletext('YOUR STORED DRINKS IS EMPTY!')
            }  }
        } else {
            if(haus >= 99) {}
        }}});

let ArmorItem = new NativeUI.UIMenuItem("Body Armor", "");
let ArmorMenu = new NativeUI.Menu("Body Armor", "~b~STORED BODY ARMOR~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
InvMenu.AddSubMenu(ArmorMenu, ArmorItem);
ArmorMenu.AddItem(new NativeUI.UIMenuItem('Use Armor', ""));
ArmorMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == 'Use Armor') {
        let armor = getMeta('armor')
        let parmor = native.getPedArmour(player);
        //alt.log(armor);
        if(armor > 0){
            if(parmor < 100){
        alt.emitServer("Give:Armor");
        setMeta('armor', armor - 1);
        alt.emitServer('updatedata', 'weapons', 'armorstock', getMeta('armor'), false)
    }
        }else handletext('ARMOR INVENTORY IS EMPTY!')
}});

let armorlist = new NativeUI.UIMenuAutoListItem('Choose armors :',"", 0, data.armors.length-1, 0, data.armors)
ArmorMenu.AddItem(armorlist);

ArmorMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let armors = data.armors[armorlist.SelectedValue]
    if(armors) {
        native.setPedComponentVariation(alt.Player.local.scriptID, 8, armors.draw, armors.color, 0);
    } else {
        handletext('You dont have any armor stored')
    }
});


let HelmItem = new NativeUI.UIMenuItem("Combat Helmet", "");
let HelmMenu = new NativeUI.Menu("Combat Helmet", "~b~COMBAT HELMET OPTIONS~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
InvMenu.AddSubMenu(HelmMenu, HelmItem);

let helmlist = new NativeUI.UIMenuAutoListItem('Choose helmet :',"", 0, data.helmets.length-1, 0, data.helmets)
HelmMenu.AddItem(helmlist);

HelmMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let helm = data.helmets[helmlist.SelectedValue]
    if(helm) {
        native.setPedPropIndex(alt.Player.local.scriptID, 0, helm.prop, helm.tex, false);
    } else {
        handletext('You dont have any helmet stored')
    }
});

HelmMenu.AddItem(new NativeUI.UIMenuItem('Take Of Helmet', "~b~Take Of helmet~b~"));
HelmMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == 'Take Of Helmet') {
        const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
        let helm = native.getPedPropIndex(alt.Player.local.scriptID, 0);
           if(pedmodel==false) {
             if(helm ==115 | helm ==117) {
              native.setNightvision(false);
              native.setSeethrough(false);
              native.clearPedProp(alt.Player.local.scriptID, 0);
             }
        } else {
            if (pedmodel==true) {
            if(helm ==116 | helm == 118) {
                native.setNightvision(false);
                native.setSeethrough(false);
                native.clearPedProp(alt.Player.local.scriptID, 0);
                }
            }  }
            native.clearPedProp(alt.Player.local.scriptID, 0);
}});

let CombatHItem = new NativeUI.UIMenuItem("Dual Lense Combat Helmet", "~b~Get The Helmet From Ammunation!~b~")
let CombatHMenu = new NativeUI.Menu("Dual Lense Helmet", "~b~COMBAT HELMET OPTIONS~b~", new NativeUI.Point(50, 50));
CombatHMenu.Visible = false;
HelmMenu.AddSubMenu(CombatHMenu, CombatHItem);

let HFuncItem = new NativeUI.UIMenuItem("Activate Night Vision Lens", "~b~Use F10 to Activate The Lense Faster~b~")
CombatHMenu.AddItem(HFuncItem);
CombatHMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Activate Night Vision Lens") {
        activatehelm(116, 115, 117, 116, true, false)
}
    });

let HFunc1Item = new NativeUI.UIMenuItem("Deactivate Night Vision Lens", "~b~Use F10 to Deactivate The Lense Faster~b~")
CombatHMenu.AddItem(HFunc1Item);
CombatHMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Deactivate Night Vision Lens") {
        let helm = native.getUsingnightvision();
        if(helm == true){
        deactivatehelm(115,116,116,117, false, false);} else return;
}});

    let CombatH2Item = new NativeUI.UIMenuItem("Quad Lense Combat Helmet", "~b~Get The Helmet From Ammunation!~b~")
    let CombatH2Menu = new NativeUI.Menu("Quad Lense Helmet", "~b~COMBAT HELMET OPTIONS~b~", new NativeUI.Point(50, 50));
    CombatH2Menu.Visible = false;
    HelmMenu.AddSubMenu(CombatH2Menu, CombatH2Item);
   
    let H2FuncItem = new NativeUI.UIMenuItem("Activate Thermal Vision Lens", "~b~Use F10 to Activate The Lense Faster~b~")
    CombatH2Menu.AddItem(H2FuncItem);
    CombatH2Menu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Activate Thermal Vision Lens") {
            activatehelm(118,117,119,118,false,true)
}});
    
    let H2Func1Item = new NativeUI.UIMenuItem("Deactivate Thermal Vision Lens", "~b~Use F10 to Deactivate The Lense Faster~b~")
    CombatH2Menu.AddItem(H2Func1Item);
    CombatH2Menu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Deactivate Thermal Vision Lens") {
            let helm = native.getUsingseethrough();
            if(helm == true){
            deactivatehelm(117,118,118,119, false,false)} else return;
        }});

}
let InvItem = new NativeUI.UIMenuItem("Inventory", "access all things inside your bag");
PMenu.AddItem(InvItem);

PMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == 'Inventory') {
       // let bag = native.getPedDrawableVariation(alt.Player.local.scriptID, 5);
      //  if(bag == 40 || bag == 44 || bag == 81 || bag == 85 ) {
            alt.emitServer('requestdata', 'weapons', 'inventorydata')
            
      //  } else {
       //     handletext('NO BAG AVAILABLE!')
       // }
    }
})

alt.onServer('inventorydata', (data)=>{
    PMenu.Close();
    inventorymenu(data)
})
// ========================================================================================================
// Vehicle

let VehicleItem = new NativeUI.UIMenuItem("Vehicle", "");
PMenu.AddItem(VehicleItem);
let VehicleMenu = new NativeUI.Menu("Vehicle Menu", "~b~PERSONAL VEHICLES~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
PMenu.AddSubMenu(VehicleMenu, VehicleItem);

VehicleMenu.AddItem(new NativeUI.UIMenuItem("Request Personal Vehicle", "Spawn your active vehicle"));

VehicleMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Request Personal Vehicle") {
        let pveh = getMeta('personalvehicle');
        if(pveh > 0) {
        let pos = alt.Player.local.pos;
        let roadpos = native.getClosestRoad(pos.x, pos.y, pos.z, 1,0, pos, pos, 1,0,0, true);
        let h = native.getHeadingFromVector2d((roadpos[1].x - roadpos[2].x), (roadpos[1].y - roadpos[2].y));
        //let spawnpos = {x: roadpos[1].x, y: roadpos[1].y, z: roadpos[1].z, h}
        let roadpos2 = native.getRoadBoundaryUsingHeading(roadpos[1].x, roadpos[1].y, roadpos[1].z, h, roadpos[1]);
        let spawnpos = {x: roadpos2[1].x, y: roadpos2[1].y, z: roadpos2[1].z, h}
        alt.emit('spawnpersonalvehicle', spawnpos);
        } else {
            handletext('NO PERSONAL VEHICLE ACTIVE!')
        }
}});

let GarageItem = new NativeUI.UIMenuItem("Request Vehicle", "Spawn vehicle from garages");
VehicleMenu.AddItem(GarageItem)
let GarageMenu = new NativeUI.Menu("Personal Vehicles", "~b~GARAGES~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
VehicleMenu.AddSubMenu(GarageMenu, GarageItem);

const garages = [
    {name: 'Garage 1', garageid: 'garage1'}, {name: 'Garage 2', garageid: 'garage2'}, {name: 'Garage 3', garageid: 'garage2'},
    {name: 'Garage 4', garageid: 'garage4'}, {name: 'Garage 5', garageid: 'garage5'},
]

garages.forEach(element => {
    let GarageMenuListItem = new NativeUI.UIMenuItem(element.name, "");
    GarageMenu.AddItem(GarageMenuListItem);
});

GarageMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < garages.length) {
        let Gar = garages[selectedItemIndex];
        let garage = getMeta(Gar.garageid);
        if(garage === undefined) {
            handletext('GARAGE UNAVAILABLE!')
        }
        else {
            PMenu.Close(true);
            alt.emit('garagemenu', Gar.garageid, garage.capacity, 1);
    }
}});

VehicleMenu.AddItem(new NativeUI.UIMenuItem("Return Vehicle to Garage", ""));

VehicleMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Return Vehicle to Garage") {
        let car = getMeta('personalvehicle');
        if(car > 0) {
        alt.emitServer('reqreturnvehicle');
        } else {}
}});

let VehOptionItem = new NativeUI.UIMenuItem("Vehicle Options", "");
VehicleMenu.AddItem(VehOptionItem)
let VehOptionMenu = new NativeUI.Menu("Vehicle Menu", "~b~VEHICLE OPTIONS~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
VehicleMenu.AddSubMenu(VehOptionMenu, VehOptionItem);

let enginitem = new NativeUI.UIMenuCheckboxItem("Keep Vehicle Engine on", false, "Keep vehicle engine still on when leave the vehicle");
VehOptionMenu.AddItem(enginitem);
VehOptionMenu.CheckboxChange.on((CheckedItem, checkedState) => {
    native.setVehicleKeepEngineOnWhenAbandoned(alt.Player.local.vehicle, checkedState);
})

let DoorItem = new NativeUI.UIMenuItem("Vehicle Door", "");
VehOptionMenu.AddItem(DoorItem)
let DoorMenu = new NativeUI.Menu("Vehicle Door Menu", "~b~DOOR OPTIONS~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
VehOptionMenu.AddSubMenu(DoorMenu, DoorItem);

const vehdoor = [
    {name:"Open Front Right", id: 1},
    {name:"Open Front Left",  id: 0},
    {name:"Open Back Right",  id: 3},
    {name:"Open Back Left",  id: 2},
    {name:"Open Bonnet",  id: 4},
    {name:"Open Cargo",  id: 5},
]

vehdoor.forEach((element)=>{
    let doors = new NativeUI.UIMenuItem(element.name, "", vehdoor);
    DoorMenu.AddItem(doors);
})
DoorMenu.AddItem(new NativeUI.UIMenuItem("Open All Doors", "", ))
DoorMenu.AddItem(new NativeUI.UIMenuItem("Close All Doors", "", ))

DoorMenu.ItemSelect.on((item, selectedItemIndex) => {
    let veh = alt.Player.local.vehicle.scriptID;
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < vehdoor.length) {
        let door = vehdoor[selectedItemIndex];
        dooroption(veh, door.id);
    } 
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Open All Doors") {
        dooroption(veh, 0); dooroption(veh, 1); dooroption(veh, 2); dooroption(veh, 3); dooroption(veh, 4); dooroption(veh, 5);
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Close All Doors") {
        native.setVehicleDoorsShut(veh, false);
        native.playVehicleDoorCloseSound(veh, 0);
    }
});

function dooroption(veh, door) {
native.setVehicleDoorOpen(veh, door, false, false);
native.playVehicleDoorOpenSound(veh, door);
}

let CycleMenuItem = new NativeUI.UIMenuItem("Request Cycle", "");
VehicleMenu.AddItem(CycleMenuItem)

let CycleMenu = new NativeUI.Menu(MenuText.MenuTitle, "~b~REQUEST BYCYCLE~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
CycleMenu.Visible = false;
VehicleMenu.AddSubMenu(CycleMenu, CycleMenuItem);

const Cycle = VehicleData.filter(function(vehicle) {
    return vehicle.class == "CYCLE";
});

Cycle.forEach(element => {
    let CycleMenuListItem = new NativeUI.UIMenuItem(element.display, "");
    CycleMenuListItem.RightLabel = 'Rent $5';
    CycleMenu.AddItem(CycleMenuListItem);
});

CycleMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < Cycle.length) {
        let SelectedVeh = Cycle[selectedItemIndex];
        let vehId = SelectedVeh.name;
        spawnveh(vehId);
        alt.emit('buy', 5);
    }
});

let AddedItem = new NativeUI.UIMenuItem("ADDEDS", "");
//VehicleMenu.AddItem(AddedItem)

let AddedMenu = new NativeUI.Menu("New Cars", "~b~SPAWN VEHICLES~b~", new NativeUI.Point(50, 50));
AddedMenu.Visible = false;
AddedMenu.GetTitle().Scale = MenuSettings.TitleScale;
//VehicleMenu.AddSubMenu(AddedMenu, AddedItem);

const Added = [{name:'boor'}, {name:'brickade2'},{name:'broadway'},{name:'thruster'},{name:'entity3'},{name:'eudora'},{name:'everon2'},{name:'issi8'},
{name:'journey2'},{name:'manchez3'},{name:'panthere'},{name:'powersurge'},{name:'r300'},{name:'surfer3'},{name:'tahoma'},{name:'tulip2'},{name:'virtue'}, {name: 'dloader'},
{name:"packer"},{name:"phantom"},{name:"oppressor2"},
]



Added.forEach(element => {
    let AddedMenuItem = new NativeUI.UIMenuItem(element.name, "Choose Vehicle");
    AddedMenu.AddItem(AddedMenuItem);
});

AddedMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < Added.length) {       
        let SelectedVeh = Added[selectedItemIndex];
        let vehId = SelectedVeh.name;
        spawnveh(vehId);
    }
});


let BikeItem = new NativeUI.UIMenuItem("Bike Helmet Option", "")
let BikeMenu = new NativeUI.Menu("Bike Helmet", "~b~BIKE HELMET OPTION~b~", new NativeUI.Point(50, 50));
BikeMenu.Visible = false;
PMenu.AddSubMenu(BikeMenu, BikeItem);

let RemoveItem = new NativeUI.UIMenuItem("Take Off Helmet", "~b~Take off the helmet to change it's variants~b~")
BikeMenu.AddItem(RemoveItem);
BikeMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Take Off Helmet") {
        const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
        let helm = native.getPedPropIndex(alt.Player.local.scriptID, 0);
           if(pedmodel==false) {
             if(helm ==115 | helm ==117) {
              native.setNightvision(false);
              native.setSeethrough(false);
              native.clearPedProp(alt.Player.local.scriptID, 0);
            native.removePedHelmet(alt.Player.local.scriptID, false);
             }
        } else {
            if (pedmodel==true) {
            if(helm ==116 | helm == 118) {
                native.setNightvision(false);
                native.setSeethrough(false);
                native.clearPedProp(alt.Player.local.scriptID, 0);
            native.removePedHelmet(alt.Player.local.scriptID, false);
                }
            }  }
            native.clearPedProp(alt.Player.local.scriptID, 0);
            native.removePedHelmet(alt.Player.local.scriptID, false);
        }
        });

let HelmDrawable = new NativeUI.UIMenuAutoListItem("Type : ", "~b~Setting player helmet on bike~b~", 78, 89, 1, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 0));
let HelmTexture = new NativeUI.UIMenuAutoListItem("Variations : ", "~b~Setting player helmet on bike~b~", 0, 23, 0, native.getNumberOfPedPropTextureVariations(alt.Player.local.scriptID, 0,0));
BikeMenu.AddItem(HelmDrawable);
BikeMenu.AddItem(HelmTexture);

BikeMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = HelmDrawable.SelectedValue;
    let texture = HelmTexture.SelectedValue;
    native.setPedHelmetPropIndex(alt.Player.local.scriptID, drawable, true)
    native.setPedHelmetTextureIndex(alt.Player.local.scriptID, texture) 
});

let WearItem = new NativeUI.UIMenuCheckboxItem("Wear Helmet on Bike", true, "~b~Setting player helmet on bike~b~");
BikeMenu.AddItem(WearItem);
BikeMenu.CheckboxChange.on((CheckedItem, checkedState) => {
    native.setPedHelmet(alt.Player.local.scriptID, checkedState)

});

// ========================================================================================================
// Event Section

let CloseItem = new NativeUI.UIMenuItem("Close Game", "")
let CloseMenu = new NativeUI.Menu("Game Menu", "~b~You sure want to Close the game?~b~", new NativeUI.Point(50, 50));
CloseMenu.Visible = false;
PMenu.AddSubMenu(CloseMenu, CloseItem);

let CloseGameItem = new NativeUI.UIMenuItem("Yes, Close Game", "");
CloseMenu.AddItem(CloseGameItem)
CloseMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Yes, Close Game") {
        if(hasMeta('police')) {
            let cop = getMeta('police');
            if(cop == 2) {} else {
                saveoutfit('default');
                saveprops('defaultprop');
            }
        } else {
            saveoutfit('default');
            saveprops('defaultprop');
            savecharmodel();
        }
        alt.emitServer('updatedata', 'weapons', 'armorstock', getMeta('armor'), false)
        alt.emit('saving');
        PMenu.Close(true);
        handleswitchout(false, 0, 2);
        alt.setInterval(() => {
            native.restartGame();
        }, 6000);   
}});

let NoGameItem = new NativeUI.UIMenuItem("No, Still wanna Play the Game", "");
CloseMenu.AddItem(NoGameItem)
CloseMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "No, Still wanna Play the Game") {
        playAnimation("anim@mp_player_intincarthumbs_uplow@ds@", "enter", 1, 1000);
        PMenu.Close(true);
}});


alt.on("keydown", (keycode) => {
    if (keycode == 121) {
        let lens = native.getUsingnightvision();
        let lens1 = native.getUsingseethrough();
	if(lens == true) {
        deactivatehelm(115,116,116,117, false, false);
         }else{if(lens == false) {
            activatehelm(116, 115, 117,116, true, false);
        }if(lens1 == true) {
            deactivatehelm(117,118,118,119, false, false)
        }else{if(lens1 ==false){
            activatehelm(118,117,119,118, false, true);
        }}
    }}
});

alt.on("keydown", (key) => {
	if (key == "M".charCodeAt(0)) {
        let chat = getMeta('chat');
        if(chat == 1) {}
        else {
        if (PMenu.Visible || ActionMenu.Visible || CharMenu.Visible || VehicleMenu.Visible)
		{PMenu.Close(true);
        }else{
            PMenu.Open();
            alt.emitServer('requestdata', 'characters', 'wardrobeset'); 
        }
}}});

alt.onServer('pseat', (veh)=>{
    let seat = native.isVehicleSeatFree(veh, -1, false);
    if(seat == false) {}
    else {
    let seattimeout = alt.setTimeout(() => {
		native.setPedIntoVehicle(alt.Player.local.scriptID, veh, -1);
        alt.clearTimeout(seattimeout);
	}, 200);
}});

alt.onServer('closemenu', () => {
    PMenu.Close(true);
});

let anim;

alt.on("keyup", (keycode) => {
	if (keycode == 20) {
        let pause = native.isPauseMenuActive()
        let chat = getMeta('chat')
        if(pause == true || chat > 0) {}
        else {
        if(hasMeta('action')) {
        anim = getMeta('action');
        } else {
            anim = alt.LocalStorage.get('action')
        } 
        let pedt = native.isEntityPlayingAnim(alt.Player.local.scriptID, anim.dict, anim.anim, anim.flag );
        if(pedt == false) {
        playAnimation(anim.dict, anim.anim, 3, anim.dur);
	}else if(pedt == true){
        let animint = alt.setInterval(() => {
        native.clearPedTasks(alt.Player.local.scriptID);
        alt.clearInterval(animint);
    }, 500)
}}}
});

alt.on(EventNames.ToggleMenu, () => {
    PMenu.Visible = !PMenu.Visible;
});

function spawnveh(vehId) {
    let model = alt.hash(vehId)
    native.requestModel(model);
    alt.emitServer("givecar", vehId, 0);
}
alt.onServer('pseat', (veh) => {
    let seatint = alt.setTimeout(() => {
        native.setPedIntoVehicle(player, veh, -1);
        alt.clearTimeout(seatint);  
    }, 100)
});

alt.onServer('personalvehheading', (car,pos)=>{
    let head = alt.setInterval(()=>{
        native.setEntityHeading(car, pos);
        alt.clearInterval(head);
    }, 300);
})


function attach(entity, xrot,yrot,zrot) {
    let bone = game.getPedBoneIndex(player, 0x8cbd);
    let pos = game.getPedBoneCoords(player, 0x8cbd, 0,0,0);
    let ped = native.isPedInCover(player, 0); 
    let pbike = native.isPedInAnyVehicle(player, true);
    if(ped == false) {
        if(pbike == false) {
        let object = game.createObject((native.getHashKey(entity)), pos.x, pos.y, pos.z, false, false, true);
        native.attachEntityToEntity(object, player, bone, 0.09, 0.02, 0.05,xrot,yrot,zrot, false, true, false, true, 1, true );
        let objinterval = alt.setInterval(() => {
            native.deleteEntity(object);
            alt.clearInterval(objinterval);
          },3000);
    }else return;
}}

function playAnimation(animDict, animName, animFlag, animDuration) {
    let ped = native.isPedInCover(player, 0);
    let pbike = native.isPedInAnyVehicle(player, true);
    if(ped == true) return;
    if(pbike == true) return;
    if (animDict == undefined || animName == undefined || animFlag == undefined || animDuration == undefined) return;
    game.requestAnimDict(animDict);
    let interval = alt.setInterval(() => {
        if (game.hasAnimDictLoaded(animDict)) {
            alt.clearInterval(interval);
            game.taskPlayAnim(alt.Player.local.scriptID, animDict, animName, 8.0, 3, animDuration, animFlag, 1, 0, 0, 0);
            //native.taskPlayAnimAdvanced(alt.Player.local.scriptID, animDict, animName,153.8714, -1003.1630, -99.0000,0,0,200,8.0,3,-1,3,animDuration,1,1);
        } 
    }, 0);
};

function handletext(text) {
    native.beginTextCommandDisplayHelp("STRING");
    native.addTextComponentSubstringKeyboardDisplay(text);
    native.endTextCommandDisplayHelp(0, 0, true, 6000);
};

function activatehelm(tex1, tex2, tex3, tex4, lens1, lens2) {
    const texture = native.getPedPropTextureIndex(alt.Player.local.scriptID, 0);
        const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
           if(pedmodel==false) {
            let helm = native.getPedPropIndex(alt.Player.local.scriptID, 0, 0);
            if(helm ==tex1) {
             playAnimation("anim@mp_helmets@on_foot", "visor_down", 1, 500);
             let interval = alt.setInterval(() => {
                native.setPedPropIndex(alt.Player.local.scriptID, 0, tex2, texture, false, 0);
                native.setNightvision(lens1);
                native.setSeethrough(lens2);
                alt.clearInterval(interval);
             }, 600);
            } else { }
        } else {
            if (pedmodel==true) {
                let helm = native.getPedPropIndex(alt.Player.local.scriptID, 0, 0);
            if(helm ==tex3) {
                playAnimation("anim@mp_helmets@on_foot", "visor_down", 1, 500);
                let interval = alt.setInterval(() => {
                native.setPedPropIndex(alt.Player.local.scriptID, 0, tex4, texture, false, 0);
                native.setNightvision(lens1);
                native.setSeethrough(lens2);
                alt.clearInterval(interval);
                }, 600)
            } else { }
 }}};

function deactivatehelm(tex1, tex2, tex3, tex4, lens1, lens2) {
    native.setNightvision(lens1);
    native.setSeethrough(lens2);
        const texture = native.getPedPropTextureIndex(alt.Player.local.scriptID, 0);
        const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
                if(pedmodel==false) {
                    let helm = native.getPedPropIndex(alt.Player.local.scriptID, 0, 0);
            if(helm ==tex1) {
                    playAnimation("anim@mp_helmets@on_foot", "visor_up", 1, 500);
                    let interval = alt.setInterval(() => {
                        native.setPedPropIndex(alt.Player.local.scriptID, 0, tex2, texture, false, 0);
                        alt.clearInterval(interval);
                    }, 600)
            }
        } else {
            if (pedmodel==true) {
                let helm = native.getPedPropIndex(alt.Player.local.scriptID, 0, 0);
            if(helm ==tex3) {
                playAnimation("anim@mp_helmets@on_foot", "visor_up", 1, 500);
                let interval = alt.setInterval(() => {
                    native.setPedPropIndex(alt.Player.local.scriptID, 0, tex4, texture, false, 0);
                    alt.clearInterval(interval);
                }, 600);    
            }
        }}
};

function handleswitchout(in_switch, instant_switch, switch_type) {
    if (in_switch) {
        native.switchToMultiSecondpart(alt.Player.local.scriptID);
        alt.emit('showpstat');
    } else {
      game.switchToMultiFirstpart(alt.Player.local.scriptID, instant_switch, switch_type);
}};

let camera, wardrobe = 0
let zpos = 0;
let fov = 90;
let startPosition;
let startCamPosition;


function createPedEditCamera() {
  startPosition = { ...alt.Player.local.pos };
  if (!camera) {
      const forwardVector = native.getEntityForwardVector(alt.Player.local.scriptID);
      const forwardCameraPosition = {
          x: startPosition.x + forwardVector.x * 1.2,
          y: startPosition.y + forwardVector.y * 1.2,
          z: startPosition.z + zpos
      };

      fov = 90;
      startCamPosition = forwardCameraPosition;

      camera = native.createCamWithParams(
          'DEFAULT_SCRIPTED_CAMERA',
          forwardCameraPosition.x,
          forwardCameraPosition.y,
          forwardCameraPosition.z,
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

function destroyPedEditCamera() {

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


alt.on('openwardrobe', ()=>{
        setMeta('wardrobe', 2)
        wardrobemain();
    
})

function wardrobemain() {
const lemari = new NativeUI.Menu("", "~g~WARDROBE~g~", new NativeUI.Point(50, -57), "", "");
lemari.SetNoBannerType();  
lemari.Visible = false;

let top = new NativeUI.Menu("", "TOPS", new NativeUI.Point(50, -57), "","");
top.SetNoBannerType();  
top.Visible = false;
lemari.AddSubMenu(top, (new NativeUI.UIMenuItem("Tops","")))

let pant = new NativeUI.Menu("", "PANTS", new NativeUI.Point(50, -57), "","");
pant.SetNoBannerType();  
pant.Visible = false;
lemari.AddSubMenu(pant, (new NativeUI.UIMenuItem("Pants", "",)))

let shoe = new NativeUI.Menu("", "SHOES", new NativeUI.Point(50, -57), "","");
shoe.SetNoBannerType();  
shoe.Visible = false;
lemari.AddSubMenu(shoe, (new NativeUI.UIMenuItem("Shoes","")))

lemari.AddItem(new NativeUI.UIMenuItem("Accessories",""))
lemari.Open();

let tops = new NativeUI.UIMenuAutoListItem("Select clothes", "", 0, topclothes.length - 1, 0, topclothes);
top.AddItem(tops);
let pants = new NativeUI.UIMenuAutoListItem("Select pants ", "", 0, ppants.length - 1, 0, ppants);
pant.AddItem(pants);
let shoes = new NativeUI.UIMenuAutoListItem("Select shoes ", "", 0, pshoes.length - 1, 0, pshoes);
shoe.AddItem(shoes);

top.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let clothes = topclothes[tops.SelectedValue]
    if(topclothes.length >= 1) {
    giveclothes(11, clothes.top, clothes.top1, 0); //top
    giveclothes(3, clothes.torso, clothes.torso1, 0); //torso
    giveclothes(8, clothes.und, clothes.und1, 0); //undershirt
    giveclothes(7, clothes.acc, clothes.acc, 0); //accs
    }
});
pant.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let clothes = ppants[pants.SelectedValue]
    if(ppants.length >= 1) {
    giveclothes(4, clothes.pant, clothes.texture, 0); //pant
    }
});
shoe.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let clothes = pshoes[shoes.SelectedValue]
    if(pshoes.length >= 1) {
    giveclothes(6, clothes.shoe, clothes.texture, 0); //shoe
    }
});
lemari.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Accessories") {
        lemari.Close(true);
        wardrobeaccess()
    }
})
}
let propId;
function wardrobeaccess() {

let access = new NativeUI.Menu("", "ACCESSORIES", new NativeUI.Point(50, -57), "","");
access.SetNoBannerType();  
access.Visible = false;

let pglas = new NativeUI.Menu("", "GLASSES", new NativeUI.Point(50, -57), "","");
pglas.SetNoBannerType();  
access.AddSubMenu(pglas, new NativeUI.UIMenuItem("Glasses",""))
let phats = new NativeUI.Menu("", "HATS", new NativeUI.Point(50, -57), "","");
phats.SetNoBannerType();  
access.AddSubMenu(phats, new NativeUI.UIMenuItem("Hats",""))
let pmask = new NativeUI.Menu("", "MASKS", new NativeUI.Point(50, -57), "","");
pmask.SetNoBannerType();  
access.AddSubMenu(pmask, new NativeUI.UIMenuItem("Masks",""))
let pscarf = new NativeUI.Menu("", "SCARFS", new NativeUI.Point(50, -57), "","");
pscarf.SetNoBannerType();  
access.AddSubMenu(pscarf, new NativeUI.UIMenuItem("Scarfs and Ties",""))
let pbag = new NativeUI.Menu("", "BAGS", new NativeUI.Point(50, -57), "","");
pbag.SetNoBannerType();  
//access.AddSubMenu(pbag, new NativeUI.UIMenuItem("Bags",""))
let pear = new NativeUI.Menu("", "EARRINGS", new NativeUI.Point(50, -57), "","");
pear.SetNoBannerType();  
access.AddSubMenu(pear, new NativeUI.UIMenuItem("Earrings",""))
let plhand = new NativeUI.Menu("", "LEFT HAND", new NativeUI.Point(50, -57), "","");
plhand.SetNoBannerType();  
access.AddSubMenu(plhand, new NativeUI.UIMenuItem("Left Hand",""))
let prhand = new NativeUI.Menu("", "RIGHT HAND", new NativeUI.Point(50, -57), "","");
prhand.SetNoBannerType();  
access.AddSubMenu(prhand, new NativeUI.UIMenuItem("Right Hand",""))

access.Open();

let glases = new NativeUI.UIMenuAutoListItem("Glasses", "Press F to remove", 0, pglasses.length - 1, 0, pglasses);
pglas.AddItem(glases);
let phat = new NativeUI.UIMenuAutoListItem("Hats & Head Sets ", "Press F to remove", 0, hats.length - 1, 0, hats);
phats.AddItem(phat);
let mask = new NativeUI.UIMenuAutoListItem("Masks ", "Press F to remove", 0, masks.length - 1, 0, masks);
pmask.AddItem(mask);
let scarf = new NativeUI.UIMenuAutoListItem("Scarfs & Ties ", "Press F to remove", 0, paccs.length - 1, 0, paccs);
pscarf.AddItem(scarf);
let bag = new NativeUI.UIMenuAutoListItem("Bags", "Press F to remove", 0, pbags.length - 1, 0, pbags);
//pbag.AddItem(bag);
let ear = new NativeUI.UIMenuAutoListItem("Ears", "Press F to remove", 0, earrings.length - 1, 0, earrings);
pear.AddItem(ear);
let lhand = new NativeUI.UIMenuAutoListItem("Left Hand", "Press F to remove", 0, lefthands.length - 1, 0, lefthands);
plhand.AddItem(lhand);
let rhand = new NativeUI.UIMenuAutoListItem("Right Hand", "Press F to remove", 0, righthands.length - 1, 0, righthands);
prhand.AddItem(rhand);
   
    phats.AutoListChange.on((selectedItem, selectedItemIndex) => {
        let hat = hats[phat.SelectedValue]
        if(hats.length >= 1) {
        giveprops(0, hat.prop, hat.texture, 0); //hat
        propId = 0
        }
    })
    pglas.AutoListChange.on((selectedItem, selectedItemIndex) => {
        let glass = pglasses[glases.SelectedValue]
        if(pglasses.length >= 1) {
        giveprops(1, glass.prop, glass.texture, 0); //glasses
        propId = 1
        }
    })
    pscarf.AutoListChange.on((selectedItem, selectedItemIndex) => {
        let clothes = paccs[scarf.SelectedValue]
        if(paccs.length >= 1) {
        giveclothes(7, clothes.acc, clothes.texture, 0); //scarf
        }
    })
    //pbag.AutoListChange.on((selectedItem, selectedItemIndex) => {
      //  let bags = pbags[bag.SelectedValue]
      //  giveclothes(5, bags.bag, bags.texture, 0); //bags
    //})
    pmask.AutoListChange.on((selectedItem, selectedItemIndex) => {
        let pmask = masks[mask.SelectedValue]
        if(masks.length >= 1) {
        native.clearPedProp(alt.Player.local.scriptID, 0);
        native.clearPedProp(alt.Player.local.scriptID, 1);
        giveclothes(1, pmask.mask, pmask.texture, 0); //mask
        }
    })
    plhand.AutoListChange.on((selectedItem, selectedItemIndex) => {
        let lefth = lefthands[lhand.SelectedValue]
        if(lefthands.length >= 1) {
        giveprops(6, lefth.acc, lefth.texture, 0); 
        propId = 6
        }
    })
    prhand.AutoListChange.on((selectedItem, selectedItemIndex) => {
        let righth = righthands[rhand.SelectedValue]
        if(righthands.length >= 1) {
        giveprops(7, righth.acc, righth.texture, 0); 
        propId = 7
        }
    })
    pear.AutoListChange.on((selectedItem, selectedItemIndex) => {
        let ears = earrings[ear.SelectedValue]
        if(earrings.length >= 1) {
        giveprops(2, ears.acc, ears.texture, 0); 
        propId = 2
        }
    });

alt.on("keydown", (key) => {
	if (key == "F".charCodeAt(0)) {
        if(phats.Visible || pglas.Visible || pscarf.Visible || pbag.Visible || pmask.Visible || plhand.Visible || prhand.Visible || pear.Visible) {
            native.clearPedProp(alt.Player.local.scriptID, propId, 0);
        } 
    }
})
}

alt.onServer('careditormenu',()=>{
    //if(access.Visible || phats.Visible || pglas.Visible || pscarf.Visible || pbag.Visible || pmask.Visible || plhand.Visible || prhand.Visible || pear.Visible) {}
   // else {
    native.setEntityHeading(alt.Player.local.scriptID, 252.0894775390625);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    createPedEditCamera();
        setFov(30);
        setZPos(0.6);
        CharEditMenu.Open();
   // }
})


function giveclothes(compId, drawId, texture, palId) {
    native.setPedComponentVariation(alt.Player.local.scriptID, compId, drawId, texture, palId);
};

function giveprops(type, drawable, texture) {
    alt.log(type, drawable)
    if(type >= 0) {
        native.clearPedProp(alt.Player.local.scriptID, type,0);
        native.setPedPropIndex(alt.Player.local.scriptID, type, drawable, texture, true,0);
    }

}