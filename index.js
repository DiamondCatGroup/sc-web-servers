import { app } from "./app.cjs";

app.use(function (req, res, next) {
    console.log('middleware')
    req.world = []
    req.metadataSRV = {
        userLimit: 20,
        description: "SC Web Server",
        forVersion: "1.5"
    }
    return next()
})

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg)
        if (msg === "ping") {
            ws.send("pong")
        } else if (typeof msg === "object" && !Array.isArray(msg)) {
            if (msg.type === "world-get") {
                ws.send(req.world)
            } else if (msg.type === "world-set") {
                req.world = msg.world
            } else if (msg.type === "metadata-get") {
                ws.send(req.metadataSRV)
            }
        }
    })
    console.log('socket', req.world)
})

app.listen(3000);