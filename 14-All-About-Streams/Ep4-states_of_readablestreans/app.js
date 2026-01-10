import fs from 'fs';

const readStream = fs.createReadStream("chars.txt", { highWaterMark:4  });

let readCount = 0;

readStream.on('data', (chunk) => {
    readCount++
    if(readCount === 1) {
        fs.writeFileSync("virat.txt", chunk)
    } else {
        fs.appendFileSync("virat.txt", chunk)
    }
    console.log(chunk);
    fs.appendFileSync("virat.txt", chunk)
    readStream.pause();

    setTimeout(() => {
        readStream.resume();
    }, 500)

}); 


 