//dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler.js');
const {aboutHandler} = require('./handlers/routeHandlers/aboutHandler.js');
const {userHandler} = require('./handlers/routeHandlers/userHander.js');
const routes = {
    'sample': sampleHandler,
    'about':aboutHandler,
    'user':userHandler
};

module.exports = routes;