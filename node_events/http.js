const http =  require('http');

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write('Response from root');
        res.end();
    }else if(req.url === '/about-us'){
        res.write('Response from about us page');
        res.end();
    }else{
        res.write('No page found');
        res.end();
    }

});

server.listen(3000);
console.log('server');