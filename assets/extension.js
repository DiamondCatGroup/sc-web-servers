class ScWebServers {
    getInfo() {
        return {
            id: 'scwebserver',
            name: 'SC Web Servers',
            blocks: []
        };
    }
}

Scratch.extensions.register(new ScWebServers())