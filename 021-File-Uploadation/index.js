const express = require('express');
const multer = require('multer'); // Handle Form-data
const path = require('path'); // Give Extanssion of uploaded file like .jpg, .jpeg, .png etc

const serverroute = express();

serverroute.use(express.json());

// send date body-raw-Json
serverroute.post('/file-upload', (req, res)=>{
    console.log(req.body);
    res.status(200).json({message:'Process is Successfuly Done'});
});

// No File Input Field
serverroute.post('/file-upload-multer', multer().none(), (req, res)=>{
    console.log(req.body);
    res.status(200).json({message:'file-upload Process is Successfuly Done'})
});



// create multer
// single file input with single file

const upload1 = multer({storage: multer.diskStorage({
    destination: (req, file, next)=>{
        next(null, './UploadFile');
    },
    filename: (req, file, next)=>{
        next(null, Date.now() + Math.floor( Math.random() * 9999999) + path.extname(file.originalname));
    }
})}).single('profile')

serverroute.post('/file-upload-single-file', upload1,(req, res)=>{
    res.status(200).json({message:'No File Input Field, Process is Successfuly Done'}); 
});


//single file input with multiple files
const upload2 = multer({storage: multer.diskStorage({
    destination: (req, file, next)=>{
        next(null, './UploadFile');
    },
    filename:(req, file, next) =>{
        next(null, Date.now() + Math.floor(Math.random() * 9999999) + path.extname(file.originalname));
    }
})}).array('profile', 10);

serverroute.post('/file-upload-multiple-fields',upload2, (req, res)=>{
    res.status(200).json({message:'file-upload-multiple-fields, Process is Successfuly Done'}); 
});

//multiple file inputs
const upload3 = multer({storage: multer.diskStorage({
    destination: (req, file, next) =>{
        next(null, './UploadFile');
    },
    filename: (req, file, next) =>{
        next(null, Date.now() + Math.floor(Math.random() * 99999999 ) + path.extname(file.originalname));
    }
})}).fields([
    {
        name: 'profile', maxCount:1
    },
    {
        name: 'images', maxCount:10
    }
]);

serverroute.post('/file-upload-multiple-inputs-fields', upload3, (req, res) =>{
    res.status(200).json({message: 'file-upload-multiple-inputs-fields, Process is Successfuly Done'});
});


serverroute.listen(2200, ()=>{
    console.log('Server is Runnng on Port 2200');
})