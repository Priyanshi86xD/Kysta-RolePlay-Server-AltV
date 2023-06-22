import alt from 'alt-server';


alt.onClient("Give:Weapon", (player, weapId) => {
  player.giveWeapon(weapId, 999, true);
});

alt.onClient("Buy:WeaponComp", (player, weapId, compId) => {
    player.addWeaponComponent(weapId, compId);
    alt.emitClient(player, 'saveweaponmod', weapId, compId);

});

alt.onClient("Give:WeaponComp", (player, weapId, compId) => {
    player.addWeaponComponent(weapId, compId);

});

alt.onClient('buyweapon', (player, weapId)=>{
  alt.emitClient(player, 'saveweapon', weapId);
  alt.log(player.name+' weapon buy '+weapId )
})

alt.onClient("removeComp", (player, weapId, compId) => {
    player.removeWeaponComponent(weapId, compId);
    
});

alt.onClient('setweaponcolor', (player, weapId, color)=>{
  player.setWeaponTintIndex(weapId, color);
})
alt.onClient("Give:Armor", (player) => {
    const currentMaxArmour = player.armour;
    if (currentMaxArmour <= 100) {
      player.maxArmour = 100;
      player.armour = 100;
    }
});
