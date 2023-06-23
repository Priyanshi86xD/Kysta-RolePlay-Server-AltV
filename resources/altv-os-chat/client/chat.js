/// <reference types="@altv/types-client" />
import alt, { WebView } from 'alt-client';

let chatVisible = true;
let chatLoaded = true;
let chatView = undefined;
let chatKey = 84;
let chatTyping = false;

alt.onServer('chat:Init', chatInit);
alt.onServer('chat:Message', chatMessage);
alt.on('chat:Toggle', chatToggle);

/**
 * Used to initialize the chat for a player
 *
 * @param {number} key
 */
function chatInit(key = 84) {
    chatKey = key;
    chatView = new alt.WebView('http://resource/client/html/index.html');

    chatView.on('chat:Ready', () => {
        chatLoaded = true;
        chatVisible = true;
    });

    chatView.on('chat:StopInput', () => {
        chatView.unfocus();
        alt.emitServer('chat:Typing', false);
        chatTyping = false;

        if (!alt.gameControlsEnabled()) {
            alt.toggleGameControls(true);
        }
    });

    chatView.on('chat:Send', message => {
        alt.emitServer('chat:NewMessage', message);
        chatTyping = false;

        if (!alt.gameControlsEnabled()) {
            alt.toggleGameControls(true);
        }
    });
}

/**
 * Appends a message to the chat
 *
 * @param {string} message
 */
function chatMessage(message) {
    if (!chatLoaded) return;

    chatView.emit('chat:Message', message);
}

/**
 * Toggles the visibility of the chat
 *
 * @param {boolean | undefined} state
 */
function chatToggle(state = null) {
    if (!chatLoaded) return;

    if (state == null) {
        chatVisible = !chatVisible;
    } else {
        chatVisible = state;
    }

    chatView.emit('chat:Visibility', chatVisible);
    alt.emitServer('chat:SetVisibleMeta', chatVisible);
}

alt.on('keydown', key => {
    if (chatLoaded && key == chatKey && !chatTyping) {
        if (alt.gameControlsEnabled()) {
            alt.toggleGameControls(false);
        }

        alt.setTimeout(() => {
            chatView.focus();
            chatView.emit('chat:Input');
        }, 100);

        alt.emitServer('chat:Typing', true);
        chatTyping = true;
    }

    if (chatLoaded && key == 33 && !chatTyping) {
        if (alt.gameControlsEnabled()) {
            chatView.emit('chat:PageUp');
        }
    }

    if (chatLoaded && key == 34 && !chatTyping) {
        if (alt.gameControlsEnabled()) {
            chatView.emit('chat:PageDown');
        }
    }
});
