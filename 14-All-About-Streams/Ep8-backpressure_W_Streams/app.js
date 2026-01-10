import fs from 'fs';

const writeStream = fs.createWriteStream("notes.txt", { highWaterMark: 4 });

let i = 1;

while ( i <= 10) {
    console.log(writeStream.writableLength);
    let isEmpty = writeStream.write('s');
    if(!isEmpty) {
        break;
    }
    console.log(isEmpty);
    i++
}


writeStream.on('drain', () => {
    console.log('drain', writeStream.writableLength);

})