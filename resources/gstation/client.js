import * as alt from 'alt-client';
import * as NativeUI from './NativeUI/NativeUi.js';
import * as native from 'natives';
import { deleteMeta, getMeta, hasMeta, setMeta } from 'alt-client';


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
let text;
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
    let fuell = getMeta('fueling');
    if(fuell == 1) {
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

const pombensin = [
  'prop_gas_pump_old2',
  'prop_gas_pump_1a',
  'prop_gas_pump_old3',
  'prop_gas_pump_1c',
  'prop_gas_pump_1b',
  'prop_gas_pump_1d',
]

let pominterval;

let pompa;
let pos;
  pominterval = alt.setInterval(()=>{
    for (let i in pombensin) {
      let type = alt.hash(pombensin[i]);
      pos = alt.Player.local.pos;
      let pom = native.getClosestObjectOfType(pos.x, pos.y, pos.z, 1, type, false, false, false);
      
      pompa = native.getEntityModel(pom);
      if(type == pompa){
        if(hasMeta('pom')) { }
        else {
          setMeta('pom', 1);
          if(Pom.Visible) {}
          else {
          handletext("~INPUT_PICKUP~ Fueling vehicle")
          }
        }
      } 
      if(pom == undefined) {
        if(hasMeta('pom')) {
          deleteMeta('pom');
          if(Pom.Visible) {
            Pom.Close(true);
          }
        }
      }
  }},1000)


alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
    let pom = getMeta('pom');
    if(pom == 1) {
    //let pump = native.isObjectNearPoint(pompa, pos.x, pos.y, pos.z, 1);
   // if(pump == true) {
	  alt.emitServer("pom");
	//} else {}
}
}});
//});

alt.onServer("Pom:Menu", (veh) => {
  if(Pom.Visible){ return }else
  Pom.Open();
  let vehpos = native.getEntityCoords(veh,false);
  let vehdist = native.getDistanceBetweenCoords(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, vehpos.x, vehpos.y, vehpos.z, false);
  text = ''
  if(vehdist < 3) {
  alt.emit('drawfuel');
  setMeta('fueling', 1);
  } else { 
    setMeta('fueling', 0);
   }
  });

alt.on(EventNames.ToggleMenu, () => {
    Pom.Visible = !Pom.Visible;
});

alt.on('gasfull', (text)=>{
  handletext(text);
});

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
  native.setTextOutline();
  native.setTextColour(r,g,b,a);
  native.setTextJustification(0);
  native.setTextDropShadow(true);
  native.endTextCommandDisplayText(x, y, 0);
  
}