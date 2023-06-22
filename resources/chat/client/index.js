import * as alt from "alt-client";
import { setMeta } from "alt-shared";

let buffer = [];

let loaded = false;
let opened = false;

alt.on('chatload', chat)


function chat() {
const view = new alt.WebView("http://resource/client/html/index.html");

view.on("chatloaded", () => {
  for (const msg of buffer) {
    addMessage(msg.name, msg.text);
  }

  loaded = true;
});

view.on("chatmessage", (text) => {
  alt.emitServer("chat:message", text);
  opened = false;
  alt.toggleGameControls(true);
  setMeta('chat', 0)
  view.unfocus();
});


alt.onServer("chat:message", pushMessage);

alt.on("keyup", (key) => {
  if (loaded) {
    if (!opened && key === 0x54 && alt.gameControlsEnabled()) {
      opened = true;
      view.emit("openChat", false);
      alt.toggleGameControls(false);
      view.focus();
      setMeta('chat', 1)
    } else if (!opened && key === 0xbf && alt.gameControlsEnabled()) {
      opened = true;
      view.emit("openChat", true);
      alt.toggleGameControls(false);
      view.focus();
      setMeta('chat', 1)
    } else if (opened && key == 0x1b) {
      opened = false;
      view.emit("closeChat");
      alt.toggleGameControls(true);
      view.unfocus();
      setMeta('chat', 0)
    }
  }
});

pushLine("{80eb34}Press {34dfeb}M {80eb34}to open {34dfeb}Player Menu");
function addMessage(name, text) {
  if (name) {
    view.emit("addMessage", name, text);
  } else {
    view.emit("addString", text);
  }
}

function pushMessage(name, text) {
  if (!loaded) {
    buffer.push({ name, text });
  } else {
    addMessage(name, text);
  }
}

function pushLine(text) {
  pushMessage(null, text);
}

}

