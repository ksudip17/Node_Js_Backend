import http from "http";

const server = http.createServer((req, res) => {
  res.end("Khellu padyo, laddu padyo, jittu padyo!");
});

server.listen(4000, '0.0.0.0', () => {
  console.log("Server is listening on localhost, port 4000");
});
