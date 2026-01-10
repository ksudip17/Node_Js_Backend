import fs, { read } from 'fs';
   
const readStream = fs.createReadStream
("/Users/sudipkhatiwada/Desktop/video.webm", 
    {highWaterMark: 1 * 1024 * 1024}
);

console.time();

readStream.on('data', (chunkBuffer) =>{
    fs.appendFileSync("video.webm", chunkBuffer);
    if(chunkBuffer.byteLength < 1 * 1024 * 1024) {
        console.timeEnd();
    } 
});

// const readStream = fs.createReadStream("./chars.txt", {
//     highWaterMark:8,
// });

// let readCount = 0;

// readStream.on('data', (chunk) => {
//     console.log(chunk.byteLength);
//     readCount++;
// });

// readStream.on('end', () => {
//     console.log({ readCount });
    
// })



 