import dgram from 'node:dgram'; //UDP
import { writeFile } from 'node:fs/promises';

const socket = dgram.createSocket("udp4");

socket.on("message", async (message, remoteAddress) => {
    await writeFile("num.txt", message)
    socket.send('Message Received Sucessfully.', remoteAddress.port, remoteAddress.address);
})


//For Receiving Data
socket.bind({ port: 4000 }, () => {
    const address = socket.address();
    console.log(`Server is listening on port ${address.port}`);
});