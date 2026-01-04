import net from "node:net";

const server = net.createServer();

server.listen(8080, "0.0.0.0", () => {
  console.log(`Server is listening on http://localhost:8080`);
});

server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    console.log(chunk.toString());
    socket.write("HTTP\n\nHii From Server.");
  });
  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client disconnected");
  });
  socket.on('error', () => {
    console.log("Client Lost");
  });
  console.log("Client Connected", socket.remoteAddress);
});

// server.on("listening", () => {
//   console.log("Server started on port 8080");
// });
