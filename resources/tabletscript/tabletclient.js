import * as alt from 'alt';
let tablet = 34;

alt.on('keydown', (key) => {
    if (key == 36) {
        if (tablet == null) {
            alt.showCursor(true);
            alt.toggleGameControls(false);
            tablet = new alt.WebView("http://resource/tablethtml/tablet.html");
            tablet.focus();
        } else {            
            alt.showCursor(false);
            alt.toggleGameControls(true);
            tablet.unfocus();
            tablet.destroy();
            tablet = 34;
        }
    }
});