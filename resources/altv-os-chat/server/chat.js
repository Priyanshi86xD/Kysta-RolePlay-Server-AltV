
import alt from 'alt-server';

alt.onClient('chat:SetVisibleMeta', setVisibleMeta);
alt.onClient('chat:NewMessage', chatNewMessage);
alt.onClient('chat:Typing', setTypingMeta);
alt.on('chat:Init', chatInit);
alt.on('chat:Message', chatMessage);
alt.on('chat:Broadcast', chatBroadcast);

/**
 * Sets the visibility state of the chat in the player's meta
 *
 * @param {alt.Player} player
 * @param {boolean} state
 */
function setVisibleMeta(player, state) {
    player.setSyncedMeta('CHAT_VISIBLE', state);
}

/**
 * On recieve a new message from the player
 *
 * @param {alt.Player} player
 * @param {string} message
 */
function chatNewMessage(player, message) {
    player.setSyncedMeta('CHATTING', false);
    alt.emit('chat:NewMessage', player, message);
}

/**
 * Set's the player's chatting state
 *
 * @param {alt.Player} player
 * @param {boolean} state
 */
function setTypingMeta(player, state) {
    player.setSyncedMeta('CHATTING', state);
}

/**
 * Used to initialize the chat for a player
 *
 * @param {alt.Player} player
 * @param {number} key
 */
function chatInit(player, key = 84) {
    alt.emitClient(player, 'chat:Init', key);
}

/**
 * Sends a message to a player or to an array of players
 *
 * @param {alt.Player | Array.<alt.Player>} recipient
 * @param {string} message
 */
function chatMessage(recipient, message) {
    if (Array.isArray(recipient)) {
        for (const player of recipient) {
            sendMessageToPlayer(player, message);
        }
    } else {
        sendMessageToPlayer(recipient, message);
    }
}

/**
 * Broadcasts a message to all players
 *
 * @param {string} message
 */
function chatBroadcast(message) {
    alt.emitClient(null, 'chat:Message', message);
}

/**
 * Sends a message to a player
 *
 * @param {alt.Player} player
 * @param {string} message
 */
function sendMessageToPlayer(player, message) {
    if (!player.valid) return;

    alt.emitClient(player, 'chat:Message', message);
}
