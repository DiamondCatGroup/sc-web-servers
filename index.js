import { app } from "./app.cjs";

app.use(function (req, res, next) {
    console.log('middleware')
    req.testing = 'testing'
    return next()
})

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg)
        if (msg === "ping") {
            ws.send("pong")
        }
    })
    console.log('socket', req.testing)
})

app.listen(3000);