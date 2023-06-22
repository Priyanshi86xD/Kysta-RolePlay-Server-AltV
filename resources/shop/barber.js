import * as alt from 'alt-client';
import { getMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import * as NativeUI from './NativeUI/NativeUi.js';


// THIS CAN YOU EDIT
const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    TitleScale: 0.8,
    TitleFont: NativeUI.Font.HouseScript,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
}

const EventNames = {
    ToggleMenu: "Barber:Menu",
}

const MenuText = {
    MenuTitle: "",
    MenuSubTitle: "",
    Description: "Press 'Done' to Finish",
    HairStylesText: "Hair Styles",
    EyeBrowText: "Eye Brows",
    EyeText: "Eyes",
    FacialHairText: "Beard",
    sprite: "shopui_title_barber",
}

let price1 = 0, price2 = 0, price3 = 0, hair, eyeb, eye, beard, makeup, blush, lips

function barbershopmenu() {
const BarberShop = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
BarberShop.Visible = false;
BarberShop.GetTitle().Scale = MenuSettings.TitleScale,
BarberShop.GetTitle().Font = MenuSettings.TitleFont;
BarberShop.GetTitle().DropShadow = MenuSettings.DropShadow;
BarberShop.GetTitle().TextAlignment = MenuSettings.TextAlignment;
BarberShop.CloseableByUser = false;

// ========================================================================================================
// Hairs

let HairStylesItem = new NativeUI.UIMenuItem(MenuText.HairStylesText, MenuText.Description);
let HairStylesMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
HairStylesMenu.GetTitle().Scale = MenuSettings.TitleScale;
HairStylesMenu.GetTitle().Font = MenuSettings.TitleFont;
HairStylesMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
HairStylesMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
HairStylesMenu.CloseableByUser = false;
BarberShop.AddSubMenu(HairStylesMenu, HairStylesItem);

let HairDrawable = new NativeUI.UIMenuAutoListItem("Hair: ", "", 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 2), native.getPedDrawableVariation(alt.Player.local.scriptID, 2));
let Hair1Texture = new NativeUI.UIMenuAutoListItem("Color 1: ", "", 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 2, native.getPedDrawableVariation(alt.Player.local.scriptID, 2)), native.getPedTextureVariation(alt.Player.local.scriptID, 2));
let Hair2Texture = new NativeUI.UIMenuAutoListItem("Color 2: ", "", 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 2, native.getPedDrawableVariation(alt.Player.local.scriptID, 2)), native.getPedTextureVariation(alt.Player.local.scriptID, 2));

HairStylesMenu.AddItem(HairDrawable);
HairStylesMenu.AddItem(Hair1Texture);
HairStylesMenu.AddItem(Hair2Texture);

HairStylesMenu.AddItem(new NativeUI.UIMenuItem('Purchase',""));
HairStylesMenu.AddItem(new NativeUI.UIMenuItem('Cancel',""));

HairStylesMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = HairDrawable.SelectedValue;
    let texture1 = Hair1Texture.SelectedValue;
    let texture2 = Hair2Texture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 2, drawable, 0, 0);
    native.setPedHairTint(alt.Player.local.scriptID, texture1, texture2);
    hair = {hair1:drawable, hair2:texture1, hair3:texture2}
    
    if(drawable >= 1) {
        price1 = 200
    }
    if(texture1 >=1) {
        price2 = 150
    }
    if(texture2 >=1) {
        price3 = 150
    }
});

HairStylesMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
    HairStylesMenu.Close(true);
    setMeta('hair', hair);
    alt.emit('savehead');
    alt.emit('buy', price1+price2+price3)
    price1 = 0, price2 = 0, price3 = 0
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        HairStylesMenu.Close(true);
        alt.emit('loadhead');
        price1 = 0, price2 = 0, price3 = 0
    }
});


// ========================================================================================================
// Eyebrow

let EyebrowItem = new NativeUI.UIMenuItem(MenuText.EyeBrowText, MenuText.Description);
let EyebrowMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
EyebrowMenu.GetTitle().Scale = MenuSettings.TitleScale;
EyebrowMenu.GetTitle().Font = MenuSettings.TitleFont;
EyebrowMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
EyebrowMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
EyebrowMenu.CloseableByUser = false
BarberShop.AddSubMenu(EyebrowMenu, EyebrowItem);

let EyebrowDrawable = new NativeUI.UIMenuAutoListItem("Eyebrow: ", "", 0, 34, 0, 0);
let EyebrowTexture = new NativeUI.UIMenuAutoListItem("Color: ", "", 0, 64, 0, 0);

EyebrowMenu.AddItem(EyebrowDrawable);
EyebrowMenu.AddItem(EyebrowTexture);

EyebrowMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = EyebrowDrawable.SelectedValue;
    let texture1 = EyebrowTexture.SelectedValue;

    native.setPedHeadOverlay(alt.Player.local.scriptID, 2, drawable, 1);
    native.setPedHeadOverlayTint(alt.Player.local.scriptID, 2, 1, texture1, 0);
    eyeb = {eyeb1:drawable, eyeb2:texture1}

    if(drawable >= 1) {
        price1 = 150
    }
    if(texture1 >=1) {
        price2 = 100
    }
});

EyebrowMenu.AddItem(new NativeUI.UIMenuItem('Purchase',""));
EyebrowMenu.AddItem(new NativeUI.UIMenuItem('Cancel',""));

EyebrowMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
    EyebrowMenu.Close();
    setMeta('eyeb', eyeb);
    alt.emit('savehead');
    alt.emit('buy', price1+price2+price3)
    price1 = 0, price2 = 0, price3 = 0
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        EyebrowMenu.Close();
        alt.emit('loadhead');
        price1 = 0, price2 = 0, price3 = 0
    }
});

// ========================================================================================================
// Eyes

let EyeItem = new NativeUI.UIMenuItem(MenuText.EyeText, MenuText.Description);
let EyeMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
EyeMenu.GetTitle().Scale = MenuSettings.TitleScale;
EyeMenu.GetTitle().Font = MenuSettings.TitleFont;
EyeMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
EyeMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
EyeMenu.CloseableByUser = false
BarberShop.AddSubMenu(EyeMenu, EyeItem);

let EyeTexture = new NativeUI.UIMenuAutoListItem("Eye Color: ", "", 0, 32, 0, 0);
EyeMenu.AddItem(EyeTexture);

EyeMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let texture = EyeTexture.SelectedValue;

    native.setHeadBlendEyeColor(alt.Player.local.scriptID, texture);
    eye = texture
    if(texture >= 1) {
        price1 = 300
    }
    
});

EyeMenu.AddItem(new NativeUI.UIMenuItem('Purchase',""));
EyeMenu.AddItem(new NativeUI.UIMenuItem('Cancel',""));

EyeMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
    EyeMenu.Close();
    setMeta('eye', eye);
    alt.emit('savehead');
    alt.emit('buy', price1+price2+price3)
    price1 = 0, price2 = 0, price3 = 0
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        EyeMenu.Close();
        alt.emit('loadhead');
        price1 = 0, price2 = 0, price3 = 0
    }
});

// ========================================================================================================
// FacialHairs

let FacialHairItem = new NativeUI.UIMenuItem(MenuText.FacialHairText, MenuText.Description);
let FacialHairMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
FacialHairMenu.GetTitle().Scale = MenuSettings.TitleScale;
FacialHairMenu.GetTitle().Font = MenuSettings.TitleFont;
FacialHairMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
FacialHairMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
FacialHairMenu.CloseableByUser = false

let model = native.getEntityModel(alt.Player.local.scriptID);
if(model == alt.hash("mp_m_freemode_01")) {
    BarberShop.AddSubMenu(FacialHairMenu, FacialHairItem);
} 

let FacialHairDrawable = new NativeUI.UIMenuAutoListItem("Beard Style: ", "", -1, 28, 0, 0);
let FacialHairTexture = new NativeUI.UIMenuAutoListItem("Color: ", "", 0, 63, 0, 0);
FacialHairMenu.AddItem(FacialHairDrawable);
FacialHairMenu.AddItem(FacialHairTexture);

FacialHairMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = FacialHairDrawable.SelectedValue;
    let texture = FacialHairTexture.SelectedValue;

    native.setPedHeadOverlay(alt.Player.local.scriptID, 1, drawable, 1.0);
    native.setPedHeadOverlayTint(alt.Player.local.scriptID, 1, 1, texture, texture);
    beard = {beard1:drawable, beard2:texture}
    if(drawable >= 1) {
        price1 = 200
    }
    if(texture >=1) {
        price2 = 150
    }
});

FacialHairMenu.AddItem(new NativeUI.UIMenuItem('Purchase',""));
FacialHairMenu.AddItem(new NativeUI.UIMenuItem('Cancel',""));

FacialHairMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        FacialHairMenu.Close();
        setMeta('beard', beard);
    alt.emit('savehead');
    alt.emit('buy', price1+price2+price3)
    price1 = 0, price2 = 0, price3 = 0
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        FacialHairMenu.Close();
        alt.emit('loadhead');
        price1 = 0, price2 = 0, price3 = 0
    }
});

// ========================================================================================================
// MakeUp

let MakeUpItem = new NativeUI.UIMenuItem("Make Up", MenuText.Description);
let MakeUpMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
MakeUpMenu.CloseableByUser = false
BarberShop.AddSubMenu(MakeUpMenu, MakeUpItem);

let MakeUpDrawable = new NativeUI.UIMenuAutoListItem("Make Up: ", "", -1, 74, 0, 0);
let MakeUpTexture = new NativeUI.UIMenuAutoListItem("Color: ", "", 0, 63, 0, 0);

MakeUpMenu.AddItem(MakeUpDrawable);
MakeUpMenu.AddItem(MakeUpTexture);

MakeUpMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = MakeUpDrawable.SelectedValue;
    let texture = MakeUpTexture.SelectedValue;

    native.setPedHeadOverlay(alt.Player.local.scriptID, 4, drawable, 1.0);
    native.setPedHeadOverlayTint(alt.Player.local.scriptID, 4, 2, texture, texture);
    makeup = {makeup1:drawable, makeup2:texture}
    if(drawable >= 1) {
        price1 = 200
    }
    if(texture >=1) {
        price2 = 150
    }
    
});

MakeUpMenu.AddItem(new NativeUI.UIMenuItem('Purchase',""));
MakeUpMenu.AddItem(new NativeUI.UIMenuItem('Cancel',""));

MakeUpMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        MakeUpMenu.Close();
        setMeta('makeup', makeup);
    alt.emit('savehead');
    alt.emit('buy', price1+price2+price3)
    price1 = 0, price2 = 0, price3 = 0
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        MakeUpMenu.Close();
        alt.emit('loadhead');
        price1 = 0, price2 = 0, price3 = 0
    }
});

// ========================================================================================================
// Blush

let BlushItem = new NativeUI.UIMenuItem('Blush', MenuText.Description);
let BlushMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
BlushMenu.GetTitle().Scale = MenuSettings.TitleScale;
BlushMenu.GetTitle().Font = MenuSettings.TitleFont;
BlushMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
BlushMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
BlushMenu.CloseableByUser = false
BarberShop.AddSubMenu(BlushMenu, BlushItem);

let BlushDrawable = new NativeUI.UIMenuAutoListItem("Blush: ", "", -1, 7, 0, 0);
let BlushTexture = new NativeUI.UIMenuAutoListItem("Color: ", "", 0, 63, 0, 0);

BlushMenu.AddItem(BlushDrawable);
BlushMenu.AddItem(BlushTexture);

BlushMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = BlushDrawable.SelectedValue;
    let texture = BlushTexture.SelectedValue;

    native.setPedHeadOverlay(alt.Player.local.scriptID, 5, drawable, 1.0);
    native.setPedHeadOverlayTint(alt.Player.local.scriptID, 5, 2, texture, texture);
    blush = {blush1:drawable, blush2:texture}
    if(drawable >= 1) {
        price1 = 250
    }

});

BlushMenu.AddItem(new NativeUI.UIMenuItem('Purchase',""));
BlushMenu.AddItem(new NativeUI.UIMenuItem('Cancel',""));

BlushMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        BlushMenu.Close();
        setMeta('blush', blush);
    alt.emit('savehead');
    alt.emit('buy', price1+price2+price3)
    price1 = 0, price2 = 0, price3 = 0
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        BlushMenu.Close();
        alt.emit('loadhead');
        price1 = 0, price2 = 0, price3 = 0
    }
});

// ========================================================================================================
// Lipstick

let LipstickItem = new NativeUI.UIMenuItem('Lipstick', MenuText.Description);
let LipstickMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
LipstickMenu.GetTitle().Scale = MenuSettings.TitleScale;
LipstickMenu.GetTitle().Font = MenuSettings.TitleFont;
LipstickMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
LipstickMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
LipstickMenu.CloseableByUser = false
BarberShop.AddSubMenu(LipstickMenu, LipstickItem);

let LipstickDrawable = new NativeUI.UIMenuAutoListItem("Lipstick: ", "", -1, 9, 0, 0);
let LipstickTexture = new NativeUI.UIMenuAutoListItem("Color: ", "", 0, 63, 0, 0);

LipstickMenu.AddItem(LipstickDrawable);
LipstickMenu.AddItem(LipstickTexture);

LipstickMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = LipstickDrawable.SelectedValue;
    let texture = LipstickTexture.SelectedValue;

    native.setPedHeadOverlay(alt.Player.local.scriptID, 8, drawable, 1.0);
    native.setPedHeadOverlayTint(alt.Player.local.scriptID, 8, 2, texture, texture);
    lips = {lips1:drawable, lips2:texture}
    if(drawable >= 1) {
        price1 = 250
    }
});

LipstickMenu.AddItem(new NativeUI.UIMenuItem('Purchase',""));
LipstickMenu.AddItem(new NativeUI.UIMenuItem('Cancel',""));

LipstickMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        LipstickMenu.Close();
        setMeta('lips', lips);
    alt.emit('savehead');
    alt.emit('buy', price1+price2+price3)
    price1 = 0, price2 = 0, price3 = 0
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        LipstickMenu.Close();
        alt.emit('loadhead');
        price1 = 0, price2 = 0, price3 = 0
    }
});
// ========================================================================================================
// Event Section



BarberShop.Open()

let CloseItem = new NativeUI.UIMenuItem("Finish & Close", MenuText.Description);
BarberShop.AddItem(CloseItem);
BarberShop.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Finish & Close") {
    BarberShop.Close(true);
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
    destroyPedEditCamera();
    //alt.emit('savehead');
    }
});
}

export function barbermenu() {
    alt.on("keydown", (key) => {
        if (key == "E".charCodeAt(0)) {
            let shop = getMeta('barber');
            let barber = getMeta(shop);
            if(barber == 1) {
                //BarberShop.Open()
                barbershopmenu()
                native.clearPedProp(alt.Player.local.scriptID, 0,0)
                native.setPedComponentVariation(alt.Player.local.scriptID, 1, 0, 0, 0);
                setMeta(barber, 2)
                createPedEditCamera();
        setFov(30);
        setZPos(0.6);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);
                
            }
        }
    });
}



alt.on(EventNames.ToggleMenu, () => {
    BarberShop.Visible = !BarberShop.Visible;
});

let camera;
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