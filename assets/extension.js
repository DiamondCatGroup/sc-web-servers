class ScWebServers {
    constructor () {
        this.server = undefined
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
                }
            ]
        };
    }

    _connect (args) {
        this.server = new WebSocket(
            args.URL,
            "protocolOne",
        )
    }
}

Scratch.extensions.register(new ScWebServers())