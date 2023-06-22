import * as alt from "alt-server";
import * as chat from "alt:chat";

// list of voice ranges in meter
const rangeArray = [5, 10, 20];

// index of default range
const defaultRange = 1;

let channelShort;
let channelMedium;
let channelLong;

try {
  channelShort = new alt.VoiceChannel(true, rangeArray[0]);
  channelMedium = new alt.VoiceChannel(true, rangeArray[1]);
  channelLong = new alt.VoiceChannel(true, rangeArray[2]);
} catch (err) {
  if(err.message === "Failed to create base object") {
    alt.logWarning("The alt:V voice chat is not enabled and this resource will cease to work. To enable it, specify the \"voice\" entry in the server config.");
  } else {
    throw err;
  }
}

function changeVoiceChannel(index, player) {
  channelShort.mutePlayer(player);
  channelMedium.mutePlayer(player);
  channelLong.mutePlayer(player);

  if (index == 0) channelShort.unmutePlayer(player);
  if (index == 1) channelMedium.unmutePlayer(player);
  if (index == 2) channelLong.unmutePlayer(player);

 // chat.send(player, "{80eb34}Voice Distance changed to {34dfeb}" + rangeArray[index] + "{80eb34}m.");
}

alt.on("playerConnect", (player) => {
  channelShort.addPlayer(player);
  channelMedium.addPlayer(player);
  channelLong.addPlayer(player);
  player.setMeta("voice:rangeIndex", defaultRange);
  changeVoiceChannel(defaultRange, player);
});

alt.on("playerDisconnect", (player, reason) => {
  channelShort.removePlayer(player);
  channelMedium.removePlayer(player);
  channelLong.removePlayer(player);
});

alt.onClient("voice:rangeChanged", (player, args) => {
  let index = player.getMeta("voice:rangeIndex");
  index++;

  if (index >= rangeArray.length) index = 0;

  changeVoiceChannel(index, player);
  player.setMeta("voice:rangeIndex", index);
});

// =============================== Commands Begin ==================================================

chat.registerCmd("voice", function (player, args) {
  if (args.length == 0 || args[0] == "help") {
    chat.send(player, "{ff0000}========== {eb4034}VOICE HELP{ff0000} ==========");
    chat.send(player, "{ff0000}= {34abeb}/voice help {ffffff} - Shows this help.");
    chat.send(player, '{ff0000}= {ffffff}You can change your voice distance with the Key "F1"');
    chat.send(player, "{ff0000}= {ffffff}You need to set your microphone as Default Communication Device under Windows.");
    chat.send(player, "{ff0000}= {ffffff}You can change to PushToTalk in the Mainmenu of alt:V.");
    chat.send(player, "{ff0000}= {ffffff}You need to activate the Voice Chat in GTA Settings.");
    chat.send(player, "{ff0000} ========================");
  }
});

// =============================== Commands End ====================================================
