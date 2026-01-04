import { watch } from 'node:fs';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { chmod } from 'node:fs/promises';
import { rmdir } from 'node:fs/promises';
import { rm } from 'node:fs/promises';
import { unlink } from 'node:fs/promises';
import { copyFile } from 'node:fs/promises';
import { rename } from 'node:fs/promises';

// await rename("sudip.txt", "buffer.txt");

// copyFile("buffer.txt", "sudip.txt");

// unlink("Khusi.jpeg")

// rmdir('test');

// rm("node_modules", { recursive:true });

// writeFile("script.js", "const sudip = 10  \nconsole.log(sudip)");

// mkdir("node_modules");
// rename("node", "node_modules");

// const info = await stat("app.js");

// console.log(stat);

watch("script.js", (eventType) => {
    console.log(eventType);
});



