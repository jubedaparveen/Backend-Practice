const express = require('express');
 
const key = '123456';

const serrot = express();

serrot.use(express.json());

// const middleware1 = (req, res, next)=>{
//     console.log('First Middleware');
//     res.send('Welcome to Frist Middleware')
// };

const middleware1 = (req, res, next)=>{
    console.log(req.params);
    
    if(!req.params.key) return res.status(400).json({message: 'please send a key'});

    if(req.params.key != key) return res.status(401).json({message: 'please send a valid key'});

    next();
};

serrot.get('/register/:key?', middleware1, (req, res)=>{
    console.log(req.boby);
    res.send('Welcome to New Api');
});

serrot.post('/greet/:key?', (req, res)=>{
    res.status(200).json({message: 'hello world Api'});
});

serrot.listen(4400, ()=>{
    console.log('server is running on port 4400');
});