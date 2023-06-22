import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from './NativeUI/NativeUi.js';
import * as natives from 'natives';
import * as game from 'natives';
import { getMeta, setMeta } from 'alt-client';
import { drawtext } from './client.js';

let pedmodel

// THIS CAN YOU EDIT
const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    TitleScale: 0.8,
    TitleFont: NativeUI.Font.HouseScript,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
}

const EventNames = {
    ToggleMenu: "Clothes:Menu",
}

const MenuText = {
    MenuTitle: "",
    MenuSubTitle: "",
    sprite : "shopui_title_midfashion",
    
    MaskenText: "Masks",
    TopText: "Tops",
    UndershirtText: "Undershirt",
    TorsosText: "GLOVES",
    LegsText: "Pants",
    ShoeText: "Shoes",
    BagandParachuteText: "Bag and Parachute",
    AccessoriesText: "Accessories",
    HatText: "Hats",
    GlassesText: "Glasses",
    EarsText: "Ears",
    WatchesText: "Watches",
    BraceletsText: "Bracelets",
    BodyArmorText: "Body Armor",
    DecalsText: "Decal",

}

const MaxListItems = 800;

// DO NOT EDIT
const ClothesShop = new NativeUI.Menu(MenuText.MenuTitle,"CATEGORIES", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
ClothesShop.Visible = false;
ClothesShop.GetTitle().Scale = MenuSettings.TitleScale,
ClothesShop.GetTitle().Font = MenuSettings.TitleFont;
ClothesShop.GetTitle().DropShadow = MenuSettings.DropShadow;
ClothesShop.GetTitle().TextAlignment = MenuSettings.TextAlignment;

// ========================================================================================================
// Outfit

let OFItem = new NativeUI.UIMenuItem("Outfits", "");
let OFMenu = new NativeUI.Menu(MenuText.MenuTitle, "OUTFITS", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
ClothesShop.AddSubMenu(OFMenu, OFItem);

let OF1Item = new NativeUI.UIMenuItem("Impotent Rage", "");
OFMenu.AddItem(OF1Item)
OFMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Impotent Rage") {
        giveoutfit(304, 0, 148, 0, 209, 0, 186, 0, 122, 0, 95, 0, 0, -1,
            291, 0, 148, 0, 168, 0, 145, 0, 115, 0, 91, 0, 0, -1)
            native.clearPedProp(alt.Player.local.scriptID, 0, 0);
            ClothesShop.Close(true);
            buymenu("Impotent Rage", 100000)
}});

let OF2Item = new NativeUI.UIMenuItem("Epsilon Robe", "");
OFMenu.AddItem(OF2Item)
OFMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Epsilon Robe") {
        giveoutfit(285, 0, 0, -1, 3, 0, 0, -1, 111, 0, 92, 0, 99, 0,
            272, 0, 0, -1, 1,0, 0, -1, 104, 0, 88, 0, 129, 0)
            native.clearPedProp(alt.Player.local.scriptID, 0, 0);
            ClothesShop.Close(true);
            buymenu("Epsilon Robe", 120000)
    }});

let OF3Item = new NativeUI.UIMenuItem("Tron Outfit", "");
OFMenu.AddItem(OF3Item)
let OF3Menu = new NativeUI.Menu(MenuText.MenuTitle, "TRON OUTFITS", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
OF3Menu.CloseableByUser =false;
OFMenu.AddSubMenu(OF3Menu, OF3Item);

let TronTexture = new NativeUI.UIMenuAutoListItem("TRON Outfit Color: ", "", 0, 10, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
OF3Menu.AddItem(TronTexture);

OF3Menu.AddItem(new NativeUI.UIMenuItem("Purchase outfit", ""))
OF3Menu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase outfit") {
        ClothesShop.Close(true)
        buymenu("Tron Outfit", 150000)
    }
})
OF3Menu.AddItem(new NativeUI.UIMenuItem("Back", ""))
OF3Menu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
        alt.emit('loadoutfit', 'default')
        OF3Menu.Close();
    }
})
OF3Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let texture = TronTexture.SelectedValue;
    giveoutfit(180, texture, 0, -1, 111, 0, 0, -1, 79, texture, 58, texture, 0, -1,
       178, texture, 0, -1, 179, 0, 0, -1, 77, texture, 55, texture, 0, -1)
        native.clearPedProp(alt.Player.local.scriptID, 0, 0);
    giveprop(0, 90, texture, 0, 91, texture)
});


let OF4Item = new NativeUI.UIMenuItem("Arena War Outfit", "");
OFMenu.AddItem(OF4Item)
let OF4Menu = new NativeUI.Menu(MenuText.MenuTitle, "ARENA WAR OUTFITS", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
OFMenu.AddSubMenu(OF4Menu, OF4Item);
let AW1Texture = new NativeUI.UIMenuAutoListItem("Variations: ", "", 0, 11, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
let AW2Texture = new NativeUI.UIMenuAutoListItem("Shoes: ", "", 0, 7, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
let AW3Texture = new NativeUI.UIMenuAutoListItem("Style (male) : ", "", 275, 276, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
let AW4Texture = new NativeUI.UIMenuAutoListItem("Style (female) : ", "", 288, 289, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
OF4Menu.AddItem(AW3Texture);
OF4Menu.AddItem(AW4Texture);
OF4Menu.AddItem(AW1Texture);
OF4Menu.AddItem(AW2Texture);
OF4Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let texture = AW1Texture.SelectedValue;
    let texture2 = AW2Texture.SelectedValue;
    let texture3 = AW3Texture.SelectedValue;
    let texture4 = AW4Texture.SelectedValue;
            //giveoutfit(top, top1, mask, mask1, torso, torso1, und, und1, leg, leg1, shoe, shoe1, accs, accs1, 
            //top2, top3, mask2, mask3, torso2, torso3, und2, und3, leg2, leg3, shoe2, shoe3, accs2, accs3)
            giveoutfit(texture4, texture, 166, 0, 207, texture, 0, -1, 114, texture, 88, texture2, 0, -1,
                texture3, texture, 192, 0, 166,0, 0, -1, 107, texture, 84, texture2, 0, -1)
                native.clearPedProp(alt.Player.local.scriptID, 0, 0);
        });

let OF5Item = new NativeUI.UIMenuItem("Neon Outfit", "");
OFMenu.AddItem(OF5Item)
let OF5Menu = new NativeUI.Menu(MenuText.MenuTitle, "NEON OUTFITS", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
OFMenu.AddSubMenu(OF5Menu, OF5Item);

let Neon1Item = new NativeUI.UIMenuItem("Neon 1 Outfit", "");
OF5Menu.AddItem(Neon1Item)
let Neon1Menu = new NativeUI.Menu(MenuText.MenuTitle, "Neon 1 Outfits", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
OF5Menu.AddSubMenu(Neon1Menu, Neon1Item);

let Neon1Texture = new NativeUI.UIMenuAutoListItem("Neon Outfit Color: ", "", 0, 11, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
Neon1Menu.AddItem(Neon1Texture);
Neon1Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let texture = Neon1Texture.SelectedValue;
            giveoutfit(287, texture, 134, texture, 17, 1, 0, -1, 113, texture, 87, texture, 0, -1,
                274, texture, 134, texture, 16, 1, 0, -1, 106, texture, 83, texture, 0, -1)
                native.clearPedProp(alt.Player.local.scriptID, 0, 0);
                native.setPedComponentVariation(alt.Player.local.scriptID, 2, 0, -1, 0);
        });

let Neon2Item = new NativeUI.UIMenuItem("Neon 2 Outfit", "");
OF5Menu.AddItem(Neon2Item)
let Neon2Menu = new NativeUI.Menu(MenuText.MenuTitle, "Neon 2 Outfits", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
OF5Menu.AddSubMenu(Neon2Menu, Neon2Item);
let Neon2Texture = new NativeUI.UIMenuAutoListItem("Neon 2 Outfit Color: ", "", 0, 11, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
Neon2Menu.AddItem(Neon2Texture);
Neon2Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let texture2 = Neon2Texture.SelectedValue;
    giveoutfit(254, texture2, 123, texture2, 17, 1, 0, -1, 98, texture2, 71, texture2, 0, -1,
        246, texture2, 123, texture2, 16, 1, 0, -1, 95, texture2, 68, texture2, 0, -1)
                native.clearPedProp(alt.Player.local.scriptID, 0, 0);
                native.setPedComponentVariation(alt.Player.local.scriptID, 2, 0, -1, 0);
});
let Neon3Item = new NativeUI.UIMenuItem("Neon 3 Outfit", "");
OF5Menu.AddItem(Neon3Item)
let Neon3Menu = new NativeUI.Menu(MenuText.MenuTitle, "Neon 3 Outfits", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
OF5Menu.AddSubMenu(Neon3Menu, Neon3Item);
let Neon3Texture = new NativeUI.UIMenuAutoListItem("Neon 3 Outfit Color: ", "", 0, 2, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
Neon3Menu.AddItem(Neon3Texture);
Neon3Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let texture = Neon3Texture.SelectedValue;
    giveoutfit(287, texture, 134, texture, 17, 1, 0, -1, 113, texture, 87, texture, 0, -1,
        201, texture, 102, texture, 16, 1, 0, -1, 85, texture, 58, texture, 0, -1)
                native.clearPedProp(alt.Player.local.scriptID, 0, 0);
                native.setPedComponentVariation(alt.Player.local.scriptID, 2, 0, -1, 0);
});
let OF6Item = new NativeUI.UIMenuItem("Space Traveler", "");
OFMenu.AddItem(OF6Item)
let OF6Menu = new NativeUI.Menu(MenuText.MenuTitle, "SPACE TRAVELER", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
OFMenu.AddSubMenu(OF6Menu, OF6Item);

let Space1Item = new NativeUI.UIMenuItem("Space 1 Outfit", "");
OF6Menu.AddItem(Space1Item)
let Space1Menu = new NativeUI.Menu(MenuText.MenuTitle, "Space 1 Outfits", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
OF6Menu.AddSubMenu(Space1Menu, Space1Item);

let Space1Texture = new NativeUI.UIMenuAutoListItem("Variations: ", "", 0, 11, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
Space1Menu.AddItem(Space1Texture);
Space1Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let texture = Space1Texture.SelectedValue;
    giveoutfit(296, texture, 0,-1, 207, texture, 0, -1, 117, texture, 92, texture, 0, -1,
        283, texture, 0,-1, 166, texture, 0, -1, 110, texture, 88, texture, 0, -1)
        native.clearPedProp(alt.Player.local.scriptID, 0, 0);
        giveprop(0, 132, texture, 0, 133, texture)
});
let Space2Item = new NativeUI.UIMenuItem("Space 2 Outfit", "");
OF6Menu.AddItem(Space2Item)
let Space2Menu = new NativeUI.Menu(MenuText.MenuTitle, "Space 2 Outfits", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
OF6Menu.AddSubMenu(Space2Menu, Space2Item);

let Space2Texture = new NativeUI.UIMenuAutoListItem("Variations: ", "", 0, 13, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
Space2Menu.AddItem(Space2Texture);
Space2Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let texture = Space2Texture.SelectedValue;
    giveoutfit(300, texture, 135, texture, 207, texture, 0, -1, 121, texture, 82, texture, 0, -1,
        287, texture, 135, texture, 166, texture, 0, -1, 114, texture, 78, texture, 0, -1)
            native.clearPedProp(alt.Player.local.scriptID, 0, 0);

});
let Space3Item = new NativeUI.UIMenuItem("Space 3 Outfit", "");
OF6Menu.AddItem(Space3Item)
let Space3Menu = new NativeUI.Menu(MenuText.MenuTitle, "Space 3 Outfits", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
OF6Menu.AddSubMenu(Space3Menu, Space3Item);

let Space3Texture = new NativeUI.UIMenuAutoListItem("Variations: ", "", 0, 17, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
Space3Menu.AddItem(Space3Texture);
Space3Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let texture = Space3Texture.SelectedValue;
    giveoutfit(291, texture, 0,-1, 206, texture, 0, -1, 116, texture, 91, texture, 0, -1,
        278, texture, 0,-1, 165, texture, 0, -1, 109, texture, 87, texture, 0, -1)
        native.clearPedProp(alt.Player.local.scriptID, 0,0);
        giveprop(0, 128, texture, 0, 129, texture)
});
let Space4Item = new NativeUI.UIMenuItem("Space Ranger", "");
OF6Menu.AddItem(Space4Item)
OF6Menu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Space Ranger") {
        giveoutfit(299, 0, 0,-1, 208, 0, 0, -1, 120, 0, 94, 0, 0, -1,
            286, 0, 0,-1, 167, 0, 0, -1, 113, 0, 90, 0, 0, -1)
            native.clearPedProp(alt.Player.local.scriptID, 0,0);
            giveprop(0, 133, 0, 0, 134, 0)
        } });
    let OF7Item = new NativeUI.UIMenuItem("Space Monkey", "");
    OFMenu.AddItem(OF7Item)
    OFMenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Space Monkey") {
            giveoutfit(298, 0, 147,0, 112, 0, 0, -1, 119, 0, 93, 0, 0, -1,
                285, 0, 147,0, 97, 0, 0, -1, 112, 0, 89, 0, 0, -1)
                native.clearPedProp(alt.Player.local.scriptID, 0, 0);
    }});
let OF8Item = new NativeUI.UIMenuItem("Pilot Outfit", "");
    OFMenu.AddItem(OF8Item)
    let OF8Menu = new NativeUI.Menu(MenuText.MenuTitle, "PiLOT OUTFITS", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
    OFMenu.AddSubMenu(OF8Menu, OF8Item);
    let P1Texture = new NativeUI.UIMenuAutoListItem("Variations : ", "", 0, 19, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
    let P2Texture = new NativeUI.UIMenuAutoListItem("Helmets : ", "", 0, 25, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
    OF8Menu.AddItem(P1Texture);
    OF8Menu.AddItem(P2Texture);
    OF8Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {
        let texture = P1Texture.SelectedValue;
        let texture1 = P2Texture.SelectedValue;
        giveoutfit(238, texture, 0,-1, 17, 0, 0, -1, 95, texture, 93, 0, 24, 0,
            228, texture, 0,-1, 17, 0, 0, -1, 92, texture, 89, 0, 33, 0)
            native.clearPedProp(alt.Player.local.scriptID, 0, 0);
            giveprop(0, 110, texture1, 0, 111, texture1)
        });

let OF9Item = new NativeUI.UIMenuItem("Alien Outfit", "");
OFMenu.AddItem(OF9Item)
let OF9Menu = new NativeUI.Menu(MenuText.MenuTitle, "ALIEN OUTFITS", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
OFMenu.AddSubMenu(OF9Menu, OF9Item);
let AlienTexture = new NativeUI.UIMenuAutoListItem("Colors : ", "", 0, 11, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
let Alien2Texture = new NativeUI.UIMenuAutoListItem("Space Aliens Type : ", "", 139, 141, 1, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, 73));
OF9Menu.AddItem(Alien2Texture);
OF9Menu.AddItem(AlienTexture);
OF9Menu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let texture1 = Alien2Texture.SelectedValue;
    let texture = AlienTexture.SelectedValue;
    giveoutfit(290, texture, texture1, texture, 205, texture, 0, -1, 115, texture, 12, 0, 0, -1,
       277, texture, texture1, texture, 164, texture, 0, -1, 108, texture, 13, 0, 0, -1)
        native.clearPedProp(alt.Player.local.scriptID, 0, 0);
        giveclothes(2, 0, -1, 0); //accs
});

let AOItem = new NativeUI.UIMenuItem("Alien Costume", "");
    OF9Menu.AddItem(AOItem)
    OF9Menu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Alien Costume") {
            giveoutfit(348, 0, 180,12, 210, 0, 0, -1, 132, 0, 0, -1, 0, -1,
                333, 0, 180,12, 169, 0, 0, -1, 127, 0, 89, -1, 0, -1)
                native.clearPedProp(alt.Player.local.scriptID, 0, 0);
    }});

// ========================================================================================================
// Tops

let TopsItem = new NativeUI.UIMenuItem(MenuText.TopText, "");
let TopsMenu = new NativeUI.Menu(MenuText.MenuTitle, "TOPS", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
TopsMenu.Visible = false;
ClothesShop.AddSubMenu(TopsMenu, TopsItem);

const topmenulist2 = [
    {label:"Labels T-Shirts", func :["Labels T-Shirt",  20, 395,0,14,0,31,-1,377,0,0,0,31,-1], text: "", price: 200},
    {label:"Designer T-Shirt", func: ["Designer T-Shirt", 17, 68,0,14,0,31,-1,73,0,0,0,31,-1], text: "", price: 1250},
    {label: "R* T-Shirt",func: ["R* T-Shirt", 15,338,0,14,0,31,-1,351,0,0,0,31,-1],text: "", price: 600},
    {label: "Arena War T-Shirt",func: ["Arena War T-Shirt", 21,286,0,14,0,31,-1,273,0,0,0,31,-1],text: "", price: 650},
    {label: "Arcade T-Shirt",func: ["Arcade T-Shirt", 17,37,0,14,0,31,-1,325,0,0,0,31,-1],text: "", price: 600},
    {label: "Golf Polo T-Shirt",func: ["Golf Polo T-Shirt",7, 400,0,14,0,31,-1,382,0,0,0,31,-1],text: "", price: 350},
    {label: "Axe Fury T-Shirt",func: ["Axe Fury T-Shirt",10,324,0,14,0,31,-1,345,0,0,0,31,-1],text: "", price: 750},
    {label: "Sport T-Shirt",func: ["Sport T-Shirt",20,280,0,14,0,31,-1,271,0,0,0,31,-1],text: "", price: 750},
    {label: "Tank Top",func: ["Tank Top",25,247,0,4,0,31,-1,237,0,5,0,31,-1], text: "", price: 150},
    {label: "Racer T-Shirt",func: ["Racer T-Shirt",25,335,0,14,0,31,-1,323,0,0,0,31,-1], text: "", price: 800},
    {label: "Giffy T-Shirt",func: ["Giffy T-Shirt",25,195,0,4,0,31,-1,193,0,0,0,31,-1], text: "", price: 750},
    {label: "Polo T-Shirt",func: ["Polo T-Shirt",11,246,0,14,0,31,-1,235,0,0,0,31,-1], text: "", price: 350},
    {label: "Perseus Sweater",func: ["Perseus Sweater",25,268,0, 14,0,31,-1,259,0,6,0,168,-1], text: "", price: 2200},
    {label: "Designer Sweater",func: ["Designer Sweater",9,376,0, 14,0,31,-1,358,0,6,0,168,-1], text: "", price: 2400},
    {label: "Animated Sweater",func: ["Animated Sweater",23,318,0, 14,0,31,-1,307,0,6,0,168,-1], text: "", price: 2600},
    {label: "Brand Sweater",func: ["Brand Sweater",23,294,0, 1,0,31,-1,281,0,6,0,168,-1], text: "", price: 3500},
    {label: "Sweater Jacket",func: ["Sweater Jacket",14,267,0, 14,0,31,-1,258,0,6,0,168,-1], text: "", price: 3000},
    {label: "Hoodie Sweater",func: ["Hoodie Sweater",11,123,0,1,0,31,-1,121,0,1,0,168,-1], text: "", price: 2500},
    {label: "Colored Long Shirt",func: ["Colored Long Shirt",11,9,0, 9,0,0,-1,12,0,1,0,168,-1], text: "", price: 1500},
    {label: "Fitted Sport Jacket",func: ["Fitted Sport Jacket",25,347,0, 3,0,0,-1,332,0,1,0,168,-1], text: "", price: 3000},
    {label: "Tactical Hoodie",func: ["Tactical Hoodie",25,259,0,14,0,31,-1,251,0,6,0,168,-1], text: "", price: 4500},
    {label: "Tactical Jacket",func: ["Tactical Jacket",25,256,0,14,0,31,-1,248,0,6,0,168,-1], text: "", price: 5500},
    {label: "Hoodie Sweater",func: ["Hoodie Sweater",11,123,0,1,0,31,-1,121,0,1,0,168,-1], text: "", price: 3000},
    {label: "Tactical Jacket 2",func: ["Tactical Jacket 2",25,252,0,14,0,31,-1,244,0,6,0,168,-1], text: "", price: 5700},
    {label: "Tactical Vest",func: ["Tactical Vest",25,255,0,11, 0,31,-1,247,0,2,0,168,-1], text: "", price: 4500},
    {label: "Fitted Jacket",func: ["Fitted Jacket",20,262,0,7, 0,0,-1,64,0,1,0,136,20], text: "", price: 2000},
    {label: "Fitted Leather Jacket",func: ["Fitted Leather Jacket",15,273,0,7,0,151,-1,264,0,6,0,141,-1], text: "", price: 3000},
    {label: "Utility Top",func: ["Utility Top",19,336,0,3,0,108,-1,324,0,1,0,101,-1], text: "", price: 4500},
    {label: "Manufacture Jacket",func: ["Manufacture Jacket",15,390,0,3,0,0,-1,371,0,1,0,168,-1], text: "", price: 3000},

    {label: "Sport Jacket",func: ["Sport Jacket",11,81,0, 3,0,0,-1,87,88,1,0,168,20], text: "", price: 2000},
    {label: "Sport Jacket 2",func: ["Sport Jacket 2",25,150,0,1,0,0,-1,153,0,1,0,168,-1], text: "", price: 2000},

    {label: "Singlet Shirt", func: ["Singlet Shirt",5, 168,170, 4,0,31,-1,238,238, 5,0,31,-1], text: "", price: 250},
    {label: "Lounge Shirt", func: ["Lounge Shirt",13, 142,143,5,0,31,-1,144,145,6,0 ,168,-1], text: "", price: 650},
    {label: "Colored Work Shirt", func: ["Colored Work Shirt",19, 366,367, 3,0,0,-1,348,349,1,0,168,-1], text: "", price: 1800},
    {label: "Colored Hoodie", func: ["Colored Hoodie",20, 407,408, 3,0,0,-1,384,385,1,0,168,-1], text: "", price: 1500},
    {label: "Colored Guffy Hoodie", func: ["Colored Guffy Hoodie",15, 271,272,3,0,0,-1,262,263,1,0,168,-1], text: "", price: 3000},
    {label: "Manufacture Hoodie", func: ["Manufacture Hoodie",20, 392,393, 3,0,0,-1,373,374,1,0,168,-1], text: "", price: 3500},
    {label: "Broker Hoodie", func: ["Broker Hoodie",25, 316,317, 3,0,0,-1,305,306,1,0,168,-1], text: "", price: 3500},
    {label: "Bigness Hoodie", func: ["Bigness Hoodie",25, 307,308, 3,0,0,-1,296,297,1,0,168,-1], text: "", price: 3500},
    {label: "Utility Top 2", func: ["Utility Top 2",25, 230,231, 14,0,31,-1,220,221,1,0,168,-1], text: "", price: 4500},
    {label: "Gunrunning Hoodie", func: ["Gunrunning Hoodie",23, 210,211, 11,0,0,-1,206,207,2,0,168,-1], text: "", price: 3500},
    {label: "Oversied Gunrunning Jacket", func: ["Oversied Gunrunning Jacket",23, 213,216, 6,0,108,25,209,212,14,0,101,25], text: "", price: 5500},
    {label: "Perseus Jacket", func: ["Perseus Jacket",10, 35,35,1,0,151,21,74,75,1,0,141,21], text: "", price: 3000},

    {label: "Color Check Shirt", func: ["Color Check Shirt",23, 354,0,14,0,172,20,339,0,6,0,135,20], text: "", price: 2100},
    {label: "Party Shirt", func: ["Party Shirt",25, 372,373, 14,0,165,20,354,355,0,0,168,20], text: "", price: 1800},
    {label: "Funky Shirt", func: ["Funky Shirt",25, 364,365, 14,0,165,20,346,347,0,0,168,20], text: "", price: 1800},
    {label: "Business Shirt", func: ["Business Shirt",11, 24,0, 5,0,13,15,24,0,4,0,31,15], text: "", price: 2600},
    {label: "Business Vest", func: ["Business Vest",24, 334,0, 9,0,185,0,120,0,11,0,7,15], text: "", price: 2300},
    {label: "Designer Jacket", func: ["Designer Jacket",11, 65,0, 6,0,13,18,70,0,1,0,65,18], text: "", price: 2400},
    {label: "Bomber Jacket", func: ["Bomber Jacket",25, 411,0, 6,0,0,18,390,0,1,0,65,18], text: "", price: 2000},
    {label: "Casino Broker", func: ["Casino Broker",25, 322,323, 11,0,0,-1,311,312,1,0,150,13], text: "", price: 2400},
    {label: "Colorized Oversize Hoodie", func: ["Colorized Oversize Hoodie",25, 311,314, 6,0,151,25,300,303,6,0,111,25], text: "", price: 2600},
    {label: "Colorized Bomber Jacket", func: ["Colorized Bomber Jacket",13, 402,403, 3,0,151,20,386,387,1,0,168,20], text: "", price: 2500},
    {label: "Hoodie Sport Jacket",func: ["Hoodie Sport Jacket",25,193,0, 6,0,121,18,191,0,1,0,65,18], text: "", price: 2100},
    {label: "Sports Designer Jacket",func: ["Sports Designer Jacket",15,388,389,11,0,0,-1,369,370,2,0,168,-1], text: "", price: 2100},
    {label: "Designer Sport Jacket",func: ["Designer Sport Jacket",13,320,0,11,0,151,4,309,0,1,0,187,4], text: "", price: 2400},
    {label: "Oversized Jacket",func: ["Oversized Jacket",3,64,0,5,0,175,11,77,0,1,0,12,11], text: "", price: 2300},
    {label: "Oversized Broker Jacket",func: ["Oversized Broker Jacket",9,315,0,5,0,175,18,304,0,1,0,65,18], text: "", price: 2400},
    {label: "Casual Party",func: ["Casual Party",2,112,116,16,8,0,-1,119,0,4,0,32,16], text: "", price: 3400},
    {label: "Eccentric Top",func: ["Eccentric Top",11,283,284,12,0,0,-1,293,0,6,0,36,7], text: "", price: 2400},
    {label: "Hot Top",func: ["Hot Top",11,321,0,4,0,0,-1,310,0,14,0,168,-1], text: "", price: 2000},
    {label: "Elegants",func: ["Hot Top",11,322,323,11,0,0,-1,311,0,1,0,34,7], text: "", price: 3600},

]

topmenulist2.forEach(element=> {
    let TopItem2 = new NativeUI.UIMenuItem(element.label, "");
    TopsMenu.AddItem(TopItem2);
})


TopsMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < topmenulist2.length) {
        let top = topmenulist2[selectedItemIndex];
        let a = top.func;
        ClothesShop.Close(true);
        Topsmenu2(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], top.price);
    } 
})

let TopsDrawable = new NativeUI.UIMenuAutoListItem("Top: ", "", 0, 472, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 11));
let TopsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, native.getPedDrawableVariation(alt.Player.local.scriptID, 11)));

TopsMenu.AddItem(TopsDrawable);
TopsMenu.AddItem(TopsTexture);

TopsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = TopsDrawable.SelectedValue;
    let texture = TopsTexture.SelectedValue;
    native.setPedComponentVariation(alt.Player.local.scriptID, 11, drawable, texture, 0);
 });


function Topsmenu2(title, max, typemin, typemax, torso, torso1, und, und1, typemin2,typemax2, torso2, torso3, und2, und3, price) {
let type1;
let type2;
let type3;
let texture;
let texture1;
let texture2;
let texture3;
let text;
let text2;
let text3;
    if(pedmodel == alt.hash('mp_m_freemode_01')) {
        type1 = typemin2;        type2 = typemax2;      type3 = und3;
        text = native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, typemin2)
        text2 = native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 8, und2)
        text3 = native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 3, torso2)
    } else {
        type1 = typemin;        type2 = typemax;        type3 = und1;
        text = native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, typemin)
        text2 = native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 8, und)
        text3 = native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 3, torso)
    }

let TopMenu2 = new NativeUI.Menu(MenuText.MenuTitle, "TOPS", MenuSettings.Point, MenuText.sprite, MenuText.sprite );
TopMenu2.Visible = false;
TopMenu2.CloseableByUser = false;
let TS101Texture = new NativeUI.UIMenuAutoListItem(title, "", type1, type2, type1, "");
let TS102Texture = new NativeUI.UIMenuAutoListItem("Variations : ", "", 0, text-1, 0, "");
let TS103Texture = new NativeUI.UIMenuAutoListItem("Undershirts : ", "", 0, text2-1, 1, "");
let TS104Texture = new NativeUI.UIMenuAutoListItem("Hand : ", "", 0, text3-1, 0, "");
if(typemax > 0) {
    TopMenu2.AddItem(TS101Texture);
} else {
    texture = typemin, texture2 = typemin2
}
TopMenu2.AddItem(TS102Texture);
if(und3 > 0) {
TopMenu2.AddItem(TS103Texture);
}
if(torso1 > 0) {
TopMenu2.AddItem(TS104Texture);
}
TopMenu2.AutoListChange.on((selectedItem, selectedItemIndex) => {
    texture = TS101Texture.SelectedValue;
    texture1 = TS102Texture.SelectedValue;
    texture2 = TS103Texture.SelectedValue;
    texture3 = TS104Texture.SelectedValue;
    tops(texture,texture1,torso,torso1-texture3,und,und1-texture2,texture,texture1,torso2,torso3-texture3,und2,und3-texture2);
});

let buyitem = new NativeUI.UIMenuItem("Buy Clothes", "")
buyitem.RightLabel = "$ "+price;
TopMenu2.AddItem(buyitem);
TopMenu2.AddItem(new NativeUI.UIMenuItem("Back", ""))
TopMenu2.Open();

TopMenu2.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Buy Clothes") {
        native.playSound(0, "SELECT", "HUD_FRONTEND_CLOTHESSHOP_SOUNDSET", true, 0, false);
        alt.emit('saveoutfit', 'default');
        alt.emit('buy', price);
        if(pedmodel == alt.hash('mp_m_freemode_01') ) {
            alt.emit('savetopm', texture, texture1,torso2,torso3,und2,und3-texture2,0, -1)
        } else if(pedmodel == alt.hash('mp_f_freemode_01')) {
            alt.emit('savetopf', texture,texture1,torso,torso1,und,und1-texture2,0, -1)
        }
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
        alt.emit('loadoutfit', 'default');
        TopMenu2.Close();
        TopsMenu.Open()
    }
})
}

// ========================================================================================================
// Undershirts

let UndershirtsItem = new NativeUI.UIMenuItem(MenuText.UndershirtText, "");
let UndershirtsMenu = new NativeUI.Menu(MenuText.MenuTitle, "UNDERSHIRTS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
UndershirtsMenu.GetTitle().Scale = MenuSettings.TitleScale;
UndershirtsMenu.GetTitle().Font = MenuSettings.TitleFont;
UndershirtsMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
UndershirtsMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
//ClothesShop.AddSubMenu(UndershirtsMenu, UndershirtsItem);

let UndershirtsDrawable = new NativeUI.UIMenuAutoListItem("Undershirt: ", "", 0, 237, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 8));
let UndershirtsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", 0, 30, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 8, native.getPedDrawableVariation(alt.Player.local.scriptID, 8)));

UndershirtsMenu.AddItem(UndershirtsDrawable);
UndershirtsMenu.AddItem(UndershirtsTexture);

UndershirtsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = UndershirtsDrawable.SelectedValue;
    let texture = UndershirtsTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 8, drawable, texture, 0);
});

// ========================================================================================================
// Torso

let TorsosItem = new NativeUI.UIMenuItem("Gloves", "");
let TorsosMenu = new NativeUI.Menu(MenuText.MenuTitle, "GLOVES", MenuSettings.Point, MenuText.sprite, MenuText.sprite);

TorsosMenu.GetTitle().Scale = MenuSettings.TitleScale;
TorsosMenu.GetTitle().Font = MenuSettings.TitleFont;
TorsosMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
TorsosMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothesShop.AddSubMenu(TorsosMenu, TorsosItem);

ClothesShop.ItemSelect.on((item, selectedItemIndex) => {
    TorsosMenu.Clear();
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Gloves") {
        const pedmodel = native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
  if(pedmodel==false) {
    let TorsosDrawable = new NativeUI.UIMenuAutoListItem("Torso: ", "", 190, 204, 1, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 3));
    let TorsosTexture = new NativeUI.UIMenuAutoListItem("Gloves Style: ", "", 0, 19, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 3, 0));
    
    TorsosMenu.AddItem(TorsosDrawable);
    TorsosMenu.AddItem(TorsosTexture);
    TorsosMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
        let drawable = TorsosDrawable.SelectedValue;
        let texture = TorsosTexture.SelectedValue;
        native.setPedComponentVariation(alt.Player.local.scriptID, 3, drawable, texture, 0);
});} else {
      if (pedmodel==true) {
        let TorsosDrawable = new NativeUI.UIMenuAutoListItem("Torso: ", "", 136, 150, 1, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 3));
        let TorsosTexture = new NativeUI.UIMenuAutoListItem("Gloves Style: ", "", 0, 19, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 3, 0));
        TorsosMenu.AddItem(TorsosDrawable);
        TorsosMenu.AddItem(TorsosTexture);
        TorsosMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
            let drawable = TorsosDrawable.SelectedValue;
            let texture = TorsosTexture.SelectedValue;
            native.setPedComponentVariation(alt.Player.local.scriptID, 3, drawable, texture, 0);
})}};
}});

// ========================================================================================================
// Legs

let pant;
let shoe;
let drawable;
let texture;
let price;
const pants = [
    {draw: 0, text: "", price: 1500},
    {draw: 1, text: "", price: 1500},
    {draw: 4, text: "", price: 1500},
    {draw: 6, text: "", price: 1500},
    {draw: 7, text: "", price: 1500},
    {draw: 8, text: "", price: 1500},
    {draw: 9, text: "", price: 1500},
    {draw: 10, text: "", price: 1500},
    {draw: 12, text: "", price: 1500},
    {draw: 14, text: "", price: 1500},
    {draw: 15, text: "", price: 1500},
    {draw: 16, text: "", price: 1500},
    {draw: 18, text: "", price: 1500},
    {draw: 19, text: "", price: 1500},
    {draw: 20, text: "", price: 1500},
    {draw: 21, text: "", price: 1500},
    {draw: 22, text: "", price: 1500},
    {draw: 24, text: "", price: 1500},
    {draw: 25, text: "", price: 1500},
    {draw: 26, text: "", price: 1500},
    {draw: 27, text: "", price: 1500},
    {draw: 28, text: "", price: 1500},
    {draw: 31, text: "", price: 1500},
    {draw: 35, text: "", price: 1500},
    {draw: 36, text: "", price: 1500},
    {draw: 39, text: "", price: 1500},
    {draw: 43, text: "", price: 1500},
    {draw: 45, text: "", price: 1500},
    {draw: 47, text: "", price: 1500},
    {draw: 49, text: "", price: 1500},
    {draw: 50, text: "", price: 1500},
    {draw: 51, text: "", price: 1500},
    {draw: 52, text: "", price: 1500},
    {draw: 53, text: "", price: 1500},
    {draw: 54, text: "", price: 1500},
    {draw: 55, text: "", price: 1500},
    {draw: 57, text: "", price: 1500},
    {draw: 58, text: "", price: 1500},
    {draw: 59, text: "", price: 1500},
    {draw: 60, text: "", price: 1500},
    {draw: 61, text: "", price: 1500},
    {draw: 62, text: "", price: 1500},
    {draw: 63, text: "", price: 1500},
    {draw: 65, text: "", price: 1500},
    {draw: 67, text: "", price: 1500},
    {draw: 69, text: "", price: 1500},
    {draw: 71, text: "", price: 1500},
    {draw: 73, text: "", price: 1500},
    {draw: 74, text: "", price: 1500},
    {draw: 75, text: "", price: 1500},
    {draw: 76, text: "", price: 1500},
    {draw: 78, text: "", price: 1500},
    {draw: 80, text: "", price: 1500},
    {draw: 81, text: "", price: 1500},
    {draw: 82, text: "", price: 1500},
    {draw: 83, text: "", price: 1500},
    {draw: 87, text: "", price: 1500},
    {draw: 89, text: "", price: 1500},
    {draw: 99, text: "", price: 1500},
    {draw: 100, text: "", price: 1500},
    {draw: 102, text: "", price: 1500},
    {draw: 107, text: "", price: 1500},
    {draw: 128, text: "", price: 1500},
    {draw: 129, text: "", price: 1500},
    {draw: 131, text: "", price: 1500},
    {draw: 138, text: "", price: 1500},
    {draw: 139, text: "", price: 1500},
    {draw: 140, text: "", price: 1500},
    {draw: 142, text: "", price: 1500},
    {draw: 143, text: "", price: 1500},
    {draw: 146, text: "", price: 1500},
    {draw: 147, text: "", price: 1500},
    {draw: 148, text: "", price: 1500},
    {draw: 149, text: "", price: 1500},
    {draw: 150, text: "", price: 1500},
]

const shoes = [
    {draw: 1, text: "", price: 500},
    {draw: 3, text: "", price: 600},
    {draw: 4, text: "", price: 600},
    {draw: 5, text: "", price: 60},
    {draw: 6, text: "", price: 1000},
    {draw: 7, text: "", price: 1500},
    {draw: 8, text: "", price: 1500},
    {draw: 9, text: "", price: 1500},
    {draw: 10, text: "", price: 1500},
    {draw: 14, text: "", price: 1500},
    {draw: 15, text: "", price: 1500},
    {draw: 16, text: "", price: 1500},
    {draw: 18, text: "", price: 1500},
    {draw: 19, text: "", price: 1500},
    {draw: 20, text: "", price: 1500},
    {draw: 21, text: "", price: 1500},
    {draw: 22, text: "", price: 1500},
    {draw: 23, text: "", price: 1500},
    {draw: 28, text: "", price: 1500},
    {draw: 29, text: "", price: 1500},
    {draw: 30, text: "", price: 1500},
    {draw: 31, text: "", price: 1500},
    {draw: 32, text: "", price: 1500},
    {draw: 36, text: "", price: 1500},
    {draw: 37, text: "", price: 1500},
    {draw: 42, text: "", price: 1500},
    {draw: 43, text: "", price: 1500},
    {draw: 56, text: "", price: 1500},
    {draw: 75, text: "", price: 1500},
    {draw: 76, text: "", price: 1500},
    {draw: 77, text: "", price: 1500},
    {draw: 79, text: "", price: 1500},
    {draw: 80, text: "", price: 1500},
    {draw: 81, text: "", price: 1500},
    {draw: 93, text: "", price: 1500},
    {draw: 97, text: "", price: 1500},
    {draw: 99, text: "", price: 1500},
    {draw: 101, text: "", price: 1500},
    {draw: 103, text: "", price: 1500},
    {draw: 105, text: "", price: 1500},
]

const bags = [
    {draw: 40, text: "", price: 5000},
    {draw: 44, text: "Bag for Heist", price: 5000},
    {draw: 81, text: "", price: 7000},
    {draw: 85, text: "", price: 8000},
]

const manties = [
    {draw: 21, text: "", price: 1000},
    {draw: 22, text: "", price: 1000},
    {draw: 23, text: "", price: 1000},
    {draw: 28, text: "", price: 1000},
    {draw: 29, text: "", price: 1000},
    {draw: 36, text: "", price: 1000},
    {draw: 37, text: "", price: 1000},
    {draw: 38, text: "", price: 1000},
    {draw: 39, text: "", price: 1000},
    {draw: 115, text: "", price: 1000},
    {draw: 117, text: "", price: 1000},
]

const womanties = [
    {draw: 20, text: "", price: 1000},
    {draw: 21, text: "", price: 1000},
    {draw: 22, text: "", price: 1000},
    {draw: 23, text: "", price: 1000},
    {draw: 86, text: "", price: 1000},
    {draw: 87, text: "", price: 1000},
]

const manscarf = [
    {draw: 30, text: "", price: 1000},
    {draw: 31, text: "", price: 1000},
    {draw: 34, text: "", price: 1000},
    {draw: 35, text: "", price: 1000},
    {draw: 112, text: "", price: 1000},
]

const womanscarf = [
    {draw: 9, text: "", price: 1000},
    {draw: 13, text: "", price: 1000},
    {draw: 15, text: "", price: 1000},
    {draw: 17, text: "", price: 1000},
    {draw: 18, text: "", price: 1000},
    {draw: 83, text: "", price: 1000},
]

const headsets = [
    {draw: 0, text: "", price: 2500},
    {draw: 15, text: "", price: 2500},
]

const hats = [
    {draw: 4, text: "", price: 500},
    {draw: 5, text: "", price: 500},
    {draw: 6, text: "", price: 500},
    {draw: 7, text: "", price: 500},
    {draw: 12, text: "", price: 500},
    {draw: 13, text: "", price: 500},
    {draw: 14, text: "", price: 500},
    {draw: 20, text: "", price: 500},
    {draw: 21, text: "", price: 500},
    {draw: 22, text: "", price: 500},
    {draw: 23, text: "", price: 1000},
    {draw: 24, text: "", price: 1000},
    {draw: 25, text: "", price: 1000},
    {draw: 26, text: "", price: 1000},
    {draw: 27, text: "", price: 1000},
    {draw: 28, text: "", price: 1000},
    {draw: 29, text: "", price: 1000},
    {draw: 30, text: "", price: 1000},
    {draw: 42, text: "", price: 1000},
    {draw: 43, text: "", price: 1000},
    {draw: 44, text: "", price: 1000},
    {draw: 45, text: "", price: 1000},
    {draw: 54, text: "", price: 1000},
    {draw: 55, text: "", price: 1000},
    {draw: 56, text: "", price: 1000},
    {draw: 58, text: "", price: 1000},
    {draw: 60, text: "", price: 1000},
    {draw: 61, text: "", price: 1000},
    {draw: 63, text: "", price: 1000},
    {draw: 64, text: "", price: 1000},
    {draw: 65, text: "", price: 1000},
    {draw: 102, text: "", price: 1000},
    {draw: 103, text: "", price: 1000},
    {draw: 104, text: "", price: 1000},
    {draw: 105, text: "", price: 1000},
    {draw: 106, text: "", price: 1000},
    {draw: 107, text: "", price: 1000},
    {draw: 108, text: "", price: 1000},
    {draw: 109, text: "", price: 1000},
    {draw: 112, text: "", price: 1000},
    {draw: 113, text: "", price: 1000},
    {draw: 130, text: "", price: 1000},
    {draw: 131, text: "", price: 1000},
    {draw: 135, text: "", price: 1000},
    {draw: 139, text: "", price: 1000},
    {draw: 151, text: "", price: 1000},
    {draw: 154, text: "", price: 1000},
    {draw: 155, text: "", price: 1000},
    {draw: 156, text: "", price: 1000},
    {draw: 157, text: "", price: 1000},
    {draw: 158, text: "", price: 1000},
    {draw: 159, text: "", price: 1000},
    {draw: 160, text: "", price: 1000},
    {draw: 161, text: "", price: 1000},
    {draw: 162, text: "", price: 1000},
]

const glasses = [
    {draw: 0, text: "", price: 500},
    {draw: 2, text: "", price: 500},
    {draw: 3, text: "", price: 500},
    {draw: 4, text: "", price: 500},
    {draw: 5, text: "", price: 500},
    {draw: 7, text: "", price: 500},
    {draw: 8, text: "", price: 500},
    {draw: 9, text: "", price: 500},
    {draw: 10, text: "", price: 500},
    {draw: 16, text: "", price: 500},
    {draw: 17, text: "", price: 500},
    {draw: 18, text: "", price: 500},
    {draw: 19, text: "", price: 500},
    {draw: 20, text: "", price: 500},
    {draw: 30, text: "", price: 500},
    {draw: 31, text: "", price: 500},
    {draw: 32, text: "", price: 500},
    {draw: 33, text: "", price: 500},
    {draw: 34, text: "", price: 500},
    {draw: 35, text: "", price: 500},
    {draw: 36, text: "", price: 500},
    {draw:37 , text: "", price: 500},
    {draw: 38, text: "", price: 500},
    {draw: 39, text: "", price: 500},
    {draw: 40, text: "", price: 500},
    {draw: 41, text: "", price: 500},
]

let playerbag;

let AccItem = new NativeUI.UIMenuItem("Accessories", "");

ClothesShop.AddItem(new NativeUI.UIMenuItem("Pants", ""));
ClothesShop.AddItem(new NativeUI.UIMenuItem("Shoes", ""));
ClothesShop.AddItem(new NativeUI.UIMenuItem("Hats", ""));
ClothesShop.AddItem(new NativeUI.UIMenuItem("Bags", ""));

ClothesShop.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Pants") {
        ClothesShop.Close(true);
        clothesshopmenu("PANTS", pants, 4, 'savepantm', 'savepantf')
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Shoes") {
        ClothesShop.Close(true);
        clothesshopmenu("SHOES", shoes, 6, 'saveshoem', 'saveshoef')
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Hats") {
        ClothesShop.Close(true);
        propmenu("HATS", hats, 0, 'savehatm', 'savehatf')
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Bags") {
        ClothesShop.Close(true);
        let pbag = {
            bag : native.getPedDrawableVariation(alt.Player.local.scriptID, 5),
            texture : native.getPedTextureVariation(alt.Player.local.scriptID, 5)
        }
        playerbag = pbag;        
        clothesshopmenu("BAGS", bags, 5, 'savebag', 'savebag')
    }
})

let AccMenu = new NativeUI.Menu(MenuText.MenuTitle, "ACCESSORIES", MenuSettings.Point, MenuText.sprite, MenuText.sprite);
ClothesShop.AddSubMenu(AccMenu, AccItem);
AccMenu.AddItem(new NativeUI.UIMenuItem("Ears", ""));
AccMenu.AddItem(new NativeUI.UIMenuItem("Glasses", ""));
AccMenu.AddItem(new NativeUI.UIMenuItem("Head Sets", ""));
AccMenu.AddItem(new NativeUI.UIMenuItem("Scarfs", ""));
AccMenu.AddItem(new NativeUI.UIMenuItem("Ties", ""));
AccMenu.AddItem(new NativeUI.UIMenuItem("Left Hand", ""));
AccMenu.AddItem(new NativeUI.UIMenuItem("Right Hand", ""));

AccMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Glasses") {
        ClothesShop.Close(true);
        propmenu("GLASSES", glasses, 1, 'saveglasesm', 'saveglasesf')
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Head Sets") {
        ClothesShop.Close(true);
        propmenu("HEAD SETS", headsets, 0, 'savehatm', 'savehatf')
    }
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Ties") {
        ClothesShop.Close(true);
        if(pedmodel == alt.hash('mp_m_freemode_01') ) {
            clothesshopmenu("TIES", manties, 7, 'saveaccm', 'saveaccf')
        } else if(pedmodel == alt.hash('mp_f_freemode_01')) {
            clothesshopmenu("TIES", womanties, 7, 'saveaccm', 'saveaccf')
        }
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Scarfs") {
        ClothesShop.Close(true);
        if(pedmodel == alt.hash('mp_m_freemode_01') ) {
            clothesshopmenu("SCARFS", manscarf, 7, 'saveaccm', 'saveaccf')
        } else if(pedmodel == alt.hash('mp_f_freemode_01')) {
            clothesshopmenu("SCARFS", womanscarf, 7, 'saveaccm', 'saveaccf')
        }
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Left Hand") {
        ClothesShop.Close(true);
            propmenu2("LEFT HAND ACCESSORIES", 6, 40, 'saveaccleftm', 'saveaccleftf', 2000)
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Right Hand") {
        ClothesShop.Close(true);
            propmenu2("RIGHT HAND ACCESSORIES", 7, 20, 'saveaccrightm', 'saveaccrightf', 2000)
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Ears") {
        ClothesShop.Close(true);
            propmenu2("EARRINGS", 2, 45, 'saveearm', 'saveearf', 2500)
    }
})

function clothesshopmenu(title, data, type, savem, savef) {
let ClothesMenu = new NativeUI.Menu(MenuText.MenuTitle, title, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
ClothesMenu.Visible = false;
ClothesMenu.CloseableByUser = false;

let Drawable = new NativeUI.UIMenuAutoListItem("Models : ", "", 0, data.length-1, 0, data);
let Texture = new NativeUI.UIMenuAutoListItem("Variants : ", "", 0, 25, 0, data);

ClothesMenu.AddItem(Drawable);
ClothesMenu.AddItem(Texture);

ClothesMenu.Open()
let pricelabel
let text
let pricetag = alt.everyTick(()=>{
    drawtext(pricelabel, 0.23, 0.25, 0, 0.35, 0.25, 255,255,255,255);
    drawtext(text, 0.2, 0.145, 0, 0.35, 0.25, 255,255,255,255);
})

ClothesMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    pant = data[Drawable.SelectedValue]
    drawable = pant.draw
    texture = Texture.SelectedValue;
    price = pant.price;
    pricelabel = "$ "+pant.price
    text = pant.text
    native.setPedComponentVariation(alt.Player.local.scriptID, type, drawable, texture, 0);

});

let buyitem = new NativeUI.UIMenuItem("Purchase", "")

ClothesMenu.AddItem(buyitem);
ClothesMenu.AddItem(new NativeUI.UIMenuItem("Back", ""))

ClothesMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        native.playSound(0, "SELECT", "HUD_FRONTEND_CLOTHESSHOP_SOUNDSET", true, 0, false);
        alt.emit('saveoutfit', 'default');
        alt.emit('buy', price);
        if(pedmodel == alt.hash('mp_m_freemode_01') ) {
            alt.emit(savem, drawable, texture);
        } else if(pedmodel == alt.hash('mp_f_freemode_01')) {
            alt.emit(savef, drawable, texture)
        }
        if(type == 5) {
            let pbag = {
                bag:drawable, texture:texture}
            playerbag = pbag;
            //setMeta('playerbag', pbag);
        }
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
        alt.emit('loadoutfit', 'default');
        if(type == 5) {
            native.setPedComponentVariation(alt.Player.local.scriptID, 5, playerbag.bag, playerbag.texture, 0);
        }
        ClothesMenu.Close();
        ClothesShop.Open()
        if(pricetag) {
            alt.clearEveryTick(pricetag)
        }
    }
})
}


function propmenu(title, data, type, savem, savef) {
let PropMenu = new NativeUI.Menu(MenuText.MenuTitle, title, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
PropMenu.Visible = false;
PropMenu.CloseableByUser = false;
let Drawable = new NativeUI.UIMenuAutoListItem("Models : ", "", 0, data.length-1, 0, data);
let Texture = new NativeUI.UIMenuAutoListItem("Variants : ", "", 0, 25, 0, native.getNumberOfPedPropTextureVariations(alt.Player.local.scriptID, 0, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 0)));

PropMenu.AddItem(Drawable);
PropMenu.AddItem(Texture);
PropMenu.Open();
let pricelabel
let pricetag = alt.everyTick(()=>{
    drawtext(pricelabel, 0.23, 0.25, 0, 0.35, 0.25, 255,255,255,255);

})

PropMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let prop = data[Drawable.SelectedValue]
    drawable = prop.draw;
    texture = Texture.SelectedValue;
    price = prop.price;
    pricelabel = '$ '+prop.price
    native.clearPedProp(alt.Player.local.scriptID, type, 0);
    native.setPedPropIndex(alt.Player.local.scriptID, type, drawable, texture, false, 0);
});

let buyitem = new NativeUI.UIMenuItem("Purchase", "")
PropMenu.AddItem(buyitem);
PropMenu.AddItem(new NativeUI.UIMenuItem("Back", ""))
PropMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        native.playSound(0, "SELECT", "HUD_FRONTEND_CLOTHESSHOP_SOUNDSET", true, 0, false);
        alt.emit('saveprops', 'defaultprop');
        alt.emit('buy', price);
        if(pedmodel == alt.hash('mp_m_freemode_01') ) {
            alt.emit(savem, drawable, texture);
        } else if(pedmodel == alt.hash('mp_f_freemode_01')) {
            alt.emit(savef, drawable, texture)
        }
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
       // native.clearPedProp(alt.Player.local.scriptID, type);
        alt.emit('loadprops', 'defaultprop');
        PropMenu.Close();
        ClothesShop.Open()
        if(pricetag) {
            alt.clearEveryTick(pricetag)
        }
    }
})
}

// ========================================================================================================
// Masks

let MasksItem = new NativeUI.UIMenuItem(MenuText.MaskenText, "");
let MasksMenu = new NativeUI.Menu(MenuText.MenuTitle, "MASKS", MenuSettings.Point, MenuText.sprite, MenuText.sprite);

MasksMenu.CloseableByUser = false
ClothesShop.AddSubMenu(MasksMenu, MasksItem);

let MasksDrawable = new NativeUI.UIMenuAutoListItem("Model : ", "", 0, 216, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 1));
let MasksTexture = new NativeUI.UIMenuAutoListItem("Variants : ", "", 0, 15, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 1, native.getPedDrawableVariation(alt.Player.local.scriptID, 1)));

MasksMenu.AddItem(MasksDrawable);
MasksMenu.AddItem(MasksTexture);

MasksMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    drawable = MasksDrawable.SelectedValue;
    texture = MasksTexture.SelectedValue;
    native.clearPedProp(alt.Player.local.scriptID, 0, 0);
    native.clearPedProp(alt.Player.local.scriptID, 1, 0);
    native.setPedComponentVariation(alt.Player.local.scriptID, 1, drawable, texture, 0);
});

let buyitem = new NativeUI.UIMenuItem("Purchase", "")
buyitem.RightLabel = "$ 5000"
MasksMenu.AddItem(buyitem);
MasksMenu.AddItem(new NativeUI.UIMenuItem("Back", ""))
MasksMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        native.playSound(0, "SELECT", "HUD_FRONTEND_CLOTHESSHOP_SOUNDSET", true, 0, false);
        alt.emit('saveoutfit', 'default');
        alt.emit('buy', 5000);
        alt.emit('savemask', drawable, texture);
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
        alt.emit('loadoutfit', 'default');
        MasksMenu.Close();
        //ClothesShop.Open()
    }
})


function propmenu2(title, type, max, savem, savef, cost) {

let WatchesMenu = new NativeUI.Menu(MenuText.MenuTitle, title, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
//AccMenu.AddSubMenu(WatchesMenu, WatchesItem);

let Drawable = new NativeUI.UIMenuAutoListItem("Select Accessories : ", "", 0, max, 0, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 6));
let Texture = new NativeUI.UIMenuAutoListItem("Variants : ", "", 0, 10, 0, native.getNumberOfPedPropTextureVariations(alt.Player.local.scriptID, 6, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 6)));

WatchesMenu.AddItem(Drawable);
WatchesMenu.AddItem(Texture);
price = cost;
WatchesMenu.Open();
WatchesMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    drawable = Drawable.SelectedValue;
    texture = Texture.SelectedValue;
    
    native.clearPedProp(alt.Player.local.scriptID, type, 0);
    native.setPedPropIndex(alt.Player.local.scriptID, type, drawable, texture, false, 0);
});

let buyitem = new NativeUI.UIMenuItem("Purchase", "")
buyitem.RightLabel = "$ "+price;
WatchesMenu.AddItem(buyitem);
WatchesMenu.AddItem(new NativeUI.UIMenuItem("Back", ""))
WatchesMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        native.playSound(-1, "SELECT", "HUD_FRONTEND_CLOTHESSHOP_SOUNDSET", true, 0, false);
        alt.emit('saveprops', 'defaultprop');
        alt.emit('buy', price);
        if(pedmodel == alt.hash('mp_m_freemode_01') ) {
            alt.emit(savem, drawable, texture);
        } else if(pedmodel == alt.hash('mp_f_freemode_01')) {
            alt.emit(savef, drawable, texture)
        }
    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Back") {
        alt.emit('loadprops', 'defaultprop');
        //native.clearPedProp(alt.Player.local.scriptID, type);
        WatchesMenu.Close();
        AccMenu.Open()
    }
})
}

// ========================================================================================================
// Decals

let DecalsItem = new NativeUI.UIMenuItem(MenuText.DecalsText, "");
let DecalsMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
DecalsMenu.GetTitle().Scale = MenuSettings.TitleScale;
DecalsMenu.GetTitle().Font = MenuSettings.TitleFont;
DecalsMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
DecalsMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
//ClothesShop.AddSubMenu(DecalsMenu, DecalsItem);

let DecalsDrawable = new NativeUI.UIMenuAutoListItem("Decal: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 10));
let DecalsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 10, native.getPedDrawableVariation(alt.Player.local.scriptID, 10)));

DecalsMenu.AddItem(DecalsDrawable);
DecalsMenu.AddItem(DecalsTexture);

DecalsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = DecalsDrawable.SelectedValue;
    let texture = DecalsTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 10, drawable, texture, 0);

});

// ========================================================================================================
// Event Section

export function clothesmenu() {
    let clothes;
    alt.on("keydown", (key) => {
        if (key == "E".charCodeAt(0)) {
            let shop = getMeta('clothes');
            clothes = getMeta(shop);
            if(clothes > 0) {
                pedmodel = native.getEntityModel(alt.Player.local.scriptID,);
                setMeta(shop, 2)
               // native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
                if(ClothesShop.Visible) {}
                else {
                alt.emit('saveoutfit', 'default');
                ClothesShop.Open()
                }
            }
        }
    });
    
}


alt.on('clothes', (shop)=>{
    if(shop == clothes) {
        if(ClothesShop.Visible) {
            ClothesShop.Close(true);
        }
    }
})

alt.on(EventNames.ToggleMenu, () => {
    ClothesShop.Visible = !ClothesShop.Visible;
});


function giveclothes(compId, drawId, texture, palId) {
    native.setPedComponentVariation(alt.Player.local.scriptID, compId, drawId, texture, palId);
};
function tops (top,top1,torso,torso1,und,und1,top2,top3,torso2,torso3,und2,und3) {
    if(pedmodel==(alt.hash('mp_f_freemode_01'))) {
        giveclothes(11, top, top1, 0); //top
        giveclothes(3, torso, torso1, 0); //torso
        giveclothes(8, und, und1, 0); //undershirt
        giveclothes(7, 0, -1, 0); //accs
    } else {
        if (pedmodel==(alt.hash('mp_m_freemode_01'))) {
            giveclothes(11, top2, top3, 0); //top
            giveclothes(3, torso2, torso3, 0); //torso
            giveclothes(8, und2, und3, 0); //undershirt
            giveclothes(7, 0, -1, 0); //accs
    }}
    
};

function giveoutfit(top, top1, mask, mask1, torso, torso1, und, und1, leg, leg1, shoe, shoe1, accs, accs1, 
    top2, top3, mask2, mask3, torso2, torso3, und2, und3, leg2, leg3, shoe2, shoe3, accs2, accs3) {
if(pedmodel== alt.hash('mp_f_freemode_01')) {
    giveclothes(11, top, top1, 0); //top
    giveclothes(1, mask, mask1, 0); //mask
    giveclothes(3, torso, torso1, 0); //torso
    giveclothes(8, und, und1, 0); //undershirt
    giveclothes(4, leg, leg1, 0); //leg
    giveclothes(6, shoe, shoe1, 0); //shoe
    giveclothes(7, accs, accs1, 0); //accs
} else {
    if (pedmodel==alt.hash('mp_m_freemode_01')) {
        giveclothes(11, top2, top3, 0); //top
        giveclothes(1, mask2, mask3, 0); //mask
        giveclothes(3, torso2, torso3, 0); //torso
        giveclothes(8, und2, und3, 0); //undershirt
        giveclothes(4, leg2, leg3, 0); //leg
        giveclothes(6, shoe2, shoe3, 0); //shoe
        giveclothes(7, accs2, accs3, 0); //accs
}}};

function giveprop(id1, draw1, text1, id2, draw2, text2) {
if(pedmodel==alt.hash('mp_f_freemode_01')) {
    native.setPedPropIndex(alt.Player.local.scriptID, id1, draw1, text1, false, 0);
} else {
    if (pedmodel==alt.hash('mp_m_freemode_01')) {
        native.setPedPropIndex(alt.Player.local.scriptID, id2, draw2, text2, false, 0);
}}};

function buymenu(title, price) {
    let buyMenu = new NativeUI.Menu(MenuText.MenuTitle, title, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
    buyMenu.Visible = false;
    buyMenu.CloseableByUser =false;
    buyMenu.AddItem(new NativeUI.UIMenuItem("Purchase this outfit?", ""));
    let buyitem = new NativeUI.UIMenuItem("Purchase", "")
    buyitem.RightLabel = '$ '+price
    buyMenu.AddItem(buyitem);
    buyMenu.AddItem(new NativeUI.UIMenuItem("Cancel", ""))
    buyMenu.Open()

    buyMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase") {
        native.playSound(0, "SELECT", "HUD_FRONTEND_CLOTHESSHOP_SOUNDSET", true, 0, false);
        alt.emit('saveprops', title);
        alt.emit('saveoutfit', title)
        alt.emit('buy', price);
        buyMenu.Close();

    }
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
       // native.clearPedProp(alt.Player.local.scriptID, type);
        //alt.emit('loadprops', 'defaultprop');
        alt.emit('loadoutfit', 'default')
        buyMenu.Close();
        ClothesShop.Open()
    }
})
}
