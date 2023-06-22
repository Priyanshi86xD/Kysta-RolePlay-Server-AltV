import * as alt from 'alt-client';
import { getMeta, hasMeta, setMeta } from 'alt-client';
import * as native from 'natives';
import { addmissionped, drawtext, handletext, peds, removemissionped } from './client.js';

const buss = [
    'airbus', 'bus', 'coach'
]

const rute1 = [
{ name: "45 Downtown LS - LSIA", x: 459.619934, y: -625.900146, z: 28.496048, h: 32.84034, car: "bus"}, 
{ name: "driver pos", x: 454.8065, y: -604.5531, z: 27.5426},
{ name: "The Angels", x: 368.4266, y: -843.5923, z: 29.24728}, 
{ name: "F.I.B.", x: 117.431, y: -786.8615, z: 31.34639}, 
{ name: "Total Bankers", x: -589.3466, y: -650.1614, z: 32.3533554}, 
{ name: "Life Invaders", x: -1025.79541, y: -294.703, z: 37.806076}, 
{ name: "Life Invaders", x: -960.025634765625,y: -242.6498565673828,z: 38.11811828613281}, 
{ name: "Valdez", x: -695.4407, y: -666.4318, z: 30.7929039}, 
{ name: "Total Bankers", x: -601.1035, y: -667.3345, z: 31.8618946}, 
{ name: "Snr. Buns", x: -507.173431, y: -666.871, z: 33.06496}, 
{ name: "F.I.B.", x: 118.2216, y: -809.9167, z: 31.28562}, 
{ name: "The Angels", x: 358.517, y: -865.4677, z: 29.2599945}, 
{ name: "Ten Cent", x: 409.067352, y: -716.8123, z: 29.2058716},
{ name: "KRAPEA", x: 308.986542, y: -764.5427, z: 29.2762642}, 
{ name: "Legion Square", x: 246.435181, y: -939.530334,z: 29.2637}, 
{ name: "Strawberry", x: 206.004578, y: -1209.05347, z: 29.1812553}, 
{ name: "Strawberry Ave", x: -105.806969, y: -1686.104, z: 29.2484436}, 
{ name: "Maze Bank Arena", x: -337.8374, y: -1815.35, z: 22.6785}, 
{ name: "New Empire Way", x: -1008.36676, y: -2472.36865, z: 13.7148781}, 
{ name: "L.S.I.A.", x: -1043.51257, y: -2717.055, z: 13.7227144}, 
{ name: "Maze Bank Arena", x: -299.390472, y: -1842.98364, z: 25.5925026}, 
{ name: "Dollar Pills", x: 49.1038055, y: -1536.545, z: 29.225462}, 
{ name: "Strawberry", x: 230.8047, y: -1198.669, z: 29.25237}, 
{ name: "Legion Square", x: 278.469543, y: -914.7581, z: 28.9543018}, 
{ name: "Dashound Terminal", x:436.66717529296875,  y: -581.40234375,    z: 28.49601936340332}, 
]

const rute2 = [
{name: "2 Morningwood - Strawberry", x:  -2100.226,    y: -294.5152,    z: 12.04246, h: 83.62329, car: "bus"},
{name: "driver pos", x: -2105.812, y:-290.2305, z:12.34366},
{name: "Pacific Bluffs", x:  -2118.577,        y: -242.0919,        z: 16.28992,}, 
{name: "West Eclipse Blvd", x:  -1781.583,        y: -347.9015,        z: 43.90365,}, 
{name: "Morningwood", x:  -1493.678,y: -138.0393,z: 51.14235,}, 
{name: "Richman", x:  -1425.884,        y: 99.08794,        z: 51.06408,}, 
{name: "Golfing Society", x:  -1173.484,        y: 236.6182,        z: 66.24044,      }, 
{name: "Rockford Hills", x:  -893.0755,        y: 220.315,        z: 70.55923,      }, 
{name: "Bean Machine", x:  -606.5723,        y: 253.89,        z: 80.83887,      }, 
{name: "Last Train", x:  -360.7298,        y: 233.2141,        z: 83.84611,      }, 
{name: "Eclipse Lounge", x:  -73.72643,        y: 249.1554,        z: 100.6609,      }, 
{name: "Bishop's WTF?!", x:  94.12977,        y: 225.0491,        z: 107.1623,      }, 
{name: "Fred's Store",               x:  336.1375,        y: 86.62547,        z: 97.43279,      }, 
{name: "Oeuvre Gallery", x:  237.5351,        y: -185.3281,        z: 54.22637,      }, 
{name: "Alta",   x:  155.5745,        y: -387.5703,        z: 40.8651,      }, 
{name: "Union Depository",       x:  62.4734,        y: -655.8286,        z: 43.24709,      }, 
{name: "Pillbox Hill", x:  27.25665,        y: -976.405,        z: 28.48904,      }, 
{name: "Fleeca", x:  169.7173,        y: -1032.493,        z: 28.24923,      }, 
{name: "Strawberry", x:  258.416,        y: -1186.373,        z: 28.5683,      }, 
{name: "Legion Square", x:  158.6217,        y: -1012.148,        z: 28.59506,      }, 
{name: "Pillbox Hill",       x:  53.96042,        y: -969.2219,        z: 28.23998,      }, 
{name: "IAA",  x:  93.49443,        y: -640.0625,        z: 43.36444,      }, 
{name: "Alta", x:  166.4228,        y: -420.0025,        z: 40.02781,}, 
{name: "Hawaiian Snow",               x:  254.5531,        y: -172.133,        z: 57.80966,      }, 
{name: "Tsunami",        x:  352.7516,        y: 98.22732,        z: 100.207,      }, 
{name: "Vinewood Tours", x:  101.8719,        y: 242.7773,        z: 107.1695,      }, 
{name: "West Vinewood", x:  -117.7914,        y: 262.7354,        z: 95.814,      }, 
{name: "Last Train", x:  -376.7365,        y: 249.0888,        z: 82.93843,      }, 
{name: "DM Pets",               x:  -602.146,        y: 270.1845,        z: 80.78618,      },     
{name: "Rockford Hills", x:  -885.7856,        y: 240.759,        z: 70.79357,      }, 
{name: "Golfing Society",      x:  -1179.363,        y: 257.084,        z: 66.4925,      }, 
{name: "Richman",  x:  -1446.766,        y: 91.8508,        z: 51.09494,      }, 
{name: "Morningwood", x:  -1511.418,        y: -124.8285,        z: 51.24498,      }, 
{name: "West Eclipse Blvd", x:  -1772.795,        y: -326.4828,        z: 43.66462,      }, 
{name: "Pacific Bluffs",  x:  -2134.316,        y: -227.0923,        z: 16.25953,      },  
]

const rute3 = [
{name: "4 Morningwood - Strawberry", x:  -1395.602,    y: -712.3288,    z: 23.29034, h:127.0475 , car: "bus"},
{name: "driver pos", x: -1402.271, y:-712.1318, z:23.2822},
{name: "Del Perro",  x:  -1479.15369,        y: -706.383,        z: 26.0859356,      }, 
{name: "Del Perro Plaza", x:  -1537.76428,        y: -501.286316,        z: 35.5242348,      }, 
 {name: "Life Invader",  x:  -1083.02759,        y: -228.7057,        z: 37.77472,      }, 
{name: "Rockford Hills",       x:  -812.3422,        y: -87.83421,        z: 37.79166,      }, 
{name: "The Epsilon Program",  x:  -676.0127,        y: -20.7990875,        z: 38.37433,      }, 
{name: "Rockford Plaza",  x:  -169.730011,        y: -89.0782,        z: 53.32128,      }, 
{name: "Harsh Souls", x:  152.232925,        y: -204.639252,        z: 54.2550774,      }, 
{name: "Elgin Ave", x:  296.052673,        y: -440.058563,        z: 43.9056931,      }, 
{name: "F.I.B.",  x:  216.2039,        y: -665.5337,        z: 37.68147,      }, 
{name: "The Emissary", x:  119.099632,        y: -933.5733,        z: 29.7844849,      }, 
{name: "Fleeca",  x:  165.4443,        y: -1032.009,        z: 29.2831974,      }, 
{name: "Strawberry", x:  264.741,        y: -1186.81152,        z: 29.4885941,      }, 
{name: "Legion Square",  x:  162.190857,        y: -1013.51093,        z: 29.38446,      }, 
{name: "The Emissary", x:  145.225449,        y: -924.715942,        z: 29.9762363,      }, 
{name: "F.I.B.",  x:  227.1208,        y: -698.5797,        z: 36.05523,      }, 
{name: "Elgin Ave",  x:  311.7232,        y: -437.3932,        z: 44.2321,      }, 
{name: "Heat", x:  177.805786,        y: -190.098114,        z: 54.113,      }, 
 {name: "Rockford Plaza",  x:  -190.490952,        y: -57.9844627,        z: 51.45277,      }, 
{name: "Serenity Wellness", x:  -501.61438,        y: 19.64174,        z: 44.7772522,      }, 
{name: "The Epsilon Program", x:  -691.0897,        y: -7.32540846,        z: 38.2285919,      }, 
{name: "Rockford Hills", x:  -924.8379,        y: -125.795441,        z: 37.62492,      }, 
{name: "Life Invader",  x:  -1111.98047,        y: -219.63649,        z: 37.67746,      }, 
{name: "Del Perro Plaza", x:  -1523.289,        y: -466.0318,        z: 35.34231,      }, 
{name: "Del Perro", x:  -1497.44946,        y: -718.9373,        z: 26.5716972,      }, 
]

const rute4 = [
{name: "233 Vinewood Hills - LSIA", x:-1644.492, y: 1031.164, z: 152.1245, h: 161.3048, car: "airbus" },
{name: "driver pos", x: -1650.094, y: 1027.97, z: 152.3386},
{name: "North Rockford Dr", x: -1663.5957, y: 963.09375, z: 151.916122}, 
{name: "1019 North Rockford Dr", x: -1918.53125, y: 680.8367, z: 126.220566}, 
{name: "1008 North Rockford Dr", x: -1962.05994, y: 300.488281, z: 88.35592}, 
{name: "Kortz Center", x: -1776.9856, y: 57.9682465, z: 68.37238}, 
{name: "Las Cuadras", x: -1474.345, y: -300.2319, z: 46.76184}, 
{name: "City Hall", x: -1271.72278, y: -555.1969, z: 30.2497845}, 
{name: "L.S.P.D.",x: -1050.62671, y: -801.4894, z: 18.5569572}, 
{name: "The Viceroy Hotel", x: -764.288147, y: -1149.67358, z: 10.5642862}, 
{name: "New Empire Way", x: -1005.83783, y: -2466.95264, z: 13.6990919}, 
{name: "L.S.I.A.", x: -1041.46021, y: -2717.97729, z: 13.6953526}, 
{name: "BSC", x: -745.697937, y: -1137.91052, z: 10.5738268}, 
{name: "Celltowa", x: -1034.78528, y: -786.0911, z: 18.0742474}, 
{name: "City Hall", x: -1249.63953, y: -548.277, z: 29.7046375}, 
{name: "Chido!", x: -1506.72925, y: -229.563583, z: 51.07272}, 
{name: "North Rockford Dr", x: -1700.18762, y: 17.8233986, z: 65.36969}, 
{name: "1008 North Rockford Dr", x: -1947.70886, y: 269.9457, z: 85.90755}, 
{name: "1019 North Rockford Dr", x: -1901.75012, y: 689.011169, z: 127.246643}, 
{name: "North Rockford Dr", x: -1652.57422, y: 974.2501, z: 152.331909}, 
]

const rute5 = [
    {name: "60 Vinewood - Terminal Island", x: 540.029, y: 249.4431, z: 102.0352, h:250.2209, car: "bus" }, 
    {name: "driver pos", x: 543.2759, y: 243.6389, z: 102.1165},
  {name: "Vinewood Plaza", x: 529.9369, y: 149.9746, z: 98.60076}, 
{name: "Pink Cage Motel", x: 361.326447, y: -220.882843, z: 55.3640671}, 
{name: "Elgin Ave", x: 296.529358, y: -440.590057, z: 43.90723}, 
{name: "F.I.B.", x: 216.196274, y: -666.050354, z: 37.6557274}, 
{name: "The Emissary", x: 118.3146, y: -933.3547, z: 29.75509}, 
{name: "L.S.G.C.", x: 63.05613, y: -1073.084, z: 29.36349}, 
{name: "Fern's", x: 61.49451, y: -1311.80225, z: 29.27023}, 
{name: "Central L.S. Medical Center", x: 252.403076, y: -1471.623, z: 29.217207}, 
{name: "L.S.P.D.", x: 395.466217, y: -1590.757, z: 29.2638988}, 
{name: "Roy Lowenstein Blvd", x: 227.894913, y: -1893.0481, z: 25.3391743}, 
{name: "Dutch London St", x: 264.455475, y: -2118.686, z: 16.1759834}, 
{name: "Popular St", x: 747.4452, y: -2214.57861, z: 29.3366985}, 
{name: "Jetsam Terminal", x: 745.158, y: -2967.033, z: 4.797055}, 
{name: "Popular St", x: 769.3446, y: -2315.68433, z: 26.8438358}, 
{name: "Dutch London St", x: 281.439056, y: -2107.27319, z: 16.042141}, 
{name: "Roy Lowenstein Blvd", x: 358.512146, y: -1784.18591, z: 28.9966221}, 
{name: "L.S.P.D.",x: 387.717529, y: -1556.05481, z: 29.24231}, 
{name: "Central L.S. Medical Center", x: 284.365753, y: -1465.1842, z: 29.1473141}, 
{name: "Vanilla Unicorn", x: 91.62406, y: -1320.92615, z: 29.2446384}, 
{name: "Wolfs International Beauty", x: 80.61667, y: -1090.43469, z: 29.2530422}, 
{name: "The Emissary", x: 145.298, y: -922.9254, z: 29.01797}, 
{name: "F.I.B.", x: 227.697983, y: -696.3781, z: 36.19294}, 
{name: "Elgin Ave", x: 311.790131, y: -437.9107, z: 44.2070732}, 
{name: "Pink Cage Motel", x: 388.9598, y: -204.851883, z: 58.33646}, 
{name: "Vinewood Plaza", x: 543.2368, y: 153.704758, z: 99.0059357}, 
]

const rute6 = [
{ name: "20 Del Perro - East Los Santos", x: -1958.605, y: -325.786, z: 44.37132, h: 228.9661, car: "bus" },
{name: "driver pos", x: -1956.432, y: -332.3974, z: 44.61513},
{ name: "Bay City Ave",   x: -1766.11328, y: -485.6208, z: 39.5852}, 
{ name: "Banner Hotel",   x: -1684.62976, y: -569.7247, z: 34.7421761}, 
{ name: "Perrera Beach Motel",     x: -1497.08887, y: -719.237061, z: 26.54701},
{ name: "Burger Shot",     x: -1212.22388, y: -881.953, z: 12.9588881},
{ name: "Veldez",     x: -694.035767, y: -666.5782, z: 30.8194027, },
{ name: "Total Bankers",     x: -601.2593, y: -667.2785, z: 31.85979, },
{ name: "Snr. Buns",    x: -507.9871, y: -666.4344, z: 33.0899925, },
{ name: "F.I.B.",     x: 117.3697, y: -809.2499, z: 31.30532, },
{ name: "The Angels",     x: 359.5635, y: -865.226, z: 29.2681828, },
{ name: "La Mesa",     x: 823.685, y: -858.5821, z: 43.51852, },
{ name: "El Rancho Blvd",     x: 1235.13525, y: -1312.69458, z: 34.9137726, },
{ name: "El Rancho Blvd",     x: 1420.17053, y: -1826.79443, z: 69.521904, },
{ name: "El Burro Heights",     x: 1297.15552, y: -2021.298, z: 45.28077, },
{ name: "El Rancho Blvd",     x: 1435.35132, y: -1816.90015, z: 69.15406, },
{ name: "El Rancho Blvd",     x: 1248.46289, y: -1339.182, z: 35.2725677, },
{ name: "San Andreas Ave",    x: 814.4925, y: -842.4706, z: 43.44121, },
{ name: "The Angels",     x: 368.740631, y: -843.5573, z: 29.24576, },
{ name: "F.I.B.",     x: 117.2664, y: -786.3942, z: 31.33368, },
{ name: "Total Bankers",     x: -592.345, y: -650.449, z: 32.23973,}, 
{ name: "Burger Shot",     x: -1229.40967, y: -874.189453, z: 12.7492037, },
{ name: "Perrera Beach Motel",     x: -1481.23889, y: -705.1797, z: 26.2295074, },
{ name: "Banner Hotel",     x: -1675.75073, y: -550.675842, z: 35.138443, },
{ name: "Von Crastenburg",     x: -1881.62585, y: -381.194763, z: 48.3959, },
]

const rute7 = [
{ name: "204 Vinewood - Terminal Island", x: 240.1656, y: 324.6103, z: 104.5042, h: 228.9661, car: "bus" },
{name: "driver pos", x: 234.9322, y: 321.2992, z: 104.5273},
{ name: "Designer Slave", x: 213.313934, y: 251.269119, z: 105.522423}, 
{ name: "Pop's Pills", x: 129.704529, y: 6.62729025, z: 67.96631}, 
{ name: "Alta St", x: -33.2123947, y: -420.8946, z: 39.7420578}, 
{ name: "Arcadius Business Center", x: -96.32127, y: -611.757446, z: 36.20688}, 
{ name: "Gruppe Sechs", x: -171.02301, y: -817.826538, z: 31.16323}, 
{ name: "Banner Hotel", x: -256.526, y: -1048.79822, z: 26.9780388}, 
{ name: "Larry's Lean Pork", x: -290.387726, y: -1318.087, z: 31.1510029}, 
{ name: "Davis Mega Mall", x: 117.105171, y: -1743.43164, z: 28.9277382}, 
{ name: "Davis Electricals", x: 439.652863, y: -2027.96558, z: 23.4690533}, 
{ name: "Popular St", x: 747.336243, y: -2213.35718, z: 29.33654}, 
{ name: "Jetsam Terminal", x: 744.74, y: -2968.03223, z: 5.797706}, 
{ name: "Popular St", x: 774.22406, y: -2252.69336, z: 29.2551727}, 
{ name: "Carson Ave", x: 435.7862, y: -1991.46033, z: 23.065321}, 
{ name: "Herr Kutz Barber", x: 126.562378, y: -1716.67334, z: 29.0819817}, 
{ name: "Benny's Original Motor Works", x: -266.7794, y: -1329.767, z: 31.22876}, 
{ name: "Banner Hotel", x: -217.916321, y: -1007.07111, z: 29.2616863}, 
{ name: "Maze Bank", x: -158.254257, y: -846.7615, z: 30.273756}, 
{ name: "4 Integrity Way", x: -77.3478546, y: -623.8293, z: 36.22672}, 
{ name: "Alta St", x: -12.558857, y: -428.710541, z: 39.7417564}, 
{ name: "Pop's Pills", x: 139.201965, y: 0.409181863, z: 67.8355255}, 
{ name: "Singleton's", x: 241.122223, y: 279.845917, z: 105.502991}, 
]


let pos2 = {x: 436.2674865722656,    y: -624.4031982421875,    z: 28.708030700683594}
let buspos = {x:436.66717529296875,  y: -581.40234375,    z: 28.49601936340332, h: 264.9810791015625}

const rutes = [
    {type: -1, worktype: "~g~Select Routes", job: ""},
    {type: 0, worktype: rute1[0].name, job: ""},
    {type: 1, worktype: rute2[0].name, job: ""},
    {type: 2, worktype: rute3[0].name, job: ""},
    {type: 3, worktype: rute4[0].name, job: ""},
    {type: 4, worktype: rute5[0].name, job: ""},
    {type: 5, worktype: rute6[0].name, job: ""},
    {type: 6, worktype: rute7[0].name, job: ""},
]

const routes = [
    rute1, rute2, rute3, rute4, rute5, rute6, rute7
]

let driver, route;
let busmarker = 0, busblip, busst;

export function busjob() {

alt.emit('jobstart', "Go to ~y~Bus Station ~w~to start the job");
busblip = native.addBlipForCoord(pos2.x, pos2.y, pos2.z);
native.setBlipSprite(busblip, 513);
native.setBlipColour(busblip, 5);
setMeta('busjob', 0);
busst = alt.setInterval(()=>{
    let pos = alt.Player.local.pos;
    let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, pos2.x, pos2.y, pos2.z, true);
    if(dist <= 50) {
        //if(busmarker == 0) {
            alt.emit('marker', 1, pos2.x, pos2.y, pos2.z-1,1,1,1.3,255,255,100,80)
          //  busmarker = 1;
       // } else {}
        
    }
    if(dist <= 1) {
        let busjob = getMeta('busjob')
        if(busjob == 0) {
            //alt.clearInterval(busst)
            //alt.emitServer("busdriver");
            setMeta('busjob', 1);
            //alt.emit('marker', 1, pos2.x, pos2.y, pos2.z-1,1,1,1.3,255,255,100,0)
            handletext("~INPUT_PICKUP~ start bus driver work")
            alt.emit('jobstart', "");
            //native.removeBlip(busblip);
        }
    }
},1000)

alt.on("keydown", (key) => {
	if (key == "E".charCodeAt(0)) {
        let busjob = getMeta('busjob');
        if(busjob == 1){ 
            alt.emit('createmenu', "BUS DRIVER WORK", "busdriver", rutes)           
        }
    }
});

}


alt.on('busdriver', (type)=>{
    native.doScreenFadeOut(1000);
    route = routes[type];
    let startbus = alt.setInterval(()=>{
        native.setEntityCoords(alt.Player.local.scriptID, route[1].x, route[1].y, route[1].z, 0,0,0,1);
        alt.emitServer('createcar', route[0].car, 'BUS ', route[0].x, route[0].y, route[0].z, route[0].h, 0);
        native.doScreenFadeIn(2000);
        alt.emit('jobstart', "Drive ~y~The Bus ~w~to start the work");
        setMeta('busjob', 2);
        setMeta('activejob', "Bus Work")
        alt.clearInterval(startbus);
    }, 1000)
})

let bus;
alt.on('busjobnotif', (veh)=>{
    let busjob = getMeta('busjob');
    if(busjob == 2) {
        alt.emit('jobstart', "");
        let jobnotif = alt.everyTick(()=>{
            native.playSound(0, "Event_Start_Text", "GTAO_FM_Events_Soundset", true, 0 ,false)
            drawtext('BUS DRIVER WORK',0.5,0.22,4,2,0.9,255,255,255,255,0);
            drawtext('~y~'+route[0].name+'~y~',0.5,0.32,4,0.7,0.9,255, 255, 255,255,0);
        })
        let stop = alt.setInterval(()=>{
            alt.clearEveryTick(jobnotif);
            alt.clearInterval(stop);
        }, 5000);
        busjobstart(2)
        bus = veh;
    }
})

let passenger =[]
let pass = 0;
let seat = 1;
let mpeds =[]
let busstop;
let stops;
let earn = 0, bonus = 0;
let check = 0;
let bustop;
let busdrive, pedb;

alt.on('busped', (data)=>{
    pedb = data
})

function busjobstart(o) {
    //native.setVehicleMaxSpeed(bus, 15);
        let pos1 = route[o]
        busstop = route[o].name;
        stops = o;
        let pedmodel = peds[native.getRandomIntInRange(0, peds.length)]
        native.requestModel(pedmodel);
        alt.emit('requestped', {x:pos1.x, y:pos1.y, z:pos1.z}, 5, 'busped')
        bustop = native.addBlipForCoord(pos1.x, pos1.y, pos1.z);
        //let road = native.getPositionBySideOfRoad(pos1.x, pos1.y, pos1.z, 0, {x:pos1.x, y:pos1.y, z:pos1.z})
        native.setBlipRoute(bustop, true);
        alt.emit('timerbar', 1,["FEE : $"+earn, "BONUS : $"+bonus, 140], ["STATION", o-2+"/"+route.length-2, 140], ["NEXT STOP", busstop, 140])
    
          busdrive = alt.setInterval(()=>{
            let pos = alt.Player.local.pos;
            let dist = native.getDistanceBetweenCoords(pos.x, pos.y, pos.z, pos1.x, pos1.y, pos1.z, true);
            if(dist <= 80) {
                alt.emit('marker', 1, pos1.x, pos1.y, pos1.z-1,2,2,2,255,255,100,100)
                if(check == 0) {
                    check += 1;
                    let jarak = native.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, road[1].x, road[1].y, road[1].z, true);
                    if(jarak <= 2) {}
                    else {
                        if( o == route.length-1){ }
                        else{
                            let ped = native.createPed(5, pedmodel, pedb.x, pedb.y, pedb.z, 0, false, false );
                            mpeds.push(ped)
                            addmissionped(ped);
                            native.setModelAsNoLongerNeeded(pedmodel);
                            native.taskStartScenarioInPlace(ped, "WORLD_HUMAN_STAND_IMPATIENT", 0, false)
                            native.taskLookAtCoord(ped, pos1.x, pos1.y, pos1.z, 5000, 1, 1);
                        }
                     } 
                }    
            }

            if(dist <= 4 ) {
                alt.clearInterval(busdrive);
                alt.emit('marker', 1, 0,0,0,4,4,2,0,0,0,0)
                alt.emitServer('jobfinish', 0, 5);
                native.removeBlip(bustop);
                native.clearAllBlipRoutes();
                check = 0;

                if(passenger.length >= 1) {
                    native.taskLeaveVehicle(passenger[pass], bus, 0.256);
                    native.taskWanderStandard(passenger[pass], 10.0, 10);
                    
                    //seat -= 1;
                }
                let pedin = alt.setInterval(()=>{
                    if(mpeds.length > 0) {
                        native.taskEnterVehicle(mpeds[0], bus, 15000, seat, 1.5, 1, 0);
                        seat += 1;
                        if(seat == 5) {
                            seat = 4;
                        }
                        earn += 5;
                        passenger.push(mpeds[0]);
                        pass = passenger.length - 1
                        let peds = []
                        mpeds = peds;
                    }
                    alt.clearInterval(pedin);
                }, 2000);
                
                //alt.emit('timerbar', ["FEE : $"+earn, "BONUS : $"+bonus, 140], ["STATION", o-2+"/"+route.length-2, 140], ["NEXT STOP", busstop, 140])
                if(o == route.length - 1) {
                    bonus = 5000;
                    native.playSound(0, "package_delivered_success", "DLC_GR_Generic_Mission_Sounds", true, 0 ,false)
                    busjobfinish();
                    let jobnotif = alt.everyTick(()=>{
                        drawtext('BUS DRIVER WORK COMPLETE',0.5,0.22,4,1.8,0.9,255,255,255,255,0);
                        drawtext('You Complete The Job! Earned : $ '+earn+" Bonus : $"+bonus,0.5,0.32,4,0.7,0.9,255, 255, 255,255,0);
                    })
                    let stop = alt.setInterval(()=>{
                        alt.clearEveryTick(jobnotif);
                        alt.clearInterval(stop);
                        alt.emitServer("jobfinish", earn+bonus, (earn/5)*5);
                        
                        handletext("Get back to bus station to do another work")
                    }, 6000);
                    
                } else {
                    if(o > ((route.length-2)/2)) {
                        bonus = 3000;
                    } else {
                        bonus = 1000;
                    }
                    
                    busjobstart(o+1);
                } 
            }
        }, 500);
}

alt.on("Bus Work", ()=>{
    if(check > 0) {
        check = 0;
        if(busdrive > 0) {
            alt.clearInterval(busdrive);
            native.removeBlip(bustop);
            native.clearAllBlipRoutes();
        }
        //alt.emit('marker', 1, 0,0,0,4,4,2,0,0,0,0)
        native.playSound(0, "OOB_Cancel", "GTAO_FM_Events_Soundset", true, 0 ,false)
        let jobnotif = alt.everyTick(()=>{
            drawtext('WORK CANCELLED',0.5,0.22,4,1.8,0.9,255,255,255,255,0);
            drawtext('You Quit The Job! Earned : $'+earn+" Bonus : "+bonus,0.5,0.32,4,0.7,0.9,255, 255, 255,255,0);
        })
        let stop = alt.setInterval(()=>{
            alt.clearEveryTick(jobnotif);
            alt.clearInterval(stop);
            
            alt.emitServer("jobfinish", earn+bonus, 10);
        }, 6000);
        busjobfinish();
        setMeta('fixjob', 0);
        alt.clearInterval(busst);
        native.removeBlip(busblip);
    }
})

function busjobfinish() {
    native.taskLeaveVehicle(alt.Player.local.scriptID, bus, 0);
                alt.emit('timerbar', 0,["", "", 0], ["", "", 0], ["", "", 0])
                alt.emit('marker', 1, 0,0,0,3,3,1.5,255,255,100,0)
                //alt.emitServer("busdriverstop", driver);
                    //native.setVehicleMaxSpeed(bus, 15);
                    let bustime = alt.setInterval(()=>{
                        setMeta('busjob', 0);
                        let passe = []
                        passenger = passe;
                        earn = 0
                        seat = 1
                        pass = 0
                        alt.clearInterval(bustime);
                        removemissionped()
                    }, 5000);
                    alt.clearInterval(stop);
                
}
