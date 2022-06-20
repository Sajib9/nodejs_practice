const handler = {};

handler.aboutHandler = (requestProperties,callBack) => {
    callBack(200,{
        message : 'This is about page'
    });
};

module.exports = handler;