const express = require('express');
const mongodb = require('mongodb');
const multer =require('multer');
const path = require('path');

const serverRoute = express();

//Creating database connection
const url = 'mongodb://localhost:27017';
const dbname = 'jubeda_283';
const client = new mongodb.MongoClient(url);
const connect = async ()=>{
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('pruducts');
    return collection;
}


// creating mlter 
const multerResponce = multer({storage: multer.diskStorage({
    destination: (req, file, next)=>{
        // console.log(file);
        next(null, './uploadImgFile');
    },
    filename: (req, file, next)=>{
        next(null, Date.now() + Math.floor(Math.random() * 99999) + path.extname(file.originalname));
    }
})}).fields([
    {name : 'thumbnail', maxCount: 1},
    {name : 'images', maxCount : 10 }
]);


// insert router
serverRoute.post('/insert-products', multerResponce, async (req, res)=>{
    // console.log(req.files)

   try {

    // console.log(req.body);
    // console.log(req.files);

    const data = req.body;

    if(req.files) {
        if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;

        if(req.files.images) data.images = req.files.images.map((file) => file.filename);
    }
        const collection = await connect();

        const response = await collection.insertOne(data);

        res.status(200).json({message: 'insert-products Process Done Succesfully', data: response });
   }
   catch (error) {
    console.log(error);
    res.status(500).json({message: 'Internal Server Error'});
   }
});


//read products
serverRoute.get()
//delete products
//update products


//server
serverRoute.listen(5500, ()=>{
    console.log('Server is Runing on port 5500');
});