import fs from 'fs/promises';

const a = await fs.readFile("/Users/sudipkhatiwada/Desktop/Khusii.jpeg");
console.log(a.byteLength);
