//dependancies
const http = require('http');
const {handleReqRes} =  require('./helpers/handleReqRes');

//module scaffolding
const app = {};

app.config = {
    port:3000
};

// create server
app.createServer = ()=>{
    const server = http.createServer(app.handleRequest);

    server.listen(app.config.port,()=>{
        console.log(`listening from port ${app.config.port}`);
    });
};

// handle Request Response
app.handleRequest = handleReqRes;

app.createServer();