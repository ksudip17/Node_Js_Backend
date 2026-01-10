import fs, { createWriteStream } from 'fs';
import { spawn } from 'child_process';

const childProcess = spawn('node', ["child.js"]);

const writeStream = createWriteStream("sudip.html");

childProcess.stdout.pipe(writeStream);


// childProcess.stdout.on('data', (chunk) => {
//     console.log(chunk.toString());
// });
