import { app } from "./app.cjs";

const htmlDef = {
    "/": `
    <html>
        <head>
            <title>SosirsCraft Server | Homepage</title>
        </head>
        <body>
            <h1>SosirsCraft Server</h1>
            <p>Useful links:</p>
            <ul>
            <li><a href="https://github.com/DiamondCatGroup/sc-web-servers/">Source code</a></li>
            <li><a href="https://github.com/DiamondCatGroup/sc-web-servers/blob/main/README.md">Documentation</a></li>
            <li><a href="https://github.com/DiamondCatGroup/sc-web-servers/issues">Bugs</a></li>
            <li><a href="/console/">Console</a></li>
            </ul>
        </body>
    </html>
    `,
    "/console/": `
    <html>
        <head>
            <title>SosirsCraft Server | Console</title>
            <style>
                .text {
                    color: white
                }

                .green {
                    color: green
                }

                .blue {
                    color: blue
                }

                .error {
                    color: red
                }

                .warn {
                    color: orange
                }
            </style>
        </head>
        <body>
            <h1>SosirsCraft Server Console</h1>
            <div id="consoleUI" style="background-color:black"></div>
            <p style="background-color:black"><span class="blue">${process.cwd().replaceAll("\\", "/")}</span><span class="green">$</span><input id="consoleInput"><span id="consoleSend" class="text">Send</span></p>
            <script>
                document.getElementById("consoleSend").onclick = async () => {
                    const ui = document.getElementById("consoleUI")
                    const input = document.getElementById("consoleInput")
                    ui.innerHTML += \`<span class="blue">${process.cwd().replaceAll("\\", "/")}</span><span class="green">$</span> <span class="text">$\{input.value\}</span><br>\`
                    try {
                        const fet = await fetch("/console/", {
                            method: "POST",
                            body: JSON.stringify({ command: input.value }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        const req = await fet.json()
                        switch (req.type) {
                            case "error":
                                ui.innerHTML += \`<span class="error">$\{req.text\}</span><br>\`
                                break
                            case "warn":
                                ui.innerHTML += \`<span class="warn">$\{req.text\}</span><br>\`
                                break
                            case "blueText":
                                ui.innerHTML += \`<span class="blue">$\{req.text\}</span><br>\`
                                break
                            case "success":
                                ui.innerHTML += \`<span class="green">$\{req.text\}</span><br>\`
                                break
                            case "alert":
                                alert(req.text)
                                break
                            default:
                                ui.innerHTML += \`<span class="text">$\{req.text\}</span><br>\`
                        }
                    } catch (error) {
                        ui.innerHTML += \`<span class="error">Error: $\{error.message\}</span>\`
                    }
                }
            </script>
        </body>
    </html>
    `
}

let info = {
    world: [17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,61,61,61,61,61,61,2,2,2,2,2,2,61,61,61,3,3,3,8,8,3,3,9,5,3,3,5,3,3,3,7,3,3,3,3,3,3,3,3,3,3,3,3,8,3,3,9,6,3,3,3,3,8,8,3,7,5,9,5,6,3,3,3,5,8,3,9,3,9,3,3,3,9,4,4,3,9,3,5,4,3,3,3,3,3,8,3,3,3,9,3,3,9,3,3,3,7,3,6,7,4,4,3,3,6,7,6,8,8,3,3,32,32,31,31,31,32,32,31,31,32,32,32,32,32,31,31,32,32,32,32,31,32,31,31,32,31,31,32,32,32,32,31,32,31,31,31,31,31,31,32,31,32,32,31,31,32,32,31,32,31,31,31,31,32,32,31,32,31,31,31,32,32,32,31,31,31,32,32,32,31,32,32,31,32,31,32,31,32,32,32,32,31,32,32,31,31,32,31,31,32,32,31,32,32,32,32,31,31,31,32,32,31,31,31,31,31,31,32,32,32,31,31,31,31,31,32,31,31,32,32,31,31,31,31,32,32,32,32,22,23,24,22,24,22,22,22,22,22,24,23,22,23,23,24,24,23,23,23,24,23,23,23,23,22,22,23,22,22,23,24,22,22,23,24,24,24,24,22,22,24,22,23,24,23,22,24,22,22,23,22,22,23,22,22,23,24,23,23,22,23,22,22,22,22,22,22,22,23,24,23,24,23,22,23,24,24,24,23,23,24,22,24,22,23,23,24,23,22,24,24,22,24,22,23,23,24,23,24,24,24,23,24,23,23,24,23,24,24,24,23,23,22,24,23,23,23,22,22,22,22,23,22,24,22,23,24,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
    inventory: {},
    pos: {},
    metadataSRV: {
        userLimit: 20,
        title: "SosirsCraft server",
        description: "SC Web Server",
        serverVersion: "1.0",
        currentUsers: 0,
        admins: ["admin"],
        banned: []
    }
}

app.use(function (req, res, next) {
    console.log('middleware')
    return next()
})

app.get('/', (req, res) => {
    return res.status(200).send(htmlDef["/"])
})

app.get('/console/', (req, res) => {
    return res.status(200).send(htmlDef["/console/"])
})

app.post('/console/', (req, res) => {
    const cmd = req.body.command
    if (!cmd) { return res.status(400).json({ type: "error", text: "bad request: command not specified" }) }
    if (cmd === "help") {
        return res.status(200).json({ type: "log", text: "SC Web Server Console (version 1.1)<br>server.metadata - get metadata" })
    }
    if (cmd === "server.metadata") {
        return res.status(200).json({ type: "log", text: JSON.stringify(info.metadataSRV) })
    }
})

app.ws('/ws', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg)
        try {
            if (msg === "ping") {
                ws.send("pong")
            } else if (JSON.parse(msg).type === "world-get") {
                ws.send(JSON.stringify(info.world))
            } else if (JSON.parse(msg).type === "world-set") {
                info.world = JSON.parse(msg).world
            } else if (JSON.parse(msg).type === "metadata-get") {
                ws.send(JSON.stringify(info.metadataSRV))
            } else if (JSON.parse(msg).type === "admin-add") {
                if (!info.metadataSRV.admins.includes(JSON.parse(msg).user)) info.metadataSRV.admins.push(JSON.parse(msg).user)
                else throw new Error("User is already an admin")
            } else if (JSON.parse(msg).type === "admin-delete") {
                if (info.metadataSRV.admins.includes(JSON.parse(msg).user)) info.metadataSRV.admins.splice(info.metadataSRV.admins.indexOf(JSON.parse(msg).user), 1)
                else throw new Error("User is not an admin")
            } else if (JSON.parse(msg).type === "user-ban") {
                if (!info.metadataSRV.banned.includes(JSON.parse(msg).user)) info.metadataSRV.banned.push(JSON.parse(msg).user)
                else throw new Error("User is banned")
            } else if (JSON.parse(msg).type === "user-unban") {
                if (info.metadataSRV.banned.includes(JSON.parse(msg).user)) info.metadataSRV.banned.splice(info.metadataSRV.banned.indexOf(JSON.parse(msg).user), 1)
                else throw new Error("User is not banned")
            }
        } catch (e) {
            console.error(`Error: ${e.message}`)
            ws.send(`Error: ${e.message}`)
        }
    })
    console.log('socket', req.world)
})

app.listen(3000);
