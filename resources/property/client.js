import * as alt from 'alt-client';
import { deleteMeta, getMeta, hasMeta, setMeta } from 'alt-client';
import * as NativeUI from './NativeUI/NativeUi.js';
import * as native from 'natives';
import { highendap, housegarages } from './interior.js';


const apartments = [

    { name: '2057 Vespucci Boulevard', price: 87000, sprite: 'dyn_mp_20', type: 'Low-End Apartment', ipl:'',capacity: 2, x: -662.2802, y: -853.6399, z: 24.4614, x1: 266.1691, y1: -1007.1881, z1: -101.0085, x2: 173.2903, y2:-1003.6, z2:-99.65707, x3: 261.1917, y3: -1003.6173, z3: -99.0087, x4:259.810,y4: -1003.977, z4: -99.008},
    { name:  '1115 Boulevard Del Perro', price: 93000, sprite: 'dyn_mp_23', type: 'Low-End Apartment', ipl:'',capacity: 2, x: -1606.7451, y: -431.9953, z: 40.4320, x1: 266.1691, y1: -1007.1881, z1: -101.0085, x2: 173.2903, y2:-1003.6, z2:-99.65707, x3: 261.1917, y3: -1003.6173, z3: -99.0087, x4:259.810,y4: -1003.977, z4: -99.008},
    { name: '1561 San Vitas Street', price: 99000, sprite: 'dyn_mp_18', type: 'Low-End Apartment', ipl:'',capacity: 2, x: -201.5386, y: 186.4453, z: 80.3226, x1: 266.1691, y1: -1007.1881, z1: -101.0085, x2: 173.2903, y2:-1003.6, z2:-99.65707, x3: 261.1917, y3: -1003.6173, z3: -99.0087, x4:259.810,y4: -1003.977, z4: -99.008}, 
    { name: '1237 Prosperity Street', price: 105000, sprite: 'dyn_mp_22', type: 'Low-End Apartment', ipl:'',capacity: 2, x: -1563.6272, y: -406.3433, z: 42.3840, x1: 266.1691, y1: -1007.1881, z1: -101.0085, x2: 173.2903, y2:-1003.6, z2:-99.65707, x3: 261.1917, y3: -1003.6173, z3: -99.0087, x4:259.810,y4: -1003.977, z4: -99.008}, 
    { name: '0069 Cougar Avenue', price: 112000, sprite: 'dyn_mp_21', type: 'Low-End Apartment', ipl:'',capacity: 2, x: -1534.0039, y: -326.3566, z: 47.9171, x1: 266.1691, y1: -1007.1881, z1: -101.0085, x2: 173.2903, y2:-1003.6, z2:-99.65707, x3: 261.1917, y3: -1003.6173, z3: -99.0087, x4:259.810,y4: -1003.977, z4: -99.008}, 
    { name: '2143 Las Lagunas Boulevard', price: 115000, sprite: 'dyn_mp_17', type: 'Low-End Apartment', ipl:'',capacity: 2, x: -42.0339, y: -58.8042, z: 63.4979, x1: 266.1691, y1: -1007.1881, z1: -101.0085, x2: 173.2903, y2:-1003.6, z2:-99.65707, x3: 261.1917, y3: -1003.6173, z3: -99.0087, x4:259.810,y4: -1003.977, z4: -99.008}, 
    { name: '1893 Grapeseed Avenue', price: 118000, sprite: 'dyn_mp_78', type: 'Low-End Apartment', ipl:'',capacity: 2, x: 1663.0071, y: 4776.2441, z: 42.0076, x1: 266.1691, y1: -1007.1881, z1: -101.0085, x2: 173.2903, y2:-1003.6, z2:-99.65707, x3: 261.1917, y3: -1003.6173, z3: -99.0087, x4:259.810,y4: -1003.977, z4: -99.008}, 
    { name: '140 Zancudo Avenue', price: 120000, sprite: 'dyn_mp_77', type: 'Low-End Apartment', ipl:'',capacity: 2, x: 1900.4093, y: 3772.3909, z: 32.8805, x1: 266.1691, y1: -1007.1881, z1: -101.0085, x2: 173.2903, y2:-1003.6, z2:-99.65707, x3: 261.1917, y3: -1003.6173, z3: -99.0087, x4:259.810,y4: -1003.977, z4: -99.008}, 
    { name: '0232 Paleto Boulevard', price: 121000, sprite: 'dyn_mp_76', type: 'Low-End Apartment', ipl:'',capacity: 2, x: -14.7228, y: 6557.8677, z: 33.2405, x1: 266.1691, y1: -1007.1881, z1: -101.0085, x2: 173.2903, y2:-1003.6, z2:-99.65707, x3: 261.1917, y3: -1003.6173, z3: -99.0087, x4:259.810,y4: -1003.977, z4: -99.008}, 
    { name: '12 Sustancia Road', price: 143000, sprite: 'dyn_mp_73', type: 'Low-End Apartment', ipl:'',capacity: 2, x: 1341.6216, y: -1579.7738, z: 54.0515, x1: 266.1691, y1: -1007.1881, z1: -101.0085, x2: 173.2903, y2:-1003.6, z2:-99.65707, x3: 261.1917, y3: -1003.6173, z3: -99.0087, x4:259.810,y4: -1003.977, z4: -99.008}, 
    { name: '4401 Procopio Drive', price: 165000, sprite: 'dyn_mp_75', type: 'Low-End Apartment', ipl:'',capacity: 2, x: -105.3875, y: 6529.1333, z: 30.1669, x1: 266.1691, y1: -1007.1881, z1: -101.0085, x2: 173.2903, y2:-1003.6, z2:-99.65707, x3: 261.1917, y3: -1003.6173, z3: -99.0087, x4:259.810,y4: -1003.977, z4: -99.008}, 

 
    { name: '0604 Las Lagunas Boulevard', price: 126000, sprite: 'dyn_mp_10', type: 'Medium-End Apartment', ipl:'',capacity: 6, x: 15.3920, y: 84.4579, z: 74.6651, x1: 346.5615, y1: -1012.8875, z1: -99.1962, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 351.3586, y3: -997.4653, z3: -99.1962, x4: 350.5494, y4: -993.9190, z4: -99.1961}, 
    { name: '0605 Spanish Avenue', price: 128000, sprite: 'dyn_mp_9', type: 'Medium-End Apartment', ipl:'',capacity: 6, x: 3.4383, y: 36.4724, z: 71.5304, x1: 346.5615, y1: -1012.8875, z1: -99.1962, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 351.3586, y3: -997.4653, z3: -99.1962, x4: 350.5494, y4: -993.9190, z4: -99.1961}, 
    { name: '1162 Power Street', price: 130000, sprite: 'dyn_mp_8', type: 'Medium-End Apartment', ipl:'',capacity: 6, x: 284.9061, y: -160.6915, z: 64.6171, x1: 346.5615, y1: -1012.8875, z1: -99.1962, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 351.3586, y3: -997.4653, z3: -99.1962, x4: 350.5494, y4: -993.9190, z4: -99.1961}, 
    { name: 'Dream Tower, Apartment 15', price: 134000, sprite: 'dyn_mp_16', type: 'Medium-End Apartment', ipl:'',capacity: 6, x: -763.1710, y: -753.7659, z: 27.8686, x1: 346.5615, y1: -1012.8875, z1: -99.1962, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 351.3586, y3: -997.4653, z3: -99.1962, x4: 350.5494, y4: -993.9190, z4: -99.1961},
    { name: '0325 South Rockford Drive', price: 137000, sprite: 'dyn_mp_15', type: 'Medium-End Apartment', ipl:'',capacity: 6, x: -831.3620, y: -861.9903, z: 20.6897, x1: 346.5615, y1: -1012.8875, z1: -99.1962, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 351.3586, y3: -997.4653, z3: -99.1962, x4: 350.5494, y4: -993.9190, z4: -99.1961}, 
    { name: '0504 South Mo Milton Drive', price: 141000, sprite: 'dyn_mp_13', type: 'Medium-End Apartment', ipl:'',capacity: 6, x: -628.4280, y: 170.0424, z: 61.1496, x1: 346.5615, y1: -1012.8875, z1: -99.1962, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 351.3586, y3: -997.4653, z3: -99.1962, x4: 350.5494, y4: -993.9190, z4: -99.1961}, 
    { name: '0184 Milton Road', price: 146000, sprite: 'dyn_mp_11', type: 'Medium-End Apartment', ipl:'',capacity: 6, x: -511.6639, y: 109.2745, z: 63.8002, x1: 346.5615, y1: -1012.8875, z1: -99.1962, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 351.3586, y3: -997.4653, z3: -99.1962, x4: 350.5494, y4: -993.9190, z4: -99.1961}, 
    { name: '0115 Bay City Avenue', price: 150000, sprite: 'dyn_mp_14', type: 'Medium-End Apartment', ipl:'',capacity: 6, x: -970.5306, y: -1431.7352, z: 7.6792, x1: 346.5615, y1: -1012.8875, z1: -99.1962, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 351.3586, y3: -997.4653, z3: -99.1962, x4: 350.5494, y4: -993.9190, z4: -99.1961}, 
    { name: '4584 Procopio Drive', price: 155000, sprite: 'dyn_mp_74', type: 'Medium-End Apartment', ipl:'',capacity: 6, x: -302.8147, y: 6327.2671, z: 32.8860, x1: 346.5615, y1: -1012.8875, z1: -99.1962, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 351.3586, y3: -997.4653, z3: -99.1962, x4: 350.5494, y4: -993.9190, z4: -99.1961}, 
    { name: '4 Hangman Ave', price: 175000, sprite: 'dyn_mp_72', type: 'Medium-End Apartment', ipl:'',capacity: 6, x: -1405.8629, y: 527.3801, z: 123.8313, x1: 346.5226, y1: -1012.4360, z1: -99.1962, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 351.3586, y3: -997.4653, z3: -99.1962, x4: 350.5494, y4: -993.9190, z4: -99.1961}, 

    { name: 'Weazel Plaza, Apartment 26', price: 464000, sprite: 'dyn_mp_37', type: 'High-End Apartment', ipl:'',capacity: 10, x: -906.3657, y: -451.7212, z: 39.6053,x1: -912.7050, y1: -365.1610, z1: 114.2747, x2: 227.6597, y2: -1005.0309, z2:-99.66071, x3: -902.1653, y3: -370.0524, z3: 113.0742, x4: -903.4783, y4: -364.1607, z4: 113.0741}, 
    { name: 'Del Perro Heights, Apartment 4', price: 468000, sprite: 'dyn_mp_7', type: 'High-End Apartment', ipl:'',capacity: 10, x: -1442.4817, y: -545.7458, z: 34.7418, x1: -1452.0767, y1: -540.6428, z1: 74.0443, x2: 227.6597, y2: -1005.0309, z2:-99.66071, x3: -1455.4823, y3: -551.3149, z3: 72.8437, x4: -1450.5072, y4: -549.634033203125,  z4: 72.84373474121094}, 
    { name: 'Del Perro Heights, Apartment 7', price: 468000, sprite: 'dyn_mp_7', type: 'High-End Apartment', ipl:'',capacity: 10, x: -1442.4817, y: -545.7458, z: 34.7418, x1: -1450.4309, y1: -525.2939, z1: 56.9290, x2: 227.6597, y2: -1005.0309, z2:-99.66071, x3: -1470.4452, y3: -532.1973, z3: 50.7217, x4: -1467.36865234375, y4: -537.0823364257812, z4: 50.732505798339844}, 
    { name: '4 Integrity Way, Apartment 28', price: 476000, sprite: 'dyn_mp_38', type: 'High-End Apartment', ipl:'',capacity: 10, x: -48.2326, y: -585.8759, z: 37.9544, x1: -31.3531, y1: -595.2773, z1: 80.0309, x2: 227.6597, y2: -1005.0309, z2:-99.66071, x3: -34.9015, y3: -584.2311, z3: 78.8303, x4: -37.912078857421875,  y4: -588.46142578125,    z4: 78.83030700683594}, 
    { name: '4 Integrity Way, Apartment 30', price: 476000, sprite: 'dyn_mp_38', type: 'High-End Apartment2', ipl:'',capacity: 10, x: -48.2326, y: -585.8759, z: 37.9544, x1: -18.2921, y1: -590.7587, z1: 90.1149, x2: 227.6597, y2: -1005.0309, z2:-99.66071, x3: -35.2071, y3: -578.3267, z3: 83.9075, x4: -37.11574935913086,    y4: -583.944091796875,    z4: 83.9183349609375}, 
    { name: 'Richards Majestic, Apartment 2', price: 484000, sprite: 'dyn_mp_40', type: 'High-End Apartment', ipl:'',capacity: 10, x: -936.1635, y: -379.0089, z: 38.9613, x1: -912.6129, y1: -365.2747, z1: 114.2748, x2: 227.6597, y2: -1005.0309, z2:-99.66071, x3: -902.4562, y3: -369.6743, z3: 113.0742, x4: -903.5581665039062,    y4: -364.44085693359375,    z4: 113.07416534423828}, 
    { name: 'Tinsel Towers, Apartment 42', price: 492000, sprite: 'dyn_mp_42', type: 'High-End Apartment', ipl:'',capacity: 10, x: -614.4188, y: 45.5843, z: 43.5915, x1: -603.1342, y1: 59.1345, z1: 98.2002, x2: 227.6597, y2: -1005.0309, z2:-99.66071, x3: -595.9142, y3: 50.0709, z3: 96.9997, x4: -594.6488037109375,    y4: 55.47044372558594,    z4: 96.9996109008789}, 
    { name: 'Eclipse Towers, Apartment 3', price: 500000, sprite: 'dyn_mp_1', type: 'High-End Apartment', ipl:'',capacity: 10, x: -777.2336, y: 312.3607, z: 85.6981, x1: -785.0285, y1: 323.7361, z1: 211.9972, x2: 227.6597, y2: -1005.0309, z2:-99.66071, x3: -792.2424, y3: 332.4619, z3: 210.7966, x4: -793.4149169921875,    y4: 326.98919677734375,    z4: 210.79661560058594}, 

    { name: 'Eclipse Towers Suite 1', price: 1100000, sprite: 'dyn_mp_1', type: 'High-End Custom Apartment', ipl:'apa_v_mp_h_01_a',capacity: 10, x: -777.2336, y: 312.3607, z: 85.6981,x1:-786.8663, y1:315.7642, z1:217.6385, x2: 227.6597, y2: -1005.0309, z2:-99.66071, x3: -796.2094, y3: 336.1799, z3: 220.4385, x4: -797.523681640625,    y4: 328.53033447265625,   z4: 220.4385223388672}, 
    { name: 'Eclipse Towers Suite 2', price: 1100000, sprite: 'dyn_mp_1', type: 'High-End Custom Apartment', ipl:'apa_v_mp_h_01_c',capacity: 10, x: -777.2336, y: 312.3607, z: 85.6981, x1:-786.9563, y1:315.6229, z1:187.9136, x2: 227.6597, y2: -1005.0309, z2:-99.66071, x3: -796.2056, y3: 335.8063, z3: 190.7136, x4: -797.5718994140625,    y4: 329.28399658203125,    z4: 190.71359252929688}, 
    { name: 'Eclipse Towers Suite 3', price: 1100000, sprite: 'dyn_mp_1', type: 'High-End Custom Apartment', ipl:'apa_v_mp_h_01_b',capacity: 10, x: -777.2336, y: 312.3607, z: 85.6981, x1:-774.0126, y1:342.0428, z1:196.6864, x2: 227.6597, y2: -1005.0309, z2:-99.66071, x3: -764.8007, y3: 321.7028, z3: 199.4863, x4: -763.6343994140625,    y4: 328.28912353515625,    z4: 199.48634338378906}, 

    { name: '2113 Mad Wayne Thunder Drive', price: 449000, sprite: 'dyn_mp_89', type: 'STILT-House', ipl:'',capacity: 6, x: -1294.8896, y: 455.3865, z: 97.3851,x1:-1289.889892578125, y1: 448.91156005859375, z1: 97.90251159667969, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: -1284.7588, y3: 433.2225, z3: 94.1201, x4: -1286.1156005859375,    y4: 437.89892578125,    z4: 94.09481811523438},
    { name: '3677 Whispymound Drive', price: 478000, sprite: 'dyn_mp_84', type: 'STILT-House', ipl:'',capacity: 6, x: 119.4437, y: 564.8292, z: 183.9593, x1: 117.2115, y1: 559.7249, z1: 184.3049, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 123.8181, y3: 543.9606, z3: 180.5227, x4: 122.19487762451172,  y4: 548.44384765625,    z4: 180.4971923828125}, 
    { name: '2866 Hillcrest Avenue', price: 525000, sprite: 'dyn_mp_86', type: 'STILT-House', ipl:'',capacity: 6, x: -732.8703, y: 594.5293, z: 142.0089,x1: -682.0554, y1: 591.9774, z1: 145.3931, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: -667.2481, y3: 584.0021, z3: 141.5957, x4: -671.298583984375,    y4: 587.0418701171875,    z4: 141.5698699951172}, 
    { name: '2874 Hillcrest Avenue', price: 571000, sprite: 'dyn_mp_87', type: 'STILT-House', ipl:'',capacity: 6, x: -853.2504272460938,    y: 695.7698364257812,    z: 148.78607177734375, x1: -859.6875, y1: 690.6299, z1: 152.8607, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: -854.0290, y3: 675.6053, z3: 149.0531, x4: -855.275390625,    y4: 680.038330078125,    z4: 149.05313110351562}, 
    { name: '2117 Milton Road', price: 608000, sprite: 'dyn_mp_85', type: 'STILT-House', ipl:'',capacity: 6, x: -559.5782, y: 664.0544, z: 145.4571, x1: 373.4371, y1: 423.4196, z1: 145.9079, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 374.4172, y3: 406.7940, z3: 142.1250, x4: 374.1080017089844,    y4: 411.1213684082031,    z4: 142.1002655029297}, 
    { name: '2045 North Conker Avenue', price: 727000, sprite: 'dyn_mp_90', type: 'STILT-House',capacity: 6, ipl:'', x: 372.9561, y: 428.1560, z: 145.6847,x1:373.3592224121094,    y1: 423.2269592285156,    z1: 145.90786743164062, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 374.5421, y3: 406.6982, z3: 142.1256, x4: 374.3527526855469,    y4: 411.490478515625,    z4: 142.1001739501953}, //x: 392.3625, y: 432.4158, z: 142.9366, h:79.27525329589844
    { name: '2868 Hillcrest Avenue', price: 672000, sprite: 'dyn_mp_82', type: 'STILT-House',capacity: 6, ipl:'', x: -752.8651, y: 620.4985, z: 142.6142,x1: -758.7473, y1: 618.7451, z1: 144.1539, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: -771.5027, y3: 608.4452, z3: 140.3555, x4: -767.56884765625,    y4: 610.677001953125,    z4: 140.3307342529297}, //x: -753.3911, y: 630.3990, z: 142.1189, h:204.73519897460938
    { name: '2862 Hillcrest Avenue', price: 705000, sprite: 'dyn_mp_83', type: 'STILT-House',capacity: 6, ipl:'', x: -686.4523, y: 596.6569, z: 143.6420,x1: -682.0554, y1: 591.9774, z1: 145.3931, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: -667.4085, y3: 584.3737, z3: 141.5956, x4: -671.3753662109375,    y4: 587.1546020507812,    z4: 141.56988525390625}, //x: -683.7848, y: 603.7130, z: 143.2395, h:134.99737548828125
    { name: '2044 North Conker Avenue', price: 762000, sprite: 'dyn_mp_81', type: 'STILT-House',capacity: 6, ipl:'', x: 347.1687, y: 441.2439, z: 147.7018,x1:340.9412,y1: 437.1798, z1:149.3925, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: 330.4397, y3: 425.2395, z3: 145.5962, x4: 334.4052429199219,    y4: 428.6645202636719,    z4: 145.57086181640625}, //x: 353.9825, y: 438.7299, z: 146.0581, h:299.1738586425781
    { name: '3655 Wild Oats Drive', price: 800000, sprite: 'dyn_mp_80', type: 'STILT-House',capacity: 6, ipl:'', x: -176.2139, y: 502.7722, z: 137.4217,x1: -174.2873, y1: 497.3810, z1: 137.6666, x2: 197.8153, y2:-1002.293, z2:-99.65749, x3: -165.3443, y3: 483.4010, z3: 133.8692, x4: -167.78317260742188,    y4: 487.83746337890625,    z4: 133.8437957763672}, //x: -190.1076, y: 504.7949, z: 133.6967, h:279.6554260253906
]

const aptstyle = [
    {name: 'Moody', ipl1: 'apa_v_mp_h_02_a', ipl2: 'apa_v_mp_h_02_c', ipl3: 'apa_v_mp_h_02_b', price:150000},
    {name: 'Vibrant', ipl1: 'apa_v_mp_h_03_a', ipl2: 'apa_v_mp_h_03_c', ipl3: 'apa_v_mp_h_03_b', price:175000},
    {name: 'Sharp', ipl1: 'apa_v_mp_h_04_a', ipl2: 'apa_v_mp_h_04_c', ipl3: 'apa_v_mp_h_04_b', price:200000},
    {name: 'Monochrome', ipl1: 'apa_v_mp_h_05_a', ipl2: 'apa_v_mp_h_05_c', ipl3: 'apa_v_mp_h_05_b', price:235000},
    {name: 'Seductive', ipl1: 'apa_v_mp_h_06_a', ipl2: 'apa_v_mp_h_06_c', ipl3: 'apa_v_mp_h_06_b', price:250000},
    {name: 'Regal', ipl1: 'apa_v_mp_h_07_a', ipl2: 'apa_v_mp_h_07_c', ipl3: 'apa_v_mp_h_07_b', price:265000},
    {name: 'Aqua', ipl1: 'apa_v_mp_h_08_a', ipl2: 'apa_v_mp_h_08_c', ipl3: 'apa_v_mp_h_08_b', price:285000},

]
const garages = [
    {nama: '1 Strawberry Avenue', capacity: 2, price:26000, x: -245.9399, y: 6239.2847, z: 31.4892, x1: 173.2903, y1:-1003.6, z1:-99.65707, x2: 172.8510, y2: -1007.9777, z2: -98.9999, x3: -244.8597, y3: 6233.3594, z3: 30.8534, h:135.25653076171875 },
    {nama: '142 Paleto Boulevard', capacity: 2, price:26500, x: -69.7794, y: 6427.7690, z: 31.4391, x1: 173.2903, y1:-1003.6, z1:-99.65707, x2: 172.8510, y2: -1007.9777, z2: -98.9999, x3: -75.5029, y3: 6424.7363, z3: 30.8542, h:43.99967575073242  },
    {nama: '1200 Route 68', capacity: 2, price:28000, x: 639.3412, y: 2774.1150, z: 42.0044, x1: 173.2903, y1:-1003.6, z1:-99.65707, x2: 172.8510, y2: -1007.9777, z2: -98.9999, x3: 644.0479, y3: 2774.7463, z3: 41.3960 ,h:273.78509521484375 },
    {nama: '1932 Grapeseed Avenue', capacity: 2, price:27500, x: 2553.2866, y: 4670.4150, z: 33.9502, x1: 173.2903, y1:-1003.6, z1:-99.65707, x2: 172.8510, y2: -1007.9777, z2: -98.9999 ,x3: 2551.4072, y3: 4676.2773, z3: 33.3115, h:18.45798110961914 },
    {nama: '634 Boulevard Del Perro', capacity: 2, price:33500, x: -1242.7206, y: -257.7816, z: 38.9696, x1: 173.2903, y1:-1003.6, z1:-99.65707 , x2: 172.8510, y2: -1007.9777, z2: -98.9999, x3: -1245.2722, y3: -252.7724, z3: 38.6690, h:296.3630065917969 },

    {nama: '8754 Route 68', capacity: 6, price:65000, x: -1132.2837, y: 2698.2363, z: 18.8004, x1: 197.8153, y1:-1002.293, z1:-99.65749, x2: 201.9089, y2: -1006.5569, z2: -98.9999, x3: -1133.3418, y3: 2692.3049, z3: 18.1636, h:128.58694458007812 },
    {nama: '870 Route 68 Approach', capacity: 6, price: 62500, x: 189.4061, y: 2787.0830, z: 45.5960, x1: 197.8153, y1:-1002.293, z1:-99.65749,  x2: 201.9089, y2: -1006.5569, z2: -98.9999, x3: 191.9587, y3: 2791.3701, z3: 45.1268, h:7.02931547164917},
    {nama: '1905 Davis Avenue', capacity: 6, price: 75000, x: -9.3990, y: -1644.2891, z: 29.1703, x1: 197.8153, y1:-1002.293, z1:-99.65749,  x2: 201.9089, y2: -1006.5569, z2: -98.9999, x3: -4.0241, y3: -1646.2860, z3: 28.6864, h:229.94757080078125 },

    {nama: '0120 Murrieta Heights', capacity: 6, price: 75000, x: 965.4340, y: -1019.7218, z: 40.8496, x1: 197.8153, y1:-1002.293, z1:-99.65749,  x2: 201.9089, y2: -1006.5569, z2: -98.9999, x3: 969.7516, y3: -1014.5390, z3: 40.4427, h:266.5289306640625 },
    {nama: 'Popular Street, Unit 2', capacity: 6, price: 75000, x: 817.2469, y: -922.3578, z: 26.0885, x1: 197.8153, y1:-1002.293, z1:-99.65749,  x2: 201.9089, y2: -1006.5569, z2: -98.9999, x3: 810.7962, y3: -919.0411, z3: 25.3554, h:90.99382019042969 },
    {nama: '331 Supply Street', capacity: 6, price: 75000, x: 760.2734, y: -757.6382, z: 26.8178, x1: 197.8153, y1:-1002.293, z1:-99.65749,  x2: 201.9089, y2: -1006.5569, z2: -98.9999, x3: 763.1733, y3: -751.4621, z3: 26.4433, h:1.151628851890564 }, 
    {nama: 'Greenwich Parkway, Unit 76', capacity: 6, price: 75000, x: -1096.3386, y: -2223.0796, z: 13.2309, x1: 197.8153, y1:-1002.293, z1:-99.65749,  x2: 201.9089, y2: -1006.5569, z2: -98.9999, x3: -1090.8182, y3: -2225.2725, z3: 12.7250, h:224.46405029296875 },
    {nama: '1337 Exceptionalists Way', capacity: 6, price: 75000, x: -666.5082, y: -2378.8630, z: 13.8886, x1: 197.8153, y1:-1002.293, z1:-99.65749,  x2: 201.9089, y2: -1006.5569, z2: -98.9999, x3: -671.5532, y3: -2381.6272, z3: 13.3241, h:57.91048049926758 },
    {nama: '1623 South Shambles Street', capacity: 6, price: 75000, x: 1027.0239, y: -2398.5920, z: 29.8842, x1: 197.8153, y1:-1002.293, z1:-99.65749,  x2: 201.9089, y2: -1006.5569, z2: -98.9999, x3: 1031.6984, y3: -2404.9578, z3: 29.0745, h:175.69747924804688 },
]

const fluktuasi = [
    0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0
   // 70000, 90000, 110000, 135000, 160000, 186000, 195000, 205000, 225000, 242000
]

let bunga = 0, buymenu = 0, houseipl;
let harga = 0;
let buyhouseMenu;

alt.setInterval(()=>{
    bunga = fluktuasi[getRandomListEntry(fluktuasi)]
    alt.log('house price change', bunga)
}, 60000*45)

const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    buyhousepoint: new NativeUI.Point(50, 156),
    TitleScale: 1.2,
    TitleFont: 1,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
    Color: new NativeUI.Color(116,155,205,255),
}

const EventNames = {
    ToggleMenu: "Property:Menu",
}

const MenuText = {
    MenuTitle: '',
    MenuSubTitle: "",
    sprite: 'www_suemurry_com',
    sprite1: 'suemurry_background_left',
}

const DinastyMenu = new NativeUI.Menu(MenuText.MenuTitle, '~b~LOST SANTOS CITY CENTER~b~', MenuSettings.Point, MenuText.sprite, MenuText.sprite1);
DinastyMenu.Visible = false;
DinastyMenu.GetTitle().Scale = MenuSettings.TitleScale,
DinastyMenu.GetTitle().Font = MenuSettings.TitleFont;
DinastyMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
DinastyMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;

let houseMenuItem = new NativeUI.UIMenuItem("Buy Property", "");
DinastyMenu.AddItem(houseMenuItem)


let houseMenu = new NativeUI.Menu(MenuText.MenuTitle, "~b~APARTMENTS & HOUSES~b~", MenuSettings.Point, 'thumbnail_dynasty8realestate_com', 'thumbnail_dynasty8realestate_com');
houseMenu.Visible = false;
houseMenu.GetTitle().Scale = MenuSettings.TitleScale;
houseMenu.GetTitle().Font = MenuSettings.TitleFont;
houseMenu.GetTitle().DropShadow = MenuSettings.DropShadow;

//DinastyMenu.ItemSelect.on((item, selectedItemIndex) => {
  //  if (item instanceof NativeUI.UIMenuItem && item.Text == "Buy Property") {
  //      houseMenu.Clear();
  //  }
//})

DinastyMenu.AddSubMenu(houseMenu, houseMenuItem);

apartments.forEach(element => {
	let apartmentsMenuItem = new NativeUI.UIMenuItem(element.name, element.type);
    let propstat = getMeta(element.name);
    let houselabel;
    if(propstat == undefined) {
    apartmentsMenuItem.RightLabel = ('~g~$ '+(element.price+(element.price*bunga))+'~g~')
    } else if(propstat > 0){
        apartmentsMenuItem.RightLabel = '~g~OWNED~g~';
    }
	houseMenu.AddItem(apartmentsMenuItem);
});


houseMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < apartments.length) {
		
		let house = apartments[selectedItemIndex];
        let sprite = house.sprite;
        let subtitle = '~g~'+house.name+'~g~';
        let price = (house.price+(house.price*bunga))
        let properti = getMeta(house.name);
        let styleprice = 0
        houseipl = house.ipl;
        //native.requestIpl(house.ipl);
        
        //banner.Size = new NativeUI.Size(431, 216)
        
        DinastyMenu.Close(true);
        
        buyhouseMenu = new NativeUI.Menu('', subtitle, new NativeUI.Point(50, 50), '', '');
        var banner = new NativeUI.Sprite(sprite, sprite, new NativeUI.Point(50, 50), new NativeUI.Size(431, 107));
        buyhouseMenu.AddSpriteBannerType(banner);

        
buyhouseMenu.Visible = false;
buyhouseMenu.GetTitle().Scale = MenuSettings.TitleScale;
buyhouseMenu.GetTitle().Font = MenuSettings.TitleFont;
buyhouseMenu.GetTitle().DropShadow = MenuSettings.DropShadow;

buyhouseMenu.Open();
buymenu = 1;
setMeta('propertymenu', 2);

//drawimage(sprite);

let priceItem = new NativeUI.UIMenuItem("~g~ "+house.capacity+"  "+house.type+"~g~", "");
//priceItem.RightLabel = '~g~$ '+price+'~g~'
priceItem.LeftBadge = 12
buyhouseMenu.AddItem(priceItem)

//let blipItem = new NativeUI.UIMenuItem("Set Destination", "");
//buyhouseMenu.AddItem(blipItem)
let BuyhouseItem = new NativeUI.UIMenuItem("Purchase Property", "");
let OwnItem = new NativeUI.UIMenuItem("OWNED", "");
BuyhouseItem.RightLabel = '$ '+(price+styleprice);
let styleItem = new NativeUI.UIMenuItem("Styles", "Choose your interior style");
let getoutItem = new NativeUI.UIMenuItem("Exit Apartment", "");
let getinItem = new NativeUI.UIMenuItem("Enter Apartment", "");
let garageItem = new NativeUI.UIMenuItem("Enter Garage", "");
if(properti > 0) {
    buyhouseMenu.AddItem(OwnItem)
} else {
buyhouseMenu.AddItem(BuyhouseItem)
}
let backItem = new NativeUI.UIMenuItem("Cancel", "");
buyhouseMenu.AddItem(backItem)
let cancelItem = new NativeUI.UIMenuItem("Cancel Purchase", "");

//let dyns;
//let houseblip;

let houseblip = native.addBlipForCoord(house.x, house.y, house.z);
      native.setBlipSprite(houseblip, 350)
      native.setBlipColour(houseblip, 2)
      native.setBlipRoute(houseblip, true);
      native.setBlipRouteColour(houseblip, 2);
      let dyns = alt.everyTick(()=>{
        drawtext('Go to ~g~Destination~g~ ~w~to see the Apartment~w~', 0.5, 0.95, 0, 0.5, 0.9, 255,255,255,255);
        let pos = alt.Player.local.pos;
          //native.drawSprite("CommonMenu", "MPWeaponsCommon", 0.1, 0.1, 0.2, 0.1, 0.0,100,100,0,0,true);
          let jarakhouse = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, house.x, house.y, house.z, true);
          if(jarakhouse < 20) {
            native.drawMarker(1, house.x, house.y, house.z-1.1, 0,0,0,0,0,0, 1,1,1, 0,200,50,100,0,0,0,0,0,0,0);
          }
          if(jarakhouse < 1) {
            alt.clearEveryTick(dyns);
            dyns = 0;
            native.removeBlip(houseblip);
            native.clearAllBlipRoutes();
            native.doScreenFadeOut(2000);
            native.requestIpl(house.ipl);
            
            let inside = alt.setInterval(()=>{
            alt.emitServer('getinhouse', {x:house.x1, y:house.y1, z:house.z1});
       
            buyhouseMenu.RemoveItem(backItem);
            if(house.type == 'High-End Custom Apartment') {
                buyhouseMenu.AddItem(styleItem)
                buyhouseMenu.AddSubMenu(stylemenu, styleItem);
            }
            
            buyhouseMenu.AddItem(getoutItem)
            buyhouseMenu.AddItem(garageItem)
            buyhouseMenu.AddItem(cancelItem)
            buyhouseMenu.Open();
            buyhouseMenu.CloseableByUser = false;
            setMeta('propertymenu', 2);
            native.doScreenFadeIn(2000);
            alt.clearInterval(inside);
            //houseinterior()
            }, 3000)
          }
      })
let stylemenu = new NativeUI.Menu('', "STYLES", new NativeUI.Point(50, 50), '', '');
stylemenu.AddSpriteBannerType(banner);

aptstyle.forEach(element =>{
    let styles = new NativeUI.UIMenuItem(element.name, "",)
    stylemenu.AddItem(styles);
    styles.RightLabel = '$'+element.price;
})

stylemenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < aptstyle.length) {
		let style = aptstyle[selectedItemIndex];
        if(house.ipl == 'apa_v_mp_h_01_a') {
            setaptstyle(style.ipl1)
        } else if(house.ipl == 'apa_v_mp_h_01_c') {
            setaptstyle(style.ipl2)
        } if(house.ipl == 'apa_v_mp_h_01_b') {
            setaptstyle(style.ipl3)
        } 
        styleprice = style.price;
    }
})

function setaptstyle(ipl) {
    native.doScreenFadeOut(500);
    let change = alt.setInterval(()=>{
        native.removeIpl(houseipl);
        native.requestIpl(ipl);
        native.doScreenFadeIn(2000);
        alt.clearInterval(change);
        houseipl = ipl;
    }, 1000);
}

buyhouseMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Property") {
      let money = getMeta('money');
      let playerprop = getMeta('garage');
      //alt.log(playerprop);
      
      if((money.bank + money.cash) > (price + styleprice) ) {
        if(playerprop < 5) {
            if(dyns > 0) {
            alt.clearEveryTick(dyns);
            dyns = 0;
            }
            let selectedgarage = housegarages.filter(function(garage) {
                return garage.nama == house.name;
            })
      buyhouseMenu.Close();
      houseMenu.Close();
      DinastyMenu.Close();
      native.removeBlip(houseblip);
        native.clearAllBlipRoutes();
      native.doScreenFadeOut(2000);
      let outside = alt.setInterval(()=>{
        house.ipl = houseipl;
        alt.emitServer('buyproperty', house, selectedgarage[0], price+styleprice, playerprop);
        alt.emit('buy', price+styleprice);
        native.doScreenFadeIn(2000)
        buynotif('HOUSE PURCHASED', 'HOUSE PURCHASE SUCCESSFULL')
        alt.clearInterval(outside);
    }, 3000); 
    deleteMeta('propertymenu');
    } else { handletext('PROPERTY LIMIT EXCEEDED!')}
    } else {
        handletext('NOT ENOUGH MONEY!')
    }
    } else
    if(item instanceof NativeUI.UIMenuItem && item.Text == "Clear Destination") {
        alt.clearEveryTick(dyns);
        //buyhouseMenu.AddItem(blipItem)
        native.removeBlip(houseblip);
        native.clearAllBlipRoutes();
    } else
    if(item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        //if(dyns) {
       alt.clearEveryTick(dyns);
       // } else {}
        //setMeta('propertymenu', 0);
        buyhouseMenu.Close(true);
        houseMenu.Open();
        setMeta('propertymenu', 1);
        native.removeBlip(houseblip);
        native.clearAllBlipRoutes();  
    }else
    if(item instanceof NativeUI.UIMenuItem && item.Text == "Cancel Purchase") {
        buyhouseMenu.Close(true);
        native.doScreenFadeOut(2000);
      let outside = alt.setInterval(()=>{
        alt.emitServer('getouthouse', {x:house.x, y:house.y, z:house.z});
        native.doScreenFadeIn(2000)
        alt.clearInterval(outside);
        native.removeIpl(house.ipl)
        deleteMeta('propertymenu');
 
    }, 3000); 
    houseMenu.Open();
        setMeta('propertymenu', 0);
    } else
    if(item instanceof NativeUI.UIMenuItem && item.Text == "Exit Apartment") {
        native.doScreenFadeOut(2000);
        buyhouseMenu.Close();
        buyhouseMenu.RemoveItem(getinItem);
        buyhouseMenu.RemoveItem(cancelItem);
        let outside = alt.setInterval(()=>{
            alt.emitServer('getouthouse', {x:house.x, y:house.y, z:house.z});
            native.doScreenFadeIn(2000)
            alt.clearInterval(outside);
            buyhouseMenu.RemoveItem(backItem);
            buyhouseMenu.RemoveItem(getoutItem);
            buyhouseMenu.RemoveItem(garageItem);
            buyhouseMenu.AddItem(getinItem)
            buyhouseMenu.AddItem(cancelItem)
            buyhouseMenu.Open();
            
        }, 3000); 
    } else
    if(item instanceof NativeUI.UIMenuItem && item.Text == "Enter Apartment") {
        native.doScreenFadeOut(2000);
        buyhouseMenu.Close();
        buyhouseMenu.RemoveItem(getoutItem);
        buyhouseMenu.RemoveItem(garageItem);
        buyhouseMenu.RemoveItem(cancelItem);
        let outside = alt.setInterval(()=>{
            alt.emitServer('getinhouse', {x:house.x1, y:house.y1, z:house.z1});
            native.doScreenFadeIn(2000)
            alt.clearInterval(outside);
            buyhouseMenu.RemoveItem(backItem);
            buyhouseMenu.RemoveItem(getinItem);
            buyhouseMenu.AddItem(garageItem)
            buyhouseMenu.AddItem(getoutItem)
            buyhouseMenu.AddItem(cancelItem)
            buyhouseMenu.Open();
        }, 3000); 
    } else
    if(item instanceof NativeUI.UIMenuItem && item.Text == "Enter Garage") {
        native.doScreenFadeOut(2000);
        buyhouseMenu.Close();
        buyhouseMenu.RemoveItem(cancelItem);
        let outside = alt.setInterval(()=>{
            alt.emitServer('getinhouse', {x:house.x2, y:house.y2, z:house.z2});
            native.doScreenFadeIn(2000)
            alt.clearInterval(outside);
            buyhouseMenu.RemoveItem(garageItem);
            buyhouseMenu.RemoveItem(getoutItem);
            buyhouseMenu.RemoveItem(backItem);
            buyhouseMenu.AddItem(getinItem)
            buyhouseMenu.AddItem(cancelItem)
            buyhouseMenu.Open();
        }, 3000); 
    }
});
}});

let buygarageMenu;

let garageMenuItem = new NativeUI.UIMenuItem("Buy Garage", "");
DinastyMenu.AddItem(garageMenuItem)

let garageMenu = new NativeUI.Menu(MenuText.MenuTitle, "~b~VEHICLE GARAGES~b~", MenuSettings.Point, 'thumbnail_dynasty8realestate_com', 'thumbnail_dynasty8realestate_com');
garageMenu.Visible = false;
garageMenu.GetTitle().Scale = MenuSettings.TitleScale;
garageMenu.GetTitle().Font = MenuSettings.TitleFont;
garageMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
DinastyMenu.AddSubMenu(garageMenu, garageMenuItem);

garages.forEach(element => {
	let garageMenuItem = new NativeUI.UIMenuItem(element.nama, 'Garage Capacity '+element.capacity);
    let garstat = getMeta(element.nama);
    if(garstat > 0) {
        garageMenuItem.RightLabel = '~g~OWNED~g~'
    } else {
    garageMenuItem.RightLabel = ('~g~$ '+element.price+'~g~')
    }
    garageMenu.AddItem(garageMenuItem);
});

garageMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < garages.length) {
		let garage = garages[selectedItemIndex];
        
        let price = garage.price;
        buygarageMenu = new NativeUI.Menu('', garage.nama, new NativeUI.Point(50, 50), 'thumbnail_dynasty8realestate_com', 'thumbnail_dynasty8realestate_com');
        //buygarageMenu.CloseableByUser = false;
        buygarageMenu.Visible = false;
        buygarageMenu.GetTitle().Scale = MenuSettings.TitleScale;
        buygarageMenu.GetTitle().Font = MenuSettings.TitleFont;
        buygarageMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
        garageMenu.Close(true);
        buygarageMenu.Open();
        setMeta('propertymenu', 3);

let gpriceItem = new NativeUI.UIMenuItem("~g~ "+garage.capacity+"~g~", "");
let garstat = getMeta(garage.nama);
if(garstat > 0) {
    gpriceItem.RightLabel = '~g~OWNED~g~'
} else {
    gpriceItem.RightLabel = ('~g~$ '+price+'~g~')
}
gpriceItem.LeftBadge = 12
buygarageMenu.AddItem(gpriceItem)

let buygarageItem = new NativeUI.UIMenuItem("Purchase Garage", "");
buygarageMenu.AddItem(buygarageItem)
let getoutItem = new NativeUI.UIMenuItem("Exit Garage", "");
let garageItem = new NativeUI.UIMenuItem("Enter Garage", "");
let returnItem = new NativeUI.UIMenuItem("Cancel", "");
buygarageMenu.AddItem(returnItem)
let cancelItem = new NativeUI.UIMenuItem("Cancel Purchase", "");

let garageblip = native.addBlipForCoord(garage.x, garage.y, garage.z);
      native.setBlipSprite(garageblip, 369)
      native.setBlipColour(garageblip, 2)
      native.setBlipRoute(garageblip, true);
      native.setBlipRouteColour(garageblip, 2);
      let dyns = alt.everyTick(()=>{
        let pos = alt.Player.local.pos;
          let jarak = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, garage.x, garage.y, garage.z, true);
          if(jarak < 20) {
            native.drawMarker(1, garage.x, garage.y, garage.z-1.1, 0,0,0,0,0,0, 1,1,1, 0,200,50,100,0,0,0,0,0,0,0);
          }
          if(jarak < 1) {
            alt.clearEveryTick(dyns);
            native.removeBlip(garageblip);
            native.clearAllBlipRoutes();
            native.doScreenFadeOut(2000);
            let inside = alt.setInterval(()=>{
            alt.emitServer('getinhouse', {x:garage.x1, y:garage.y1, z:garage.z1});
            
       
            buygarageMenu.RemoveItem(returnItem);
            buygarageMenu.AddItem(getoutItem)
            buygarageMenu.AddItem(cancelItem)
            buygarageMenu.Open();
            setMeta('propertymenu', 3);
            native.doScreenFadeIn(2000);
            alt.clearInterval(inside);
            }, 3000)
          }
      })

buygarageMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Purchase Garage") {
        let gar = getMeta('garage');
        let pgarage = getMeta(garage.nama);
        if(pgarage == 0){
            let money = getMeta('money');
            if((money.bank + money.cash) > garage.price){
                if(gar < 5) {
                alt.emitServer('buygarage', garage, gar);
                deleteMeta('propertymenu');
                } else { handlenotif('PROPERTY LIMIT EXCEEDED!'); }
            } else { 
                    handletext('NOT ENOUGH MONEY!');
             }
      }else {}

    } else
    if(item instanceof NativeUI.UIMenuItem && item.Text == "Cancel") {
        //if(dyns) {
       alt.clearEveryTick(dyns);
       // } else {}
        //setMeta('propertymenu', 0);
        buygarageMenu.Close(true);
        garageMenu.Open();
        setMeta('propertymenu', 1);
        native.removeBlip(garageblip);
        native.clearAllBlipRoutes();  
    } else
    if(item instanceof NativeUI.UIMenuItem && item.Text == "Enter Garage") {
        native.doScreenFadeOut(2000);
        let outside = alt.setInterval(()=>{
            alt.emitServer('getinhouse', {x:garage.x1, y:garage.y1, z:garage.z1});
            native.doScreenFadeIn(2000)
            alt.clearInterval(outside);
            buyhouseMenu.RemoveItem(backItem);
            buyhouseMenu.AddItem(garageItem)
            buyhouseMenu.AddItem(cancelItem)
        }, 3000); 
    } else
    if(item instanceof NativeUI.UIMenuItem && item.Text == "Exit Garage") {
        native.doScreenFadeOut(2000);
        buygarageMenu.RemoveItem(garageItem);
        let outside = alt.setInterval(()=>{
            alt.emitServer('getouthouse', {x:garage.x, y:garage.y, z:garage.z});
            native.doScreenFadeIn(2000)
            alt.clearInterval(outside);
            buyhouseMenu.RemoveItem(backItem);
            buyhouseMenu.RemoveItem(getoutItem);
            buyhouseMenu.AddItem(garageItem)
            buyhouseMenu.AddItem(cancelItem)
            
        }, 3000); 
    } else
    if(item instanceof NativeUI.UIMenuItem && item.Text == "Cancel Purchase") {
        buygarageMenu.Close(true);
        native.doScreenFadeOut(2000);
      let outside = alt.setInterval(()=>{
        alt.emitServer('getouthouse', {x:garage.x, y:garage.y, z:garage.z});
        native.doScreenFadeIn(2000)
        alt.clearInterval(outside);
    }, 3000); 
    let lsmenu = getMeta('propertymenu');
    if(lsmenu == 1) {
        garageMenu.Open();
        deleteMeta('propertymenu');
    } else {}
    }
})
}})


let jobMenuItem = new NativeUI.UIMenuItem("Looking for Job", "");
DinastyMenu.AddItem(jobMenuItem)

DinastyMenu.ItemSelect.on((item, selectedItemIndex) => {
    if (item instanceof NativeUI.UIMenuItem && item.Text == "Looking for Job") {
        let job = getMeta('fixjob');
       if(job > 0) {
            handletext("JOB MENU NOT AVAILABLE")
        } else {
            DinastyMenu.Close(true);
            jobMenu.Open();
        }
    }
})

let jobMenu = new NativeUI.Menu(MenuText.MenuTitle, "~b~SELECT JOB~b~", MenuSettings.Point, MenuText.sprite, MenuText.sprite1);
jobMenu.Visible = false;
jobMenu.GetTitle().Scale = MenuSettings.TitleScale;
jobMenu.GetTitle().Font = MenuSettings.TitleFont;
jobMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
//DinastyMenu.AddSubMenu(jobMenu, jobMenuItem);

const jobs = [
    {name: "Taxi Driver", job: "TaxiWork", desc: "Work as taxi driver"},
    {name: "Bus Driver", job: "BusWork", desc: "Work as bus driver"},
    {name: "Truck Driver", job: "TruckWork", desc: "Work as bus driver"},
    {name: "Tow Truck Driver", job: "TowJob", desc: "Work as tow truck driver"},
    {name: "Firefighter", job: "FiremanWork", desc: "Work as a Firefighter"},
    {name: "Police Officer", job: "Cops", desc: "Work as a Police Officer"},
    {name: "Postmail Courier", job: "PostJob", desc: "Work as a Postmail delivery courier"},
]

jobs.forEach((element =>{
    let joblist = new NativeUI.UIMenuItem(element.name, element.desc, jobs);
    jobMenu.AddItem(joblist);
}))

jobMenu.ItemSelect.on((item, selectedItemIndex) => {
	if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < jobs.length) {
        let work = jobs[selectedItemIndex]
        alt.emit(work.job);
        jobMenu.Close();
        DinastyMenu.Close(true);
    }
})

function buynotif(text, text1) {
    native.playSound(0, "PROPERTY_PURCHASE", "HUD_AWARDS", true, 0 ,false)
    let buyinfo = alt.everyTick(()=>{
        drawtext(text,0.5,0.25,7,1.6,1.0,200,200,0,255);
        drawtext(text1,0.5,0.35,4,0.7,0.9,255, 255, 255,255);
      })
      let info = alt.setInterval(()=>{
        alt.clearEveryTick(buyinfo);
        alt.clearInterval(info);
      }, 5000)
}


alt.onServer('propertymenuopen', ()=>{
    DinastyMenu.Open();
})

let business;
let officeped;
let officess;

alt.on('keydown', (key) => {
    if(key == 'E'.charCodeAt(0)){
        let LSMenu = getMeta('propertymenu');
        let lift = getMeta("officelift");
        let offices = getMeta('businessoffice');
        if(offices == 1) {
            native.requestIpl("ex_dt1_02_office_03b")
            native.requestModel(0x432CA064);
            native.doScreenFadeOut(1000);
            officess = native.getInteriorAtCoords(-141.1945, -620.8729, 168.8204)
            native.activateInteriorEntitySet(officess, "office_chairs")
            native.activateInteriorEntitySet(officess, "office_booze")
            native.activateInteriorEntitySet(officess, "swag_art3")
            native.activateInteriorEntitySet(officess, "swag_booze_cigs3")
            native.activateInteriorEntitySet(officess, "swag_counterfeit3")
            native.activateInteriorEntitySet(officess, "swag_ivory3")
            let goin = alt.setInterval(()=>{
                alt.emitServer('lsbusiness');
                deleteMeta('businessoffice');
                setMeta('propertymenu', 0);
                setMeta('officelift', 0);
                officeped = native.createPed(5, 0x432CA064, -138.8848876953125, -633.9928588867188, 168.82054138183594, 7.6, false, false)
   // native. taskStartScenarioInPlace(officeped, "WORLD_HUMAN_BUM_STANDING", -1, false);
                native.setPedPrimaryLookat(officeped, alt.Player.local.scriptID);
                native.setPedCanUseAutoConversationLookat(officeped, true);
                native.setModelAsNoLongerNeeded(0x432CA064)
                alt.clearInterval(goin)
            }, 2000);  
        } else {}
        if(LSMenu == 1) {
            //setMeta('propertymenu', 0);
            if(DinastyMenu.Visible) return;
            else
            DinastyMenu.Open()
            native.playPedAmbientSpeechNative(officeped, "GENERIC_HI", "SPEECH_PARAMS_STANDARD",0 )
        } else if(LSMenu == 2) {
            buyhouseMenu.Open();
        } else if(LSMenu == 3) {
            buygarageMenu.Open();
        } else {}
        if(lift == 1) {
            alt.clearEveryTick(business);
            deleteMeta("officelift");
            native.doScreenFadeOut(1000);
            let out = alt.setInterval(()=>{
                alt.emitServer('outbusinessoffice');
                native.deleteEntity(officeped);
                native.deactivateInteriorEntitySet(officess, "office_chairs")
                native.deactivateInteriorEntitySet(officess, "office_booze")
                native.deactivateInteriorEntitySet(officess, "swag_art3")
                native.deactivateInteriorEntitySet(officess, "swag_booze_cigs3")
                native.deactivateInteriorEntitySet(officess, "swag_counterfeit3")
                native.deactivateInteriorEntitySet(officess, "swag_ivory3")
                native.removeIpl("ex_dt1_02_office_03b")
                native.doScreenFadeIn(3000);
                alt.clearInterval(out);
            }, 2000);
        } else {}
    }
});

alt.onServer('lsbusinessinterior', (h)=>{
    let goin = alt.setInterval(()=>{
        native.doScreenFadeIn(3000)
        native.setEntityHeading(alt.Player.local, h)
        alt.emit('disableweapon', true);
        alt.clearInterval(goin);
        officeinterior();
    }, 1000)
})

alt.on('interiormenu', stylemenu)

const office = [
    {name: "propertymenu", text: "~INPUT_PICKUP~ Business menu", x: -138.91802978515625, y: -631.3450927734375, z: 168.86036682128906},
    {name: "officelift",text: "~INPUT_PICKUP~ Exit",x:-141.3997,y:-620.9006,z:168.8204},
]

function officeinterior() {
    
    for(let i in office) {
        business = alt.everyTick(()=>{
            let pos = alt.Player.local.pos;
            let off = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, office[i].x, office[i].y, office[i].z, true);
            native.drawMarker(1, office[i].x, office[i].y, office[i].z-1, 0,0,0,0,0,0, 0.8,0.8,0.5, 0,80,120,80,0,0,0,0,0,0,0)
            if(off <= 1) {
                let Menu = getMeta(office[i].name);
                if(Menu == 0) {
                    setMeta(office[i].name, 1)
                    handletext(office[i].text)
                }
            } else {
                if(hasMeta(office[i].name)) {
                    setMeta(office[i].name, 0)
                } else {} 
            }
        })
    }
}


function stylemenu(data) {
    let currentfloor = data.floor
    let currentcolor = data.color
    let choosenfloor = data.floor
    let choosencolor
    
    const stymenu = new NativeUI.Menu("", 'CUSTOMIZATION', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
    stymenu.Visible = false;
    stymenu.CloseableByUser = false;
    let style = new NativeUI.Menu("", 'HANGAR STYLES', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
    stymenu.AddSubMenu(style, new NativeUI.UIMenuItem('Hangar Styles', "Change Interior Style", ""))
    //let light = new NativeUI.UIMenuAutoListItem('Lighting :', 'Change interior light style', 1,2,1, "")

    let floor = new NativeUI.Menu("", 'FLOOR GRAPHIC STYLES', MenuSettings.Point, "shopui_title_sm_hangar", "shopui_title_sm_hangar")
    stymenu.AddSubMenu(floor, new NativeUI.UIMenuItem('Floor Graphics', 'Change floor graphic style', ""))
    stymenu.AddItem(new NativeUI.UIMenuItem('Close', "", ""))
    stymenu.Open()

    stymenu.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && item.Text == "Close") {
            stymenu.Close(true);
            if(choosencolor == currentcolor && choosenfloor == currentfloor) {} else {
                native.doScreenFadeOut(1000)
                let off = alt.setInterval(()=>{
                    alt.clearInterval(off)
                    native.removeIpl("sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_")
                    for(let i in data.interiorsProps) {
                        native.deactivateInteriorEntitySet(data.interior, data.interiorsProps[i])
                    }
                    native.deactivateInteriorEntitySet(data.interior, choosenfloor)
                    native.setEntityCoords(alt.Player.local.scriptID, -1921.76,  3131.297, 32.81, 0,0,0,1);
    
                   native.requestIpl("sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_")
                }, 2000)
                      
                let set = alt.setInterval(()=>{
                    alt.clearInterval(set);
                    for(let i in data.interiorsProps) {
                        native.activateInteriorEntitySet(data.interior, data.interiorsProps[i])
                        native.setInteriorEntitySetTintIndex(data.interior, data.interiorsProps[i], currentcolor)
                    }
                    native.activateInteriorEntitySet(data.interior, currentfloor)
                    native.setInteriorEntitySetTintIndex(data.interior, currentfloor, currentcolor)
                    native.setEntityCoords(alt.Player.local.scriptID, -1243.52, -2996.07, -42.88, 0,0,0,1)
    
                    native.doScreenFadeIn(3000)
                }, 3000)
            }
        }
    })

    data.style.forEach(element =>{
        let styleitem = new NativeUI.UIMenuItem(element.name, "Press 'Enter' once more to purchase", data.style);
        let flooritem = new NativeUI.UIMenuItem(element.name, "", data.style);
        styleitem.RightLabel = '$ '+element.price
        flooritem.RightLabel = '$ '+element.price2
        style.AddItem(styleitem);
        floor.AddItem(flooritem)
    })
    
    style.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < data.style.length) {
            let hstyle = data.style[selectedItemIndex];
            if(hstyle.value == data.color) {} else {
                if(hstyle.value == choosencolor) {
                    alt.emit('savehangarstyle', choosencolor, currentfloor)
                    alt.emit('buy', hstyle.price)
                    currentcolor = hstyle.value
                } else {
                    choosencolor = hstyle.value
                    native.doScreenFadeOut(1000)
                    let off = alt.setInterval(()=>{
                        alt.clearInterval(off)
                        native.removeIpl("sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_")
                        for(let i in data.interiorsProps) {
                            native.deactivateInteriorEntitySet(data.interior, data.interiorsProps[i])
                        }
                        native.deactivateInteriorEntitySet(data.interior, choosenfloor)
                        native.setEntityCoords(alt.Player.local.scriptID, -1921.76,  3131.297, 32.81, 0,0,0,1);
        
                       native.requestIpl("sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_")
                    }, 2000)
                          
                    let set = alt.setInterval(()=>{
                        alt.clearInterval(set);
                        for(let i in data.interiorsProps) {
                            native.activateInteriorEntitySet(data.interior, data.interiorsProps[i])
                            native.setInteriorEntitySetTintIndex(data.interior, data.interiorsProps[i], choosencolor)
                        }
                        native.activateInteriorEntitySet(data.interior, choosenfloor)
                        native.setInteriorEntitySetTintIndex(data.interior, choosenfloor, choosencolor)
                        native.setEntityCoords(alt.Player.local.scriptID, -1243.52, -2996.07, -42.88, 0,0,0,1)
        
                        native.doScreenFadeIn(3000)
                    }, 3000)
                }
            }  
        }
    })

    floor.ItemSelect.on((item, selectedItemIndex) => {
        if (item instanceof NativeUI.UIMenuItem && selectedItemIndex < data.style.length) {
            let hstyle = data.style[selectedItemIndex];
            let hfloor = hstyle.value
            let floord = 'set_floor_decal_'+hfloor
            if(floord == data.floor) {} else {
                if(floord == choosenfloor) {
                    alt.emit('savehangarstyle', choosencolor, choosenfloor)
                    alt.emit('buy', hstyle.price2)
                    currentfloor = floord;
                } else {
                    native.doScreenFadeOut(1000)
                    let off = alt.setInterval(()=>{
                        alt.clearInterval(off)
                        native.removeIpl("sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_")
                        for(let i in data.interiorsProps) {
                            native.deactivateInteriorEntitySet(data.interior, data.interiorsProps[i])
                        }
                        native.setEntityCoords(alt.Player.local.scriptID, -1921.76,  3131.297, 32.81, 0,0,0,1);
                        native.deactivateInteriorEntitySet(data.interior, choosenfloor)
                        
                       native.requestIpl("sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_")
                    }, 2000)
                          
                    let set = alt.setInterval(()=>{
                        alt.clearInterval(set);
                        for(let i in data.interiorsProps) {
                            native.activateInteriorEntitySet(data.interior, data.interiorsProps[i])
                            native.setInteriorEntitySetTintIndex(data.interior, data.interiorsProps[i], choosencolor)
                        }
                        native.activateInteriorEntitySet(data.interior, floord)
                        native.setInteriorEntitySetTintIndex(data.interior, floord, choosencolor)
                        choosenfloor = floord;
                        native.setEntityCoords(alt.Player.local.scriptID, -1243.52, -2996.07, -42.88, 0,0,0,1)
                        native.doScreenFadeIn(3000)
                    }, 3000)
                }
            }
            
        }
    })

}
        



function handletext(text) {
	native.beginTextCommandDisplayHelp("STRING");
	native.addTextComponentSubstringKeyboardDisplay(text);
	native.endTextCommandDisplayHelp(0, 0, true, -1);
};

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
  
  function getRandomListEntry(list) {
    return randomNumber(0, list.length - 1);
}

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