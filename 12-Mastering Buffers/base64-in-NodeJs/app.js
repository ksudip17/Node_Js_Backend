import fs from 'fs/promises';

const bufferContent = await fs.readFile("./image.png");

const a = bufferContent.toString("base64");


// fs.writeFile("newFile.txt", a);
 