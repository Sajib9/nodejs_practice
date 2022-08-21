const express = require('express');

const app = express();
const adminRoute = express.Router();
//localhost:3000/user/3?filter=name
//localhost:3000/admin/dashboard
adminRoute.get('/dashboard',(req,res)=>{
    console.log(req.baseUrl);
    console.log(req.originalUrl);//admin/dashboard
    console.log(req.url);//dashboard
    console.log(req.path);//dashboard
    res.send('We are in Admin Dashboard');
});

app.use('/admin',adminRoute);

app.get('/user/:id',(req,res)=>{
    console.log(req.baseUrl);
    console.log(req.originalUrl);//user/3?filter=name
    console.log(req.url);//user/3?filter=name
    console.log(req.path);//user/3
    console.log(req.params);//{id:'3'} return type object
    res.send('Hello world');
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});