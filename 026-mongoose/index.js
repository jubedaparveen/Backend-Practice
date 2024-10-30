const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// creating Mongoose connection
const url = 'mongodb+srv://jubedaparveenh:bzizmBtInR0aZoJR@jubeda.mnmev.mongodb.net/?retryWrites=true&w=majority&appName=jubeda';

mongoose.connect(url)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((error)=>{
    console.log('Error connecting to MongoDB', error);
});

// Schema 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    status:{
        type:Boolean,
        default:true
    }
});

//Model 
//Collection name is - users 
const User = mongoose.model('users', userSchema); 

//router
app.post('/create-user', async(req, res)=>{
    try{
        console.log(req.body);
        const data = new User(req.body);
        const saveResponse = await data.save();
        res.status(200).json({message: 'success', 
        data: saveResponse});
    }
    catch{
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
});

app.put('/update-user/:_id', async(req, res)=>{
    try{
        const updateResponse = await User.updateOne(req.params, 
        {
            $set:req.body
        });
        res.status(200).json({massage: 'success', data: updateResponse});
    }
    catch{
        console.log(error);
        res.status(500).json({massage: 'Internal server error'});
    }
});

app.delete('/delete-user/:_id', async (req, res) =>{
    try{
       const deleteResponse = await User.deleteOne(req.params);

       res.status(200).json({message:'success', data: deleteResponse});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
});

app.get('/read-users', async (req, res) =>{
    try{
       const readResponse = await User.find();

       res.status(200).json({message:'success', data: readResponse});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
});
//port 
app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
});