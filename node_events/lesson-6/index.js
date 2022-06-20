const fs = require('fs');

const readStream = fs.createReadStream(`${__dirname}/temp.txt`); //event raise
//const readStream = fs.createReadStream(`${__dirname}/temp.txt`,'utf8'); //event raise

readStream.on('data',(chunk) => {
    console.log(chunk.toString());
});
// readStream.on('data',(data) => {
//     console.log(data);
// });

console.log('Hello');