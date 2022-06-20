// const a = 5;
// console.log(a);

const _ = require('lodash');
const fileSystem = require('fs'); // file write module
const obj = require('./people');

fileSystem.writeFileSync('myFile.txt', 'Hello World'); // file write in synchronous way
const readData = fileSystem.readFileSync('myFile.txt'); // read from file in synchronous way
console.log(readData.toString()); // return as Buffer(one kind of data type), so need to convert.

fileSystem.writeFile('myFileAsyn.txt', 'Asynchronous way!', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('File written successfully\n');
    }
}); // file write in asynchronous way

fileSystem.readFile('myFileAsyn.txt', (err, data) => {
    console.log(data.toString());
}); // read from file in asynchronous way

console.log(obj.people);
console.log(_.last(obj.people)); // _.last() lodash function for printing last element of array
obj.test(); // function calling from another module
