const data = require('../../lib/data.js');
const {hash} = require('../../helpers/utility.js');
const {parseJSON} = require('../../helpers/utility.js');
const {createRandomString} = require('../../helpers/utility.js');

//module scffolding
const handler = {};

handler.tokenHandler = (requestProperties,callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties,callback);
    }else{
        callback(405);
    }
};

handler._token = {};

handler._token.post = (requestProperties,callback) => { 

    const phone = typeof requestProperties.body.phone === 'string' &&
    requestProperties.body.phone.trim().length === 11 ?
    requestProperties.body.phone:false;  

    const password = typeof requestProperties.body.password === 'string' &&
    requestProperties.body.password.trim().length > 0 ?
    requestProperties.body.password:false;

    

        if (phone && password) {
            // make sure that the user doesn't already exists
            data.read('users',phone,(err,userData) => {
               const hashedpassword = hash(password);
               
               if(hashedpassword === parseJSON(userData).password){
                    const tokenId = createRandomString(20);
                    const expires = Date.now() + 60 * 60 *1000;
                    const tokenObject = {
                        phone,
                        id:tokenId,
                        expires,
                    }

                    // store the token
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            error: 'There was a problem in the server side!',
                        });
                    }
                });

               }else{
                callback(400, {
                    error: 'Password is not valid!',
                });
               }
            });
        }else{
            callback(400, {
                error: 'You have a problem in your request',
            });
        }
          
};

handler._token.get = (requestProperties,callback) => {

    const id = typeof requestProperties.queryStringObj.id === 'string' &&
    requestProperties.queryStringObj.id.trim().length === 21 ?
    requestProperties.queryStringObj.id:false; 

   if(id){
    data.read('tokens',id, (err,tokenData) => {
        const token = {...parseJSON(tokenData)};//convert to json object from string & using spread operator {...}

        if(!err && token){
            callback(200,token);//this is top callback
        }else{
            callback(404, {
                error: 'Requested token was not found!',
            });
        }
    });
   }else{
     callback(404, {
            error: 'Requested token was not found!!!!!',
        });
   }
};

handler._token.put = (requestProperties,callback) => {
    const id =
        typeof requestProperties.body.id === 'string' &&
    requestProperties.body.id.trim().length === 21
        ? requestProperties.body.id
        : false;

    const extend =
        typeof requestProperties.body.extend === 'boolean' && requestProperties.body.extend === true?true:false;
console.log(id);
if (id && extend) {
    data.read('tokens', id, (err1, tokenData) => {
        const tokenObject = parseJSON(tokenData);
        if (tokenObject.expires > Date.now()) {
            tokenObject.expires = Date.now() + 60 * 60 * 1000;
            // store the updated token
            data.update('tokens', id, tokenObject, (err2) => {
                if (!err2) {
                    callback(200);
                } else {
                    callback(500, {
                        error: 'There was a server side error!',
                    });
                }
            });
        } else {
            callback(400, {
                error: 'Token already expired!',
            });
        }
    });
} else {
    callback(400, {
        error: 'There was a problem in your request',
    });
}
};

handler._token.delete = (requestProperties,callback) => {
    // check the token if valid
    const id = typeof requestProperties.queryStringObj.id === 'string' &&
    requestProperties.queryStringObj.id.trim().length === 21 ?
    requestProperties.queryStringObj.id:false; 

    if (id) {
        // lookup the user
        data.read('tokens', id, (err1, tokenData) => {
            if (!err1 && tokenData) {
                data.delete('tokens', id, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'Token was successfully deleted!',
                        });
                    } else {
                        callback(500, {
                            error: 'There was a server side error!',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was a server side error!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'There was a problem in your request!',
        });
    }
};

handler._token.verify = (id,phone,callback) => {
    data.read('tokens',id,(err, tokenData)=>{
        if(!err && tokenData){
            if(parseJSON(tokenData).phone === phone && parseJSON(tokenData).expires>Date.now()){
                callback(true);
            }else{
                callback(false);
            }
        }else{
            callback(false);
        }
    });
};

module.exports = handler;