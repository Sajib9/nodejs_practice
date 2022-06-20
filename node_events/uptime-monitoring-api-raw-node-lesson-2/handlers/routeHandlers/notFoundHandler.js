const handler = {};

handler.notFoundHandler = (requestProperties,callBack) => {
    callBack(400,{
        message:'Your requested URL was not found!'
    });
};

module.exports = handler;