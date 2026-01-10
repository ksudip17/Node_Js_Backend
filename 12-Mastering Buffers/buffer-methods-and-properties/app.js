import { Buffer } from 'buffer';
import fs from 'fs/promises';

const nodeBuffer = Buffer.from('Hello world!!');
const nodeBuffer2 = Buffer.alloc(8);
// fs.writeFile("file.txt", nodeBuffer);
// console.log(nodeBuffer.toString());


// const nodeBuffer = Buffer.alloc(8);
// nodeBuffer.write("Sudip");
// console.log(nodeBuffer.toString());
// console.log(nodeBuffer.toJSON());
// console.log(nodeBuffer.subarray(1).toString());
// nodeBuffer.copy(nodeBuffer2, 0, 0, 5);
// console.log(nodeBuffer.includes('wo', 7))
