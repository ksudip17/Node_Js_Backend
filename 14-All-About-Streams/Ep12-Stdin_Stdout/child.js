import { createReadStream } from "fs";

const readStream = createReadStream("./notes.txt");

readStream.pipe(process.stdout);
