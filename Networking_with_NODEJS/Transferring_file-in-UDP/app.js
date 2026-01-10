import dgram from 'node:dgram'; //UDP
import { readFile } from 'node:fs/promises';

const socket = dgram.createSocket("udp4");

socket.on("message", (message,remoteAddress) => {
    console.log(message.toString());
    console.log(remoteAddress);
})

const content = await readFile("/Users/sudipkhatiwada/Desktop/Number.txt", "utf-8");

//For Sending Data
socket.send(content, 4000, "172.168.16.241", () => {
    console.log("Message Sent")
})

