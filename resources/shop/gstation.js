import * as alt from 'alt-client';
import * as NativeUI from './NativeUI/NativeUi.js';
import * as native from 'natives';
import { deleteMeta, getMeta, hasMeta, setMeta } from 'alt-client';
import { drawtext, handletext } from './client.js';


const MenuSettings = {
  Point: new NativeUI.Point(50, 50),
  TitleScale: 0.8,
  TitleFont: NativeUI.Font.HouseScript,
  DropShadow: true,
  TextAlignment: NativeUI.Alignment.Centered,
}


const MenuText = {
    MenuTitle: "",
    MenuSubTitle: "",
    sprite : "shopui_title_gasstation",
}

const EventNames = {
    ToggleMenu: "Pom:Menu",
}
let text, pomready = 0

const Pom = new NativeUI.Menu(MenuText.MenuTitle, '~r~POM BENSIN~r~', MenuSettings.Point, MenuText.sprite, MenuText.sprite);
Pom.Visible = false;
Pom.GetTitle().Scale = MenuSettings.TitleScale,
Pom.GetTitle().Font = MenuSettings.TitleFont;
Pom.GetTitle().DropShadow = MenuSettings.DropShadow;
Pom.GetTitle().TextAlignment = MenuSettings.TextAlignment;
Pom.CloseableByUser = false;

let BensinItem = new NativeUI.UIMenuItem("Refill Fuel", "");
Pom.AddItem(BensinItem);

Pom.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Refill Fuel") {

    if(pomready == 1) {
      alt.emit('fillgas');
    } else {
      let buyinfo = alt.everyTick(()=>{
        drawtext('VEHICLE TOO FAR!',0.5,0.31,4,0.7,0.9,255, 255, 255,255);
      })
      let info = alt.setInterval(()=>{
        alt.clearEveryTick(buyinfo);
        alt.clearInterval(info);
      }, 5000)
    }
}});

let JerrycanItem = new NativeUI.UIMenuItem("Jerrycan Gas", "");
Pom.AddItem(JerrycanItem);
Pom.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Jerrycan Gas") {
    alt.emitServer('givecan');
    alt.emit('buy', 20);      
}});


let Done = new NativeUI.UIMenuItem("Close", "");
Pom.AddItem(Done);
Pom.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && item.Text == "Close") {
        Pom.Close();
        alt.emit('fuelstop');
        deleteMeta('pom');
}});


let pompa;
let pos;

export function pommenu() {
alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
    let pom = getMeta('pom');
    if(pom == 1) {
	  alt.emitServer("pom");
}
}});
}

export function pomclose() {
  if(Pom.Visible) {
    Pom.Close(true)
  }
}

alt.onServer("Pom:Menu", (veh) => {
  if(Pom.Visible){ return }else
  Pom.Open();
  if(veh) {
  let vehpos = native.getEntityCoords(veh,false);
  let vehdist = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, vehpos.x, vehpos.y, vehpos.z, false);
  text = ''
  if(vehdist < 3) {
  alt.emit('drawfuel');
  pomready = 1
  } else { 
    pomready = 0
   }
  }
});

alt.on(EventNames.ToggleMenu, () => {
    Pom.Visible = !Pom.Visible;
});

alt.on('gasfull', (text)=>{
  handletext(text);
});

