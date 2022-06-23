// const fs = require('fs');
// const path = require('path');

// const lib = {};

// //base directory of data folder
// lib.basedir = path.join(__dirname,'/../.data/');

// lib.create = (subdir,fileName,writeAbleData,callback) => {
//     fs.open(`${lib.basedir+subdir}/${fileName}.json`,'wx',(err,fileDescriptior) =>{
//         if(!err && fileDescriptior){
//             //convert data to string
//             const stringData = JSON.stringify(writeAbleData);

//             //write data to file
//             fs.writeFile(fileDescriptior,stringData, (err1) => {
//                 if(!err1){
//                     fs.close(fileDescriptior, (err2) => {
//                         if(!err2){
//                             callback(false);
//                         }else{
//                             callback('error closing the file');
//                         }
//                     });
//                 }else{
//                     callback('error wrtie to the file');
//                 }
//             });
//         }else{
//             callback('There was an error, file may already exists!');
//         }
//     });
// };

// //read from file
// lib.read = (dir,fileName,callback) => {
//     fs.readFile(`${lib.basedir + dir}/${fileName}.json`,'utf8', (err,data) => {
//         callback(err,data);
//     });
// };

// //update file
// lib.update = (dir,file,data,callback) => {
//     fs.open(`${lib.basedir+dir}/${file}.json`,'r+', (err,fileDescriptior) => {
//         if(!err && fileDescriptior){
//             const dataString = JSON.stringify(data);

//             //truncate file
//             fs.ftruncate(fileDescriptior, (err1) => {
//                 if(!err1){
//                     fs.writeFile(fileDescriptior,dataString, (err2) => {
//                         if(!err2){
//                             fs.close(fileDescriptior, (err3) => {
//                                 if(!err3){
//                                    callback(false);
//                                 }else{
//                                     console.log(`Error closing file!`);
//                                 }
//                             });
//                         }else{
//                             console.log(`Error writing to file!`);
//                         }
//                     });
//                 }else{
//                     console.log(`Error truncating file!`);
//                 }
//             });
//         }else{
//             console.log(`Error updating. File may not exist`);
//         }
//     });
// };

// // delete existing file
// lib.delete = (dir, file, callback) => {
//     // unlink file
//     fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
//         if (!err) {
//             callback(false);
//         } else {
//             callback(`Error deleting file`);
//         }
//     });
// };

// module.exports = lib;













/*
 * Title: Data Library
 * Description: Data Library functions for CRUD
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 11/20/2020
 *
 */

// dependencies
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to stirng
            const stringData = JSON.stringify(data);

            // write data to file and then close it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing the new file!');
                        }
                    });
                } else {
                    callback('Error writing to new file!');
                }
            });
        } else {
            callback('There was an error, file may already exists!');
        }
    });
};

// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

// update existing file
lib.update = (dir, file, data, callback) => {
    // file open for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert the data to string
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    // write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            // close the file
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('Error closing file!');
                                }
                            });
                        } else {
                            callback('Error writing to file!');
                        }
                    });
                } else {
                    callback('Error truncating file!');
                }
            });
        } else {
            console.log(`Error updating. File may not exist`);
        }
    });
};

// delete existing file
lib.delete = (dir, file, callback) => {
    // unlink file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback(`Error deleting file`);
        }
    });
};

// list all the items in a directory
lib.list = (dir, callback) => {
    fs.readdir(`${lib.basedir + dir}/`, (err, fileNames) => {
        if (!err && fileNames && fileNames.length > 0) {
            const trimmedFileNames = [];
            fileNames.forEach((fileName) => {
                trimmedFileNames.push(fileName.replace('.json', ''));
            });
            callback(false, trimmedFileNames);
        } else {
            callback('Error reading directory!');
        }
    });
};

module.exports = lib;