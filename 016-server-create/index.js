const http = require('http');

http.createServer((req, res)=>{
    console.log(req.url);
    console.log(req.method);
    res.end('Hello')
}).listen(4500, () => {
    console.log('server is runnong on pert 4500');
})
