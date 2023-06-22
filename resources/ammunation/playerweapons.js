import * as alt from 'alt-client';
import { setMeta } from 'alt-shared';
import * as native from 'natives';
import { liverylist, WeaponComponents } from './components.js';

let playerweapons = {}

export const cweapons = [
0x22D8FE39, 0x2B5EF5EC, 0x5EF9FEC4, 0x97EA20B8, 0x47757124, 0x57A4368C, 0xD205520E, 0xC1B3C3D1, 
0xCB96392F, 0xDC4DB296, 0x917F6C8C, 0x1B06D571, 0x99AEEB3B, 0xBFE256D4, 0xBFD21232, 0x88374054, 
0x3656C8C1, 0xAF3696A1, 0x83839C4,  0x7FD62962, 0xDBBD7280, 0x61012683, 0x9D07F764, 
0xEFE7E2DF, 0xA3D4D34, 0xDB1AA450, 0x13532244, 0xBD248B55, 0x2BE6766B, 0x78A97CD0, 0x476BF155,

0xAF113F99, 0xBFEFFF6D, 0x394F415C, 0x7F229F94, 0x84D6FAFD, 0x83BF0278,  0xFAD1F1C9, 0x624FE830, 
0x9D1F17E6, 0xC0A3098D, 0x969C3D67, 0xE284C527, 0x9D61E50F, 0x5A96BA4, 0xEF951FBB, 0x3AABBBAA, 
0xA89CB99E, 0x1D073A89, 0x555AF99A, 0x7846A318, 0x12E82D3D, 0xC472FE2, 0xA914799, 0xC734385A, 
0x6A6C02E0, 0x5FC3C11, 0x781FE4A, 0x7F7497E5 , 0xA284510B, 0x4DD2DC56, 0x63AB0442, 0x42BF8A85 , 
0x6D544C99 , 0xB1CA77B1 , 0xB62D1F67 , 0xA0973D5E, 0x497FACC3 , 0x93E220BD , 0x24B17070 , 
0xBA45E8B8 , 0xAB564B93 , 0xFDBC8A50 , 0x2C3731D9 , 0xFBAB5776, 0x92A27487, 0xCD274149, 
0xD8DF3C3C, 0x8BB05FD7 , 0x4E875F73 , 0xF9DCBF2D , 0x99B507EA , 0xDD5DF8D9 , 0x678B81B1 , 
]

export function setplayerweapon() {

}

alt.on('loadweapon', (data)=>{
    playerweapons = data;
    loadweapon(data)
})


alt.onServer('chardone', ()=> {
    loadweapon(playerweapons);
});

export function saveweapon(weapId) {
    let weapname = 'weap'+weapId
    let weap = {
        weaphash: weapId,
        color:0
    }
    alt.emitServer('updatesubdata', 'weapons', 'weapons', weapname, weap,true)
    playerweapons.weapons[weapname] = weap
    setMeta(weapId, 1)
}

export function saveweaponcolor(weapId, color) {
    let weapname = 'weap'+weapId
    let weap = {
        weaphash: weapId,
        color: color
    }
    alt.emitServer('updatesubdata', 'weapons', 'weapons', weapname, weap, true)
    playerweapons.weapons[weapname] = weap
    //alt.emitServer('updatedata', weapcol, color, false)
    //alt.log(weapcol, color)
}

alt.onServer('saveweaponmod', (weapId, weapComp)=>{
    let compdata = {
        WeapHash:weapId,
        Hash:weapComp
    }
    alt.emitServer('updatedata', 'weapons', 'weaponmods', compdata, true)
    playerweapons.weaponmods.push(compdata);
       // alt.LocalStorage.set(weapComp, 1);
        //alt.LocalStorage.save();
        setMeta(weapComp, 1);
    
})

export function loadweapon(data){
    for(let i in data.weapons) {
    //let weapon = alt.LocalStorage.get(cweapons[i]);
    //if(weapon == 1) {
    
    alt.emitServer("Give:Weapon", data.weapons[i].weaphash);
    alt.emitServer('setweaponcolor', data.weapons[i].weaphash, data.weapons[i].color)
    setMeta(data.weapons[i].weaphash, 1);
    loadweaponcomp(data.weapons[i].weaphash, data);
    //loadweaponcolor(data[i]);
    loadweaponlivery(data.weapons[i].weaphash, data.livery);
    }
    loadarmor(data.armors)
    setMeta('armor', data.armorstock)
}

function loadweaponcomp(weapId, data) {
    let weapcomp = data.weaponmods.filter(function(weapon) {
        return weapon.WeapHash == weapId;
      })
    if(weapcomp) {
        for(let i in weapcomp) {
            //let comp = alt.LocalStorage.get(weapcomp[i].Hash);
                alt.emitServer("Give:WeaponComp", weapId, weapcomp[i].Hash)
                setMeta(weapcomp[i].Hash, 1)
        }
    }
}

export function saveliverycolor(weapon, comp, color) {
    let livery = {type: comp, col: color}
    let livcol = weapon+'livery';
    alt.emitServer('updatesubdata', 'weapons', 'livery', livcol, livery, true)
    playerweapons.livery[livcol] = livery
   // alt.LocalStorage.set(livcol, livery);
   // alt.LocalStorage.save();
}

function loadweaponlivery(weapId, data) {
   // let weapcomp = liverylist.filter(function(weapon) {
     //   return weapon.WeapHash == weapId;
    //  })

    let livcol = weapId+'livery'
    let livery = data[livcol]
    if(livery) {
        alt.emitServer("Give:WeaponComp", weapId, livery.type);
        native.setPedWeaponComponentTintIndex(alt.Player.local.scriptID, weapId, livery.type, livery.col )
        setMeta(livery.type, 1)
    }
}

function loadarmor(data) {
    for(let i in data) {
        if(data[i]) {
            let name = 'armor'+data[i].draw+data[i].color
            setMeta(name, 1)
        }
    }
}