const express = require('express');

const serrot = express();

const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();

const middleware1 = (req, res, next)=>{
    console.log('First Middlerare1');
    next();
};

const middleware2 = (req, res, next)=>{
    console.log('Second Middlerare2');
    next();
};

const middleware3 = (req, res, next)=>{
    console.log('Third Middlerare3');
    next();
};

router1.use(middleware1);
router2.use(middleware2);
router3.use(middleware3);

router1.get('/r1', (req, res)=>{
    res.send('Running from Route one');
});

router1.get('/r2', (req, res)=>{
    res.send('Running from Route two');
});

router2.get('/r3', (req, res)=>{
    res.send('Running from Route Three');
});

router2.get('/r4', (req, res)=>{
    res.send('Running from Route Four');
});

router3.get('/r5', (req, res)=>{
    res.send('Running from Route Five');
});

router3.get('/r6', (req, res)=>{
    res.send('Running from Route Six');
});

serrot.use('/path1', router1);
serrot.use('/path2', router2);
serrot.use('/path3', router3);

serrot.listen(1100, ()=>{
    console.log('server is running on port 1100');
})