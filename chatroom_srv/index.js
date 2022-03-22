const {Server} = require("socket.io")
const express = require('express')

const app = express()
app.use(express.static("dist"))
app.listen(3000)

const io = new Server(80,
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
            }

            connectedSockets.push({
                id: socket.id,
                username: data.username
            })
            console.log(`${socket.id} authenticated as ${data.username}`)
        }
        else
        socket.disconnect(true)
    })

    socket.on("clientMessage", (msg) =>
    {
        if (msg.sender)
        socket.broadcast.emit("serverMessage", msg)
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
                console.log(`${socket.id} disconnected`)
            }
        }
    })
})