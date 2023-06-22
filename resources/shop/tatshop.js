import * as alt from 'alt-client';
import { getMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import * as game from 'natives';
import * as NativeUI from './NativeUI/NativeUi.js';
import { overlaylist } from './overlays.js';



// THIS CAN YOU EDIT
const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    TitleScale: 0.8,
    TitleFont: NativeUI.Font.HouseScript,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
}

const EventNames = {
    ToggleMenu: "Tattoo:Menu",
}

const MenuText = {
    MenuTitle: "",
    MenuSubTitle: "",
    sprite: "shopui_title_tattoos2",
}

const MaxListItems = 800;


// DO NOT EDIT
const TattooShop = new NativeUI.Menu(MenuText.MenuTitle, "~y~CATEGORIES~y~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
TattooShop.Visible = false;
TattooShop.GetTitle().Scale = MenuSettings.TitleScale,
TattooShop.GetTitle().Font = MenuSettings.TitleFont;
TattooShop.GetTitle().DropShadow = MenuSettings.DropShadow;
TattooShop.GetTitle().TextAlignment = MenuSettings.TextAlignment;
TattooShop.CloseableByUser = false;

// ========================================================================================================
// Tattoo

let HeadItem = new NativeUI.UIMenuItem("HEAD", "");
let HeadMenu = new NativeUI.Menu(MenuText.MenuTitle, "~y~HEAD~y~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
HeadMenu.GetTitle().Scale = MenuSettings.TitleScale;
HeadMenu.GetTitle().Font = MenuSettings.TitleFont;
HeadMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
HeadMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;

let TorsoItem = new NativeUI.UIMenuItem("TORSO", "");
let TorsoMenu = new NativeUI.Menu(MenuText.MenuTitle, "~y~TORSO~y~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);

let LeftArmItem = new NativeUI.UIMenuItem("LEFT ARM", "");
let LeftArmMenu = new NativeUI.Menu(MenuText.MenuTitle, "~y~LEFT ARM~y~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);

let RightArmItem = new NativeUI.UIMenuItem("RIGHT ARM", "");
let RightArmMenu = new NativeUI.Menu(MenuText.MenuTitle, "~y~RIGHT ARM~y~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);

let LeftLegItem = new NativeUI.UIMenuItem("LEFT LEG", "");
let LeftLegMenu = new NativeUI.Menu(MenuText.MenuTitle, "~y~LEFT LEG~y~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);

let RightLegItem = new NativeUI.UIMenuItem("RIGHT LEG", "");
let RightLegMenu = new NativeUI.Menu(MenuText.MenuTitle, "~y~RIGHT LEG~y~", MenuSettings.Point, MenuText.sprite, MenuText.sprite);

const tat = overlaylist.filter(function(type){
    return type.Type == 'TYPE_TATTOO';
});

const headm = tat.filter(function(genre){
    return genre.Gender == 'GENDER_MALE';
});

const headf = tat.filter(function(genre){
    return genre.Gender == 'GENDER_FEMALE';
});

const headd = tat.filter(function(genre){
    return genre.Gender == 'GENDER_DONTCARE';
})

let ftat = headf.concat(headd);
let mtat = headm.concat(headd);

const headtatf = ftat.filter(function(zone){
    return zone.ZoneName == 'ZONE_HEAD';
});

const headtatm = mtat.filter(function(zone){
    return zone.ZoneName == 'ZONE_HEAD';
});

const torsof = ftat.filter(function(zone){
    return zone.ZoneName == 'ZONE_TORSO';
});

const torsom = mtat.filter(function(zone){
    return zone.ZoneName == 'ZONE_TORSO';
});

const larmf = ftat.filter(function(zone){
    return zone.ZoneName == 'ZONE_LEFT_ARM';
});

const larmm = mtat.filter(function(zone){
    return zone.ZoneName == 'ZONE_LEFT_ARM';
});

const rarmf = ftat.filter(function(zone){
    return zone.ZoneName == 'ZONE_RIGHT_ARM';
});

const rarmm = mtat.filter(function(zone){
    return zone.ZoneName == 'ZONE_RIGHT_ARM';
});

const llegf = ftat.filter(function(zone){
    return zone.ZoneName == 'ZONE_LEFT_LEG';
});

const llegm = mtat.filter(function(zone){
    return zone.ZoneName == 'ZONE_LEFT_LEG';
});

const rlegf = ftat.filter(function(zone){
    return zone.ZoneName == 'ZONE_RIGHT_LEG';
});

const rlegm = mtat.filter(function(zone){
    return zone.ZoneName == 'ZONE_RIGHT_LEG';
});

let price;
// ========================================================================================================
TattooShop.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "HEAD") {
        HeadMenu.Clear();
        const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
    if(pedmodel == false){
        let HeadItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, headtatf.length-1, 0, headtatf);
HeadMenu.AddItem(HeadItem);
HeadMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    native.clearPedDecorations(alt.Player.local.scriptID);
    let SelectedT = headtatf[selectedItemIndex];
    let coll = SelectedT.CollectionHash;
    let tattoo = SelectedT.OverlayHash;
    price = SelectedT.Price;
    settattoo(coll, tattoo);
    setMeta('colh',coll); setMeta('ovl',tattoo);
});
        } else if(pedmodel == true){
  let HeadItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, headtatm.length-1, 0, headtatm);
  HeadMenu.AddItem(HeadItem);
  HeadMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    native.clearPedDecorations(alt.Player.local.scriptID);
      let SelectedT = headtatm[selectedItemIndex];
      let coll = SelectedT.CollectionHash;
      let tattoo = SelectedT.OverlayHash;
      price = SelectedT.Price;
      settattoo(coll, tattoo);
      setMeta('colh',coll); setMeta('ovl',tattoo);
  });
}
let Head1 = new NativeUI.UIMenuItem("Purchase Tattoo 1", "Save up to 3 Tattoos for difference places");
HeadMenu.AddItem(Head1);
HeadMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 1") {
        let head = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('headt1', head);
}});
let Head2 = new NativeUI.UIMenuItem("Purchase Tattoo 2", "Save up to 3 Tattoos for difference places");
HeadMenu.AddItem(Head2);
HeadMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 2") {
        let head = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('headt2', head);
}});
let Head3 = new NativeUI.UIMenuItem("Purchase Tattoo 3", "Save up to 3 Tattoos for difference places");
HeadMenu.AddItem(Head3);
HeadMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 3") {
        let head = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('headt3', head);
}});
}});

TattooShop.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "TORSO") {
        TorsoMenu.Clear();
        const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
    if(pedmodel == false){
        let TorsoItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, torsof.length-1, 0, torsof);
TorsoMenu.AddItem(TorsoItem);
TorsoMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    native.clearPedDecorations(alt.Player.local.scriptID);
    let SelectedT = torsof[selectedItemIndex];
    let coll = SelectedT.CollectionHash;
    let tattoo = SelectedT.OverlayHash;
    price = SelectedT.Price;
    settattoo(coll, tattoo);
    setMeta('colh',coll); setMeta('ovl',tattoo);
});
        } else if(pedmodel == true){
  let TorsoItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, torsom.length-1, 0, torsom);
  TorsoMenu.AddItem(TorsoItem);
  TorsoMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    native.clearPedDecorations(alt.Player.local.scriptID);
      let SelectedT = torsom[selectedItemIndex];
      let coll = SelectedT.CollectionHash;
      let tattoo = SelectedT.OverlayHash;
      price = SelectedT.Price;
      settattoo(coll, tattoo);
      setMeta('colh',coll); setMeta('ovl',tattoo);
  });
}
let Torso1 = new NativeUI.UIMenuItem("Purchase Tattoo 1", "Save up to 3 Tattoos for difference places");
TorsoMenu.AddItem(Torso1);
TorsoMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 1") {
        let Torso = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('Torsot1', Torso);
}});
let Torso2 = new NativeUI.UIMenuItem("Purchase Tattoo 2", "Save up to 3 Tattoos for difference places");
TorsoMenu.AddItem(Torso2);
TorsoMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 2") {
        let Torso = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('Torsot2', Torso);
}});
let Torso3 = new NativeUI.UIMenuItem("Purchase Tattoo 3", "Save up to 3 Tattoos for difference places");
TorsoMenu.AddItem(Torso3);
TorsoMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 3") {
        let Torso = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('Torsot3', Torso);
}});
}});

TattooShop.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "LEFT ARM") {
        LeftArmMenu.Clear();
        const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
        if(pedmodel == false){
            let LeftArmItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, larmf.length-1, 0, larmf);
LeftArmMenu.AddItem(LeftArmItem);
LeftArmMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    native.clearPedDecorations(alt.Player.local.scriptID);
    let SelectedT = larmf[selectedItemIndex];
    let coll = SelectedT.CollectionHash;
    let tattoo = SelectedT.OverlayHash;
    price = SelectedT.Price;
    settattoo(coll, tattoo);
    setMeta('colh',coll); setMeta('ovl',tattoo);
});
        } else if(pedmodel == true){
  let LeftArmItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, larmm.length-1, 0, larmm);
  LeftArmMenu.AddItem(LeftArmItem);
  LeftArmMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    native.clearPedDecorations(alt.Player.local.scriptID);
      let SelectedT = larmm[selectedItemIndex];
      let coll = SelectedT.CollectionHash;
      let tattoo = SelectedT.OverlayHash;
      price = SelectedT.Price;
      settattoo(coll, tattoo);
      setMeta('colh',coll); setMeta('ovl',tattoo);
  });
}
let LeftArm1 = new NativeUI.UIMenuItem("Purchase Tattoo 1", "Save up to 3 Tattoos for difference places");
LeftArmMenu.AddItem(LeftArm1);
LeftArmMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 1") {
        let LeftArm = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('LeftArmt1', LeftArm);
}});
let LeftArm2 = new NativeUI.UIMenuItem("Purchase Tattoo 2", "Save up to 3 Tattoos for difference places");
LeftArmMenu.AddItem(LeftArm2);
LeftArmMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 2") {
        let LeftArm = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('LeftArmt2', LeftArm);
}});
let LeftArm3 = new NativeUI.UIMenuItem("Purchase Tattoo 3", "Save up to 3 Tattoos for difference places");
LeftArmMenu.AddItem(LeftArm3);
LeftArmMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 3") {
        let LeftArm = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('LeftArmt3', LeftArm);
}});
}});

TattooShop.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "RIGHT ARM") {
        RightArmMenu.Clear();
        const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
        if(pedmodel == false){
            let RightArmItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, rarmf.length-1, 0, rarmf);
RightArmMenu.AddItem(RightArmItem);
RightArmMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    native.clearPedDecorations(alt.Player.local.scriptID);
    let SelectedT = rarmf[selectedItemIndex];
    let coll = SelectedT.CollectionHash;
    let tattoo = SelectedT.OverlayHash;
    price = SelectedT.Price;
    settattoo(coll, tattoo);
    setMeta('colh',coll); setMeta('ovl',tattoo);
});
        } else if(pedmodel == true){
  let RightArmItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, rarmm.length-1, 0, rarmm);
  RightArmMenu.AddItem(RightArmItem);
  RightArmMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    native.clearPedDecorations(alt.Player.local.scriptID);
      let SelectedT = rarmm[selectedItemIndex];
      let coll = SelectedT.CollectionHash;
      let tattoo = SelectedT.OverlayHash;
      price = SelectedT.Price;
      settattoo(coll, tattoo);
      setMeta('colh',coll); setMeta('ovl',tattoo);
  });
}
let RightArm1 = new NativeUI.UIMenuItem("Purchase Tattoo 1", "Save up to 3 Tattoos for difference places");
RightArmMenu.AddItem(RightArm1);
RightArmMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 1") {
        let RightArm = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('RightArmt1', RightArm);
}});
let RightArm2 = new NativeUI.UIMenuItem("Purchase Tattoo 2", "Save up to 3 Tattoos for difference places");
RightArmMenu.AddItem(RightArm2);
RightArmMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 2") {
        let RightArm = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('RightArmt2', RightArm);
}});
let RightArm3 = new NativeUI.UIMenuItem("Purchase Tattoo 3", "Save up to 3 Tattoos for difference places");
RightArmMenu.AddItem(RightArm3);
RightArmMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 3") {
        let RightArm = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('RightArmt3', RightArm);
}});
}});

TattooShop.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "LEFT LEG") {
        LeftLegMenu.Clear();
        const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
        if(pedmodel == false){
            let LeftLegItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, llegf.length-1, 0, llegf);
LeftLegMenu.AddItem(LeftLegItem);
LeftLegMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    native.clearPedDecorations(alt.Player.local.scriptID);
    let SelectedT = llegf[selectedItemIndex];
    let coll = SelectedT.CollectionHash;
    let tattoo = SelectedT.OverlayHash;
    price = SelectedT.Price;
    settattoo(coll, tattoo);
    setMeta('colh',coll); setMeta('ovl',tattoo);
});
        } else if(pedmodel == true){
  let LeftLegItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, llegm.length-1, 0, llegm);
  LeftLegMenu.AddItem(LeftLegItem);
  LeftLegMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
      let SelectedT = llegm[selectedItemIndex];
      let coll = SelectedT.CollectionHash;
      let tattoo = SelectedT.OverlayHash;
      price = SelectedT.Price;
      native.clearPedDecorations(alt.Player.local.scriptID);
      settattoo(coll, tattoo);
      setMeta('colh',coll); setMeta('ovl',tattoo);
  });
}
let LeftLeg1 = new NativeUI.UIMenuItem("Purchase Tattoo 1", "Save up to 3 Tattoos for difference places");
LeftLegMenu.AddItem(LeftLeg1);
LeftLegMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 1") {
        let LeftLeg = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('LeftLegt1', LeftLeg);
}});
let LeftLeg2 = new NativeUI.UIMenuItem("Purchase Tattoo 2", "Save up to 3 Tattoos for difference places");
LeftLegMenu.AddItem(LeftLeg2);
LeftLegMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 2") {
        let LeftLeg = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('LeftLegt2', LeftLeg);
}});
let LeftLeg3 = new NativeUI.UIMenuItem("Purchase Tattoo 3", "Save up to 3 Tattoos for difference places");
LeftLegMenu.AddItem(LeftLeg3);
LeftLegMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 3") {
        let LeftLeg = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('LeftLegt3', LeftLeg);
}});
}});

TattooShop.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "RIGHT LEG") {
        RightLegMenu.Clear();
        const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
        if(pedmodel == false){
            let RightLegItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, rlegf.length-1, 0, rlegf);
RightLegMenu.AddItem(RightLegItem);
RightLegMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let SelectedT = rlegf[selectedItemIndex];
    let coll = SelectedT.CollectionHash;
    let tattoo = SelectedT.OverlayHash;
    price = SelectedT.Price;
    native.clearPedDecorations(alt.Player.local.scriptID);
    settattoo(coll, tattoo);
    setMeta('colh',coll); setMeta('ovl',tattoo);
});
        } else if(pedmodel == true){
  let RightLegItem = new NativeUI.UIMenuAutoListItem("Choose Tattoos", "", 0, rlegm.length-1, 0, rlegm);
  RightLegMenu.AddItem(RightLegItem);
  RightLegMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
      let SelectedT = rlegm[selectedItemIndex];
      let coll = SelectedT.CollectionHash;
      let tattoo = SelectedT.OverlayHash;
      price = SelectedT.Price;
      native.clearPedDecorations(alt.Player.local.scriptID);
      settattoo(coll, tattoo);
      setMeta('colh',coll); setMeta('ovl',tattoo);
  });
}
let RightLeg1 = new NativeUI.UIMenuItem("Purchase Tattoo 1", "Save up to 3 Tattoos for difference places");
RightLegMenu.AddItem(RightLeg1);
RightLegMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 1") {
        let RightLeg = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('RightLegt1', RightLeg);
}});
let RightLeg2 = new NativeUI.UIMenuItem("Purchase Tattoo 2", "Save up to 3 Tattoos for difference places");
RightLegMenu.AddItem(RightLeg2);
RightLegMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 2") {
        let RightLeg = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('RightLegt2', RightLeg);
}});
let RightLeg3 = new NativeUI.UIMenuItem("Purchase Tattoo 3", "Save up to 3 Tattoos for difference places");
RightLegMenu.AddItem(RightLeg3);
RightLegMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Tattoo 3") {
        let RightLeg = {colh:getMeta('colh'), ovh:getMeta('ovl')}
        native.playSound(0, "PURCHASE", "HUD_FRONTEND_TATTOO_SHOP_SOUNDSET", true, 0, false);
        alt.emit('buy', Math.round(price/3))
        setMeta('RightLegt3', RightLeg);
}});
}});
// ========================================================================================================
// Event Section

let CloseItem = new NativeUI.UIMenuItem("~y~DONE~y~", MenuText.Description);
TattooShop.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "~y~DONE~y~") {
    TattooShop.Close(true);
    const outfit = alt.LocalStorage.get('outfit')
  game.setPedComponentVariation(alt.Player.local.scriptID, 3, outfit.Torso, outfit.Torso1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 4, outfit.Legs, outfit.Legs1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 6, outfit.Shoe, outfit.Shoe1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 8, outfit.Und, outfit.Und1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 9, outfit.Acc, outfit.Acc1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 10, outfit.Decals, outfit.Decals1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 11, outfit.Tops, outfit.Tops1, 0);
  let headt1 = getMeta('headt1'); if(headt1.colh >= 0) {settattoo(headt1.colh,headt1.ovh);} else return;
  let headt2 = getMeta('headt2'); if(headt2.colh >= 0) {settattoo(headt2.colh,headt2.ovh);} else return;
  let headt3 = getMeta('headt3'); if(headt3.colh >=0) {settattoo(headt3.colh,headt3.ovh);} else return;
  let torsot1 = getMeta('Torsot1'); if(torsot1.colh >=0) {settattoo(torsot1.colh,torsot1.ovh);} else return;
  let torsot2 = getMeta('Torsot2'); if(torsot2.colh >=0) {settattoo(torsot2.colh,torsot2.ovh);} else return;
  let torsot3 = getMeta('Torsot3'); if(torsot3.colh >=0) {settattoo(torsot3.colh,torsot3.ovh);} else return;
  let larm1 = getMeta('LeftArmt1'); if(larm1.colh >=0) {settattoo(larm1.colh,larm1.ovh);} else return;
  let larm2 = getMeta('LeftArmt2'); if(larm2.colh >=0) {settattoo(larm2.colh,larm2.ovh);} else return;
  let larm3 = getMeta('LeftArmt3'); if(larm3.colh >=0) {settattoo(larm3.colh,larm3.ovh);} else return;
  let rarm1 = getMeta('RightArmt1'); if(rarm1.colh >=0) {settattoo(rarm1.colh,rarm1.ovh);} else return;
  let rarm2 = getMeta('RightArmt2'); if(rarm2.colh >=0) {settattoo(rarm2.colh,rarm2.ovh);} else return;
  let rarm3 = getMeta('RightArmt3'); if(rarm2.colh >=0) {settattoo(rarm3.colh,rarm3.ovh);} else return;
  let lleg1 = getMeta('LeftLegt1'); if(lleg1.colh >=0) {settattoo(lleg1.colh,lleg1.ovh);} else return;
  let lleg2 = getMeta('LeftLegt2'); if(lleg2.colh >=0) {settattoo(lleg2.colh,lleg2.ovh);} else return;
  let lleg3 = getMeta('LeftLegt3'); if(lleg3.colh >=0) {settattoo(lleg3.colh,lleg3.ovh);} else return;
  let rleg1 = getMeta('RightLegt1'); if(rleg1.colh >=0) {settattoo(rleg1.colh,rleg1.ovh);} else return;
  let rleg2 = getMeta('RightLegt2'); if(rleg2.colh >=0) {settattoo(rleg2.colh,rleg2.ovh);} else return;
  let rleg3 = getMeta('RightLegt3'); if(rleg3.colh >=0) {settattoo(rleg3.colh,rleg3.ovh);} else return;
  alt.emit('savetattoo');
}});

function settattoo(colh, ovh){
    native.addPedDecorationFromHashes(alt.Player.local.scriptID, colh, ovh);
}

TattooShop.AddSubMenu(HeadMenu, HeadItem);
TattooShop.AddSubMenu(TorsoMenu, TorsoItem);
TattooShop.AddSubMenu(LeftArmMenu, LeftArmItem);
TattooShop.AddSubMenu(RightArmMenu, RightArmItem);
TattooShop.AddSubMenu(LeftLegMenu, LeftLegItem);
TattooShop.AddSubMenu(RightLegMenu, RightLegItem);
TattooShop.AddItem(CloseItem);

export function tattooshop() {
    let tatshop;
    alt.on("keydown", (key) => {
        if (key == "E".charCodeAt(0)) {
            let shop = getMeta('tattoo');
            tatshop = getMeta(shop);
            if(tatshop > 0) {
                setMeta(shop, 2)
                tattoomenu();
                }
            }
    });
}

function tattoomenu() {
    native.clearPedProp(alt.Player.local.scriptID, 0, 0);
    if(TattooShop.Visible | HeadMenu.Visible | TorsoMenu.Visible | LeftArmMenu.Visible | RightArmMenu.Visible | LeftLegMenu.Visible | RightLegMenu.Visible) {return }
    else {       
    TattooShop.Open();
    const outfit = { 
        Head : native.getPedDrawableVariation(alt.Player.local.scriptID, 0),
        Beard : native.getPedDrawableVariation(alt.Player.local.scriptID,1),
        Hair : native.getPedDrawableVariation(alt.Player.local.scriptID,2),
        Torso : native.getPedDrawableVariation(alt.Player.local.scriptID,3),
        Legs : native.getPedDrawableVariation(alt.Player.local.scriptID,4),
        Shoe : native.getPedDrawableVariation(alt.Player.local.scriptID,6),
        Und : native.getPedDrawableVariation(alt.Player.local.scriptID,8),
        Acc : native.getPedDrawableVariation(alt.Player.local.scriptID,9),
        Decals : native.getPedDrawableVariation(alt.Player.local.scriptID,10),
        Tops : native.getPedDrawableVariation(alt.Player.local.scriptID,11),
        Head1 : native.getPedTextureVariation(alt.Player.local.scriptID,0),
        Beard1 : native.getPedTextureVariation(alt.Player.local.scriptID,1),
        Hair1 : native.getPedTextureVariation(alt.Player.local.scriptID,2),
        Torso1 : native.getPedTextureVariation(alt.Player.local.scriptID,3),
        Legs1 : native.getPedTextureVariation(alt.Player.local.scriptID,4),
        Shoe1 : native.getPedTextureVariation(alt.Player.local.scriptID,6),
        Und1 : native.getPedTextureVariation(alt.Player.local.scriptID,8),
        Acc1 : native.getPedTextureVariation(alt.Player.local.scriptID,9),
        Decals1 : native.getPedTextureVariation(alt.Player.local.scriptID,10),
        Tops1 : native.getPedTextureVariation(alt.Player.local.scriptID,11),
    }
    alt.LocalStorage.set('outfit', outfit);
    alt.LocalStorage.save('outfit', outfit);
    game.setPedComponentVariation(alt.Player.local.scriptID, 3, 15, 0, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 4, 14, 0, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 8, 0, -1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 9, 0, -1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 10, 0, -1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 11, 15, 0, 0);
	let pedmodel = native.isPedModel(alt.Player.local.scriptID, alt.hash('mp_m_freemode_01'));
        if(pedmodel == false){
            game.setPedComponentVariation(alt.Player.local.scriptID, 6, 35, 0, 0);
        } else if(pedmodel == true){
            game.setPedComponentVariation(alt.Player.local.scriptID, 6, 34, 0, 0);  
    }
}};

alt.on(EventNames.ToggleMenu, () => {
    TattooShop.Visible = !TattooShop.Visible;
});

alt.onServer("Close:tattooMenu", () => {

});

alt.onServer("showTat", (text) => {
	game.beginTextCommandDisplayHelp("STRING");
	game.addTextComponentSubstringKeyboardDisplay(text);
	game.endTextCommandDisplayHelp(0, 0, true, -1);
});

let cameraControlsInterval;
let camera;
let zpos = 0;
let fov = 90;
let startPosition;
let startCamPosition;
let timeBetweenAnimChecks = Date.now() + 100;

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

