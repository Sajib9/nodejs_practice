//dependancies
const http = require('http');
const {handleReqRes} =  require('./helpers/handleReqRes.js');
const environment = require('./helpers/environments.js');
const data = require('./lib/data.js');

//module scaffolding
const app = {};

data.create('test','newFile',{name:'sajib',Address:'Dhaka'}, (err) => {
    console.log('error was',err);
});

// data.read('test','newFile', (err,result) => {
//     console.log(err,result);
// });

// data.update('test','newFile',{'cty':'Dhaka','HomeTown':'Munshigonj'}, (err) =>{
//     console.log('file updated',err);
// });

// data.delete('test','newFile', (err) => {
//     console.log(err);
// });

// create server
app.createServer = ()=>{
    const server = http.createServer(app.handleRequest);

    server.listen(environment.port,()=>{
        console.log(`listening from port ${environment.port}`);
    });
};

// handle Request Response
app.handleRequest = handleReqRes;

app.createServer();