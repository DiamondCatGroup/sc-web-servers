class ScWebServers {
    constructor () {
        this.server = undefined
        this.lastmsg = undefined
        this.newMsgs = false
    }

    getInfo() {
        return {
            id: 'scwebserver',
            name: 'SC Web Server Api [1.1]',
            color: '#7b4700',
            blocks: [
                {
                    opcode: "_connect",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "connect to server [URL]",
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "ws://localhost:3000/ws"
                        }
                    }
                },
                {
                    opcode: "onMessage",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "set callback for get messages from server",
                },
                {
                    opcode: "ping",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "server ping"
                },
                {
                    opcode: "latestMessage",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "get latest message"
                },
                {
                    opcode: "isNewMessages",
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: "new messages received?"
                },
                {
                    opcode: "readMsg",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "read message"
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
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: []
                        }
                    }
                },
                {
                    opcode: "servermetadata",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "get server metadata"
                },
                {
                    opcode: "adminAct",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "admin [ADMIN] [ACTION]",
                    arguments: {
                        ADMIN: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "User123"
                        },
                        ACTION: {
                            type: Scratch.ArgumentType.STRING,
                            menu: "ADMIN_ADD_DEL"
                        }
                    }
                },
                {
                    opcode: "disconnect",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "disconnect"
                },
                {
                    opcode: "userAct",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "user [USER] [ACTION]",
                    arguments: {
                        USER: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "User123"
                        },
                        ACTION: {
                            type: Scratch.ArgumentType.STRING,
                            menu: "USER_BAN_UNBAN"
                        }
                    }
                },
                {
                    opcode: "getInfoOfServer",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "info of server [URL]",
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "ws://localhost:3000/ws"
                        }
                    }
                }
            ],
            menus: {
                ADMIN_ADD_DEL: {
                    acceptReporters: true,
                    items: ['add', 'delete']
                },
                USER_BAN_UNBAN: {
                    acceptReporters: true,
                    items: ['ban', 'unban']
                }
            }
        };
    }

    _connect (args) {
        this.server = new WebSocket(
            args.URL,
            "protocolOne",
        )
    }

    onMessage () {
        this.server.onmessage = (event) => {
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

    servermetadata () {
        this.server.send(JSON.stringify({ type: "metadata-get" }))
    }

    adminAct (args) {
        switch (args.ACTION) {
            case "add":
                this.server.send(JSON.stringify({ type: "admin-add", user: args.ADMIN }))
                break
            case "delete":
                this.server.send(JSON.stringify({ type: "admin-delete", user: args.ADMIN }))
        }
    }
    
    disconnect () {
        this.server.close()
    }

    userAct (args) {
        switch (args.ACTION) {
            case "ban":
                this.server.send(JSON.stringify({ type: "user-ban", user: args.USER }))
                break
            case "unban":
                this.server.send(JSON.stringify({ type: "user-unban", user: args.USER }))
        }
    }

    getInfoOfServer () {}
}

Scratch.extensions.register(new ScWebServers())
