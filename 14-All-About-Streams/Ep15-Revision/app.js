//1. File Reader or Writer 

// import fs, { createReadStream, createWriteStream } from 'fs';

// createReadStream('input.txt')
// .pipe(createWriteStream('output.txt'));

//------------------------------------------------------

//2. Data Transformer
// import { Transform } from "stream"

// const upperCase = new Transform({
//     transform(chunk, encoding, callback) {
//         this.push(chunk.toString().toUpperCase());
//         callback();
//     }
// })

// process.stdin.pipe(upperCase).pipe(process.stdout);

//------------------------------------------------------

//3. Pipeline with Error Handling

// import { createReadStream, createWriteStream } from "fs";
// import { pipeline } from "stream";

// pipeline(createReadStream('input.txt')),
// upperCase,
// createWriteStream('output.txt'),
// (err) => {
//     if (err) console.error('Pipeline failed :', err);
//     else console.log('Pipeline succeeded');
// }