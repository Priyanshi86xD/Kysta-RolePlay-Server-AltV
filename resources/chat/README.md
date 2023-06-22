# alt:V Chat

Simple chat system with user interface.

### Instalation

You can start by adding the chat resource in its own folder called 'chat'.

```
altVServerFolder/
└── resources/
    ├── chat/
    |   ├── index.mjs
    |   ├── client.mjs
    |   ├── resource.cfg
    |   └── html/
    └── your_resource/
        ├── your_resource_main.mjs
        ├── your_resource_client.mjs
        └── your_resource.cfg
```

**This is for YOUR resource that you want to implement the chat resource into.**
resource.cfg

```
type: js,
main: your_resource_main.mjs
client-main: your_resource_client.mjs
client-files: [],
deps: [
    chat
]
```

### General Usage

**Serverside**

```
import * as chat from 'chat';

// Uses the chat resource to register a command.
// Sends a chat message to the player with their position information.
chat.registerCmd('pos', (player, args) => {
    chat.send(player, `X: ${player.pos.x}, Y: ${player.pos.y}, Z: ${player.pos.z}`);

    // Sends to all players.
    chat.broadcast(`${player.name} is located at: ${player.pos.x}, Y: ${player.pos.y}, Z: ${player.pos.z}`);
});
```
