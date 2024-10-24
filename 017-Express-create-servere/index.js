const express = require('express');

const app = express(); // when u inisilize express, get 2 thing one is server and second is Router

app.use(express.json()); // 

app.get('/', (req, res)=>{
    console.log(req.query)
    res.send('Send data through Query')
});

app.get('/name?', (req, res)=>{
    console.log(req.params)
    res.send('Send data through Params')
});

app.get('/contact', (req, res)=>{
    res.send('Contact API')
});

app.post('/', (req, res)=>{
    console.log(req.body);
    res.send('Post Route');
});

app.listen(3300, ()=>{
    console.log('Server is running on port 3300')
})