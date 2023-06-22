"use strict";
/// <reference path="typings/altv-client.d.ts"/>
/// <reference path="typings/natives.d.ts"/>
import * as alt from "alt-client";
import { setMeta } from "alt-shared";
import * as game from "natives";
import * as native from 'natives';

let versus = [], currentkiller, pericoland = false

let pvp = {
  name : 'null',
  kill : 0,
  death : 0,
}

//alt.onServer('introstat', (number)=>{

alt.onServer("freeroam:spawned", (number, data, weapons, clothes)=>{
  native.doScreenFadeOut(0);
  //alt.emitServer('introset')
  if(number == 1) {
    let load = alt.setInterval(()=>{
      alt.clearInterval(load);
      alt.emit('loadhouse', data);
      alt.emit('loadcharacter', data)
      alt.emit('loadweapon', weapons);
      setMeta('taxiwork', data.taxijob)
      alt.emit('chatload')
    }, 3000)
} 
else {
  alt.emit('introscene');
}
alt.emit('setgarage', data);
alt.emit('sethangar', data)
let timeout = alt.setTimeout(()=>{
  alt.clearTimeout(timeout);
  setipl()
}, 10000);
})

alt.onServer('introfinish', ()=>{
  alt.emitServer('updatedata', 'accounts', 'intro', 1, false)
  alt.emit('chatload')
  //alt.LocalStorage.set('stat_intro', 1);
  //alt.LocalStorage.save();
  //alt.emit('setgarage');
});

alt.onServer('deathcam', (killed, killer, killId) =>{
    native.triggerScreenblurFadeIn(2000);
    game.setCamDeathFailEffectState(2);
    let pos = alt.Player.local.pos;
    let h = native.getHeadingFromVector2d((pos.x + 50 - pos.x), (pos.y + 20 - pos.y));
    let roadpos2 = native.getRoadBoundaryUsingHeading(pos.x + 50, pos.y + 20, pos.z, h, pos);
    //let z = game.getGroundZFor3dCoord(roadpos2[1].x, roadpos2[1].y, roadpos2[1].z, roadpos2[1].z+20, false, false)    
    let spawnpos = {x: roadpos2[1].x, y: roadpos2[1].y, z: roadpos2[1].z+2, h}
    
    let death = alt.everyTick(()=>{
        drawtext('~r~WASTED~r~',0.5,0.35,7,2.6,1.0,255,0,0,255);
        drawtext('YOU ARE DEAD!',0.5,0.47,4,1.3,1.0,255, 255, 255,255);
    });
    let titlet = alt.setInterval(()=>{
      if(death) {
        alt.clearEveryTick(death);
      }
        alt.clearInterval(titlet);
    },4000);
    game.playSound(0, "Bed", "WastedSounds", true, 0, false);
    game.doScreenFadeOut(5000);
    if(killed == true) {
      if(killId == alt.Player.local.id) {
        alt.emitServer('respawn', spawnpos, false);
      } else {
        alt.emitServer('respawn', spawnpos, killed);
        alt.log('You are killed by ', killer)
      currentkiller = killId
      if(versus[killId]) {
        versus[killId].death += 1
      } else {
        pvp.name = killer 
        pvp.kill = 0
        pvp.death = 1
        versus[killId] = pvp;
      }
    }
      
    } else {
      alt.emitServer('respawn', spawnpos, false);
    }
    
    let interval = alt.setInterval(() => {
        native.disableScreenblurFade();
        game.setCamDeathFailEffectState(0);
        alt.clearInterval(interval);
    },5000);
 });

alt.onServer('killnotif', (plname, plid)=>{
  if(versus[plid]) {
    versus[plid].kill += 1
  } else {
    pvp.name = plname 
    pvp.kill = 1
    pvp.death = 0
    versus[plid] = pvp;
  }
  
  alt.emit('pvpnotif', versus[plid])
})

 alt.onServer('fadeout', () =>{
        native.doScreenFadeOut(100);
        native.setPlayerInvincible(alt.Player, true);
 })

 alt.onServer('re-spawn', (killed) =>{
    native.setPlayerInvincible(alt.Player, true);
    
    let int = alt.setInterval(() =>{
        native.doScreenFadeIn(2000);
        native.setPlayerInvincible(alt.Player, false);
        if(killed == true) {
          alt.emit('pvpnotif', versus[currentkiller])
        }
        alt.clearInterval(int);
    },7000); 
 })

 alt.onServer('outfadein', ()=>{
    native.doScreenFadeOut(1000);
    let out = alt.setInterval(()=>{
        native.doScreenFadeIn(2000);
        alt.clearInterval(out);
    }, 4000)
  })

  

alt.onServer("freeroam:switchInOutPlayer", (in_switch, instant_switch, switch_type) => {
  if (in_switch) {
    let interval = alt.setInterval(() => {
      game.switchInPlayer(alt.Player.local.scriptID);
      alt.clearInterval(interval);
  }, 2000)
  } else {
    let interval = alt.setInterval(() => {
    game.switchOutPlayer(alt.Player.local.scriptID, instant_switch, switch_type);
    alt.clearInterval(interval);
  }, 5000)}
});

alt.on('loadcayoipl', cayoipl)

alt.on('unloadcayoipl', unloadcayoipl)

// Source: https://github.com/Stuyk/altV-Open-Roleplay/blob/5ccdeb9e960a7e0fde758cc89c366ed2953cc639/resources/orp/client/systems/interiors.mjs
//alt.onServer("freeroam:Interiors", () => {
function setipl() {
  alt.requestIpl("ex_dt1_02_office_02b");
  alt.requestIpl("chop_props");
  alt.requestIpl("FIBlobby");
  alt.removeIpl("FIBlobbyfake");
  alt.requestIpl("FBI_colPLUG");
  alt.requestIpl("FBI_repair");
  alt.requestIpl("v_tunnel_hole");
  alt.requestIpl("TrevorsMP");
  alt.requestIpl("TrevorsTrailer");
  alt.requestIpl("TrevorsTrailerTidy");
  alt.removeIpl("farm_burnt");
  alt.removeIpl("farm_burnt_lod");
  alt.removeIpl("farm_burnt_props");
  alt.removeIpl("farmint_cap");
  alt.removeIpl("farmint_cap_lod");
  alt.requestIpl("farm");
  alt.requestIpl("farmint");
  alt.requestIpl("farm_lod");
  alt.requestIpl("farm_props");
  alt.requestIpl("facelobby");
  alt.removeIpl("CS1_02_cf_offmission");
  alt.requestIpl("CS1_02_cf_onmission1");
  alt.requestIpl("CS1_02_cf_onmission2");
  alt.requestIpl("CS1_02_cf_onmission3");
  alt.requestIpl("CS1_02_cf_onmission4");
  alt.requestIpl("v_rockclub");
  alt.requestIpl("v_janitor");
  alt.removeIpl("hei_bi_hw1_13_door");
  alt.requestIpl("bkr_bi_hw1_13_int");
  alt.requestIpl("ufo");
  alt.requestIpl("ufo_lod");
  alt.requestIpl("ufo_eye");
  alt.removeIpl("v_carshowroom");
  alt.removeIpl("shutter_open");
  alt.removeIpl("shutter_closed");
  alt.removeIpl("shr_int");
  alt.requestIpl("csr_afterMission");
  alt.requestIpl("v_carshowroom");
  alt.requestIpl("shr_int");
  alt.requestIpl("shutter_closed");
  alt.requestIpl("smboat");
  alt.requestIpl("smboat_distantlights");
  alt.requestIpl("smboat_lod");
  alt.requestIpl("smboat_lodlights");
  alt.requestIpl("cargoship");
  alt.requestIpl("railing_start");
  alt.removeIpl("sp1_10_fake_interior");
  alt.removeIpl("sp1_10_fake_interior_lod");
  alt.requestIpl("sp1_10_real_interior");
  alt.requestIpl("sp1_10_real_interior_lod");
  alt.removeIpl("id2_14_during_door");
  alt.removeIpl("id2_14_during1");
  alt.removeIpl("id2_14_during2");
  alt.removeIpl("id2_14_on_fire");
  alt.removeIpl("id2_14_post_no_int");
  alt.removeIpl("id2_14_pre_no_int");
  alt.removeIpl("id2_14_during_door");
  alt.requestIpl("id2_14_during1");
  alt.removeIpl("Coroner_Int_off");
  alt.requestIpl("coronertrash");
  alt.requestIpl("Coroner_Int_on");
  alt.removeIpl("bh1_16_refurb");
  alt.removeIpl("jewel2fake");
  alt.removeIpl("bh1_16_doors_shut");
  alt.requestIpl("refit_unload");
  alt.requestIpl("post_hiest_unload");
  alt.requestIpl("Carwash_with_spinners");
  alt.requestIpl("KT_CarWash");
  alt.requestIpl("ferris_finale_Anim");
  alt.removeIpl("ch1_02_closed");
  alt.requestIpl("ch1_02_open");
  alt.requestIpl("AP1_04_TriAf01");
  alt.requestIpl("CS2_06_TriAf02");
  alt.requestIpl("CS4_04_TriAf03");
  alt.removeIpl("scafstartimap");
  alt.requestIpl("scafendimap");
  alt.removeIpl("DT1_05_HC_REMOVE");
  alt.requestIpl("DT1_05_HC_REQ");
  alt.requestIpl("DT1_05_REQUEST");
  alt.requestIpl("dt1_05_hc_remove");
  alt.requestIpl("dt1_05_hc_remove_lod");
  alt.requestIpl("FINBANK");
  alt.removeIpl("DT1_03_Shutter");
  alt.removeIpl("DT1_03_Gr_Closed");
  alt.requestIpl("golfflags");
  alt.requestIpl("airfield");
  alt.requestIpl("v_garages");
  alt.requestIpl("v_foundry");
  alt.requestIpl("hei_yacht_heist");
  alt.requestIpl("hei_yacht_heist_Bar");
  alt.requestIpl("hei_yacht_heist_Bedrm");
  alt.requestIpl("hei_yacht_heist_Bridge");
  alt.requestIpl("hei_yacht_heist_DistantLights");
  alt.requestIpl("hei_yacht_heist_enginrm");
  alt.requestIpl("hei_yacht_heist_LODLights");
  alt.requestIpl("hei_yacht_heist_Lounge");
  alt.requestIpl("hei_carrier");
  alt.requestIpl("hei_Carrier_int1");
  alt.requestIpl("hei_Carrier_int2");
  alt.requestIpl("hei_Carrier_int3");
  alt.requestIpl("hei_Carrier_int4");
  alt.requestIpl("hei_Carrier_int5");
  alt.requestIpl("hei_Carrier_int6");
  alt.requestIpl("hei_carrier_LODLights");
  alt.requestIpl("bkr_bi_id1_23_door");
  alt.requestIpl("lr_cs6_08_grave_closed");
  alt.requestIpl("hei_sm_16_interior_v_bahama_milo_");
  alt.requestIpl("CS3_07_MPGates");
  alt.requestIpl("cs5_4_trains");
  alt.requestIpl("v_lesters");
  alt.requestIpl("v_trevors");
  alt.requestIpl("v_michael");
  alt.requestIpl("v_comedy");
  alt.requestIpl("v_cinema");
  alt.requestIpl("V_Sweat");
  alt.requestIpl("V_35_Fireman");
  //alt.requestIpl("redCarpet");
  alt.requestIpl("triathlon2_VBprops");
  alt.requestIpl("jetstenativeurnel");
  alt.requestIpl("Jetsteal_ipl_grp1");
  alt.requestIpl("v_hospital");
  alt.removeIpl("RC12B_Default");
  alt.removeIpl("RC12B_Fixed");
  alt.requestIpl("RC12B_Destroyed");
  alt.requestIpl("RC12B_HospitalInterior");
  alt.requestIpl("canyonriver01");
  alt.requestIpl("canyonriver01_lod");
  alt.requestIpl("cs3_05_water_grp1");
  alt.requestIpl("cs3_05_water_grp1_lod");
  alt.requestIpl("trv1_trail_start");
  alt.requestIpl("CanyonRvrShallow");
    native.setMinimapComponent(15, true, -1);
//native.requestIpl("cs3_07_mpgates");
native.removeIpl("cs3_07_mpgates")
native.setZoneEnabled(native.getZoneFromNameId("ArmyB"), true);
native.setZoneEnabled(native.getZoneFromNameId("Jail"), true);
;
}

alt.onServer("freeroam:sendNotification", sendNotification);


function drawtext(msg, x, y, font, scale, wrap, r, g, b, a,) {
  native.beginTextCommandDisplayText('STRING');
  native.addTextComponentSubstringPlayerName(msg);
  native.setTextFont(font);
  native.setTextScale(1, scale);
  native.setTextWrap(0.0, wrap);
  native.setTextCentre(true);
  native.setTextColour(r,g,b,a);
  native.setTextOutline();
  native.setTextJustification(0);
  native.setTextDropShadow(true);
  native.endTextCommandDisplayText(x, y, 0);
}

function sendNotification(textColor, bgColor, message, blink) {
  game.setColourOfNextTextComponent(textColor);
  game.setNotificationBackgroundColor(bgColor);
  game.setNotificationTextEntry("STRING");
  game.addTextComponentSubstringPlayerName(message);
  game.drawNotification(blink, false);
}


function picnotification(pic, sender, message1, message2) {
  native.beginTextCommandThefeedPost('STRING')
  native.setColourOfNextTextComponent(-1)
  //native.thefeedSetScriptedMenuHeight(0.1)
  native.thefeedSetBackgroundColorForNextPost(140)
  native.thefeedSetFlashDurationParameterForNextMessage(1000)
  native.thefeedSetSnapFeedItemPositions(true);
  native.thefeedSetRgbaParameterForNextMessage(0,150,100,50)
  native.addTextComponentSubstringPlayerName(message2)
  native.endTextCommandThefeedPostMessagetext(pic,pic, true, 4, sender, message1)
  native.endTextCommandThefeedPostTicker(true, true)
}

function cayoipl() {
  alt.requestIpl('h4_islandairstrip');
  alt.requestIpl('h4_islandairstrip_props');
  alt.requestIpl('h4_islandx_mansion');
  alt.requestIpl('h4_islandx_mansion_props');
  alt.requestIpl('h4_islandx_props');
  alt.requestIpl('h4_islandxdock');
  alt.requestIpl('h4_islandxdock_props');
  alt.requestIpl('h4_islandxdock_props_2');
  alt.requestIpl('h4_islandxtower');
  alt.requestIpl('h4_islandx_maindock');
  alt.requestIpl('h4_islandx_maindock_props');
  alt.requestIpl('h4_islandx_maindock_props_2');
  alt.requestIpl('h4_IslandX_Mansion_Vault');
  alt.requestIpl('h4_islandairstrip_propsb');
  alt.requestIpl('h4_beach');
  alt.requestIpl('h4_beach_props');
  alt.requestIpl('h4_beach_bar_props');
  alt.requestIpl('h4_islandx_barrack_props');
  alt.requestIpl('h4_islandx_checkpoint');
  alt.requestIpl('h4_islandx_checkpoint_props');
  alt.requestIpl('h4_islandx_Mansion_Office');
  alt.requestIpl('h4_islandx_Mansion_LockUp_01');
  alt.requestIpl('h4_islandx_Mansion_LockUp_02');
  alt.requestIpl('h4_islandx_Mansion_LockUp_03');
  alt.requestIpl('h4_islandairstrip_hangar_props');
  alt.requestIpl('h4_IslandX_Mansion_B');
  alt.requestIpl('h4_islandairstrip_doorsclosed');
  alt.requestIpl('h4_Underwater_Gate_Closed');
  alt.requestIpl('h4_mansion_gate_closed');
  alt.requestIpl('h4_aa_guns');
  alt.requestIpl('h4_IslandX_Mansion_GuardFence');
  alt.requestIpl('h4_IslandX_Mansion_Entrance_Fence');
  alt.requestIpl('h4_IslandX_Mansion_B_Side_Fence');
  alt.requestIpl('h4_IslandX_Mansion_Lights');
  alt.requestIpl('h4_islandxcanal_props');
  alt.requestIpl('h4_beach_props_party');
  alt.requestIpl('h4_islandX_Terrain_props_06_a');
  alt.requestIpl('h4_islandX_Terrain_props_06_b');
  alt.requestIpl('h4_islandX_Terrain_props_06_c');
  alt.requestIpl('h4_islandX_Terrain_props_05_a');
  alt.requestIpl('h4_islandX_Terrain_props_05_b');
  alt.requestIpl('h4_islandX_Terrain_props_05_c');
  alt.requestIpl('h4_islandX_Terrain_props_05_d');
  alt.requestIpl('h4_islandX_Terrain_props_05_e');
  alt.requestIpl('h4_islandX_Terrain_props_05_f');
  alt.requestIpl('H4_islandx_terrain_01');
  alt.requestIpl('H4_islandx_terrain_02');
  alt.requestIpl('H4_islandx_terrain_03');
  alt.requestIpl('H4_islandx_terrain_04');
  alt.requestIpl('H4_islandx_terrain_05');
  alt.requestIpl('H4_islandx_terrain_06');
  alt.requestIpl('h4_ne_ipl_00');
  alt.requestIpl('h4_ne_ipl_01');
  alt.requestIpl('h4_ne_ipl_02');
  alt.requestIpl('h4_ne_ipl_03');
  alt.requestIpl('h4_ne_ipl_04');
  alt.requestIpl('h4_ne_ipl_05');
  alt.requestIpl('h4_ne_ipl_06');
  alt.requestIpl('h4_ne_ipl_07');
  alt.requestIpl('h4_ne_ipl_08');
  alt.requestIpl('h4_ne_ipl_09');
  alt.requestIpl('h4_nw_ipl_00');
  alt.requestIpl('h4_nw_ipl_01');
  alt.requestIpl('h4_nw_ipl_02');
  alt.requestIpl('h4_nw_ipl_03');
  alt.requestIpl('h4_nw_ipl_04');
  alt.requestIpl('h4_nw_ipl_05');
  alt.requestIpl('h4_nw_ipl_06');
  alt.requestIpl('h4_nw_ipl_07');
  alt.requestIpl('h4_nw_ipl_08');
  alt.requestIpl('h4_nw_ipl_09');
  alt.requestIpl('h4_se_ipl_00');
  alt.requestIpl('h4_se_ipl_01');
  alt.requestIpl('h4_se_ipl_02');
  alt.requestIpl('h4_se_ipl_03');
  alt.requestIpl('h4_se_ipl_04');
  alt.requestIpl('h4_se_ipl_05');
  alt.requestIpl('h4_se_ipl_06');
  alt.requestIpl('h4_se_ipl_07');
  alt.requestIpl('h4_se_ipl_08');
  alt.requestIpl('h4_se_ipl_09');
  alt.requestIpl('h4_sw_ipl_00');
  alt.requestIpl('h4_sw_ipl_01');
  alt.requestIpl('h4_sw_ipl_02');
  alt.requestIpl('h4_sw_ipl_03');
  alt.requestIpl('h4_sw_ipl_04');
  alt.requestIpl('h4_sw_ipl_05');
  alt.requestIpl('h4_sw_ipl_06');
  alt.requestIpl('h4_sw_ipl_07');
  alt.requestIpl('h4_sw_ipl_08');
  alt.requestIpl('h4_sw_ipl_09');
  alt.requestIpl('h4_islandx_mansion');
  alt.requestIpl('h4_islandxtower_veg');
  alt.requestIpl('h4_islandx_sea_mines');
  alt.requestIpl('h4_islandx');
  alt.requestIpl('h4_islandx_barrack_hatch');
  alt.requestIpl('h4_islandxdock_water_hatch');
  alt.requestIpl('h4_beach_party');
  alt.requestIpl('h4_mph4_terrain_01_grass_0');
  alt.requestIpl('h4_mph4_terrain_01_grass_1');
  alt.requestIpl('h4_mph4_terrain_02_grass_0');
  alt.requestIpl('h4_mph4_terrain_02_grass_1');
  alt.requestIpl('h4_mph4_terrain_02_grass_2');
  alt.requestIpl('h4_mph4_terrain_02_grass_3');
  alt.requestIpl('h4_mph4_terrain_04_grass_0');
  alt.requestIpl('h4_mph4_terrain_04_grass_1');
  alt.requestIpl('h4_mph4_terrain_04_grass_2');
  alt.requestIpl('h4_mph4_terrain_04_grass_3');
  alt.requestIpl('h4_mph4_terrain_05_grass_0');
  alt.requestIpl('h4_mph4_terrain_06_grass_0');
  alt.requestIpl('h4_mph4_airstrip_interior_0_airstrip_hanger');

}

function unloadcayoipl() {
  alt.removeIpl('h4_islandairstrip');
alt.removeIpl('h4_islandairstrip_props');
alt.removeIpl('h4_islandx_mansion');
alt.removeIpl('h4_islandx_mansion_props');
alt.removeIpl('h4_islandx_props');
alt.removeIpl('h4_islandxdock');
alt.removeIpl('h4_islandxdock_props');
alt.removeIpl('h4_islandxdock_props_2');
alt.removeIpl('h4_islandxtower');
alt.removeIpl('h4_islandx_maindock');
alt.removeIpl('h4_islandx_maindock_props');
alt.removeIpl('h4_islandx_maindock_props_2');
alt.removeIpl('h4_IslandX_Mansion_Vault');
alt.removeIpl('h4_islandairstrip_propsb');
alt.removeIpl('h4_beach');
alt.removeIpl('h4_beach_props');
alt.removeIpl('h4_beach_bar_props');
alt.removeIpl('h4_islandx_barrack_props');
alt.removeIpl('h4_islandx_checkpoint');
alt.removeIpl('h4_islandx_checkpoint_props');
alt.removeIpl('h4_islandx_Mansion_Office');
alt.removeIpl('h4_islandx_Mansion_LockUp_01');
alt.removeIpl('h4_islandx_Mansion_LockUp_02');
alt.removeIpl('h4_islandx_Mansion_LockUp_03');
alt.removeIpl('h4_islandairstrip_hangar_props');
alt.removeIpl('h4_IslandX_Mansion_B');
alt.removeIpl('h4_islandairstrip_doorsclosed');
alt.removeIpl('h4_Underwater_Gate_Closed');
alt.removeIpl('h4_mansion_gate_closed');
alt.removeIpl('h4_aa_guns');
alt.removeIpl('h4_IslandX_Mansion_GuardFence');
alt.removeIpl('h4_IslandX_Mansion_Entrance_Fence');
alt.removeIpl('h4_IslandX_Mansion_B_Side_Fence');
alt.removeIpl('h4_IslandX_Mansion_Lights');
alt.removeIpl('h4_islandxcanal_props');
alt.removeIpl('h4_beach_props_party');
alt.removeIpl('h4_islandX_Terrain_props_06_a');
alt.removeIpl('h4_islandX_Terrain_props_06_b');
alt.removeIpl('h4_islandX_Terrain_props_06_c');
alt.removeIpl('h4_islandX_Terrain_props_05_a');
alt.removeIpl('h4_islandX_Terrain_props_05_b');
alt.removeIpl('h4_islandX_Terrain_props_05_c');
alt.removeIpl('h4_islandX_Terrain_props_05_d');
alt.removeIpl('h4_islandX_Terrain_props_05_e');
alt.removeIpl('h4_islandX_Terrain_props_05_f');
alt.removeIpl('H4_islandx_terrain_01');
alt.removeIpl('H4_islandx_terrain_02');
alt.removeIpl('H4_islandx_terrain_03');
alt.removeIpl('H4_islandx_terrain_04');
alt.removeIpl('H4_islandx_terrain_05');
alt.removeIpl('H4_islandx_terrain_06');
alt.removeIpl('h4_ne_ipl_00');
alt.removeIpl('h4_ne_ipl_01');
alt.removeIpl('h4_ne_ipl_02');
alt.removeIpl('h4_ne_ipl_03');
alt.removeIpl('h4_ne_ipl_04');
alt.removeIpl('h4_ne_ipl_05');
alt.removeIpl('h4_ne_ipl_06');
alt.removeIpl('h4_ne_ipl_07');
alt.removeIpl('h4_ne_ipl_08');
alt.removeIpl('h4_ne_ipl_09');
alt.removeIpl('h4_nw_ipl_00');
alt.removeIpl('h4_nw_ipl_01');
alt.removeIpl('h4_nw_ipl_02');
alt.removeIpl('h4_nw_ipl_03');
alt.removeIpl('h4_nw_ipl_04');
alt.removeIpl('h4_nw_ipl_05');
alt.removeIpl('h4_nw_ipl_06');
alt.removeIpl('h4_nw_ipl_07');
alt.removeIpl('h4_nw_ipl_08');
alt.removeIpl('h4_nw_ipl_09');
alt.removeIpl('h4_se_ipl_00');
alt.removeIpl('h4_se_ipl_01');
alt.removeIpl('h4_se_ipl_02');
alt.removeIpl('h4_se_ipl_03');
alt.removeIpl('h4_se_ipl_04');
alt.removeIpl('h4_se_ipl_05');
alt.removeIpl('h4_se_ipl_06');
alt.removeIpl('h4_se_ipl_07');
alt.removeIpl('h4_se_ipl_08');
alt.removeIpl('h4_se_ipl_09');
alt.removeIpl('h4_sw_ipl_00');
alt.removeIpl('h4_sw_ipl_01');
alt.removeIpl('h4_sw_ipl_02');
alt.removeIpl('h4_sw_ipl_03');
alt.removeIpl('h4_sw_ipl_04');
alt.removeIpl('h4_sw_ipl_05');
alt.removeIpl('h4_sw_ipl_06');
alt.removeIpl('h4_sw_ipl_07');
alt.removeIpl('h4_sw_ipl_08');
alt.removeIpl('h4_sw_ipl_09');
alt.removeIpl('h4_islandx_mansion');
alt.removeIpl('h4_islandxtower_veg');
alt.removeIpl('h4_islandx_sea_mines');
alt.removeIpl('h4_islandx');
alt.removeIpl('h4_islandx_barrack_hatch');
alt.removeIpl('h4_islandxdock_water_hatch');
alt.removeIpl('h4_beach_party');
alt.removeIpl('h4_mph4_terrain_01_grass_0');
alt.removeIpl('h4_mph4_terrain_01_grass_1');
alt.removeIpl('h4_mph4_terrain_02_grass_0');
alt.removeIpl('h4_mph4_terrain_02_grass_1');
alt.removeIpl('h4_mph4_terrain_02_grass_2');
alt.removeIpl('h4_mph4_terrain_02_grass_3');
alt.removeIpl('h4_mph4_terrain_04_grass_0');
alt.removeIpl('h4_mph4_terrain_04_grass_1');
alt.removeIpl('h4_mph4_terrain_04_grass_2');
alt.removeIpl('h4_mph4_terrain_04_grass_3');
alt.removeIpl('h4_mph4_terrain_05_grass_0');
alt.removeIpl('h4_mph4_terrain_06_grass_0');
alt.removeIpl('h4_mph4_airstrip_interior_0_airstrip_hanger');
}