class ScWebServers {
    constructor () {
        this.server = undefined
        this.lastmsg = undefined
        this.newMsgs = false
    }

    getInfo() {
        return {
            id: 'scwebserver',
            name: 'SC Web Servers',
            blocks: [
                {
                    opcode: "_connect",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "connect to server [URL]",
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "ws://localhost:3000/"
                        }
                    }
                },
                {
                    opcode: "ping",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "ping"
                },
                {
                    opcode: "latestMessage",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "get latest message"
                },
                {
                    opcode: "isNewMessages",
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: "is new messages?"
                },
                {
                    opcode: "getWorld",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "get world"
                },
                {
                    opcode: "setWorld",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "set world [WORLD]",
                    arguments: {
                        WORLD: {
                            type: Scratch.ArgumentType.ARRAY,
                            defaultValue: []
                        }
                    }
                }
            ]
        };
    }

    _connect (args) {
        this.server = new WebSocket(
            args.URL,
            "protocolOne",
        )
        this.server.onmessage = function (event) {
            this.lastmsg = event.data
            this.newMsgs = true
        }
    }

    ping () {
        this.server.send("ping")
    }

    latestMessage () {
        return this.lastmsg
    }

    readMsg () {
        this.newMsgs = false
    }

    isNewMessages () {
        return this.newMsgs
    }

    getWorld () {
        this.server.send(JSON.stringify({ type: "world-get" }))
    }

    setWorld (args) {
        this.server.send(JSON.stringify({ type: "world-set", world: args.WORLD }))
    }
}

Scratch.extensions.register(new ScWebServers())