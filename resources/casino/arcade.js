const arcadeId = mp.game.interior.getInteriorAtCoordsWithType(2730.0, -380.0, -49.0, "ch_DLC_Arcade");
const planRoomId = mp.game.interior.getInteriorAtCoordsWithType(2730.0, -380.0, -49.0, "ch_DLC_Plan");
const propList = {
    "arcade": [
        "entity_set_arcade_set_derelict",
        "entity_set_floor_option_01",
        "entity_set_arcade_set_ceiling_mirror"
    ],

    "planRoom": [
        "set_plan_bed",
        "set_plan_garage",
        "set_plan_setup",
        "set_plan_scribbles",
        "set_plan_computer",
        "set_plan_arcade_x4",
        "set_plan_plans",
        "set_plan_casino",
        "set_plan_keypad",
        "set_plan_vault",
        "set_plan_mechanic",
        "set_plan_hacker",
        "set_plan_weapons",
        "Set_Plan_Vault_Laser",
        "Set_Plan_Vault_Drill",
        "Set_Plan_Electric_Drill",
        "Set_Plan_Plastic_Explosives",
        "Set_Plan_Hacking_Device",
        "Set_Plan_Cockroaches",
        "Set_Plan_Stealth_Outfits",
        "Set_Plan_Gruppe_Sechs_Outfits",
        "Set_Plan_Fireman_Helmet",
        "Set_Plan_Drone_Parts",
        "Set_Plan_Vault_KeyCard_01a",
        "Set_Plan_Swipe_Card_01a",
        "Set_Plan_Swipe_Card_01b"
    ]
};

for (const [group, props] of Object.entries(propList)) {
    for (const prop of props) {
        mp.game.interior.enableInteriorProp(group === "arcade" ? arcadeId : planRoomId, prop);
    }
}

mp.game.interior.refreshInterior(arcadeId);
mp.game.interior.refreshInterior(planRoomId);


Entity_Set_Plushie_01
Entity_Set_Plushie_02
Entity_Set_Plushie_03
Entity_Set_Plushie_04
Entity_Set_Plushie_05
Entity_Set_Plushie_06
Entity_Set_Plushie_07
Entity_Set_Plushie_08
Entity_Set_Plushie_09
Set_Plan_Cockroaches
Set_Plan_Drone_Parts
Set_Plan_Electric_Drill
Set_Plan_Fireman_Helmet
Set_Plan_Gruppe_Sechs_Outfits
Set_Plan_Hacking_Device
Set_Plan_Plastic_Explosives
Set_Plan_Stealth_Outfits
Set_Plan_Swipe_Card_01a
Set_Plan_Swipe_Card_01b
Set_Plan_Vault_Drill
Set_Plan_Vault_Drill_Alt
Set_Plan_Vault_KeyCard_01a
Set_Plan_Vault_Laser
Set_Plan_Vault_Laser_Alt
entity_set_arcade_set_ceiling_beams
entity_set_arcade_set_ceiling_flat
entity_set_arcade_set_ceiling_mirror
entity_set_arcade_set_derelict
entity_set_arcade_set_derelict_carpet
entity_set_arcade_set_derelict_clean_up
entity_set_arcade_set_streetx4
entity_set_arcade_set_trophy_brawler
entity_set_arcade_set_trophy_cabs
entity_set_arcade_set_trophy_claw
entity_set_arcade_set_trophy_gunner
entity_set_arcade_set_trophy_king
entity_set_arcade_set_trophy_love
entity_set_arcade_set_trophy_monkey
entity_set_arcade_set_trophy_patriot
entity_set_arcade_set_trophy_racer
entity_set_arcade_set_trophy_retro
entity_set_arcade_set_trophy_strife
entity_set_arcade_set_trophy_teller
entity_set_big_screen
entity_set_constant_geometry
entity_set_floor_option_01
entity_set_floor_option_02
entity_set_floor_option_03
entity_set_floor_option_04
entity_set_floor_option_05
entity_set_floor_option_06
entity_set_floor_option_07
entity_set_floor_option_08
entity_set_hip_light_no_neon
entity_set_mural_neon_option_01
entity_set_mural_neon_option_02
entity_set_mural_neon_option_03
entity_set_mural_neon_option_04
entity_set_mural_neon_option_05
entity_set_mural_neon_option_06
entity_set_mural_neon_option_07
entity_set_mural_neon_option_08
entity_set_mural_option_01
entity_set_mural_option_02
entity_set_mural_option_03
entity_set_mural_option_04
entity_set_mural_option_05
entity_set_mural_option_06
entity_set_mural_option_07
entity_set_mural_option_08
entity_set_ret_light_no_neon
entity_set_screens
set_plan_arcade_x4
set_plan_bed
set_plan_casino
set_plan_computer
set_plan_garage
set_plan_hacker
set_plan_keypad
set_plan_mechanic
set_plan_no_bed
set_plan_plans
set_plan_pre_setup
set_plan_scribbles
set_plan_setup
set_plan_vault
set_plan_wall
set_plan_weapons