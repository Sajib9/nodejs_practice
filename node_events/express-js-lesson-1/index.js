const express = require('express');
 const app = express();

 app.use(express.json());
 app.use(express.raw()); //sent data as raw .content type "application/octet-stream"
 app.use(express.text()); //sent data as text .content type "text/plain"
 app.use(express.static(`${__dirname}/public/`)); //make a file accessible from any folder from anywhere from route.normally its restricted
 app.use(express.static(`${__dirname}/public/`,{
    index:'home.html',
 })); //make a file accessible from any folder from anywhere from route.normally its restricted

 const router = express.Router(); //we can use instead of app.use() .this is case insensative


 router.get('/', (req,res) => {
    res.send('responing from root route with get request');
 } );

 app.get('/', (req,res) => {
    res.send('responing from root route with get request');
 } );

 app.post('/', (req,res) => {
    console.log(req.body.name);
    console.log(typeof req.body);
    res.send('responing from root route with post request');
 });

 app.listen(3000, () => {
    console.log('lisening port 3000');
 });
  