# Websocket.io

Basic workflow:

- **socket.emit** - sends event to specific client
- **io.emit** - sends event to every connected client
- **socket.broadcast.emit** - sends event to every client except for the current one

below are variations to the above:

- **io.to.emit** - will send to every connected client, but only for specific room
- **socket.broadcast.to.emit** - sends event to every client except for the current, but clients are also only for specific room
