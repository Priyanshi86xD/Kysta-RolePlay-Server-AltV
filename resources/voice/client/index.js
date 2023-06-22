"use strict";
import * as alt from "alt-client";
import * as native from "natives";

alt.on("keyup", (keycode) => {
  switch (keycode) {
    case 112: // Key: F1
      alt.emitServer("voice:rangeChanged");
      break;
  }
});
