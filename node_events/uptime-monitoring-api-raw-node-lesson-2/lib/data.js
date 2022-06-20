const fs = require('fs');
const path = require('path');

const lib = {};

//base directory of data folder
lib.basedir = path.join(__dirname,'/../.data/');

lib.create = (subdir,fileName,writeAbleData,callback) => {
    fs.open(`${lib.basedir+subdir}/${fileName}.json`,'wx',(err,fileDescriptior) =>{
        if(!err && fileDescriptior){
            //convert data to string
            const stringData = JSON.stringify(writeAbleData);

            //write data to file
            fs.writeFile(fileDescriptior,stringData, (err1) => {
                if(!err1){
                    fs.close(fileDescriptior, (err2) => {
                        if(!err2){
                            callback(false);
                        }else{
                            callback('error closing the file');
                        }
                    });
                }else{
                    callback('error wrtie to the file');
                }
            });
        }else{
            callback('There was an error, file may already exists!');
        }
    });
};

//read from file
lib.read = (dir,fileName,callback) => {
    fs.readFile(`${lib.basedir + dir}/${fileName}.json`,'utf8', (err,data) => {
        callback(err,data);
    });
};

//update file
lib.update = (dir,file,data,callback) => {
    fs.open(`${lib.basedir+dir}/${file}.json`,'r+', (err,fileDescriptior) => {
        if(!err && fileDescriptior){
            const dataString = JSON.stringify(data);

            //truncate file
            fs.ftruncate(fileDescriptior, (err1) => {
                if(!err1){
                    fs.writeFile(fileDescriptior,dataString, (err2) => {
                        if(!err2){
                            fs.close(fileDescriptior, (err3) => {
                                if(!err3){
                                    console.log(false);
                                }else{
                                    console.log(`Error closing file!`);
                                }
                            });
                        }else{
                            console.log(`Error writing to file!`);
                        }
                    });
                }else{
                    console.log(`Error truncating file!`);
                }
            });
        }else{
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

module.exports = lib;