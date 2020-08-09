const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const app = express()

app.use(express.static('public'))

const port = process.env.PORT || 8000
const server = http.createServer(app)
const io = socketio(server)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

io.on('connection',(socket)=>{
   console.log('new user connected!')
    
     socket.on('message',(msg)=>{
        
          socket.broadcast.emit('message',msg)

     })
})



server.listen(port,()=>{
    console.log(`successfully listening on port ${port}`)
})

