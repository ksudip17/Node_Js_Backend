import { createWriteStream } from "fs";

console.time();

const writeStream = createWriteStream("numbers.txt");

for(let i = 1; i <= 100000; i++) {
    writeStream.write(`${i}, `);
}

writeStream.end();

writeStream.on('finish', () => {
    console.timeEnd();
});