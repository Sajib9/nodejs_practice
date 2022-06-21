
const handler = {};

handler.sampleHandler = (requestProperties,callBack) => {

    callBack(200,{
        message: 'this is sample url'
    });
};

module.exports = handler;