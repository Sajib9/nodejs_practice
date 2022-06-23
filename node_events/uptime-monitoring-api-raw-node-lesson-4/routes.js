//dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler.js');
const {aboutHandler} = require('./handlers/routeHandlers/aboutHandler.js');
const {userHandler} = require('./handlers/routeHandlers/userHander.js');
const {tokenHandler} = require('./handlers/routeHandlers/tokenHandler.js');
const { checkHandler } = require('./handlers/routeHandlers/checkHandler.js');
const routes = {
    'sample': sampleHandler,
    'about':aboutHandler,
    'user':userHandler,
    'token':tokenHandler,
    'check': checkHandler,
};

module.exports = routes;