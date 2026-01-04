import fs from 'fs';
import { Readable, Writable, Duplex, Transform, PassThrough } from 'stream';


const readStream = fs.createReadStream("/Users/sudipkhatiwada/Desktop/video.webm", 
    { highWaterMark: 1 * 1024 * 1024 }
);

const writeStream = fs.createWriteStream = fs.createWriteStream("manipur.webm", 
    { highWaterMark : 1 * 1024 * 1024 }
);

readStream.pipe(writeStream);