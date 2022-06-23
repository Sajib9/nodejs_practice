const express = require('express');

const app = express();
const admin = express();

app.set('view engine','ejs');


app.locals.title = 'My app'; //locals can be accessed from anywhere in project

admin.get('/dashboard', (req,res)=>{
    console.log(admin.mountpath);
    res.send('Welcome to admin dashboard');
});

app.get('/', (req,res) => {
    console.log(app.locals.title);
    res.send('this is home page');
});

app.param('id',(req,res,next,id)=>{ //when id param found in route then this callback will execute first
                                    //then sent back calling route
    const user = {
        userid: id,
        name: 'sajib',
    };

    req.userDetails = user;
    next();
});

app.get('/user/:id', (req,res) => {
    console.log(app.locals.title);
    console.log(req.userDetails);
    res.send('this is home page');
});

app.route('/about/mission') //usedfor all common route
    // .get((req,res)=>{
    //     //res.send('get');
    //     res.render('index');
    // })
    .get((req,res)=>{
        res.render('pages/about.ejs');
    })

app.use('/admin',admin)

app.listen(3000,()=>{
    console.log('port 3000');
});