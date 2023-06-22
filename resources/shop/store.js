import * as alt from 'alt-client';
import * as NativeUI from './NativeUI/NativeUi.js';
import * as game from 'natives';
import * as native from 'natives';
import { getMeta, setMeta } from 'alt-client';
import { handletext } from './client.js';

const MenuSettings = {
  Point: new NativeUI.Point(50, 50),
  TitleScale: 0.8,
  TitleFont: NativeUI.Font.HouseScript,
  DropShadow: true,
  TextAlignment: NativeUI.Alignment.Centered,
}

alt.onServer("freeroam:spawned", () => {
  native.requestModel(987331897); //burger
  native.requestModel(1020618269); //drink
  setMeta('snack', 0);
  setMeta('drink', 0);
  });

const MenuText = {
    MenuTitle: "",
    MenuSubTitle: "",
    sprite : "shopui_title_conveniencestore",
}

const EventNames = {
    ToggleMenu: "Store:Menu",
}

const Shop = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point, MenuText.sprite, MenuText.sprite);
Shop.Visible = false;
Shop.GetTitle().Scale = MenuSettings.TitleScale,
Shop.GetTitle().Font = MenuSettings.TitleFont;
Shop.GetTitle().DropShadow = MenuSettings.DropShadow;
Shop.GetTitle().TextAlignment = MenuSettings.TextAlignment;

let SnackItem = new NativeUI.UIMenuItem("Buy a Burger for $2", "");
Shop.AddItem(SnackItem);

let cash,  bags = 0

Shop.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Buy a Burger for $2") {
    if(cash <= 0){ handletext('YOU DONT HAVE ENOUGH MONEY!') } else {
        let player = alt.Player.local.scriptID;
        const phealth = (native.getEntityHealth(player));
    if(phealth <= 199) {
    attach('prop_cs_burger_01', -120,-150,-55);
    playanim("mp_player_inteat@burger", "mp_player_int_eat_burger")
        native.setEntityHealth(alt.Player.local.scriptID, (phealth + 50), 100)
        alt.emit('buy', 2);
  } else { if(phealth >= 199) {
  // if(bags == 1) {
    let snack = getMeta('snack');
    if(snack <=14){
    let snackinv = snack + 1;
    setMeta('snack', snackinv);
    alt.emit('buy', 2);
    handletext('SNACK ADDED TO INVENTORY');
    alt.log(['snack stored', '', snack].join(''))
    } else
  if(snack >= 15) {
    setMeta('snack', 15);
    handletext('YOUR SNACK INVENTORY IS FULL!');
//  }} else {
 //   handletext('BUY A BAG TO STORE SNACKS TO INVENTORY')
  }
}
}}
}});

let WaterItem = new NativeUI.UIMenuItem("Buy Energy Drink for $1", "");
Shop.AddItem(WaterItem);

Shop.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Buy Energy Drink for $1") {
    let money = getMeta('money');
    cash = money.cash;
    if(cash <= 0){ handletext('YOU DONT HAVE ENOUGH MONEY!') } else {
        let haus = 0 + getMeta('water');
    if(haus <= 99) {
      attach('prop_ecola_can',-80,-100,-345)
      playanim("mp_player_intdrink", "loop")
        haus + 50;
        alt.emit('minum', 50);
        alt.emit('buy', 1);
  } else { if(haus >= 99) {
 //   if(bags == 1) {
    let drink = getMeta('drink');
    if(drink <= 9){
    let drinkinv = drink + 1;
    setMeta('drink', drinkinv);
    alt.emit('buy', 1);
    handletext('DRINK ADDED TO INVENTORY');
    alt.log(['drink stored', '', drink].join(''))
    } else
  if(drink >= 10) {
    setMeta('drink', 10);
    handletext('YOUR DRINK INVENTORY IS FULL!');
//  }} else {
 //   handletext('BUY A BAG TO STORE DRINKS TO INVENTORY')
  }
}
}
}}});

let CoffeeItem = new NativeUI.UIMenuItem("Buy Coffee $2", "");
Shop.AddItem(CoffeeItem);

Shop.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Buy Coffee $2") {
    if(cash <= 0){ handletext('YOU DONT HAVE ENOUGH MONEY!') } else {
        let ngantuk = 0 + getMeta('ngantuk');
    if(ngantuk <= 99) {
      attach('p_ing_coffeecup_01',-80,-100,-345)
      playanim("mp_player_intdrink", "loop")
        ngantuk + 30;
        alt.emit('ngopi', 30);
        alt.emit('buy', 2);
}}}})






alt.on(EventNames.ToggleMenu, () => {
    Shop.Visible = !Shop.Visible;
});


export function storemenu() {
  let store;
  alt.on("keydown", (key) => {
    if (key == "E".charCodeAt(0)) {
      let money = getMeta('money')
      cash = money.cash
          let shop = getMeta('store');
          store = getMeta(shop);
          if(store > 0) {
              setMeta(shop, 2)
             // native.isPedModel(alt.Player.local.scriptID, 0x705E61F2);
              if(Shop.Visible) {}
              else {
              alt.emit('water');
              //let bag = native.getPedDrawableVariation(alt.Player.local.scriptID, 5);
              //if(bag == 40 || bag == 44 || bag == 81 || bag == 85 ) {
              //  bags = 1
                Shop.Open()
            //  } else {
             //   bags = 0
             //   Shop.Open()
             // }
              }
          }
    }
  });
}

function attach(entity, xrot, yrot, zrot){
  let player = alt.Player.local.scriptID;
  game.setCurrentPedWeapon(player, 0xA2719263, true);
  let bone = game.getPedBoneIndex(player, 0x8cbd);
  let pos = game.getPedBoneCoords(player, 0x8cbd, 0,0,0);
  let object = game.createObject((native.getHashKey(entity)), pos.x, pos.y, pos.z, false, false, true);
  native.attachEntityToEntity(object, player, bone, 0.09, 0.02, 0.05,xrot, yrot, zrot, false, true, false, true, 1, true, 0 );
  let burinterval = alt.setInterval(() => {
    native.deleteEntity(object);
    alt.clearInterval(burinterval);
  },3000);
}

function playanim(animdict, animname){
  game.requestAnimDict(animdict);
    let interval = alt.setInterval(() => { 
        if (game.hasAnimDictLoaded(animdict)) {
            alt.clearInterval(interval);
            game.taskPlayAnim(alt.Player.local.scriptID, animdict, animname, 8.0, 1, 3000, 49, 1, false, false, false);
        }
}, 0);
}