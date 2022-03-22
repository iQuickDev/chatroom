const {Server} = require("socket.io")
const express = require('express')

const app = express()
app.use(express.static("dist"))
app.listen(3001)

const io = new Server(3001,
{
    cors: { origin: '*'}
})

let connectedSockets = [] 

io.on("connection", (socket) =>
{
    socket.on("auth", (data) =>
    {
        if (data.username)
        {
            for (const client of connectedSockets)
            {
                if (data.username === client.username)
                socket.disconnect(true)
                return
            }

            connectedSockets.push({
                id: socket.id,
                username: data.username
            })
            console.log(`[CONNECT] ${data.username}`)
        }
        else
        socket.disconnect(true)
    })

    socket.on("clientMessage", (msg) =>
    {
        if (msg.sender)
        {
            console.log(`[${msg.timestamp}] ${msg.sender}: ${msg.message}`)
            socket.broadcast.emit("serverMessage", msg)
        }
        else
        socket.disconnect()
    })

    socket.on("disconnect", () =>
    {
        for (const client of connectedSockets)
        {
            if (client.id == socket.id)
            {
                connectedSockets.splice(connectedSockets.indexOf(client), 1)
                console.log(`[DISCONNECT] ${client.username}`)
            }
        }
    })
})