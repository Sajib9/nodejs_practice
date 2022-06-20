const http = require('http');

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write(`<html>
        <head>
            <title>Form</title>
        </head>
        <body>
            <form method='post' action='/process'>
                <input type='text' name='message'/>
            </form>
        </body>
        </html>`);
        res.end();
    }
    else if(req.url === '/process' && req.method === 'POST'){
        const body = [];

        req.on('data',(chunk) => {  //push chunk of data from buffer into array
            body.push(chunk);
        });

        req.on('end',() => { //if buffer ends then all array concating with Buffer 
            console.log('finished');
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
        });

        res.write('Thanks for submiting');
        res.end();

    }else{
        res.write('Not found');
        res.end();
    }
});
server.listen(3000);