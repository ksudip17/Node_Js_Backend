import fs, {readFile} from 'node:fs/promises';

const filePath = process.argv[2]
const targetWords = process.argv.slice();

if(!filePath) {
    console.log('Usage: node app.js <file-path> word');
    process.exit(1);
}


const fileContent = await readFile (filePath, 'utf-8');

const filterWords = fileContent.split(/[\W]/).filter((w) => w);

const wordsCount = {  }

filterWords.forEach((word) => {
    const lowerWord = word.toLowerCase();
    if(lowerWord in wordsCount) {
        wordsCount[lowerWord] += 1;
    } else {
        wordsCount[lowerWord] = 1;
    }
});

if(targetWords.length > 0) {
    console.log('Word Count:');
    targetWords.forEach(word => {
        const lowerWord = word.toLowerCase();
        const count = wordsCount[lowerWord] || 0;
        console.log(`"${word}": ${count} `);
    });
}

console.log(wordsCount);




