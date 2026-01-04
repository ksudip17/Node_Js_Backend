import fs from 'fs';


const readStream = fs.createReadStream("chars.txt", { highWaterMark: 4, encoding:'utf-8' });


readStream.on('data', (chunk) => {
    console.log(chunk);
});


// readStream.destroy();

// readStream.on('close', () => {
//     console.log('Closed');
// });

// readStream.on('error', (err) => {
//     console.log({ err });
// });

readStream.on('open', (data) => {
    console.log('Opened', data);
}); 

readStream.on('ready', (data) => {
    console.log('Ready', data);
})
