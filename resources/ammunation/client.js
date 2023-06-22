import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from './NativeUI/NativeUi.js';
import { WeaponComponents, liverylist } from './components.js';
import { getMeta, hasMeta, setMeta } from 'alt-client';
import { loadweapon, saveliverycolor, saveweapon, saveweaponcolor, setplayerweapon } from './playerweapons.js';
import { deleteMeta, getSyncedMeta } from 'alt-shared';

const helm = {tex : -1, prop : -1}
let level, weapmenu = 0, currentarmor, armourmenu = 0, playerweapons = []

native.requestIpl('gr_case7_bunkerclosed');
native.requestIpl('gr_case5_bunkerclosed');
native.requestIpl('gr_case4_bunkerclosed');

alt.onServer("freeroam:spawned", async () => { 
  setMeta('helm', helm);
  setMeta('armor', 0)
  //setMeta('ammuped', 0);
  setMeta('ammumenu', 0);
  setMeta('job', 0);
});

const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    TitleScale: 1.0,
    TitleFont: NativeUI.Font.ChaletLondon,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
}

const EventNames = {
    ToggleMenu: "Weapon:Menu",
}

const MenuText = {
    MenuTitle: "",
    MenuSubTitle: "~r~CATEGORIES~r~",
    sprite : "shopui_title_gunclub",
    HandGunText : "Hand Gun",
    LMGText : "Light Machine Gun",
    SMGText : "Submachine Gun",
    ARText : "Assault Riffles",
    SGText : "Shotguns",
    SniperText : "Sniper Riffles",
    HeavyText : "Heavy Weapons",
    TWText : "Throwable Weapons",
    MCText : "Parachute & Melee Weapons",
    AMText : "Get Armour",
    AmoText : "Get Ammo"
}

const availableHandguns = [
  { Name: "AP Pistol", Hash: 0x22D8FE39, Price:5000, lev: 33  },
  { Name: "Ceramic Pistol", Hash: 0x2B5EF5EC, Price:20000 , lev: 5 },
  { Name: "Combat Pistol", Hash: 0x5EF9FEC4, Price:3200, lev: 9  },
 // { Name: "Double Action Revolver", Hash: 0x97EA20B8  },
  { Name: "Flare Gun", Hash: 0x47757124, Price:3750, lev: 1  },
 // { Name: "Perico Pistol", Hash: 0x57A4368C, Price:  },
  { Name: "Heavy Pistol", Hash: 0xD205520E, Price:3750, lev: 1  },
  { Name: "Heavy Revolver", Hash: 0xC1B3C3D1, Price:5900, lev: 1  },
  { Name: "Heavy Revolver Mk II", Hash: 0xCB96392F, Price:99000, lev: 20  },
  { Name: "Marksman Pistol", Hash: 0xDC4DB296, Price:4350, lev: 1  },
 // { Name: "Navy Revolver", Hash: 0x917F6C8C  },
  { Name: "Pistol", Hash: 0x1B06D571, Price:2500, lev: 1  },
  { Name: "Pistol.50", Hash: 0x99AEEB3B, Price:3900, lev: 1  },
  { Name: "Pistol Mk II", Hash: 0xBFE256D4, Price:73750, lev: 20  },
  { Name: "SNS Pistol", Hash: 0xBFD21232, Price:2750, lev: 1  },
  { Name: "SNS Pistol Mk II", Hash: 0x88374054, Price:79575, lev: 1  },
  { Name: "Stun Gun", Hash: 0x3656C8C1, Price:375000, lev: 1  },
  { Name: "Up-n-Atomizer", Hash: 0xAF3696A1, Price:399000 , lev: 10 },
  { Name: "Vintage Pistol", Hash: 0x83839C4, Price:3450 , lev: 1 },
];

const availableLMG = [
  { Name: "Combat MG", Hash: 0x7FD62962, Price:14800, lev: 40 },
  { Name: "Combat MG Mk 2", Hash: 0xDBBD7280, Price: 119000, lev: 60 },
  { Name: "Gusenberg Sweeper", Hash: 0x61012683, Price:14600 , lev: 1 },
  { Name: "MG", Hash: 0x9D07F764, Price:13500 , lev: 50 },
  
];

const availableSMG = [
  { Name: "Assault SMG", Hash: 0xEFE7E2DF, Price:12550  , lev: 29},
  { Name: "Combat PDW", Hash: 0xA3D4D34, Price:11750 , lev: 1 },
  { Name: "Machine Pistol", Hash: 0xDB1AA450, Price:6250 , lev: 1 },
  { Name: "Micro SMG", Hash: 0x13532244, Price:3750 , lev: 5 },
  { Name: "Mini SMG", Hash: 0xBD248B55, Price:8900 , lev: 1 },
  { Name: "SMG", Hash: 0x2BE6766B, Price:7500 , lev: 11 },
  { Name: "SMG Mk II", Hash: 0x78A97CD0, Price:85500 , lev: 25 },
  { Name: "Unholy Hellbringer", Hash: 0x476BF155, Price:449000 , lev: 30 },
];

const availableAR = [
  { Name: "Advanced Rifle", Hash: 0xAF113F99, Price:14250, lev: 30  },
  { Name: "Assault Rifle", Hash: 0xBFEFFF6D, Price:8550 , lev: 15 },
  { Name: "Assault Rifle Mk2", Hash: 0x394F415C, Price:98750 , lev: 35 },
  { Name: "Bullpup Rifle", Hash: 0x7F229F94, Price:14500 , lev: 1 },
  { Name: "Bullpup Rifle Mk2", Hash: 0x84D6FAFD, Price:105750 , lev: 35 },
  { Name: "Carbine Rifle", Hash: 0x83BF0278, Price:13000 , lev: 25 },
  { Name: "Carbine Rifle Mk2", Hash: 0xFAD1F1C9, Price:107500  , lev: 40},
  { Name: "Compact Rifle", Hash: 0x624FE830, Price:14650 , lev: 1 },
  { Name: "Military Rifle", Hash: 0x9D1F17E6, Price:397500 , lev: 25},
  { Name: "Special Carbine", Hash: 0xC0A3098D, Price:14750 , lev: 25 },
  { Name: "Special Carbine Mk2", Hash: 0x969C3D67, Price:135000 , lev: 40 },
];

const availableSG = [
  { Name: "Assault Shotgun", Hash: 0xE284C527, Price:10000 , lev: 30 },
  { Name: "Bullpup Shotgun", Hash: 0x9D61E50F, Price:8000 , lev: 10 },
  { Name:  "Combat Shotgun", Hash: 0x5A96BA4, Price:295000 , lev: 35 },
  { Name:  "Double Barrel Shotgun", Hash: 0xEF951FBB, Price:15450 , lev: 1 },
  { Name: "Heavy Shotgun", Hash: 0x3AABBBAA, Price:13550  , lev: 5},
  { Name: "Musket", Hash: 0xA89CB99E, Price:21400 , lev: 1 },
  { Name: "Pump Shotgun", Hash: 0x1D073A89, Price:3500 , lev: 5 },
  { Name: "Pump Shotgun Mk2", Hash: 0x555AF99A, Price:82500  , lev: 45},
  //{ Name: "Sawnoff Shotgun", Hash: 0x7846A318, Price:  },
  { Name: "Sweeper Shotgun", Hash: 0x12E82D3D, Price:14900 , lev: 5 },
];

const availableSniper = [
  { Name: "Heavy Sniper", Hash: 0xC472FE2, Price:38150 , lev: 45 },
  { Name: "Heavy Sniper Mk2", Hash: 0xA914799, Price:165375  , lev: 60},
  { Name: "Marksman Rifle", Hash: 0xC734385A, Price:15750 , lev: 20 },
  { Name: "Marksman Rifle Mk2", Hash: 0x6A6C02E0, Price:149000 , lev: 40 },
  { Name: "Sniper Rifle", Hash: 0x5FC3C11, Price:20000 , lev: 20 },
];

const availableHW = [
  { Name: "Compact Grenade Launcher", Hash: 0x781FE4A, Price:45000 , lev: 1 },
  { Name: "Firework Launcher", Hash: 0x7F7497E5 , Price:85000 , lev: 1},
  { Name: "Grenade Launcher", Hash: 0xA284510B, Price:32400  , lev: 20},
  //{ Name: "Grenade Launcher Smoke", Hash: 0x4DD2DC56, Price:  },
  { Name: "Homing launcher", Hash: 0x63AB0442, Price:75000 , lev: 20 },
  { Name: "Minigun", Hash: 0x42BF8A85 , Price:47000 , lev: 100},
  //{ Name: "Railgun", Hash: 0x6D544C99 , Price:},
  { Name: "RPG", Hash: 0xB1CA77B1 , Price:26250 , lev: 100},
  { Name: "Widowmaker", Hash: 0xB62D1F67 , Price:449000 , lev: 100},
];

const availableTW = [
  { Name: "BZ Gas", Hash: 0xA0973D5E, Price:150 , lev: 1 },
  { Name:  "Flare Gun", Hash: 0x497FACC3 , Price:8000, lev: 1 },
  { Name:  "Grenade", Hash: 0x93E220BD , Price:250 , lev: 1},
  { Name: "Molotov Cocktail", Hash: 0x24B17070 , Price:1000 , lev: 1},
  { Name: "Pipe Bombs", Hash: 0xBA45E8B8 , Price:500 , lev: 1},
  { Name: "Proximity Mines", Hash: 0xAB564B93 , Price:1000 , lev: 1},
  { Name: "Smoke Grenade", Hash: 0xFDBC8A50 , Price:200 , lev: 1},
  { Name: "Sticky Bomb", Hash: 0x2C3731D9 , Price:600 , lev: 1},
];

const availableMC = [
  { Name: "Parachute", Hash: 0xFBAB5776, Price:100  , lev: 1},
  { Name: "Antique Cavalry Dagger", Hash: 0x92A27487, Price:2000  , lev: 1},
//{ Name:  "Battle Axe", Hash: 0xCD274149, Price:9500  },
{ Name: "Brass Knuckles", Hash: 0xD8DF3C3C, Price:7500, lev: 1 },
{ Name:  "Flashlight", Hash: 0x8BB05FD7 , Price:5750 , lev: 1},
{ Name:   "Hammer", Hash: 0x4E875F73 , Price:500, lev: 1 },
{ Name:   "Hatchet", Hash: 0xF9DCBF2D , Price:750 , lev: 1},
{ Name:  "Knife", Hash: 0x99B507EA , Price:400, lev: 1 },
{ Name:  "Machete", Hash: 0xDD5DF8D9 , Price:8900 , lev: 1},
{ Name:   "Nightstick", Hash: 0x678B81B1 , Price:400 , lev: 1},
];

let money;
let weapon;
let weaponname;

const Ammunation = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
var banner = new NativeUI.Sprite("shopui_title_gunclub", "shopui_title_gunclub", new NativeUI.Point(0, 0), new NativeUI.Size(0, 0));
Ammunation.SetSpriteBannerType(banner);
Ammunation.CloseableByUser = true;
Ammunation.Visible = false;
Ammunation.GetTitle().Scale = MenuSettings.TitleScale,
Ammunation.GetTitle().Font = MenuSettings.TitleFont;
Ammunation.GetTitle().DropShadow = MenuSettings.DropShadow;
Ammunation.GetTitle().TextAlignment = MenuSettings.TextAlignment;

const list = [
  {name : "Hand Gun",title: 'PISTOLS', data: availableHandguns},
  {name : "Light Machine Gun", title: 'LIGHT MACHINE GUNS', data: availableLMG},
  {name : "Submachine Gun", title: 'SUBMACHINE GUNS', data: availableSMG},
  {name : "Riffles", title: 'RIFFLES', data: availableAR},
  {name : "Shotguns", title: 'SHOTGUNS', data: availableSG},
  {name : "Sniper Riffles", title: 'SNIPER RIFLES', data: availableSniper},
  {name :  "Heavy Weapons",title: 'HEAVY WEAPONS', data: availableHW},
  {name : "Throwable Weapons", title: 'THROWABLE WEAPONS', data: availableTW},
  {name : "Parachute & Melee Weapons", title: 'PARACHUTE & MELEE WEAPONS', data: availableMC},
]

list.forEach(element =>{
  let amulist = new NativeUI.UIMenuItem(element.name, "", list);
  Ammunation.AddItem(amulist);

  Ammunation.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < list.length) {
      let weapon = list[selectedItemIndex];
      Ammunation.Close(true);
      if(weapmenu == 0) {
        weapmenu = 1
        weaponmenu(weapon.title, weapon.data);
        let close = alt.setTimeout(()=>{
          alt.clearTimeout(close);
          weapmenu = 0
        }, 2000);
      }
       

    }});

})

function weaponmenu(title, data) {

const HandGunMenu = new NativeUI.Menu("", '~r~'+title+'~r~', MenuSettings.Point);
HandGunMenu.GetTitle().Scale = MenuSettings.TitleScale;
HandGunMenu.GetTitle().Font = MenuSettings.TitleFont;
HandGunMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
HandGunMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
HandGunMenu.SetSpriteBannerType(banner);

data.forEach(element => {
	let HandGunItem = new NativeUI.UIMenuItem(element.Name, "Unlocked at level "+element.lev);
  if(level < element.lev) {
    HandGunItem.RightLabel = 'locked'
  } else {
  if(hasMeta(element.Hash)) {
   // let comp = getMeta(element.Hash);
   // if(comp == 1) {
      HandGunItem.RightBadge = 13
  //  } else {
    //  HandGunItem.RightLabel = '$ '+element.Price;
   //}
  } else {
    HandGunItem.RightLabel = '$ '+element.Price;
  }
}
  //HandGunItem.RightLabel = '$ '+element.Price;
	HandGunMenu.AddItem(HandGunItem);
});

HandGunMenu.Open()

  HandGunMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < data.length) {
    
		let Gun = data[selectedItemIndex];
            let weapId = Gun.Hash;
            if(level >= Gun.lev) {
              HandGunMenu.Close(true);
              giveselectedweapon(weapId, Gun.Price, Gun.Name);
              
            }
                
  }});

}

// ========================================================================================================
// Armour

let AMItem = new NativeUI.UIMenuItem("Get Armor", "");
AMItem.RightLabel = '$ 500';
Ammunation.AddItem(AMItem)

Ammunation.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Get Armor") {
    if((money.cash + money.bank) > 500){
      alt.emitServer("Give:Armor");
      money.cash -= 500;
      alt.emit('buy', 500);
    } else { handletext('NOT ENOUGH MONEY!') }   
  }
});

let ArmorMenu = new NativeUI.Menu("", "~r~ARMOR STYLES~r~", MenuSettings.Point);
Ammunation.AddSubMenu(ArmorMenu, AMItem);
ArmorMenu.SetSpriteBannerType(banner);

const armors =[
  {name: "Light Armor", male: {min:55, max:56}, female: {min:32, max:33}, color: {min:0, max:0}, price: 1300 },
  {name: "Low Armor", male: {min:124, max:124}, female: {min:154, max:154}, color: {min:0, max:4} , price: 2500 },
  {name: "Medium Armor", male: {min:125, max:127}, female: {min:155, max:157}, color: {min:0, max:4} , price: 4500 },
  {name: "Heavy Armor", male: {min:128, max:128}, female: {min:158, max:158}, color: {min:0, max:4} , price: 15000 },
  {name: "Colorized Light Armor", male: {min:131, max:131}, female: {min:161, max:161} , color: {min:0, max:19} , price: 1500},
  {name: "Camo Light Armor", male: {min:152, max:152}, female: {min:188, max:188}, color: {min:0, max:11}  , price: 3500},
  {name: "STRAPZ Light Armor", male: {min:172, max:172}, female: {min:209, max:209}, color: {min:0, max:19}  , price: 4500},
]

armors.forEach(element =>{
  let armoritem = new NativeUI.UIMenuItem(element.name, "", armors);
  ArmorMenu.AddItem(armoritem);
})

  ArmorMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < armors.length) {
      let armor = armors[selectedItemIndex];
      let ismale = native.isPedMale(alt.Player.local.scriptID);
      ArmorMenu.Close()
      if(armourmenu == 0) {
        armourmenu = 1
        if(ismale == true) {
          armormenu(armor.name, armor.male.min, armor.male.max, armor.color.min, armor.color.max, armor.price)
        } else {
          armormenu(armor.name, armor.female.min, armor.female.max, armor.color.min, armor.color.max, armor.price)
        }
      }

    }
  });


function armormenu(title, min, max, colmin, colmax, price) {
let und = native.getPedDrawableVariation(alt.Player.local.scriptID, 8);
let und1 = native.getPedTextureVariation(alt.Player.local.scriptID, 8)

let Armor1Menu = new NativeUI.Menu(MenuText.MenuTitle, "~r~"+title+"~r~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
Armor1Menu.SetSpriteBannerType(banner);
Armor1Menu.Visible = false;
Armor1Menu.CloseableByUser = false;
let ArmorDrawable1 = new NativeUI.UIMenuAutoListItem("Variants : ", "", min, max, min, "");
let ArmorTexture = new NativeUI.UIMenuAutoListItem("Color : ", "", colmin, colmax, 0, "");
if(max > min) {
  Armor1Menu.AddItem(ArmorDrawable1);
}
if(colmax > colmin) {
  Armor1Menu.AddItem(ArmorTexture);
}
if(Armor1Menu.Visible) {} else {
  Armor1Menu.Open()
}

let draw1
let color
Armor1Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {

  if(max > min) {
    draw1= ArmorDrawable1.SelectedValue; 
  } else {
    draw1 = min
  }
  if(colmax > colmin) {
    color= ArmorTexture.SelectedValue;
  } else {
    color = colmin
  }
    native.playSound(0, "WEAPON_PURCHASE", "HUD_AMMO_SHOP_SOUNDSET", true, 0, false);
    native.setPedComponentVariation(alt.Player.local.scriptID, 8, draw1, color, 0);
});

let AMSItem = new NativeUI.UIMenuItem("Purchase Armor", "");
AMSItem.RightLabel = '$ '+price;
Armor1Menu.AddItem(AMSItem)
Armor1Menu.AddItem(new NativeUI.UIMenuItem("Back", ""));

Armor1Menu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Armor") {
   // if(bags == 1) {
    let armor = getMeta('armor');
    if((money.cash + money.bank) > price){
      if(armor < 10){
      setMeta('armor', armor + 1);
      native.playSound(0, "WEAPON_PURCHASE", "HUD_AMMO_SHOP_SOUNDSET", true, 0, false);
      handletext('ARMOR ADDED TO INVENTORY '+(armor+1));
      if(currentarmor == draw1) {
        money.cash -= 500;
        alt.emit('buy', 500);
      } else {
        let armorname = 'armor'+draw1+color
        if(hasMeta(armorname)) {} else {
          alt.emitServer('updatesubdata', 'weapons', 'armors', 'armor'+draw1+color, {draw:draw1, color:color},true)
          setMeta(armorname, 1)
        }
        currentarmor = draw1
        money.cash -= 500+price
        alt.emit('buy', 500+price);
      }
      } else if(armor >= 10){
        setMeta('armor', 10)
        handletext('ARMOR INVENTORY IS FULL!');
      }
    } else { handletext('NOT ENOUGH MONEY!') }   
 // } else { handletext('NO BAG AVAILABLE!')}
 Armor1Menu.Close();
 ArmorMenu.Open()
}
if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
  native.setPedComponentVariation(alt.Player.local.scriptID, 8, und, und1, 0);
  Armor1Menu.Close(true);
  ArmorMenu.Open()
  armourmenu = 0
}
});

}

// ========================================================================================================
// Ammo

let AmoItem = new NativeUI.UIMenuItem("Purchase Ammo", "Purchase Ammunition");
AmoItem.RightLabel = '~b~FREE~b~';
Ammunation.AddItem(AmoItem)

const ammotype = [
  0x743D4F54, 0x6C7D23B8, 0xD05319F, 0x6AA1343F, 0x90083D3B, 0xB02EADE0, 0x4C98087B, 
  0xFEDA7D30, 0x3BCCA5EE, 0x313FD340, 0x67DD81F2, 0x914C813A, 0x9FC5C882, 0x3BD313B1, 
  0x5424B617, 0xE60E08A6, 0x9B747EA4, 0x5633F9D5, 0x5106B43C, 0xCA6318A1, 0x6BCCF76F, 
  0xF624D80A, 0x155663F8, 0x99150E2D, 0xAF2208A7, 0x1941D244, 0x5E962DDC, 0x92F129CD, 
  0xB0198D5F, 0xA6BCBDA9, 0xF5F1C616, 0x2F7CA4A6, 0x469293CD, 0x72A3A760, 0xED906955, 
  0x7C867272, 0xDBACD794, 0xBC7AF403, 0xCE23B916, 0xAB8EA0F9, 0xB8DCEE2B, 0x2EC80A10, 
  0xDFD80B5, 0x57237470, 0x4919B4EB, 0xADD16CB9, 0x2D31ADD9, 0x27F43E92, 0xEC2875E7, 
  0x5D9106D1, 0x45F0E965, 0xAF23EE0F, 0x794446FD]

Ammunation.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Ammo") {
    for(let i in ammotype) {
      native.setPedAmmoByType(alt.Player.local.scriptID, ammotype[i], 999)
    }
   //   native.setPedAmmo(alt.Player.local.scriptID, native.getSelectedPedWeapon(alt.Player.local.scriptID), 999, true);
  }
})

let ModItem = new NativeUI.UIMenuItem("", "Customize Weapon");
let ModMenu = new NativeUI.Menu("", "~r~WEAPON MODIFICATIONS~r~", MenuSettings.Point);
ModMenu.SetSpriteBannerType(banner);
ModMenu.CloseableByUser = false;
ModMenu.Visible = false;

let CompItem = new NativeUI.UIMenuItem("Weapon Components", "");
let CompMenu = new NativeUI.Menu("", "~r~WEAPON COMPONENTS~r~", MenuSettings.Point);
CompMenu.SetSpriteBannerType(banner);
ModMenu.AddSubMenu(CompMenu, CompItem);

ModMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Weapon Components") {
    CompMenu.Clear();
    const weapId = native.getSelectedPedWeapon(alt.Player.local.scriptID);

const Components = WeaponComponents.filter(function(weapon) {
  return weapon.WeapHash == weapId;
})

Components.forEach(element => {
	let WeaponModItem = new NativeUI.UIMenuItem(element.Name, "Press 'F' to remove component");
  if(hasMeta(element.Hash)) {
    let comp = getMeta(element.Hash);
    if(comp == 1) {
      WeaponModItem.RightBadge = 13
    } else {
      WeaponModItem.RightLabel = '$ '+element.Price;
    }
  } else {
    WeaponModItem.RightLabel = '$ '+element.Price;
  }
  if(element.Price == 0) {
    WeaponModItem.RightBadge = 13
  }
	CompMenu.AddItem(WeaponModItem);
})
  CompMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < Components.length) {
		let SelectedComp = Components[selectedItemIndex];
            let compId = SelectedComp.Hash;
            let price = SelectedComp.Price;
            giveselectedcomp(weapId, compId, price);
            native.addAmmoToPed(alt.Player.local.scriptID, weapId, 999);
            let weapc = {weapId, compId, price}
            setMeta('weapc', weapc);

}});
}});

alt.on("keydown", (key) => {
  if (key == "F".charCodeAt(0)) {
    if(CompMenu.Visible){
    let weapc = getMeta('weapc');
    alt.emitServer("removeComp", weapc.weapId, weapc.compId);
    native.playSound(-1, "WEAPON_ATTACHMENT_UNEQUIP", "HUD_AMMO_SHOP_SOUNDSET", true, 0, false);
    deleteMeta('weapc');
    }else return;}
  });

// ========================================================================================================

// Livery

let LiveryMenuItem = new NativeUI.UIMenuItem("Livery", "Customize weapon with livery and colors");
ModMenu.AddItem(LiveryMenuItem);
let LiveryMenu = new NativeUI.Menu("", "~r~WEAPON LIVERY~r~", MenuSettings.Point);

LiveryMenu.SetSpriteBannerType(banner);
ModMenu.AddSubMenu(LiveryMenu, LiveryMenuItem);
LiveryMenu.Visible = false;

ModMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Livery"){
    LiveryMenu.Clear();
    let weapId = native.getSelectedPedWeapon(alt.Player.local.scriptID);

const liveryitem = liverylist.filter(function(weapon) {
  return weapon.WeapHash == weapId
})

liveryitem.forEach(element => {
let ModLivItem = new NativeUI.UIMenuItem(element.Name, "", liveryitem);
if(hasMeta(element.Hash)) {
  let comp = getMeta(element.Hash);
  if(comp == 1) {
    ModLivItem.RightBadge = 13
  } else {
    ModLivItem.RightLabel = '$ '+element.Price;
  }
} else {
  ModLivItem.RightLabel = '$ '+element.Price;
}
if(liveryitem.length > 0) {
  LiveryMenu.AddItem(ModLivItem);
} else {
  LiveryMenu.AddItem(new NativeUI.UIMenuItem("No Livery", ""))
}
})

LiveryMenu.ItemSelect.on((item, selectedItemIndex) => {
if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < liveryitem.length) {
let SelectedLiv = liveryitem[selectedItemIndex];
        let livId = SelectedLiv.Hash;
        let price = SelectedLiv.Price;
        giveselectedcomp(weapId, livId, price)
        let wliv = {livId, price }
        setMeta('wliv', wliv);
}});


let LivColItem = new NativeUI.UIMenuAutoListItem("Livery Colors", "", 0, 32, 0, native.getNumDlcWeaponComponents(2));

if(liveryitem.length > 0) {
  LiveryMenu.AddItem(LivColItem);
}

LiveryMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
  let compId = getMeta('wliv');
          let colId = LivColItem.SelectedValue;
          native.setPedWeaponComponentTintIndex(alt.Player.local.scriptID, weapId, compId.livId, colId )
          saveliverycolor(weapId, compId.livId, colId)
          //alt.emit('buy', 500);
});
}});

let WeaponColItem = new NativeUI.UIMenuAutoListItem("Tint Colors", "", 0, 32, 0,"");
ModMenu.AddItem(WeaponColItem);

ModMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
  let weapId = native.getSelectedPedWeapon(alt.Player.local.scriptID);
  let colId = WeaponColItem.SelectedValue;
  native.setPedWeaponTintIndex(alt.Player.local.scriptID, weapId , colId )
  saveweaponcolor(weapId, colId);
  //alt.emit('buy', 200);
})

let CloseItem = new NativeUI.UIMenuItem("Back", "");
ModMenu.AddItem(CloseItem);
ModMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
    ModMenu.Close(true);
    Ammunation.Open();
}});

// ========================================================================================================
// Helmets

let HelmetItem = new NativeUI.UIMenuItem("Combat Helmet", "");
let HelmetMenu = new NativeUI.Menu("", "~r~COMBAT HELMETS~r~", MenuSettings.Point);
HelmetMenu.SetSpriteBannerType(banner);
Ammunation.AddSubMenu(HelmetMenu, HelmetItem);

const helmets = [
  {name: "Bulletproof Helmet", desc: "Bulletproof helmets", male: 39, female: 38, price: 20000, color: 4},
  {name: "Dual Lense Combat Helmet", desc: "Bulletproof, Night Vision Mode",male: 117, female: 116, price:60000, color: 25},
  {name: "Quad Lense Combat Helmet", desc: "Bulletproof, Thermal Vision Mode",male: 119, female: 118, price: 110000, color: 25},
]

helmets.forEach(element =>{
  let helmlist = new NativeUI.UIMenuItem(element.name, element.desc, helmets)
  HelmetMenu.AddItem(helmlist);
})

  HelmetMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < helmets.length) {
      let helm = helmets[selectedItemIndex];
      let ismale = native.isPedMale(alt.Player.local.scriptID);
      Ammunation.Close(true)
      if(armourmenu == 0) {
        armourmenu = 1
        if(ismale == true) {
          helmetmenu(helm.name, helm.male, helm.color, helm.price)
        } else {
          helmetmenu(helm.name, helm.female, helm.color, helm.price)
        }
      }

    }
})


function helmetmenu(title, model,color, price,) {
let CHelmetMenu = new NativeUI.Menu("", "~r~"+title+"~r~", MenuSettings.Point);
CHelmetMenu.SetSpriteBannerType(banner);
CHelmetMenu.CloseableByUser = false;

let HelmTexture = new NativeUI.UIMenuAutoListItem("Variations : ", "", 0, color, 0, "");
CHelmetMenu.AddItem(HelmTexture);
CHelmetMenu.Open()

CHelmetMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let texture = HelmTexture.SelectedValue;
        native.setPedPropIndex(alt.Player.local.scriptID, 0, model, texture, false, 0);
});

let cbuyitem = new NativeUI.UIMenuItem('Purchase', "Store this helmet to your inventory")
cbuyitem.RightLabel = '$ '+price
CHelmetMenu.AddItem(cbuyitem);
CHelmetMenu.AddItem(new NativeUI.UIMenuItem('Cancel', ""));

CHelmetMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == 'Purchase') {
    money = getMeta('money')
    if((money.bank + money.cash) >= price) {
      const helm = {
        tex : native.getPedPropTextureIndex(alt.Player.local.scriptID, 0, 0),
        prop : native.getPedPropIndex(alt.Player.local.scriptID, 0, 0),
        }
        alt.emitServer('updatedata', 'weapons', 'helmets', helm, true)
        alt.emit('buy', price);
        setMeta('helm', helm);
        CHelmetMenu.Close();
        armourmenu = 0
    } else {
      handletext('NOT ENOUGH MONEY')
    }
}
if (item instanceof NativeUI.UIMenuItem && item.Text == 'Cancel') {
  native.clearPedProp(alt.Player.local.scriptID, 0, 0)
  CHelmetMenu.Close();
  Ammunation.Open()
  armourmenu = 0
}
});

}

let AmmuCloseItem = new NativeUI.UIMenuItem("Close Menu", "");
//Ammunation.AddItem(AmmuCloseItem);
Ammunation.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Close Menu") {
    Ammunation.Close(true);
    setMeta('ammumenu', 0);
}});


// ========================================================================================================
// Event Section

function weaponbuy(weapId, weaponprice, title) {
let WeaponBuyMenu = new NativeUI.Menu("", ["~r~",title,"~r~"].join(''), MenuSettings.Point);
WeaponBuyMenu.SetSpriteBannerType(banner);
WeaponBuyMenu.CloseableByUser = false;
WeaponBuyMenu.Visible = false;

let askItem = new NativeUI.UIMenuItem("PURCHASE WEAPON ?", "");
askItem.RightLabel = '$ '+weaponprice;
WeaponBuyMenu.AddItem(askItem)

    let BuyMenuItem = new NativeUI.UIMenuItem("~b~Purchase~b~", "");
    WeaponBuyMenu.AddItem(BuyMenuItem)
    WeaponBuyMenu.Open();
    WeaponBuyMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "~b~Purchase~b~") {
          money = getMeta('money')
            if((money.cash + money.bank) > weaponprice){
              native.playSound(-1, "WEAPON_PURCHASE", "HUD_AMMO_SHOP_SOUNDSET", true, 0, false);
              //alt.emitServer('buyweapon', weapon);
              saveweapon(weapId);
              alt.emit('buy', weaponprice);
              
              WeaponBuyMenu.Close();
              ModMenu.Open();
    } else { handletext('NOT ENOUGH MONEY!') }
        }
    });
    
    let NoBuyItem = new NativeUI.UIMenuItem("~b~Cancel~b~", "");
    WeaponBuyMenu.AddItem(NoBuyItem)
    WeaponBuyMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "~b~Cancel~b~") {
          native.removeWeaponFromPed(alt.Player.local.scriptID, weapon);
          WeaponBuyMenu.Close();
          Ammunation.Open();
}});
}

function giveselectedweapon(weapId, price, label) {
  //weaponprice = price;
  weapon = weapId;
  weaponname = label;
  let weap = getMeta(weapId);
  Ammunation.Close(true);
    alt.emitServer("Give:Weapon", weapId)
    if(weap == 1 ){
      ModMenu.Open();
    } else 
    weaponbuy(weapId, price, label)
};

function giveselectedcomp(weapId, compId, price) {
  money = getMeta('money');
  let comp = getMeta(compId);
  if(comp == 1) { 
    native.playSound(-1, "WEAPON_ATTACHMENT_EQUIP", "HUD_AMMO_SHOP_SOUNDSET", true, 0, false);
  alt.emitServer("Give:WeaponComp", weapId, compId)
   } 
  else {
    if((money.cash + money.bank) > price){
      native.playSound(-1, "WEAPON_ATTACHMENT_EQUIP", "HUD_AMMO_SHOP_SOUNDSET", true, 0, false);
      alt.emitServer("Buy:WeaponComp", weapId, compId)
    alt.emit('buy', price);
    } else {handletext('NOT ENOUGH MONEY!')}
  }
};


let bags;

alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
    let shop = getMeta('ammu');
    let ammu = getMeta(shop);
    if(ammu == 1) {
    money = getMeta('money');
    level = alt.Player.local.getSyncedMeta('rank')

      if(Ammunation.Visible) {} 
      else {
        Ammunation.Open();
        setMeta(ammu, 2)
        let bag = native.getPedDrawableVariation(alt.Player.local.scriptID, 5);
            if(bag == 40 || bag == 44 || bag == 81 || bag == 85 ) {
              bags = 1
            } else {
              bags = 0
            }
      }
    }
	}
});


alt.on(EventNames.ToggleMenu, () => {
    Ammunation.Visible = !Ammunation.Visible;
});

alt.on('setplayerweapon', setplayerweapon);

alt.onServer('saveweapon', (weapId)=>{
  saveweapon(weapId);
});

function handletext(text) {
  native.beginTextCommandDisplayHelp("STRING");
  native.addTextComponentSubstringKeyboardDisplay(text);
  native.endTextCommandDisplayHelp(0, 0, true, 6000);
}

function Armor(draw1, text1, draw2, text2) {
  const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
  native.playSound(0, "WEAPON_PURCHASE", "HUD_AMMO_SHOP_SOUNDSET", true, 0, false);
  if(pedmodel==false) {
      native.setPedComponentVariation(alt.Player.local.scriptID, 8, draw2, text2, 0);
  } else {
      if (pedmodel==true) {
          native.setPedComponentVariation(alt.Player.local.scriptID, 8, draw1, text1, 0);
}}};

function drawtext(msg, x, y, font, scale, wrap, r, g, b, a,) {
  native.beginTextCommandDisplayText('STRING');
  native.addTextComponentSubstringPlayerName(msg);
  native.setTextFont(font);
  native.setTextOutline();
  native.setTextScale(1, scale);
  native.setTextWrap(0.0, wrap);
  native.setTextCentre(true);
  native.setTextColour(r,g,b,a);
  native.setTextJustification(0);
  native.setTextDropShadow(true);
  native.endTextCommandDisplayText(x, y, 0);
  
}