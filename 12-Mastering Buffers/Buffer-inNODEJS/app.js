import { Buffer } from 'buffer'

const nodebuffer =  Buffer.from([83, 117, 100, 105, 112]);

// console.log(nodebuffer.toString("utf-8"));

console.log(nodebuffer.buffer);