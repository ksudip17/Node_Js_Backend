const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-type" : "application/json" });
    res.end('{"message" : "Hello Namastey!!"}');
})

server.listen(3000, () => {
    console.log(`Server is listening on http://localhost:3000`);
})