import { createReadStream, createWriteStream } from "node:fs";
import net from "node:net";

process.stdin.on("data", (input) => {
  const inputString = input.toString().trim();
  console.dir(inputString);
});

const socket = net.createConnection({ host: "172.168.29.148", port: 8080 });

const writeStream = createWriteStream(
  "/Users/sudipos/Desktop/syllabus.png"
);

socket.on("error", () => {
  console.log("Server Lost");
});

socket.on("data", (chunk) => {
  writeStream.write(chunk);
})