import { app } from "./app.cjs";

const htmlDef = {
    "/": `
    <html>
        <head>
            <title>SosirsCraft Server</title>
        </head>
        <body>
            <h1>SosirsCraft Server</h1>
        </body>
    </html>
    `,
    "/console/": `
    <html>
        <head>
            <title>SosirsCraft Server</title>
        </head>
        <body>
            <h1>SosirsCraft Server Console</h1>
        </body>
    </html>
    `
}

app.use(function (req, res, next) {
    console.log('middleware')
    req.world = []
    req.inventory = {}
    req.pos = {}
    req.metadataSRV = {
        userLimit: 20,
        title: "SosirsCraft server",
        description: "SC Web Server",
        serverVersion: "1.0",
        currentUsers: 0,
        admins: ["admin"],
        banned: []
    }
    return next()
})

app.get('/', (req, res) => {
    return res.status(200).send(htmlDef["/"])
})

app.get('/console/', (req, res) => {
    return res.status(200).send(htmlDef["/console/"])
})

app.post('/console/', (req, res) => {
    return res.status(200).send(htmlDef["/console/"])
})

app.ws('/ws', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg)
        try {
            if (msg === "ping") {
                ws.send("pong")
            } else if (JSON.parse(msg).type === "world-get") {
                ws.send(JSON.stringify(req.world))
            } else if (JSON.parse(msg).type === "world-set") {
                req.world = JSON.parse(msg).world
            } else if (JSON.parse(msg).type === "metadata-get") {
                ws.send(JSON.stringify(req.metadataSRV))
            } else if (JSON.parse(msg).type === "admin-add") {
                if (!req.metadata.admins.includes(JSON.parse(msg).user)) req.metadataSRV.admins.push(JSON.parse(msg).user)
                else throw new Error("User is already an admin")
            } else if (JSON.parse(msg).type === "admin-delete") {
                if (req.metadata.admins.includes(JSON.parse(msg).user)) req.metadataSRV.admins.splice(req.metadataSRV.admins.indexOf(JSON.parse(msg).user), 1)
                else throw new Error("User is not an admin")
            } else if (JSON.parse(msg).type === "user-ban") {
                if (!req.metadata.banned.includes(JSON.parse(msg).user)) req.metadataSRV.banned.push(JSON.parse(msg).user)
                else throw new Error("User is banned")
            } else if (JSON.parse(msg).type === "user-unban") {
                if (req.metadata.banned.includes(JSON.parse(msg).user)) req.metadataSRV.banned.splice(req.metadataSRV.banned.indexOf(JSON.parse(msg).user), 1)
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
