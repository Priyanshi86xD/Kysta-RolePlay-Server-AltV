
export const maleofficer = [
{name: "Current", outfit:[], helm:0, prop:[], weapon:"Guard"},
{name: "The Cop", outfit : [
{ id : 1, drawable : 0, texture : 0},{ id : 3, drawable : 0, texture : 0},{ id : 4, drawable : 35, texture : 0},
{ id : 5, drawable : 0, texture : 0},{ id : 6, drawable : 25, texture : 0},{ id : 7, drawable : 0, texture : 0},
{ id : 8, drawable : 58, texture : 0},{ id : 9, drawable : 0, texture : 0},{ id : 10, drawable : 8, texture : 0},
{ id : 11, drawable : 55, texture : 0},], helm: 0, prop: [{id : 0, drawable: 8, texture: 0}], weapon:"Patrol"},

{ name: "IAA Response", outfit : [
{ id : 1, drawable : 0, texture : 0}, { id : 3, drawable : 0, texture : 0}, { id : 4, drawable : 47, texture : 0}, 
{ id : 5, drawable : 0, texture : 0}, { id : 6, drawable : 25, texture : 0}, { id : 7, drawable : 125, texture : 0}, 
{ id : 8, drawable : 122, texture : 0}, { id : 9, drawable : 0, texture : 0},  { id : 10, drawable : 0, texture : 0}, 
{ id : 11, drawable : 242, texture : 0}, ], helm: 0, prop: [{id : 0, drawable: 8, texture: 0}], weapon:"Patrol"},

{ name: "FIB Agent", outfit : [
{ id : 1, drawable : 121, texture : 0}, { id : 3, drawable : 4, texture : 0}, { id : 4, drawable : 25, texture : 0}, 
{ id : 5, drawable : 0, texture : 0}, { id : 6, drawable : 21, texture : 0},  { id : 7, drawable : 115, texture : 0},  
{ id : 8, drawable : 31, texture : 0},  { id : 9, drawable : 53, texture : 0},  { id : 10, drawable : 0, texture : 0}, 
{ id : 11, drawable : 28, texture : 0},  ], helm: 0, prop: [{id : 0, drawable: 8, texture: 0}], weapon:"SWAT"},

{ name: "NOOSE", outfit : [
{ id: 1, drawable: 52, texture: 0}, { id: 3, drawable: 17, texture: 0}, { id: 4, drawable: 121, texture: 0}, 
{ id: 5, drawable: 0, texture: 0}, { id: 6, drawable: 24, texture: 0},{ id: 7, drawable: 0, texture: 0}, 
{ id: 8, drawable: 15, texture: 0}, { id: 9, drawable: 0, texture: 0}, { id: 10, drawable: 70, texture: 0}, 
{ id: 11, drawable: 320, texture: 0},], helm: 1, prop: [{id : 0, drawable: 141, texture: 0}], weapon:"SWAT"},
]


export const femaleofficer = [
{name: "Current", outfit:[], helm:0, prop:[]},
{name: "The Cop", outfit : [
{ id : 1, drawable : 0, texture : 0}, { id : 3, drawable : 14, texture : 0}, { id : 4, drawable : 34, texture : 0}, 
{ id : 5, drawable : 0, texture : 0}, { id : 6, drawable : 25, texture : 0}, { id : 7, drawable : 0, texture : 0}, 
{ id : 8, drawable : 35, texture : 0}, { id : 9, drawable : 0, texture : 0}, { id : 10, drawable : 7, texture : 0}, 
{ id : 11, drawable : 48, texture : 0}, ], helm: 0, prop: [{id : 0, drawable: 8, texture: 0}]},

{ name: "IAA Response", outfit : [
{ id : 1, drawable : 0, texture : 0}, { id : 3, drawable : 14, texture : 0}, { id : 4, drawable : 49, texture : 0}, 
{ id : 5, drawable : 0, texture : 0}, { id : 6, drawable : 25, texture : 0}, { id : 7, drawable : 95, texture : 0}, 
{ id : 8, drawable : 152, texture : 0}, { id : 9, drawable : 0, texture : 0},  { id : 10, drawable : 0, texture : 0}, 
{ id : 11, drawable : 250, texture : 0}, ], helm: 0, prop: [{id : 0, drawable: 8, texture: 0}]},

{ name: "FIB Agent", outfit : [
{ id : 3, drawable : 1, texture : 0}, { id : 4, drawable : 8, texture : 0},  { id : 5, drawable : 0, texture : 0}, 
{ id : 6, drawable : 0, texture : 0},  { id : 7, drawable : 0, texture : 0},  { id : 8, drawable : 151, texture : 0},  
{ id : 9, drawable : 54, texture : 0},  { id : 10, drawable : 0, texture : 0}, 
{ id : 11, drawable : 137, texture : 6}, ], helm: 0, prop: [{id : 0, drawable: 8, texture: 0}]},

{ name: "NOOSE", outfit : [
{ id : 1, drawable : 52, texture : 0, }, { id : 3, drawable : 18, texture : 0, },  { id : 4, drawable : 127, texture : 0, }, 
{ id : 5, drawable : 0, texture : 0, }, { id : 6, drawable : 24, texture : 0, },  { id : 7, drawable : 0, texture : 0, }, 
{ id : 8, drawable : 14, texture : 0, }, { id : 9, drawable : 0, texture : 0, },  { id : 10, drawable : 79, texture : 0, },  
{ id : 11, drawable : 331, texture : 0, }, ], helm: 1, prop: [{id : 0, drawable: 140, texture: 0}] },
]

export const inventory = [
{ name: "Guard", weapon: ["WEAPON_NIGHTSTICK", "WEAPON_PISTOL", "WEAPON_STUNGUN"], component: []},
{ name: "Patrol", weapon: ["WEAPON_PUMPSHOTGUN", "WEAPON_COMBATPISTOL", "WEAPON_PISTOL", "WEAPON_STUNGUN"], component: [] },
{ name: "SWAT", weapon: ["WEAPON_CARBINERIFLE", "WEAPON_PUMPSHOTGUN", "WEAPON_COMBATPISTOL", "WEAPON_STUNGUN" ], 
component: ["COMPONENT_AT_AR_FLSH", "COMPONENT_AT_AR_AFGRIP", "COMPONENT_AT_SCOPE_MEDIUM",
"COMPONENT_AT_AR_FLSH", "COMPONENT_AT_PI_FLSH",] }

]