import fs, { read } from 'fs';

console.time();

const readStream = fs.createReadStream("/Users/sudipkhatiwada/Desktop/video.webm", 
    { highWaterMark : 1 * 1024 * 1024 });

const writeStream = fs.createWriteStream("streams.webm", { highWaterMark : 1 * 1024 * 1024 });

readStream.pipe(writeStream);

// setTimeout(() => {
//     readStream.unpipe(writeStream);
// }, 1000);


// readStream.on('data', (chunk) => {
//    const isEmpty =  writeStream.write(chunk);
//    if (!isEmpty) {
//     readStream.pause();
//    }
// });

// writeStream.on('drain', () => {
//     readStream.resume();
// })

readStream.on('end', () => {
    console.timeEnd();
});