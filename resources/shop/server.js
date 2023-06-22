import alt, { setSyncedMeta } from 'alt-server';

alt.onClient('robbed', (player, cashId, cash, stat, pos) =>{
    let meta = 'cas'+cashId;
    alt.emitClient(player, 'rppoint', 10)
    alt.emitClient(player, 'gotmoney', cash);
    setSyncedMeta(meta, stat);
    let metaint = alt.setInterval(()=>{
        setSyncedMeta(meta, 0);
        alt.clearInterval(metaint);
    }, (60000)*15)
});


alt.onClient('pom', (player)=>{
    if(player instanceof alt.Player){
      let veh = player.getMeta('lastvehicle');
        alt.emitClient(player, 'Pom:Menu', veh);

    }
  });
  
  alt.onClient('givecan', (player) =>{
    player.giveWeapon(0x34A67B97, 100, true);
  });

