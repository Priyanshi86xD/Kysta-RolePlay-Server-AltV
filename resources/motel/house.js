import alt from 'alt-client';

export const sofapos = {
  ['High-End Custom Apartment'] : [
      {x:2.5, y:-1, z:0.5, h: 270, x1:2.5, y1:-2},
      {x:4.5, y:-1, z:0.5, h: 270, x1:4.5, y1:-2},
      {x:5.3, y:-2, z:0.5, h: 173, x1:4.3, y1:-2},
      {x:5.3, y:-3, z:0.5, h: 173, x1:4.3, y1:-3},
      {x:5.3, y:-4, z:0.5, h: 173, x1:4.3, y1:-4}, 
  ],
  ['High-End Apartment'] : [
      {x:4.6, y:2.9,z:0.3, h:330, x1: 5.6, y1: 2.9},
      {x:4.6, y:3.9,z:0.3, h:330, x1: 5.6, y1: 3.9},
      {x:6.2, y:5.6,z:0.3, h:247, x1: 6.2, y1: 4.6},
      {x:7.2, y:5.6,z:0.3, h:247, x1: 7.2, y1: 4.6},
  ],
  ['Medium-End Apartment'] : [
      {x:0, y:0, z:0.3, h:80, x1: -1, y1: 0},
      {x:0, y:1, z:0.3, h:80, x1: -1, y1: 1},
      {x:-1,y:3, z:0.3, h:174, x1: -1, y1: 2},
      {x:-2,y:3, z:0.3, h:174, x1: -2, y1: 2},
  ],
  ['STILT-House'] : [
    {x:1.6, y:-1.1,z:0.5, h:342.24, x1: 1.6, y1: 0.1},
    {x:0.5, y:-1.1,z:0.5, h:342.24, x1: 0.5, y1: 0.1},
    {x:-1.1, y:1.3,z:0.5, h:252.24, x1: 0.1, y1: 1.3},
    {x:-1.1,y:0.3,z:0.5, h:252.24, x1: 0.1, y1: 0.3},
  ]
}

export const animbed = [

      {
        "DictionaryName": "anim@mp_bedmid@left_var_01",
        "Animations": [
          "f_sleep_l_loop_bighouse",
          "f_getout_l_bighouse",
          "f_getin_l_bighouse"
        ]
      },
      {
        "DictionaryName": "anim@mp_bedmid@left_var_02",
        "Animations": [
          "f_sleep_l_loop_bighouse",
          "f_getout_l_bighouse",
          "f_getin_l_bighouse"
        ]
      },
      {
        "DictionaryName": "anim@mp_bedmid@left_var_03",
        "Animations": [
          "f_sleep_l_loop_bighouse",
          "f_getout_l_bighouse",
          "f_getin_l_bighouse"
        ]
      },
      {
        "DictionaryName": "anim@mp_bedmid@left_var_04",
        "Animations": [
          "f_sleep_l_loop_bighouse",
          "f_getout_l_bighouse",
          "f_getin_l_bighouse"
        ]
      },
      {
        "DictionaryName": "anim@mp_bedmid@right_var_01",
        "Animations": [
          "f_getout_r_bighouse",
          "f_getin_r_bighouse",
          "f_sleep_r_loop_bighouse"
        ]
      },
      {
        "DictionaryName": "anim@mp_bedmid@right_var_02",
        "Animations": [
          "f_getout_r_bighouse",
          "f_getin_r_bighouse",
          "f_sleep_r_loop_bighouse"
        ]
      },
      {
        "DictionaryName": "anim@mp_bedmid@right_var_03",
        "Animations": [
          "f_getout_r_bighouse",
          "f_getin_r_bighouse",
          "f_sleep_r_loop_bighouse"
        ]
      },
      {
        "DictionaryName": "anim@mp_bedmid@right_var_04",
        "Animations": [
          "f_getout_r_bighouse",
          "f_getin_r_bighouse",
          "f_sleep_r_loop_bighouse"
        ]
      },
]

export const tvprops = [
'ex_prop_ex_tv_flat_01',
'prop_tv_01',
'prop_tv_02',
'prop_tv_03',
'prop_tv_03_overlay',
'prop_tv_04',
'prop_tv_05',
'prop_tv_06',
'prop_tv_07',
'prop_tv_cabinet_03',
'prop_tv_cabinet_04',
'prop_tv_cabinet_05',
'prop_tv_cam_02',
'prop_tv_flat_01',
'prop_tv_flat_01_screen',
'prop_tv_flat_02',
'prop_tv_flat_02b',
'prop_tv_flat_03',
'prop_tv_flat_03b',
'prop_tv_flat_michael',
'sf_prop_sf_tv_flat_scr_01a',
'sf_prop_sf_tv_studio_01a',
'sm_prop_smug_tv_flat_01',
'vw_prop_vw_cinema_tv_01',
'vw_prop_vw_tv_rt_01a',
'xs_prop_arena_screen_tv_01',
'ch_prop_ch_tv_rt_01a',
"hei_heist_str_avunitl_03", "apa_mp_h_str_avunitm_03", "apa_mp_h_str_avunits_01", "apa_mp_h_str_avunits_04", 
"apa_mp_h_str_avunitm_01", "apa_mp_h_str_avunitl_01_b", "apa_mp_h_str_avunitl_04", "ex_prop_ex_tv_flat_01"

]

export const tvchannels = { 
  [1] : "PL_STD_CNT",
  [2] : "PL_STD_WZL",
  [3] : "PL_LO_CNT",
  [4] : "PL_LO_WZL",
  [5] : "PL_SP_WORKOUT",
  [6] : "PL_SP_INV",
  [7] : "PL_SP_INV_EXP",
  [8] : "PL_LO_RS",
  [9] : "PL_LO_RS_CUTSCENE",
  [10] : "PL_SP_PLSH1_INTRO",
  [11] : "PL_LES1_FAME_OR_SHAME",
  [12] : "PL_STD_WZL_FOS_EP2",
  [13] : "PL_MP_WEAZEL",
  [14] : "PL_MP_CCTV",
  [15] : "PL_CINEMA_ACTION",
  [16] : "PL_CINEMA_ARTHOUSE",
  [17] : "PL_CINEMA_MULTIPLAYER",
  [18] : "PL_WEB_HOWITZER",
  [19] : "PL_WEB_RANGERS"
}