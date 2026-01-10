import dgram from 'node:dgram'; //UDP

const socket = dgram.createSocket("udp4");

socket.on("message", (message,remoteAddress) => {
    console.log(message.toString());
    console.log(remoteAddress);
})


//For Sending Data
socket.send("Hello My name is lado ", 4000, "172.168.16.241", () => {
    console.log("Message Sent")
})

