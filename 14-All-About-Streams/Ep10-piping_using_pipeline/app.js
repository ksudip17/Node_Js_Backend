import fs, { read } from 'fs';
import { pipeline } from 'stream';

console.time();

const readStream = fs.createReadStream("/Users/sudipkhatiwada/Desktop/video.webm", 
    { highWaterMark : 1 * 1024 * 1024 });

const writeStream = fs.createWriteStream("streams.webm", { highWaterMark : 1 * 1024 * 1024 });

pipeline(readStream, writeStream, (err) => {
    console.log(err);
})  //Better Error handling 

setInterval(() => {
    console.log("Gayo gayo");
}, 100);

setTimeout(() => {
    readStream.destroy("Sakkiyo");
}, 1000);

readStream.on('end', () => {
    console.timeEnd();
});