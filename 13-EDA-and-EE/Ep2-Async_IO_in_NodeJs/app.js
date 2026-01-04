import fsPromises from "fs/promises";
import fs from 'fs';f

setTimeout(() => {
    console.log("Namaskaraaa");
}, 2)

// Example of Async I/O
const fileContent = await fsPromises.readFile('notes.txt', 'utf-8')

//Sync I/O
// const fileContent =  fs.readFileSync('notes.txt', "utf-8");

console.log(fileContent);
