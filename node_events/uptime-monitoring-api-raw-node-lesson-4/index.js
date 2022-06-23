// //dependancies
// const http = require('http');
// const {handleReqRes} =  require('./helpers/handleReqRes');
// const { sendTwilioSms } = require('./helpers/notifications.js');
// //module scaffolding
// const app = {};

// // @TODO remove later
// // sendTwilioSms('01935294900', 'Hello world', (err) => {
// //     console.log(`this is the error`, err);
// // });

// app.config = {
//     port:3000
// };

// // create server
// app.createServer = ()=>{
//     const server = http.createServer(app.handleRequest);

//     server.listen(app.config.port,()=>{
//         console.log(`listening from port ${app.config.port}`);
//     });
// };

// // handle Request Response
// app.handleRequest = handleReqRes;

// app.createServer();


/*
 * Title: Project Initial file
 * Description: Initial file to start the node server and workers
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 12/27/2020
 *
 */
// dependencies
const server = require('./lib/server');
const workers = require('./lib/worker');

// app object - module scaffolding
const app = {};

app.init = () => {
    // start the server
    server.init();
    // start the workers
    workers.init();
};

app.init();

// export the app
module.exports = app;