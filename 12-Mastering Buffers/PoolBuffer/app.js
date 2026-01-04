import { Buffer } from 'buffer';

const a = Buffer.alloc(4);
const b = Buffer.allocUnsafe(4);

console.log("a:",a.buffer.byteLength);
console.log("b:",b.buffer.byteLength);


// Condition for allocUnsafe to use Buffer Pool
// BufferSize < Buffer.poolSize >>> 1 