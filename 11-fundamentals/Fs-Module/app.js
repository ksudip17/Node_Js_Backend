import fs from 'node:fs/promises';

let i = 0;
const timerID = setInterval(() => {
    console.log(i++);
    if(i === 11){
        clearInterval(timerID);
    }
}, 5);

const file = await fs.readFile('./index.html');
const content = file.toString();
console.log('Reading Complete');
console.log('End');
