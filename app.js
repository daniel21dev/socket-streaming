const express = require('express');
const app = new express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;

app.use( express.static(__dirname + '/public'));

http.listen(port,()=> console.log('servidor en %s', port));

app.get('/',(req, res)=>{
    res.redirect('index.html');
});

io.on('connection',( socket )=>{
    socket.on('stream',( image )=>{
        socket.broadcast.emit('stream', image);
    });
})