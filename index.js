import { app } from "./app.cjs";

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg)
    })
    console.log('socket', req.testing)
})