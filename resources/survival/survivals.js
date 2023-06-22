export const startpoints = {
    x: [
      10.55755,
      -1686.724,
      2452.866,
      86.33717,
      -119.2195,
      2339.985,
      1069.936,
      -577.1804,
      2484.39,
      1461.981,
      -743.6351,
      826.7242,
      5019.112,
      5178.552,
      1522.83,
      -2197.034,
      1390.813,
      -1089.255,
      138.7219,
      1221.873,
	    871.974,
	    256.2646,
      879.7439
    ],
    y: [
      -399.9114,
      -1093.756,
      3784.892,
      -1939.709,
      -861.8972,
      3147.544,
      -1971.269,
      5308.342,
      4959.4,
      1131.764,
      5601.669,
      -1291.626,
      -5734.407,
      -5127.731,
      -2112.101,
      235.9179,
      3597.158,
      4941.606,
      -1317.942,
      -2918.398,
	    -3239.705,
	    6147.607,
      -904.4635
    ],
  z: [
      39.52445,
      13.15266,
      39.97322,
      20.74965,
      33.33055,
      48.20564,
      31.0288,
      70.26048,
      44.07523,
      114.3259,
      48.68007,
      28.24133,
      17.67745,
      3.094696,
      76.6552,
      174.6019,
      35.0521,
      214.1506,
      29.22112,
      5.866066,
	    -98.04725,
	    -161.0194,
      26.10304
    ],
  Headings: [
    69.99953,
    123.8429,
    131.8595,
    -21.99989,
    110.9989,
    78.38216,
    44.01954,
    78.596,
    -161.7544,
    177.2706,
    103.7178,
    90.51217,
    -120.9991,
    70.84045,
    -102.8565,
    91.6051,
    -136.0204,
    -102.9994,
    130.6314,
    114.8588,
	  -170.9776,
	  9.673593,
    155.9985
  ]
  }


export const survivals = [
{
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ 62.14629, -400.9067, 25.92053 ],
    spawnpoints: {
      "peds": {
        "x": [
          37.54996,
          -19.05536,
          149.7563,
          110.6067,
          136.8558
        ],
        "y": [
          -310.1836,
           -468.3882,
          -381.7754,
          -496.7863,
          -345.729
        ],
        "z": [
          45.96794,
          39.41611,
          41.07819,
          42.12609,
          42.64796
        ]
      },
      "vehicles": {
        "x": [ 127.4246, 193.2088, 28.91069, -28.65363 ],
        "y": [ -537.144, -300.876, -263.6057, -484.0823 ],
        "z": [ 42.86286, 44.50802, 47.09871, 39.90167 ]
      },
      "aircraft": {
        "x": [ 211.9772, -113.4944 ],
        "y": [ -446.863, -400.165 ],
        "z": [ 160.8033, 155.0861 ]
      },
      "pickups": {
        "x": [ 62.20163, 59.99342, 36.93582, 24.30836, 95.59312, 85.08054, 84.5512, 89.7655, 112.0376, 26.68539, 76.28733, 30.92283, 69.75471, 43.91342 ],
        "y": [ -408.9934, -415.7222, -411.959, -373.077, -341.2614, -350.44, -421.2087, -428.0116, -437.9578, -437.0748, -405.0076, -419.2451, -427.1094, -384.236 ],
        "z": [ 39.91999, 39.91994, 45.56396, 39.39017, 42.69595, 42.28806, 37.5526, 37.55268, 41.13078, 39.92134, 37.55239, 39.92265, 37.55247, 39.9211 ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "",
      "peds": {
        "group1": [
          "G_M_M_ArmGoon_01",
          "G_M_Y_ArmGoon_02"
        ],
        "group2": [
          "G_M_M_ArmLieut_01",
          "G_M_M_ArmGoon_01"
        ],
        "group3": [
          "G_M_M_ArmBoss_01",
          "G_M_M_ArmLieut_01"
        ]
      },
      "vehicles": {
        "group1": [
          "cavalcade",
          "patriot2"
        ],
        "group2": [
          "cavalcade",
          "dubsta2",
          "burrito2"
        ],
        "group3": [
          "burrito2",
          "baller5",
          "caracara"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "buzzard"
        ],
        "group3": [
          "valkyrie2",
          "annihilator",
          "annihilator2"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_sb_microsmg",
        "w_ar_assaultrifle",
        "w_mg_combatmg",
        "w_sg_sawnoff",
        "w_sr_heavysniper",
        "w_pi_appistol",
        "w_ex_grenadefrag",
        "w_lr_rpg"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": true,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ -1664.29871, -1082.06067, 0 ],
    spawnpoints: {
      "peds": {
        "x": [ -1699.036, -1636.77, -1613.474, -1677.558 ],
        "y": [ -1149.94, -1053.092, -1047.873, -1008.424 ],
        "z": [ 12.05947, 12.15213, 12.11727, 6.375094 ]
      },
      "vehicles": {
        "x": [ -1592.20337, -1577.90234 ],
        "y": [ -934.058838, -1011.2691 ],
        "z": [ 14.1632977, 12.60525 ]
      },
      "aircraft": {
        "x": [ -1830.186, -1571.277 ],
        "y": [ -871.9961, -1300.84 ],
        "z": [ 70.54576, 67.52373 ]
      },
      "pickups": {
        "x": [ -1629.758, -1630.645, -1678.489, -1711.226, -1668.654, -1647.65, -1632.842, -1698.146, -1683.286, -1716.635 ],
        "y": [ -1086.081, -1095.967, -1134.413, -1135.51, -1076.126, -1087.469, -1065.545, -1071.033, -1104.19, -1091.918 ],
        "z": [ 13.02059, 13.023, 13.05562, 13.1066, 13.15337, 13.13156, 13.15315, 13.16755, 13.15226, 13.08775 ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "A_C_Rottweiler",
      "peds": {
        "group1": [
          "G_M_Y_MexGoon_01",
          "G_M_Y_MexGoon_02",
          "G_F_Y_Vagos_01"
        ],
        "group2": [
          "G_M_Y_MexGoon_03",
          "A_M_Y_MexThug_01"
        ],
        "group3": [
          "G_M_M_MexBoss_01",
          "G_M_M_MexBoss_02",
          "G_M_Y_MexGang_01"
        ]
      },
      "vehicles": {
        "group1": [
          "cavalcade",
          "Sanchez"
        ],
        "group2": [
          "burrito2",
          "patriot2"
        ],
        "group3": [
          "insurgent2",
          "burrito2",
          "caracara"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick"
        ],
        "group2": [
          "buzzard",
          "annihilator"
        ],
        "group3": [
          "annihilator2",
          "valkyrie2"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_lr_rpg",
        "w_ar_specialcarbine",
        "w_sg_assaultshotgun",
        "w_ex_pe",
        "w_ex_molotov",
        "w_mg_minigun"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": true,
      "boats": false
    },
    location: [ 2462.867, 3783.269, 40.1004 ],
    spawnpoints: {
      "peds": {
        "x": [ 2481.282, 2450.431, 2448.711, 2427.487 ],
        "y": [ 3723.766, 3755.034, 3849.669, 3803.4 ],
        "z": [ 42.48609, 41.01464, 37.61948, 38.87943 ]
      },
      "vehicles": {
        "x": [ 2464.649, 2319.391 ],
        "y": [ 3929.586, 3761.59448 ],
        "z": [ 35.89135, 37.5796661 ]
      },
      "aircraft": {
        "x": [ 2288.987, 2231.121, 2541.557, 2776.434 ],
        "y": [ 3702.052, 3952.081, 4093.146, 3805.315 ],
        "z": [ 92.49928, 115.1185, 130.0982, 145.8802 ]
      },
      "pickups": {
        "x": [ 2504.582, 2498.334, 2483.351, 2523.789, 2470.723, 2450.3, 2457.605, 2480.767, 2495.242, 2474.958 ],
        "y": [ 3752.435, 3792.811, 3799.755, 3795.457, 3741.329, 3767.983, 3789.766, 3752.297, 3767.946, 3788.945 ],
        "z": [ 44.13622, 47.61944, 40.95996, 54.98466, 42.24005, 41.27649, 40.67303, 42.47382, 44.61466, 41.10351 ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "A_C_Rottweiler",
      "peds": {
        "group1": [
          "s_m_m_movalien_01"
        ],
        "group2": [
          "s_m_m_movalien_01"
        ],
        "group3": [
          "s_m_m_movalien_01"
        ]
      },
      "vehicles": {
        "group1": [
          "dune2"
        ],
        "group2": [
          "dune2"
        ],
        "group3": [
          "dune2"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "buzzard",
          "annihilator"
        ],
        "group3": [
          "annihilator2",
          "valkyrie2"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_sr_heavysniper",
        "w_mg_minigun",
        "w_lr_grenadelauncher",
        "w_ar_assaultrifle",
        "w_sg_sawnoff",
        "w_mg_combatmg"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": true,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ 101.8643, -1938.579, 5.80371 ],
    spawnpoints: {
      "peds": {
        "x": [ 114.1705, 122.1488, 130.4881, 97.50352, 78.95041, 49.96175 ],
        "y": [ -1917.615, -1927.431, -1943.393, -1979.842, -1897.291, -1911.261 ],
        "z": [ 19.94353, 20.00599, 19.49888, 19.62596, 20.96067, 20.64166 ]
      },
      "vehicles": {
        "x": [ 74.19601, 48.34845 ],
        "y": [ -1882.105, -1896.352 ],
        "z": [ 22.16258, 21.25483 ]
      },
      "aircraft": {
        "x": [ -194.8132, -164.55, 286.5805 ],
        "y": [ -2056.448, -1712.732, -1794.573 ],
        "z": [ 120.7903, 119.1421, 103.9179 ]
      },
      "pickups": {
        "x": [ 89.60011, 90.85503, 110.5853, 85.26421, 106.897, 91.48251, 112.3827, 107.5094, 96.94876, 98.71358 ],
        "y": [ -1945.706, -1964.361, -1924.786, -1921.052, -1931.341, -1936.558, -1938.011, -1947.398, -1944.749, -1928.663 ],
        "z": [ 20.74957, 20.74747, 20.75086, 20.80376, 20.74661, 20.67912, 20.77554, 20.78351, 20.75, 20.72438 ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_F",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "A_C_Rottweiler",
      "peds": {
        "group1": [
          "G_F_Y_ballas_01",
          "G_M_Y_BallaSout_01",
          "G_M_Y_BallaEast_01",
          "G_M_Y_BallaOrig_01"
        ],
        "group2": [
          "G_F_Y_ballas_01",
          "G_M_Y_BallaSout_01",
          "G_M_Y_BallaEast_01",
          "G_M_Y_BallaOrig_01"
        ],
        "group3": [
          "G_F_Y_ballas_01",
          "G_M_Y_BallaSout_01",
          "G_M_Y_BallaEast_01",
          "G_M_Y_BallaOrig_01"
        ]
      },
      "vehicles": {
        "group1": [
          "cavalcade",
          "manana",
          "peyote3",
          "stalion"
        ],
        "group2": [
          "primo2",
          "Burrito4",
          "cavalcade2"
        ],
        "group3": [
          "BUS",
          "caracara",
          "youga",
          "yosemite"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "buzzard",
          "annihilator"
        ],
        "group3": [
          "annihilator2",
          "valkyrie2",
          "savage"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_mg_minigun",
        "w_lr_rpg",
        "w_mg_combatmg",
        "w_ex_grenadefrag",
        "w_sr_heavysniper",
        "w_ar_specialcarbine"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ -81.04887, -813.6974, 25.58028 ],
    spawnpoints: {
      "peds": {
        "x": [
          -79.27229,
          -101.7215,
          -51.22103,
          -36.88391,
          -141.5917,
          -106.4826
        ],
        "y": [
          -841.7715,
          -812.0325,
          -825.3351,
          -764.9748,
          -813.8887,
          -905.1137
        ],
        "z": [
          39.55044,
          42.63067,
          42.63232,
          43.26917,
          30.59043,
          28.23872
        ]
      },
      "vehicles": {
        "x": [
          13.24394,
          -80.8688,
          -152.093
        ],
        "y": [
          -760.8026,
          -918.7755,
          -764.4718
        ],
        "z": [
          43.83168,
          28.83947,
          32.67492
        ]
      },
      "aircraft": {
        "x": [
          -40.99368,
          41.1694,
          -308.6194
        ],
        "y": [
          -1034.976,
          -776.2367,
          -780.4254
        ],
        "z": [
          78.061,
          111.8599,
          97.61001
        ]
      },
      "pickups": {
        "x": [
          -131.6647,
          -99.97343,
          -52.69041,
          -72.85795,
          -32.73777,
          -104.6415,
          -63.86279,
          -95.99715,
          -90.24545,
          -136.1391,
          -101.7741,
          -117.1328,
          -48.8006,
          -76.7569,
          -53.24432
        ],
        "y": [
          -857.5693,
          -853.3138,
          -846.4827,
          -875.4937,
          -807.7966,
          -796.815,
          -854.326,
          -841.374,
          -871.7022,
          -828.0654,
          -824.5571,
          -814.7674,
          -802.6283,
          -785.7243,
          -787.8785
        ],
        "z": [
          44.21734,
          40.5545,
          40.5845,
          39.69488,
          44.63132,
          43.00489,
          40.57297,
          40.55424,
          40.57924,
          44.00966,
          43.62872,
          42.44053,
          44.22512,
          44.22731,
          44.22512
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "",
      "peds": {
        "group1": [
          "G_M_Y_SalvaGoon_01",
          "G_M_Y_SalvaGoon_02"
        ],
        "group2": [
          "G_M_Y_SalvaGoon_02",
          "G_M_Y_SalvaGoon_03"
        ],
        "group3": [
          "G_M_Y_SalvaBoss_01",
          "G_M_Y_SalvaGoon_02",
          "G_M_Y_SalvaGoon_03"
        ]
      },
      "vehicles": {
        "group1": [
          "cheetah2",
          "zr350",
          "sultan2"
        ],
        "group2": [
          "burrito3",
          "superd"
        ],
        "group3": [
          "vetir",
          "barrage",
          "youga3"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "swift2"
        ],
        "group2": [
          "Buzzard2",
          "supervolito2"
        ],
        "group3": [
          "valkyrie2",
          "volatus"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_lr_rpg",
        "w_mg_minigun",
        "w_mg_combatmg",
        "w_ex_pe",
        "w_ar_specialcarbine",
        "w_sg_assaultshotgun",
        "w_ex_molotov",
        "w_ar_assaultrifle",
        "w_pi_heavypistol"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": true,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ 2379.009, 3097.165, 47.14274 ],
    spawnpoints: {
      "peds": {
        "x": [
          2437.279,
          2304.498,
          2300.992,
          2359.095,
          2413.712
        ],
        "y": [
          3117.856,
          3163.078,
          3118.732,
          3072.978,
          3085.09
        ],
        "z": [
          47.00438,
          46.04245,
          46.39275,
          47.16463,
          48.64497
        ]
      },
      "vehicles": {
        "x": [
          2290.02,
          2442.912
        ],
        "y": [
          3128.699,
          3112.542
        ],
        "z": [
          47.46552,
          47.00788
        ]
      },
      "aircraft": {
        "x": [
          2596.456,
          2317.981,
          2136.721
        ],
        "y": [
          3106.894,
          2858.701,
          3153.537
        ],
        "z": [
          115.0034,
          131.519,
          117.9741
        ]
      },
      "pickups": {
        "x": [
          2383.86,
          2346.222,
          2385.236,
          2400.811,
          2334.774,
          2334.377,
          2336.522,
          2346.59,
          2363.743,
          2375.214
        ],
        "y": [
          3139.091,
          3134.54,
          3082.388,
          3117.905,
          3117.756,
          3131.997,
          3152.859,
          3095.242,
          3147.055,
          3119.892
        ],
        "z": [
          47.58937,
          48.20872,
          48.15612,
          48.17262,
          48.20049,
          48.18726,
          48.17763,
          48.02459,
          48.20894,
          48.02098
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "A_C_Rottweiler",
      "peds": {
        "group1": [
          "G_F_Y_Lost_01",
          "G_M_Y_Lost_01",
          "G_M_Y_Lost_02",
          "G_M_Y_Lost_03"
        ],
        "group2": [
          "G_F_Y_Lost_01",
          "G_M_Y_Lost_01",
          "G_M_Y_Lost_02",
          "G_M_Y_Lost_03"
        ],
        "group3": [
          "G_F_Y_Lost_01",
          "G_M_Y_Lost_01",
          "G_M_Y_Lost_02",
          "G_M_Y_Lost_03"
        ]
      },
      "vehicles": {
        "group1": [
          "zombiea",
          "zombieb",
          "hexer",
          "daemon",
          "gargoyle"
        ],
        "group2": [
          "cliffhanger",
          "avarus",
          "sanctus",
          "sovereign",
          "gburrito",
          "gburrito2"
        ],
        "group3": [
          "gburrito",
          "gburrito2",
          "dune3",
          "caracara"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "buzzard",
          "annihilator"
        ],
        "group3": [
          "valkyrie2",
          "buzzard"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_sg_assaultshotgun",
        "w_ar_carbinerifle",
        "w_ex_pe",
        "w_ex_grenadefrag",
        "w_mg_combatmg",
        "w_sb_microsmg"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ 1069.848, -1970.007, 30.02089 ],
    spawnpoints: {
      "peds": {
        "x": [
          1055.839,
          1074.538,
          999.1654,
          974.0051,
          1114.703,
          1094.145
        ],
        "y": [
          -1898.975,
          -2040.321,
          -2007.039,
          -1942.552,
          -2056.127,
          -1909.795
        ],
        "z": [
          30.01994,
          30.0166,
          30.77734,
          30.0815,
          30.0051,
          35.34441
        ]
      },
      "vehicles": {
        "x": [
          1060.259,
          1022.81,
          1017.973
        ],
        "y": [
          -1888.067,
          -1936.538,
          -2026.048
        ],
        "z": [
          30.37645,
          31.88177,
          30.44119
        ]
      },
      "aircraft": {
        "x": [
          966.2415,
          780.5947,
          1158.377
        ],
        "y": [
          -2260.033,
          -1977.21,
          -1861.815
        ],
        "z": [
          119.1498,
          117.3936,
          130.5963
        ]
      },
      "pickups": {
        "x": [
          1050.374,
          1074.953,
          1047.665,
          1055.495,
          1077.345,
          1041.929,
          1045.96,
          1057.025,
          1062.853,
          1087.919
        ],
        "y": [
          -1970.445,
          -1958.371,
          -1964.466,
          -1983.674,
          -1945.378,
          -1970.305,
          -1957.07,
          -1949.108,
          -1942.393,
          -1969.551
        ],
        "z": [
          31.01465,
          31.01749,
          31.01448,
          31.01546,
          31.03943,
          34.96765,
          35.13459,
          36.32525,
          31.0153,
          31.01466
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "",
      "peds": {
        "group1": [
          "S_M_Y_Construct_01",
          "S_M_Y_Construct_02"
        ],
        "group2": [
          "S_M_M_Gaffer_01",
          "S_M_Y_AirWorker"
        ],
        "group3": [
          "S_M_M_DockWork_01",
          "S_M_Y_DockWork_01",
          "G_M_M_ChemWork_01"
        ]
      },
      "vehicles": {
        "group1": [
          "FORKLIFT",
          "manana",
          "faggio2",
          "cavalcade2"
        ],
        "group2": [
          "guardian",
          "Burrito",
          "Mixer2",
          "bulldozer",
          "TipTruck"
        ],
        "group3": [
          "technical",
          "guardian",
          "Burrito",
          "vetir"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "buzzard",
          "annihilator"
        ],
        "group3": [
          "valkyrie2",
          "buzzard"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_ar_assaultrifle",
        "w_lr_rpg",
        "w_sg_assaultshotgun",
        "w_pi_appistol",
        "w_ex_pe",
        "w_mg_minigun"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ -552.9789, 5294.536, 71.89018 ],
    spawnpoints: {
      "peds": {
        "x": [
          -593.1511,
          -495.3117,
          -482.1297,
          -574.8164,
          -619.6666
        ],
        "y": [
          5231.204,
          5248.537,
          5326.259,
          5373.166,
          5263.286
        ],
        "z": [
          70.33552,
          85.78612,
          79.61008,
          69.23832,
          71.99064
        ]
      },
      "vehicles": {
        "x": [
          -627.6453,
          -581.7579,
          -557.6425
        ],
        "y": [
          5255.081,
          5234.46,
          5385.491
        ],
        "z": [
          73.53383,
          70.04133,
          68.83174
        ]
      },
      "aircraft": {
        "x": [
          -573.0839,
          -702.7899,
          -518.5516
        ],
        "y": [
          4962.914,
          5480.981,
          5648.045
        ],
        "z": [
          273.9085,
          185.7991,
          175.3418
        ]
      },
      "pickups": {
        "x": [
          -574.142,
          -570.0651,
          -586.3879,
          -548.5808,
          -556.4203,
          -530.5803,
          -564.6899,
          -595.884,
          -540.8264,
          -559.2175
        ],
        "y": [
          5310.845,
          5269.451,
          5279.858,
          5267.966,
          5283.433,
          5288.372,
          5318.376,
          5310.659,
          5266.89,
          5257.78
        ],
        "z": [
          71.47412,
          70.26414,
          70.26807,
          74.17417,
          77.17886,
          74.17417,
          73.59963,
          70.21445,
          77.83852,
          71.42922
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "A_C_Rottweiler",
      "peds": {
        "group1": [
          "G_M_M_ChiGoon_01",
          "G_M_M_ChiGoon_02"
        ],
        "group2": [
          "CSB_Chin_goon",
          "G_M_M_ChiGoon_02"
        ],
        "group3": [
          "G_M_M_ChiBoss_01",
          "G_M_M_ChiCold_01"
        ]
      },
      "vehicles": {
        "group1": [
          "sanchez2",
          "dune"
        ],
        "group2": [
          "vagrant",
          "outlaw",
          "kamacho",
          "riata",
          "sanchez2"
        ],
        "group3": [
          "technical",
          "vetir",
          "dune3",
          "dune4"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "buzzard",
          "annihilator"
        ],
        "group3": [
          "valkyrie2",
          "buzzard"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_ar_assaultrifle",
        "w_lr_rpg",
        "w_sg_assaultshotgun",
        "w_pi_appistol",
        "w_ex_pe",
        "w_mg_minigun"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": true,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": true,
      "boats": false
    },
    location: [ 2461.005, 4966.085, 30.31374 ],
    spawnpoints: {
      "peds": {
        "x": [
          2544.962,
          2465.821,
          2396.146,
          2433.208,
          2530.835
        ],
        "y": [
          4973.345,
          4885.353,
          4911.902,
          5045.916,
          5015.813
        ],
        "z": [
          42.28755,
          40.6745,
          41.5051,
          45.08403,
          43.36327
        ]
      },
      "vehicles": {
        "x": [
          2433.911,
          2369.097,
          2422.4,
          2510.559
        ],
        "y": [
          4871.784,
          4919.552,
          5059.152,
          4912.282
        ],
        "z": [
          38.11773,
          41.6109,
          45.90511,
          38.30098
        ]
      },
      "aircraft": {
        "x": [
          2275.918,
          2220.32,
          2755.653
        ],
        "y": [
          4725.371,
          5147.002,
          5129.649
        ],
        "z": [
          113.711,
          142.9917,
          124.518
        ]
      },
      "pickups": {
        "x": [
          2446.263,
          2470.005,
          2448.11,
          2441.738,
          2435.524,
          2428.535,
          2423.611,
          2435.745,
          2451.016,
          2491.768
        ],
        "y": [
          4957.049,
          4981.659,
          4990.549,
          4992.253,
          4978.556,
          4970.188,
          4958.976,
          4945.098,
          4968.3,
          4964.519,
          4959.4
        ],
        "z": [
          45.54488,
          45.73759,
          46.54271,
          46.18933,
          46.57146,
          46.33262,
          45.94389,
          45.12087,
          6.57161,
          44.67814
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "",
      "peds": {
        "group1": [
          "s_m_y_clown_01",
          "u_m_m_streetart_01",
          "u_m_y_pogo_01",
          "U_M_Y_Zombie_01",
          "S_M_M_MovSpace_01"
        ],
        "group2": [
          "ig_orleans",
          "s_m_m_movalien_01",
          "u_m_y_rsranger_01",
          "s_m_m_strperf_01",
          "u_m_o_filmnoir"
        ],
        "group3": [
          "ig_orleans",
          "s_m_m_movalien_01",
          "u_m_m_streetart_01",
          "u_m_y_pogo_01",
          "u_m_y_rsranger_01",
          "s_m_m_strperf_01",
          "S_M_M_MovSpace_01",
          "u_m_o_filmnoir",
          "s_m_y_clown_01",
          "U_M_Y_Zombie_01"
        ]
      },
      "vehicles": {
        "group1": [
          "btype2",
          "lurcher"
        ],
        "group2": [
          "phantom3",
          "btype2",
          "lurcher"
        ],
        "group3": [
          "rebel2",
          "btype2",
          "lurcher",
          "technical3"
        ]
      },
      "aircraft": {
        "group1": [
          "Frogger"
        ],
        "group2": [
          "annihilator"
        ],
        "group3": [
          "buzzard",
          "valkyrie2",
          "savage"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_ar_assaultrifle",
        "w_lr_rpg",
        "w_sg_assaultshotgun",
        "w_pi_appistol",
        "w_ex_pe",
        "w_mg_minigun"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": true,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ 1435.989, 1114.807, 113.0691 ],
    spawnpoints: {
      "peds": {
        "x": [
          1393.203,
          1493.876,
          1515.3,
          1440.559,
          1361.133
        ],
        "y": [
          1188.666,
          1179.618,
          1078.067,
          1031.199,
          1155.88
        ],
        "z": [
          112.5148,
          113.1294,
          113.1984,
          113.1906,
          112.759
        ]
      },
      "vehicles": {
        "x": [
          1335.279,
          1362.02,
          1505.016
        ],
        "y": [
          1140.674,
          1188.885,
          1033.769
        ],
        "z": [
          111.2033,
          112.1162,
          113.7939
        ]
      },
      "aircraft": {
        "x": [
          1452.184,
          1803.7,
          1356.718
        ],
        "y": [
          897.7926,
          1233.483,
          1520.563
        ],
        "z": [
          200.3374,
          223.3277,
          209.6624
        ]
      },
      "pickups": {
        "x": [
          1477.1,
          1408.323,
          1414.598,
          1418.763,
          1436.142,
          1456.387,
          1459.991,
          1443.287,
          1388.291,
          1409.653
        ],
        "y": [
          1130.924,
          1118.171,
          1136.57,
          1154.661,
          1159.297,
          1147.383,
          1090.811,
          1113.335,
          1139.231,
          1167.775
        ],
        "z": [
          114.3343,
          114.8377,
          114.3341,
          114.674,
          114.2739,
          114.3209,
          114.3344,
          114.3446,
          114.3344,
          114.3342
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "A_C_Rottweiler",
      "peds": {
        "group1": [
          "G_M_Y_MexGoon_01",
          "G_M_Y_MexGoon_02"
        ],
        "group2": [
          "G_M_Y_MexGoon_03",
          "A_M_Y_MexThug_01"
        ],
        "group3": [
          "G_M_Y_MexGang_01",
          "G_M_Y_PoloGoon_01",
          "G_M_Y_PoloGoon_02"
        ]
      },
      "vehicles": {
        "group1": [
          "manana2",
          "primo2",
          "patriot",
          "cavalcade2"
        ],
        "group2": [
          "bullet",
          "youga2",
          "yosemite3"
        ],
        "group3": [
          "limo2",
          "baller6",
          "paragon2"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "Buzzard2",
          "annihilator2"
        ],
        "group3": [
          "valkyrie2",
          "buzzard",
          "annihilator",
          "savage"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_ar_assaultrifle",
        "w_lr_rpg",
        "w_sg_assaultshotgun",
        "w_pi_appistol",
        "w_ex_pe",
        "w_mg_minigun"
      ]
    }
  },
  {
    flags: {
      "xmas": true,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": true,
      "aircraft": true,
      "vehicles": true,
      "bombers": true,
      "boats": false
    },
    location: [ -746.1929, 5586.12, 15.71466 ],
    spawnpoints: {
      "peds": {
        "x": [
          -684.2339,
          -818.6064,
          -805.832
        ],
        "y": [
          5644.313,
          5628.679,
          5519.236
        ],
        "z": [
          31.97913,
          21.83738,
          25.29648
        ]
      },
      "vehicles": {
        "x": [
          -740.751,
          -798.1525,
          -634.3426
        ],
        "y": [
          5746.869,
          5471.582,
          5597.496
        ],
        "z": [
          18.65561,
          33.56333,
          38.6141
        ]
      },
      "aircraft": {
        "x": [
          -1041.948,
          -517.6622
        ],
        "y": [
          5938.274,
          5650.207
        ],
        "z": [
          181.5317,
          192.0852
        ]
      },
      "pickups": {
        "x": [
          -739.1398,
          -757.3895,
          -759.431,
          -759.2106,
          -771.734,
          -772.5122,
          -757.1738,
          -755.2666,
          -727.6566,
          -735.6348
        ],
        "y": [
          5594.799,
          5570.455,
          5558.044,
          5543.777,
          5555.917,
          5594.332,
          5591.225,
          5595.173,
          5586.272,
          5606.673
        ],
        "z": [
          41.65467,
          36.70981,
          36.70985,
          33.48569,
          33.48679,
          33.48569,
          36.70623,
          41.66514,
          35.8538,
          32.70752
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "",
      "peds": {
        "group1": [
          "CUSTOM_FROSTY_M",
          "CUSTOM_RUDOLPH_M",
          "CUSTOM_PENGUIN_M"
        ],
        "group2": [
          "CUSTOM_SANTA_M",
          "CUSTOM_MSSANTA_F",
          "CUSTOM_ELF_M"
        ],
        "group3": [
          "CUSTOM_HSANTA_M",
          "CUSTOM_HMSSANTA_F",
          "CUSTOM_HELF_M"
        ]
      },
      "vehicles": {
        "group1": [
          "emperor",
          "tornado",
          "asea",
          "BMX",
          "sanchez2"
        ],
        "group2": [
          "youga2",
          "Burrito4",
          "dune"
        ],
        "group3": [
          "Rentalbus",
          "insurgent",
          "limo2",
          "dune3"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "Buzzard2",
          "annihilator2"
        ],
        "group3": [
          "valkyrie2",
          "buzzard",
          "annihilator",
          "savage"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_ar_assaultrifle",
        "w_lr_rpg",
        "w_sg_assaultshotgun",
        "w_pi_appistol",
        "w_ex_pe",
        "w_mg_minigun"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": true,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": true,
      "boats": false
    },
    location: [ 842.8086, -1333.5, 5 ],
    spawnpoints: {
      "peds": {
        "x": [
          813.6146,
          784.6646,
          810.808,
          782.4525,
          760.5475
        ],
        "y": [
          -1254.615,
          -1263.731,
          -1416.14,
          -1400.226,
          -1338.575
        ],
        "z": [
          25.29588,
          25.46899,
          26.22159,
          26.04108,
          25.22778
        ]
      },
      "vehicles": {
        "x": [
          753.07,
          805.6341,
          779.5168
        ],
        "y": [
          -1350.435,
          -1458.37,
          -1247.015
        ],
        "z": [
          39.55327,
          26.79924,
          26.09972
        ]
      },
      "aircraft": {
        "x": [
          863.9442,
          876.716
        ],
        "y": [
          -1590.791,
          -992.6617
        ],
        "z": [
          103.6086,
          106.0122
        ]
      },
      "pickups": {
        "x": [
          827.1485,
          814.5927,
          785.4124,
          838.9928,
          849.9839,
          839.6092,
          838.3064,
          868.616,
          820.8755,
          823.0466
        ],
        "y": [
          -1271.806,
          -1285.566,
          -1313.245,
          -1316.29,
          -1344.348,
          -1387.117,
          -1404.935,
          -1350.757,
          -1336.37,
          -1300.529
        ],
        "z": [
          26.25957,
          26.29977,
          26.18808,
          26.21224,
          26.06655,
          36.00906,
          26.12738,
          26.31057,
          26.10215,
          27.11598
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "A_C_shepherd",
      "peds": {
        "group1": [
          "S_M_Y_Cop_01",
          "S_F_Y_Cop_01"
        ],
        "group2": [
          "S_M_Y_Swat_01"
        ],
        "group3": [
          "CSB_Ramp_marine",
          "S_M_Y_Marine_03"
        ]
      },
      "vehicles": {
        "group1": [
          "police2",
          "police",
          "police3"
        ],
        "group2": [
          "RIOT",
          "FBI2"
        ],
        "group3": [
          "barrage",
          "BARRACKS"
        ]
      },
      "aircraft": {
        "group1": [
          "polmav"
        ],
        "group2": [
          "polmav",
          "annihilator2"
        ],
        "group3": [
          "valkyrie2",
          "annihilator",
          "savage"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_ar_assaultrifle",
        "w_lr_rpg",
        "w_sg_assaultshotgun",
        "w_pi_appistol",
        "w_ex_pe",
        "w_mg_minigun"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": true,
      "jesus": false,
      "aircraft": true,
      "vehicles": false,
      "bombers": false,
      "boats": false
    },
    location: [ 5033.179, -5757.288, 0 ],
    spawnpoints: {
      "pickups": {
        "x": [
          5014.904,
          5014.264,
          5039.239,
          5002.356,
          5000.024,
          5027.568,
          5049.177,
          5062.162,
          5016.079,
          5019.077
        ],
        "y": [
          -5735.341,
          -5761.092,
          -5722.21,
          -5735.198,
          -5773.183,
          -5782.848,
          -5760.958,
          -5776.675,
          -5757.435,
          -5730.636
        ],
        "z": [
          17.67822,
          16.28503,
          17.07744,
          19.88021,
          16.27867,
          16.32108,
          16.27731,
          16.27704,
          19.88,
          17.6775
        ]
      },
      "aircraft": {
        "x": [
          5263.598,
          4795.242,
          5268.189
        ],
        "y": [
          -5987.507,
          -5637.694,
          -5659.553
        ],
        "z": [
          123.6231,
          85.07933,
          98.257
        ]
      },
      "vehicles": {
        "x": [
        ],
        "y": [
        ],
        "z": [
        ]
      },
      "peds": {
        "x": [
          4982.875,
          4965.371,
          5083.632,
          5063.696,
          4976.817
        ],
        "y": [
          -5798.224,
          -5786.272,
          -5738.14,
          -5781.44,
          -5724.124
        ],
        "z": [
          19.87759,
          19.87774,
          14.67753,
          10.4776,
          18.8802
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "IG_JuanStrickler",
        "IG_JuanStrickler",
        "IG_JuanStrickler"
      ],
      "dog": "A_C_shepherd",
      "peds": {
        "group1": [
          "G_M_M_CartelGuards_02"
        ],
        "group2": [
          "G_M_M_CartelGuards_02",
          "G_M_M_CartelGuards_01"
        ],
        "group3": [
          "G_M_M_CartelGuards_01"
        ]
      },
      "vehicles": {
        "group1": [
        ],
        "group2": [
        ],
        "group3": [
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "buzzard"
        ],
        "group3": [
          "valkyrie2",
          "annihilator2"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_sb_microsmg",
        "w_ar_assaultrifle",
        "w_mg_combatmg",
        "w_sg_sawnoff"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": true,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ 5180, -5174.099, 0 ],
    spawnpoints: {
      "peds": {
        "x": [
          5148.219,
          5246.669,
          5270.455,
          5164.872,
          5148.506,
          5117.525
        ],
        "y": [
          -5262.839,
          -5257.324,
          -5128.484,
          -5067.342,
          -5064.525,
          -5087.101
        ],
        "z": [
          8.309369,
          22.88663,
          13.0393,
          2.389352,
          2.52754,
          1.273932
        ]
      },
      "aircraft": {
        "x": [
          4997.956,
          5308.788,
          5256.712
        ],
        "y": [
          -5360.463,
          -5315.579,
          -4888.036
        ],
        "z": [
          110.9148,
          104.3738,
          95.96438
        ]
      },
      "vehicles": {
        "x": [
          5269.971,
          5273.896,
          5124.437
        ],
        "y": [
          -5091.978,
          -5289.036,
          -5284.526
        ],
        "z": [
          13.44078,
          30.31875,
          6.664092
        ]
      },
      "pickups": {
        "x": [
          5183.035,
          5156.56,
          5140.325,
          5137,
          5209.232,
          5143.608,
          5108.458,
          5108.894,
          5157.052,
          5137.713
        ],
        "y": [
          -5133.035,
          -5129.12,
          -5145.724,
          -5124.076,
          -5170.15,
          -5240.712,
          -5165.586,
          -5132.982,
          -5113.512,
          -5100.826
        ],
        "z": [
          3.328694,
          2.328813,
          2.21802,
          2.941365,
          11.96683,
          9.511326,
          2.113741,
          1.862317,
          3.29113,
          2.177101
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "IG_JuanStrickler",
        "IG_JuanStrickler",
        "IG_JuanStrickler"
      ],
      "dog": "A_C_shepherd",
      "peds": {
        "group1": [
          "S_M_M_FieldWorker_01",
          "S_M_M_DrugProcess_01"
        ],
        "group2": [
          "G_M_M_CartelGuards_02"
        ],
        "group3": [
          "G_M_M_CartelGuards_01"
        ]
      },
      "vehicles": {
        "group1": [
          "manchez2",
          "winky",
          "verus"
        ],
        "group2": [
          "squaddie",
          "winky"
        ],
        "group3": [
          "squaddie",
          "vetir"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "buzzard"
        ],
        "group3": [
          "valkyrie2",
          "annihilator2"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_sb_microsmg",
        "w_ar_assaultrifle",
        "w_mg_combatmg",
        "w_sg_sawnoff"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": true,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ 1542.992, -2118.127, 50 ],
    spawnpoints: {
      "peds": {
        "x": [
          1535.635,
          1628.78,
          1510.298
        ],
        "y": [
          -2230.367,
          -2065.078,
          -2019.646
        ],
        "z": [
          79.2298,
          82.98611,
          74.57459
        ]
      },
      "vehicles": {
        "x": [
          1638.221,
          1517.93,
          1553.711
        ],
        "y": [
          -2049.06,
          -2006.82,
          -2250.205
        ],
        "z": [
          87.57921,
          73.25455,
          81.8357
        ]
      },
      "aircraft": {
        "x": [
          1509.166,
          1524.228,
          1798.51
        ],
        "y": [
          -2400.715,
          -1810.91,
          -2125.135
        ],
        "z": [
          192.045,
          170.8085,
          201.7641
        ]
      },
      "pickups": {
        "x": [
          1535.26,
          1555.781,
          1564.076,
          1514.6,
          1514.388,
          1510.039,
          1560.001,
          1542.569,
          1565.584,
          1545.085
        ],
        "y": [
          -2111.994,
          -2109.213,
          -2176.778,
          -2145.181,
          -2127.94,
          -2098.625,
          -2096.805,
          -2149.457,
          -2157.884,
          -2139.183
        ],
        "z": [
          76.90988,
          77.3666,
          77.45808,
          77.09986,
          76.39772,
          76.75616,
          79.36459,
          77.5072,
          77.53368,
          77.81537
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "A_C_Rottweiler",
      "peds": {
        "group1": [
          "G_F_Y_Lost_01",
          "G_M_Y_Lost_01",
          "G_M_Y_Lost_02",
          "G_M_Y_Lost_03"
        ],
        "group2": [
          "G_F_Y_Lost_01",
          "G_M_Y_Lost_01",
          "G_M_Y_Lost_02",
          "G_M_Y_Lost_03"
        ],
        "group3": [
          "G_F_Y_Lost_01",
          "G_M_Y_Lost_01",
          "G_M_Y_Lost_02",
          "G_M_Y_Lost_03"
        ]
      },
      "vehicles": {
        "group1": [
          "zombiea",
          "zombieb",
          "hexer",
          "daemon",
          "gargoyle"
        ],
        "group2": [
          "cliffhanger",
          "avarus",
          "sanctus",
          "sovereign",
          "gburrito",
          "gburrito2"
        ],
        "group3": [
          "gburrito",
          "gburrito2",
          "dune3",
          "caracara"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "buzzard",
          "annihilator"
        ],
        "group3": [
          "valkyrie2",
          "buzzard"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_sg_assaultshotgun",
        "w_ar_carbinerifle",
        "w_ex_pe",
        "w_ex_grenadefrag",
        "w_mg_combatmg",
        "w_sb_microsmg"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": true,
      "vehicles": false,
      "bombers": false,
      "boats": false
    },
    location: [
      -2237.377,
      249.3815,
      145.4173
    ],
    spawnpoints: {
      "peds": {
        "x": [
          -2261.005,
          -2296.617,
          -2168.539,
          -2272.142,
          -2333.313
        ],
        "y": [
          349.5638,
          333.4048,
          258.752,
          161.9476,
          239.6719
        ],
        "z": [
          173.602,
          173.6017,
          167.2548,
          169.2172,
          168.602
        ]
      },
      "vehicles": {
        "x": [
  
        ],
        "y": [
  
        ],
        "z": [ 
        
        ]
      },
      "aircraft": {
        "x": [
          -2335.869,
          -2157.558,
          -1957.536
        ],
        "y": [
          560.6135,
          -21.52734,
          314.8397
        ],
        "z": [
          268.1297,
          245.4772,
          252.0294
        ]
      },
      "pickups": {
        "x": [
          -2201.041,
          -2190.661,
          -2211.028,
          -2270.723,
          -2254.118,
          -2167.522,
          -2230.112,
          -2273.212,
          -2265.11,
          -2174.673
        ],
        "y": [
          225.4559,
          236.996,
          200.4854,
          272.6991,
          238.3297,
          224.6973,
          277.6877,
          288.536,
          253.7211,
          251.5657
        ],
        "z": [
          177.109,
          184.6019,
          174.6018,
          174.6019,
          174.609,
          184.6019,
          184.6006,
          179.6088,
          172.2021,
          184.6014
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "",
      "peds": {
        "group1": [
          "S_M_M_FIBOffice_01",
          "S_M_M_FIBOffice_02"
        ],
        "group2": [
          "S_M_M_FIBSec_01"
        ],
        "group3": [
          "S_M_Y_Marine_03"
        ]
      },
      "vehicles": {
        "group1": [
          
        ],
        "group2": [
          
        ],
        "group3": [
          
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "buzzard",
          "annihilator"
        ],
        "group3": [
          "valkyrie2",
          "annihilator2"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_sb_microsmg",
        "w_ar_assaultrifle",
        "w_mg_combatmg",
        "w_sr_heavysniper",
        "w_ex_grenadefrag",
        "w_lr_rpg"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": true,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": true,
      "boats": false
    },
    location: [ 1393.749, 3606.839, 23.98091 ],
    spawnpoints: {
      "peds": {
        "x": [
          1431.178,
          1487.376,
          1374.43,
          1287.938,
          1334.892
        ],
        "y": [
          3515.488,
          3634.215,
          3703.237,
          3610.363,
          3532.405
        ],
        "z": [
          34.94109,
          33.65927,
          32.22817,
          32.49841,
          34.34992
        ]
      },
      "vehicles": {
        "x": [
          1539.13,
          1255.238,
          1499.583,
          1160.215
        ],
        "y": [
          3643.315,
          3532.807,
          3729.941,
          3620.278
        ],
        "z": [
          34.16413,
          34.79031,
          33.98738,
          33.38802
        ]
      },
      "aircraft": {
        "x": [
          1438.868,
          1012.166,
          1405.786
        ],
        "y": [
          3973.02,
          3375.201,
          3193.458
        ],
        "z": [
          145.9932,
          140.874,
          169.1673
        ]
      },
      "pickups": {
        "x": [
          1405.519,
          1385.104,
          1421.403,
          1427.23,
          1391.941,
          1386.859,
          1360.574,
          1428.403,
          1369.377,
          1365.983
        ],
        "y": [
          3609.443,
          3592.953,
          3608.217,
          3620.573,
          3628.216,
          3616.916,
          3595.83,
          3634.408,
          3639.562,
          3619.432
        ],
        "z": [
          39.00211,
          34.89458,
          34.92772,
          34.91743,
          34.93415,
          38.92236,
          34.90694,
          34.85594,
          33.88884,
          34.89108
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "A_M_M_Hillbilly_01",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "A_C_Rottweiler",
      "peds": {
        "group1": [
          "A_M_Y_MethHead_01",
          "A_M_M_RurMeth_01"
        ],
        "group2": [
          "A_M_M_Hillbilly_02"
        ],
        "group3": [
          "A_M_M_Hillbilly_02"
        ]
      },
      "vehicles": {
        "group1": [
          "blazer",
          "Sanchez",
          "BfInjection"
        ],
        "group2": [
          "RancherXL",
          "MESA3",
          "Rebel"
        ],
        "group3": [
          "technical",
          "dune3",
          "patriot3"
        ]
      },
      "aircraft": {
        "group1": [
          "Frogger"
        ],
        "group2": [
          "buzzard"
        ],
        "group3": [
          "valkyrie2"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_ar_assaultrifle",
        "w_lr_rpg",
        "w_sg_assaultshotgun",
        "w_pi_appistol",
        "w_ex_pe",
        "w_mg_minigun"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": false,
      "vehicles": false,
      "bombers": true,
      "boats": false
    },
    location: [ -1102.203, 4918.815, 170 ],
    spawnpoints: {
      "peds": {
        "x": [
          -1100.685,
          -1115.466,
          -1166.521,
          -1044.868
        ],
        "y": [
          4865.174,
          4966.59,
          4895.783,
          4909.785
        ],
        "z": [
          215.0089,
          217.9623,
          215.734,
          207.8472
        ]
      },
      "vehicles": {
        "x": [
          
        ],
        "y": [
          
        ],
        "z": [
          
        ]
      },
      "aircraft": {
        "x": [
          
        ],
        "y": [
          
        ],
        "z": [
          
        ]
      },
      "pickups": {
        "x": [
          -1112.06,
          -1097.368,
          -1062.696,
          -1139.913,
          -1142.252,
          -1127.49,
          -1102.79,
          -1093.988,
          -1133.2,
          -1125.35
        ],
        "y": [
          4905.396,
          4893.962,
          4907.145,
          4936.776,
          4912.156,
          4926.604,
          4936.508,
          4947.288,
          4948.635,
          4895.061
        ],
        "z": [
          218.5969,
          216.0679,
          211.8454,
          222.2698,
          220.9696,
          219.2695,
          218.3784,
          218.3488,
          222.2699,
          218.4754
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "A_M_M_ACult_01",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "",
      "peds": {
        "group1": [
          "A_M_O_ACult_02"
        ],
        "group2": [
          "A_M_O_ACult_01",
          "A_M_Y_ACult_01"
        ],
        "group3": [
          "A_M_Y_ACult_02"
        ]
      },
      "vehicles": {
        "group1": [
          
        ],
        "group2": [
          
        ],
        "group3": [
          
        ]
      },
      "aircraft": {
        "group1": [
          
        ],
        "group2": [
          
        ],
        "group3": [
          
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_ar_assaultrifle",
        "w_lr_rpg",
        "w_sg_assaultshotgun",
        "w_pi_appistol",
        "w_ex_pe",
        "w_mg_minigun"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": true,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ 100.7493, -1286.162, 28.28191 ],
    spawnpoints: {
      "peds": {
        "x": [
          34.69477,
          173.7386,
          181.1437,
          199.0299,
          8.020838
        ],
        "y": [
          -1351.869,
          -1344.679,
          -1242.151,
          -1284.601,
          -1306.519
        ],
        "z": [
          28.32302,
          28.31949,
          28.25608,
          28.25138,
          28.94439
        ]
      },
      "aircraft": {
        "x": [
          -141.2709,
          260.3393
        ],
        "y": [
          -1730.627,
          -957.0008
        ],
        "z": [
          172.4049,
          171.0733
        ]
      },
      "vehicles": {
        "x": [
          151.2036,
          188.8569,
          50.42602,
          16.19892
        ],
        "y": [
          -1375.596,
          -1328.618,
          -1196.227,
          -1377.186
        ],
        "z": [
          28.78803,
          28.84209,
          28.79625,
          28.82264
        ]
      },
      "pickups": {
        "x": [
          138.7219,
          127.426,
          173.0902,
          92.53696,
          119.1044,
          134.4359,
          137.82,
          155.3841,
          164.7438,
          151.2542
        ],
        "y": [
          -1317.942,
          -1312.769,
          -1298.633,
          -1279.374,
          -1286.239,
          -1297.341,
          -1332.484,
          -1267.064,
          -1281.698,
          -1335.667
        ],
        "z": [
          29.22112,
          28.92813,
          35.46415,
          29.02314,
          28.27143,
          29.23274,
          31.16071,
          29.30374,
          29.23616,
          29.2023
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_JUGGERNAUT_M"
      ],
      "dog": "A_C_Rottweiler",
      "peds": {
        "group1": [
          "G_M_Y_MexGoon_01",
          "G_M_Y_MexGoon_02",
          "G_F_Y_Vagos_01"
        ],
        "group2": [
          "G_M_Y_MexGoon_03",
          "A_M_Y_MexThug_01"
        ],
        "group3": [
          "G_M_M_MexBoss_01",
          "G_M_M_MexBoss_02",
          "G_M_Y_MexGang_01"
        ]
      },
      "vehicles": {
        "group1": [
          "cavalcade",
          "Sanchez"
        ],
        "group2": [
          "burrito2",
          "patriot2"
        ],
        "group3": [
          "insurgent2",
          "burrito2",
          "caracara"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick"
        ],
        "group2": [
          "buzzard",
          "annihilator"
        ],
        "group3": [
          "annihilator2",
          "valkyrie2"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_lr_rpg",
        "w_ex_pe",
        "w_sb_microsmg",
        "w_ar_assaultrifle",
        "w_mg_combatmg",
        "w_sg_sawnoff"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": true,
      "boats": true
    },
    location: [ 1238.543, -2969.419, -8 ],
    spawnpoints: {
      "peds": {
        "x": [
          1137.713,
          1172.12,
          1224.821,
          1142.651,
          1148.91,
          1149.357
        ],
        "y": [
          -2952.28,
          -3051.339,
          -3100.277,
          -2906.999,
          -2997.09,
          -3019.871
        ],
        "z": [
          4.901185,
          4.902142,
          4.87134,
          4.902142,
          4.901041,
          4.901042
        ]
      },
      "aircraft": {
        "x": [
          628.0781,
          1198.666,
          1732.328
        ],
        "y": [
          -3274.197,
          -3678.931,
          -3081.678
        ],
        "z": [
          254.0979,
          279.3636,
          196.9745
        ]
      },
      "vehicles": {
        "x": [
          1073.947,
          1045.678,
          1260.039
        ],
        "y": [
          -3006.97,
          -2908.927,
          -3199.638
        ],
        "z": [
          5.488732,
          5.487813,
          5.399164
        ]
      },
      "boats": {
        "x": [
          1480.931,
          1438.631,
          1201.93
        ],
        "y": [
          -3071.231,
          -2897.492,
          -2755.915
        ],
        "z": [
          1.336094,
          1.759421,
          0.6918125
        ]
      },
      "pickups": {
        "x": [
          1222.006,
          1220.782,
          1240,
          1240.513,
          1228.75,
          1239.979,
          1251.359,
          1229.023,
          1240.561,
          1234.976
        ],
        "y": [
          -2916.641,
          -2994.281,
          -3044.764,
          -2884.539,
          -2932.159,
          -2959.459,
          -2946.223,
          -2995.051,
          -3011.022,
          -2895.579
        ],
        "z": [
          5.866062,
          5.865356,
          14.29769,
          9.319258,
          9.319259,
          12.15955,
          9.319259,
          9.319259,
          9.319259,
          17.33247
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_JUGGERNAUT_M"
      ],
      "peds": {
        "group1": [
          "S_M_Y_BlackOps_01",
          "S_M_Y_BlackOps_02",
          "S_M_Y_BlackOps_03"
        ],
        "group2": [
          "S_M_Y_BlackOps_01",
          "S_M_Y_BlackOps_02",
          "S_M_Y_BlackOps_03"
        ],
        "group3": [
          "S_M_Y_BlackOps_01",
          "S_M_Y_BlackOps_02",
          "S_M_Y_BlackOps_03"
        ]
      },
      "vehicles": {
        "group1": [
          "enduro",
          "patriot3"
        ],
        "group2": [
          "MESA3",
          "contender"
        ],
        "group3": [
          "insurgent3",
          "insurgent2",
          "BARRACKS"
        ]
      },
      "aircraft": {
        "group1": [
          "buzzard"
        ],
        "group2": [
          "annihilator2",
          "Cargobob"
        ],
        "group3": [
          "valkyrie2",
          "savage"
        ]
      },
      "boats":
      {
        "group1": [
          "Dinghy",
          "seashark2",
          "seashark2"
        ],
        "group2": [
          "seashark2",
          "seashark2",
          "seashark2",
          "seashark2",
          "dinghy5"
        ],
        "group3": [
          "dinghy5",
          "patrolboat"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_lr_rpg",
        "w_ex_pe",
        "w_sb_microsmg",
        "w_ar_assaultrifle",
        "w_mg_combatmg",
        "w_sg_sawnoff"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": false,
      "vehicles": false,
      "bombers": false,
      "boats": false
    },
    location: [ 870.9188, -3242.676, -104.2866 ],
    spawnpoints: {
      "pickups": {
        "x": [
          862.6285,
          836.6869,
          880.9518,
          905.0206,
          909.2828,
          928.923,
          930.9584,
          906.3386,
          864.2098,
          890.8527
        ],
        "y": [
          -3246.345,
          -3234.069,
          -3205.358,
          -3205.625,
          -3223.319,
          -3227.376,
          -3237.951,
          -3237.891,
          -3187.842,
          -3190.367
        ],
        "z": [
          -98.29441,
          -98.69913,
          -98.19627,
          -97.18792,
          -98.26934,
          -98.28329,
          -98.2959,
          -98.29433,
          -96.13946,
          -97.03259
        ]
      },
      "peds": {
        "x": [
          892.899,
          945.1182,
          893.14
        ],
        "y": [
          -3171.997,
          -3194.807,
          -3245.89
        ],
        "z": [
          -98.1236,
          -99.26472,
          -99.24899
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "peds": {
        "group1": [
          "S_M_Y_BlackOps_01"
        ],
        "group2": [
          "S_M_Y_BlackOps_02"
        ],
        "group3": [
          "S_M_Y_BlackOps_01",
          "S_M_Y_BlackOps_02",
          "S_M_Y_BlackOps_03"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_sb_microsmg",
        "w_ar_assaultrifle",
        "w_mg_combatmg",
        "w_sg_sawnoff"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": false,
      "vehicles": false,
      "bombers": false,
      "boats": false
    },
    location: [ 244.4236, 6163.841, -165.4211 ],
    spawnpoints: {
      "pickups": {
        "x": [
          238.6097,
          237.7355,
          265.9649,
          277.4819,
          267.6663,
          258.4414,
          247.5699,
          256.4903,
          222.5752,
          218.6595
        ],
        "y": [
          6150.592,
          6178.557,
          6187.306,
          6151.28,
          6147.255,
          6185.498,
          6168.139,
          6142.447,
          6143.198,
          6151.061
        ],
        "z": [
          -161.0223,
          -154.4076,
          -154.4224,
          -154.4223,
          -158.4225,
          -160.4225,
          -154.4224,
          -154.4225,
          -154.4225,
          -158.4224
        ]
      },
      "peds": {
        "x": [
          228.9524,
          269.4507,
          247.523,
          219.2067,
          240.6974,
          219.196,
          241.2036,
          250.6686,
          250.4163
        ],
        "y": [
          6109.717,
          6123.133,
          6126.421,
          6127.92,
          6119.564,
          6208.539,
          6208.903,
          6204.744,
          6123.148
        ],
        "z": [
          -160.4224,
          -160.4222,
          -160.4222,
          -160.4222,
          -160.4224,
          -160.4222,
          -160.4222,
          -147.4225,
          -147.4224
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "peds": {
        "group1": [
          "MP_M_AvonGoon"
        ],
        "group2": [
          "MP_M_AvonGoon"
        ],
        "group3": [
          "MP_M_AvonGoon"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_sb_microsmg",
        "w_ar_assaultrifle",
        "w_mg_combatmg",
        "w_sg_sawnoff"
      ]
    }
  },
  {
    flags: {
      "xmas": false,
      "halloween": false,
      "juggernaut": true,
      "dogs": false,
      "jesus": false,
      "aircraft": true,
      "vehicles": true,
      "bombers": false,
      "boats": false
    },
    location: [ 874.047, -906.282, 20 ],
    spawnpoints: {
      "peds": {
        "x": [
            872.8149,
            964.3047,
            966.1991,
            796.1975,
            789.0793,
            805.9903,
            919.6336
        ],
        "y": [
            -814.2642,
            -924.9102,
            -896.28,
            -957.5933,
            -865.8579,
            -843.4852,
            -991.1058
        ],
        "z": [
            36.32776,
            41.70411,
            42.40007,
            24.94204,
            24.29439,
            25.34571,
            35.90445
        ]
      },
      "vehicles": {
        "x": [
            941.6605,
            970.1734,
            782.6686
        ],
        "y": [
            -840.2117,
            -936.2228,
            -953.2501
        ],
        "z": [
            43.44676,
            42.10318,
            25.55427
        ]
      },
      "aircraft": {
        "x": [
            821.9388,
            1104.255
        ],
        "y": [
            -1419.562,
            -667.9216
        ],
        "z": [
            127.5909,
            156.1264
        ]
      },
      "pickups": {
        "x": [
            872.5899,
            883.9619,
            881.4774,
            885.2726,
            852.7546,
            887.4225,
            886.3143,
            868.3148,
            873.4511,
            852.6666
        ],
        "y": [
            -906.072,
            -923.5871,
            -934.3344,
            -902.5112,
            -938.7566,
            -889.0669,
            -914.9843,
            -888.8062,
            -947.0657,
            -905.9979
        ],
        "z": [
            25.92178,
            26.28236,
            30.78319,
            26.31216,
            26.28234,
            26.5774,
            26.282,
            25.80968,
            26.28236,
            25.29568
        ]
      }
    },
    weapons: {
      "weak": [
        "WEAPON_APPISTOL",
        "WEAPON_PISTOL",
        "WEAPON_MICROSMG",
        "WEAPON_SAWNOFFSHOTGUN",
        "WEAPON_PUMPSHOTGUN"
      ],
      "medium": [
        "WEAPON_PISTOL50",
        "WEAPON_BULLPUPRIFLE",
        "WEAPON_CARBINERIFLE",
        "WEAPON_ASSAULTRIFLE",
        "WEAPON_COMBATSHOTGUN",
        "WEAPON_MILITARYRIFLE",
        "WEAPON_PUMPSHOTGUN_MK2"
      ],
      "strong": [
        "WEAPON_HEAVYSHOTGUN",
        "WEAPON_SPECIALCARBINE_MK2",
        "WEAPON_ASSAULTSHOTGUN",
        "WEAPON_MINIGUN",
        "WEAPON_COMBATMG_MK2",
        "WEAPON_HEAVYRIFLE"
      ]
    },
    models: {
      "juggernaut": [
        "CUSTOM_JUGGERNAUT_M",
        "CUSTOM_BEAST_M",
        "CUSTOM_SNOWBIGFOOT_M"
      ],
      "dog": "",
      "peds": {
        "group1": [
          "G_M_M_ArmGoon_01",
          "G_M_Y_ArmGoon_02"
        ],
        "group2": [
          "G_M_M_ArmLieut_01",
          "G_M_M_ArmGoon_01"
        ],
        "group3": [
          "G_M_M_ArmBoss_01",
          "G_M_M_ArmLieut_01"
        ]
      },
      "vehicles": {
        "group1": [
          "cavalcade",
          "patriot2"
        ],
        "group2": [
          "cavalcade",
          "dubsta2",
          "burrito2"
        ],
        "group3": [
          "burrito2",
          "baller5",
          "caracara"
        ]
      },
      "aircraft": {
        "group1": [
          "maverick",
          "Frogger"
        ],
        "group2": [
          "buzzard",
          "annihilator"
        ],
        "group3": [
          "valkyrie2",
          "buzzard"
        ]
      },
      "pickups": [
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "prop_armour_pickup",
        "prop_ld_health_pack",
        "w_ar_assaultrifle",
        "w_lr_rpg",
        "w_sg_assaultshotgun",
        "w_pi_appistol",
        "w_ex_pe",
        "w_mg_minigun"
      ]
    }
  }
]