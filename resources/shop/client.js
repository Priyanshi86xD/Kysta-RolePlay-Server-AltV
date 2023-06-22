import * as alt from 'alt-client';
import { deleteMeta, getMeta, hasMeta, setMeta } from 'alt-client';
import { getSyncedMeta } from 'alt-shared';
import * as native from 'natives';
import * as game from 'natives';
import { barbermenu } from './barber.js';
import { clothesmenu } from './clothes.js';
import * as NativeUI from './NativeUI/NativeUi.js';
import { storemenu } from './store.js';
import { tattooshop } from './tatshop.js';
import { pomclose, pommenu } from './gstation.js';
import { carwashnotif } from './carwash.js';
import { hangarslotmenu } from './hangar.js';


let locations = [
{ x: -279.954, y: 6227.483, z: 31.706, type: 'barber',  shop: 'barber1', teks: "~INPUT_PICKUP~ to make over", task: "", dist: 3, ped: 0, ptype: 4, model: 0x418DFF92, x1:-277.799, y1:6229.256, z1:31.706, h:90, scen:'WORLD_HUMAN_STAND_IMPATIENT'},
{ x: 1933.588, y: 3730.480, z: 32.854, type: 'barber',  shop: 'barber2', teks: "~INPUT_PICKUP~ to make over", task: "", dist: 3 , ped: 0, ptype: 4, model: 0x418DFF92, x1:1931.224, y1:3728.885, z1:32.854, h:220, scen:'WORLD_HUMAN_STAND_IMPATIENT'},      
{ x: -34.069, y: -151.271, z: 57.087, type: 'barber',  shop: 'barber3', teks: "~INPUT_PICKUP~ to make over", task: "", dist: 3, ped: 0, ptype: 4, model: 0x418DFF92, x1:-31.641, y1:-151.941, z1:57.087, h:0, scen:'WORLD_HUMAN_STAND_IMPATIENT' },   
{ x: -814.977, y: -184.485, z: 37.569, type: 'barber',  shop: 'barber4', teks: "~INPUT_PICKUP~ to make over", task: "", dist: 3 , ped: 0, ptype: 4, model: 0x418DFF92, x1:-822.063, y1:-183.396, z1:37.569, h:210, scen:'WORLD_HUMAN_STAND_IMPATIENT'},  
{ x: -1283.577, y: -1118.799, z: 7.000, type: 'barber',  shop: 'barber5', teks: "~INPUT_PICKUP~ to make over", task: "", dist: 3 , ped: 0, ptype: 4, model: 0x418DFF92, x1:-1283.809, y1:-1116.095, z1:7.000, h:110, scen:'WORLD_HUMAN_STAND_IMPATIENT'},  
{ x: 1211.162, y: -473.747, z: 66.218, type: 'barber',  shop: 'barber6', teks: "~INPUT_PICKUP~ to make over", task: "", dist: 3 , ped: 0, ptype: 4, model: 0x418DFF92, x1:1211.698, y1:-471.157, z1:66.218, h:100, scen:'WORLD_HUMAN_STAND_IMPATIENT'},   
{ x: 137.736, y: -1709.808, z: 29.302, type: 'barber',  shop: 'barber7', teks: "~INPUT_PICKUP~ to make over", task: "", dist: 3 , ped: 0, ptype: 4, model: 0x418DFF92, x1:135.472, y1:-1708.204, z1:29.302, h:200, scen:'WORLD_HUMAN_STAND_IMPATIENT'}, 

{ x: -330.319, y: 6082.453, z: 31.455, type: 'ammu', shop: 'ammu1', teks: "~INPUT_PICKUP~ Buy Weapons", task: "", dist: 2 , ped: 0, ptype: 4, model: 0x9E08633D, x1:-331.095, y1:6085.667, z1:31.455, h:200, scen:'WORLD_HUMAN_GUARD_STAND'},
{ x: 1692.997, y: 3758.650, z: 34.705, type: 'ammu', shop: 'ammu2', teks: "~INPUT_PICKUP~ Buy Weapons", task: "" , dist: 2 , ped: 0, ptype: 4, model: 0x9E08633D, x1:1692.896, y1:3761.698, z1: 34.705, h:200, scen:'WORLD_HUMAN_GUARD_STAND'},
{ x: -1118.095, y: 2697.139, z: 18.554, type: 'ammu', shop: 'ammu3', teks: "~INPUT_PICKUP~ Buy Weapons", task: "" , dist: 2 , ped: 0, ptype: 4, model: 0x9E08633D, x1:-1118.617, y1:2700.151, z1:18.554, h:200, scen:'WORLD_HUMAN_GUARD_STAND'},
{ x: -3171.775, y: 1086.571, z: 20.839, type: 'ammu', shop: 'ammu4', teks: "~INPUT_PICKUP~ Buy Weapons", task: "" , dist: 2 , ped: 0, ptype: 4, model: 0x9E08633D, x1:-3173.582, y1:1089.337, z1:20.839, h:220, scen:'WORLD_HUMAN_GUARD_STAND'},
{ x: 2568.789, y: 295.032, z: 108.735, type: 'ammu', shop: 'ammu5', teks: "~INPUT_PICKUP~ Buy Weapons", task: "", dist: 2 , ped: 0, ptype: 4, model: 0x9E08633D, x1:2566.964, y1:292.329, z1:108.735, h:0, scen:'WORLD_HUMAN_GUARD_STAND'},
{ x: 251.838, y: -48.763, z: 69.941, type: 'ammu', shop: 'ammu6', teks: "~INPUT_PICKUP~ Buy Weapons", task: "" , dist: 2, ped: 0, ptype: 4, model: 0x9E08633D, x1:253.542, y1:-51.503, z1:69.941, h:60, scen:'WORLD_HUMAN_GUARD_STAND'},
{ x: -1306.107, y: -393.388, z: 36.696, type: 'ammu', shop: 'ammu7', teks: "~INPUT_PICKUP~ Buy Weapons", task: "", dist: 2 , ped: 0, ptype: 4, model: 0x9E08633D, x1:-1304.126, y1:-395.523, z1:36.696, h:70, scen:'WORLD_HUMAN_GUARD_STAND'},
{ x: -663.299, y: -935.523, z: 21.829, type: 'ammu', shop: 'ammu8', teks: "~INPUT_PICKUP~ Buy Weapons", task: "" , dist: 2, ped: 0, ptype: 4, model: 0x9E08633D, x1:-661.596, y1:-933.430,z1:21.829, h:180, scen:'WORLD_HUMAN_GUARD_STAND'},
{ x: 843.090, y: -1033.054, z: 28.195, type: 'ammu', shop: 'ammu9', teks: "~INPUT_PICKUP~ Buy Weapons", task: "", dist: 2 , ped: 0, ptype: 4, model: 0x9E08633D, x1:841.424, y1:-1035.401, z1:28.195, h:0, scen:'WORLD_HUMAN_GUARD_STAND'},
{ x: 21.187, y: -1107.186, z: 29.797, type: 'ammu', shop: 'ammu10', teks: "~INPUT_PICKUP~ Buy Weapons", task: "" , dist: 2, ped: 0, ptype: 4, model: 0x9E08633D, x1:23.371, y1:-1105.425, z1:29.797, h:160, scen:'WORLD_HUMAN_GUARD_STAND'},
{ x: 811.390, y: -2156.594, z: 29.619, type: 'ammu', shop: 'ammu11', teks: "~INPUT_PICKUP~ Buy Weapons", task: "" , dist: 2, ped: 0, ptype: 4, model: 0x9E08633D, x1:809.130, y1:-2159.293, z1:29.619, h:0, scen:'WORLD_HUMAN_GUARD_STAND'},

{shop: "clothes1", type: "clothes", x: 8.835, y: 6516.381, z: 31.878, teks: "~INPUT_PICKUP~ Buy Clothes", task: "", dist: 4, ped: 0, ptype: 5, model: 0x3EECBA5D, x1:5.464, y1:6510.964, z1:31.878, h:40, scen:"" },
{shop: "clothes2", type: "clothes", x: 1693.245, y: 4828.252, z: 42.063, teks: "~INPUT_PICKUP~ Buy Clothes", task: "", dist: 4 , ped: 0, ptype: 5, model: 0x3EECBA5D, x1:1695.474, y1:4822.339, z1:42.063, h:90, scen:"" },
{shop: "clothes3", type: "clothes", x: 1191.444, y: 2710.192, z: 38.223, teks: "~INPUT_PICKUP~ Buy Clothes", task: "" , dist: 4, ped: 0, ptype: 5, model: 0x3EECBA5D, x1:1197.344, y1:2711.631, z1:38.223, h:200, scen:""  },
{shop: "clothes4", type: "clothes", x: -1105.510, y: 2706.803, z: 19.108, teks: "~INPUT_PICKUP~ Buy Clothes", task: "" , dist: 4, ped: 0, ptype: 5, model: 0x3EECBA5D, x1:-1102.199, y1:2711.912, z1:19.108, h:220, scen:""  },
{shop: "clothes5", type: "clothes", x: 123.609, y: -219.643, z: 54.558, teks: "~INPUT_PICKUP~ Buy Clothes", task: "" , dist: 4, ped: 0, ptype: 5, model: 0x3EECBA5D, x1:127.214, y1:-223.684, z1:54.558, h:40, scen:""  },
{shop: "clothes6", type: "clothes", x: -161.870, y: -303.030, z: 39.733, teks: "~INPUT_PICKUP~ Buy Clothes", task: "" , dist: 4, ped: 0, ptype: 5, model: 0x3EECBA5D, x1:-165.040, y1:-302.992, z1:39.733, h:240, scen:"" },
{shop: "clothes7", type: "clothes", x: -711.726, y: -151.119, z: 37.415, teks: "~INPUT_PICKUP~ Buy Clothes", task: "" , dist: 4 , ped: 0, ptype: 5, model: 0x3EECBA5D, x1:-708.854, y1:-151.888, z1:37.415, h:120, scen:"" },
{shop: "clothes8", type: "clothes", x: -1449.5740, y: -236.5801, z: 49.8106, teks: "~INPUT_PICKUP~ Buy Clothes", task: "", dist: 4 , ped: 0, ptype: 5, model: 0x3EECBA5D, x1:-1448.795, y1:-238.153, z1:49.800, h:90, scen:""  },
{shop: "clothes9", type: "clothes", x: -1193.756, y: -772.604, z: 17.325 , teks: "~INPUT_PICKUP~ Buy Clothes", task: "", dist: 4 , ped: 0, ptype: 5, model: 0x3EECBA5D, x1:-1194.632, y1:-767.460, z1:17.325, h:200, scen:"" },
//clothes10clothesx: -1337.167, y: -1277.598, z: 4.877 },}, //mask
{shop: "clothes11", type: "clothes", x: -827.095, y: -1077.255, z: 11.330 , teks: "~INPUT_PICKUP~ Buy Clothes", task: "", dist: 4 , ped: 0, ptype: 5, model: 0x3EECBA5D, x1:-822.903, y1:-1072.121, z1:11.330, h:240, scen:"" },
{shop: "clothes12", type: "clothes", x: 424.581, y: -800.523, z: 29.493, teks: "~INPUT_PICKUP~ Buy Clothes", task: "" , dist: 4, ped: 0, ptype: 5, model: 0x3EECBA5D,x1:427.070, y1:-806.786, z1:29.493, h:100 , scen:""  },
{shop: "clothes13", type: "clothes",  x: 76.490, y: -1399.034, z: 29.388, teks: "~INPUT_PICKUP~ Buy Clothes", task: "" , dist: 4 , ped: 0, ptype: 5, model: 0x3EECBA5D, x1:73.890, y1:-1392.888, z1:29.388, h:260, scen:"" },
{shop: "clothes14", type: "clothes",  x: -3173.258, y: 1046.967, z: 20.863, teks: "~INPUT_PICKUP~ Buy Clothes", task: "" , dist: 4, ped: 0, ptype: 5, model: 0x3EECBA5D, x1:-3169.028, y1:1043.929, z1:20.863, h:30, scen:""  },
{shop: "clothes15", type: "clothes", x: 617.832, y: 2760.943, z: 42.088, teks: "~INPUT_PICKUP~ Buy Clothes", task: "" , dist: 4 , ped: 0, ptype: 5, model: 0x3EECBA5D, x1:613.047, y1:2761.722, z1:42.088, h:270, scen:"" },

{shop: "store1", type: "store", x: 1728.678,y: 6416.985, z: 35.037, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:1728.678, y1:6416.985, z1:35.037, h:240, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store2", type: "store", x: 1698.361, y:4922.610, z: 42.064, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1: 1698.361, y1:4922.610, z1:42.064, h:0, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store3", type: "store", x: 1959.165,y: 3741.564, z: 32.344, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:1959.165, y1:3741.564, z1:32.344, h:280, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store4", type: "store", x: 2676.520, y:3280.217, z: 55.241, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:2676.520, y1:3280.217, z1:55.241, h:340, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store5", type: "store", x: 1166.379,y: 2710.828, z: 38.158, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:1166.379, y1:2710.828, z1:38.158, h:180, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store6", type: "store", x: -3244.123,y: 1000.120, z: 12.831, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:-3244.123, y1:1000.120, z1:12.831, h:0, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store7", type: "store", x: 549.323, y:2669.635, z: 42.157, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:549.323, y1:2669.635, z1:42.157, h:90, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store8", type: "store", x: -2966.384, y:390.366, z: 15.043, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:-2966.384, y1:390.366, z1:15.043, h:90, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store9", type: "store", x: -1819.645, y:793.814, z: 138.085, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:-1819.645, y1:793.814, z1:138.085, h:130, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store10", type: "store", x: 372.924, y:328.000, z: 103.566, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:372.924, y1:328.000, z1:103.566, h:260, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store11", type: "store", x: 1164.687, y:-322.332, z: 69.205, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:1164.687, y1:-322.332, z1:69.205, h:95, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store12", type: "store", x: 2555.257,y: 380.881, z: 108.623, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:2555.257, y1:380.881, z1:108.623, h:0, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store13", type: "store", x: -1222.276, y:-908.618, z: 12.326, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:-1222.276, y1:-908.618, z1:12.326, h:35, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store14", type: "store", x: 1134.179, y:-981.839, z: 46.416, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:1134.179, y1:-981.839, z1:46.416, h:280, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store15", type: "store", x: -706.010, y:-912.940, z: 19.216, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:-706.010, y1:-912.940, z1:19.216, h:100, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store16", type: "store",  x: -47.3490, y: -1756.6505, z: 29.4210, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1:-46.5129, y1:-1757.7705, z1:29.4210, h:80, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "store17", type: "store",  x: 26.23022,y: -1345.8065,z: 29.4970, teks: "~INPUT_PICKUP~ Buy Food & Drink", task: "", dist: 2, ped: 0, ptype: 5, model: 0xA96E2604, x1: 24.424455642700195,y1: -1345.5521240234375,z1: 29.49702262878418, h:260, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},

{shop: "tattoo1", type: "tattoo",  x: -293.8383, y: 6199.9058, z: 31.4878, teks: "~INPUT_PICKUP~ Get Tattoo", task: "", dist: 1, ped: 0, ptype: 4, model: 0x94AE2B8C, x1:-292.5384,  y1:6200.0771, z1:31.4871,h: 215, scen: 'WORLD_HUMAN_STAND_IMPATIENT' },
{shop: "tattoo2", type: "tattoo",  x: 1864.7523, y: 3748.2773, z: 33.0319, teks: "~INPUT_PICKUP~ Get Tattoo", task: "", dist: 1, ped: 0, ptype: 4, model: 0x94AE2B8C, x1:1862.6411, y1:3747.6218, z1:33.0319,h: 0, scen: 'WORLD_HUMAN_STAND_IMPATIENT' },
{shop: "tattoo3", type: "tattoo",  x: -3170.1052, y: 1076.1619, z: 20.8292, teks: "~INPUT_PICKUP~ Get Tattoo", task: "", dist: 1, ped: 0, ptype: 4, model: 0x94AE2B8C, x1:-3171.0239,  y1:1073.1941, z1: 20.8292,h: 340, scen: 'WORLD_HUMAN_STAND_IMPATIENT' },
{shop: "tattoo4", type: "tattoo",  x: 322.6576, y: 181.6518, z: 103.5865, teks: "~INPUT_PICKUP~ Get Tattoo", task: "", dist: 1, ped: 0, ptype: 4, model: 0x94AE2B8C, x1:319.8332, y1: 181.3259, z1:103.5865, h:260, scen: 'WORLD_HUMAN_STAND_IMPATIENT' },
{shop: "tattoo5", type: "tattoo",  x: -1154.4561, y: -1426.4331, z: 4.9545, teks: "~INPUT_PICKUP~ Get Tattoo", task: "", dist: 1, ped: 0, ptype: 4, model: 0x94AE2B8C, x1:-1151.9836,   y1:-1424.0642, z1:4.9545, h:110, scen: 'WORLD_HUMAN_STAND_IMPATIENT' },
{shop: "tattoo6", type: "tattoo",  x: 1322.4933, y: -1652.7152, z: 52.2752, teks: "~INPUT_PICKUP~ Get Tattoo", task: "", dist: 1, ped: 0, ptype: 4, model: 0x94AE2B8C, x1:1324.7726, y1:-1650.4648, z1:52.2752, h:140, scen: 'WORLD_HUMAN_STAND_IMPATIENT' },


//{shop: "LSC1", type:"Benny's Garage", x: -205.71551513671875,y: -1308.13720703125,z: 31.291532516479492, teks: "~INPUT_PICKUP~ Enter Benny's Garage", task: "", dist: 3, ped: 'mech', ptype: 4, model: 0xF06B849D, x1:0, y1:0, z1:0, h:0, scen: 'WORLD_HUMAN_STAND_IMPATIENT'}, //Bennys Garage

{shop: "LSC2", type:"LSC", x: 116.13595581054688,y: 6621.2197265625,z: 31.863821029663086, teks: "~INPUT_PICKUP~ Enter LS Custom", task: "", dist: 3, ped: 0, ptype: 4, model: 0xF06B849D, x1:106.751, y1:6627.409, z1:31.787, h:230, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "LSC3", type:"LSC", x: 1174.6220703125,y: 2648.22998046875,z: 37.79430389404297, teks: "~INPUT_PICKUP~ Enter LS Custom", task: "", dist: 3, ped: 0, ptype: 4, model: 0xF06B849D, x1:1177.222, y1:2636.882, z1:37.754, h:0, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "LSC4", type:"LSC", x: -357.56695556640625,y: -134.31126403808594,z: 38.84897232055664, teks: "~INPUT_PICKUP~ Enter LS Custom", task: "", dist: 3, ped: 0, ptype: 4, model: 0xF06B849D, x1:-335.062, y1:-139.893,  z1:39.010, h:90, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "LSC5", type:"LSC", x: 720.8727416992188,y: -1088.7689208984375,z: 22.254268646240234, teks: "~INPUT_PICKUP~ Enter LS Custom", task: "", dist: 3, ped: 0, ptype: 4, model: 0xF06B849D, x1:734.617, y1:-1084.921,  z1:22.169, h:100, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},
{shop: "LSC6", type:"LSC", x: -1144.2701416015625,y: -1989.44384765625,z: 13.162511825561523, teks: "~INPUT_PICKUP~ Enter LS Custom", task: "", dist: 3, ped: 0, ptype: 4, model: 0xF06B849D, x1:-1158.502, y1:-2003.749,  z1:13.180, h:310, scen: 'WORLD_HUMAN_STAND_IMPATIENT'},

{shop: "carwash1", type:"carwash",  x: -699.221,y: -923.3081,z: 18.592, teks: "", task: "", dist: 3, ped: 0, ptype: 4, model: 0, x1:0, y1:0,  z1:0, h:0, scen: ""}, //Little Seoul Car Wash
{shop: "carwash2", type:"carwash", x: 47.308, y: -1391.924, z: 28.96, teks: "", task: "", dist: 3, ped: 0, ptype: 4, model: 0, x1:0, y1:0,  z1:0, h:0, scen: ""}, //Strawberry Car Wash

]

const buildings = [
  {name: "dynasty", x:-116.11048889160156, y:-604.9024658203125, z:36.28071975708008, teks:"~INPUT_PICKUP~ Enter Business Center", dist: 1, data:'businessoffice', emit:""},
  {name: "pdm Buymenu", x:-56.477195739746094, y:-1096.162109375, z:26.422351837158203, teks:"~INPUT_PICKUP~ Car Dealer Menu", dist: 1, data:'pdmmenu', emit:"pdmclose"},
  {name: "Rental Menu", x:266.0770, y:-1155.4591, z:29.2853, teks:"~INPUT_PICKUP~ Rent a vehicle", dist: 1, data:'rentalmenu', emit:"rentalmenuclose"},
  
]

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


let shop1 = locations.filter(distance =>{
  return distance.y < -1000 && distance.x < 0
})
let shop2 = locations.filter(distance =>{
  return distance.y < -1000 && distance.x > 0
})
let shop3 = locations.filter(distance =>{
  return distance.y < 2000 && distance.y > -1000 && distance.x < 0
})
let shop4 = locations.filter(distance =>{
  return distance.y < 2000 && distance.y > -1000 && distance.x > 0
})
let shop5 = locations.filter(distance =>{
  return distance.y < 4000 && distance.y > 2000 && distance.x < 0
})
let shop6 = locations.filter(distance =>{
  return distance.y < 4000 && distance.y > 2000 && distance.x > 0
})
let shop7 = locations.filter(distance =>{
  return distance.y > 4000 && distance.x < 0
})
let shop8 = locations.filter(distance =>{
  return distance.y > 4000 && distance.x > 0
})

//deleteMeta('pedshop');

let cashr = alt.hash('prop_till_01');
let target = 0, kasir, lokasi, cmenu = 0, fmenu = 0


alt.on('keydown', (key) => {
  if(key == 'F'.charCodeAt(0)){
    if(target > 0) {
    let rampok = getMeta('rampok');
    if(rampok == target){
    lokasi = native.getEntityCoords(target, false);
    let meta = 'cas'+lokasi.x;
    let cas = getSyncedMeta(meta);
      if(cas == 1){
        let warning = alt.everyTick(()=>{
          drawtext('THIS CASH REGISTER HAS BEEN ROBBED!',0.5, 0.35, 0, 0.4, 0.9, 255,255,255,255);
        })
        let stop = alt.setInterval(()=>{
          alt.clearEveryTick(warning);
          alt.clearInterval(stop);
        },3000);
      } 
      else {
      native.playSound(0, "ROBBERY_MONEY_TOTAL", "HUD_FRONTEND_CUSTOM_SOUNDSET", true, 0 ,false)
      playanim("oddjobs@shop_robbery@rob_till","loop")
      let cash = game.getRandomIntInRange(1000, 4000);
      alt.emitServer('robbed', lokasi.x, cash, 1, lokasi);
      deleteMeta('rampok');
      if(currentped) {
        native.taskCombatPed(currentped, alt.Player.local.scriptID, 0, 16);
        native.setEntityIsTargetPriority(alt.Player.local.scriptID,1,1)
      }
      alt.emit('copchase', 3);
      }
    } else {}
   } 
  }
})

let pedshop = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
]

let clubpeds = 0, shop = 0, area = 'null', currentped = 0
//shopcount()

function shopcount() {
  let coords = [], coordsb = []

shop = alt.setInterval(()=>{
  let pos = alt.Player.local.pos;
  if(pos.x < 0 && pos.y < -1000) {
    if(area == 'shop1') {} else {
      coords = shop1
      area = 'shop1'
    }
  } else if(pos.x > 0 && pos.y < -1000) {
    if(area == 'shop2') {} else {
      coords = shop2
      area = 'shop2'
    }
  } else if(pos.x < 0 && pos.y < 2000 && pos.y > -1000) {
    if(area == 'shop3') {} else {
      coords = shop3
      area = 'shop3'
    }
  } else if(pos.x > 0 && pos.y < 2000 && pos.y > -1000) {
    if(area == 'shop4') {} else {
      coords = shop4
      area = 'shop4'
    }
  } else if(pos.x < 0 && pos.y < 4000 && pos.y > 2000) {
    if(area == 'shop5') {} else {
      coords = shop5
      area = 'shop5'
    }
  } else if(pos.x > 0 && pos.y < 2000 && pos.y > -1000) {
    if(area == 'shop6') {} else {
      coords = shop6
      area = 'shop6'
    }
  } else if(pos.x < 0 && pos.y > 4000) {
    if(area == 'shop7') {} else {
      coords = shop7
      area = 'shop7'
    }
  } else if(pos.x > 0 && pos.y > 4000) {
    if(area == 'shop8') {} else {
      coords = shop8
      area = 'shop8'
    }
  }
 
  if(pos.y < 0 && pos.y > -1500 && pos.x < 500 && pos.x > -500) {
  for(let i in buildings) {
    let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, buildings[i].x, buildings[i].y, buildings[i].z, true);
    if(dist <= 30) {
      let data = hasMeta( buildings[i].data);
      if(data == false) {
        setMeta( buildings[i].data, 0)
        alt.emit('marker', 1, buildings[i].x, buildings[i].y, buildings[i].z-1,1,1,0.6,113,238,252,80)
      } else {}
    } else {
      if(hasMeta( buildings[i].data)) {
        deleteMeta(buildings[i].data)
    }
  }
    if(dist <= buildings[i].dist ) {
      let data=getMeta(buildings[i].data)
      if(data == 0) {
        handletext(buildings[i].teks);
        setMeta(buildings[i].data, 1);
      } else {}
    } else {
      let data = getMeta( buildings[i].data)
      if(data == 1) {
        setMeta(buildings[i].data, 0);
        alt.emit(buildings[i].emit)
      }
    }
  }
}

if(pos.y < -1000 && pos.y > -1600 && pos.x < 500 && pos.x > -100) {
  let trev = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, 94.5893, -1293.16186, 29.268762, true)
  if(trev <= 2) {
    handletext("~INPUT_PICKUP~ Ask Trevor for a job");
    setMeta('trevormenu', 1);
  } else {
    if(hasMeta('trevormenu')) {
      deleteMeta('trevormenu');
    }
  }
}
if(pos.y < -1500 && pos.y > -2000 && pos.x < 1500 && pos.x > 1000) {
  let les = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, 1275.078125, -1721.4180908203125, 54.655067443847656, true);
  if(les <= 2) {
    alt.emit('lesterhouse');
  }
}

  for(let i in coords) {
  let jarak = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, coords[i].x, coords[i].y, coords[i].z, true);
  if(jarak <= 30) {
    if( coords[i].ped > 0) { } 
    else {
      if(currentped > 0) {
        
   // if(coords[i].ped) {
        native.deleteEntity(currentped);
     } 
      //setMeta('pedshop', coords[i].shop);
      if(coords[i].model > 0) {
      native.requestModel(coords[i].model);
      
      let create = alt.setInterval(()=>{
        let ped = native.createPed(coords[i].ptype, coords[i].model, coords[i].x1, coords[i].y1, coords[i].z1, coords[i].h, false, false)
        //pedshop[coords[i].ped] = ped
        
        coords[i].ped = ped
        currentped = ped
        native.taskStartScenarioInPlace(ped, coords[i].scen, -1, false);
       
        native.taskLookAtEntity(ped, alt.Player.local.scriptID, 50000, 1,1)
        if(coords[i].model == 0x9E08633D) {
          native.giveWeaponToPed(ped, 0x1B06D571, 300, false, false);
        native.taskShootAtEntity(ped, alt.Player.local.scriptID, 20000, 7);
        }
        alt.clearInterval(create);
      }, 300);
      }
    }

  target = native.getClosestObjectOfType(pos.x, pos.y, pos.z, 0.4, cashr, false,false,false);
  kasir = native.getEntityModel(target);
  if(kasir == cashr){
    let targeth = native.getEntityHeading(target)
    let playerh = native.getEntityHeading(alt.Player.local.scriptID)
    if(targeth > playerh) {
      if((targeth - playerh) < 20 ) {
        handletext('~INPUT_ARREST~ ROB THE CASH!');
        setMeta('rampok', target);
        if(currentped) {
          native.taskAgitatedActionConfrontResponse(currentped, alt.Player.local.scriptID);
        }
      }
    } else if (targeth < playerh) {
      if((playerh - targeth) < 20) {
        handletext('~INPUT_ARREST~ ROB THE CASH!');
        if(currentped) {
          let iscombat = native.isPedInMeleeCombat(currentped);
          if(iscombat == false) {
            native.taskAgitatedActionConfrontResponse(currentped, alt.Player.local.scriptID);
          }
        }
  setMeta('rampok', target);
      }
    } 
    } 

  } else {
    if(coords[i].ped) {
    native.deleteEntity(coords[i].ped);
    coords[i].ped = 0
    currentped = 0
    }
  } 

  if(jarak <= coords[i].dist) {
    let code = getMeta(coords[i].shop);
    if(code == 0) {
      if(hasMeta('police')) {
        let cop = getMeta('police');
        if(cop == 2) {
          if(coords[i].type == "ammu" || "clothes" || "tattoo") {
            handletext("Not available");
          }
        } else {
          setMeta(coords[i].shop, 1)
        setMeta(coords[i].type, coords[i].shop);
        handletext(coords[i].teks);
        runtask(coords[i].type)
        }
      } else {
        setMeta(coords[i].shop, 1)
        setMeta(coords[i].type, coords[i].shop);
        handletext(coords[i].teks);
        runtask(coords[i].type)
      } 
  } else if(code == 2)  { }
} 
if(jarak <= 6) {
  if(hasMeta(coords[i].shop)) {  }
  else { setMeta(coords[i].shop, 0)
    //native.taskLookAtEntity(pedshop, alt.Player.local.scriptID, 5000,1,0);
    if(coords[i].ped > 0) {
      let iscombat = native.isPedInMeleeCombat(coords[i].ped);
      if(iscombat == false) {
        native.playPedAmbientSpeechNative(coords[i].ped, "SHOP_GREET", "SPEECH_PARAMS_STANDARD",0 )
      }
      
    }
  }
}
if(jarak > 6) {
  if(hasMeta(coords[i].shop)) {
    deleteMeta(coords[i].shop);
    deleteMeta(coords[i].type);
  } else {}
}}

for (let i in pombensin) {
  let type = alt.hash(pombensin[i]);

  let pom = native.getClosestObjectOfType(pos.x, pos.y, pos.z, 1, type, false, false, false);
  
  pompa = native.getEntityModel(pom);
  if(type == pompa){
    if(hasMeta('pom')) { }
    else {
      setMeta('pom', 1);
      handletext("~INPUT_PICKUP~ Fueling vehicle")
      pommenu()
      }
    }
    if(!pom) {
      if(hasMeta('pom')) {
      //  deleteMeta('pom');
        pomclose()
    }
  } 
}

}, 1000);
}

alt.onServer('stopshop', ()=>{
  if(shop || shop > 0) {
    alt.clearInterval(shop);
    shop = 0
  }
})

alt.onServer('startshop',()=>{
    shopcount();
})

alt.on('createmenu', (title, triger, data) =>{
  if(cmenu == 0) {
    freemenu(title, triger, data)
    cmenu = 1
    let timeoff = alt.setInterval(()=>{
      cmenu = 0
      alt.clearInterval(timeoff)
    }, 2000)
  } else {}
})


function freemenu(title, triger, data) {
//alt.log(triger)
  const menu = new NativeUI.Menu("",title, new NativeUI.Point(50, -57), "");
  
  menu.SetNoBannerType();
  menu.Visible = false;
  data.forEach((element)=>{
    let submenu = new NativeUI.UIMenuItem(element.worktype,"",data);
    if(element.price && element.price > 0) {
      submenu.RightLabel = '$ '+element.price
    }
    menu.AddItem(submenu);
  })
    if(menu.visible) {} else {
      menu.Open();
    }
    
    menu.ItemSelect.on((item, selectedItemIndex) => {
      if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < data.length) {
          let job = data[selectedItemIndex];
          if(job.type < 0) {} else {
          //if(cmenu == 1) {
           // cmenu = 0
           menu.Close();
                alt.emit(triger, job.type)
                
                //menu.Clear()
         // }
        }
  }});
  
  alt.on('closemenu', (task)=>{
    if(task == triger) {
      if(menu.Visible) {
        menu.Close(true)
       // menu.Clear()
        cmenu = 0
      }
      
    }
    
  })
}

alt.on('hangarslotmenu', hangarslotmenu)

function runtask(type) {
  const shoptask = [
    {type: 'barber', task: barbermenu()},
    {type: 'ammu', task: ""},
    {type: 'clothes', task: clothesmenu()},
    {type: 'store', task: storemenu()},
    {type: 'tattoo', task: tattooshop()},
    {type: 'LSC', task: ""},
    {type: 'carwash', task: carwashnotif()},
  ]

  for(let i in shoptask) {
    if(shoptask[i].type == type) {
      shoptask[i].task
    }
  }
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

export function handletext(text) {
	game.beginTextCommandDisplayHelp("STRING");
	game.addTextComponentSubstringKeyboardDisplay(text);
	game.endTextCommandDisplayHelp(0, 0, true, -1);
};

export function drawtext(msg, x, y, font, scale, wrap, r, g, b, a,) {
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
