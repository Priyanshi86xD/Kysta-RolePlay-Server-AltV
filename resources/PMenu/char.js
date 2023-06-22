import * as alt from 'alt-client';
import { setMeta, getMeta } from 'alt-client';
import * as native from 'natives';
import * as game from 'natives';


let chardata


alt.onServer('setchar', ()=>{
    game.setPedHeadBlendData(alt.Player.local.scriptID, 31, 45, 0, 45, 45, 0, 0.4, 0.5, 0, false);
    game.setPedComponentVariation(alt.Player.local.scriptID, 2, 5, 1, 3);
     game.setPedComponentVariation(alt.Player.local.scriptID, 11, 225, 1, 0);
     game.setPedComponentVariation(alt.Player.local.scriptID, 3, 8, 0, 0);
     game.setPedComponentVariation(alt.Player.local.scriptID, 6, 99, 1, 0);
     game.setPedComponentVariation(alt.Player.local.scriptID, 8, 15, 0, 0);
     game.setPedComponentVariation(alt.Player.local.scriptID, 4, 26, 1, 0);
     game.setPedHairTint(alt.Player.local.scriptID, 5, 3);
     savecharmodel();
    saveoutfit('default');
})

alt.onServer('freeroam:spawned', (intro, data) => {

    chardata = data
    const head = {face1:33,face2:45,skin1:45,skin2:45,fmix:0.5,smix:0.5,}
    const pface1 = {f0:0,f1:0,f2:0,f3:0,f4:0,f5:0,f6:0,f7:0,f8:0,f9:0,f10:0,f11:0,f12:0,f13:0,f14:0,f15:0,f16:0,f17:0,f18:0,f19:0, }
    const hair = {hair1:10, hair2:0, hair3:0}
    const eyeb = {eyeb1:5, eyeb2:2}
    const beard = {beard1:-1, beard2:-1}
    const makeup = {makeup1:-1, makeup2:0}
    const blush = {blush1:-1, blush2:0}
    const lips = {lips1:-1, lips2:0}
    const tat = {colh : 0, ovh : 0}

    if(intro == 0) {
        setMeta('phead', head);
        setMeta('face', pface1);
        setMeta('hair', hair);
        setMeta('eyeb', eyeb);
        setMeta('beard', beard);
        setMeta('eye', 1);
        setMeta('makeup', makeup);
        setMeta('blush', blush);
        setMeta('lips', lips);
        setMeta('headt1', tat);
        setMeta( 'headt2', tat);
        setMeta('headt3' , tat);
        setMeta( 'Torsot1', tat);
        setMeta( 'Torsot2', tat);
        setMeta('Torsot3' , tat);
        setMeta( 'LeftArmt1', tat);
        setMeta( 'LeftArmt2', tat);
        setMeta( 'LeftArmt3', tat);
        setMeta( 'RightArmt1', tat);
        setMeta( 'RightArmt2', tat);
        setMeta( 'RightArmt3', tat);
        setMeta( 'LeftLegt1', tat);
        setMeta( 'LeftLegt2', tat);
        setMeta( 'LeftLegt3', tat);
        setMeta( 'RightLegt1', tat);
        setMeta( 'RightLegt2', tat);
        setMeta( 'RightLegt3', tat);
    } else {
        let face
        if(data.model == 'male') {
            face = data.maleface
        } else if(data.model == 'female'){
            face = data.femaleface
        }
        setMeta('phead', face.phead);
        setMeta('face', face.pface1);
        setMeta('hair', {hair1:face.pface.hair1, hair2:face.pface.hair2, hair3:face.pface.hair3});
        setMeta('eyeb', {eyeb1:face.pface.eyeb1, eyeb2:face.pface.eyeb2});
        setMeta('beard', {beard1: face.pface.beard1, beard2: face.pface.beard2});
        setMeta('eye', face.pface.eye1);
        setMeta('makeup', {makeup1:face.pface.makeup1, makeup2:face.pface.makeup2});
        setMeta('blush', {blush1:face.pface.blush1, blush2:face.pface.blush2});
        setMeta('lips', {lips1:face.pface.lips1, lips2:face.pface.lips2});
        setMeta('headt1', {colh : data.tattoo.headt1.colh, ovh : data.tattoo.headt1.ovh});
        setMeta( 'headt2', {colh : data.tattoo.headt2.colh, ovh : data.tattoo.headt2.ovh});
        setMeta('headt3' , {colh : data.tattoo.headt3.colh, ovh : data.tattoo.headt3.ovh});
        setMeta( 'Torsot1', {colh : data.tattoo.torsot1.colh, ovh : data.tattoo.torsot1.ovh});
        setMeta( 'Torsot2', {colh : data.tattoo.torsot2.colh, ovh : data.tattoo.torsot2.ovh});
        setMeta('Torsot3' , {colh : data.tattoo.torsot3.colh, ovh : data.tattoo.torsot3.ovh});
        setMeta( 'LeftArmt1', {colh : data.tattoo.larm1.colh, ovh : data.tattoo.larm1.ovh});
        setMeta( 'LeftArmt2', {colh : data.tattoo.larm2.colh, ovh : data.tattoo.larm2.ovh});
        setMeta( 'LeftArmt3', {colh : data.tattoo.larm3.colh, ovh : data.tattoo.larm3.ovh});
        setMeta( 'RightArmt1', {colh : data.tattoo.rarm1.colh, ovh : data.tattoo.rarm1.ovh});
        setMeta( 'RightArmt2', {colh : data.tattoo.rarm2.colh, ovh : data.tattoo.rarm2.ovh});
        setMeta( 'RightArmt3', {colh : data.tattoo.rarm3.colh, ovh : data.tattoo.rarm3.ovh});
        setMeta( 'LeftLegt1', {colh : data.tattoo.lleg1.colh, ovh : data.tattoo.lleg1.ovh});
        setMeta( 'LeftLegt2', {colh : data.tattoo.lleg2.colh, ovh : data.tattoo.lleg2.ovh});
        setMeta( 'LeftLegt3', {colh : data.tattoo.lleg3.colh, ovh : data.tattoo.lleg3.ovh});
        setMeta( 'RightLegt1', {colh : data.tattoo.rleg1.colh, ovh : data.tattoo.rleg1.ovh});
        setMeta( 'RightLegt2', {colh : data.tattoo.rleg2.colh, ovh : data.tattoo.rleg2.ovh});
        setMeta( 'RightLegt3', {colh : data.tattoo.rleg3.colh, ovh : data.tattoo.rleg3.ovh});
    }
});

alt.on('loadcharacter', (data)=>{
    loadcharmodel(data);
    chardata = data
});

alt.on('savechar', () => {
    savecharmodel();
    saveoutfit('default');
    saveprops('default')
    savetattoo()
});

alt.on('savehead', ()=>{
    savecharmodel()
})

export function savecharmodel() {
    let male = native.isPedMale(alt.Player.local.scriptID)
    let head = getMeta('phead');
    let face = getMeta('face');
    let hair = getMeta('hair');
    let eyeb = getMeta('eyeb');
    let eye = getMeta('eye');
    let beard = getMeta('beard');
    let blush = getMeta('blush');
    let makeup = getMeta('makeup');
    let lips = getMeta('lips');

let phead = {
    model : native.getEntityModel(alt.Player.local.scriptID),
    face1 : head.face1,
    face2 : head.face2,
    skin1 : head.skin1,
    skin2 : head.skin2,
    fmix : head.fmix,
    smix : head.smix,
}
let pface1 = {
    f0:face.f0,f1:face.f1,f2:face.f2,f3:face.f3,f4:face.f4,f5:face.f5,f6:face.f6,f7:face.f7,f8:face.f8,f9:face.f9,f10:face.f10,
    f11:face.f11,f12:face.f12,f13:face.f13,f14:face.f14,f15:face.f15,f16:face.f16,f17:face.f17,f18:face.f18,f19:face.f19
}

let pface = {hair1:hair.hair1, hair2:hair.hair2, hair3:hair.hair3,eyeb1:eyeb.eyeb1, eyeb2:eyeb.eyeb2, eye1:eye, beard1:beard.beard1,beard2:beard.beard2, 
    blush1:blush.blush1, blush2:blush.blush2, makeup1:makeup.makeup1, makeup2:makeup.makeup2, lips1:lips.lips1, lips2:lips.lips2,}
    
    if(male == false) {
        alt.emitServer('updatedata', 'accounts', 'femaleface', {pface, phead, pface1}, false)
        alt.emitServer('updatedata', 'accounts', 'model', 'female', false)
        chardata.femaleface = {pface, phead, pface1}

    } else if(male == true) {
        alt.emitServer('updatedata', 'accounts', 'maleface', {pface, phead, pface1}, false)
        alt.emitServer('updatedata', 'accounts', 'model', 'male', false)
        chardata.maleface = {pface, phead, pface1}
    }
}


alt.on('savetattoo', savetattoo)

function savetattoo() {
    const tattoo = {
        headt1 : getMeta('headt1'),
    headt2 : getMeta('headt2'),
    headt3 : getMeta('headt3'),
    torsot1 : getMeta('Torsot1'),
    torsot2 : getMeta('Torsot2'),
    torsot3 : getMeta('Torsot3'),
     larm1 : getMeta('LeftArmt1'),
     larm2 : getMeta('LeftArmt2'),
     larm3 : getMeta('LeftArmt3'),
     rarm1 : getMeta('RightArmt1'),
     rarm2 : getMeta('RightArmt2'),
     rarm3 : getMeta('RightArmt3'),
     lleg1 : getMeta('LeftLegt1'),
      lleg2 : getMeta('LeftLegt2'),
      lleg3 : getMeta('LeftLegt3'),
     rleg1 : getMeta('RightLegt1'),
     rleg2 : getMeta('RightLegt2'),
     rleg3 : getMeta('RightLegt3'),
    }
    alt.emitServer('updatedata', 'accounts','tattoo', tattoo, false)
}

export function loadcharmodel(data) {
    let pmodel
    if(data.model == "male") {
        pmodel = data.maleface.phead
    } else {
        pmodel = data.femaleface.phead
    }
    
    if(!pmodel) {}
    else {
        alt.emitServer('setmodel', pmodel.model);
    }
}

alt.onServer('setface', () => {
    let ismale = native.isPedMale(alt.Player.local.scriptID);
    let data
    if(ismale == true) {
        data = chardata.maleface
    } else {
        data = chardata.femaleface
    }
    let pmodel = data.phead  //alt.LocalStorage.get('char');
    let head = data.pface //alt.LocalStorage.get('pface');
    let face = data.pface1  //alt.LocalStorage.get('face');
        loadhead(pmodel.face1,pmodel.face2,pmodel.skin1,pmodel.skin2,pmodel.fmix,pmodel.smix);
        loadchar(face.f0,face.f1,face.f2,face.f3,face.f4,face.f5,face.f6,face.f7,face.f8,face.f9,face.f10,
            face.f11,face.f12,face.f13,face.f14,face.f15,face.f16,face.f17,face.f18,face.f19);
        loadface(head.hair1, head.hair2, head.hair3, head.eyeb1, head.eyeb2, head.eye1, head.beard1,head.beard2, 
        head.blush1, head.blush2, head.makeup1, head.makeup2, head.lips1, head.lips2,);
    loadoutfit('default');
    loadtattoo();
    });

alt.on('saveoutfit',(outfitname)=>{
    saveoutfit(outfitname);
} );



export function saveoutfit(outfitname) {
    let male = native.isPedMale(alt.Player.local.scriptID)
    let outfit = { 
    Torso : native.getPedDrawableVariation(alt.Player.local.scriptID,3),
    Legs : native.getPedDrawableVariation(alt.Player.local.scriptID,4),
    Shoe : native.getPedDrawableVariation(alt.Player.local.scriptID,6),
    Und : native.getPedDrawableVariation(alt.Player.local.scriptID,8),
    Acc : native.getPedDrawableVariation(alt.Player.local.scriptID,7),
    Decals : native.getPedDrawableVariation(alt.Player.local.scriptID,1),
    Tops : native.getPedDrawableVariation(alt.Player.local.scriptID,11),

    Torso1 : native.getPedTextureVariation(alt.Player.local.scriptID,3),
    Legs1 : native.getPedTextureVariation(alt.Player.local.scriptID,4),
    Shoe1 : native.getPedTextureVariation(alt.Player.local.scriptID,6),
    Und1 : native.getPedTextureVariation(alt.Player.local.scriptID,8),
    Acc1 : native.getPedTextureVariation(alt.Player.local.scriptID,7),
    Decals1 : native.getPedTextureVariation(alt.Player.local.scriptID,1),
    Tops1 : native.getPedTextureVariation(alt.Player.local.scriptID,11),
}
if(male == false) {
    alt.emitServer('updatesubdata', 'characters', 'femaleoutfits', outfitname, outfit, true )
} else if(male == true) {
    alt.emitServer('updatesubdata', 'characters', 'maleoutfits', outfitname, outfit, true )
}

}

alt.on('loadoutfit', (outfitname)=>{
    loadoutfit(outfitname)
})


export function loadoutfit(outfitname) {
    let male = native.isPedMale(alt.Player.local.scriptID)
    if(male == false) {
        alt.emitServer('getsubdata', 'characters', 'loadoutfit', 'femaleoutfits', outfitname)
    } else if(male == true) {
        alt.emitServer('getsubdata', 'characters', 'loadoutfit', 'maleoutfits', outfitname)
    }
}

alt.onServer('loadoutfit', (outfit)=>{
    game.setPedComponentVariation(alt.Player.local.scriptID, 3, outfit.Torso, outfit.Torso1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 4, outfit.Legs, outfit.Legs1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 6, outfit.Shoe, outfit.Shoe1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 8, outfit.Und, outfit.Und1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 7, outfit.Acc, outfit.Acc1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 1, outfit.Decals, outfit.Decals1, 0);
  game.setPedComponentVariation(alt.Player.local.scriptID, 11, outfit.Tops, outfit.Tops1, 0);

})

alt.on('saveprops', (propname)=>{
    saveprops(propname);
} );


export function saveprops(propname) {
    let male = native.isPedMale(alt.Player.local.scriptID)

    let pprops = {
        
        hat : native.getPedPropIndex(alt.Player.local.scriptID, 0, 0),
        hat1 : native.getPedPropTextureIndex(alt.Player.local.scriptID, 0, 0),
        glas : native.getPedPropIndex(alt.Player.local.scriptID, 1, 0),
        glas1 : native.getPedPropTextureIndex(alt.Player.local.scriptID, 1, 0),
        left : native.getPedPropIndex(alt.Player.local.scriptID, 6, 0),
        left1 : native.getPedPropTextureIndex(alt.Player.local.scriptID, 6, 0),
        right : native.getPedPropIndex(alt.Player.local.scriptID, 7, 0),
        right1 : native.getPedPropTextureIndex(alt.Player.local.scriptID, 7, 0),
    }
    

    if(male == false) {
        alt.emitServer('updatesubdata', 'characters', 'femaleprops', propname, pprops, true)
    } else if(male == true) {
        alt.emitServer('updatesubdata', 'characters', 'maleprops', propname, pprops, true)
    }

}

alt.on('loadprops', (propname)=>{
    loadprops(propname);
});

alt.on('loadhead', ()=>{
    let ismale = native.isPedMale(alt.Player.local.scriptID);
    let data
    if(ismale == true) {
        data = chardata.maleface
    } else {
        data = chardata.femaleface
    }
    let head = data.pface //alt.LocalStorage.get('pface');
        loadface(head.hair1, head.hair2, head.hair3, head.eyeb1, head.eyeb2, head.eye1, head.beard1,head.beard2, 
        head.blush1, head.blush2, head.makeup1, head.makeup2, head.lips1, head.lips2,);
})

export function loadprops(propname) {
    let male = native.isPedMale(alt.Player.local.scriptID)
    if(male == false) {
        alt.emitServer('getsubdata', 'characters', 'loadprops', 'femaleprops', propname)
    } else if(male == true) {
        alt.emitServer('getsubdata', 'characters', 'loadprops', 'maleprops', propname)
    }
}

alt.onServer('loadprops', (props)=>{

        native.clearPedProp(alt.Player.local.scriptID, 0,0);
        native.clearPedProp(alt.Player.local.scriptID, 1,0);
        native.clearPedProp(alt.Player.local.scriptID, 6,0);
        native.clearPedProp(alt.Player.local.scriptID, 7,0);
        native.setPedPropIndex(alt.Player.local.scriptID, 0, props.hat, props.hat1, true,0);
        native.setPedPropIndex(alt.Player.local.scriptID, 1, props.glas, props.glas1, true,0);
        native.setPedPropIndex(alt.Player.local.scriptID, 6, props.left, props.left1, true,0);
        native.setPedPropIndex(alt.Player.local.scriptID, 7, props.right, props.right1, true,0);
    
})

export function loadhead(fface,mface,fskin,mskin,fmix,smix) {
native.setPedHeadBlendData(alt.Player.local.scriptID, fface, mface, 0, fskin, mskin, 0, fmix, smix, 0, false)
}

export function loadchar(NoseW,NoseH,NoseL,NoseB,NoseT,NoseBS,browH,browW,cheekH,cheekbW,cheekW,eyel,lip,jawW,jawH,chinL,chinP,chinW,chinS,neckW){
    native.setPedMicroMorph(alt.Player.local.scriptID, 0, NoseW);
    native.setPedMicroMorph(alt.Player.local.scriptID, 1, NoseH);
    native.setPedMicroMorph(alt.Player.local.scriptID, 2, NoseL);
    native.setPedMicroMorph(alt.Player.local.scriptID, 3, NoseB);
    native.setPedMicroMorph(alt.Player.local.scriptID, 4, NoseT);
    native.setPedMicroMorph(alt.Player.local.scriptID, 5, NoseBS);
    native.setPedMicroMorph(alt.Player.local.scriptID, 6, browH);
    native.setPedMicroMorph(alt.Player.local.scriptID, 7, browW);
    native.setPedMicroMorph(alt.Player.local.scriptID, 8, cheekH);        
    native.setPedMicroMorph(alt.Player.local.scriptID, 9, cheekbW);
    native.setPedMicroMorph(alt.Player.local.scriptID, 10, cheekW);
    native.setPedMicroMorph(alt.Player.local.scriptID, 11, eyel);  
    native.setPedMicroMorph(alt.Player.local.scriptID, 12, lip);
    native.setPedMicroMorph(alt.Player.local.scriptID, 13, jawW);
    native.setPedMicroMorph(alt.Player.local.scriptID, 14, jawH);
    native.setPedMicroMorph(alt.Player.local.scriptID, 15, chinL);
    native.setPedMicroMorph(alt.Player.local.scriptID, 16, chinP);
    native.setPedMicroMorph(alt.Player.local.scriptID, 17, chinW);
    native.setPedMicroMorph(alt.Player.local.scriptID, 18, chinS);
    native.setPedMicroMorph(alt.Player.local.scriptID, 19, neckW);
}

export function loadface(hair1,hair2, hair3, eyeb1,eyeb2,eye1,beard1,beard2,blush1,blush2,makeup1,makeup2,lips1,lips2) {
    native.setPedComponentVariation(alt.Player.local.scriptID, 2, hair1, 0, 0);
    native.setPedHairTint(alt.Player.local.scriptID, hair2, hair3);
    native.setPedHeadOverlay(alt.Player.local.scriptID, 2, eyeb1, 1);
    native.setPedHeadOverlayTint(alt.Player.local.scriptID, 2, 1, eyeb2, 0);
    native.setHeadBlendEyeColor(alt.Player.local.scriptID, eye1);
    native.setPedHeadOverlay(alt.Player.local.scriptID, 1, beard1, 1.0);
    native.setPedHeadOverlayTint(alt.Player.local.scriptID, 1, 1, beard2, beard2);
    native.setPedHeadOverlay(alt.Player.local.scriptID, 5, blush1, 1.0);
    native.setPedHeadOverlayTint(alt.Player.local.scriptID, 5, 2, blush2, blush2);
    native.setPedHeadOverlay(alt.Player.local.scriptID, 4, makeup1, 1.0);
    native.setPedHeadOverlayTint(alt.Player.local.scriptID, 4, 2, makeup2, makeup2);
    native.setPedHeadOverlay(alt.Player.local.scriptID, 8, lips1, 1.0);
    native.setPedHeadOverlayTint(alt.Player.local.scriptID, 8, 2, lips2, lips2);
}

function loadtattoo() {
    alt.emitServer('getdata', 'accounts', 'loadtattoo', 'tattoo')
   // const tat = alt.LocalStorage.get('ptattoo');
}

alt.onServer('loadtattoo', (tat)=>{

    let headt1 = tat.headt1; settattoo(headt1.colh,headt1.ovh);
  let headt2 = tat.headt2; settattoo(headt2.colh,headt2.ovh);
  let headt3 = tat.headt3; settattoo(headt3.colh,headt3.ovh);
  let torsot1 = tat.torsot1; settattoo(torsot1.colh,torsot1.ovh);
  let torsot2 = tat.torsot2; settattoo(torsot2.colh,torsot2.ovh);
  let torsot3 = tat.torsot3; settattoo(torsot3.colh,torsot3.ovh);
  let larm1 = tat.larm1; settattoo(larm1.colh,larm1.ovh);
  let larm2 = tat.larm2; settattoo(larm2.colh,larm2.ovh);
  let larm3 = tat.larm3; settattoo(larm3.colh,larm3.ovh);
  let rarm1 = tat.rarm1; settattoo(rarm1.colh,rarm1.ovh);
  let rarm2 = tat.rarm2; settattoo(rarm2.colh,rarm2.ovh);
  let rarm3 = tat.rarm3; settattoo(rarm3.colh,rarm3.ovh);
  let lleg1 = tat.lleg1; settattoo(lleg1.colh,lleg1.ovh);
  let lleg2 = tat.lleg2; settattoo(lleg2.colh,lleg2.ovh);
  let lleg3 = tat.lleg3; settattoo(lleg3.colh,lleg3.ovh);
  let rleg1 = tat.rleg1; settattoo(rleg1.colh,rleg1.ovh);
  let rleg2 = tat.rleg2; settattoo(rleg2.colh,rleg2.ovh);
  let rleg3 = tat.rleg3; settattoo(rleg3.colh,rleg3.ovh);
  
})

function settattoo(colh, ovh) {
    native.addPedDecorationFromHashes(alt.Player.local.scriptID, colh, ovh);
}

export let _femaletops = []
export let _maletops = []
export let _femalepants = []
export let _malepants = []
export let _maleshoes = []
export let _femaleshoes = []
export let _bags = []
export let _maleaccs = []
export let _femaleaccs = []

alt.on('savetopf', (top,top1,torso,torso1,und,und1, acc, acc1)=>{

let tops = {
    top:top, top1:top1, torso:torso, torso1:torso1, und:und, und1:und1, acc:acc, acc1:acc1
}
alt.emitServer('updatedata', 'characters', 'femaletops', tops, true)

})

alt.on('savetopm', (top,top1,torso,torso1,und,und1, acc, acc1)=>{

let tops = {
    top:top, top1:top1, torso:torso, torso1:torso1, und:und, und1:und1, acc:acc, acc1:acc1
}

alt.emitServer('updatedata', 'characters', 'maletops', tops, true)

})

export let topclothes = []
export let ppants = []
export let pshoes = []
export let pbags = []
export let paccs = []
export let pglasses = []
export let hats = []
export let masks = []
export let lefthands = []
export let righthands = []
export let earrings = []

alt.onServer('wardrobeset', (data)=>{
    
    let ismale = native.isPedMale(alt.Player.local.scriptID);
    if(ismale == true) {
        topclothes = data.maletops
        ppants = data.malepants
        pshoes = data.maleshoes
        paccs = data.maleaccs
        pbags = data.bags
        pglasses = data.maleglasses
        hats = data.malehats
        lefthands = data.leftmaccs
        righthands = data.rightmaccs
        earrings = data.earsm
        masks = data.masks
    } else {
        topclothes = data.femaletops
        ppants = data.femalepants
        pshoes = data.femaleshoes
        paccs = data.femaleaccs
        pbags = data.bags
        pglasses = data.femaleglasses
        hats = data.femalehats
        lefthands = data.leftfaccs
        righthands = data.rightfaccs
        earrings = data.earsf
        masks = data.masks
    }

})

alt.on('savepantm', (pant, color)=>{

let pants = {
    pant:pant, texture:color
}

alt.emitServer('updatedata', 'characters', 'malepants', pants, true)

})

alt.on('savepantf', (pant, color)=>{

let pants = {
    pant:pant, texture:color
}

alt.emitServer('updatedata', 'characters', 'femalepants', pants, true)

})

alt.on('saveshoem', (shoe, color)=>{

let shoes = {
    shoe:shoe, texture:color
}

alt.emitServer('updatedata', 'characters', 'maleshoes', shoes, true)

})

alt.on('saveshoef', (shoe, color)=>{

let shoes = {
    shoe:shoe, texture:color
}

alt.emitServer('updatedata', 'characters', 'femaleshoes', shoes, true)

})

alt.on('savebag', (bag, color)=>{

let bags = {
    bag:bag, texture:color
}

alt.emitServer('updatedata', 'characters','bags', bags, true)

})

alt.on('saveaccm', (acc, color)=>{

let accs = {
    acc:acc, texture:color
}

alt.emitServer('updatedata', 'characters','maleaccs', accs, true)

})

alt.on('saveaccf', (acc, color)=>{

let accs = {
    acc:acc, texture:color
}
alt.emitServer('updatedata', 'characters','femaleaccs', accs, true)

})

alt.on('saveglasesm', (acc, color)=>{

let glases = {
    prop:acc, texture:color
}
alt.emitServer('updatedata', 'characters','maleglasses', glases, true)

})

alt.on('saveglasesf', (acc, color)=>{

let glases = {
    prop:acc, texture:color
}
alt.emitServer('updatedata', 'characters','femaleglasses', glases, true)

})

alt.on('savehatm', (acc, color)=>{

let hats = {
    prop:acc, texture:color
}
alt.emitServer('updatedata', 'characters','malehats',hats, true)

})

alt.on('savehatf', (acc, color)=>{

let hats = {
    prop:acc, texture:color
}
alt.emitServer('updatedata', 'characters','femalehats', hats, true)

})

alt.on('savemask', (acc, color)=>{

let masks = {
    mask:acc, texture:color
}
alt.emitServer('updatedata', 'characters','masks', masks, true)

})

alt.on('saveaccleftm', (acc, color)=>{

let accs = {
    acc:acc, texture:color
}
alt.emitServer('updatedata', 'characters','leftmaccs', accs, true)

})

alt.on('saveaccleftf', (acc, color)=>{

let accs = {
    acc:acc, texture:color
}
alt.emitServer('updatedata', 'characters','leftfaccs', accs, true)

})

alt.on('saveaccrightm', (acc, color)=>{

let accs = {
    acc:acc, texture:color
}
alt.emitServer('updatedata', 'characters','rightmaccs', accs, true)

})

alt.on('saveaccrightf', (acc, color)=>{

let accs = {
    acc:acc, texture:color
}
alt.emitServer('updatedata', 'characters','rightfaccs', accs, true)

})

alt.on('saveearm', (acc, color)=>{

let accs = {
    acc:acc, texture:color
}
alt.emitServer('updatedata', 'characters','earsm', accs, true)

})

alt.on('saveearf', (acc, color)=>{

let accs = {
    acc:acc, texture:color
}
alt.emitServer('updatedata', 'characters','earsf', accs, true)

})


