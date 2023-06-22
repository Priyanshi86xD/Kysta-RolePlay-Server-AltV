import * as alt from 'alt-client';
import { getMeta, setMeta } from 'alt-client';
import { deleteMeta } from 'alt-shared';
import * as native from 'natives';
import * as game from 'natives';


const vends1 = [
   'prop_vend_snak_01',
    'prop_vend_snak_01_tu',
]

const vends2 = [
   'prop_vend_water_01',
   'prop_vend_fridge01',
   'prop_vend_soda_02',
   'prop_vend_soda_01',
]

const vends3 = [
   'prop_vend_coffe_01',
]

const roomobj = [
  'p_lestersbed_s', 'p_mbbed_s', 'p_v_res_tt_bed_s', 'v_res_msonbed_s', 'v_49_motelmp_bed',
]

let currentObj;
let currentType;

alt.on('keydown', key => {
  if (key === 69) { 
            for (let i in vends1) {
                let type = vends1[i];
                let object = native.getClosestObjectOfType(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 0.5, alt.hash(type), false, false, false);
                if (object) {
                    currentObj = object;
                    currentType = type;
                    alt.emit('water');
                    buysnack()
                }
            }
        }
})

alt.on('keydown', key => {
  if (key === 69) { 
            for (let i in vends2) {
                let type = vends2[i];
                let object = native.getClosestObjectOfType(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 0.5, alt.hash(type), false, false, false);
                if (object) {
                    currentObj = object;
                    currentType = type;
                    alt.emit('water');
                    buydrink();
                }
            }
        }
})


alt.on('keydown', key => {
  if (key === 69) { 
            for (let i in vends3) {
                let type = vends3[i];
                let object = native.getClosestObjectOfType(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 0.7, alt.hash(type), false, false, false);
                if (object) {
                    currentObj = object;
                    currentType = type;
                    alt.emit('water');
                    buycoffee();
                }
            }
        }
})


function buysnack(){
  let money = getMeta('money');
  let player = alt.Player.local.scriptID;
  const phealth = (native.getEntityHealth(player));
  if(money.cash <= 0 ) { handletext('YOU DONT HAVE ENOUGH CASH!')
} else 
    playanim('mini@sprunk', 'plyr_buy_drink_pt1')
    let anim = alt.setInterval(()=>{
      attach('prop_choc_meto', -120,-150,-55);
      playanim("mp_player_inteat@burger", "mp_player_int_eat_burger");
      alt.clearInterval(anim);
    }, 4000)
        native.setEntityHealth(alt.Player.local.scriptID, (phealth + 20), 100)
        alt.emit('buy', 1);
}

function buydrink(){
    let haus = 0 + getMeta('water');
    let money = getMeta('money');
  let player = alt.Player.local.scriptID;
  const phealth = (native.getEntityHealth(player));
  if(money.cash <= 0 ) { handletext('YOU DONT HAVE ENOUGH CASH!')
} else 
      playanim('mini@sprunk', 'plyr_buy_drink_pt1')
      let anim = alt.setInterval(()=>{
  attach('prop_ld_can_01',-80,-100,-345)
  playanim("mp_player_intdrink", "loop")
  alt.clearInterval(anim);
    }, 4000)
    haus + 50;
    alt.emit('minum', 50);
    alt.emit('buy', 1);
}

function buycoffee(){
  let ngantuk = 0 + getMeta('ngantuk');
    playanim('mini@sprunk', 'plyr_buy_drink_pt1')
    let anim = alt.setInterval(()=>{
    attach('p_ing_coffeecup_01',-80,-100,-345)
    playanim("mp_player_intdrink", "loop")
    alt.clearInterval(anim);
    }, 4000)
      ngantuk + 30;
      alt.emit('ngopi', 30);
      alt.emit('buy', 2);
} 


function attach(entity, xrot, yrot, zrot){
  let player = alt.Player.local.scriptID;
  game.setCurrentPedWeapon(player, 0xA2719263, true);
  let bone = game.getPedBoneIndex(player, 0x8cbd);
  let pos = game.getPedBoneCoords(player, 0x8cbd, 0,0,0);
  let object = game.createObject((native.getHashKey(entity)), pos.x, pos.y, pos.z, false, false, true);
  native.attachEntityToEntity(object, player, bone, 0.09, 0.02, 0.05,xrot, yrot, zrot, false, true, false, true, 1, true, 1 );
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
            game.taskPlayAnim(alt.Player.local.scriptID, animdict, animname, 8.0, 1, 3000, 49, 1, true, true, true);
        }
}, 0);
}


function handletext(text) {
	game.beginTextCommandDisplayHelp("STRING");
	game.addTextComponentSubstringKeyboardDisplay(text);
	game.endTextCommandDisplayHelp(0, 0, true, -1);
};