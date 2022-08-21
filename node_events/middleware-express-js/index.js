const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
// app.use(cookieParser());//third party middleware
const  adminRouter = express.Router();

// const myMiddlewre = (req,res,next)=>{
//     console.log('I am logging');
//     next();
// };

const loggerWrapper = (options)=>{
    return (req,res,next)=>{
        if(options.log){
            console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol}`);
            next();
        }else{
            throw new Error('Failed to log');
        }
    }
};

// const logger = (req,res,next)=>{
//     console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol}`);
//     // next();//if we pass any value in next() function its consider as error message.
//     // res.end(); //we can also end response from middleware
//     throw new Error('this is an error');
// };

// app.use(myMiddlewre);
// adminRouter.use(logger);
adminRouter.use(loggerWrapper({log:false}));//pass value in middleware

adminRouter.get('/dashboard',(req,res)=>{
    res.send('Dashboard')
});
app.use('/admin',adminRouter );
// app.use(logger);

app.get('/about',(req,res )=>{
    res.send('About');
});

const errorMiddleware = (err,req,res,next)=>{
    console.log(err.message);
    res.status(500).send('this is server error');

};
adminRouter.use(errorMiddleware); 
app.listen(3000,()=>{
    console.log('port 3000');
});