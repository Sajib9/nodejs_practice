//dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler');
const {parseJSON } = require('./utility.js');

//module scaffolding
const handler = {};

handler.handleReqRes = (req,res) => {
    const parsedUrl = url.parse(req.url,true);
    const pathName = parsedUrl.pathname;
    const trimmedPath = pathName.replace(/^\/+|\/+$/g,'');
    const method = req.method.toLowerCase();
    const queryStringObj = parsedUrl.query;
    const headerObject = req.headers;
    const requestProperties = {
        parsedUrl,
        pathName,
        trimmedPath,
        method,
        queryStringObj,
        headerObject,
    };
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath]?routes[trimmedPath]:notFoundHandler;

    

    req.on('data',(buffer) =>{
        realData += decoder.write(buffer);
    });

    req.on('end',() => {
        realData += decoder.end();
    
        requestProperties.body = parseJSON(realData);
        
        chosenHandler(requestProperties,(statusCode,payLoad) =>{
            
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payLoad = typeof payLoad === 'object' ? payLoad : {};
    
            const payLoadString = JSON.stringify(payLoad);
           
            //return the final response
            res.setHeader('content-type','application/json');
            res.writeHead(statusCode);
            res.end(payLoadString);
        });

    });
    
};

module.exports = handler;