import http from 'http';

const server = http.createServer()

server.on('request', (req, res) => {
    console.log('Got the request')
    res.setHeader("Content-Length", "100")
    res.write("Hello from the HTTP module");
    res.end();
})

// server.on('connection', (socket) => {
//     socket.end('hello this is sudip from Mac Vs code')
// });

server.listen(8080, '0.0.0.0', () => {
    console.log(`Server is listening of http://localhost:8080`)
})