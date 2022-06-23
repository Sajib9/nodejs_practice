const environments = {};

environments.staging = {
    port:3000,
    envName:'staging',
    secretKey: 'hsjdhsdhsjdhjshdjshd',
    maxChecks: 5,
    twilio:{
        fromPhone:'+19854972805',
        accountSid:'ACd2e9eb9a49a728716d0ab59291c75fc5',
        authToken:'8a85eaf1c79aa12853b29bb14e204d82',
    }
};
environments.production = {
    port:5000,
    envName:'production',
    secretKey: 'djkdjskdjksdjksjdskjd',
    maxChecks: 5,
    twilio:{
        fromPhone:'+19854972805',
        accountSid:'ACd2e9eb9a49a728716d0ab59291c75fc5',
        authToken:'8a85eaf1c79aa12853b29bb14e204d82',
    }
};

//determine which environment was passed
const currentEnvironment = 
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV: 'staging';

//export corresponding environment object
const environmentToExport = 
    typeof environments[currentEnvironment] === 'object'? environments[currentEnvironment]:environments.staging;

    module.exports = environmentToExport;