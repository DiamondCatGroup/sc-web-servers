import { app } from "./app.cjs";

app.use(function (req, res, next) {
    console.log('middleware')
    req.world = []
    req.metadataSRV = {
        userLimit: 20,
        description: "SC Web Server",
        serverVersion: "1.0",
        currentUsers: 0,
        admins: []
    }
    return next()
})

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg)
        if (msg === "ping") {
            ws.send("pong")
        } else if (JSON.parse(msg).type === "world-get") {
            ws.send(JSON.stringify(req.world))
        } else if (JSON.parse(msg).type === "world-set") {
            req.world = JSON.parse(msg).world
        } else if (JSON.parse(msg).type === "metadata-get") {
            ws.send(JSON.stringify(req.metadataSRV))
        }
    })
    console.log('socket', req.world)
})

app.listen(3000);