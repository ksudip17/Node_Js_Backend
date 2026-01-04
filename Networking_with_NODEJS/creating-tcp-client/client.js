import net from 'node:net';

const socket = net.createConnection({ host: "172.168.29.148", port: 8080 });

socket.on('error', () => {
    console.log("Server Lost");
});

setTimeout(() => {
    socket.write("Hello from Client");
    socket.end();
}, 2000);

socket.on("data", (chunk) => {
    console.log(chunk.toString());
});