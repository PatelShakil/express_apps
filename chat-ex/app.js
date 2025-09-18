const express = require('express');
const app = express()
const http = require('http');
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({server});


app.use(express.static('./static'))

wss.on('connection',(cl)=>{
console.log('new client')
    cl.send("Welcome to chat")

    cl.on('message',(msg)=>{
        console.log(msg);
        wss.clients.forEach(client=>{
            if(client.readyState == WebSocket.OPEN){
                client.send(msg.toString());
            }
        })
    })

})

server.listen(3000,()=>{console.log("Server Started")})