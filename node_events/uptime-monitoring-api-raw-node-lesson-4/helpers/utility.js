const crypto = require('crypto');
const utility = {};

const environments = require('./environments.js');
// parse JSON string to Object
utility.parseJSON = (jsonString) => {

    let output;
    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

//hasing password
utility.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        // console.log(environments, process.env.NODE_ENV);
        const hash = crypto.createHmac('sha256', environments.secretKey).update(str).digest('hex');
        return hash;
    }
    return false;
};

// create random string
utility.createRandomString = (strlength) => {
    let length = strlength;
    length = typeof strlength === 'number' && strlength > 0 ? strlength : false;

    if(length){
        const possiblecharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = '';

        for(let i = 0; i <= length; i++ ){
            const randomCharacter = possiblecharacters.charAt(
                Math.floor(Math.random() * possiblecharacters.length)
            )
            output += randomCharacter;
        }
        return output;
    }
    return false;

};
module.exports = utility;